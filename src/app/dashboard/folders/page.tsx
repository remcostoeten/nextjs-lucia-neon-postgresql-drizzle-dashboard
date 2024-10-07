'use client';

import { TreeViewElement } from '@/components/elements/tree-renderer';
import { validateRequest } from '@/lib/auth/lucia';
import { redirect } from 'next/navigation';
import FileTree from './_components/file-tree';
const initialFolders: TreeViewElement[] = [
  {
    id: '1',
    name: 'Root Folder',
    isSelectable: true,
    color: '#ff0000',
    children: [
      {
        id: '2',
        name: 'Subfolder 1',
        isSelectable: true,
        color: '#00ff00',
      },
      {
        id: '3',
        name: 'Subfolder 2',
        isSelectable: true,
        color: '#0000ff',
        children: [
          {
            id: '4',
            name: 'Sub-subfolder',
            isSelectable: true,
            color: '#ffff00',
          }
        ]
      }
    ]
  }
]
export default async function FoldersPage() {

  const handleUpdateFolder = async (id: string, name: string, color: string) => {
    // Implement folder update logic here
  }

  const handleDeleteFolder = async (id: string) => {
    // Implement folder deletion logic here
  }

  const handleMoveFolder = async (id: string, newParentId: string | null) => {
    // Implement folder moving logic here
  }

  const handleCreateFolder = async (name: string, color: string, parentId: string | null) => {
    // Implement folder creation logic here
  }
  return (
    <div className="w-full max-w-3xl">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">
        File Explorer
      </h1>
      <FileTree
        initialElements={initialFolders}
        onUpdateFolder={handleUpdateFolder}
        onDeleteFolder={handleDeleteFolder}
        onMoveFolder={handleMoveFolder}
        onCreateFolder={handleCreateFolder}
      />
    </div>
  )
}
