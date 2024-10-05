'use client'

import { HoverCard } from '@/components/effects/hover-card'
import NoticeBox from '@/components/elements/notice-box'
import { AlertCircle, AlertOctagon } from 'lucide-react'
import DesignSystemWrapper from '../../design-system/_components/DesignSystemWrapper'
import { EnhancedCodeBlock } from '../../hooks-showcase/_components/advanced-code-block'

const NoticeBoxsPage = () => {
	const handleTryAgain = () => {
		console.log('Trying again...')
	}

	const notices = [
		{
			title: 'Default Error Alert',
			component: (
				<NoticeBox
					description="An unexpected error occurred."
					homeLink="/"
					onAction={handleTryAgain}
				/>
			),
			code: `<NoticeBox onAction={handleTryAgain} />`
		},
		{
			title: 'Custom Message Error Alert',
			component: (
				<NoticeBox
					title="Unable to save changes"
					actionText="Retry Save"
					onAction={handleTryAgain}
				/>
			),
			code: `<NoticeBox 
  title="Unable to save changes" 
  actionText="Retry Save"
  onAction={handleTryAgain}
/>`
		},
		{
			title: 'Custom Icon Error Alert',
			component: (
				<NoticeBox
					icon={<AlertCircle />}
					title="Critical system error"
					actionText="Contact Support"
					onAction={() => console.log('Contacting support...')}
				/>
			),
			code: `<NoticeBox 
  icon={<AlertCircle />}
  title="Critical system error" 
  actionText="Contact Support"
  onAction={() => console.log('Contacting support...')}
/>`
		},
		{
			title: 'Warning Alert',
			component: (
				<NoticeBox
					icon={<AlertOctagon />}
					title="Your session is about to expire"
					actionText="Extend Session"
					onAction={() => console.log('Extending session...')}
				/>
			),
			code: `<NoticeBox 
  icon={<AlertOctagon />}
  title="Your session is about to expire" 
  actionText="Extend Session"
  onAction={() => console.log('Extending session...')}
/>`
		}
	]

	return (
		<DesignSystemWrapper
			title="Error Alerts"
			description="Customizable error alert components for various scenarios."
			actionButtons={[{ label: 'Try Again', onClick: handleTryAgain }]}
		>
			{notices.map(({ title, component, code }) => (
				<div className="p-4 mt-4" key={title}>
					<h3 className="text-lg font-semibold mb-2">{title}</h3>
					{component}
					<EnhancedCodeBlock
						language="tsx"
						fileName={`${title} Usage`}
						code={code}
					/>
				</div>
			))}
			<HoverCard>
				<NoticeBox
					icon={<AlertOctagon />}
					title="Your session is about to expire"
					actionText="Extend Session"
					onAction={() => console.log('Extending session...')}
				/>
			</HoverCard>
		</DesignSystemWrapper>
	)
}

export default NoticeBoxsPage
