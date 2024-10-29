'use client'

import { Card, CardContent, CardHeader, CardTitle } from 'ui'
import { motion } from 'framer-motion'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const expenseData = [
	{ name: 'Housing', value: 1200 },
	{ name: 'Food', value: 500 },
	{ name: 'Transportation', value: 300 },
	{ name: 'Entertainment', value: 200 },
	{ name: 'Others', value: 300 }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function ExpenseBreakdown() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.5 }}
		>
			<Card>
				<CardHeader>
					<CardTitle>Expense Breakdown</CardTitle>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={expenseData}
								cx="50%"
								cy="50%"
								labelLine={false}
								outerRadius={80}
								fill="#8884d8"
								dataKey="value"
							>
								{expenseData.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
					<div className="mt-4 grid grid-cols-2 gap-2">
						{expenseData.map((entry, index) => (
							<div key={entry.name} className="flex items-center">
								<div
									className="w-3 h-3 mr-2"
									style={{
										backgroundColor:
											COLORS[index % COLORS.length]
									}}
								></div>
								<span className="text-sm">
									{entry.name}: €{entry.value}
								</span>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	)
}
