'use client'

import {
	Button,
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Input,
	Label,
	RadioGroup,
	RadioGroupItem,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Separator,
	Switch
} from '@/components/ui'
import { useSiteSettingsStore } from '@/core/stores'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface SiteSettingsMenuProps {
	isOpen: boolean
	onClose: () => void
	onSettingChange: (setting: string, value: any) => void
}

function ThemePreview({ theme }: { theme: 'system' | 'light' | 'dark' }) {
	const isDark =
		theme === 'dark' ||
		(theme === 'system' &&
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-color-scheme: dark)').matches)

	return (
		<div
			className={`w-24 h-16 rounded-md overflow-hidden ${isDark ? 'bg-red-800' : 'bg-white'} p-1`}
		>
			<div
				className={`w-full h-full flex ${isDark ? 'bg-modal' : 'bg-gray-100'} rounded`}
			>
				<div
					className={`w-1/4 h-full ${isDark ? 'bg-gray-800' : 'bg-white'} p-1`}
				>
					<div
						className={`w-full h-1 ${isDark ? 'bg-border-outline' : 'bg-gray-300'} rounded mb-1 animate-pulse`}
					></div>
					<div
						className={`w-full h-1 ${isDark ? 'bg-border-outline' : 'bg-gray-300'} rounded mb-1 animate-pulse`}
					></div>
					<div
						className={`w-full h-1 ${isDark ? 'bg-border-outline' : 'bg-gray-300'} rounded animate-pulse`}
					></div>
				</div>
				<div className="w-3/4 h-full p-1">
					<div
						className={`w-full h-2 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded mb-1 animate-pulse`}
					></div>
					<div
						className={`w-full h-8 ${isDark ? 'bg-red-400' : 'bg-white'} rounded animate-pulse`}
					></div>
				</div>
			</div>
		</div>
	)
}

export default function Component({
	isOpen,
	onClose,
	onSettingChange
}: SiteSettingsMenuProps) {
	const {
		disableAllAnimations,
		disableSidebarAnimations,
		toggleAllAnimations,
		toggleSidebarAnimations
	} = useSiteSettingsStore()
	const [accentColor, setAccentColor] = useState('#4361ee')
	const [theme, setTheme] = useState('dark')
	const [grouping, setGrouping] = useState(true)
	const [ordering, setOrdering] = useState('last-created')
	const [showSubIssues, setShowSubIssues] = useState(true)

	useEffect(() => {
		// Initialize state from store or localStorage if needed
	}, [])

	const handleSave = () => {
		onSettingChange('accentColor', accentColor)
		onSettingChange('theme', theme)
		onSettingChange('grouping', grouping)
		onSettingChange('ordering', ordering)
		onSettingChange('showSubIssues', showSubIssues)
		onClose()
		toast.success('Settings saved successfully')
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-lg bg-modal text-title">
				<DialogHeader>
					<DialogTitle className="text-xl font-semibold text-white">
						Appearance
					</DialogTitle>
					<p className="text-sm text-gray-400">
						Change how Untitled UI looks and feels in your browser.
					</p>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="accent-color" className="text-gray-200">
							Accent color
						</Label>
						<p className="text-xs text-gray-400">
							Update your dashboard to your brand color.
						</p>
						<div className="flex gap-2 items-center">
							{[
								'#000000',
								'#4361ee',
								'#7209b7',
								'#3a0ca3',
								'#4895ef',
								'#4cc9f0',
								'#560bad',
								'#2b9348'
							].map(color => (
								<button
									key={color}
									className={`w-6 h-6 rounded-full ${accentColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
									style={{ backgroundColor: color }}
									onClick={() => {
										setAccentColor(color)
										toast.success(
											`Accent color set to ${color}`
										)
									}}
								/>
							))}
							<span className="text-sm font-medium ml-2 text-gray-300">
								Custom
							</span>
							<Input
								type="text"
								value="#F5F5F5"
								className="w-20 h-8 text-xs bg-gray-800 border-gray-700 text-gray-300"
								onChange={e => {
									setAccentColor(e.target.value)
									toast.success(
										`Custom accent color set to ${e.target.value}`
									)
								}}
							/>
						</div>
					</div>
					<Separator className="bg-border-outline" />
					<div className="grid gap-2">
						<Label className="text-gray-200">Interface theme</Label>
						<p className="text-xs text-gray-400">
							Select or customize your UI theme.
						</p>
						<RadioGroup
							value={theme}
							onValueChange={value => {
								setTheme(value)
								toast.success(`Theme set to ${value}`)
							}}
							className="grid grid-cols-3 gap-4"
						>
							{['dark', 'light', 'system'].map(themeOption => (
								<div
									key={themeOption}
									className="flex flex-col space-y-2"
								>
									<ThemePreview
										theme={
											themeOption as
												| 'system'
												| 'light'
												| 'dark'
										}
									/>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value={themeOption}
											id={themeOption}
										/>
										<Label
											htmlFor={themeOption}
											className="text-gray-300 capitalize"
										>
											{themeOption}
										</Label>
									</div>
								</div>
							))}
						</RadioGroup>
					</div>
					<Separator className="bg-border-outline" />
					<div className="grid gap-2">
						<h3 className="text-sm font-semibold text-gray-200">
							Animations
						</h3>
						<div className="flex items-center justify-between">
							<div>
								<Label
									htmlFor="disable-all-animations"
									className="text-sm font-medium text-gray-300"
								>
									Disable all animations
								</Label>
								<p className="text-xs text-gray-400">
									Turn off all UI animations
								</p>
							</div>
							<Switch
								id="disable-all-animations"
								checked={disableAllAnimations}
								onCheckedChange={checked => {
									toggleAllAnimations()
									onSettingChange(
										'disableAllAnimations',
										checked
									)
									toast.success(
										`All animations ${checked ? 'disabled' : 'enabled'}`
									)
								}}
							/>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<Label
									htmlFor="disable-sidebar-animations"
									className="text-sm font-medium text-gray-300"
								>
									Disable sidebar animations
								</Label>
								<p className="text-xs text-gray-400">
									Turn off sidebar animations
								</p>
							</div>
							<Switch
								id="disable-sidebar-animations"
								checked={disableSidebarAnimations}
								onCheckedChange={checked => {
									toggleSidebarAnimations()
									onSettingChange(
										'disableSidebarAnimations',
										checked
									)
									toast.success(
										`Sidebar animations ${checked ? 'disabled' : 'enabled'}`
									)
								}}
							/>
						</div>
					</div>
					<Separator className="bg-border-outline" />
					<div className="flex items-center justify-between">
						<div>
							<Label
								htmlFor="grouping"
								className="text-sm font-medium text-gray-300"
							>
								Grouping
							</Label>
							<p className="text-xs text-gray-400">
								Group items by status
							</p>
						</div>
						<Switch
							id="grouping"
							checked={grouping}
							onCheckedChange={checked => {
								setGrouping(checked)
								onSettingChange('grouping', checked)
								toast.success(
									`Grouping ${checked ? 'enabled' : 'disabled'}`
								)
							}}
						/>
					</div>
					<div className="flex items-center justify-between">
						<div>
							<Label
								htmlFor="ordering"
								className="text-sm font-medium text-gray-300"
							>
								Ordering
							</Label>
							<p className="text-xs text-gray-400">
								Order items by creation date
							</p>
						</div>
						<Select
							value={ordering}
							onValueChange={value => {
								setOrdering(value)
								onSettingChange('ordering', value)
								toast.success(`Ordering set to ${value}`)
							}}
						>
							<SelectTrigger className="bg-card w-48 text-subtitle">
								<SelectValue placeholder="Select ordering" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="last-created">
									Last created
								</SelectItem>
								<SelectItem value="first-created">
									First created
								</SelectItem>
								<SelectItem value="alphabetical">
									Alphabetical
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="flex items-center justify-between">
						<div>
							<Label
								htmlFor="show-sub-issues"
								className="text-sm font-medium text-gray-300"
							>
								Show sub-issues
							</Label>
							<p className="text-xs text-gray-400">
								Display all sub-issues in the list
							</p>
						</div>
						<Switch
							id="show-sub-issues"
							checked={showSubIssues}
							onCheckedChange={checked => {
								setShowSubIssues(checked)
								onSettingChange('showSubIssues', checked)
								toast.success(
									`Sub-issues display ${checked ? 'enabled' : 'disabled'}`
								)
							}}
						/>
					</div>
				</div>
				<DialogFooter className="sm:justify-between">
					<Button
						variant="outline"
						onClick={() =>
							toast.success('Settings reset to default')
						}
					>
						Reset to default
					</Button>
					<div className="flex gap-2 w-full sm:w-auto">
						<Button variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button onClick={handleSave}>Save changes</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
