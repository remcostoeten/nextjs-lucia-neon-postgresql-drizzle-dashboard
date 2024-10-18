'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLocalStorage } from 'hooks'
import { Camera, Download, Edit2, FastForward, Mic, Pause, Play, RotateCcw, Square, Trash, Volume2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface AudioTrack {
	id: string
	name: string
	url: string
	duration: number
}

export default function AudioVideoRecorder() {
	const [activeTab, setActiveTab] = useState('audio')
	const [isRecording, setIsRecording] = useState(false)
	const [isPaused, setIsPaused] = useState(false)
	const [recordingTime, setRecordingTime] = useState(0)
	const [audioTracks, setAudioTracks] = useLocalStorage<AudioTrack[]>('audioTracks', [])
	const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [volume, setVolume] = useState(1)
	const [playbackRate, setPlaybackRate] = useState(1)
	const [isLooping, setIsLooping] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)

	const mediaRecorderRef = useRef<MediaRecorder | null>(null)
	const audioChunksRef = useRef<Blob[]>([])
	const audioContextRef = useRef<AudioContext | null>(null)
	const analyserRef = useRef<AnalyserNode | null>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const audioRef = useRef<HTMLAudioElement>(null)
	const videoRef = useRef<HTMLVideoElement>(null)
	const timerRef = useRef<number | null>(null)
	const startTimeRef = useRef<number>(0)
	const pausedTimeRef = useRef<number>(0)

	useEffect(() => {
		if (activeTab === 'audio') {
			setupAudioContext()
		} else if (activeTab === 'video') {
			setupWebcam()
		}
		return () => {
			if (audioContextRef.current) {
				audioContextRef.current.close()
			}
		}
	}, [activeTab])

	useEffect(() => {
		if (audioRef.current) {
			const updateTime = () => {
				setCurrentTime(audioRef.current?.currentTime || 0)
			}
			audioRef.current.addEventListener('timeupdate', updateTime)
			return () => {
				audioRef.current?.removeEventListener('timeupdate', updateTime)
			}
		}
	}, [currentTrack])

	const setupAudioContext = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
			audioContextRef.current = new AudioContext()
			analyserRef.current = audioContextRef.current.createAnalyser()
			const source = audioContextRef.current.createMediaStreamSource(stream)
			source.connect(analyserRef.current)
			drawWaveform()
		} catch (error) {
			console.error('Error accessing microphone:', error)
		}
	}

	const setupWebcam = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true })
			if (videoRef.current) {
				videoRef.current.srcObject = stream
			}
		} catch (error) {
			console.error('Error accessing webcam:', error)
		}
	}

	const drawWaveform = () => {
		if (!canvasRef.current || !analyserRef.current) return
		const canvas = canvasRef.current
		const canvasCtx = canvas.getContext('2d')
		if (!canvasCtx) return

		const WIDTH = canvas.width
		const HEIGHT = canvas.height
		analyserRef.current.fftSize = 256
		const bufferLength = analyserRef.current.frequencyBinCount
		const dataArray = new Uint8Array(bufferLength)

		const draw = () => {
			requestAnimationFrame(draw)
			analyserRef.current!.getByteFrequencyData(dataArray)

			canvasCtx.fillStyle = 'rgb(23, 23, 23)'
			canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

			const barWidth = (WIDTH / bufferLength) * 2.5
			let x = 0

			for (let i = 0; i < bufferLength; i++) {
				const barHeight = dataArray[i] / 2

				const gradient = canvasCtx.createLinearGradient(0, HEIGHT, 0, HEIGHT - barHeight)
				gradient.addColorStop(0, '#0070f3')
				gradient.addColorStop(1, '#00a8ff')

				canvasCtx.fillStyle = gradient
				canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)

				x += barWidth + 1
			}
		}

		draw()
	}

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
			mediaRecorderRef.current = new MediaRecorder(stream)
			mediaRecorderRef.current.ondataavailable = (event) => {
				if (event.data.size > 0) {
					audioChunksRef.current.push(event.data)
				}
			}
			mediaRecorderRef.current.onstop = saveRecording
			mediaRecorderRef.current.start()
			setIsRecording(true)
			setIsPaused(false)
			startTimer()
		} catch (error) {
			console.error('Error starting recording:', error)
		}
	}

	const pauseRecording = () => {
		if (mediaRecorderRef.current && isRecording) {
			mediaRecorderRef.current.pause()
			setIsPaused(true)
			pauseTimer()
		}
	}

	const resumeRecording = () => {
		if (mediaRecorderRef.current && isRecording && isPaused) {
			mediaRecorderRef.current.resume()
			setIsPaused(false)
			resumeTimer()
		}
	}

	const stopRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop()
			setIsRecording(false)
			setIsPaused(false)
			stopTimer()
		}
	}

	const saveRecording = () => {
		const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' })
		const audioUrl = URL.createObjectURL(audioBlob)
		const audio = new Audio(audioUrl)
		audio.onloadedmetadata = () => {
			const newTrack: AudioTrack = {
				id: Date.now().toString(),
				name: `Recording ${audioTracks.length + 1}`,
				url: audioUrl,
				duration: audio.duration
			}
			setAudioTracks([...audioTracks, newTrack])
		}
		audioChunksRef.current = []
	}

	const startTimer = () => {
		startTimeRef.current = Date.now() - pausedTimeRef.current
		timerRef.current = window.setInterval(() => {
			setRecordingTime(Date.now() - startTimeRef.current)
		}, 10)
	}

	const pauseTimer = () => {
		if (timerRef.current) {
			clearInterval(timerRef.current)
			pausedTimeRef.current = Date.now() - startTimeRef.current
		}
	}

	const resumeTimer = () => {
		startTimeRef.current = Date.now() - pausedTimeRef.current
		timerRef.current = window.setInterval(() => {
			setRecordingTime(Date.now() - startTimeRef.current)
		}, 10)
	}

	const stopTimer = () => {
		if (timerRef.current) {
			clearInterval(timerRef.current)
		}
		setRecordingTime(0)
		pausedTimeRef.current = 0
	}

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor(time % 60)
		const milliseconds = Math.floor((time % 1) * 100)
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
	}

	const handlePlayPause = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause()
			} else {
				audioRef.current.play()
			}
			setIsPlaying(!isPlaying)
		}
	}

	const handleVolumeChange = (newVolume: number[]) => {
		setVolume(newVolume[0])
		if (audioRef.current) {
			audioRef.current.volume = newVolume[0]
		}
	}

	const handleSpeedChange = (newSpeed: number[]) => {
		setPlaybackRate(newSpeed[0])
		if (audioRef.current) {
			audioRef.current.playbackRate = newSpeed[0]
		}
	}

	const toggleLoop = () => {
		setIsLooping(!isLooping)
		if (audioRef.current) {
			audioRef.current.loop = !isLooping
		}
	}

	const handleDeleteTrack = (id: string) => {
		setAudioTracks(audioTracks.filter(track => track.id !== id))
		if (currentTrack?.id === id) {
			setCurrentTrack(null)
			setIsPlaying(false)
		}
	}

	const handleRenameTrack = (id: string, newName: string) => {
		setAudioTracks(audioTracks.map(track =>
			track.id === id ? { ...track, name: newName } : track
		))
	}

	const handleDownload = (track: AudioTrack) => {
		const link = document.createElement('a')
		link.href = track.url
		link.download = `${track.name}.mp3`
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<div className="container mx-auto p-4 bg-background text-foreground">
			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="audio">Audio</TabsTrigger>
					<TabsTrigger value="video">Video</TabsTrigger>
				</TabsList>
				<TabsContent value="audio" className="mt-4">
					<div className="space-y-4">
						<div className="border rounded-lg p-4 bg-card">
							<canvas ref={canvasRef} width="600" height="200" className="w-full rounded-md" />
						</div>
						<div className="flex items-center space-x-4">
							{!isRecording && (
								<Button onClick={startRecording} variant="default">
									<Mic className="mr-2 h-4 w-4" />
									Start Recording
								</Button>
							)}
							{isRecording && !isPaused && (
								<Button onClick={pauseRecording} variant="outline">
									<Pause className="mr-2 h-4 w-4" />
									Pause Recording
								</Button>
							)}
							{isRecording && isPaused && (
								<Button onClick={resumeRecording} variant="outline">
									<Play className="mr-2 h-4 w-4" />
									Resume Recording
								</Button>
							)}
							{isRecording && (
								<Button onClick={stopRecording} variant="destructive">
									<Square className="mr-2 h-4 w-4" />
									Stop Recording
								</Button>
							)}
							<div className="text-sm font-medium">Recording Time: {formatTime(recordingTime / 1000)}</div>
						</div>
					</div>
				</TabsContent>
				<TabsContent value="video" className="mt-4">
					<div className="space-y-4">
						<div className="border rounded-lg p-4 bg-card">
							<video ref={videoRef} autoPlay playsInline muted className="w-full rounded-md" />
						</div>
						<Button disabled>
							<Camera className="mr-2 h-4 w-4" />
							Webcam Preview
						</Button>
					</div>
				</TabsContent>
			</Tabs>

			<div className="mt-8">
				<h2 className="text-2xl font-bold mb-4">Recorded Tracks</h2>
				{audioTracks.map((track) => (
					<div key={track.id} className="mb-4 p-4 border rounded bg-card">
						<div className="flex items-center justify-between mb-2">
							<div className="font-medium">{track.name}</div>
							<div className="text-sm text-muted-foreground">{formatTime(track.duration)}</div>
						</div>
						<Progress value={(currentTrack?.id === track.id ? currentTime : 0) / track.duration * 100} className="mb-2" />
						<div className="flex items-center space-x-2">
							<Button variant="outline" size="sm" onClick={() => setCurrentTrack(track)}>
								<Play className="h-4 w-4" />
							</Button>
							<Button variant="outline" size="sm" onClick={() => {
								const newName = prompt('Enter new name', track.name)
								if (newName) handleRenameTrack(track.id, newName)
							}}>
								<Edit2 className="h-4 w-4" />
							</Button>
							<Button variant="outline" size="sm" onClick={() => handleDeleteTrack(track.id)}>
								<Trash className="h-4 w-4" />
							</Button>
							<Button variant="outline" size="sm" onClick={() => handleDownload(track)}>
								<Download className="h-4 w-4" />
							</Button>
						</div>
					</div>
				))}
			</div>

			{currentTrack && (
				<div className="mt-8 p-4 border rounded bg-card">
					<h3 className="text-xl font-bold mb-2">Now Playing: {currentTrack.name}</h3>
					<audio

						ref={audioRef}
						src={currentTrack.url}
						onEnded={() => setIsPlaying(false)}
						onPlay={() => setIsPlaying(true)}
						onPause={() => setIsPlaying(false)}
					/>
					<Progress value={currentTime / currentTrack.duration * 100} className="mb-2" />
					<div className="flex items-center justify-between mb-2">
						<div className="text-sm">{formatTime(currentTime)}</div>
						<div className="text-sm">{formatTime(currentTrack.duration)}</div>
					</div>
					<div className="flex items-center space-x-2 mb-4">
						<Button onClick={handlePlayPause} variant="outline">
							{isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
						</Button>
						<Button onClick={toggleLoop} variant={isLooping ? "default" : "outline"}>
							<RotateCcw className="h-4 w-4" />
						</Button>
					</div>
					<div className="space-y-4">
						<div>
							<Label htmlFor="volume" className="text-sm font-medium">Volume</Label>
							<div className="flex items-center space-x-2">
								<Volume2 className="h-4 w-4" />
								<Slider
									id="volume"
									min={0}
									max={1}
									step={0.01}
									value={[volume]}
									onValueChange={handleVolumeChange}
									className="w-full"
								/>
							</div>
						</div>
						<div>
							<Label htmlFor="speed" className="text-sm font-medium">Playback Speed</Label>
							<div className="flex items-center space-x-2">
								<FastForward className="h-4 w-4" />
								<Slider
									id="speed"
									min={0.5}
									max={2}
									step={0.1}
									value={[playbackRate]}
									onValueChange={handleSpeedChange}
									className="w-full"
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
