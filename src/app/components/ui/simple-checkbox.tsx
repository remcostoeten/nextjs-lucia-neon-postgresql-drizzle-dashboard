import { cn } from 'cn'
import React from 'react'

interface SimpleCheckboxProps {
	label: string
	checked: boolean
	onCheckedChange: (checked: boolean) => void
	className?: string
}

const SimpleCheckbox: React.FC<SimpleCheckboxProps> = ({
	label,
	checked,
	onCheckedChange,
	className,
	...props
}) => {
	const lowerCaseLabel = label.toLowerCase()

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onCheckedChange(event.target.checked)
	}

	return (
		<label
			className="flex w-fit cursor-pointer items-center rounded-lg border border-transparent px-3 py-2 transition-all hover:bg-teal-500/10 focus:bg-teal-500/30 active:border-teal-500/30 active:bg-teal-500/30"
			htmlFor={lowerCaseLabel}
		>
			<span className="inline-flex items-center">
				<span className="relative flex cursor-pointer items-center">
					<input
						className={cn('peer size-4 opacity-0', className)}
						id={lowerCaseLabel}
						type="checkbox"
						checked={checked}
						onChange={handleChange}
						{...props}
					/>
					<span className="absolute inset-0 rounded-[5px] border border-teal-500 before:absolute before:inset-0 before:scale-0 before:rounded-[4px] before:bg-teal-500 before:transition-all peer-checked:before:scale-105 peer-hover:before:scale-50 peer-checked:peer-hover:before:scale-90" />
				</span>
				<span className="ml-2 cursor-pointer text-neutral-600 text-sm dark:text-neutral-500">
					{label}
				</span>
			</span>
		</label>
	)
}

export default SimpleCheckbox
