import { Board } from '@/types/tasks'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from 'ui'

interface BoardSelectorProps {
	boards: Board[]
	selectedBoard: string | null
	onSelectBoard: (boardId: string) => void
}

export default function BoardSelector({
	boards,
	selectedBoard,
	onSelectBoard
}: BoardSelectorProps) {
	return (
		<Select value={selectedBoard || ''} onValueChange={onSelectBoard}>
			<SelectTrigger className="w-[200px] bg-[#2C2C2C] text-white border-gray-600">
				<SelectValue placeholder="Select a board" />
			</SelectTrigger>
			<SelectContent>
				{boards.map(board => (
					<SelectItem key={board.id} value={board.id}>
						{board.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
