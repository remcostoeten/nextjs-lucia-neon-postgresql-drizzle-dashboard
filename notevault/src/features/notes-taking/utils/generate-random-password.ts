import { randomBytes } from 'crypto'

/**
 * Generates a random password.
 * @returns {string} The generated random password.
 */
export function generateRandomPassword(): string {
	return randomBytes(8).toString('hex')
}
