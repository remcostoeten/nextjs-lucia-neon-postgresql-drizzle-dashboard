import { useUserInfo } from '@/core/hooks'
import React from 'react'

type WithUserInfoProps = {
	userInfo: ReturnType<typeof useUserInfo>
	enhancedSubmit: (
		event: React.FormEvent<HTMLFormElement>,
		originalSubmit: (formData: FormData) => Promise<void>
	) => Promise<void>
}

/**
 * Higher-order component to wrap a component with user information and enhanced form submission capabilities.
 *
 * This HOC fetches user information using the `useUserInfo` hook and enhances the form submission process by appending user information to the form data.
 *
 * @param WrappedComponent - The component to be wrapped with user information and enhanced form submission.
 * @returns A new component that includes user information and enhanced form submission capabilities.
 */
export const withUserInfo = <P extends WithUserInfoProps>(
	WrappedComponent: React.ComponentType<P>
) => {
	return (props: Omit<P, keyof WithUserInfoProps>) => {
		const userInfo = useUserInfo()

		/**
		 * Enhanced form submission function that appends user information to the form data before submitting.
		 *
		 * This function prevents the default form submission behavior, creates a new FormData object from the event target, appends user information to the form data, and then calls the original submit function with the enhanced form data.
		 *
		 * @param event - The form submission event.
		 * @param originalSubmit - The original form submission function.
		 */
		const enhancedSubmit = async (
			event: React.FormEvent<HTMLFormElement>,
			originalSubmit: (formData: FormData) => Promise<void>
		) => {
			event.preventDefault()
			const formData = new FormData(event.currentTarget)

			// Append user info to formData
			Object.entries(userInfo).forEach(([key, value]) => {
				if (value !== null && value !== undefined) {
					formData.append(key, value.toString())
				}
			})

			await originalSubmit(formData)
		}

		return (
			<WrappedComponent
				{...(props as P)}
				userInfo={userInfo}
				enhancedSubmit={enhancedSubmit}
			/>
		)
	}
}
