'use client'

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
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
} from '@/components/ui'
import { UserProfile } from '@/types/types.users'
import { Check, Github, Linkedin, Twitter, UserCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useSiteSettingsStore } from 'stores'
import { updateUserProfile } from './get-user-profile'

interface SettingsPageProps {
	initialProfile: UserProfile
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
}) => {
	return (
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
}

export default function SettingsPage({ initialProfile }: SettingsPageProps) {
	const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile)
	const [isEditing, setIsEditing] = useState(false)
	const [accentColor, setAccentColor] = useState('#4361ee')
	const [currentTheme, setCurrentTheme] = useState('default')
	const [grouping, setGrouping] = useState(true)
	const [ordering, setOrdering] = useState('last-created')
	const [showSubIssues, setShowSubIssues] = useState(true)

	const {
		disableAllAnimations,
		disableSidebarAnimations,
		toggleAllAnimations,
		toggleSidebarAnimations
	} = useSiteSettingsStore()

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

	useEffect(() => {
		const theme = themes.find(t => t.key === currentTheme) || themes[0]
		setAccentColor(theme.accentColor)
	}, [currentTheme])

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

	const toggleEdit = () => setIsEditing(!isEditing)

	const handleSave = () => {
		// Here you would typically save all settings
		toast.success('All settings saved successfully')
	}

	return (
		<div className="container mx-auto p-4 space-y-8">
			<Card className="w-full max-w-4xl mx-auto bg-modal text-title">
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
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{[
								'firstName',
								'lastName',
								'username',
								'email',
								'dateOfBirth',
								'occupation'
							].map(field => (
								<div key={field} className="space-y-2">
									<Label
										htmlFor={field}
										className="text-gray-200"
									>
										{field.charAt(0).toUpperCase() +
											field.slice(1)}
									</Label>
									{isEditing ? (
										<Input
											id={field}
											name={field}
											value={
												userProfile[
													field as keyof UserProfile
												] || ''
											}
											onChange={handleInputChange}
											className="bg-card border border-gray-700 text-gray-300"
										/>
									) : (
										<div className="p-2 bg-secondary rounded-md text-gray-300">
											{userProfile[
												field as keyof UserProfile
											] || 'Not set'}
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
												userProfile[
													social as keyof UserProfile
												] || ''
											}
											onChange={handleInputChange}
											className="bg-card border border-gray-700 text-gray-300"
										/>
									) : (
										<div className="p-2 bg-secondary rounded-md text-gray-300">
											{userProfile[
												social as keyof UserProfile
											] || 'Not set'}
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
					</form>

					<Separator className="my-6 bg-border-outline" />

					<div className="space-y-6">
						<div className="grid gap-2">
							<Label
								htmlFor="accent-color"
								className="text-gray-200"
							>
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
										className={`w-6 h-6 rounded-full ${accentColor === color ? `ring-2 ring-offset-2 ring-[${color}]` : ''}`}
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
									value={accentColor}
									className="w-20 h-8 text-xs bg-card border hover:bg-body trans-100 border-gray-700 text-gray-300"
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
							<Label className="text-gray-200">
								Interface theme
							</Label>
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
										onClick={() => {
											setCurrentTheme(theme.key)
											setAccentColor(theme.accentColor)
											toast.success(
												`Theme set to ${theme.name}`
											)
										}}
									/>
								))}
							</div>
						</div>

						<Separator className="bg-border-outline" />

						<div className="grid gap-2">
							<h3 className="text-sm font-semibold text-gray-200">
								Animations
							</h3>
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
										onCheckedChange={() => {
											toggleAllAnimations()
											toast.success(
												`All animations ${!disableAllAnimations ? 'disabled' : 'enabled'}`
											)
										}}
										style={{
											backgroundColor:
												disableAllAnimations
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
										onCheckedChange={() => {
											toggleSidebarAnimations()
											toast.success(
												`Sidebar animations ${!disableSidebarAnimations ? 'disabled' : 'enabled'}`
											)
										}}
										style={{
											backgroundColor:
												disableSidebarAnimations
													? accentColor
													: undefined
										}}
									/>
								</div>
							</div>
						</div>

						<Separator className="bg-border-outline" />

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
									onCheckedChange={checked => {
										setGrouping(checked)
										toast.success(
											`Grouping ${checked ? 'enabled' : 'disabled'}`
										)
									}}
									style={{
										backgroundColor: grouping
											? accentColor
											: undefined
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
										toast.success(
											`Ordering set to ${value}`
										)
									}}
								>
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
									onCheckedChange={checked => {
										setShowSubIssues(checked)
										toast.success(
											`Sub-issues display ${checked ? 'enabled' : 'disabled'}`
										)
									}}
									style={{
										backgroundColor: showSubIssues
											? accentColor
											: undefined
									}}
								/>
							</div>
						</div>
					</div>

					<Separator className="my-6 bg-border-outline" />

					<div className="flex justify-between items-center">
						<Button
							variant="outline"
							onClick={() => {
								// Reset logic here
								toast.success('Settings reset to default')
							}}
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
				</CardContent>
			</Card>
		</div>
	)
}
