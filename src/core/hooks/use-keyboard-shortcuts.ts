import { useCallback, useEffect, useRef } from 'react'

type KeyCombo = string
type ShortcutAction = () => void
type ShortcutMap = Record<KeyCombo, ShortcutAction>

interface ShortcutOptions {
	preventDefault?: boolean
	stopPropagation?: boolean
	capture?: boolean
	disableOnInput?: boolean
}

const defaultOptions: ShortcutOptions = {
	preventDefault: true,
	stopPropagation: true,
	capture: false,
	disableOnInput: true
}

export function useKeyboardShortcuts(
	shortcuts: ShortcutMap,
	options: ShortcutOptions = {}
) {
	const mergedOptions = { ...defaultOptions, ...options }
	const shortcutsRef = useRef<ShortcutMap>(shortcuts)

	useEffect(() => {
		shortcutsRef.current = shortcuts
	}, [shortcuts])

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (
				mergedOptions.disableOnInput &&
				(event.target instanceof HTMLInputElement ||
					event.target instanceof HTMLTextAreaElement ||
					(event.target instanceof HTMLElement &&
						event.target.isContentEditable))
			) {
				return
			}

			const keyCombo = getKeyCombo(event)
			const action = shortcutsRef.current[keyCombo]

			if (action) {
				if (mergedOptions.preventDefault) {
					event.preventDefault()
				}
				if (mergedOptions.stopPropagation) {
					event.stopPropagation()
				}
				action()
			}
		},
		[mergedOptions]
	)

	useEffect(() => {
		document.addEventListener(
			'keydown',
			handleKeyDown,
			mergedOptions.capture
		)
		return () => {
			document.removeEventListener(
				'keydown',
				handleKeyDown,
				mergedOptions.capture
			)
		}
	}, [handleKeyDown, mergedOptions.capture])
}

function getKeyCombo(event: KeyboardEvent): KeyCombo {
	const modifiers: string[] = []

	if (event.ctrlKey) modifiers.push('ctrl')
	if (event.altKey) modifiers.push('alt')
	if (event.shiftKey) modifiers.push('shift')
	if (event.metaKey) modifiers.push('meta')

	const key = event.key.toLowerCase()

	return [...modifiers, key].join('+')
}

export function createShortcutMap(
	shortcuts: [KeyCombo, ShortcutAction][]
): ShortcutMap {
	return Object.fromEntries(shortcuts)
}

/* Example usage
 export default function Example() {
     const shortcuts = createShortcutMap([
         ['ctrl+s', () => console.log('Saving...')],
         ['alt+f', () => console.log('Opening file menu...')],
     ])
     useKeyboardShortcuts(shortcuts)
     return (
         <div>
             <p>Press Ctrl+S to save or Alt+F to open the file menu.</p>
         </div>
     )
*/
