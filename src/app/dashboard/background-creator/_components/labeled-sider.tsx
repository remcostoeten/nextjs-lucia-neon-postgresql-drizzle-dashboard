import { Label, Slider } from 'ui'

type LabeledSliderProps = {
	label: string
	value: number[]
	onValueChange: (value: number[]) => void
	min: number
	max: number
	step?: number
}

export default function LabeledSlider({
	label,
	value,
	onValueChange,
	min,
	max,
	step
}: LabeledSliderProps) {
	return (
		<div className="space-y-2">
			<Label htmlFor={label}>{label}</Label>
			<Slider
				id={label}
				value={value}
				onValueChange={onValueChange}
				min={min}
				max={max}
				step={step}
			/>
		</div>
	)
}
