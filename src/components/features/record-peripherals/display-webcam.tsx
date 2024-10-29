import { Video } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from 'ui'

export default function WebcamRecorder() {
	const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null)
	const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([])
	const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([])

	const videoRef = useRef<HTMLVideoElement | null>(null)

	useEffect(() => {
		const getDevices = async () => {
			const devices = await navigator.mediaDevices.enumerateDevices()
			setAudioDevices(
				devices.filter(device => device.kind === 'audioinput')
			)
			setVideoDevices(
				devices.filter(device => device.kind === 'videoinput')
			)
		}

		getDevices()
	}, [])

	const startWebcamPreview = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true
			})
			setWebcamStream(stream)
			if (videoRef.current) {
				videoRef.current.srcObject = stream
			}
		} catch (error) {
			console.error('Error accessing webcam:', error)
		}
	}

	const stopWebcamPreview = () => {
		if (webcamStream) {
			webcamStream.getTracks().forEach(track => track.stop())
			setWebcamStream(null)
		}
	}

	return (
		<div className="space-y-4">
			<div className="aspect-video bg-card border rounded-lg overflow-hidden">
				<video
					ref={videoRef}
					autoPlay
					playsInline
					muted
					className="w-full h-full Sobject-cover"
				/>
			</div>
			<div className="flex justify-center">
				<Button
					onClick={
						webcamStream ? stopWebcamPreview : startWebcamPreview
					}
				>
					<Video className="mr-2" />
					{webcamStream ? 'Stop Webcam' : 'Start Webcam'}
				</Button>
			</div>

			<div className="space-y-2">
				<h3 className="text-lg font-semibold">Hardware Info</h3>
				<div>
					<h4 className="font-medium">Audio Devices:</h4>
					<ul className="list-disc list-inside">
						{audioDevices.map((device, index) => (
							<li key={device.deviceId}>
								{device.label || `Audio Device ${index + 1}`}
							</li>
						))}
					</ul>
				</div>
				<div>
					<h4 className="font-medium">Video Devices:</h4>
					<ul className="list-disc list-inside">
						{videoDevices.map((device, index) => (
							<li key={device.deviceId}>
								{device.label || `Video Device ${index + 1}`}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}
