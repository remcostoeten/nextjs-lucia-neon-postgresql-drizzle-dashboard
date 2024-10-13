import MediaRecorder from '@/components/features/record-peripherals/peripherals-recorder'

type RecordingPageProps = {
	// Add any props if needed in the future
}

export default function RecordingPage({}: RecordingPageProps) {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6 text-center">
				Media Recorder
			</h1>
			<MediaRecorder />
		</div>
	)
}
