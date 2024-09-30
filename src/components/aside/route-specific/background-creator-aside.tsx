'use client'

import { Button } from 'ui'
import { Smartphone, Tablet, Monitor } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSiteSettingsStore } from '@/core/stores/store.site-settings'
import { useBackgroundConfig } from '@/app/dashboard/background-creator/_utils/use-background-config'
import { DeviceSize } from '@/app/dashboard/background-creator/_utils/bg-creator.types'

export default function BackgroundGeneratorSidebar() {
	const { deviceSize, setDeviceSize, config } = useBackgroundConfig()
	const { disableSidebarAnimations } = useSiteSettingsStore()

	const handleDeviceChange = (size: DeviceSize) => {
		setDeviceSize(size)
	}

	const getAnimationProps = (delay: number) =>
		disableSidebarAnimations
			? {}
			: {
					initial: { opacity: 0, y: 20 },
					animate: { opacity: 1, y: 0 },
					transition: { delay, duration: 0.3 }
				}

	const MotionDiv = disableSidebarAnimations ? 'div' : motion.div

	return (
		<aside className="w-full bg-background p-4 border-r border-border h-full overflow-y-auto">
			<MotionDiv {...getAnimationProps(0.1)}>
				<h2 className="text-xl font-semibold mb-4">
					Background Generator
				</h2>
			</MotionDiv>

			<MotionDiv {...getAnimationProps(0.2)}>
				<h3 className="text-lg font-semibold mb-2">Preview Size</h3>
				<div className="flex space-x-2 mb-4">
					<Button
						variant={
							deviceSize === 'mobile' ? 'default' : 'outline'
						}
						size="icon"
						onClick={() => handleDeviceChange('mobile')}
					>
						<Smartphone className="h-4 w-4" />
					</Button>
					<Button
						variant={
							deviceSize === 'tablet' ? 'default' : 'outline'
						}
						size="icon"
						onClick={() => handleDeviceChange('tablet')}
					>
						<Tablet className="h-4 w-4" />
					</Button>
					<Button
						variant={
							deviceSize === 'desktop' ? 'default' : 'outline'
						}
						size="icon"
						onClick={() => handleDeviceChange('desktop')}
					>
						<Monitor className="h-4 w-4" />
					</Button>
				</div>
			</MotionDiv>

			<MotionDiv {...getAnimationProps(0.3)}>
				<h3 className="text-lg font-semibold mb-2">Metrics</h3>
				<ul className="space-y-2">
					<li>Total Layers: {config.layers.length}</li>
					<li>
						Active Animations:{' '}
						{
							config.layers.filter(
								layer => layer.animationEnabled
							).length
						}
					</li>
					<li>
						Gradients Used:{' '}
						{
							config.layers.filter(layer => layer.gradientEnabled)
								.length
						}
					</li>
				</ul>
			</MotionDiv>
		</aside>
	)
}
