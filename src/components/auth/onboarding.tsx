'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fadeInUp } from '@/core/constants/animations'
import { updateUserProfileSchema } from '@/lib/db/schema/auth'
import { updateProfile } from 'actions'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>

type OnboardingFormProps = {
	userId: string
	onboardingCompletePath: string
}

export default function OnboardingForm({
	userId,
	onboardingCompletePath
}: OnboardingFormProps) {
	const [step, setStep] = useState(1)
	const [formData, setFormData] = useState<UpdateUserProfileInput>({
		userId,
		firstName: '',
		lastName: '',
		username: '',
		dateOfBirth: '',
		occupation: '',
		bio: '',
		github: '',
		linkedin: '',
		twitter: ''
	})
	const router = useRouter()

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (step === 1) {
			// Move to step 2 without submitting to the database
			setStep(2)
		} else {
			// Submit the complete form data
			try {
				const validatedData = updateUserProfileSchema.parse(formData)
				const result = await updateProfile(validatedData)
				if (result.success) {
					toast.success(result.message)
					router.push(onboardingCompletePath)
				} else {
					throw new Error(result.message)
				}
			} catch (error) {
				toast.error(
					error instanceof Error
						? error.message
						: 'Error updating profile'
				)
				console.error(error)
			}
		}
	}

	const handleSkip = () => {
		if (step === 1) {
			setStep(2)
		} else {
			router.push(onboardingCompletePath)
		}
	}

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={step}
				initial="initial"
				animate="animate"
				exit="exit"
				variants={fadeInUp(0.2)}
				className="w-full max-w-md mx-auto"
			>
				<form onSubmit={handleSubmit} className="space-y-4">
					{step === 1 ? (
						<>
							<h2 className="text-xl font-bold mb-4">
								Basic Information
							</h2>
							<Input
								name="firstName"
								placeholder="First Name"
								value={formData.firstName || ''}
								onChange={handleInputChange}
							/>
							<Input
								name="lastName"
								placeholder="Last Name"
								value={formData.lastName || ''}
								onChange={handleInputChange}
							/>
							<Input
								name="username"
								placeholder="Username"
								value={formData.username || ''}
								onChange={handleInputChange}
							/>
							<Input
								name="dateOfBirth"
								type="date"
								placeholder="Date of Birth"
								value={formData.dateOfBirth || ''}
								onChange={handleInputChange}
							/>
						</>
					) : (
						<>
							<h2 className="text-xl font-bold mb-4">
								Additional Information
							</h2>
							<Input
								name="occupation"
								placeholder="Occupation"
								value={formData.occupation || ''}
								onChange={handleInputChange}
							/>
							<Input
								name="bio"
								placeholder="Bio"
								value={formData.bio || ''}
								onChange={handleInputChange}
							/>
							<Input
								name="github"
								placeholder="GitHub URL"
								value={formData.github || ''}
								onChange={handleInputChange}
							/>
							<Input
								name="linkedin"
								placeholder="LinkedIn URL"
								value={formData.linkedin || ''}
								onChange={handleInputChange}
							/>
							<Input
								name="twitter"
								placeholder="Twitter URL"
								value={formData.twitter || ''}
								onChange={handleInputChange}
							/>
						</>
					)}
					<div className="flex justify-between">
						<Button
							type="button"
							variant="outline"
							onClick={handleSkip}
						>
							{step === 1 ? 'Skip' : 'Skip for now'}
						</Button>
						<Button type="submit">
							{step === 1 ? 'Next' : 'Finish'}
						</Button>
					</div>
				</form>
			</motion.div>
		</AnimatePresence>
	)
}
