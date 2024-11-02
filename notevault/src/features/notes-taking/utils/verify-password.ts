import { pbkdf2Sync } from "crypto";
import { ITERATIONS, KEY_LENGTH } from "./constants";

/**
 * Verifies the given password against the stored hash.
 * @param {string} password - The password to verify.
 * @param {string} storedHash - The stored hash to compare against.
 * @returns {boolean} True if the password matches the stored hash, false otherwise.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(':');
  const newHash = pbkdf2Sync(
    password,
    salt,
    ITERATIONS,
    KEY_LENGTH,
    'sha512'
  ).toString('hex');
  return hash === newHash;
}
