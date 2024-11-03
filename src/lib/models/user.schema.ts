import { z } from 'zod'

export const nameSchema = z.object({
	name: z
		.string()
		.min(2, 'Name must be at least 2 characters')
		.max(50, 'Name must be less than 50 characters')
})

export const emailSchema = z.object({
	email: z
		.string()
		.email('Invalid email address')
		.min(5, 'Email must be at least 5 characters')
		.max(255, 'Email must be less than 255 characters')
})

export const deleteAccountSchema = z.object({
	confirmation: z.literal('delete my account permanently', {
		errorMap: () => ({
			message: 'Please type "delete my account permanently" to confirm'
		})
	})
})

export const loginSchema = z.object({
	type: z.enum(['email', 'username']),
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters')
})

export type UpdateNameData = z.infer<typeof nameSchema>
export type UpdateEmailData = z.infer<typeof emailSchema>
export type DeleteAccountData = z.infer<typeof deleteAccountSchema>
export type LoginData = z.infer<typeof loginSchema>
