import { Card, CardContent, CardHeader, CardTitle } from 'ui'
import React from 'react'
import { motion } from 'framer-motion'
interface SummaryCardProps {
	summary: {
		income: number
		expenses: number
		savings: number
	}
}

export default function SummaryCard({ summary }: SummaryCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5, delay: 0.1 }}
		>
			<Card>
				<CardHeader>
					<CardTitle>Summary</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<div className="flex justify-between">
							<span>Income:</span>
							<span className="font-bold text-green-600">
								€{summary.income}
							</span>
						</div>
						<div className="flex justify-between">
							<span>Expenses:</span>
							<span className="font-bold text-red-600">
								€{summary.expenses}
							</span>
						</div>
						<div className="flex justify-between">
							<span>Savings:</span>
							<span className="font-bold text-blue-600">
								€{summary.savings}
							</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)
}
