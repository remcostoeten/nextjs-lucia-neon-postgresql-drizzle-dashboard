'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { createActivity } from 'actions'
import {
	ReactElement,
	JSXElementConstructor,
	ReactNode,
	AwaitedReactNode
} from 'react'
import {
	ReactElement,
	JSXElementConstructor,
	ReactNode,
	ReactPortal,
	AwaitedReactNode
} from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Icon,
	IconNames,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from 'ui'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	duration: z.number().min(1, 'Duration must be at least 1 minute'),
	icon: z.string(),
	color: z.string()
})

const iconOptions: IconNames[] = [
	'Activity',
	'Folder',
	'Book',
	'Pencil',
	'Code',
	'Music',
	'Video',
	'Image',
	'File',
	'Coffee'
]
const colorOptions = [
	'default',
	'red',
	'blue',
	'green',
	'yellow',
	'purple',
	'pink'
]

export function CreateActivityForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			duration: 30,
			icon: 'Activity',
			color: 'default'
		}
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const formData = new FormData()
		Object.entries(values).forEach(([key, value]) =>
			formData.append(key, value.toString())
		)

		const result = await createActivity(formData)

		if (result.error) {
			toast.error('Failed to create activity')
		} else {
			toast.success('Activity created successfully')
			form.reset()
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="duration"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Duration (minutes)</FormLabel>
							<FormControl>
								<Input
									type="number"
									{...field}
									onChange={e =>
										field.onChange(Number(e.target.value))
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="icon"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Icon</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{iconOptions.map(
										(
											icon:
												| string
												| number
												| bigint
												| boolean
												| ReactElement<
														any,
														| string
														| JSXElementConstructor<any>
												  >
												| Iterable<ReactNode>
												| Promise<AwaitedReactNode>
										) => (
											<SelectItem key={icon} value={icon}>
												<div className="flex items-center">
													<Icon
														name={icon}
														className="mr-2"
													/>
													{icon}
												</div>
											</SelectItem>
										)
									)}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="color"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Color</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{colorOptions.map(
										(
											color:
												| string
												| number
												| bigint
												| boolean
												| ReactElement<
														any,
														| string
														| JSXElementConstructor<any>
												  >
												| Iterable<ReactNode>
												| ReactPortal
												| Promise<AwaitedReactNode>
										) => (
											<SelectItem
												key={color}
												value={color}
											>
												<div className="flex items-center">
													<div
														className={`w-4 h-4 rounded-full mr-2 bg-${color}-500`}
													/>
													{color}
												</div>
											</SelectItem>
										)
									)}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Create Activity</Button>
			</form>
		</Form>
	)
}
