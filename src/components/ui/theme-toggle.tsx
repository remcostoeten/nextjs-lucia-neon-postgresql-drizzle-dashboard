'use client'

import { cn } from 'cn'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function ModeToggle() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	const handleThemeChange = () => {
		if (theme === 'light') {
			setTheme('dark')
		} else {
			setTheme('light')
			toast.info('Light theme is not yet fully implemented', {
				description: 'Some elements may not display correctly.',
				duration: 5000
			})
		}
	}

	return (
		<button
			className="group relative inline-flex items-center gap-2 overflow-hidden dark:text-title text-black  px-2 py-1 font-medium  tracking-tight "
			onClick={handleThemeChange}
			type="button"
		>
			<span
				className={cn(
					'relative size-6 scale-75 rounded-full bg-gradient-to-tr'
				)}
			>
				<span
					className={cn(
						'absolute top-0 left-0 z-10 h-full w-full transform-gpu rounded-full bg-gradient-to-tr from-indigo-400 to-sky-200 transition-color duration-500',
						theme === 'dark' ? 'scale-100' : 'scale-90'
					)}
				/>
				<span
					className={cn(
						'absolute top-0 left-0 z-10 h-full w-full transform-gpu rounded-full bg-gradient-to-tr from-rose-400 to-amber-300 transition-color duration-500 dark:from-rose-600 dark:to-amber-600',
						theme === 'light' ? 'opacity-100' : 'opacity-0'
					)}
				/>
				<span
					className={cn(
						'absolute top-0 right-0 z-20 size-4 origin-top-right transform-gpu rounded-full bg-white transition-transform duration-500 group-hover:bg-neutral-100 dark:bg-neutral-800 group-hover:dark:bg-neutral-700',
						theme === 'dark' ? 'scale-100' : 'scale-0'
					)}
				/>
			</span>
			<span className="relative h-6 w-12">
				<span
					className={cn(
						'absolute top-0 left-0 transition-all duration-1000',
						theme === 'light'
							? '-translate-y-4 opacity-0 blur-lg'
							: 'translate-y-0 opacity-100 blur-0'
					)}
				>
					Dark
				</span>
				<span
					className={cn(
						'absolute top-0 left-0 transition-all duration-1000',
						theme === 'dark'
							? 'translate-y-4 opacity-0 blur-lg'
							: 'translate-y-0 opacity-100 blur-0'
					)}
				>
					Light
				</span>
			</span>
		</button>
	)
}

// 'use client'

// import { MoonIcon, SunIcon } from 'lucide-react'
// importimport { type } from "os";

// import { Button } from '@/components/ui/button'
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuTrigger
// } from '@/components/ui/dropdown-menu'

// export default function ModeToggle() {
// 	const { setTheme } = useTheme()

// 	return (
// 		<DropdownMenu>
// 			<DropdownMenuTrigger asChild>
// 				<Button variant="ghost" size="icon">
// 					<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
// 					<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
// 					<span className="sr-only">Toggle theme</span>
// 				</Button>
// 			</DropdownMenuTrigger>
// 			<DropdownMenuContent align="end">
// 				<DropdownMenuItem onClick={() => setTheme('light')}>
// 					Light
// 				</DropdownMenuItem>
// 				<DropdownMenuItem onClick={() => setTheme('dark')}>
// 					Dark
// 				</DropdownMenuItem>
// 				<DropdownMenuItem onClick={() => setTheme('system')}>
// 					System
// 				</DropdownMenuItem>
// 			</DropdownMenuContent>
// 		</DropdownMenu>
// 	)
// }
