'use client'

import { motion } from 'framer-motion'
import { PlusCircle, Search } from 'lucide-react'

type DashboardSidebarProps = {}

export default function DashboardSidebar({}: DashboardSidebarProps) {
	return (
		<div className="text-white p-4 h-full w-[230px] overflow-y-auto -z-10">
			<motion.h2
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className="text-2xl font-bold mb-6"
			>
				Queries
			</motion.h2>
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="relative mb-6"
			>
				<input
					type="text"
					placeholder="Search queries"
					className="w-full p-2 pl-10 bg-card border-outline rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<Search
					className="absolute left-3 top-2.5 text-gray-400"
					size={18}
				/>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="bg-card border-outline p-4 rounded-md mb-6 shadow-md"
			>
				<div className="flex items-center mb-2">
					<PlusCircle className="text-blue-400 mr-2" size={24} />
					<h3 className="text-lg font-semibold">Create a Query</h3>
				</div>
				<p className="text-sm mb-4 text-gray-300">
					Let&apos;s get started with something fun
				</p>
				<button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition-colors duration-200">
					Create
				</button>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
				className="bg-card border-outline p-4 rounded-md shadow-md"
			>
				<div className="flex items-center justify-between mb-2">
					<span className="font-semibold">Explorer Plan</span>
					<span className="text-blue-400">0%</span>
				</div>
				<p className="text-sm mb-4 text-gray-300">0 of 3 used</p>
				<button className="bg-gray-600 text-white px-4 py-2 rounded-md w-full hover:bg-gray-500 transition-colors duration-200">
					Upgrade
				</button>
			</motion.div>
		</div>
	)
}
