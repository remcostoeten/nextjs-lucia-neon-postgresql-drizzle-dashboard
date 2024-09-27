'use client'

import RichTextEditor from '@/components/rich-text-editor'
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Input
} from '@/components/ui'
import { motion } from 'framer-motion'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useState } from 'react'

type Note = {
	id: string
	title: string
	content: string
}

type NoteItemProps = {
	note: Note
	onUpdate: (title: string, content: string) => void
	onDelete: () => void
}

export default function NoteItem({ note, onUpdate, onDelete }: NoteItemProps) {
	const [isExpanded, setIsExpanded] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [editTitle, setEditTitle] = useState(note.title)
	const [editContent, setEditContent] = useState(note.content)

	const toggleExpand = () => setIsExpanded(!isExpanded)

	const handleEdit = () => {
		setIsEditing(true)
		setIsExpanded(true)
	}

	const handleSave = () => {
		onUpdate(editTitle, editContent)
		setIsEditing(false)
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<Card className="mb-4">
				<CardHeader className="flex flex-row items-center justify-between">
					{isEditing ? (
						<Input
							value={editTitle}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => setEditTitle(e.target.value)}
							className="text-xl font-semibold"
						/>
					) : (
						<CardTitle className="text-xl font-semibold">
							{note.title}
						</CardTitle>
					)}
					<div className="flex space-x-2">
						<Button
							variant="ghost"
							size="icon"
							onClick={handleEdit}
						>
							<Edit size={20} />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={toggleExpand}
						>
							<MoreHorizontal size={20} />
						</Button>
						<Button variant="ghost" size="icon" onClick={onDelete}>
							<Trash size={20} />
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					{isExpanded &&
						(isEditing ? (
							<RichTextEditor
								content={editContent}
								onChange={setEditContent}
							/>
						) : (
							<div
								dangerouslySetInnerHTML={{
									__html: note.content
								}}
							/>
						))}
					{!isExpanded && (
						<p className="text-muted-foreground">
							{note.content
								.replace(/<[^>]*>/g, '')
								.substring(0, 100)}
							...
						</p>
					)}
					{isEditing && (
						<Button onClick={handleSave} className="mt-4">
							Save
						</Button>
					)}
				</CardContent>
			</Card>
		</motion.div>
	)
}
