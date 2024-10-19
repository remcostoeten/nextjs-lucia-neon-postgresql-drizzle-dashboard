'use client'

import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui'
import { useClientAuth } from '@/core/server/auth/client-auth-utils'
import { Task } from '@/types/tasks'
import { deleteTask, getBoards, getTasks, updateBoardLanes, updateTaskStatus } from 'actions'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import CreateBoardModal from '../board/create-board'
import CreateTaskPopover from './create-task-popover'
import TaskList from './task-list'

type Board = {
  id: string
  name: string
  description?: string
  userId: string
  lanes: string[]
  createdAt: Date
  updatedAt: Date
}

export default function TaskManagement() {
  const { getClientSession } = useClientAuth()
  const [userId, setUserId] = useState<string | null>(null)
  const [boards, setBoards] = useState<Board[]>([])
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false)
  const [newLaneName, setNewLaneName] = useState('')

  useEffect(() => {
    const fetchUserSession = async () => {
      const session = await getClientSession()
      if (session.user) {
        setUserId(session.user.id)
      }
    }
    fetchUserSession()
  }, [])

  useEffect(() => {
    if (userId) {
      fetchBoards()
    }
  }, [userId])

  useEffect(() => {
    if (userId && selectedBoard) {
      fetchTasks()
    }
  }, [userId, selectedBoard])

  const fetchBoards = async () => {
    if (userId) {
      try {
        const fetchedBoards = await getBoards(userId)
        setBoards(fetchedBoards)
        if (fetchedBoards.length > 0) {
          setSelectedBoard(fetchedBoards[0])
        }
      } catch (error) {
        console.error('Error fetching boards:', error)
      }
    }
  }

  const fetchTasks = async () => {
    if (userId && selectedBoard) {
      try {
        const fetchedTasks = await getTasks(userId, selectedBoard.id)
        setTasks(fetchedTasks)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
  }

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      await updateTaskStatus(taskId, newStatus)
      fetchTasks()
    } catch (error) {
      console.error('Failed to update task status:', error)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId)
      fetchTasks()
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  const handleAddLane = async () => {
    if (selectedBoard && newLaneName) {
      const updatedLanes = [...selectedBoard.lanes, newLaneName]
      try {
        await updateBoardLanes(selectedBoard.id, updatedLanes)
        setSelectedBoard({ ...selectedBoard, lanes: updatedLanes })
        setNewLaneName('')
      } catch (error) {
        console.error('Failed to add new lane:', error)
      }
    }
  }

  const handleRemoveLane = async (laneToRemove: string) => {
    if (selectedBoard) {
      const updatedLanes = selectedBoard.lanes.filter(lane => lane !== laneToRemove)
      try {
        await updateBoardLanes(selectedBoard.id, updatedLanes)
        setSelectedBoard({ ...selectedBoard, lanes: updatedLanes })
      } catch (error) {
        console.error('Failed to remove lane:', error)
      }
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Task Management</h1>
        <div className="flex items-center mb-4">
          <Select
            value={selectedBoard?.id || ''}
            onValueChange={(value) => setSelectedBoard(boards.find(board => board.id === value) || null)}
          >
            <SelectTrigger className="w-[200px] mr-2">
              <SelectValue placeholder="Select a board" />
            </SelectTrigger>
            <SelectContent>
              {boards.map(board => (
                <SelectItem key={board.id} value={board.id}>{board.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setIsCreateBoardOpen(true)}>Create New Board</Button>
        </div>
        {selectedBoard && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Lanes</h2>
            <div className="flex items-center space-x-2 mb-2">
              <Input
                type="text"
                placeholder="New lane name"
                value={newLaneName}
                onChange={(e) => setNewLaneName(e.target.value)}
                className="w-48"
              />
              <Button onClick={handleAddLane}>Add Lane</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedBoard.lanes.map(lane => (
                <div key={lane} className="bg-card border px-2 py-1 rounded flex items-center">
                  <span>{lane}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveLane(lane)}
                    className="ml-2 text-red-500"
                  >
                    &times;
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedBoard?.lanes.map(lane => (
            <div key={lane} className="bg-card border p-4 rounded">
              <h3 className="text-lg font-semibold mb-2">{lane}</h3>
              <TaskList
                tasks={tasks.filter(task => task.status === lane)}
                status={lane}
                onStatusChange={handleStatusChange}
                oeenTaskDeleted={handleDeleteTask}
                allTasks={tasks}
                viewMode="grid"
                onTaskUpdated={fetchTasks}
                f />
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => setIsCreateTaskOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Task
              </Button>
            </div>
          ))}
        </div>
      </div>
      <CreateTaskPopover onTaskCreated={fetchTasks}
        isOpen={isCreateTaskOpen}
        setIsOpen={setIsCreateTaskOpen}
        boardId={selectedBoard?.id}
        lanes={selectedBoard?.lanes || []}
      />
      <CreateBoardModal
        isOpen={isCreateBoardOpen}
        onClose={() => setIsCreateBoardOpen(false)}
        onBoardCreated={fetchBoards}
        userId={userId || ''}
      />
    </DndProvider>
  )
}
