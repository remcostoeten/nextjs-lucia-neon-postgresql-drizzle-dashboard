'use client'

import { fetchParsedOutputs } from '@/core/server/actions/save-parsed-output'
import { ParsedOutput } from '@/core/server/db/schema/parsed-ig'
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, ScrollArea } from 'ui'

export default function CsvModifier() {
	const [savedOutputs, setSavedOutputs] = useState<ParsedOutput[]>([])
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		const loadSavedOutputs = async () => {
			setIsLoading(true)
			setError(null)
			const result = await fetchParsedOutputs()
			if (result.success && result.data) {
				setSavedOutputs(result.data)
			} else {
				setError(result.error || 'Failed to fetch saved outputs')
				if (result.error === 'Unauthorized') {
					router.push('/login')
				}
			}
			setIsLoading(false)
		}
		loadSavedOutputs()
	}, [router])

	useEffect(() => {
		const selectedOutputId = searchParams.get('selectedOutput')
		if (selectedOutputId) {
			fetchSelectedOutput(selectedOutputId)
		}
	}, [searchParams])

	const handleOutputSelect = (outputId: string) => {
		const params = new URLSearchParams(searchParams)
		params.set('selectedOutput', outputId)
		router.push(`?${params.toString()}`)
	}

	return (
		<div
			className={`bg-card border-r h-screen transition-all duration-300 ${
				isCollapsed ? 'w-12' : ''
			}`}
		>
			<div className="flex justify-between items-center p-4">
				<h2
					className={`text-lg font-semibold text-white ${
						isCollapsed ? 'hidden' : 'block'
					}`}
				>
					Saved Outputs
				</h2>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setIsCollapsed(!isCollapsed)}
					className="text-white hover:bg-[#3e3e42]"
				>
					{isCollapsed ? (
						<ChevronRight className="h-4 w-4" />
					) : (
						<ChevronLeft className="h-4 w-4" />
					)}
				</Button>
			</div>
			<ScrollArea className="h-[calc(100vh-60px)]">
				{isLoading ? (
					<div className="flex justify-center items-center h-full">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
					</div>
				) : error ? (
					<div className="text-red-500 p-4">{error}</div>
				) : savedOutputs.length === 0 ? (
					<div className="text-white p-4">
						No saved outputs found.
					</div>
				) : (
					savedOutputs.map(output => (
						<Button
							key={output.id}
							variant="ghost"
							className={`w-full justify-start text-white hover:bg-[#3e3e42] ${
								isCollapsed ? 'px-2' : 'px-4'
							}`}
							onClick={() => handleOutputSelect(output.id)}
						>
							<FileText className="h-4 w-4 mr-2" />
							{!isCollapsed && (
								<span className="truncate">{output.title}</span>
							)}
						</Button>
					))
				)}
			</ScrollArea>
		</div>
	)
}
