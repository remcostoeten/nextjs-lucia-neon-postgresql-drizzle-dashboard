'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Paintbrush } from 'lucide-react'
import { useState } from 'react'

interface ColorPickerProps {
	label?: string
	color: string
	onChange: (color: string) => void
}

export function ColorPicker({ label, color, onChange }: ColorPickerProps) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<Label htmlFor={`color-${label}`}>{label}</Label>
			<Popover open={isOpen} onOpenChange={setIsOpen}>
				<PopoverTrigger asChild>
					<Button
						id={`color-${label}`}
						variant="outline"
						className={cn(
							'w-[280px] justify-start text-left font-normal',
							!color && 'text-muted-foreground'
						)}
					>
						<div
							className="mr-2 h-4 w-4 rounded-full border"
							style={{ backgroundColor: color }}
						/>
						{color}
						<Paintbrush className="ml-auto h-4 w-4 text-muted-foreground" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[280px] p-3">
					<div className="flex items-center justify-between">
						<Label htmlFor={`color-input-${label}`}>Color</Label>
						<Input
							id={`color-input-${label}`}
							type="color"
							value={color}
							onChange={e => onChange(e.target.value)}
							className="h-8 w-8 cursor-pointer border-0 p-0"
						/>
					</div>
					<div className="mt-2">
						<Input
							id={`color-hex-${label}`}
							value={color}
							onChange={e => onChange(e.target.value)}
							className="font-mono "
						/>
					</div>
				</PopoverContent>
			</Popover>
		</>
	)
}
