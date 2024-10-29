import { ElementType, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

// Define the props for the Container component
interface ContainerProps<T extends ElementType = 'div'> {
	as?: T // Optional element type to render as
	children: ReactNode // The content of the container
	className?: string // Additional class names to apply
	maxWidth?: string // Maximum width of the container
	horizontalAlignment?: 'left' | 'center' | 'right' // Horizontal alignment of the container
	paddingX?: string // Horizontal padding
	paddingY?: string // Vertical padding
	marginX?: string // Horizontal margin
	marginY?: string // Vertical margin
	[key: string]: any // Allow any additional props
}

// The Container component
const Container = <T extends ElementType = 'div'>({
	as,
	children,
	className = '',
	maxWidth = 'lg:max-w-[1128px]', // Default max width for large screens
	horizontalAlignment = 'center', // Default horizontal alignment
	paddingX = 'px-theme', // Default horizontal padding
	paddingY = '',
	marginX = '',
	marginY = '',
	...props
}: ContainerProps<T>) => {
	// Determine the component to render based on the 'as' prop
	const Component = as || 'div'

	// Map horizontal alignment to Tailwind CSS classes
	const horizontalAlignmentClass = {
		left: 'mx-0', // No horizontal margin for left alignment
		center: 'mx-auto', // Auto margin for center alignment
		right: 'ml-auto' // Margin left auto for right alignment
	}[horizontalAlignment]

	// Merge all class names to apply to the container
	const containerClasses = twMerge(
		maxWidth,
		horizontalAlignmentClass,
		paddingX,
		paddingY,
		marginX,
		marginY,
		className
	)

	// Render the component with the merged class names and props
	return (
		<Component className={containerClasses} {...props}>
			{children}
		</Component>
	)
}

export default Container
