'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from 'sonner'
import { ClipboardIcon, TrashIcon, ArrowUpAZIcon, ArrowDownAZIcon, CodeIcon, SaveIcon, CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { useFormState } from 'react-dom'
import { saveProcessedData } from './actions'
import { useClientAuth } from '@/core/server/auth/client-auth-utils'

export default function CSVProcessor() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState({ words: 0, letters: 0, lines: 0 })
  const [processStats, setProcessStats] = useState({ removed: 0, time: 0, remaining: 0 })
  const [sortDirection, setSortDirection] = useState('asc')
  const [date, setDate] = useState<Date>()
  const [formState, formAction] = useFormState(saveProcessedData, null)
  const { clientCheckAuth } = useClientAuth()

  useEffect(() => {
    clientCheckAuth()
  }, [])

  const updateStats = (text: string) => {
    const words = text.trim().split(/\s+/).length
    const letters = text.replace(/[^a-zA-Z]/g, '').length
    const lines = text.split('\n').length
    setStats({ words, letters, lines })
  }

  useEffect(() => {
    updateStats(input)
  }, [input])

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setInput(text)
      toast.success('Content pasted from clipboard')
    } catch (err) {
      toast.error('Failed to read from clipboard')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    toast.success('Content cleared')
  }

  const handleSort = () => {
    const sorted = input.split('\n').sort((a, b) => {
      return sortDirection === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
    }).join('\n')
    setInput(sorted)
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    toast.success(`Sorted ${sortDirection === 'asc' ? 'A-Z' : 'Z-A'}`)
  }

  const handleFormat = () => {
    const formatted = input.split('\n').map(line => line.trim()).join('\n')
    setInput(formatted)
    toast.success('Content formatted')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const startTime = performance.now()
    try {
      const response = await fetch('/api/process-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      })
      const data = await response.json()
      setOutput(data.output)
      const endTime = performance.now()
      setProcessStats({
        removed: stats.letters - data.output.replace(/[^a-zA-Z]/g, '').length,
        time: (endTime - startTime) / 1000,
        remaining: data.output.split('\n').length
      })
      toast.success('CSV processed successfully')
    } catch (error) {
      console.error('Error:', error)
      toast.error('An error occurred while processing the CSV')
    }
    setIsLoading(false)
  }

  const copyOutput = () => {
    navigator.clipboard.writeText(output)
    toast.success('Output copied to clipboard')
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">CSV Processor</h1>
      <div className="space-y-4">
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              updateStats(e.target.value)
            }}
            rows={10}
            placeholder="Paste your CSV content here..."
            className="w-full bg-gray-800 text-white border-gray-700"
          />
          <div className="absolute top-2 right-2 space-x-2">
            <Button size="icon" variant="ghost" onClick={handlePaste}>
              <ClipboardIcon className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleClear}>
              <TrashIcon className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleSort}>
              {sortDirection === 'asc' ? <ArrowUpAZIcon className="h-4 w-4" /> : <ArrowDownAZIcon className="h-4 w-4" />}
            </Button>
            <Button size="icon" variant="ghost" onClick={handleFormat}>
              <CodeIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-sm text-gray-400">
          Words: {stats.words} | Letters: {stats.letters} | Lines: {stats.lines}
        </div>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Process CSV'}
        </Button>
        {output && (
          <>
            <div className="text-sm text-gray-400">
              Processed in {processStats.time.toFixed(2)}s | Removed {processStats.removed} characters | {processStats.remaining} lines remaining
            </div>
            <div className="relative">
              <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto text-sm">
                {output}
              </pre>
              <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={copyOutput}>
                <ClipboardIcon className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Save Processed Data</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-gray-800 border-gray-700">
            <form action={formAction}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name (optional)</Label>
                  <Input id="name" name="name" placeholder="Enter a name or leave blank for timestamp" className="bg-gray-700 text-white border-gray-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea id="description" name="description" placeholder="Enter a description" className="bg-gray-700 text-white border-gray-600" />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <RadioGroup defaultValue="followers">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="followers" id="followers" />
                      <Label htmlFor="followers">Followers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="following" id="following" />
                      <Label htmlFor="following">Following</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Date (optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-gray-700 text-white border-gray-600">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="bg-gray-800 text-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <input type="hidden" name="linesNumber" value={processStats.remaining.toString()} />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </form>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}import { time, error } from 'console'
import { placeholder } from 'drizzle-orm'
import { headers } from 'next/headers'
import { type } from 'os'
import { join } from 'path'
import { stringify } from 'querystring'
import { FormEvent } from 'react'
import { json } from 'stream/consumers'
import { map } from 'zod'
