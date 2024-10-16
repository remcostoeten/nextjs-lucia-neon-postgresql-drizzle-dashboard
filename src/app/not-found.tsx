'use client'

import Spotlight from '@/components/effects/card-spotlight/card-spotlight'
import { logActivity } from 'actions'
import { Flex } from 'atoms'
import { motion } from 'framer-motion'
import { FileQuestion, Home, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from 'ui'

export default function NotFound() {
	const pathname = usePathname()

	useEffect(() => {
		logNotFoundToActivity(pathname)
	}, [pathname])

	const logNotFoundToActivity = async (attemptedUrl: string) => {
		try {
			await logActivity(
				JSON.stringify({
					type: 'NOT_FOUND',
					message: 'Page not found',
					attemptedUrl,
					timestamp: new Date().toISOString()
				})
			)
		} catch (logError) {
			console.error(
				'Failed to log not found error to activity log:',
				logError
			)
		}
	}

	return (
		<Spotlight>
			<div className="flex items-center justify-center min-h-screen bg-background">
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
				>
					<Card className="m-4 max-w-[620px] w-full bg-card text-card-foreground shadow-lg">
						<CardHeader>
							<div className="flex items-center gap-2">
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5, delay: 0.1 }}
								>
									<FileQuestion className="h-6 w-6 text-primary animate-pulse" />
								</motion.div>
								<CardTitle className="text-xl font-semibold">
									Page Not Found
								</CardTitle>
							</div>
							<CardDescription className="text-muted-foreground">
								We couldn't find the page you're looking for.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex justify-center">
								<div className="relative">
									<div className="absolute inset-0 flex items-center justify-center">
										<span className="text-9xl font-bold text-primary/10">
											404
										</span>
									</div>
									<motion.div
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{
											duration: 0.5,
											delay: 0.2
										}}
									>
										<Search className="h-24 w-24 text-muted-foreground" />
									</motion.div>
								</div>
							</div>
							<p className="text-sm text-center text-muted-foreground">
								The page you are trying to access might have
								been moved, deleted, or never existed.
							</p>
							<p className="text-sm text-center text-muted-foreground">
								Attempted URL:{' '}
								<code className="bg-muted p-1 rounded">
									{pathname}
								</code>
							</p>
						</CardContent>
						<CardFooter className="flex justify-center">
							<Flex dir="row" gap="2" wrap="wrap">
								<Button
									asChild
									className="bg-primary text-primary-foreground hover:bg-primary/90"
								>
									<Link href="/">
										<Home className="mr-2 h-4 w-4" />
										Go to Homepage
									</Link>
								</Button>
								<Button asChild variant="outline">
									<Link href="/dashboard">
										<Home className="mr-2 h-4 w-4" />
										Go to Dashboard
									</Link>
								</Button>
							</Flex>
						</CardFooter>
					</Card>
				</motion.div>
			</div>
		</Spotlight>
	)
}
