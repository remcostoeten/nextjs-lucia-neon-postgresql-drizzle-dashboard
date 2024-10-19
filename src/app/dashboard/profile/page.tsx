'use client'

import { UserProfile } from '@/types/types.users'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button, Input, Label, Textarea } from 'ui'

interface ProfileFormProps {
	initialData: UserProfile | null
	updateProfile: (
		formData: FormData
	) => Promise<{ success: boolean; error?: string }>
	logout: () => Promise<void>
}

export default function ProfileForm({
	initialData,
	updateProfile,
	logout
}: ProfileFormProps) {
	const [isEditing, setIsEditing] = useState(false)
	const router = useRouter()

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const result = await updateProfile(formData)
		if (result.success) {
			setIsEditing(false)
			router.refresh()
		} else {
			alert(result.error || 'Failed to update profile')
		}
	}

	const handleLogout = async () => {
		await logout()
		router.push('/')
	}

	if (!initialData) {
		return <div>No profile data available.</div>
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{[
					{ key: 'firstName', label: 'First Name' },
					{ key: 'lastName', label: 'Last Name' },
					{ key: 'username', label: 'Username' },
					{
						key: 'dateOfBirth',
						label: 'Date of Birth',
						type: 'date'
					},
					{ key: 'occupation', label: 'Occupation' }
				].map(({ key, label, type }) => (
					<div key={key}>
						<Label htmlFor={key}>{label}</Label>
						<Input
							id={key}
							name={key}
							type={type || 'text'}
							defaultValue={
								initialData[key as keyof UserProfile] || ''
							}
							disabled={!isEditing}
						/>
					</div>
				))}
			</div>

			<div>
				<Label htmlFor="bio">Bio</Label>
				<Textarea
					id="bio"
					name="bio"
					defaultValue={initialData.bio || ''}
					disabled={!isEditing}
					rows={4}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{['github', 'linkedin', 'twitter'].map(social => (
					<div key={social}>
						<Label htmlFor={social}>
							{social.charAt(0).toUpperCase() + social.slice(1)}
						</Label>
						<Input
							id={social}
							name={social}
							defaultValue={
								initialData[social as keyof UserProfile] || ''
							}
							disabled={!isEditing}
						/>
					</div>
				))}
			</div>

			{isEditing ? (
				<div className="flex justify-end space-x-2">
					<Button
						type="button"
						variant="outline"
						onClick={() => setIsEditing(false)}
					>
						Cancel
					</Button>
					<Button type="submit">Save Changes</Button>
				</div>
			) : (
				<Button type="button" onClick={() => setIsEditing(true)}>
					Edit Profile
				</Button>
			)}

			<hr className="my-8" />

			<Button type="button" variant="destructive" onClick={handleLogout}>
				Logout
			</Button>
		</form>
	)
}
