import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

type CalendarHeatmapProps = {
	className?: string
}

const StyledCalendarHeatmap = ({
	className,
	...props
}: CalendarHeatmapProps) => {
	// Sample data for the heatmap
	const today = new Date()
	const heatmapData = [
		{ date: new Date(today.getFullYear(), today.getMonth(), 1), weight: 1 },
		{ date: new Date(today.getFullYear(), today.getMonth(), 5), weight: 2 },
		{
			date: new Date(today.getFullYear(), today.getMonth(), 10),
			weight: 3
		},
		{
			date: new Date(today.getFullYear(), today.getMonth(), 15),
			weight: 4
		},
		{ date: new Date(today.getFullYear(), today.getMonth(), 20), weight: 5 }
	]

	const getHeatmapClass = date => {
		const entry = heatmapData.find(
			d => d.date.toDateString() === date.toDateString()
		)
		if (entry) {
			return `heatmap-${entry.weight}`
		}
		return ''
	}

	return (
		<DayPicker
			className={cn('p-3 text-subtitle rounded-lg shadow-lg', className)}
			classNames={{
				months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
				month: 'space-y-4',
				caption: 'flex justify-center pt-1 relative items-center',
				caption_label: 'text-sm font-medium text-subtitle',
				nav: 'space-x-1 flex items-center',
				nav_button:
					'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
				nav_button_previous: 'absolute left-1',
				nav_button_next: 'absolute right-1',
				table: 'w-full border-collapse space-y-1',
				head_row: 'flex',
				head_cell:
					'text-subtitle rounded-md w-9 font-normal text-[0.8rem]',
				row: 'flex w-full mt-2',
				cell: 'h-9 w-9 text-center text-sm p-0 relative',
				day: 'h-9 w-9 p-0 font-normal hover:bg-gray-100 rounded-full transition-colors',
				day_selected: 'bg-blue-500 text-white hover:bg-blue-600',
				day_today: 'border-2 border-blue-500',
				day_outside: 'text-gray-300',
				day_disabled: 'text-gray-300',
				day_hidden: 'invisible'
			}}
			components={{
				IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
				IconRight: ({ ...props }) => (
					<ChevronRight className="h-4 w-4" />
				)
			}}
			modifiers={{
				heatmap: date => getHeatmapClass(date) !== ''
			}}
			modifiersClassNames={{
				heatmap: date => getHeatmapClass(date)
			}}
			{...props}
		/>
	)
}

// CSS for the heatmap colors
const styles = `
  .heatmap-1 { background-color: #e0f2f1; }
  .heatmap-2 { background-color: #b2dfdb; }
  .heatmap-3 { background-color: #80cbc4; }
  .heatmap-4 { background-color: #4db6ac; }
  .heatmap-5 { background-color: #26a69a; }
`

const CalendarWithStyles = ({ className }: CalendarHeatmapProps) => (
	<div
		className={`absolute inset-0 origin-top rounded-md border transition-all duration-300 height-[200px] ease-out mask-image-linear-gradient-to_top-transparent_40%-#000_100%-group-hover-scale-105 ${className}`}
	>
		<style>{styles}</style>
		<StyledCalendarHeatmap />
	</div>
)

export default CalendarWithStyles
