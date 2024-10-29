'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import confetti from 'canvas-confetti'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from 'ui'

import { fadeInUp } from '@/core/constants/animations'
import { updateProfile } from 'actions'
import { updateUserProfileSchema } from 'db'
import { OnboardingProps, UpdateUserProfileInput } from './auth'

export default function Onboarding({ userId }: OnboardingProps) {
	const [step, setStep] = useState(1)
	const router = useRouter()

	const form = useForm<UpdateUserProfileInput>({
		resolver: zodResolver(updateUserProfileSchema),
		defaultValues: {
			userId,
			firstName: '',
			lastName: '',
			bio: '',
			github: '',
			twitter: '',
			linkedin: ''
		}
	})

	const { handleSubmit, control } = form

	const onSubmit = async (data: UpdateUserProfileInput) => {
		if (step < 3) {
			setStep(step + 1)
		} else {
			try {
				await updateProfile(data)
				confetti({
					particleCount: 100,
					spread: 70,
					origin: { y: 0.6 }
				})
				toast.success('Profile updated successfully!')
				router.push('/dashboard')
			} catch (error) {
				console.error('Error updating user profile:', error)
				toast.error('Failed to update profile. Please try again.')
			}
		}
	}

	return (
		<Dialog open={true}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Complete Your Profile</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<AnimatePresence mode="wait">
							{step === 1 && (
								<motion.div
									key="step1"
									initial="hidden"
									animate="visible"
									exit="hidden"
									variants={fadeInUp()}
								>
									<FormField
										control={control}
										name="firstName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													First Name
												</FormLabel>
												<FormControl>
													<Input
														placeholder="Your first name"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={control}
										name="lastName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Last Name</FormLabel>
												<FormControl>
													<Input
														placeholder="Your last name"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</motion.div>
							)}
							{step === 2 && (
								<motion.div
									key="step2"
									initial="hidden"
									animate="visible"
									exit="hidden"
									variants={fadeInUp()}
								>
									<FormField
										control={control}
										name="bio"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Bio</FormLabel>
												<FormControl>
													<Input
														placeholder="Tell us about yourself"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</motion.div>
							)}
							{step === 3 && (
								<motion.div
									key="step3"
									initial="hidden"
									animate="visible"
									exit="hidden"
									variants={fadeInUp()}
								>
									<FormField
										control={control}
										name="github"
										render={({ field }) => (
											<FormItem>
												<FormLabel>GitHub</FormLabel>
												<FormControl>
													<Input
														placeholder="GitHub username"
														{...field}
														icon={
															<Github className="h-4 w-4" />
														}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={control}
										name="twitter"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Twitter</FormLabel>
												<FormControl>
													<Input
														placeholder="Twitter username"
														{...field}
														icon={
															<Twitter className="h-4 w-4" />
														}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={control}
										name="linkedin"
										render={({ field }) => (
											<FormItem>
												<FormLabel>LinkedIn</FormLabel>
												<FormControl>
													<Input
														placeholder="LinkedIn profile URL"
														{...field}
														icon={
															<Linkedin className="h-4 w-4" />
														}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</motion.div>
							)}
						</AnimatePresence>
						<Button type="submit" className="w-full">
							{step < 3 ? 'Next' : 'Finish'}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
