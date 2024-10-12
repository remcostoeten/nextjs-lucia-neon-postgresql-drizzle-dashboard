'use client'

import { CommandCode } from '@/components/elements/display-code/command-inline-code'
import { bricolage } from '@/core/config/fonts/fonts'
import { motion } from 'framer-motion'

export default function FontShowcase() {
	return (
		<div className={`${bricolage.className} min-h-screen bg-body p-8`}>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-4xl  flex flex-col gap-8 flex-wrap"
			>
				<h1 className="font-bricolage text-h1 text-title mb-6">
					The Quick Brown Fox
				</h1>
				<CommandCode>
					font-bricolage text-h1 text-title mb-6
				</CommandCode>

				<h2 className="font-bricolage text-h2 text-subtitle mb-4">
					Jumps Over the Lazy Dog
				</h2>
				<CommandCode>
					font-bricolage text-h2 text-subtitle mb-4
				</CommandCode>

				<h3 className="font-bricolage text-h3 text-text-muted mb-8">
					A Showcase of Bricolage Grotesque
				</h3>
				<CommandCode>
					font-bricolage text-h3 text-text-muted mb-8
				</CommandCode>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="bg-card p-6 rounded-lg">
						<h4 className="font-bricolage text-xl text-title mb-2">
							Regular Text
						</h4>
						<p className="font-bricolage text-subtitle">
							The quick brown fox jumps over the lazy dog. This
							sentence uses every letter of the alphabet at least
							once.
						</p>
						<CommandCode>font-bricolage text-subtitle</CommandCode>
					</div>

					<div className="bg-section p-6 rounded-lg">
						<h4 className="font-bricolage text-xl text-title mb-2">
							Different Weights
						</h4>
						<p className="font-bricolage font-light text-subtitle mb-2">
							Light: The quick brown fox jumps over the lazy dog.
						</p>
						<p className="font-bricolage font-normal text-subtitle mb-2">
							Normal: The quick brown fox jumps over the lazy dog.
						</p>
						<p className="font-bricolage font-medium text-subtitle mb-2">
							Medium: The quick brown fox jumps over the lazy dog.
						</p>
						<p className="font-bricolage font-bold text-subtitle">
							Bold: The quick brown fox jumps over the lazy dog.
						</p>
						<CommandCode>
							font-bricolage
							font-light/font-normal/font-medium/font-bold
							text-subtitle
						</CommandCode>
					</div>

					<div className="bg-modal p-6 rounded-lg">
						<h4 className="font-bricolage text-xl text-title mb-2">
							Different Sizes
						</h4>
						<p className="font-bricolage text-xs text-subtitle mb-2">
							Extra Small: The quick brown fox jumps over the lazy
							dog.
						</p>
						<p className="font-bricolage text-sm text-subtitle mb-2">
							Small: The quick brown fox jumps over the lazy dog.
						</p>
						<p className="font-bricolage text-base text-subtitle mb-2">
							Base: The quick brown fox jumps over the lazy dog.
						</p>
						<p className="font-bricolage text-lg text-subtitle">
							Large: The quick brown fox jumps over the lazy dog.
						</p>
						<CommandCode>
							font-bricolage text-xs/text-sm/text-base/text-lg
							text-subtitle
						</CommandCode>
					</div>

					<div className="bg-dropdown p-6 rounded-lg">
						<h4 className="font-bricolage text-xl text-title mb-2">
							With Colors
						</h4>
						<p className="font-bricolage text-brand mb-2">
							Brand: The quick brown fox jumps over the lazy dog.
						</p>
						<p className="font-bricolage text-success mb-2">
							Success: The quick brown fox jumps over the lazy
							dog.
						</p>
						<p className="font-bricolage text-error mb-2">
							Error: The quick brown fox jumps over the lazy dog.
						</p>
						<p className="font-bricolage text-text-regular-nav">
							Nav: The quick brown fox jumps over the lazy dog.
						</p>
						<CommandCode>
							font-bricolage
							text-brand/text-success/text-error/text-text-regular-nav
						</CommandCode>
					</div>
				</div>

				<div className="mt-8 bg-section-lighter p-6 rounded-lg">
					<h4 className="font-bricolage text-xl text-title mb-2">
						Interactive Elements
					</h4>
					<button className="font-bricolage bg-button-default hover:bg-button-hover text-text-button px-4 py-2 rounded mr-4 transition-colors duration-200">
						Click Me
					</button>
					<span className="font-bricolage bg-badge-default hover:bg-badge-hover text-text-button px-3 py-1 rounded-full text-sm transition-colors duration-200 cursor-pointer">
						Hover Me
					</span>
					<CommandCode>
						font-bricolage bg-button-default hover:bg-button-hover
						text-text-button px-4 py-2 rounded transition-colors
						duration-200
					</CommandCode>
					<CommandCode>
						font-bricolage bg-badge-default hover:bg-badge-hover
						text-text-button px-3 py-1 rounded-full text-sm
						transition-colors duration-200 cursor-pointer
					</CommandCode>
				</div>
			</motion.div>
		</div>
	)
}
