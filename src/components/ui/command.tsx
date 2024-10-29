'use client'

import { useCopyToClipboard } from '@/core/hooks'
import { ClipboardIcon } from 'lucide-react'
import { toast } from 'sonner'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger
} from 'ui'

type CommandCodeProps = {
	children: string
	copyMode?: 'full' | 'essential'
}

/**
 * CommandCode component displays code or command text with a copy button.
 * It allows copying either the full text or just the essential part of an error message.
 * Right-click context menu provides an option to copy the full text even in essential mode.
 * The component has an orange color scheme.
 *
 * @param {CommandCodeProps} props - The props for the CommandCode component.
 * @returns {JSX.Element} A button containing the code and a copy icon, wrapped in a context menu.
 *
 * @example
 * // Full copy mode (default)
 * <CommandCode>npm install react</CommandCode>
 *
 * @example
 * // Essential copy mode (for error messages)
 * <CommandCode copyMode="essential">useSkeletonLoader is not defined</CommandCode>
 */
export function CommandCode({ children, copyMode = 'full' }: CommandCodeProps) {
	const [copiedText, copy] = useCopyToClipboard()

	const handleCopyCode = (code: string, mode: 'full' | 'essential') => {
		let textToCopy = code
		if (mode === 'essential') {
			// Extract the essential part of the error message
			textToCopy = code.split(' is not defined')[0].trim()
		}
		copy(textToCopy)
		toast.success(`Command copied: ${textToCopy}`)
	}

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<button
					className="flex transform-gpu items-center justify-between gap-5 rounded-full bg-[rgba(255,108,0,.2)] px-5 py-3 text-[rgba(255,108,0,.8)] tracking-tighter transition-all hover:bg-[rgba(255,108,0,.15)]"
					onClick={() => handleCopyCode(children, copyMode)}
				>
					<code className="overflow-hidden overflow-ellipsis whitespace-nowrap text-left">
						{children}
					</code>
					<ClipboardIcon className="size-5" />
				</button>
			</ContextMenuTrigger>
			<ContextMenuContent className="w-64">
				<ContextMenuItem
					onClick={() => handleCopyCode(children, copyMode)}
				>
					Copy {copyMode === 'essential' ? 'Essential' : 'Full'}{' '}
					Command
				</ContextMenuItem>
				{copyMode === 'essential' && (
					<ContextMenuItem
						onClick={() => handleCopyCode(children, 'full')}
					>
						Copy Full Command
					</ContextMenuItem>
				)}
			</ContextMenuContent>
		</ContextMenu>
	)
}

// Usage examples:
//
// For regular commands or code snippets:
// <CommandCode>npm install react</CommandCode>
//
// For error messages where you want to copy only the essential part:
// <CommandCode copyMode="essential">useSkeletonLoader is not defined</CommandCode>
//
// In an error page component:
// <div className="mb-6">
//   <h3 className="text-sm font-medium mb-2">Error details:</h3>
//   <CommandCode copyMode="essential">{error.message}</CommandCode>
// </div>
