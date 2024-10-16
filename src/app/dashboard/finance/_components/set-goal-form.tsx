'use client'

import { createGoal } from 'actions'
import { motion } from 'framer-motion'
import { Target } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger
} from 'ui'

type SetGoalFormProps = {
	onGoalCreated: () => void
}

export default function SetGoalForm({ onGoalCreated }: SetGoalFormProps) {
	const [isOpen, setIsOpen] = useState(false)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const title = formData.get('title') as string
		const targetAmount = formData.get('targetAmount') as string

		try {
			await createGoal(title, targetAmount)
			toast.success('Goal created successfully!')
			setIsOpen(false)
			onGoalCreated()
		} catch (error) {
			toast.error('Failed to create goal. Please try again.')
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<Card>
				<CardHeader>
					<CardTitle>Set a New Goal</CardTitle>
				</CardHeader>
				<CardContent>
					<Popover open={isOpen} onOpenChange={setIsOpen}>
						<PopoverTrigger asChild>
							<Button className="w-full">
								<Target className="w-4 h-4 mr-2" />
								Set a Goal
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80">
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-2">
									<label
										htmlFor="title"
										className="text-sm font-medium"
									>
										Goal Title
									</label>

									<Input
										id="title"
										name="title"
										placeholder="e.g., New Car"
										required
									/>
								</div>
								<div className="space-y-2">
									<label
										htmlFor="targetAmount"
										className="text-sm font-medium"
									>
										Target Amount (€)
									</label>
									<Input
										id="targetAmount"
										name="targetAmount"
										type="number"
										placeholder="e.g., 5000"
										required
									/>
								</div>
								<Button type="submit" className="w-full">
									Create Goal
								</Button>
							</form>
						</PopoverContent>
					</Popover>
				</CardContent>
			</Card>
		</motion.div>
	)
}
