import { cn } from 'cn'
import { File } from 'lucide-react'

interface FileNameLabelProps {
	fileName: string
	color?: string
}

export function FileNameLabel({ fileName, color }: FileNameLabelProps) {
	const baseClasses =
		'flex items-center gap-2 rounded-full px-3 py-1 border transition-all duration-200'
	const colorClasses = color
		? `border-${color}-500/30 bg-${color}-500/10 text-${color}-400 hover:border-${color}-400 hover:text-${color}-300`
		: 'bg-[#111111] border-[#333333] hover:border-[#444444]'

	return (
		<div className={cn(baseClasses, colorClasses)}>
			<File
				size={12}
				className={color ? `text-${color}-400` : 'text-zinc-400'}
			/>
			<span
				className={cn(
					'text-sm font-medium transition-colors duration-200',
					color
						? `text-${color}-400 hover:text-${color}-300`
						: 'text-zinc-400 hover:text-zinc-300'
				)}
			>
				{fileName}
			</span>
		</div>
	)
}
