'use client'

import OnboardingForm from '@/components/auth/onboarding'
import { Button } from '@/components/ui'
import { fadeInUp } from '@/core/constants/animations'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

type OnboardingTriggerProps = {
	userId: string
	hasCompletedOnboarding: boolean
}

export default function OnboardingTrigger({
	userId,
	hasCompletedOnboarding
}: OnboardingTriggerProps) {
	const [showOnboarding, setShowOnboarding] = useState(false)

	const handleComplete = () => {
		setShowOnboarding(false)
		// You might want to refresh the page or update the UI to reflect the completed onboarding
	}

	if (hasCompletedOnboarding) {
		return null
	}

	return (
		<AnimatePresence mode="wait">
			{!showOnboarding ? (
				<motion.div
					key="trigger"
					initial="initial"
					animate="animate"
					exit="exit"
					variants={fadeInUp(0.2)}
					className="mb-4"
				>
					<Button onClick={() => setShowOnboarding(true)}>
						Complete Your Profile
					</Button>
				</motion.div>
			) : (
				<motion.div
					key="onboarding"
					initial="initial"
					animate="animate"
					exit="exit"
					variants={fadeInUp(0.2)}
					className="mb-4"
				>
					<OnboardingForm
						userId={userId}
						onComplete={handleComplete}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
