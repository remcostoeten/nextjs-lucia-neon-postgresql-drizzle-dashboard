import { ArrowRightIcon } from '@radix-ui/react-icons'
import { cn } from 'cn'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { Button } from 'ui'

type BentoGridProps = {
	children: ReactNode
	className?: string
}

const BentoGrid = ({ children, className }: BentoGridProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1, delay: 1 }}
			className={cn(
				'grid w-full auto-rows-[16rem] grid-cols-3 gap-4 transition-opacity duration-1500 ease-in-out',
				'transform-gpu',
				'translate-y-10 group-hover:translate-y-0',
				className
			)}
		>
			{children}
		</motion.div>
	)
}

const BentoCard = ({
	name,
	className,
	background,
	Icon,
	description,
	href,
	cta
}: {
	name: string
	className: string
	background: ReactNode
	Icon: any
	description: string
	href: string
	cta: string
}) => (
	<motion.div
		key={name}
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 1.5 }}
		className={cn(
			'x group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl',
			'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
			'transform-gpu dark:bg-body dark:[border:1px_solid_rgba(39,38,39,.)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] border-outline-soft',
			className
		)}
	>
		<div>{background}</div>
		<div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
			<Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
			<h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
				{name}
			</h3>
			<p className="max-w-lg text-neutral-400">{description}</p>
		</div>

		<div
			className={cn(
				'pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'
			)}
		>
			<Button
				variant="ghost"
				asChild
				size="sm"
				className="pointer-events-auto"
			>
				<a href={href}>
					{cta}
					<ArrowRightIcon className="ml-2 h-4 w-4" />
				</a>
			</Button>
		</div>
		<div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
	</motion.div>
)

export { BentoCard, BentoGrid }
