import React from 'react'
import { Button, Card, CardContent, CardHeader, CardTitle } from 'ui'
import EnhancedCodeBlock from '../../../../../components/elements/display-code/code-block'

type HooksShowcaseWrapperProps = {
	title?: string
	description?: string
	children?: React.ReactNode
	codeString?: string
	fileName?: string
	language?: string
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
	codeString,
	fileName,
	language,
	explanation,
	demoComponent,
	actionButtons
}: HooksShowcaseWrapperProps) {
	return (
		<div className="max-w-4xl mx-auto p-6 space-y-8">
			<Card className="bg-body border">
				<CardHeader className="pb-0 mb-4">
					<CardTitle className="text-2xl font-bold text-title">
						{title}
					</CardTitle>
					<p className="text-text-subtitle">
						{description}
						{explanation && <>{explanation}</>}
					</p>
				</CardHeader>
				<CardContent>
					{demoComponent && <>{demoComponent}</>}
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
				<CardContent className="space-y-6">
					<EnhancedCodeBlock
						code={codeString as string}
						fileName={fileName as string}
						language={language as string}
						badges={[
							language?.charAt(0).toUpperCase() +
							language?.slice(1)
						]}
					/>
				</CardContent>
			</Card>
		</div>
	)
}
