'use client'

import {
	createShortcutMap,
	useKeyboardShortcuts
} from '@/core/hooks/use-keyboard-shortcuts'
import { Flex, Kbd } from 'atoms'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSiteSettingsStore } from 'stores'
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from 'ui'
import SiteSettingsMenu from '../aside/site-settings-menu'

type DashboardIntroProps = {
	user: {
		id: string
		name?: string
		email?: string
	}
}

export default function IntroShortcutGuide({ user }: DashboardIntroProps) {
	const router = useRouter()
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)
	const { toggleAllAnimations, toggleSidebarAnimations } =
		useSiteSettingsStore()

	const handleSettingsChange = (setting: string) => {
		if (setting === 'allAnimations') {
			toggleAllAnimations()
		} else if (setting === 'sidebarAnimations') {
			toggleSidebarAnimations()
		}
	}

	const shortcuts = createShortcutMap([
		['meta+h', () => router.push('/')],
		['ctrl+h', () => router.push('/')],
		['meta+shift+p', () => router.push('/dashboard/posts')],
		['ctrl+shift+p', () => router.push('/dashboard/posts')],
		['/', () => setIsSettingsOpen(true)],
		['shift+l', () => console.log('Logout')], // Implement actual logout functionality here
		['meta+shift+plus', () => router.push('/dashboard/background-creator')],
		['ctrl+shift+plus', () => router.push('/dashboard/background-creator')]
	])

	useKeyboardShortcuts(shortcuts)

	return (
		<div className="container mx-auto px-4 py-8">
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>
						Welcome to Your Dashboard, {user.name || user.email}
					</CardTitle>
					<CardDescription>
						Here are some quick shortcuts to get you started:
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Flex dir="col" gap="4">
						<Flex align="center" gap="2">
							<Kbd variant="cmd" size="md">
								H
							</Kbd>
							<span>Go to Home</span>
						</Flex>
						<Flex align="center" gap="2">
							<Kbd variant="cmd" size="md">
								Shift
							</Kbd>
							<Kbd size="md">P</Kbd>
							<span>Go to Posts</span>
						</Flex>
						<Flex align="center" gap="2">
							<Kbd variant="slash" size="md" />
							<span>Open Settings</span>
						</Flex>
						<Flex align="center" gap="2">
							<Kbd variant="cmd" size="md">
								Shift
							</Kbd>
							<Kbd size="md">+</Kbd>
							<span>Go to Background Creator</span>
						</Flex>
						<Flex align="center" gap="2">
							<Kbd variant="shift" size="md">
								L
							</Kbd>
							<span>Logout</span>
						</Flex>
					</Flex>
				</CardContent>
			</Card>

			<Button onClick={() => setIsSettingsOpen(true)}>
				Open Settings
			</Button>

			<SiteSettingsMenu
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
				onSettingChange={handleSettingsChange}
			/>
		</div>
	)
}
