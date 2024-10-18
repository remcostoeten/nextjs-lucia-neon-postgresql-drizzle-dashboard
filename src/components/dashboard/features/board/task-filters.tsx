import { Button, Input } from '@/components/ui'
import { Grid, List, Search } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

interface TaskFiltersProps {
	viewMode: 'list' | 'grid'
	setViewMode: Dispatch<SetStateAction<'list' | 'grid'>>
	searchTerm: string
	setSearchTerm: Dispatch<SetStateAction<string>>
}

export default function TaskFilters({
	viewMode,
	setViewMode,
	searchTerm,
	setSearchTerm
}: TaskFiltersProps) {
	return (
		<div className="flex flex-wrap justify-between items-center mb-6 gap-4">
			<div className="flex space-x-2">
				<Button
					variant={viewMode === 'list' ? 'default' : 'outline'}
					onClick={() => setViewMode('list')}
					className="bg-[#2C2C2C] text-white border-gray-600 hover:bg-[#3C3C3C]"
				>
					<List className="h-4 w-4 mr-2" />
					List
				</Button>
				<Button
					variant={viewMode === 'grid' ? 'default' : 'outline'}
					onClick={() => setViewMode('grid')}
					className="bg-[#2C2C2C] text-white border-gray-600 hover:bg-[#3C3C3C]"
				>
					<Grid className="h-4 w-4 mr-2" />
					Grid
				</Button>
			</div>
			<div className="relative">
				<Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
				<Input
					type="text"
					placeholder="Search tasks..."
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className="pl-10 bg-[#2C2C2C] text-white border-gray-600 w-64"
				/>
			</div>
		</div>
	)
}
