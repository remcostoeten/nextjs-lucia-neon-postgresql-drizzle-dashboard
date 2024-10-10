'use client'

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Input,
	Label,
	Separator,
	Textarea
} from 'ui'
import { UserProfile } from '@/types/types.users'
import { UserCircle } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'
import Appearance from './appearance'
import { updateUserProfile } from './get-user-profile'

interface MyAccountFormProps {
	initialProfile: UserProfile
}

export default function MyAccountForm({ initialProfile }: MyAccountFormProps) {
	const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile)

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setUserProfile((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const result = await updateUserProfile(userProfile)
			if (result.success) {
				toast.success('Profile updated successfully')
			} else {
				toast.error(result.error || 'Failed to update profile')
			}
		} catch (error) {
			console.error('Error updating profile:', error)
			toast.error('An error occurred while updating the profile')
		}
	}

	return (
		<div className="container mx-auto p-4">
			<Card className="w-full max-w-4xl mx-auto bg-card text-card-foreground">
				<CardHeader>
					<div className="flex items-center space-x-4">
						<UserCircle className="w-12 h-12 text-primary" />
						<div>
							<CardTitle className="text-2xl font-bold">
								My Account
							</CardTitle>
							<CardDescription>
								Manage your account information
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="firstName">First Name</Label>
								<Input
									id="firstName"
									name="firstName"
									value={userProfile.firstName || ''}
									onChange={handleInputChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="lastName">Last Name</Label>
								<Input
									id="lastName"
									name="lastName"
									value={userProfile.lastName || ''}
									onChange={handleInputChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="username">Username</Label>
								<Input
									id="username"
									name="username"
									value={userProfile.username || ''}
									onChange={handleInputChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									value={userProfile.email || ''}
									onChange={handleInputChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="dateOfBirth">
									Date of Birth
								</Label>
								<Input
									id="dateOfBirth"
									name="dateOfBirth"
									type="date"
									value={userProfile.dateOfBirth || ''}
									onChange={handleInputChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="occupation">Occupation</Label>
								<Input
									id="occupation"
									name="occupation"
									value={userProfile.occupation || ''}
									onChange={handleInputChange}
								/>
							</div>
						</div>
						<Separator />
						<div className="space-y-2">
							<Label htmlFor="bio">Bio</Label>
							<Textarea
								id="bio"
								name="bio"
								value={userProfile.bio || ''}
								onChange={handleInputChange}
								rows={4}
							/>
						</div>
						<Separator />
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="space-y-2">
								<Label htmlFor="github">GitHub</Label>
								<Input
									id="github"
									name="github"
									value={userProfile.github || ''}
									onChange={handleInputChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="linkedin">LinkedIn</Label>
								<Input
									id="linkedin"
									name="linkedin"
									value={userProfile.linkedin || ''}
									onChange={handleInputChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="twitter">Twitter</Label>
								<Input
									id="twitter"
									name="twitter"
									value={userProfile.twitter || ''}
									onChange={handleInputChange}
								/>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<Button type="submit" className="ml-auto">
						Save Changes
					</Button>
				</CardFooter>
			</Card>
			<Appearance />
		</div>
	)
}
