'use client'

import { useBattery } from '@/core/hooks/use-battery'
import { BatteryCharging, BatteryWarning } from 'lucide-react'
import { HooksShowcaseWrapper } from '../_components/hooks-showcase-wrapper'

const BatteryDemo = () => {
	const batteryState = useBattery()

	const getBatteryColor = () => {
		if (!batteryState.isSupported || batteryState.isLoading)
			return 'bg-gray-400'
		if (batteryState.isCharging) return 'bg-green-500'
		if (batteryState.level === null) return 'bg-yellow-500'
		if (batteryState.level <= 0.2) return 'bg-red-500'
		if (batteryState.level <= 0.5) return 'bg-yellow-500'
		return 'bg-green-500'
	}

	const formatTime = (seconds: number | null) => {
		if (seconds === null || seconds === Infinity) return 'Unknown'
		const hours = Math.floor(seconds / 3600)
		const minutes = Math.floor((seconds % 3600) / 60)
		return `${hours}h ${minutes}m`
	}

	const demoComponent = (
		<div className="space-y-6">
			<div className="flex flex-col items-center justify-center space-y-4">
				<div className="relative w-48 h-24 border-2 border-gray-300 rounded-lg overflow-hidden">
					<div
						className={`absolute bottom-0 left-0 right-0 ${getBatteryColor()} transition-all duration-300 ease-in-out`}
						style={{
							height: `${Math.round((batteryState.level || 0) * 100)}%`
						}}
					></div>
					<div className="absolute inset-0 flex items-center justify-center">
						<span className="text-2xl font-bold text-white mix-blend-difference">
							{batteryState.isSupported
								? batteryState.isLoading
									? 'Loading...'
									: `${Math.round((batteryState.level || 0) * 100)}%`
								: 'Not Supported'}
						</span>
					</div>
					<div className="absolute -right-2 top-1/2 w-3 h-8 bg-gray-300 rounded-r-md transform -translate-y-1/2"></div>
					{batteryState.isCharging && (
						<BatteryCharging className="absolute top-2 right-2 w-6 h-6 text-white mix-blend-difference" />
					)}
					{batteryState.level === null && (
						<BatteryWarning className="absolute top-2 right-2 w-6 h-6 text-white mix-blend-difference" />
					)}
				</div>
			</div>
			{batteryState.isSupported && !batteryState.isLoading && (
				<div className="grid grid-cols-2 gap-4 text-sm">
					<div className="space-y-1">
						<div className="font-semibold">Charging Status</div>
						<div>
							{batteryState.isCharging
								? 'Charging'
								: 'Not Charging'}
						</div>
					</div>
					<div className="space-y-1">
						<div className="font-semibold">Battery Level</div>
						<div>
							{Math.round((batteryState.level || 0) * 100)}%
						</div>
					</div>
					<div className="space-y-1">
						<div className="font-semibold">Time to Full Charge</div>
						<div>{formatTime(batteryState.chargingTime)}</div>
					</div>
					<div className="space-y-1">
						<div className="font-semibold">Time to Discharge</div>
						<div>{formatTime(batteryState.dischargingTime)}</div>
					</div>
				</div>
			)}
		</div>
	)

	const codeString = `
import React from "react";

export interface BatteryState {
    isSupported: boolean;
    isLoading: boolean;
    level: number | null;
    isCharging: boolean | null;
    chargingTime: number | null;
    dischargingTime: number | null;
}

export interface BatteryManager extends EventTarget {
    level: number;
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    addEventListener(
        type: "levelchange" | "chargingchange" | "chargingtimechange" | "dischargingtimechange",
        listener: (this: BatteryManager, ev: Event) => void,
    ): void;
    removeEventListener(
        type: "levelchange" | "chargingchange" | "chargingtimechange" | "dischargingtimechange",
        listener: (this: BatteryManager, ev: Event) => void,
    ): void;
}

export interface Navigator {
    getBattery?: () => Promise<BatteryManager>;
}

declare const navigator: Navigator;

export function useBattery() {
    const [state, setState] = React.useState<BatteryState>({
        isSupported: true,
        isLoading: true,
        level: null,
        isCharging: null,
        chargingTime: null,
        dischargingTime: null,
    });

    React.useEffect(() => {
        if (!navigator.getBattery) {
            setState((s) => ({
                ...s,
                isSupported: false,
                isLoading: false,
            }));
            return;
        }

        let battery: BatteryManager | null = null;

        const handleChange = () => {
            if (battery) {
                setState({
                    isSupported: true,
                    isLoading: false,
                    level: battery.level,
                    isCharging: battery.charging,
                    chargingTime: battery.chargingTime,
                    dischargingTime: battery.dischargingTime,
                });
            }
        };

        navigator.getBattery().then((b) => {
            battery = b;
            handleChange();

            b.addEventListener("levelchange", handleChange);
            b.addEventListener("chargingchange", handleChange);
            b.addEventListener("chargingtimechange", handleChange);
            b.addEventListener("dischargingtimechange", handleChange);
        });

        return () => {
            if (battery) {
                battery.removeEventListener("levelchange", handleChange);
                battery.removeEventListener("chargingchange", handleChange);
                battery.removeEventListener("chargingtimechange", handleChange);
                battery.removeEventListener("dischargingtimechange", handleChange);
            }
        };
    }, []);

    return state;
}
`

	return (
		<HooksShowcaseWrapper
			title="useBattery Hook"
			demoComponent={demoComponent}
			codeString={codeString}
			fileName="useBattery.ts"
			language="typescript"
			description="This hook provides real-time battery information for devices that support the Battery Status API. It returns an object with details such as battery level, charging status, and estimated time for charging or discharging."
		/>
	)
}

export default BatteryDemo
