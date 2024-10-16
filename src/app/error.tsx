'use client'

import { Flex } from '@/components/atoms'
import EnhancedCodeBlock from '@/components/elements/display-code/code-block'
import NoticeBox from '@/components/elements/notice-box'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowLeft, RefreshCcw } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from 'ui'

export default function ErrorPage({
	error,
	reset
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	const pathname = usePathname()
	const [isExpanded, setIsExpanded] = useState(false)

	useEffect(() => {
		console.error('Unhandled error:', error)
		logErrorToActivity(error)
	}, [error])

	const logErrorToActivity = async (error: Error & { digest?: string }) => {
		// ... (keep the existing logErrorToActivity function)
	}

	const handleReportError = () => {
		// ... (keep the existing handleReportError function)
	}

	const formatErrorDetails = (error: Error & { digest?: string }) => {
		const details = []
		details.push(`Message: ${error.message}`)
		if (error.stack) {
			details.push(`Stack Trace:\n${error.stack}`)
		}
		if (error.digest) {
			details.push(`Digest: ${error.digest}`)
		}
		// Add any other properties of the error object
		Object.keys(error).forEach(key => {
			if (!['message', 'stack', 'digest'].includes(key)) {
				details.push(
					`${key}: ${JSON.stringify(error[key as keyof typeof error], null, 2)}`
				)
			}
		})
		return details.join('\n\n')
	}

	const ErrorDisplay = () => {
		const errorDetails = formatErrorDetails(error)
		return (
			<div className="max-w-full overflow-x-auto">
				<EnhancedCodeBlock
					code={errorDetails}
					fileName="error-details.log"
					language="plaintext"
					badges={['Error']}
				/>
			</div>
		)
	}

	return (
		<div className="min-h-screen w-screen grid place-items-center p-4">
			<NoticeBox
				useMotion={true}
				width="2xl"
				icon={<AlertTriangle className="h-6 w-6 text-brand" />}
				title="Oops! Something went wrong"
				description="An unexpected error occurred. Here are the details:"
			>
				<motion.div className="mb-6 w-full">
					<div className="rounded flex-col p-3 flex items-start justify-between w-full">
						<ErrorDisplay />
					</div>
				</motion.div>
				<motion.div className="space-y-2 w-full">
					<Flex
						align="center"
						justify="center"
						gap="2"
						className="w-full"
					>
						<Button
							onClick={reset}
							className="w-full bg-white text-black hover:bg-zinc-200"
							aria-label="Try again"
						>
							<RefreshCcw className="mr-2 h-4 w-4" /> Try again
						</Button>
						<Button
							variant="outline"
							onClick={() => (window.location.href = '/')}
							className="w-full border text-subtitle hover:bg-zinc-800"
						>
							<ArrowLeft className="mr-2 h-4 w-4" /> Go to Home
						</Button>
					</Flex>
					<Button
						variant="link"
						onClick={handleReportError}
						className="w-full text-subtitle hover:text-title"
					>
						Report this error
					</Button>
				</motion.div>
			</NoticeBox>
		</div>
	)
}
