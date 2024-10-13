'use client'

import { Flex } from '@/components/atoms'
import { ConfirmationDialog } from '@/components/elements/crud/confirm-dialog'
import { useLocalStorage } from '@/core/hooks/use-local-storage'
import { StopIcon } from '@radix-ui/react-icons'
import {
	DownloadIcon,
	FastForwardIcon,
	MicIcon,
	PauseIcon,
	PlayIcon,
	RewindIcon,
	TrashIcon,
	Volume2
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import {
	Button,
	Card,
	CardContent,
	Input,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Slider,
	Switch
} from 'ui'

interface AudioItem {
	id: string
	url: string
	fileName: string
	timestamp: string
	duration: number
}

export default function EnhancedMultiAudioRecorder() {
	const [isRecording, setIsRecording] = useState(false)
	const [isPaused, setIsPaused] = useState(false)
	const [duration, setDuration] = useState(0)
	const [currentAudio, setCurrentAudio] = useState<AudioItem | null>(null)
	const [audioList, setAudioList, clearAudioList] = useLocalStorage<
		AudioItem[]
	>('audioRecordings', [])
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [waveform, setWaveform] = useState<number[]>(Array(50).fill(0))
	const [volume, setVolume] = useState(1)
	const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] =
		useState(false)
	const [audioToDelete, setAudioToDelete] = useState<string | null>(null)
	const [playbackRate, setPlaybackRate] = useState(1)
	const [isLooping, setIsLooping] = useState(false)
	const [selectedInputDevice, setSelectedInputDevice] = useState<string>('')
	const [inputDevices, setInputDevices] = useState<MediaDeviceInfo[]>([])

	const mediaRecorderRef = useRef<MediaRecorder | null>(null)
	const audioContextRef = useRef<AudioContext | null>(null)
	const analyserRef = useRef<AnalyserNode | null>(null)
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const animationRef = useRef<number | null>(null)
	const chunksRef = useRef<Blob[]>([])
	const startTimeRef = useRef<number | null>(null)
	const pausedDurationRef = useRef<number>(0)

	useEffect(() => {
		loadInputDevices()
		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
			}
		}
	}, [])

	const loadInputDevices = async () => {
		try {
			const devices = await navigator.mediaDevices.enumerateDevices()
			const audioInputDevices = devices.filter(
				device => device.kind === 'audioinput'
			)
			setInputDevices(audioInputDevices)
			if (audioInputDevices.length > 0) {
				setSelectedInputDevice(audioInputDevices[0].deviceId)
			}
		} catch (error) {
			console.error('Error loading input devices:', error)
		}
	}

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: {
					deviceId: selectedInputDevice
						? { exact: selectedInputDevice }
						: undefined
				}
			})
			mediaRecorderRef.current = new MediaRecorder(stream)
			audioContextRef.current = new AudioContext()
			analyserRef.current = audioContextRef.current.createAnalyser()
			analyserRef.current.fftSize = 256
			const source =
				audioContextRef.current.createMediaStreamSource(stream)
			source.connect(analyserRef.current)

			mediaRecorderRef.current.ondataavailable = event => {
				chunksRef.current.push(event.data)
			}

			mediaRecorderRef.current.onstop = () => {
				const blob = new Blob(chunksRef.current, { type: 'audio/mp3' })
				const url = URL.createObjectURL(blob)
				const timestamp = new Date().toLocaleString()
				const newAudio: AudioItem = {
					id: Date.now().toString(),
					url,
					fileName: `recorded_audio_${audioList.length + 1}`,
					timestamp,
					duration
				}
				setAudioList(prevList => [...prevList, newAudio])
				setCurrentAudio(newAudio)
				chunksRef.current = []
			}

			mediaRecorderRef.current.start(100)
			setIsRecording(true)
			setIsPaused(false)
			setDuration(0)
			startTimeRef.current = Date.now()
			pausedDurationRef.current = 0
			animationRef.current = requestAnimationFrame(updateMeters)
		} catch (error) {
			console.error('Error starting recording:', error)
			toast.error(
				'Failed to start recording. Please check your microphone permissions.'
			)
		}
	}

	const pauseRecording = () => {
		if (mediaRecorderRef.current && isRecording) {
			if (isPaused) {
				mediaRecorderRef.current.resume()
				startTimeRef.current = Date.now() - duration * 1000
				animationRef.current = requestAnimationFrame(updateMeters)
			} else {
				mediaRecorderRef.current.pause()
				pausedDurationRef.current +=
					Date.now() - (startTimeRef.current || 0)
				if (animationRef.current) {
					cancelAnimationFrame(animationRef.current)
				}
			}
			setIsPaused(!isPaused)
		}
	}

	const stopRecording = () => {
		if (mediaRecorderRef.current && isRecording) {
			mediaRecorderRef.current.stop()
			setIsRecording(false)
			setIsPaused(false)
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
			}
		}
	}

	const updateMeters = () => {
		if (analyserRef.current && startTimeRef.current) {
			const dataArray = new Uint8Array(
				analyserRef.current.frequencyBinCount
			)
			analyserRef.current.getByteFrequencyData(dataArray)

			const normalizedData = Array.from(dataArray).map(
				value => value / 255
			)
			const averageVolume =
				normalizedData.reduce((sum, value) => sum + value, 0) /
				normalizedData.length
			setWaveform(prevWaveform => [
				...prevWaveform.slice(1),
				averageVolume
			])

			const currentDuration =
				(Date.now() -
					startTimeRef.current -
					pausedDurationRef.current) /
				1000
			setDuration(currentDuration)
		}
		animationRef.current = requestAnimationFrame(updateMeters)
	}

	const playAudio = (audio: AudioItem) => {
		if (audioRef.current) {
			audioRef.current.src = audio.url
			audioRef.current.play()
			setIsPlaying(true)
			setCurrentAudio(audio)
		}
	}

	const pauseAudio = () => {
		if (audioRef.current) {
			audioRef.current.pause()
			setIsPlaying(false)
		}
	}

	const handleTimeUpdate = () => {
		if (audioRef.current) {
			setCurrentTime(audioRef.current.currentTime)
		}
	}

	const handleSliderChange = (newValue: number[]) => {
		if (audioRef.current) {
			audioRef.current.currentTime = newValue[0]
			setCurrentTime(newValue[0])
		}
	}

	const handleVolumeChange = (newValue: number[]) => {
		const newVolume = newValue[0]
		setVolume(newVolume)
		if (audioRef.current) {
			audioRef.current.volume = newVolume
		}
	}

	const handlePlaybackRateChange = (value: string) => {
		const rate = parseFloat(value)
		setPlaybackRate(rate)
		if (audioRef.current) {
			audioRef.current.playbackRate = rate
		}
	}

	const handleSkip = (seconds: number) => {
		if (audioRef.current) {
			audioRef.current.currentTime += seconds
			setCurrentTime(audioRef.current.currentTime)
		}
	}

	const toggleLoop = () => {
		setIsLooping(!isLooping)
		if (audioRef.current) {
			audioRef.current.loop = !isLooping
		}
	}

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor(time % 60)
		const milliseconds = Math.floor((time % 1) * 1000)
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`
	}

	const handleDeleteAudio = (id: string) => {
		setAudioToDelete(id)
		setIsConfirmDeleteDialogOpen(true)
	}

	function confirmDeleteAudio() {
		if (audioToDelete) {
			setAudioList(prevList =>
				prevList.filter(audio => audio.id !== audioToDelete)
			)
			if (currentAudio?.id === audioToDelete) {
				setCurrentAudio(null)
				pauseAudio()
			}
			toast.success('Audio deleted successfully')
		}
		setIsConfirmDeleteDialogOpen(false)
		setAudioToDelete(null)
	}

	const updateFileName = (id: string, newFileName: string) => {
		setAudioList(prevList =>
			prevList.map(audio =>
				audio.id === id ? { ...audio, fileName: newFileName } : audio
			)
		)
		if (currentAudio?.id === id) {
			setCurrentAudio({ ...currentAudio, fileName: newFileName })
		}
	}

	return (
		<>
			<Card>
				<CardContent className="p-6">
					<div className="flex flex-wrap justify-between items-center mb-4 gap-2">
						<Button onClick={startRecording} disabled={isRecording}>
							<MicIcon className="h-4 w-4 mr-2" />
							Start Recording
						</Button>
						<Button
							onClick={pauseRecording}
							disabled={!isRecording}
						>
							{isPaused ? (
								<PlayIcon className="h-4 w-4 mr-2" />
							) : (
								<PauseIcon className="h-4 w-4 mr-2" />
							)}
							{isPaused ? 'Resume' : 'Pause'}
						</Button>
						<Button onClick={stopRecording} disabled={!isRecording}>
							<StopIcon className="h-4 w-4 mr-2" />
							Stop
						</Button>
						<div className="text-lg font-mono">
							{formatTime(duration)}
						</div>
					</div>

					<div className="w-full h-16 bg-secondary rounded-lg overflow-hidden mb-4 flex items-end">
						{waveform.map((value, index) => (
							<div
								key={index}
								className="w-1 bg-primary mx-px"
								style={{ height: `${value * 100}%` }}
							></div>
						))}
					</div>

					<div className="mb-4">
						<Label htmlFor="inputDevice">Input Device</Label>
						<Select
							onValueChange={setSelectedInputDevice}
							value={selectedInputDevice}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select input device" />
							</SelectTrigger>
							<SelectContent>
								{inputDevices.map(device => (
									<SelectItem
										key={device.deviceId}
										value={device.deviceId}
									>
										{device.label ||
											`Microphone ${device.deviceId}`}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="mt-4">
						<Flex justify="between" align="center">
							<h3 className="text-lg font-semibold mb-2">
								Recorded Audios
							</h3>
							{audioList.length > 0 && (
								<Button
									onClick={clearAudioList}
									variant="destructive"
								>
									Clear All Recordings
								</Button>
							)}
						</Flex>
						<ul className="space-y-2">
							{audioList.map(audio => (
								<li
									key={audio.id}
									className="flex items-center justify-between bg-secondary p-2 rounded"
								>
									<div className="flex-grow mr-2">
										<Input
											value={audio.fileName}
											onChange={e =>
												updateFileName(
													audio.id,
													e.target.value
												)
											}
											className="mb-1"
										/>
										<span className="text-sm text-gray-500">
											{audio.timestamp}
										</span>
									</div>
									<div className="flex space-x-2">
										<Button
											onClick={() => playAudio(audio)}
											size="sm"
										>
											<PlayIcon className="h-4 w-4" />
										</Button>
										<Button
											onClick={() =>
												handleDeleteAudio(audio.id)
											}
											size="sm"
											variant="destructive"
										>
											<TrashIcon className="h-4 w-4" />
										</Button>
									</div>
								</li>
							))}
						</ul>
					</div>

					{currentAudio && (
						<div className="mt-4">
							<audio
								ref={audioRef}
								src={currentAudio.url}
								onTimeUpdate={handleTimeUpdate}
								onEnded={() => setIsPlaying(false)}
								loop={isLooping}
							/>
							<div className="flex items-center justify-between mb-2">
								<Button
									onClick={
										isPlaying
											? pauseAudio
											: () => playAudio(currentAudio)
									}
								>
									{isPlaying ? (
										<PauseIcon className="h-4 w-4 mr-2" />
									) : (
										<PlayIcon className="h-4 w-4 mr-2" />
									)}
									{isPlaying ? 'Pause' : 'Play'}
								</Button>
								<div className="text-sm font-mono">
									{formatTime(currentTime)}
								</div>
							</div>
							<Slider
								value={[currentTime]}
								max={currentAudio.duration || 100}
								step={0.1}
								onValueChange={handleSliderChange}
								className="mb-4"
							/>

							<div className="flex items-center space-x-2 mb-4">
								<Volume2 className="h-4 w-4" />
								<Slider
									value={[volume]}
									max={1}
									step={0.01}
									onValueChange={handleVolumeChange}
									className="w-32"
								/>
								<span className="text-sm">
									{Math.round(volume * 100)}%
								</span>
							</div>

							<div className="flex items-center space-x-2 mb-4">
								<Label htmlFor="playbackRate">
									Playback Speed:
								</Label>
								<Select
									onValueChange={handlePlaybackRateChange}
									value={playbackRate.toString()}
								>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Select playback speed" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="0.5">
											0.5x
										</SelectItem>
										<SelectItem value="0.75">
											0.75x
										</SelectItem>
										<SelectItem value="1">
											1x (Normal)
										</SelectItem>
										<SelectItem value="1.25">
											1.25x
										</SelectItem>
										<SelectItem value="1.5">
											1.5x
										</SelectItem>
										<SelectItem value="2">2x</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="flex items-center space-x-2 mb-4">
								<Button
									onClick={() => handleSkip(-10)}
									size="sm"
								>
									<RewindIcon className="h-4 w-4 mr-1" /> -10s
								</Button>
								<Button
									onClick={() => handleSkip(10)}
									size="sm"
								>
									<FastForwardIcon className="h-4 w-4 mr-1" />{' '}
									+10s
								</Button>
								<div className="flex items-center space-x-2">
									<Switch
										id="loop-mode"
										checked={isLooping}
										onCheckedChange={toggleLoop}
									/>
									<Label htmlFor="loop-mode">Loop</Label>
								</div>
							</div>

							<div className="flex space-x-2">
								<Button asChild className="flex-grow">
									<a
										href={currentAudio.url}
										download={`${currentAudio.fileName}.mp3`}
									>
										<DownloadIcon className="mr-2 h-4 w-4" />{' '}
										Download MP3
									</a>
								</Button>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
			<ConfirmationDialog
				isOpen={isConfirmDeleteDialogOpen}
				onClose={() => setIsConfirmDeleteDialogOpen(false)}
				onConfirm={confirmDeleteAudio}
				title="Confirm deletion"
			>
				Are you sure you want to delete this masterpiece ? 🎶
			</ConfirmationDialog>
		</>
	)
}
