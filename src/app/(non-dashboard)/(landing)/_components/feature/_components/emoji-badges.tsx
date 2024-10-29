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
					className="flex items-center gap-0.5 px-2 py-0.5 text-xxs leading-relaxed border border-white/10 rounded-full bg-white/4 shadow-[inset_0_-4px_12px_0_rgba(255,255,255,0.1)] backdrop-blur-sm cursor-pointer transition-colors duration-200 hover:border-white/16 hover:text-white"
				>
					<div className="flex items-center justify-center w-4 h-4">
						{badge.icon}
					</div>
					<div>{badge.text}</div>
				</div>
			))}
		</div>
	)
}

export default FeatureBadges
