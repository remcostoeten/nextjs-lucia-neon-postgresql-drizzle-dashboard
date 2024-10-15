'use client';

import OnboardingForm from '@/components/auth/onboarding';
import { cn } from 'cn';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import React, { useState } from 'react';

const fadeInUp = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 10 },
	transition: { duration: 0.2 }
};

interface OnboardingNoticeProps {
	userId: string;
	hasCompletedOnboarding: boolean;
	className?: string;
	badge?: string;
	children?: React.ReactNode;
}

export default function OnboardingNotice({
	userId,
	hasCompletedOnboarding,
	className,
	badge,
	children
}: OnboardingNoticeProps) {
	const [showOnboarding, setShowOnboarding] = useState(false);
	const [dismissed, setDismissed] = useState(false);

	const handleComplete = () => {
		setShowOnboarding(false);
		// You might want to refresh the page or update the UI to reflect the completed onboarding
	};

	const handleDismiss = () => {
		setDismissed(true);
	};

	if (hasCompletedOnboarding || dismissed) {
		return null;
	}

	return (
		<div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
			<AnimatePresence mode="wait">
				{!showOnboarding ? (
					<motion.div
						key="trigger"
						initial="initial"
						animate="animate"
						exit="exit"
						variants={fadeInUp}
						className={cn(
							"pointer-events-auto flex items-center justify-between gap-x-6 bg-black/25 px-6 py-2.5 backdrop-blur-md sm:rounded-xl sm:py-3 sm:pr-3.5 sm:pl-4",
							className
						)}
					>
						<p className="text-sm text-white leading-6">
							<button onClick={() => setShowOnboarding(true)}>
								{children}
								{badge && (
									<span className="ml-1 cursor-pointer rounded-full bg-white px-2 py-0.5 font-medium text-black text-sm">
										{badge}
									</span>
								)}
							</button>
						</p>
						<button className="-m-1.5 flex-none p-1.5" type="button" onClick={handleDismiss}>
							<span className="sr-only">Dismiss</span>
							<XIcon className="size-5 text-white" />
						</button>
					</motion.div>
				) : (
					<motion.div
						key="onboarding"
						initial="initial"
						animate="animate"
						exit="exit"
						variants={fadeInUp}
						className="pointer-events-auto w-full sm:max-w-2xl"
					>
						<OnboardingForm
							userId={userId}
							onComplete={handleComplete}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
