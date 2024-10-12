'use client'

import { ZenWealth } from './ZenWealth'

function getZenWealthData() {
	return {
		title: 'Zen is wealth.',
		subtitle: 'A central hub for digital life.',
		description: [
			'Built by a dev, for myself. Without the known annoyance',
			'of having to wait for Cloudflare security checks,',
			'ads, newsletter popups or reCAPTCHAs.'
		]
	}
}

export function ZenWealthContainer() {
	const zenWealthData = getZenWealthData()

	return (
		<ZenWealth
			title={zenWealthData.title}
			subtitle={zenWealthData.subtitle}
			description={zenWealthData.description}
		/>
	)
}
