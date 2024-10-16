'use client'

import { Flex } from '@/components/atoms'
import EnhancedCodeBlock from '@/components/elements/display-code/code-block'
import NoticeBox from '@/components/elements/notice-box'
import { logActivity } from 'actions'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowLeft, RefreshCcw } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from 'ui'

type ExtendedError = Error & {
	digest?: string
	componentStack?: string
	source?: string
	[key: string]: any
}

type ErrorPageProps = {
	error: ExtendedError
	reset: () => void
}

const ERROR_LENGTH_THRESHOLD = 45
const MAX_ERROR_LENGTH = 500

export default function ErrorPage({ error, reset }: ErrorPageProps) {
	const pathname = usePathname()
	const [isExpanded, setIsExpanded] = useState(false)

	useEffect(() => {
		console.error('Unhandled error:', error)
		logErrorToActivity(error)
	}, [error])

	const logErrorToActivity = async (error: ExtendedError) => {
		const errorKey = `${error.message}:${error.digest || ''}`
		const now = Date.now()
		const lastErrorTime = localStorage.getItem(errorKey)

		if (lastErrorTime && now - parseInt(lastErrorTime) < 60000) {
			console.log('Skipping error log due to recent occurrence')
			return
		}

		try {
			await logActivity(
				'ERROR_ENCOUNTERED',
				'An unhandled error occurred',
				JSON.stringify({
					errorMessage: error.message,
					errorStack: error.stack,
					errorDigest: error.digest,
					errorComponentStack: error.componentStack,
					errorSource: error.source,
					pathname,
					timestamp: new Date().toISOString()
				})
			)
			localStorage.setItem(errorKey, now.toString())
		} catch (logError) {
			console.error('Failed to log error to activity log:', logError)
		}
	}

	const handleReportError = () => {
		fetch('/api/log-error', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				message: error.message,
				stack: error.stack,
				digest: error.digest,
				componentStack: error.componentStack,
				source: error.source,
				pathname
			})
		}).catch(console.error)
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: [0.25, 0.1, 0.25, 1]
			}
		}
	}

	const truncateError = (errorMessage: string) => {
		if (errorMessage.length <= MAX_ERROR_LENGTH) return errorMessage
		return errorMessage.slice(0, MAX_ERROR_LENGTH) + '...'
	}

	const formatErrorDetails = (error: ExtendedError) => {
		const details = []
		details.push(`Message: ${error.message}`)

		if (error.name) {
			details.push(`Error Name: ${error.name}`)
		}

		if (error.stack) {
			details.push(`Stack Trace:\n${error.stack}`)
		}

		if (error.componentStack) {
			details.push(`Component Stack:\n${error.componentStack}`)
		}

		if (error.source) {
			details.push(`Source: ${error.source}`)
		}

		if (error.digest) {
			details.push(`Digest: ${error.digest}`)
		}

		// Add any other properties of the error object
		Object.keys(error).forEach(key => {
			if (
				![
					'message',
					'name',
					'stack',
					'componentStack',
					'source',
					'digest'
				].includes(key)
			) {
				details.push(`${key}: ${JSON.stringify(error[key], null, 2)}`)
			}
		})

		// Add current route information
		details.push(`Current Route: ${pathname}`)

		return details.join('\n\n')
	}

	const ErrorDisplay = () => {
		const displayError = isExpanded
			? formatErrorDetails(error)
			: truncateError(formatErrorDetails(error))

		return (
			<div className="max-w-full w-full">
				<EnhancedCodeBlock
					code={displayError}
					fileName="error-details.log"
					language="plaintext"
					badges={['Error']}
					className="max-h-[60vh] overflow-y-auto whitespace-pre-wrap break-words"
				/>
			</div>
		)
	}

	return (
		<div className="min-h-screen w-screen grid place-items-center p-4">
			<NoticeBox
				useMotion={true}
				width="3xl"
				icon={<AlertTriangle className="h-6 w-6 text-brand" />}
				title="Oops! Something went wrong"
				description="An unexpected error occurred. Here are the details:"
			>
				<motion.div variants={itemVariants} className="mb-6 w-full">
					<div className="rounded flex-col p-3 flex items-start justify-between w-full">
						<ErrorDisplay />
						{formatErrorDetails(error).length >
							MAX_ERROR_LENGTH && (
							<Button
								variant="link"
								onClick={() => setIsExpanded(!isExpanded)}
								className="mt-2 text-sm text-zinc-400 hover:text-zinc-300"
							>
								{isExpanded ? 'Show Less' : 'Show More'}
							</Button>
						)}
					</div>
				</motion.div>
				<motion.div
					variants={itemVariants}
					className="space-y-2 w-full"
				>
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
