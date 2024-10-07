import {
	Button,
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
	Switch
} from '@/components/ui'
import { useSiteSettingsStore } from '@/core/stores'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useThemeStore } from 'stores'

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

export default function SiteSettingsMenu({
	isOpen,
	onClose,
	onSettingChange
}: {
	isOpen: boolean
	onClose: () => void
	onSettingChange: (key: string, value: any) => void
}) {
	const {
		disableAllAnimations,
		disableSidebarAnimations,
		toggleAllAnimations,
		toggleSidebarAnimations
	} = useSiteSettingsStore()
	const { currentTheme, setTheme } = useThemeStore()
	const [accentColor, setAccentColor] = useState('#4361ee')
	const [grouping, setGrouping] = useState(true)
	const [ordering, setOrdering] = useState('last-created')
	const [showSubIssues, setShowSubIssues] = useState(true)

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

	const handleSave = () => {
		onSettingChange('accentColor', accentColor)
		onSettingChange('theme', currentTheme)
		onSettingChange('grouping', grouping)
		onSettingChange('ordering', ordering)
		onSettingChange('showSubIssues', showSubIssues)
		onClose()
		toast.success('Settings saved successfully')
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
									className={`w-6 h-6 rounded-full ${
										accentColor === color
											? `ring-2 ring-offset-2 ring-[${color}]`
											: ''
									}`}
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
								className="w-20 h-8 text-xs bg-card AAA border hover:bg-body trans-100 border-gray-700 text-gray-300"
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
						<div className="flex space-x-4">
							{themes.map(theme => (
								<ThemePreview
									key={theme.key}
									name={theme.name}
									accentColor={theme.accentColor}
									bgColor={theme.bgColor}
									isSelected={currentTheme === theme.key}
									onClick={() => {
										setTheme(theme.key)
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
								style={{
									backgroundColor: disableSidebarAnimations
										? accentColor
										: undefined
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
								onSettingChange('ordering', value)
								toast.success(`Ordering set to ${value}`)
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
								onSettingChange('showSubIssues', checked)
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
