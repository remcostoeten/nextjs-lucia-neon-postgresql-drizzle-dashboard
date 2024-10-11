'use client'

import { motion } from 'framer-motion'

export default function HomeLights() {
	return (
		<div className="home-lights">
			<div className="light-wrap">
				<motion.img
					src="/landing/lights/light-1.webp"
					loading="lazy"
					width="760"
					sizes="(max-width: 1800px) 80vw, 1440px"
					alt=""
					className="light-right"
					style={{ opacity: 1 }}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 2, ease: 'easeInOut' }}
				/>
				<motion.img
					src="/landing/lights/light-2.webp"
					loading="lazy"
					sizes="(max-width: 1800px) 80vw, 1440px"
					alt=""
					width="1440"
					className="light-left"
					style={{ opacity: 1 }}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 2, ease: 'easeInOut' }}
				/>
			</div>
		</div>
	)
}
