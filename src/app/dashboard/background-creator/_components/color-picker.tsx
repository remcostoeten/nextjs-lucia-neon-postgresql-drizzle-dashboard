import { Label } from 'ui'

interface ColorPickerProps {
	label: string
	color: string
	onChange: (color: string) => void
}

export function ColorPicker({ label, color, onChange }: ColorPickerProps) {
	return (
		<div className="space-y-2">
			<Label htmlFor={`color-${label}`}>{label}</Label>
			<div className="flex items-center space-x-2">
				<input
					type="color"
					id={`color-${label}`}
					value={color}
					onChange={e => onChange(e.target.value)}
					className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer"
				/>
				<input
					type="text"
					value={color}
					onChange={e => onChange(e.target.value)}
					className="bg-gray-800 text-white px-2 py-1 rounded-md w-24"
				/>
			</div>
		</div>
	)
}
