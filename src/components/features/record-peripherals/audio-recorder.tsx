'use client'

import { Flex } from '@/components/atoms'
import EmptyStateMessage from '@/components/effects/empty-state-loader'
import { ConfirmationDialog } from '@/components/elements/crud/confirm-dialog'
import { useLocalStorage } from '@/core/hooks/use-local-storage'
import { StopIcon } from '@radix-ui/react-icons'
import { Download, MicIcon, PauseIcon, PlayIcon, TrashIcon } from 'lucide-react'
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
	Slider
} from 'ui'

type AudioItem = {
	id: string
	url: string
	fileName: string
	timestamp: string
	duration: number
}

export default function AudioRecorder() {
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
	const [elapsedTime, setElapsedTime] = useState(0)
	const recordingStartTimeRef = useRef<number | null>(null)
	const pauseStartTimeRef = useRef<number | null>(null)
	const totalPausedTimeRef = useRef(0)

	const mediaRecorderRef = useRef<MediaRecorder | null>(null)
	const audioContextRef = useRef<AudioContext | null>(null)
	const analyserRef = useRef<AnalyserNode | null>(null)
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const animationRef = useRef<number | null>(null)
	const chunksRef = useRef<Blob[]>([])
	const startTimeRef = useRef<number | null>(null)
	const pausedDurationRef = useRef<number>(0)
	const [audioDuration, setAudioDuration] = useState<number>(0)

	useEffect(() => {
		loadInputDevices()
		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
			}
		}
	}, [])

	useEffect(() => {
		if (currentAudio) {
			const audio = new Audio(currentAudio.url)
			audio.addEventListener('loadedmetadata', () => {
				setAudioDuration(audio.duration)
			})
		}
	}, [currentAudio])

	const loadInputDevices = async () => {
		try {
			const devices = await navigator.mediaDevices.enumerateDevices()
			const audioInputDevices = devices.filter(
				device => device.kind === 'audioinput' && device.deviceId
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
			if (isPaused) {
				mediaRecorderRef.current?.resume()
				if (pauseStartTimeRef.current) {
					totalPausedTimeRef.current +=
						Date.now() - pauseStartTimeRef.current
				}
				pauseStartTimeRef.current = null
				setIsPaused(false)
			} else {
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
					const blob = new Blob(chunksRef.current, {
						type: 'audio/mp3'
					})
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
				setElapsedTime(0)
				recordingStartTimeRef.current = Date.now()
				totalPausedTimeRef.current = 0
			}
			if (!animationRef.current) {
				animationRef.current = requestAnimationFrame(updateMeters)
			}
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
				if (pauseStartTimeRef.current) {
					totalPausedTimeRef.current +=
						Date.now() - pauseStartTimeRef.current
				}
				pauseStartTimeRef.current = null
			} else {
				mediaRecorderRef.current.pause()
				pauseStartTimeRef.current = Date.now()
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
				animationRef.current = null
			}
			recordingStartTimeRef.current = null
			pauseStartTimeRef.current = null
			totalPausedTimeRef.current = 0
			setAudioDuration(elapsedTime) // Set the duration when stopping the recording
		}
	}

	const updateMeters = () => {
		if (recordingStartTimeRef.current) {
			const now = Date.now()
			let currentPausedTime = totalPausedTimeRef.current

			if (pauseStartTimeRef.current) {
				currentPausedTime += now - pauseStartTimeRef.current
			}

			const currentElapsedTime =
				(now - recordingStartTimeRef.current - currentPausedTime) / 1000
			setElapsedTime(currentElapsedTime)

			if (analyserRef.current && !isPaused) {
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
			}
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
		if (!isFinite(time) || isNaN(time)) return '00:00.000'
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

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		const time = parseFloat(e.target.value)
		setCurrentTime(time)
		if (audioRef.current) {
			audioRef.current.currentTime = time
		}
	}

	const handleDownload = (audio: AudioItem) => {
		const link = document.createElement('a')
		link.href = audio.url
		link.download = `${audio.fileName}.mp3`
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
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
							{formatTime(elapsedTime)}
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
								{inputDevices.map((device, index) => (
									<SelectItem
										key={
											device.deviceId || `device-${index}`
										}
										value={
											device.deviceId || `device-${index}`
										}
									>
										{device.label ||
											`Microphone ${index + 1}`}
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
							{audioList.length > 0 ? (
								audioList.map(audio => (
									<li
										key={audio.id}
										className="flex items-stretch justify-between bg-secondary p-2 rounded"
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
											<Button
												onClick={() =>
													handleDownload(audio)
												}
												size="sm"
											>
												<Download className="h-4 w-4" />
											</Button>
										</div>
									</li>
								))
							) : (
								<EmptyStateMessage
									message="Your audio stage is empty! Hit record and transform this silence into your personal soundtrack."
									cardCount={6}
									animate={true}
									opacity={75}
								/>
							)}
						</ul>
					</div>

					{currentAudio && (
						<div className="mt-4 space-y-4">
							<audio
								ref={audioRef}
								src={currentAudio.url}
								onTimeUpdate={handleTimeUpdate}
								onLoadedMetadata={() => {
									if (audioRef.current) {
										setAudioDuration(
											audioRef.current.duration
										)
									}
								}}
							/>
							<div className="flex items-center space-x-2">
								<Button
									onClick={() => audioRef.current?.play()}
								>
									Play
								</Button>
								<Button
									onClick={() => audioRef.current?.pause()}
								>
									Pause
								</Button>
								<Button onClick={() => handleSkip(-10)}>
									-10s
								</Button>
								<Button onClick={() => handleSkip(10)}>
									+10s
								</Button>
								<Button onClick={toggleLoop}>
									{isLooping ? 'Disable Loop' : 'Enable Loop'}
								</Button>
							</div>
							<div className="space-y-2">
								<Label>Playback Progress</Label>
								<Slider
									min={0}
									max={audioDuration || 100}
									value={[currentTime]}
									onValueChange={handleSliderChange}
									className="w-full"
								/>
								<div className="flex justify-between text-sm">
									<span>{formatTime(currentTime)}</span>
									<span>{formatTime(audioDuration)}</span>
								</div>
							</div>
							<div className="space-y-2">
								<Label>Volume</Label>
								<Slider
									min={0}
									max={1}
									step={0.01}
									value={[volume]}
									onValueChange={handleVolumeChange}
								/>
							</div>
							<div className="space-y-2">
								<Label>Playback Rate</Label>
								<Select
									onValueChange={handlePlaybackRateChange}
									value={playbackRate.toString()}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select playback rate" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="0.5">
											0.5x
										</SelectItem>
										<SelectItem value="1">1x</SelectItem>
										<SelectItem value="1.5">
											1.5x
										</SelectItem>
										<SelectItem value="2">2x</SelectItem>
									</SelectContent>
								</Select>
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
