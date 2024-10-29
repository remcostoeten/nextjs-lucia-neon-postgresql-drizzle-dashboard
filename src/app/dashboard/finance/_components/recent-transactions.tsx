'use client'

import { motion } from 'framer-motion'
import { Button, Card, CardContent, CardHeader, CardTitle } from 'ui'

interface Transaction {
	id: string
	description: string
	amount: number
	date: string
}

interface RecentTransactionsProps {
	transactions: Transaction[]
}

export default function RecentTransactions({
	transactions
}: RecentTransactionsProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.6 }}
		>
			<Card>
				<CardHeader>
					<CardTitle>Recent Transactions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{transactions.slice(0, 5).map(transaction => (
							<div
								key={transaction.id}
								className="flex justify-between items-center"
							>
								<div>
									<p className="font-medium">
										{transaction.description}
									</p>
									<p className="text-sm text-gray-500">
										{new Date(
											transaction.date
										).toLocaleDateString()}
									</p>
								</div>
								<p
									className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}
								>
									{transaction.amount > 0 ? '+' : '-'} €
									{Math.abs(transaction.amount).toFixed(2)}
								</p>
							</div>
						))}
					</div>
					<Button variant="outline" className="w-full mt-4">
						View All Transactions
					</Button>
				</CardContent>
			</Card>
		</motion.div>
	)
}
