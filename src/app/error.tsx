'use client'

import { Button } from 'ui'
import { Flex } from '@/components/atoms'
import { CommandCode } from '@/components/elements/display-code/command-inline-code'
import NoticeBox from '@/components/elements/notice-box'
import { logActivity } from '@/core/server/actions/users/log-activity'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowLeft, RefreshCcw } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

type ErrorPageProps = {
	error: Error & { digest?: string }
	reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
	const pathname = usePathname()

	useEffect(() => {
		console.error('Unhandled error:', error)
		logErrorToActivity(error)
	}, [error])

	const logErrorToActivity = async (error: Error & { digest?: string }) => {
		try {
			await logActivity(
				'ERROR_ENCOUNTERED',
				'An unhandled error occurred',
				JSON.stringify({
					errorMessage: error.message,
					errorStack: error.stack,
					errorDigest: error.digest,
					pathname,
					timestamp: new Date().toISOString()
				})
			)
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

	return (
		<div className="min-h-screen w-screen grid place-items-center">
			<NoticeBox
				useMotion={true}
				width="md"
				icon={<AlertTriangle className="h-6 w-6 text-brand" />}
				title="Oops! Something went wrong"
				description="An unexpected error occurred."
			>
				<motion.div variants={itemVariants} className="mb-6">
					<div className="rounded flex-col p-3 flex items-start justify-between">
						<CommandCode copyMode="essential">
							{error.message}
						</CommandCode>
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
							className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800"
						>
							<ArrowLeft className="mr-2 h-4 w-4" /> Go to Home
						</Button>
					</Flex>
					<Button
						variant="link"
						onClick={handleReportError}
						className="w-full text-zinc-400 hover:text-zinc-300"
					>
						Report this error
					</Button>
				</motion.div>
			</NoticeBox>
		</div>
	)
}
