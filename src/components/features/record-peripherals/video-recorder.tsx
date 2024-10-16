import { Button, Input } from 'ui'
import { StopIcon } from '@radix-ui/react-icons'
import { Pause, Play, Trash2, Video } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from 'src/core/hooks/index'

export default function WebcamRecorder() {
	const [recordings, setRecordings] = useLocalStorage('webcam-recordings', [])
	const [webcamStream, setWebcamStream] = useState(null)
	const [mediaRecorder, setMediaRecorder] = useState(null)
	const [isRecording, setIsRecording] = useState(false)
	const [isPaused, setIsPaused] = useState(false)
	const [recordingTime, setRecordingTime] = useState(0)
	const [recordingName, setRecordingName] = useState('')

	const videoRef = useRef(null)
	const timerRef = useRef(null)

	useEffect(() => {
		return () => {
			if (timerRef.current) clearInterval(timerRef.current)
			if (webcamStream) {
				webcamStream.getTracks().forEach(track => track.stop())
			}
		}
	}, [webcamStream])

	const startWebcam = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true
			})
			setWebcamStream(stream)
			if (videoRef.current) {
				videoRef.current.srcObject = stream
			}
		} catch (error) {
			console.error('Error accessing webcam:', error)
		}
	}

	const startRecording = () => {
		if (webcamStream) {
			const recorder = new MediaRecorder(webcamStream)
			setMediaRecorder(recorder)
			const chunks = []

			recorder.ondataavailable = e => chunks.push(e.data)
			recorder.onstop = () => {
				const blob = new Blob(chunks, { type: 'video/webm' })
				const url = URL.createObjectURL(blob)
				setRecordings(prev => [
					...prev,
					{
						name: recordingName || `Recording ${prev.length + 1}`,
						url,
						duration: recordingTime
					}
				])
				setRecordingTime(0)
			}

			recorder.start()
			setIsRecording(true)
			timerRef.current = setInterval(() => {
				setRecordingTime(prev => prev + 1)
			}, 1000)
		}
	}

	const pauseRecording = () => {
		if (mediaRecorder && mediaRecorder.state === 'recording') {
			mediaRecorder.pause()
			clearInterval(timerRef.current)
			setIsPaused(true)
		}
	}

	const resumeRecording = () => {
		if (mediaRecorder && mediaRecorder.state === 'paused') {
			mediaRecorder.resume()
			timerRef.current = setInterval(() => {
				setRecordingTime(prev => prev + 1)
			}, 1000)
			setIsPaused(false)
		}
	}

	const stopRecording = () => {
		if (mediaRecorder) {
			mediaRecorder.stop()
			clearInterval(timerRef.current)
			setIsRecording(false)
			setIsPaused(false)
		}
	}

	const deleteRecording = index => {
		setRecordings(prev => prev.filter((_, i) => i !== index))
	}

	const formatTime = seconds => {
		const mins = Math.floor(seconds / 60)
		const secs = seconds % 60
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
	}

	return (
		<div className="space-y-4">
			<div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
				<video
					ref={videoRef}
					autoPlay
					playsInline
					muted
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="flex space-x-2">
				{!webcamStream ? (
					<Button onClick={startWebcam}>
						<Video className="mr-2" />
						Start Webcam
					</Button>
				) : !isRecording ? (
					<>
						<Input
							type="text"
							placeholder="Recording name"
							value={recordingName}
							onChange={e => setRecordingName(e.target.value)}
							className="flex-grow"
						/>
						<Button onClick={startRecording}>
							<Video className="mr-2" />
							Start Recording
						</Button>
					</>
				) : isPaused ? (
					<Button onClick={resumeRecording}>
						<Play className="mr-2" />
						Resume
					</Button>
				) : (
					<>
						<Button onClick={pauseRecording}>
							<Pause className="mr-2" />
							Pause
						</Button>
						<Button onClick={stopRecording}>
							<StopIcon className="mr-2" />
							Stop
						</Button>
					</>
				)}
			</div>

			{isRecording && (
				<div className="flex items-center space-x-2">
					<div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
					<span>{formatTime(recordingTime)}</span>
				</div>
			)}

			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Recordings</h3>
				{recordings.map((recording, index) => (
					<div key={index} className="flex items-center space-x-2">
						<video
							src={recording.url}
							controls
							className="w-64 h-36 object-cover rounded"
						/>
						<div>
							<p>{recording.name}</p>
							<p>{formatTime(recording.duration)}</p>
						</div>
						<Button onClick={() => deleteRecording(index)}>
							<Trash2 />
						</Button>
					</div>
				))}
			</div>
		</div>
	)
}
