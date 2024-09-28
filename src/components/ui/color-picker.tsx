'use client'

import type { ButtonProps } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { cn } from 'cn'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

interface ColorPickerProps {
	value: string
	onChange: (value: string) => void
	onBlur?: () => void
}

const ColorPicker = forwardRef<
	HTMLInputElement,
	Omit<ButtonProps, 'value' | 'onChange' | 'onBlur'> & ColorPickerProps
>(
	(
		{ disabled, value, onChange, onBlur, name, className, ...props },
		forwardedRef
	) => {
		const ref = useForwardedRef(forwardedRef)
		const [open, setOpen] = useState(false)
		const defaultColor = '#FFFFFF'

		const parsedValue = useMemo(() => {
			return value || defaultColor
		}, [value])

		return (
			<Popover onOpenChange={setOpen} open={open}>
				<PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
					<Button
						{...props}
						className={cn('block bg-red-400', className)}
						name={name}
						onClick={() => {
							setOpen(true)
						}}
						size="icon"
						style={{
							backgroundColor: parsedValue
						}}
						variant="outline"
					>
						<div />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-full">
					<HexColorPicker color={parsedValue} onChange={onChange} />
					<Input
						maxLength={7}
						onChange={e => {
							onChange(e?.currentTarget?.value)
						}}
						ref={ref}
						value={parsedValue}
					/>
				</PopoverContent>
			</Popover>
		)
	}
)
ColorPicker.displayName = 'ColorPicker'

export { ColorPicker }

export function useForwardedRef<T>(ref: React.ForwardedRef<T>) {
	const innerRef = useRef<T>(null)

	useEffect(() => {
		if (!ref) return
		if (typeof ref === 'function') {
			ref(innerRef.current)
		} else {
			ref.current = innerRef.current
		}
	})

	return innerRef
}
