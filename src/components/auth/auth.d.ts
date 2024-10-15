import { updateUserProfileSchema } from '@/lib/db/schema/auth'
import { z } from 'zod'

export type WithUserInfoProps = {
	userInfo: ReturnType<typeof useUserInfo>
	enhancedSubmit: (
		event: React.FormEvent<HTMLFormElement>,
		originalSubmit: (formData: FormData) => Promise<void>
	) => Promise<void>
}

export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>

export type OnboardingProps = {
	userId: string
}

export type SignInFormProps = {
	userInfo: {
		device: string
		location: string
		timezone: string
		lastPage: string
		os: string
	}
	enhancedSubmit: (
		event: React.FormEvent<HTMLFormElement>,
		originalSubmit: (formData: FormData) => Promise<void>
	) => Promise<void>
}

export type SignUpFormProps = {
	userInfo: {
		device: string
		location: string
		timezone: string
		lastPage: string
		os: string
	}
	enhancedSubmit: (
		event: React.FormEvent<HTMLFormElement>,
		originalSubmit: (formData: FormData) => Promise<void>
	) => Promise<void>
}
