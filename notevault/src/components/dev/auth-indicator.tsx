'use client'

import { useSession } from 'next-auth/react'
import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from 'ui'

export default function AuthIndicator() {
	const { data: session } = useSession()

	if (!session) {
		return (
			<div className="fixed bottom-4 right-4 z-50">
				<Button variant="destructive" size="sm">
					Not Authenticated
				</Button>
			</div>
		)
	}

	return (
		<div className="fixed bottom-4 right-4 z-50">
			<Dialog>
				<DialogTrigger asChild>
					<Button
						variant="default"
						size="sm"
						className="bg-green-600 hover:bg-green-700"
					>
						Authenticated
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Session Info</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<div className="grid gap-2">
							<div className="flex items-center gap-2">
								{session.user?.image && (
									<img
										src={session.user.image}
										alt={session.user.name || 'User'}
										className="h-10 w-10 rounded-full"
									/>
								)}
								<div>
									<p className="font-medium">
										{session.user?.name || 'No name'}
									</p>
									<p className="text-sm text-muted-foreground">
										{session.user?.email}
									</p>
								</div>
							</div>
						</div>

						<div className="rounded-lg bg-muted p-4">
							<p className="text-sm font-medium">
								Raw Session Data:
							</p>
							<pre className="mt-2 max-h-[400px] overflow-auto rounded bg-background p-4 text-xs">
								{JSON.stringify(session, null, 2)}
							</pre>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
