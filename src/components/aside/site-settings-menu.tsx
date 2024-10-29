'use client'

import { updateUserProfile } from '@/app/dashboard/profile/get-user-profile'
import { UserProfile } from '@/types/types.users'
import { logActivity } from 'actions'
import { Check, Github, Linkedin, Twitter, UserCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useSiteSettingsStore, useThemeStore } from 'stores'
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Input,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Separator,
	Switch,
	Textarea
} from 'ui'

interface SettingsProps {
	variant: 'page' | 'modal'
	isOpen?: boolean
	onClose?: () => void
	initialProfile?: UserProfile
	onSettingChange?: (setting: string, value: any) => Promise<void>
}

type ThemePreviewProps = {
	name: string
	accentColor: string
	bgColor: string
	isSelected: boolean
	onClick: () => void
}

const ThemePreview: React.FC<ThemePreviewProps> = ({
	name,
	accentColor,
	bgColor,
	isSelected,
	onClick
}) => (
	<div className="w-full">
		<div
			className={`h-[160px] rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-200 ${
				isSelected
					? `ring-2 ring-[${accentColor}]`
					: 'ring-1 ring-gray-700'
			}`}
			onClick={onClick}
			style={{ backgroundColor: '#252525' }}
		>
			<div className="h-6 bg-[#2c2c2e] flex items-center px-2">
				<div className="flex space-x-1.5">
					<div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
					<div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
					<div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
				</div>
			</div>
			<div
				className="flex h-[calc(100%-24px)]"
				style={{ backgroundColor: bgColor }}
			>
				<div className="w-1/3 bg-opacity-20 bg-black p-3 space-y-2">
					<div
						className="h-3 w-full rounded"
						style={{ backgroundColor: accentColor }}
					></div>
					<div className="h-3 w-full bg-white bg-opacity-20 rounded"></div>
					<div className="h-3 w-full bg-white bg-opacity-10 rounded"></div>
					<div className="h-3 w-full bg-white bg-opacity-5 rounded"></div>
				</div>
				<div className="w-2/3 p-3 space-y-3">
					<div className="flex items-center space-x-2">
						<div
							className="h-5 w-5 rounded-full"
							style={{ backgroundColor: accentColor }}
						></div>
						<div
							className="h-3 w-3/4 rounded"
							style={{ backgroundColor: accentColor }}
						></div>
					</div>
					<div className="h-3 w-full bg-white bg-opacity-20 rounded"></div>
					<div
						className="h-3 w-4/5 rounded"
						style={{ backgroundColor: accentColor }}
					></div>
				</div>
			</div>
		</div>
		<div className="flex items-center border mt-0 border-[#2c2c2e] !border-t-0 justify-between rounded-bl-lg rounded-br-lg px-3 py-2">
			<span className="text-subtitle text-xs">{name}</span>
			<div
				className={`size-4 rounded-full border ${
					isSelected
						? `bg-[${accentColor}] border-[${accentColor}]`
						: 'border-gray-500'
				} flex items-center justify-center`}
			>
				{isSelected && <Check size={12} className="text-black" />}
			</div>
		</div>
	</div>
)

function UnifiedSettingsComponent({
	variant,
	isOpen = true,
	onClose = () => {},
	initialProfile = {}
}: SettingsProps) {
	const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile)
	const [isEditing, setIsEditing] = useState(false)
	const [isLoading, setIsLoading] = useState(!initialProfile)
	const { currentTheme, setTheme } = useThemeStore()
	const [accentColor, setAccentColor] = useState('#4361ee')
	const [grouping, setGrouping] = useState(true)
	const [ordering, setOrdering] = useState('last-created')
	const [showSubIssues, setShowSubIssues] = useState(true)
	const {
		disableAllAnimations,
		disableSidebarAnimations,
		toggleAllAnimations,
		toggleSidebarAnimations
	} = useSiteSettingsStore()

	useEffect(() => {
		if (variant === 'modal' && isOpen && !initialProfile.id) {
			loadProfile()
		}
	}, [variant, isOpen, initialProfile.id])

	const loadProfile = async () => {
		setIsLoading(true)
		try {
			const profile = await fetchUserProfile()
			if (profile) {
				setUserProfile(profile)
			} else {
				toast.error('Failed to load user profile')
			}
		} catch (error) {
			console.error('Error loading profile:', error)
			toast.error('An error occurred while loading the profile')
		} finally {
			setIsLoading(false)
		}
	}

	const themes = [
		{
			name: 'Default',
			key: 'default',
			accentColor: '#4361ee',
			bgColor: '#131111'
		},
		{
			name: 'Avocado Alien',
			key: 'avocadoAlien',
			accentColor: '#a4e666',
			bgColor: '#2a2f23'
		},
		{
			name: 'Rainbow Candy',
			key: 'rainbowCandy',
			accentColor: '#9d5cff',
			bgColor: '#2b2640'
		},
		{
			name: 'Honeydew Punch',
			key: 'honeydewPunch',
			accentColor: '#5cffe7',
			bgColor: '#233536'
		}
	]

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setUserProfile(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const result = await updateUserProfile(userProfile)
			if (result.success) {
				toast.success('Profile updated successfully')
				setIsEditing(false)
			} else {
				toast.error(result.error || 'Failed to update profile')
			}
		} catch (error) {
			console.error('Error updating profile:', error)
			toast.error('An error occurred while updating the profile')
		}
	}

	useEffect(() => {
		setUserProfile(initialProfile)
	}, [initialProfile])

	const toggleEdit = () => setIsEditing(!isEditing)

	const handleSave = async () => {
		try {
			const updatedProfile = {
				...userProfile,
				theme: currentTheme,
				accentColor,
				grouping,
				ordering,
				showSubIssues,
				disableAllAnimations,
				disableSidebarAnimations
			}

			setUserProfile(updatedProfile)

			if (onSettingChange) {
				await Promise.all([
					onSettingChange('theme', currentTheme),
					onSettingChange('accentColor', accentColor),
					onSettingChange('grouping', grouping),
					onSettingChange('ordering', ordering),
					onSettingChange('showSubIssues', showSubIssues),
					onSettingChange(
						'disableAllAnimations',
						disableAllAnimations
					),
					onSettingChange(
						'disableSidebarAnimations',
						disableSidebarAnimations
					)
				])
			}

			await logActivity(
				'Settings Updated',
				'User updated site settings',
				undefined,
				updatedProfile
			)

			toast.success('All settings saved successfully')
			if (variant === 'modal') {
				onClose()
			}
		} catch (error: unknown) {
			console.error('Error saving settings:', error)
			toast.error('Failed to save settings')
			await logActivity(
				'Settings Save Error',
				'Failed to save settings',
				undefined,
				{
					errorMessage:
						error instanceof Error ? error.message : String(error),
					errorStack:
						error instanceof Error
							? error.stack
							: 'No stack trace available',
					settings: {
						theme: currentTheme,
						accentColor,
						grouping,
						ordering,
						showSubIssues,
						disableAllAnimations,
						disableSidebarAnimations
					}
				}
			)
		}
	}

	const handleReset = async () => {
		try {
			// Reset logic here
			await logActivity(
				'Settings Reset',
				'User reset site settings to default'
			)
			toast.success('Settings reset to default')
		} catch (error: unknown) {
			console.error('Error resetting settings:', error)
			toast.error('Failed to reset settings')
			await logActivity(
				'Settings Reset Error',
				'Failed to reset settings',
				undefined,
				{
					errorMessage:
						error instanceof Error ? error.message : String(error),
					errorStack:
						error instanceof Error
							? error.stack
							: 'No stack trace available'
				}
			)
		}
	}

	type Theme = 'default' | 'avocadoAlien' | 'rainbowCandy' | 'honeydewPunch'

	const handleThemeChange = async (themeKey: Theme) => {
		try {
			setTheme(themeKey)
			setAccentColor(
				themes.find(t => t.key === themeKey)?.accentColor || '#4361ee'
			)
			await logActivity(
				'Theme Changed',
				`User changed theme to ${themeKey}`
			)
			toast.success(
				`Theme set to ${themes.find(t => t.key === themeKey)?.name}`
			)
		} catch (error: unknown) {
			console.error('Error changing theme:', error)
			toast.error('Failed to change theme')
			await logActivity(
				'Theme Change Error',
				'Failed to change theme',
				undefined,
				{
					errorMessage:
						error instanceof Error ? error.message : String(error),
					errorStack:
						error instanceof Error
							? error.stack
							: 'No stack trace available',
					attemptedTheme: themeKey
				}
			)
		}
	}

	const handleAccentColorChange = async (color: string) => {
		try {
			setAccentColor(color)
			await logActivity(
				'Accent Color Changed',
				`User changed accent color to ${color}`
			)
			toast.success(`Accent color set to ${color}`)
		} catch (error: unknown) {
			console.error('Error changing accent color:', error)
			toast.error('Failed to change accent color')
			await logActivity(
				'Accent Color Change Error',
				'Failed to change accent color',
				undefined,
				{
					errorMessage:
						error instanceof Error ? error.message : String(error),
					errorStack:
						error instanceof Error
							? error.stack
							: 'No stack trace available',
					attemptedColor: color
				}
			)
		}
	}

	const handleAllAnimationsToggle = async () => {
		try {
			toggleAllAnimations()
			await logActivity(
				'All Animations Toggled',
				`User ${!disableAllAnimations ? 'disabled' : 'enabled'} all animations`
			)
			toast.success(
				`All animations ${!disableAllAnimations ? 'disabled' : 'enabled'}`
			)
		} catch (error: unknown) {
			console.error('Error toggling all animations:', error)
			toast.error('Failed to toggle all animations')
			await logActivity(
				'All Animations Toggle Error',
				'Failed to toggle all animations',
				undefined,
				{
					errorMessage:
						error instanceof Error ? error.message : String(error),
					errorStack:
						error instanceof Error
							? error.stack
							: 'No stack trace available',
					currentState: disableAllAnimations
				}
			)
		}
	}

	const handleSidebarAnimationsToggle = async () => {
		try {
			toggleSidebarAnimations()
			await logActivity(
				'Sidebar Animations Toggled',
				`User ${!disableSidebarAnimations ? 'disabled' : 'enabled'} sidebar animations`
			)
			toast.success(
				`Sidebar animations ${!disableSidebarAnimations ? 'disabled' : 'enabled'}`
			)
		} catch (error: unknown) {
			console.error('Error toggling sidebar animations:', error)
			toast.error('Failed to toggle sidebar animations')
			await logActivity(
				'Sidebar Animations Toggle Error',
				'Failed to toggle sidebar animations',
				undefined,
				{
					errorMessage:
						error instanceof Error ? error.message : String(error),
					errorStack:
						error instanceof Error
							? error.stack
							: 'No stack trace available',
					currentState: disableSidebarAnimations
				}
			)
		}
	}

	const handleGroupingChange = async (checked: boolean) => {
		try {
			setGrouping(checked)
			await logActivity(
				'Grouping Setting Changed',
				`User ${checked ? 'enabled' : 'disabled'} grouping`
			)
			toast.success(`Grouping ${checked ? 'enabled' : 'disabled'}`)
		} catch (error: unknown) {
			console.error('Error changing grouping setting:', error)
			toast.error('Failed to change grouping setting')
			await logActivity(
				'Grouping Setting Change Error',
				'Failed to change grouping setting',
				undefined,
				{
					errorMessage:
						error instanceof Error ? error.message : String(error),
					errorStack:
						error instanceof Error
							? error.stack
							: 'No stack trace available',
					attemptedState: checked
				}
			)
		}
	}

	const handleOrderingChange = async (value: string) => {
		setOrdering(value)
		await logActivity(
			'Ordering Setting Changed',
			`User changed ordering to ${value}`
		)
		toast.success(`Ordering set to ${value}`)
	}

	const handleShowSubIssuesChange = async (checked: boolean) => {
		setShowSubIssues(checked)
		await logActivity(
			'Sub-issues Display Changed',
			`User ${checked ? 'enabled' : 'disabled'} sub-issues display`
		)
		toast.success(`Sub-issues display ${checked ? 'enabled' : 'disabled'}`)
	}

	const renderProfileFields = () => (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{[
					{ key: 'firstName', label: 'First Name' },
					{ key: 'lastName', label: 'Last Name' },
					{ key: 'username', label: 'Username' },
					{ key: 'email', label: 'Email' },
					{ key: 'dateOfBirth', label: 'Date of Birth' },
					{ key: 'occupation', label: 'Occupation' }
				].map(({ key, label }) => (
					<div key={key} className="space-y-2">
						<Label htmlFor={key} className="text-gray-200">
							{label}
						</Label>
						{isEditing ? (
							<Input
								id={key}
								name={key}
								value={
									userProfile[key as keyof UserProfile] || ''
								}
								onChange={handleInputChange}
								className="bg-card border border-gray-700 text-gray-300"
							/>
						) : (
							<div className="p-2 bg-secondary rounded-md text-gray-300">
								{userProfile[key as keyof UserProfile] ||
									'Not set'}
							</div>
						)}
					</div>
				))}
			</div>
			<Separator className="bg-border-outline" />
			<div className="space-y-2">
				<Label htmlFor="bio" className="text-gray-200">
					Bio
				</Label>
				{isEditing ? (
					<Textarea
						id="bio"
						name="bio"
						value={userProfile.bio || ''}
						onChange={handleInputChange}
						rows={4}
						className="bg-card border border-gray-700 text-gray-300"
					/>
				) : (
					<div className="p-2 bg-secondary rounded-md min-h-[100px] text-gray-300">
						{userProfile.bio || 'No bio provided'}
					</div>
				)}
			</div>
			<Separator className="bg-border-outline" />
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{['github', 'linkedin', 'twitter'].map(social => (
					<div key={social} className="space-y-2">
						<Label
							htmlFor={social}
							className="flex items-center space-x-2 text-gray-200"
						>
							{social === 'github' && (
								<Github className="w-4 h-4" />
							)}
							{social === 'linkedin' && (
								<Linkedin className="w-4 h-4" />
							)}
							{social === 'twitter' && (
								<Twitter className="w-4 h-4" />
							)}
							<span>
								{social.charAt(0).toUpperCase() +
									social.slice(1)}
							</span>
						</Label>
						{isEditing ? (
							<Input
								id={social}
								name={social}
								value={
									userProfile[social as keyof UserProfile] ||
									''
								}
								onChange={handleInputChange}
								className="bg-card border border-gray-700 text-gray-300"
							/>
						) : (
							<div className="p-2 bg-secondary rounded-md text-gray-300">
								{userProfile[social as keyof UserProfile] ||
									'Not set'}
							</div>
						)}
					</div>
				))}
			</div>
			{isEditing && (
				<Button
					type="submit"
					className="w-full"
					style={{ backgroundColor: accentColor }}
				>
					Save Profile Changes
				</Button>
			)}
		</>
	)

	const renderAppearanceSettings = () => (
		<>
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
							className={`w-6 h-6 rounded-full ${
								accentColor === color
									? `ring-2 ring-offset-2 ring-[${color}]`
									: ''
							}`}
							style={{ backgroundColor: color }}
							onClick={() => handleAccentColorChange(color)}
						/>
					))}
					<span className="text-sm font-medium ml-2 text-gray-300">
						Custom
					</span>
					<Input
						type="text"
						value={accentColor}
						className="w-20 h-8 text-xs bg-card border hover:bg-body trans-100 border-gray-700 text-gray-300"
						onChange={e => handleAccentColorChange(e.target.value)}
					/>
				</div>
			</div>

			<Separator className="bg-border-outline" />

			<div className="grid gap-2">
				<Label className="text-gray-200">Interface theme</Label>
				<p className="text-xs text-gray-400">
					Select or customize your UI theme.
				</p>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{themes.map(theme => (
						<ThemePreview
							key={theme.key}
							name={theme.name}
							accentColor={theme.accentColor}
							bgColor={theme.bgColor}
							isSelected={currentTheme === theme.key}
							onClick={() =>
								handleThemeChange(theme.key as Theme)
							}
						/>
					))}
				</div>
			</div>
		</>
	)

	const renderAnimationSettings = () => (
		<div className="grid gap-2">
			<h3 className="text-sm font-semibold text-gray-200">Animations</h3>
			<div className="space-y-4">
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
						onCheckedChange={handleAllAnimationsToggle}
						style={{
							backgroundColor: disableAllAnimations
								? accentColor
								: undefined
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
						onCheckedChange={handleSidebarAnimationsToggle}
						style={{
							backgroundColor: disableSidebarAnimations
								? accentColor
								: undefined
						}}
					/>
				</div>
			</div>
		</div>
	)

	const renderUISettings = () => (
		<div className="space-y-4">
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
					onCheckedChange={handleGroupingChange}
					style={{
						backgroundColor: grouping ? accentColor : undefined
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
				<Select value={ordering} onValueChange={handleOrderingChange}>
					<SelectTrigger
						className="bg-card w-48 text-subtitle"
						style={{ borderColor: accentColor }}
					>
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
					onCheckedChange={handleShowSubIssuesChange}
					style={{
						backgroundColor: showSubIssues ? accentColor : undefined
					}}
				/>
			</div>
		</div>
	)

	const content = (
		<div className="space-y-6">
			<form onSubmit={handleSubmit} className="space-y-6">
				{renderProfileFields()}
			</form>
			<Separator className="bg-border-outline" />
			{renderAppearanceSettings()}
			<Separator className="bg-border-outline" />
			{renderAnimationSettings()}
			<Separator className="bg-border-outline" />
			{renderUISettings()}
			<Separator className="bg-border-outline" />
			<div className="flex justify-between items-center">
				<Button
					variant="outline"
					onClick={handleReset}
					className="text-gray-300 border-gray-700"
				>
					Reset to default
				</Button>
				<Button
					onClick={handleSave}
					style={{ backgroundColor: accentColor }}
				>
					Save all changes
				</Button>
			</div>
		</div>
	)

	if (variant === 'page') {
		return (
			<Card className="w-full bg-card text-title">
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<UserCircle className="w-12 h-12 text-primary" />
							<div>
								<CardTitle className="text-2xl font-bold text-white">
									Settings
								</CardTitle>
								<p className="text-sm text-gray-400">
									Manage your account and application settings
								</p>
							</div>
						</div>
						<Button onClick={toggleEdit}>
							{isEditing ? 'Cancel' : 'Edit Profile'}
						</Button>
					</div>
				</CardHeader>
				<CardContent>{content}</CardContent>
			</Card>
		)
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-4xl bg-modal text-title">
				<DialogHeader>
					<DialogTitle className="text-xl font-semibold text-white">
						Appearance
					</DialogTitle>
					<p className="text-sm text-gray-400">
						Change how Untitled UI looks and feels in your browser.
					</p>
				</DialogHeader>
				<div className="flex justify-end mb-4">
					<Button onClick={toggleEdit}>
						{isEditing ? 'Cancel' : 'Edit Profile'}
					</Button>
				</div>
				{content}
				<DialogFooter className="sm:justify-between">
					<Button variant="outline" onClick={handleReset}>
						Reset to default
					</Button>
					<div className="flex gap-2 w-full sm:w-auto">
						<Button variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button
							onClick={handleSave}
							style={{ backgroundColor: accentColor }}
						>
							Save changes
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default UnifiedSettingsComponent
