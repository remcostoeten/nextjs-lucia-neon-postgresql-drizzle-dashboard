'use client'

import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

type ThemeButtonProps = {
	theme: string
	label: string
	onClick: (theme: string) => void
	children: React.ReactNode
}

const ThemeButton = ({ theme, label, onClick, children }: ThemeButtonProps) => (
	<Button
		variant="ghost"
		className="w-fit h-fit border  border-outline text-placeholder trans-all"
		onClick={() => onClick(theme)}
	>
		<div className="flex flex-col items-center">
			{children}
			<span className="block w-full p-2 text-center font-normal">
				{label}
			</span>
		</div>
	</Button>
)

export default function SettingsPage() {
	const { setTheme } = useTheme()

	return (
		<>
			<h1 className="text-4xl font-bold mb-6 text-title">Settings</h1>
			<div className="space-y-8">
				<section>
					<h2 className="text-2xl font-semibold mb-4 text-subtitle">
						Appearance
					</h2>
					<p className="text-sm text-muted-foreground mb-4">
						Customize the appearance of the app. Automatically
						switch between day and night themes.
					</p>
					<div className="flex flex-wrap gap-4">
						<ThemeButton
							theme="light"
							label="Light"
							onClick={setTheme}
						>
							<div className="items-center rounded-md border-2 border-gray-600 hover:border-outline p-1">
								<div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
									<div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
										<div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
										<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
									</div>
									<div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
										<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
										<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
									</div>
									<div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
										<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
										<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
									</div>
								</div>
							</div>
						</ThemeButton>

						<ThemeButton
							theme="dark"
							label="Dark"
							onClick={setTheme}
						>
							<div className="items-center rounded-md border-2 border-gray-600 hover:border-outlines bg-popover p-1">
								<div className="space-y-2 rounded-sm bg-neutral-950 p-2">
									<div className="space-y-2 rounded-md bg-neutral-800 p-2 shadow-sm">
										<div className="h-2 w-[80px] rounded-lg bg-neutral-400" />
										<div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
									</div>
									<div className="flex items-center space-x-2 rounded-md bg-neutral-800 p-2 shadow-sm">
										<div className="h-4 w-4 rounded-full bg-neutral-400" />
										<div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
									</div>
									<div className="flex items-center space-x-2 rounded-md bg-neutral-800 p-2 shadow-sm">
										<div className="h-4 w-4 rounded-full bg-neutral-400" />
										<div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
									</div>
								</div>
							</div>
						</ThemeButton>

						<ThemeButton
							theme="system"
							label="System"
							onClick={setTheme}
						>
							<div className="items-center rounded-md border-2 border-gray-600 hover:border-gray-400 bg-popover p-1">
								<div className="space-y-2 rounded-sm bg-neutral-300 p-2">
									<div className="space-y-2 rounded-md bg-neutral-600 p-2 shadow-sm">
										<div className="h-2 w-[80px] rounded-lg bg-neutral-400" />
										<div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
									</div>
									<div className="flex items-center space-x-2 rounded-md bg-neutral-600 p-2 shadow-sm">
										<div className="h-4 w-4 rounded-full bg-neutral-400" />
										<div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
									</div>
									<div className="flex items-center space-x-2 rounded-md bg-neutral-600 p-2 shadow-sm">
										<div className="h-4 w-4 rounded-full bg-neutral-400" />
										<div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
									</div>
								</div>
							</div>
						</ThemeButton>
					</div>
				</section>
			</div>
		</>
	)
}
