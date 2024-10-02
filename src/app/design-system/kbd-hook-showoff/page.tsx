'use client'

import { Kbd } from '@/components/atoms'
import HackerText from '@/components/effects/gitihu-oss/hacker-text'
import CodeHighlight from '@/components/elements/code-highlight/code-highlight'
import {
	createShortcutMap,
	useKeyboardShortcuts
} from '@/core/hooks/use-keyboard-shortcuts'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import {
	Button,
	Card,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from 'ui'
import DesignSystemWrapper from '../_components/DesignSystemWrapper'

const KeyboardShortcutsShowcase = () => {
	const [message, setMessage] = useState('')
	const [isEditMode, setIsEditMode] = useState(false)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const headerRef = useRef(null)

	const { scrollY } = useScroll()
	const headerHeight = 80 // Adjust this value based on your actual header height

	const headerY = useTransform(
		scrollY,
		[headerHeight, headerHeight + 1],
		[0, 1]
	)
	const headerOpacity = useTransform(scrollY, [0, headerHeight], [1, 0.8])

	// Example 1: Basic Usage
	const basicShortcuts = createShortcutMap([
		['ctrl+s', () => setMessage('Saving...')],
		['alt+f', () => setMessage('Opening file menu...')]
	])
	useKeyboardShortcuts(basicShortcuts)

	// Example 2: Custom Options
	const customOptionsShortcuts = createShortcutMap([
		['shift+d', () => setMessage('Debug mode activated')]
	])
	useKeyboardShortcuts(customOptionsShortcuts, { disableOnInput: false })

	// Example 3: Multiple Key Combinations
	const multipleKeysShortcuts = createShortcutMap([
		['ctrl+alt+r', () => setMessage('Reloading application...')],
		['meta+shift+l', () => setMessage('Logging out...')]
	])
	useKeyboardShortcuts(multipleKeysShortcuts)

	// Example 4: Conditional Shortcuts
	const conditionalShortcuts = createShortcutMap([
		['e', () => isEditMode && setMessage('Editing...')],
		['esc', () => isEditMode && setIsEditMode(false)]
	])
	useKeyboardShortcuts(conditionalShortcuts)

	// Example 5: Triggering Dialog
	const dialogShortcuts = createShortcutMap([
		['ctrl+.', () => setIsDialogOpen(true)]
	])
	useKeyboardShortcuts(dialogShortcuts)

	return (
		<DesignSystemWrapper
			title="Keyboard Shortcuts Showcase"
			description="Demonstrates various ways to use the useKeyboardShortcuts hook with enhanced Kbd component"
			actionButtons={[
				{
					label: 'Toggle Edit Mode',
					onClick: () => setIsEditMode(!isEditMode)
				},
				{ label: 'Clear Message', onClick: () => setMessage('') }
			]}
		>
			<HackerText
				lowercase={true}
				duration={3000}
				speed={50}
				onClick={() => console.log('clicked')}
			>
				hacker text
			</HackerText>			<motion.div
				ref={headerRef}
				style={{
					position: 'sticky',
					top: 0,
					zIndex: 50,
					y: headerY,
					opacity: headerOpacity
				}}
			>
				<Card className="p-4">
					<h3 className="text-lg font-semibold mb-2">
						Current Message:
					</h3>
					<p className="mb-4">
						{message || 'No shortcut triggered yet'}
					</p>
					<p className="text-sm text-muted-foreground">
						Edit Mode: {isEditMode ? 'ON' : 'OFF'}
					</p>
				</Card>
			</motion.div>

			<Card className="p-4 mt-4">
				<h3 className="text-lg font-semibold mb-2">
					Example 1: Basic Usage with Variants
				</h3>
				<p className="mb-2">
					Press{' '}
					<Kbd variant="ctrl" hasTooltip>
						S
					</Kbd>{' '}
					to save or{' '}
					<Kbd variant="alt" hasTooltip>
						F
					</Kbd>{' '}
					to open the file menu.
				</p>
				<CodeHighlight language="tsx" title="Basic Usage with Variants">
					{`const basicShortcuts = createShortcutMap([
  ['ctrl+s', () => setMessage('Saving...')],
  ['alt+f', () => setMessage('Opening file menu...')],
])
useKeyboardShortcuts(basicShortcuts)`}
				</CodeHighlight>
			</Card>

			<Card className="p-4 mt-4">
				<h3 className="text-lg font-semibold mb-2">
					Example 2: Custom Options and Sizes
				</h3>
				<p className="mb-2">
					Press{' '}
					<Kbd
						variant="shift"
						size="lg"
						hasTooltip
						tooltipContent="Activate debug mode"
					>
						D
					</Kbd>{' '}
					to activate debug mode (works even when focused on input).
				</p>
				<CodeHighlight language="tsx" title="Custom Options and Sizes">
					{`const customOptionsShortcuts = createShortcutMap([
  ['shift+d', () => setMessage('Debug mode activated')],
])
useKeyboardShortcuts(customOptionsShortcuts, { disableOnInput: false })`}
				</CodeHighlight>
			</Card>

			<Card className="p-4 mt-4">
				<h3 className="text-lg font-semibold mb-2">
					Example 3: Multiple Key Combinations
				</h3>
				<p className="mb-2">
					Press{' '}
					<Kbd variant="ctrl" hasTooltip>
						Alt
					</Kbd>{' '}
					+{' '}
					<Kbd variant="alt" hasTooltip>
						R
					</Kbd>{' '}
					to reload or{' '}
					<Kbd variant="cmd" hasTooltip>
						Shift
					</Kbd>{' '}
					+{' '}
					<Kbd variant="shift" hasTooltip>
						L
					</Kbd>{' '}
					to log out.
				</p>
				<CodeHighlight language="tsx" title="Multiple Key Combinations">
					{`const multipleKeysShortcuts = createShortcutMap([
  ['ctrl+alt+r', () => setMessage('Reloading application...')],
  ['meta+shift+l', () => setMessage('Logging out...')],
])
useKeyboardShortcuts(multipleKeysShortcuts)`}
				</CodeHighlight>
			</Card>

			<Card className="p-4 mt-4">
				<h3 className="text-lg font-semibold mb-2">
					Example 4: Conditional Shortcuts
				</h3>
				<p className="mb-2">
					Press{' '}
					<Kbd
						size="sm"
						hasTooltip
						tooltipContent="Edit (only in edit mode)"
					>
						E
					</Kbd>{' '}
					to edit (only works in edit mode) or{' '}
					<Kbd variant="esc" hasTooltip>
						Esc
					</Kbd>{' '}
					to exit edit mode.
				</p>
				<CodeHighlight language="tsx" title="Conditional Shortcuts">
					{`const [isEditMode, setIsEditMode] = useState(false)
const conditionalShortcuts = createShortcutMap([
  ['e', () => isEditMode && setMessage('Editing...')],
  ['esc', () => isEditMode && setIsEditMode(false)],
])
useKeyboardShortcuts(conditionalShortcuts)`}
				</CodeHighlight>
			</Card>

			<Card className="p-4 mt-4">
				<h3 className="text-lg font-semibold mb-2">
					Example 5: Triggering Dialog
				</h3>
				<p className="mb-2">
					Press{' '}
					<Kbd variant="ctrl" hasTooltip>
						.
					</Kbd>{' '}
					to open a dialog.
				</p>
				<CodeHighlight language="tsx" title="Triggering Dialog">
					{`const [isDialogOpen, setIsDialogOpen] = useState(false)
const dialogShortcuts = createShortcutMap([
  ['ctrl+.', () => setIsDialogOpen(true)],
])
useKeyboardShortcuts(dialogShortcuts)

// In your JSX:
<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Shortcut Triggered Dialog</DialogTitle>
      <DialogDescription>
        This dialog was opened using a keyboard shortcut.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
				</CodeHighlight>
			</Card>

			<Card className="p-4 mt-4">
				<h3 className="text-lg font-semibold mb-2">
					Example 6: Different Sizes and Variants
				</h3>
				<p className="mb-2">
					<Kbd variant="win" size="sm" hasTooltip>
						Win
					</Kbd>{' '}
					<Kbd variant="cmd" size="md" hasTooltip>
						Cmd
					</Kbd>{' '}
					<Kbd variant="super" size="lg" hasTooltip>
						Super
					</Kbd>{' '}
					<Kbd variant="option" size="md" hasTooltip>
						Option
					</Kbd>{' '}
					<Kbd variant="slash" size="md" hasTooltip>
						/
					</Kbd>
				</p>
				<p className="text-sm text-muted-foreground mt-2">
					Hover over the keys to see tooltips
				</p>
			</Card>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Shortcut Triggered Dialog</DialogTitle>
						<DialogDescription>
							This dialog was opened using a keyboard shortcut
							(Ctrl + .).
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button onClick={() => setIsDialogOpen(false)}>
							Close
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</DesignSystemWrapper>
	)
}

export default KeyboardShortcutsShowcase
