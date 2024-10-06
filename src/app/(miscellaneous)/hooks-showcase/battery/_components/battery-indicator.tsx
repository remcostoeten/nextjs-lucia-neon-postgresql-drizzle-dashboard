import { cn } from 'cn'
import {
	BatteryChargingIcon,
	BatteryFullIcon,
	BatteryIcon,
	BatteryLowIcon,
	BatteryMediumIcon,
	BatteryWarningIcon,
	InfinityIcon
} from 'lucide-react'
import React from 'react'

type BatteryInfoProps = {
	level: number | null
	isCharging: boolean | null
	chargingTime: number | null
	dischargingTime: number | null
	className?: string
}

export const BatteryIndicator: React.FC<BatteryInfoProps> = ({
	level,
	isCharging,
	chargingTime,
	dischargingTime,
	className
}) => {
	const getBatteryIcon = (
		level: number | null,
		isCharging: boolean | null
	) => {
		const baseClass = 'size-5'
		const pulseClass = 'animate-pulse'

		if (level === null) {
			return (
				<BatteryIcon
					className={`${baseClass} text-orange-500 ${pulseClass}`}
				/>
			)
		}
		if (isCharging) {
			return (
				<BatteryChargingIcon
					className={`${baseClass} text-blue-500 ${pulseClass}`}
				/>
			)
		}
		if (level >= 90) {
			return (
				<BatteryFullIcon className={`${baseClass} text-emerald-500`} />
			)
		}
		if (level >= 50) {
			return (
				<BatteryMediumIcon className={`${baseClass} text-lime-500`} />
			)
		}
		if (level >= 20) {
			return <BatteryLowIcon className={`${baseClass} text-yellow-500`} />
		}
		return <BatteryWarningIcon className={`${baseClass} text-red-500`} />
	}

	const getTextColor = (level: number | null) => {
		if (level === null) {
			return 'text-orange-500'
		}
		if (level >= 50) {
			return 'text-emerald-500'
		}
		if (level >= 20) {
			return 'text-yellow-500'
		}
		return 'text-red-500'
	}

	const formatTime = (time: number | null) => {
		if (time === null) {
			return ''
		}
		if (!Number.isFinite(time)) {
			return <InfinityIcon className="inline size-3" />
		}
		const hours = Math.floor(time / 3600)
		const minutes = Math.floor((time % 3600) / 60)
		if (hours > 23) {
			return '>1d'
		}
		return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
	}

	return (
		<div
			className={cn(
				'flex items-center space-x-2 rounded-2xl border bg-section-lighter my-2 w-fit px-3 py-1 shadow-sm transition-all duration-300 hover:shadow-md ',
				className
			)}
		>
			{getBatteryIcon(level, isCharging)}
			<div className="flex flex-col">
				<span className={`font-medium text-sm ${getTextColor(level)}`}>
					{level !== null ? `${Math.round(level)}%` : 'Unavailable'}
				</span>
				<span className="flex items-center text-neutral-500 text-xs">
					{isCharging ? (
						<>
							<span className="mr-1">⚡</span>
							{formatTime(chargingTime)}
						</>
					) : (
						formatTime(dischargingTime)
					)}
				</span>
			</div>
		</div>
	)
}
