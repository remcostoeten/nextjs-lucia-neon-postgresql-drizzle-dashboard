'use client'

import { HoverCard } from '@/components/effects/hover-card'
import NoticeBox from '@/components/elements/notice-box'
import { AlertCircle, AlertOctagon } from 'lucide-react'
import { EnhancedCodeBlock } from '../../../../components/elements/display-code/advanced-code-block'
import DesignSystemWrapper from '../_components/DesignSystemWrapper'

const Section = ({ title, children }) => (
	<div className="space-y-4">
		<h3 className="text-lg font-semibold">{title}</h3>
		{children}
	</div>
)

const NoticeBoxsPage = () => {
	const handleTryAgain = () => {
		console.log('Trying again...')
	}

	return (
		<DesignSystemWrapper
			title="Error Alerts"
			description="Customizable error alert components for various scenarios."
		>
			<div className="space-y-8">
				<Section title="Default Error Alert">
					<NoticeBox
						description="An unexpected error occurred."
						homeLink="/"
						onAction={handleTryAgain}
					/>
					<EnhancedCodeBlock
						language="tsx"
						fileName="Default Error Alert Usage"
						code={`<NoticeBox onAction={handleTryAgain} />`}
					/>
				</Section>

				<Section title="Custom Message Error Alert">
					<NoticeBox
						title="Unable to save changes"
						actionText="Retry Save"
						onAction={handleTryAgain}
					/>
					<EnhancedCodeBlock
						language="tsx"
						fileName="Custom Message Error Alert Usage"
						code={`<NoticeBox 
  title="Unable to save changes" 
  actionText="Retry Save"
  onAction={handleTryAgain}
/>`}
					/>
				</Section>

				<Section title="Custom Icon Error Alert">
					<NoticeBox
						icon={<AlertCircle />}
						title="Critical system error"
						actionText="Contact Support"
						onAction={() => console.log('Contacting support...')}
					/>
					<EnhancedCodeBlock
						language="tsx"
						fileName="Custom Icon Error Alert Usage"
						code={`<NoticeBox 
  icon={<AlertCircle />}
  title="Critical system error" 
  actionText="Contact Support"
  onAction={() => console.log('Contacting support...')}
/>`}
					/>
				</Section>

				<Section title="Warning Alert">
					<NoticeBox
						icon={<AlertOctagon />}
						title="Your session is about to expire"
						actionText="Extend Session"
						onAction={() => console.log('Extending session...')}
					/>
					<EnhancedCodeBlock
						language="tsx"
						fileName="Warning Alert Usage"
						code={`<NoticeBox 
  icon={<AlertOctagon />}
  title="Your session is about to expire" 
  actionText="Extend Session"
  onAction={() => console.log('Extending session...')}
/>`}
					/>
				</Section>
			</div>
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
