import React from 'react'

interface FeatureBadge {
	icon: string
	text: string
}

const featureBadges: FeatureBadge[] = [
	{ icon: '✨', text: 'Personable' },
	{ icon: '🫠', text: 'Empathetic' },
	{ icon: '🎯', text: 'Direct' },
	{ icon: '😇', text: 'Friendly' }
]

const FeatureBadges: React.FC = () => {
	return (
		<div className="flex flex-wrap gap-2">
			{featureBadges.map((badge, index) => (
				<div
					key={index}
					className="text-xxs bg-white/4 hover:border-white/16 flex cursor-pointer items-center gap-0.5 rounded-full border border-white/10 px-2 py-0.5 leading-relaxed shadow-[inset_0_-4px_12px_0_rgba(255,255,255,0.1)] backdrop-blur-sm transition-colors duration-200 hover:text-white"
				>
					<div className="flex size-4 items-center justify-center">
						{badge.icon}
					</div>
					<div>{badge.text}</div>
				</div>
			))}
		</div>
	)
}

export default FeatureBadges
