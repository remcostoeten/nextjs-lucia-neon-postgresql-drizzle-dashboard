import MediaRecorder from '@/components/features/record-peripherals/peripherals-recorder'

export default function RecordingPage() {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6 text-center">
				Media Recorder
			</h1>
			<MediaRecorder />
		</div>
	)
}
