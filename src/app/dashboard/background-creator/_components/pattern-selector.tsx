import { useState } from 'react'
import { Input, RadioGroup, RadioGroupItem } from 'ui'
import { Pattern } from '../_utils/types'

interface PatternSelectorProps {
	pattern: Pattern
	color: string
	opacity: number
	onChange: (pattern: Pattern, color: string, opacity: number) => void
}

export default function PatternSelector({
	pattern,
	color,
	opacity,
	onChange
}: PatternSelectorProps) {
	const [currentColor, setCurrentColor] = useState(color)
	const [currentOpacity, setCurrentOpacity] = useState(opacity)

	const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newColor = e.target.value
		setCurrentColor(newColor)
		onChange(pattern, newColor, currentOpacity)
	}

	const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newOpacity = parseFloat(e.target.value)
		setCurrentOpacity(newOpacity)
		onChange(pattern, currentColor, newOpacity)
	}

	return (
		<div className="space-y-2">
			<label className="text-sm font-medium">Pattern Type</label>
			<RadioGroup
				value={pattern}
				onValueChange={value =>
					onChange(value as Pattern, currentColor, currentOpacity)
				}
				className="flex space-x-4"
			>
				<div className="flex items-center">
					<RadioGroupItem value="dot" id="dot-pattern" />
					<label
						htmlFor="dot-pattern"
						className="ml-2 cursor-pointer"
					>
						Dot Pattern
					</label>
				</div>
				<div className="flex items-center">
					<RadioGroupItem value="grid" id="grid-pattern" />
					<label
						htmlFor="grid-pattern"
						className="ml-2 cursor-pointer"
					>
						Grid Pattern
					</label>
				</div>
			</RadioGroup>
			<div className="flex items-center space-x-2">
				<label className="text-sm font-medium">Color</label>
				<Input
					type="color"
					value={currentColor}
					onChange={handleColorChange}
					className="border rounded"
				/>
			</div>
			<div className="flex items-center space-x-2">
				<label className="text-sm font-medium">Opacity</label>
				<Input
					type="number"
					value={currentOpacity}
					onChange={handleOpacityChange}
					min="0"
					max="1"
					step="0.01"
					className="border rounded"
				/>
			</div>
		</div>
	)
}
