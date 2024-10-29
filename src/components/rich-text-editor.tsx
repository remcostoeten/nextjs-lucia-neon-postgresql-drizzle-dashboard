'use client'

import { Toggle } from 'ui'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, List, ListOrdered } from 'lucide-react'

const MenuBar = ({ editor }: { editor: any }) => {
	if (!editor) {
		return null
	}

	return (
		<div className="flex flex-wrap gap-2">
			<Toggle
				size="sm"
				pressed={editor.isActive('bold')}
				onPressedChange={() =>
					editor.chain().focus().toggleBold().run()
				}
			>
				<Bold className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive('italic')}
				onPressedChange={() =>
					editor.chain().focus().toggleItalic().run()
				}
			>
				<Italic className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive('bulletList')}
				onPressedChange={() =>
					editor.chain().focus().toggleBulletList().run()
				}
			>
				<List className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive('orderedList')}
				onPressedChange={() =>
					editor.chain().focus().toggleOrderedList().run()
				}
			>
				<ListOrdered className="h-4 w-4" />
			</Toggle>
		</div>
	)
}

interface RichTextEditorProps {
	content: string
	onChange: (content: string) => void
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
	content,
	onChange
}) => {
	const editor = useEditor({
		extensions: [StarterKit],
		content,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML())
		}
	})

	return (
		<div className="border text-subtitle border-input bg-background rounded-md">
			<MenuBar editor={editor} />
			<EditorContent editor={editor} className="p-3 min-h-[200px]" />
		</div>
	)
}

export default RichTextEditor
