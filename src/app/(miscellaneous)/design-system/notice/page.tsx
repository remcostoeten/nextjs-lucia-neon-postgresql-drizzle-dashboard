'use client'

import { HoverCard } from '@/components/effects/hover-card'
import NoticeBox from '@/components/elements/notice-box'
import { AlertCircle, AlertOctagon } from 'lucide-react'
import { HooksShowcaseWrapper } from '../../hooks-showcase/_components/hooks-showcase-wrapper'

const NoticeBoxsPage = () => {
	const handleTryAgain = () => {
		console.log('Trying again...')
	}

	const renderSection = (
		title: string,
		component: React.ReactNode,
		code: string
	) => (
		<HooksShowcaseWrapper
			title={title}
			description="Customizable error alert components for various scenarios."
			demoComponent={component}
			codeString={code}
			fileName={`${title.replace(/\s+/g, '-').toLowerCase()}.tsx`}
			language="tsx"
		/>
	)

	return (
		<div className="space-y-8">
			{renderSection(
				'Default Error Alert',
				<NoticeBox
					description="An unexpected error occurred."
					homeLink="/"
					onAction={handleTryAgain}
				/>,
				`<NoticeBox
  description="An unexpected error occurred."
  homeLink="/"
  onAction={handleTryAgain}
/>`
			)}

			{renderSection(
				'Custom Message Error Alert',
				<NoticeBox
					title="Unable to save changes"
					actionText="Retry Save"
					onAction={handleTryAgain}
				/>,
				`<NoticeBox 
  title="Unable to save changes" 
  actionText="Retry Save"
  onAction={handleTryAgain}
/>`
			)}

			{renderSection(
				'Custom Icon Error Alert',
				<NoticeBox
					icon={<AlertCircle />}
					title="Critical system error"
					actionText="Contact Support"
					onAction={() => console.log('Contacting support...')}
				/>,
				`<NoticeBox 
  icon={<AlertCircle />}
  title="Critical system error" 
  actionText="Contact Support"
  onAction={() => console.log('Contacting support...')}
/>`
			)}

			{renderSection(
				'Warning Alert',
				<NoticeBox
					icon={<AlertOctagon />}
					title="Your session is about to expire"
					actionText="Extend Session"
					onAction={() => console.log('Extending session...')}
				/>,
				`<NoticeBox 
  icon={<AlertOctagon />}
  title="Your session is about to expire" 
  actionText="Extend Session"
  onAction={() => console.log('Extending session...')}
/>`
			)}

			<HoverCard>
				<NoticeBox
					icon={<AlertOctagon />}
					title="Your session is about to expire"
					actionText="Extend Session"
					onAction={() => console.log('Extending session...')}
				/>
			</HoverCard>
		</div>
	)
}

export default NoticeBoxsPage
