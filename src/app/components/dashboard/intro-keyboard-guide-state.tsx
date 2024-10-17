'use client'

import {
	createShortcutMap,
	useKeyboardShortcuts
} from '@/core/hooks/use-keyboard-shortcuts'
import { Flex, Kbd } from 'atoms'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from 'ui'

type ShortcutProps = {
	label: string
	keys: string[]
}

function Shortcut({ label, keys }: ShortcutProps) {
	return (
		<Flex>
			<span className="text-white opacity-75 flex-1 text-base font-medium">
				{label}
			</span>
			<div className="flex items-center gap-2">
				{keys.map((key, index) => (
					<React.Fragment key={key}>
						{index > 0 && <span className="text-white">or</span>}
						<Kbd>{key}</Kbd>
					</React.Fragment>
				))}
			</div>
		</Flex>
	)
}

const shortcuts: ShortcutProps[] = [
	{ label: 'Go to home', keys: ['⌘ H', 'Ctrl H'] },
	{ label: 'Go to posts', keys: ['⌘ ⇧ P', 'ctrl'] },
	{ label: 'Open settings', keys: ['/'] },
	{ label: 'Go to background generator', keys: ['⇧ ⌘ B', 'Ctrl Shift B'] },
	{ label: 'Logout', keys: ['⌥ →', '⌥ ←'] }
]

export default function IntroKeyboardGuideState() {
	const router = useRouter()

	const shortcutActions = createShortcutMap([
		['meta+h', () => router.push('/')],
		['ctrl+h', () => router.push('/')],
		['meta+shift+p', () => router.push('/dashboard/notes')],
		['ctrl+shift+p', () => router.push('/dashboard/notes')],
		['/', () => console.log('Open settings')],
		['meta+shift+b', () => router.push('/background/background-creator')],
		['ctrl+shift+b', () => router.push('/background/background-creator')],
		['alt+arrowright', () => console.log('Logout')],
		['alt+arrowleft', () => console.log('Logout')]
	])

	useKeyboardShortcuts(shortcutActions)

	return (
		<div className="text-subtitle pr-8 animate-fade-in">
			<h2 className="text-2xl font-semibold mb-8 hidden md:block">
				Shortcuts
			</h2>
			<div className="hidden md:flex flex-col gap-4">
				{shortcuts.map(shortcut => (
					<Shortcut key={shortcut.label} {...shortcut} />
				))}
			</div>
			<div className="bg-card border mt-8 p-10 rounded-2xl">
				<h3 className="text-lg font-medium mb-2">Need help?</h3>
				<p className="text-neutral-200 mb-6">
					Star us on Github.If you have any questions, please don't
					hesitate to contact me through there.
				</p>

				<Flex gap="2" wrap="wrap">
					<Button className=" font-medium transition-colors duration-150">
						<Link href="https://github.com/remcostoeten/nextjs-lucia-neon-postgresql-drizzle-dashboard">
							Go to Github
						</Link>
					</Button>
					<a
						href="mailto:stoetenremco.rs@gmail.com"
						className="inline-block bg-card hover:bg-card font-medium transition-colors duration-150 p-2 rounded"
					>
						Contact Us
					</a>
				</Flex>
			</div>
		</div>
	)
}
