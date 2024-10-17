'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { buttonVariants } from '@/components/ui/button'
import { cn } from 'cn'
;('')
// Styling constants
const CALENDAR_STYLES = {
	CONTAINER: 'p-3',
	MONTHS: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
	MONTH: 'space-y-4',
	CAPTION: 'flex justify-center pt-1 relative items-center',
	CAPTION_LABEL: 'text-sm font-medium',
	NAV: 'space-x-1 flex items-center',
	NAV_BUTTON: cn(
		buttonVariants({ variant: 'outline' }),
		'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
	),
	NAV_BUTTON_PREVIOUS: 'absolute left-1',
	NAV_BUTTON_NEXT: 'absolute right-1',
	TABLE: 'w-full border-collapse space-y-1',
	HEAD_ROW: 'flex',
	HEAD_CELL: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
	ROW: 'flex w-full mt-2',
	CELL: [
		'h-9 w-9 text-center text-sm p-0 relative',
		'[&:has([aria-selected].day-range-end)]:rounded-r-md',
		'[&:has([aria-selected].day-outside)]:bg-accent/50',
		'[&:has([aria-selected])]:bg-accent',
		'first:[&:has([aria-selected])]:rounded-l-md',
		'last:[&:has([aria-selected])]:rounded-r-md',
		'focus-within:relative focus-within:z-20'
	].join(' '),
	DAY: cn(
		buttonVariants({ variant: 'ghost' }),
		'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
	),
	DAY_RANGE_END: 'day-range-end',
	DAY_SELECTED: [
		'bg-primary text-primary-foreground',
		'hover:bg-primary hover:text-primary-foreground',
		'focus:bg-primary focus:text-primary-foreground'
	].join(' '),
	DAY_TODAY: 'bg-accent text-accent-foreground',
	DAY_OUTSIDE: [
		'day-outside text-muted-foreground opacity-50',
		'aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30'
	].join(' '),
	DAY_DISABLED: 'text-muted-foreground opacity-50',
	DAY_RANGE_MIDDLE:
		'aria-selected:bg-accent aria-selected:text-accent-foreground',
	DAY_HIDDEN: 'invisible'
}

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn(CALENDAR_STYLES.CONTAINER, className)}
			classNames={{
				months: CALENDAR_STYLES.MONTHS,
				month: CALENDAR_STYLES.MONTH,
				caption: CALENDAR_STYLES.CAPTION,
				caption_label: CALENDAR_STYLES.CAPTION_LABEL,
				nav: CALENDAR_STYLES.NAV,
				nav_button: CALENDAR_STYLES.NAV_BUTTON,
				nav_button_previous: CALENDAR_STYLES.NAV_BUTTON_PREVIOUS,
				nav_button_next: CALENDAR_STYLES.NAV_BUTTON_NEXT,
				table: CALENDAR_STYLES.TABLE,
				head_row: CALENDAR_STYLES.HEAD_ROW,
				head_cell: CALENDAR_STYLES.HEAD_CELL,
				row: CALENDAR_STYLES.ROW,
				cell: CALENDAR_STYLES.CELL,
				day: CALENDAR_STYLES.DAY,
				day_range_end: CALENDAR_STYLES.DAY_RANGE_END,
				day_selected: CALENDAR_STYLES.DAY_SELECTED,
				day_today: CALENDAR_STYLES.DAY_TODAY,
				day_outside: CALENDAR_STYLES.DAY_OUTSIDE,
				day_disabled: CALENDAR_STYLES.DAY_DISABLED,
				day_range_middle: CALENDAR_STYLES.DAY_RANGE_MIDDLE,
				day_hidden: CALENDAR_STYLES.DAY_HIDDEN,
				...classNames
			}}
			components={{
				IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
				IconRight: ({ ...props }) => (
					<ChevronRight className="h-4 w-4" />
				)
			}}
			{...props}
		/>
	)
}
Calendar.displayName = 'Calendar'

export { Calendar }
