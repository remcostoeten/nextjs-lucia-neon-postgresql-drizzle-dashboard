import { Note } from '@/lib/db'
import { useEffect, useState } from 'react'

type NoteListProps = {
    notes: Note[]
    selectedFolderId: string | null
}

export default function NoteList({ notes, selectedFolderId }: NoteListProps) {
    const [displayedNotes, setDisplayedNotes] = useState<Note[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const notesPerPage = 20

    useEffect(() => {
        setDisplayedNotes(notes.slice(0, notesPerPage))
        setCurrentPage(1)
        setHasMore(notes.length > notesPerPage)
    }, [notes, selectedFolderId])

    const loadMore = () => {
        const nextPage = currentPage + 1
        const startIndex = (nextPage - 1) * notesPerPage
        const endIndex = startIndex + notesPerPage
        const newNotes = notes.slice(startIndex, endIndex)

        setDisplayedNotes(prevNotes => [...prevNotes, ...newNotes])
        setCurrentPage(nextPage)
        setHasMore(endIndex < notes.length)
    }

    return (
        <div className="note-list p-4 bg-gray-100">
            {displayedNotes.map(note => (
                <div key={note.id} className="note-item p-4 mb-4 bg-white rounded shadow">
                    <h3 className="text-lg font-bold">{note.title}</h3>
                    <p className="text-gray-700">{note.content.substring(0, 100)}...</p>
                </div>
            ))}
            {hasMore && (
                <Button
                    onClick={loadMore}
                >
                    Load More
                </Button>
            )}
        </div>
    )
}
