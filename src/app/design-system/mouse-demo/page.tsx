'use client'

import CardGrid from '@/components/_development-utils/mouse-demo-grid'
import DesignSystemWrapper from '../_components/DesignSystemWrapper'

const CardGridShowcase = () => {
	return (
		<DesignSystemWrapper
			title="Keyboard Shortcuts Showcase"
			description="Demonstrates various ways to use the useKeyboardShortcuts hook"
		>
			<CardGrid />
		</DesignSystemWrapper>
	)
}

export default CardGridShowcase
