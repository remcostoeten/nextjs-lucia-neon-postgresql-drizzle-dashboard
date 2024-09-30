import { Label, RadioGroup, RadioGroupItem } from 'ui'
import { Pattern } from '../_utils/bg-creator.types'

interface PatternSelectorProps {
	pattern: Pattern
	onChange: (pattern: Pattern) => void
}

export function PatternSelector({ pattern, onChange }: PatternSelectorProps) {
	return (
		<div className="space-y-2">
			<Label className="text-sm font-medium">Pattern</Label>
			<RadioGroup
				value={pattern}
				onValueChange={value => onChange(value as Pattern)}
				className="flex space-x-4"
			>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="dot" id="dot-pattern" />
					<Label htmlFor="dot-pattern">Dot</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="grid" id="grid-pattern" />
					<Label htmlFor="grid-pattern">Grid</Label>
				</div>
			</RadioGroup>
		</div>
	)
}
