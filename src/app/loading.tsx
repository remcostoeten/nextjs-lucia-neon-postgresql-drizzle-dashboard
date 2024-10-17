import Center from '@/components/atoms/Center'
import HeartbeatLoader from '@/components/effects/loaders/heartbeat-loader'

export default function Loading() {
	return (
		<Center method="grid">
			<HeartbeatLoader />
		</Center>
	)
}
