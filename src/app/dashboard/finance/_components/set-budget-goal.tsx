'use client'

import { createMonthlyBudget, getUserMonthlyBudgets } from 'actions'
import { motion } from 'framer-motion'
import { Euro } from 'lucide-react'
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
	PopoverTrigger,
	Textarea
} from 'ui'

interface SetBudgetFormProps {
	setBudgets: React.Dispatch<React.SetStateAction<any[]>>
}

export default function SetBudgetForm({ setBudgets }: SetBudgetFormProps) {
	const [isOpen, setIsOpen] = useState(false)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const title = formData.get('title') as string
		const amount = formData.get('amount') as string
		const month = formData.get('month') as string
		const description = formData.get('description') as string

		try {
			await createMonthlyBudget(title, amount, month, description)
			toast.success('Monthly budget created successfully!')
			setIsOpen(false)
			const updatedBudgets = await getUserMonthlyBudgets()
			setBudgets(updatedBudgets)
		} catch (error) {
			toast.error('Failed to create monthly budget. Please try again.')
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5, delay: 0.3 }}
		>
			<Card>
				<CardHeader>
					<CardTitle>Set Monthly Budget</CardTitle>
				</CardHeader>
				<CardContent>
					<Popover open={isOpen} onOpenChange={setIsOpen}>
						<PopoverTrigger asChild>
							<Button className="w-full">
								<Euro className="w-4 h-4 mr-2" />
								Set Monthly Budget
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80">
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-2">
									<label
										htmlFor="title"
										className="text-sm font-medium"
									>
										Budget Title
									</label>
									<Input
										id="title"
										name="title"
										placeholder="e.g., Groceries"
										required
									/>
								</div>
								<div className="space-y-2">
									<label
										htmlFor="amount"
										className="text-sm font-medium"
									>
										Amount (€)
									</label>
									<Input
										id="amount"
										name="amount"
										type="number"
										placeholder="e.g., 500"
										required
									/>
								</div>
								<div className="space-y-2">
									<label
										htmlFor="month"
										className="text-sm font-medium"
									>
										Month
									</label>
									<Input
										id="month"
										name="month"
										type="month"
										required
									/>
								</div>
								<div className="space-y-2">
									<label
										htmlFor="description"
										className="text-sm font-medium"
									>
										Description (Optional)
									</label>
									<Textarea
										id="description"
										name="description"
										placeholder="Add any additional details..."
									/>
								</div>
								<Button type="submit" className="w-full">
									Create Monthly Budget
								</Button>
							</form>
						</PopoverContent>
					</Popover>
				</CardContent>
			</Card>
		</motion.div>
	)
}
