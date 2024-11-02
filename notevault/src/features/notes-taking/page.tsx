//stackblitz.com/edit/sb1-aarbmk?file=.gitignore
https: 'use client'

import { Editor } from '@/components/editor'
import { MetadataSidebar } from '@/components/metadata-sidebar'
import { SearchBar } from '@/components/search-bar'
import { Sidebar } from '@/components/sidebar'
import { Note } from '@/lib/types'
import { useState } from 'react'

export default function Home() {
	const [selectedNote, setSelectedNote] = useState<Note | null>(null)

	return (
		<div className="flex h-screen bg-background">
			<Sidebar
				onNoteSelect={setSelectedNote}
				selectedNote={selectedNote}
			/>
			<div className="flex-1 flex flex-col overflow-hidden">
				<div className="p-4 border-b">
					<SearchBar />
				</div>
				<main className="flex-1 flex overflow-hidden">
					<Editor note={selectedNote} />
					<MetadataSidebar note={selectedNote} />
				</main>
			</div>
		</div>
	)
}
