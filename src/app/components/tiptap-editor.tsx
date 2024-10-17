'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function TipTapEditor({
	content,
	onChange
}: {
	content: string
	onChange: (html: string) => void
}) {
	const editor = useEditor({
		extensions: [StarterKit],
		content,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML())
		}
	})

	return (
		<div className="border rounded-md p-2">
			<EditorContent editor={editor} />
		</div>
	)
}
