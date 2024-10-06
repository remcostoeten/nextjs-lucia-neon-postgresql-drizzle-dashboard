'use client'

import { useBattery } from '@/core/hooks/use-battery'
import { HooksShowcaseWrapper } from '../_components/hooks-showcase-wrapper'
import BatteryStatusPreview from './_components/battery-indicator-preview'

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

	const codeString = `import React from "react";

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
			demoComponent={<BatteryStatusPreview />}
			codeString={codeString}
			fileName="useBattery.ts"
			language="typescript"
			description="This hook provides real-time battery information for devices that support the Battery Status API. It returns an object with details such as battery level, charging status, and estimated time for charging or discharging."
		/>
	)
}

export default BatteryDemo
