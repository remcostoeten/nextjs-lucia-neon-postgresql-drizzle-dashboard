/**
 * Generates unique identifiers with configurable formats
 * @param {Object} options - Configuration options for ID generation
 * @param {'uuid' | 'short' | 'numeric'} [options.variant='uuid'] - The ID format variant
 * @param {number} [options.length=21] - Length for short IDs (ignored for UUID variant)
 * @returns {string} The generated unique identifier
 */

type GenerateIdOptions = {
	variant?: 'uuid' | 'short' | 'numeric'
	length?: number
}

function generateUUID(): string {
	// Use the native crypto.randomUUID() if available
	if (typeof crypto !== 'undefined' && crypto.randomUUID) {
		return crypto.randomUUID()
	}

	// Fallback for environments without crypto.randomUUID
	const bytes = new Uint8Array(16)
	if (typeof crypto !== 'undefined') {
		crypto.getRandomValues(bytes)
	} else {
		// Fallback for older browsers
		for (let i = 0; i < bytes.length; i++) {
			bytes[i] = Math.floor(Math.random() * 256)
		}
	}

	// Set version (4) and variant (RFC4122)
	bytes[6] = (bytes[6] & 0x0f) | 0x40
	bytes[8] = (bytes[8] & 0x3f) | 0x80

	// Convert to hex string
	return [
		bytes
			.slice(0, 4)
			.reduce((acc, x) => acc + x.toString(16).padStart(2, '0'), ''),
		bytes
			.slice(4, 6)
			.reduce((acc, x) => acc + x.toString(16).padStart(2, '0'), ''),
		bytes
			.slice(6, 8)
			.reduce((acc, x) => acc + x.toString(16).padStart(2, '0'), ''),
		bytes
			.slice(8, 10)
			.reduce((acc, x) => acc + x.toString(16).padStart(2, '0'), ''),
		bytes
			.slice(10)
			.reduce((acc, x) => acc + x.toString(16).padStart(2, '0'), '')
	].join('-')
}

export default function generateId({
	variant = 'uuid',
	length = 21
}: GenerateIdOptions = {}): string {
	switch (variant) {
		case 'uuid': {
			return generateUUID()
		}

		case 'short': {
			const charset =
				'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
			let result = ''
			const charsetLength = charset.length
			for (let i = 0; i < length; i++) {
				result += charset.charAt(
					Math.floor(Math.random() * charsetLength)
				)
			}
			return result
		}

		case 'numeric': {
			return (
				Date.now().toString() +
				Math.floor(Math.random() * 1000).toString()
			)
		}

		default: {
			throw new Error(`Unsupported ID variant: ${variant}`)
		}
	}
}

// Export the UUID function directly for cases where only UUID is needed
export const uuid = generateUUID
