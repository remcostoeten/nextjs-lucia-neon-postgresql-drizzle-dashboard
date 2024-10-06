import React from 'react'
import LoadingDots from '@/components/effects/loaders/loading-dots'
import { BatteryIndicator } from './battery-indicator'
import { useBattery } from '@/core/hooks'

const BatteryStatus = () => {
	const batteryState = useBattery()
	// const [isDesktop, setIsDesktop] = React.useState(false);

	// React.useEffect(() => {
	//     // Simple check for desktop: no touch support and large screen
	//     const checkIfDesktop = () => {
	//         const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
	//         const isLargeScreen = window.innerWidth >= 1024; // Arbitrary breakpoint
	//         setIsDesktop(!isTouch && isLargeScreen);
	//     };

	//     checkIfDesktop();
	//     window.addEventListener('resize', checkIfDesktop);
	//     return () => window.removeEventListener('resize', checkIfDesktop);
	// }, []);

	// if (isDesktop) {
	//     return <div>This feature is only available on mobile devices.</div>;
	// }

	// if (!batteryState.isSupported) {
	//     return <div>Battery status is not supported on this device.</div>;
	// }

	if (batteryState.isLoading) {
		return (
			<span>
				<LoadingDots />
			</span>
		)
	}

	return (
		<BatteryIndicator
			level={batteryState.level}
			isCharging={batteryState.isCharging}
			chargingTime={batteryState.chargingTime}
			dischargingTime={batteryState.dischargingTime}
		/>
	)
}

export default BatteryStatus
