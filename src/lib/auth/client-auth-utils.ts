export type AuthSession = {
	session: {
		user: {
			id: string
			name?: string
			email?: string
			username?: string
		}
	} | null
}

export const genericError = { error: 'Error, please try again.' }

export const getErrorMessage = (errors: any): string => {
	if (errors.email) return 'Invalid Email'
	if (errors.password) return 'Invalid Password - ' + errors.password[0]
	return 'An unexpected error occurred'
}
