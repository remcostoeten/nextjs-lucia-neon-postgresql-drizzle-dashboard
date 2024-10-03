import { Monitor, Smartphone, Tablet } from 'lucide-react'
import { Button } from 'ui'
import { DeviceSize } from '../_utils/types'
import React from 'react'

interface ResponsivePreviewProps {
	deviceSize: DeviceSize
	setDeviceSize: (size: DeviceSize) => void
}

export function ResponsivePreview({
	deviceSize,
	setDeviceSize
}: ResponsivePreviewProps) {
	return (
		<div className="fixed top-4 left-4 flex space-x-2">
			<Button
				variant={deviceSize === 'mobile' ? 'default' : 'outline'}
				size="icon"
				onClick={() => setDeviceSize('mobile')}
			>
				<Smartphone className="h-4 w-4" />
			</Button>
			<Button
				variant={deviceSize === 'tablet' ? 'default' : 'outline'}
				size="icon"
				onClick={() => setDeviceSize('tablet')}
			>
				<Tablet className="h-4 w-4" />
			</Button>
			<Button
				variant={deviceSize === 'desktop' ? 'default' : 'outline'}
				size="icon"
				onClick={() => setDeviceSize('desktop')}
			>
				<Monitor className="h-4 w-4" />
			</Button>
		</div>
	)
}
