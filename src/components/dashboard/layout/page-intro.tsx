import { Flex } from '@/components/atoms'
import { Button } from '@/components/ui'

type FeatureProps = {
	title: string
	description: string
	action?: () => void
	actionText?: string
}

export default function FeatureTitle({
	title,
	description,
	action,
	actionText
}: FeatureProps) {
	return (
		<Flex className="w-full mb-6" as="nav" align="center" justify="between">
			<Flex dir="col" gap="4">
				<h1 className="text-3xl font-bold">
					<span className="gradient-span">{title}</span>
				</h1>
				{description && (
					<p className="text-subtitle mb-4">{description}</p>
				)}
			</Flex>
			{action && actionText && (
				<Button onClick={action}>{actionText}</Button>
			)}
		</Flex>
	)
}
