'use client'

import { useCallback, useEffect } from 'react'

/**
 * Represents a keyboard shortcut combination
 * @typedef {Object} KeyCombo
 * @property {string} key - The main key to be pressed (e.g., 'a', 'Enter', 'Escape')
 * @property {boolean} [ctrl] - Whether Control key should be pressed
 * @property {boolean} [meta] - Whether Meta (Command on Mac, Windows key on PC) should be pressed
 * @property {boolean} [alt] - Whether Alt key should be pressed
 * @property {boolean} [shift] - Whether Shift key should be pressed
 */
type KeyCombo = {
	key: string
	ctrl?: boolean
	meta?: boolean
	alt?: boolean
	shift?: boolean
}

/**
 * Configuration options for the keyboard shortcut
 * @typedef {Object} KeyboardShortcutOptions
 * @property {boolean} [preventDefault=true] - Whether to prevent the default browser behavior
 * @property {boolean} [stopPropagation=false] - Whether to stop the event from bubbling up
 * @property {boolean} [repeat=false] - Whether to trigger on key repeat
 */
type KeyboardShortcutOptions = {
	preventDefault?: boolean
	stopPropagation?: boolean
	repeat?: boolean
}

/**
 * A React hook for handling keyboard shortcuts
 *
 * @param keyCombo - Single key combination or array of key combinations to listen for
 * @param callback - Function to execute when the keyboard shortcut is triggered
 * @param options - Configuration options for the keyboard shortcut behavior
 *
 * @example
 * // Single key combination
 * useKeyboardShortcut({ key: 's', ctrl: true }, () => {
 *   console.log('Ctrl+S pressed')
 * })
 *
 * @example
 * // Multiple key combinations
 * useKeyboardShortcut([
 *   { key: 'Enter' },
 *   { key: 'Space' }
 * ], () => {
 *   console.log('Enter or Space pressed')
 * })
 *
 * @example
 * // With options
 * useKeyboardShortcut(
 *   { key: 'z', ctrl: true, shift: true },
 *   () => console.log('Ctrl+Shift+Z pressed'),
 *   { preventDefault: true, repeat: false }
 * )
 *
 * @example
 * // Common use cases
 * // Undo: Ctrl/Cmd + Z
 * useKeyboardShortcut({ key: 'z', ctrl: true }, handleUndo)
 *
 * // Save: Ctrl/Cmd + S
 * useKeyboardShortcut({ key: 's', ctrl: true }, handleSave)
 *
 * // Close modal: Escape
 * useKeyboardShortcut({ key: 'Escape' }, closeModal)
 *
 * // Multiple shortcuts for the same action
 * useKeyboardShortcut([
 *   { key: 'Enter' },
 *   { key: 'NumpadEnter' }
 * ], submitForm)
 */
export function useKeyboardShortcut(
	keyCombo: KeyCombo | KeyCombo[],
	callback: () => void,
	options: KeyboardShortcutOptions = {}
) {
	const {
		preventDefault = true,
		stopPropagation = false,
		repeat = false
	} = options

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			// Convert single combo to array for unified processing
			const combos = Array.isArray(keyCombo) ? keyCombo : [keyCombo]

			const isMatch = combos.some((combo) => {
				// Case-insensitive key matching
				const keyMatch =
					event.key.toLowerCase() === combo.key.toLowerCase()
				// Modifier key matching - only true if specifically requested
				const ctrlMatch = combo.ctrl ? event.ctrlKey : !event.ctrlKey
				const metaMatch = combo.meta ? event.metaKey : !event.metaKey
				const altMatch = combo.alt ? event.altKey : !event.altKey
				const shiftMatch = combo.shift
					? event.shiftKey
					: !event.shiftKey

				return (
					keyMatch && ctrlMatch && metaMatch && altMatch && shiftMatch
				)
			})

			if (isMatch && (repeat || !event.repeat)) {
				if (preventDefault) event.preventDefault()
				if (stopPropagation) event.stopPropagation()
				callback()
			}
		},
		[callback, keyCombo, preventDefault, stopPropagation, repeat]
	)

	// Add and remove event listener
	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])
}
