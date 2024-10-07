'use client'

import { Kbd, KbdKeys } from '@/components/atoms/kbd'
import { EnhancedCodeBlock } from '@/components/elements/display-code/advanced-code-block'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import DesignSystemWrapper from '../_components/DesignSystemWrapper'

const KbdShowcase = () => {
	const [activeVariant, setActiveVariant] = useState<
		'default' | 'frosted' | 'outline' | 'pulse'
	>('default')
	const [activeSize, setActiveSize] = useState<
		'xs' | 'sm' | 'md' | 'lg' | 'xl'
	>('md')
	const [showSplit, setShowSplit] = useState(false)

	const variants = ['default', 'frosted', 'outline', 'pulse']
	const sizes = ['xs', 'sm', 'md', 'lg', 'xl']

	const kbdComponentCode = `
import React from 'react'
import { cn } from "@/lib/utils"

type KbdSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type KbdVariant = 'default' | 'frosted' | 'outline' | 'pulse'
type KbdSplit = 'slash' | 'plus'

interface KbdProps {
  k: string | string[]
  size?: KbdSize
  variant?: KbdVariant
  split?: KbdSplit
  className?: string
}

const KbdKeys = {
  Command: '⌘',
  Shift: '⇧',
  Backspace: '⌫',
  Enter: '↵',
  Eject: '⏏',
  Control: 'Ctrl',
  Windows: '⊞',
  Apple: '',
  Option: '⌥',
  Left: '←',
  Up: '↑',
  Right: '→',
  Down: '↓',
}

const sizeClasses: Record<KbdSize, string> = {
  xs: 'text-xs px-1.5 py-0.5',
  sm: 'text-sm px-2 py-1',
  md: 'text-base px-2.5 py-1.5',
  lg: 'text-lg px-3 py-2',
  xl: 'text-xl px-3.5 py-2.5',
}

const variantClasses: Record<KbdVariant, string> = {
  default: 'bg-gray-800 text-gray-100 shadow-md',
  frosted: 'bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white border border-white border-opacity-20',
  outline: 'bg-transparent text-gray-100 border',
  pulse: 'bg-black text-pulse-green border border-pulse-green shadow-pulse',
}

const Kbd: React.FC<KbdProps> = ({ k, size = 'md', variant = 'default', split, className }) => {
  const keys = Array.isArray(k) ? k : [k]
  const fullKeys = keys.map(key => KbdKeys[key as keyof typeof KbdKeys] || key)

  const renderKey = (key: string, index: number) => (
    <kbd
      key={index}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-sans font-semibold transition-all duration-200",
        sizeClasses[size],
        variantClasses[variant],
        variant === 'pulse' && 'animate-pulse',
        "hover:scale-105",
        className
      )}
      title={key}
    >
      {key}
    </kbd>
  )

  return (
    <span className="inline-flex items-center space-x-1">
      {fullKeys.map((key, index) => (
        <React.Fragment key={index}>
          {index > 0 && split && (
            <span className={cn("text-gray-400", variant === 'pulse' && "text-pulse-green")}>
              {split === 'slash' ? '/' : '+'}
            </span>
          )}
          {renderKey(key, index)}
        </React.Fragment>
      ))}
    </span>
  )
}

export { Kbd, KbdKeys }
`

	const usageExampleCode = `
import { Kbd, KbdKeys } from './kbd'

export default function ShortcutGuide() {
  return (
    <div className="space-y-4">
      <div>
        <Kbd k={['ctrl', 'L']} variant="frosted" />
      </div>
      <div>
        <Kbd variant='outline' split='slash' k={['cmd', 'k']} />
      </div>
      <div>
        <Kbd k={['shift', '/']} split='plus' variant="pulse" />
      </div>
      <div>
        <Kbd k="Enter" size="lg" variant="default" />
      </div>
      <div>
        <Kbd k={[KbdKeys.Command, KbdKeys.Shift, 'P']} split="plus" variant="frosted" />
      </div>
    </div>
  )
}
`

	return (
		<DesignSystemWrapper
			title="Kbd Component Showcase"
			description="An interactive demonstration of the modern Kbd component with various styles and features"
		>
			<div className="space-y-8 p-6 bg-section-lighter rounded-xl shadow-lg">
				<Tabs defaultValue="showcase" className="w-full">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="showcase">
							Interactive Showcase
						</TabsTrigger>
						<TabsTrigger value="component">
							Component Code
						</TabsTrigger>
						<TabsTrigger value="usage">Usage Examples</TabsTrigger>
					</TabsList>
					<TabsContent value="showcase" className="mt-6">
						<div className="space-y-6">
							<div className="flex justify-between items-center">
								<h2 className="text-2xl font-bold">
									Kbd Component Showcase
								</h2>
								<Dialog>
									<DialogTrigger asChild>
										<Button variant="outline">
											Open Cheat Sheet
										</Button>
									</DialogTrigger>
									<DialogContent className="sm:max-w-[425px]">
										<DialogHeader>
											<DialogTitle className="text-lg font-semibold">
												Keyboard Shortcuts Cheat Sheet
											</DialogTitle>
										</DialogHeader>
										<div className="grid gap-4 py-4">
											{[
												{
													keys: ['ctrl', 'C'],
													action: 'Copy'
												},
												{
													keys: ['ctrl', 'V'],
													action: 'Paste'
												},
												{
													keys: ['ctrl', 'Z'],
													action: 'Undo'
												},
												{
													keys: ['ctrl', 'Y'],
													action: 'Redo'
												}
											].map(({ keys, action }, index) => (
												<div
													key={index}
													className="flex items-center justify-between"
												>
													<Kbd
														k={keys}
														variant="frosted"
														size="sm"
													/>
													<span className="text-sm text-gray-400">
														{action}
													</span>
												</div>
											))}
										</div>
									</DialogContent>
								</Dialog>
							</div>
							<div className="flex flex-wrap gap-4">
								<div className="space-y-2 flex-1">
									<Label htmlFor="variant-select">
										Variant
									</Label>
									<select
										id="variant-select"
										value={activeVariant}
										onChange={e =>
											setActiveVariant(
												e.target.value as
													| 'default'
													| 'frosted'
													| 'outline'
													| 'pulse'
											)
										}
										className="w-full p-2 rounded bg-card text-foreground border"
									>
										{variants.map(variant => (
											<option
												key={variant}
												value={variant}
											>
												{variant}
											</option>
										))}
									</select>
								</div>
								<div className="space-y-2 flex-1">
									<Label htmlFor="size-select">Size</Label>
									<select
										id="size-select"
										value={activeSize}
										onChange={e =>
											setActiveSize(
												e.target.value as
													| 'xs'
													| 'sm'
													| 'md'
													| 'lg'
													| 'xl'
											)
										}
										className="w-full p-2 rounded bg-card text-foreground border"
									>
										{sizes.map(size => (
											<option key={size} value={size}>
												{size}
											</option>
										))}
									</select>
								</div>
								<div className="space-y-2 flex-1">
									<Label htmlFor="split-toggle">
										Show Split
									</Label>
									<Switch
										id="split-toggle"
										checked={showSplit}
										onCheckedChange={setShowSplit}
									/>
								</div>
							</div>
							<div className="p-6 bg-card rounded-lg shadow-inner">
								<AnimatePresence mode="wait">
									<motion.div
										key={`${activeVariant}-${activeSize}-${showSplit}`}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{ duration: 0.2 }}
										className="flex justify-center"
									>
										<Kbd
											k={['ctrl', 'alt', 'del']}
											variant={activeVariant}
											size={activeSize}
											split={
												showSplit ? 'plus' : undefined
											}
										/>
									</motion.div>
								</AnimatePresence>
							</div>
						</div>
					</TabsContent>
					<TabsContent value="component" className="mt-6">
						<EnhancedCodeBlock
							code={kbdComponentCode}
							fileName="kbd.tsx"
							language="typescript"
							badges={['React', 'TypeScript']}
						/>
					</TabsContent>
					<TabsContent value="usage" className="mt-6">
						<EnhancedCodeBlock
							code={usageExampleCode}
							fileName="usage-example.tsx"
							language="typescript"
							badges={['React', 'TypeScript']}
						/>
					</TabsContent>
				</Tabs>

				<div className="mt-8">
					<h2 className="text-2xl font-bold mb-4">
						All Keys Showcase
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{Object.entries(KbdKeys).map(([key, value]) => (
							<div
								key={key}
								className="flex items-center space-x-2"
							>
								<Kbd
									k={key}
									variant={activeVariant}
									size={activeSize}
								/>
								<span className="text-sm text-gray-400">
									{value}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</DesignSystemWrapper>
	)
}

export default KbdShowcase
