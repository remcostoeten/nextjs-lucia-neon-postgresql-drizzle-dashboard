'use client'

import { PlusCircle, Search } from 'lucide-react'
import { useSiteSettingsStore } from 'stores'

type DashboardSidebarProps = {}

export default function DashboardSidebar({ }: DashboardSidebarProps) {
	const { disableAllAnimations, disableSidebarAnimations } =
		useSiteSettingsStore()

	const disableAnimations = disableAllAnimations || disableSidebarAnimations

	return (
		<div className="text-white p-4 h-full w-[230px] overflow-y-auto -z-10">
			<h2 className="text-2xl font-bold ffffmb-6">Queries</h2>
			<div className="relative mb-6">
				<input
					type="text"
					placeholder="Search queries"
					className="w-full p-2 pl-10 bg-card border-outline rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<Search
					className="absolute left-3 top-2.5 text-gray-400"
					size={18}
				/>
			</div>
			<div className="bg-card border-outline p-4 rounded-md mb-6 shadow-md">
				<div className="flex items-center mb-2">
					<PlusCircle className="text-blue-400 mr-2" size={24} />
					<h3 className="text-lg font-semibold">Create a Query</h3>
				</div>
				<p className="text-sm mb-4 text-gray-300">
					Let's get started with something fun
				</p>
				<button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition-colors duration-200">
					Create
				</button>
			</div>
			<div className="bg-card border-outline p-4 rounded-md shadow-md">
				<div className="flex items-center justify-between mb-2">
					<span className="font-semibold">Explorer Plan</span>
					<span className="text-blue-400">0%</span>
				</div>
				<p className="text-sm mb-4 text-gray-300">0 of 3 used</p>
				<button className="bg-gray-600 text-white px-4 py-2 rounded-md w-full hover:bg-gray-500 transition-colors duration-200">
					Upgrade
				</button>
			</div>
		</div>
	)
}
