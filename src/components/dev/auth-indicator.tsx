'use client'

import { getIpData } from '@/app/_actions/ip-data'
import { updateUserName } from '@/app/_actions/user'
import { DeleteAccountDialog } from '@/components/auth/delete-account-dialog'
import type { UserSystemInfo } from '@/lib/types/user'
import { useLocalStorage } from 'hooks'
import { Clock, Globe2, Info, LogOut, Monitor, X } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { memo, useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	Separator,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from 'ui'

const StatusIndicator = memo(
	({ isAuthenticated }: { isAuthenticated: boolean }) => (
		<span className="absolute right-1.5 top-1.5 flex h-2 w-2">
			<span
				className={`absolute inline-flex h-full w-full animate-ping rounded-full ${
					isAuthenticated ? 'bg-green-400' : 'bg-red-400'
				} opacity-75 shadow-[0_0_8px_${
					isAuthenticated
						? 'rgba(34,197,94,0.4)'
						: 'rgba(248,113,113,0.4)'
				}]`}
			></span>
			<span
				className={`relative inline-flex h-2 w-2 rounded-full ${
					isAuthenticated ? 'bg-green-500' : 'bg-red-500'
				} shadow-[0_0_4px_${
					isAuthenticated
						? 'rgba(34,197,94,0.4)'
						: 'rgba(248,113,113,0.4)'
				}]`}
			></span>
		</span>
	)
)
StatusIndicator.displayName = 'StatusIndicator'

// Extract system info fetching logic
const useSystemInfo = (userId?: string) => {
	const [systemInfo, setSystemInfo] = useState<UserSystemInfo | null>(null)

	useEffect(() => {
		const getSystemInfo = async () => {
			try {
				const ua = navigator.userAgent
				const browser =
					ua.match(
						/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
					)?.[1] || ''
				const os = navigator.platform
				const device = /Mobile|Android|iPhone|iPad/.test(ua)
					? 'Mobile'
					: 'Desktop'

				if (userId) {
					const ipData = await getIpData(userId)

					if (ipData) {
						setSystemInfo({
							browser,
							os,
							device,
							ip: ipData.ip,
							location: {
								country: ipData.country_name,
								city: ipData.city,
								region: ipData.region,
								timezone: ipData.timezone
							},
							lastLogin: new Date().toISOString()
						})
					}
				}
			} catch (error) {
				console.error('Error fetching system info:', error)
			}
		}

		if (userId) {
			getSystemInfo()
		}
	}, [userId])

	return systemInfo
}

// Extract profile tab content
const ProfileTab = memo(
	({
		session,
		name,
		setName,
		email,
		setEmail,
		isUpdating,
		onUpdateName,
		onUpdateEmail
	}: {
		session: any
		name: string
		setName: (name: string) => void
		email: string
		setEmail: (email: string) => void
		isUpdating: boolean
		onUpdateName: () => Promise<void>
		onUpdateEmail: () => Promise<void>
	}) => (
		<div className="space-y-6">
			<div className="grid gap-2">
				<div className="flex items-center gap-2">
					{session.user?.image && (
						<img
							src={session.user.image}
							alt={session.user.name || 'User'}
							className="h-10 w-10 rounded-full"
						/>
					)}
					<div className="space-y-4 flex-1">
						<div className="flex items-center gap-2">
							<Input
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder={
									session.user?.name || 'Enter your name'
								}
								disabled={isUpdating}
								className="max-w-[200px]"
							/>
							<Button
								size="sm"
								onClick={onUpdateName}
								disabled={
									isUpdating || name === session.user?.name
								}
							>
								Update Name
							</Button>
						</div>
						<div className="flex items-center gap-2">
							<Input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder={
									session.user?.email || 'Enter your email'
								}
								disabled={isUpdating}
								className="max-w-[200px]"
							/>
							<Button
								size="sm"
								onClick={onUpdateEmail}
								disabled={
									isUpdating || email === session.user?.email
								}
							>
								Update Email
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-end">
				<DeleteAccountDialog />
			</div>
		</div>
	)
)
ProfileTab.displayName = 'ProfileTab'

// Extract system info display component
const SystemInfoDisplay = memo(
	({ systemInfo }: { systemInfo: UserSystemInfo }) => (
		<div className="grid gap-4">
			<div className="grid grid-cols-2 gap-4">
				{[
					{ label: 'Browser', value: systemInfo.browser },
					{ label: 'Operating System', value: systemInfo.os },
					{ label: 'Device Type', value: systemInfo.device },
					{ label: 'IP Address', value: systemInfo.ip }
				].map(({ label, value }) => (
					<div key={label} className="space-y-2">
						<p className="text-sm font-medium">{label}</p>
						<p className="text-sm text-muted-foreground">{value}</p>
					</div>
				))}
			</div>
		</div>
	)
)
SystemInfoDisplay.displayName = 'SystemInfoDisplay'

// Extract location info display component
const LocationInfoDisplay = memo(
	({ location }: { location: UserSystemInfo['location'] }) => (
		<div className="grid grid-cols-2 gap-4">
			{[
				{ label: 'Country', value: location.country },
				{ label: 'City', value: location.city },
				{ label: 'Region', value: location.region },
				{ label: 'Timezone', value: location.timezone }
			].map(({ label, value }) => (
				<div key={label} className="space-y-2">
					<p className="text-sm font-medium">{label}</p>
					<p className="text-sm text-muted-foreground">{value}</p>
				</div>
			))}
		</div>
	)
)
LocationInfoDisplay.displayName = 'LocationInfoDisplay'

// Main component
export default function AuthIndicator() {
	const showIndicator = process.env.NEXT_PUBLIC_DEV_INDICATOR === 'true'
	if (!showIndicator) return null

	const { data: session, update: updateSession } = useSession()
	const [isUpdating, setIsUpdating] = useState(false)
	const [name, setName] = useState(session?.user?.name || '')
	const [email, setEmail] = useState(session?.user?.email || '')
	const systemInfo = useSystemInfo(session?.user?.id)
	const [isHovered, setIsHovered] = useState(false)
	const [isVisible, setIsVisible] = useLocalStorage(
		'auth-indicator-visible',
		true
	)

	if (!isVisible) return null

	const statusColor = session ? 'bg-green-500' : 'bg-red-500'
	const glowColor = session ? 'rgba(34,197,94,0.4)' : 'rgba(248,113,113,0.4)'

	const handleUpdateName = useCallback(async () => {
		try {
			setIsUpdating(true)
			const result = await updateUserName({ name })

			if (result.error) {
				toast.error(result.error)
				return
			}

			await updateSession()
			toast.success('Name updated successfully')
		} catch (error) {
			toast.error('Failed to update name')
		} finally {
			setIsUpdating(false)
		}
	}, [name, updateSession])

	const handleSignOut = useCallback(async () => {
		try {
			await signOut({ redirect: true, callbackUrl: '/login' })
			toast.success('Logged out successfully')
		} catch (error) {
			toast.error('Failed to log out')
		}
	}, [])

	return (
		<div className="fixed bottom-4 right-4 z-50">
			<Dialog>
				<DialogTrigger asChild>
					<div
						className="relative"
						style={{
							padding: '25px',
							margin: '-25px'
						}}
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						<div
							className={`
								flex items-center justify-end
								bg-background/90 backdrop-blur
								border-2 border-border/50 
								cursor-pointer
								transition-all duration-500
								ease-custom
								h-5
								${isHovered ? 'w-auto min-w-[9rem] px-4 rounded-full' : 'w-5 rounded-full'}
							`}
						>
							<div className="flex items-center gap-2">
								<div
									className={`
										whitespace-nowrap text-sm order-1
										transition-all duration-300 ease-out
										${
											isHovered
												? 'opacity-100 max-w-[200px] '
												: 'opacity-0 max-w-0 overflow-hidden mr-0'
										}
									`}
								>
									<p className="text-[14px] gradient-span">
										{session?.user?.email || 'No session'}
									</p>
								</div>
								<div
									className={`size-2 -translate-x-[5px] -translate-y-[2px] rounded-full ${statusColor} relative order-2 flex items-center justify-center`}
								>
									<div
										className={`
											absolute h-full w-full rounded-full animate-ping 
											${statusColor} opacity-75
											left-0 right-0 top-0 bottom-0 m-auto
										`}
										style={{
											boxShadow: `0 0 8px ${glowColor}`
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</DialogTrigger>

				<DialogContent className="max-w-2xl">
					<div className="flex items-center justify-between">
						<DialogHeader>
							<DialogTitle>Session Info</DialogTitle>
						</DialogHeader>
						<Button
							variant="ghost"
							size="icon"
							className="h-6 w-6"
							onClick={() => setIsVisible(false)}
						>
							<X className="h-4 w-4" />
						</Button>
					</div>

					<Tabs defaultValue="profile">
						<TabsList>
							<TabsTrigger value="profile">
								<Info className="mr-2 h-4 w-4" />
								Profile
							</TabsTrigger>
							<TabsTrigger value="system">
								<Monitor className="mr-2 h-4 w-4" />
								System
							</TabsTrigger>
							<TabsTrigger value="location">
								<Globe2 className="mr-2 h-4 w-4" />
								Location
							</TabsTrigger>
							<TabsTrigger value="session">
								<Clock className="mr-2 h-4 w-4" />
								Session
							</TabsTrigger>
						</TabsList>

						<TabsContent value="profile" className="space-y-4">
							<ProfileTab
								session={session}
								name={name}
								setName={setName}
								email={email}
								setEmail={setEmail}
								isUpdating={isUpdating}
								onUpdateName={handleUpdateName}
								onUpdateEmail={() => {}}
							/>
						</TabsContent>

						<TabsContent value="system" className="space-y-4">
							{systemInfo && (
								<SystemInfoDisplay systemInfo={systemInfo} />
							)}
						</TabsContent>

						<TabsContent value="location" className="space-y-4">
							{systemInfo?.location && (
								<LocationInfoDisplay
									location={systemInfo.location}
								/>
							)}
						</TabsContent>

						<TabsContent value="session" className="space-y-4">
							<div className="rounded-lg bg-muted p-4">
								<p className="text-sm font-medium">
									Raw Session Data:
								</p>
								<pre className="mt-2 max-h-[400px] overflow-auto rounded bg-background p-4 text-xs">
									{JSON.stringify(session, null, 2)}
								</pre>
							</div>
						</TabsContent>
					</Tabs>

					<Separator />

					<div className="flex justify-end">
						<Button
							variant="destructive"
							size="sm"
							onClick={handleSignOut}
							className="gap-2"
						>
							<LogOut className="h-4 w-4" />
							Sign Out
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
