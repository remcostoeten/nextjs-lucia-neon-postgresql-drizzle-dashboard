import { randomBytes } from 'crypto'

export function generateUUID(): string {
	const bytes = randomBytes(16)
	const hex = bytes.toString('hex')
	return [
		hex.substring(0, 8),
		hex.substring(8, 12),
		hex.substring(12, 16),
		hex.substring(16, 20),
		hex.substring(20, 32)
	].join('-')
}

//   await db.insert(activityLogs).values({
//     id: generateUUID(), // Use generateUUID to create a unique ID
//     userId: userId ?? session.user.id,
//     action: result.data.action,
//     details: result.data.details
//   })
// }
