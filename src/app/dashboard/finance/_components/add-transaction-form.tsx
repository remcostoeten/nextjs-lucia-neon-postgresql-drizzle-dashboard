'use client'

import { createTransaction, getRecentTransactions } from 'actions'
import { motion } from 'framer-motion'
import { PlusCircle } from 'lucide-react'
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from 'ui'

interface AddTransactionFormProps {
	setTransactions: React.Dispatch<React.SetStateAction<any[]>>
}

export default function AddTransactionForm({
	setTransactions
}: AddTransactionFormProps) {
	const [isOpen, setIsOpen] = useState(false)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const description = formData.get('description') as string
		const amount = formData.get('amount') as string
		const date = formData.get('date') as string
		const type = formData.get('type') as 'income' | 'expense'

		try {
			await createTransaction(
				description,
				parseFloat(amount) * (type === 'expense' ? -1 : 1),
				date
			)
			toast.success('Transaction added successfully!')
			setIsOpen(false)
			const updatedTransactions = await getRecentTransactions()
			setTransactions(updatedTransactions)
		} catch (error) {
			toast.error('Failed to add transaction. Please try again.')
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5, delay: 0.4 }}
		>
			<Card>
				<CardHeader>
					<CardTitle>Add Transaction</CardTitle>
				</CardHeader>
				<CardContent>
					<Popover open={isOpen} onOpenChange={setIsOpen}>
						<PopoverTrigger asChild>
							<Button className="w-full">
								<PlusCircle className="w-4 h-4 mr-2" />
								Add Transaction
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80">
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-2">
									<label
										htmlFor="description"
										className="text-sm font-medium"
									>
										Description
									</label>
									<Input
										id="description"
										name="description"
										placeholder="e.g., Grocery shopping"
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
										step="0.01"
										placeholder="e.g., 50.00"
										required
									/>
								</div>
								<div className="space-y-2">
									<label
										htmlFor="date"
										className="text-sm font-medium"
									>
										Date
									</label>
									<Input
										id="date"
										name="date"
										type="date"
										required
									/>
								</div>
								<div className="space-y-2">
									<label
										htmlFor="type"
										className="text-sm font-medium"
									>
										Type
									</label>
									<Select name="type" defaultValue="expense">
										<SelectTrigger>
											<SelectValue placeholder="Select type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="income">
												Income
											</SelectItem>
											<SelectItem value="expense">
												Expense
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<Button type="submit" className="w-full">
									Add Transaction
								</Button>
							</form>
						</PopoverContent>
					</Popover>
				</CardContent>
			</Card>
		</motion.div>
	)
}
