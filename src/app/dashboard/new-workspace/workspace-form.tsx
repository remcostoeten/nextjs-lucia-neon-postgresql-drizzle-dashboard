'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import type { User } from 'next-auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { EmojiPicker } from '@/components/emoji-picker'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createWorkspace } from '@/lib/db/queries'

const workspaceSchema = z.object({
	name: z.string().min(3, 'Workspace name must be at least 3 characters long')
})

type FormData = z.infer<typeof workspaceSchema>

type WorkspaceFormProps = { user: User }

export default function WorkspaceForm({ user }: WorkspaceFormProps) {
	const router = useRouter()
	const [icon, setIcon] = useState('💼')
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<FormData>({
		resolver: zodResolver(workspaceSchema),
		defaultValues: {
			name: ''
		}
	})

	async function onSubmit(data: FormData) {
		try {
			setIsLoading(true)
			const workspace = await createWorkspace({
				title: data.name,
				iconId: icon,
				workspaceOwnerId: user.id
			})

			if (workspace) {
				toast.success('Workspace created successfully')
				router.push(`/dashboard/${workspace.slug}`)
			}
		} catch (error) {
			toast.error('Failed to create workspace')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<div className="flex gap-2">
									<EmojiPicker getValue={setIcon}>
										<Button
											variant="outline"
											className="text-lg"
											type="button"
										>
											{icon}
										</Button>
									</EmojiPicker>
									<Input
										placeholder="My Workspace"
										{...field}
									/>
								</div>
							</FormControl>
							<FormDescription>
								This is your workspace's visible name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Creating...
						</>
					) : (
						'Create Workspace'
					)}
				</Button>
			</form>
		</Form>
	)
}
