'use client'

import { DesignSystemWrapperProps } from '@/types/design-system'
import { Button, Card } from 'ui'

export default function DesignSystemWrapper({
	title,
	description,
	actionButtons = [],
	children
}: DesignSystemWrapperProps) {
	return (
		<div className="mx-auto container">
			<div className="mb-8">
				<h2 className="text-xl font-bold">{title}</h2>
				<p className="text-muted-foreground mt-2">{description}</p>
			</div>
			{actionButtons.length > 0 && (
				<Card className="bg-dark-section mb-8">
					<div className="flex flex-wrap p-4 gap-4">
						{actionButtons.map((button, index) => (
							<Button
								key={index}
								onClick={button.onClick}
								variant="outline"
							>
								{button.label}
							</Button>
						))}
					</div>
				</Card>
			)}
			<div className="bg-dark-section space-y-4 rounded-lg space-x-4 flex flex-col gap-4">
				{children}
			</div>
		</div>
	)
}
