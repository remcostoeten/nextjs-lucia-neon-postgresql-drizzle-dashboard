'use client'

import {
	getRecentTransactions,
	getUserGoals,
	getUserMonthlyBudgets
} from 'actions'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from 'ui'
import AddTransactionForm from './add-transaction-form'
import ExpenseBreakdown from './expense-breakdown'
import RecentTransactions from './recent-transactions'
import SetBudgetForm from './set-budget-goal'
import SetGoalForm from './set-goal-form'
import SummaryCard from './summary-card'

export default function FinanceDashboard() {
	const [goals, setGoals] = useState([])
	const [budgets, setBudgets] = useState([])
	const [transactions, setTransactions] = useState([])
	const [summary, setSummary] = useState({
		income: 0,
		expenses: 0,
		savings: 0
	})

	useEffect(() => {
		getUserGoals().then(setGoals)
		getUserMonthlyBudgets().then(setBudgets)
		getRecentTransactions().then(setTransactions)
		// In a real application, you would calculate these values based on actual data
		setSummary({ income: 5000, expenses: 3500, savings: 1500 })
	}, [])

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="p-6 space-y-6"
		>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				<SummaryCard summary={summary} />
				<SetGoalForm setGoals={setGoals} />
				<SetBudgetForm setBudgets={setBudgets} />
				<AddTransactionForm setTransactions={setTransactions} />
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<ExpenseBreakdown />
				<RecentTransactions transactions={transactions} />
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.7 }}
			>
				<Card>
					<CardHeader>
						<CardTitle>Your Goals</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{goals.map((goal, index) => (
								<motion.div
									key={goal.id}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{
										duration: 0.5,
										delay: 0.1 * index
									}}
								>
									<Card>
										<CardHeader>
											<CardTitle className="text-lg">
												{goal.title}
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="flex justify-between items-center mb-2">
												<span className="text-sm text-gray-500">
													Progress
												</span>
												<span className="text-sm font-medium">
													{(
														(parseFloat(
															goal.currentAmount
														) /
															parseFloat(
																goal.targetAmount
															)) *
														100
													).toFixed(0)}
													%
												</span>
											</div>
											<div className="relative pt-1">
												<div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
													<div
														style={{
															width: `${(parseFloat(goal.currentAmount) / parseFloat(goal.targetAmount)) * 100}%`
														}}
														className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
													></div>
												</div>
											</div>
											<div className="flex justify-between items-center mt-2">
												<span className="text-sm text-gray-500">
													Current: €
													{goal.currentAmount}
												</span>
												<span className="text-sm text-gray-500">
													Target: €{goal.targetAmount}
												</span>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</CardContent>
				</Card>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.8 }}
			>
				<Card>
					<CardHeader>
						<CardTitle>Monthly Budgets</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{budgets.map((budget, index) => (
								<motion.div
									key={budget.id}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{
										duration: 0.5,
										delay: 0.1 * index
									}}
								>
									<Card>
										<CardHeader>
											<CardTitle className="text-lg">
												{budget.title}
											</CardTitle>
											<p className="text-sm text-gray-500">
												{budget.month}
											</p>
										</CardHeader>
										<CardContent>
											<p className="text-2xl font-bold">
												€{budget.amount}
											</p>
											{budget.description && (
												<p className="text-sm text-gray-500 mt-2">
													{budget.description}
												</p>
											)}
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</motion.div>
	)
}
