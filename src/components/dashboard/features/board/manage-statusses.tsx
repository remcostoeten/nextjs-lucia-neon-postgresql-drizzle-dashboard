import { Button, Input } from '@/components/ui'
import { X } from 'lucide-react'
import { useState } from 'react'

interface ManageStatusesProps {
	currentStatuses: string[]
	onUpdateStatuses: (newStatuses: string[]) => void
	onClose: () => void
}

export default function ManageStatuses({
	currentStatuses,
	onUpdateStatuses,
	onClose
}: ManageStatusesProps) {
	const [statuses, setStatuses] = useState(currentStatuses)
	const [newStatus, setNewStatus] = useState('')

	const addStatus = () => {
		if (newStatus && !statuses.includes(newStatus)) {
			setStatuses([...statuses, newStatus])
			setNewStatus('')
		}
	}

	const removeStatus = (status: string) => {
		setStatuses(statuses.filter(s => s !== status))
	}

	const moveStatus = (index: number, direction: 'up' | 'down') => {
		if (
			(direction === 'up' && index > 0) ||
			(direction === 'down' && index < statuses.length - 1)
		) {
			const newStatuses = [...statuses]
			const temp = newStatuses[index]
			newStatuses[index] =
				newStatuses[index + (direction === 'up' ? -1 : 1)]
			newStatuses[index + (direction === 'up' ? -1 : 1)] = temp
			setStatuses(newStatuses)
		}
	}

	const handleSave = () => {
		onUpdateStatuses(statuses)
		onClose()
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-[#2C2C2C] p-6 rounded-lg w-96">
				<h3 className="text-lg font-semibold mb-4">Manage Statuses</h3>
				<div className="flex flex-col gap-2 mb-4 max-h-60 overflow-y-auto">
					{statuses.map((status, index) => (
						<div
							key={status}
							className="flex items-center justify-between bg-[#3C3C3C] rounded px-2 py-1"
						>
							<span>{status}</span>
							<div className="flex items-center">
								<Button
									variant="ghost"
									size="sm"
									onClick={() => moveStatus(index, 'up')}
									disabled={index === 0}
								>
									↑
								</Button>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => moveStatus(index, 'down')}
									disabled={index === statuses.length - 1}
								>
									↓
								</Button>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => removeStatus(status)}
								>
									<X className="h-4 w-4" />
								</Button>
							</div>
						</div>
					))}
				</div>
				<div className="flex gap-2 mb-4">
					<Input
						value={newStatus}
						onChange={e => setNewStatus(e.target.value)}
						placeholder="New status"
						className="bg-[#3C3C3C] text-white border-gray-600"
					/>
					<Button onClick={addStatus}>Add</Button>
				</div>
				<div className="flex justify-end gap-2">
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleSave}>Save Changes</Button>
				</div>
			</div>
		</div>
	)
}
