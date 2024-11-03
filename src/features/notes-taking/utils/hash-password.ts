import { pbkdf2Sync, randomBytes } from 'crypto'
import { ITERATIONS, KEY_LENGTH, SALT_LENGTH } from './constants'

/**
 * Hashes the given password using a random salt and the pbkdf2Sync function.
 * @param {string} password - The password to hash.
 * @returns {string} The hashed password with the salt.
 */
export function hashPassword(password: string): string {
	const salt = randomBytes(SALT_LENGTH).toString('hex')
	const hash = pbkdf2Sync(
		password,
		salt,
		ITERATIONS,
		KEY_LENGTH,
		'sha512'
	).toString('hex')
	return `${salt}:${hash}`
}
