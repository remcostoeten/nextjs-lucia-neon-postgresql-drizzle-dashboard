import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import React from 'react'
import { EnhancedCodeBlock } from './advanced-code-block'

type HooksShowcaseWrapperProps = {
	title: string
	description: string
	children: React.ReactNode
	codeString?: string
	fileName: string
	language: string
	explanation?: string
	demoComponent?: React.ReactNode
	actionButtons?: Array<{
		label: string
		onClick: () => void
	}>
}

export function HooksShowcaseWrapper({
	title,
	description,
	children,
	codeString,
	fileName,
	language,
	explanation,
	demoComponent,
	actionButtons
}: HooksShowcaseWrapperProps) {
	return (
		<div className="max-w-4xl mx-auto p-6 space-y-8">
			<Card className="bg-card text-title border-zinc-800">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						{title}
					</CardTitle>
					<CardDescription className="text-text-subtitle">
						{description}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<EnhancedCodeBlock
						code={codeString}
						fileName={fileName}
						language={language}
						badges={[
							language.charAt(0).toUpperCase() + language.slice(1)
						]}
					/>
					<div className="text-sm text-title">{explanation}</div>
					{demoComponent && (
						<>{demoComponent}</>
					)}
					{actionButtons && actionButtons.length > 0 && (
						<div className="flex space-x-2 mt-4">
							{actionButtons.map((button, index) => (
								<Button
									key={index}
									onClick={button.onClick}
									variant="outline"
								>
									{button.label}
								</Button>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
