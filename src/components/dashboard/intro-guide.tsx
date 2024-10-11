'use client'

import { Kbd } from '@/components/atoms/kbd'
import {
	createShortcutMap,
	useKeyboardShortcuts
} from '@/core/hooks/use-keyboard-shortcuts'
import { Flex } from 'atoms'
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
		['shift+f', () => router.push('/dashboard/folders')],
		['/', () => setIsSettingsOpen(true)],
		['shift+l', () => console.log('Logout')],
		['meta+shift+plus', () => router.push('/dashboard/background-creator')],
		['shift+plus', () => router.push('/dashboard/background-creator')]
	])

	useKeyboardShortcuts(shortcuts)

	return (
		<>
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
							<Kbd
								k={['⌘', 'H']}
								variant="outline"
								size="md"
								split="plus"
							/>
							<span>Go to Home</span>
						</Flex>
						<Flex align="center" gap="2">
							<Kbd
								k={['⇧', 'F']}
								variant="outline"
								size="md"
								split="plus"
							/>
							<span>Go to folders</span>
						</Flex>
						<Flex align="center" gap="2">
							<Kbd k="/" variant="outline" size="md" />
							<span>Open Settings</span>
						</Flex>
						<Flex align="center" gap="2">
							<Kbd
								k={['⌘', '⇧', '+']}
								variant="outline"
								size="md"
								split="plus"
							/>
							<span>Go to Background Creator</span>
						</Flex>
						<Flex align="center" gap="2">
							<Kbd
								k={['⇧', 'L']}
								variant="outline"
								size="md"
								split="plus"
							/>
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
		</>
	)
}
