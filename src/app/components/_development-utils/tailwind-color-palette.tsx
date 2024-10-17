'use client'

import tailwindConfig from '@/../tailwind.config'
import { CommandCode } from '@/components/elements/display-code/command-inline-code'
import { Grid, List } from 'lucide-react'
import { useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import { Button, Switch } from 'ui'

const fullConfig = resolveConfig(tailwindConfig)
const colorCategories = Object.keys(fullConfig.theme.colors)
const defaultColors = new Set([
	'slate',
	'gray',
	'zinc',
	'neutral',
	'stone',
	'red',
	'orange',
	'amber',
	'yellow',
	'lime',
	'green',
	'emerald',
	'teal',
	'cyan',
	'sky',
	'blue',
	'indigo',
	'violet',
	'purple',
	'fuchsia',
	'pink',
	'rose'
])

export function TailwindColorPalette() {
	const [hideCode, setHideCode] = useState(false)
	const [showCustomOnly, setShowCustomOnly] = useState(false)
	const [isGridView, setIsGridView] = useState(true)

	const shouldShowColor = (category: string) => {
		if (!showCustomOnly) return true
		return !defaultColors.has(category.toLowerCase())
	}

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold">Tailwind Color Palette</h2>
			<div className="gap-4">
				<div className="flex items-center space-x-2 flex-col">
					<Switch
						checked={hideCode}
						onCheckedChange={setHideCode}
						id="hide-code"
					/>
					<label htmlFor="hide-code">Hide Code</label>
				</div>
				<div className="flex items-start space-x-2 flex-col gap-y-4">
					<Switch
						checked={showCustomOnly}
						onCheckedChange={setShowCustomOnly}
						id="show-custom"
					/>
					<label htmlFor="show-custom">Show Custom Colors Only</label>
				</div>
				<Button
					variant="outline"
					size="icon"
					onClick={() => setIsGridView(!isGridView)}
				>
					{isGridView ? <List size={16} /> : <Grid size={16} />}
				</Button>
			</div>
			<div
				className={
					isGridView
						? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
						: 'space-y-4'
				}
			>
				{colorCategories.map(category => {
					if (!shouldShowColor(category)) return null
					const colorValue = fullConfig.theme.colors[category]
					if (typeof colorValue === 'string') {
						return (
							<div key={category} className="space-y-2">
								<h3 className="text-lg font-semibold capitalize">
									{category}
								</h3>
								<div className="flex items-start space-x-2 flex-col gap-y-4">
									<div
										className="w-16 h-16 border rounded"
										style={{ backgroundColor: colorValue }}
									/>
									{!hideCode && (
										<CommandCode>{`bg-${category}`}</CommandCode>
									)}
								</div>
							</div>
						)
					} else if (typeof colorValue === 'object') {
						return (
							<div key={category} className="space-y-2">
								<h3 className="text-lg font-semibold capitalize">
									{category}
								</h3>
								<div
									className={
										isGridView
											? 'grid grid-cols-2 gap-2'
											: 'flex flex-col space-y-2'
									}
								>
									{Object.entries(colorValue).map(
										([shade, shadeValue]) => (
											<div
												key={shade}
												className="flex items-center space-x-2"
											>
												<div
													className="w-8 h-8 rounded"
													style={{
														backgroundColor:
															shadeValue as string
													}}
												/>
												{!hideCode && (
													<CommandCode>{`bg-${category}-${shade}`}</CommandCode>
												)}
											</div>
										)
									)}
								</div>
							</div>
						)
					}
					return null
				})}
			</div>
		</div>
	)
}
