'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import lightStyles from '../../styles/modules/lights.module.scss'
import styles from '../../styles/modules/noise.module.css'

type LandingEffectsProps = {
	effect?: 'lights' | 'noise' | 'both'
}

export default function LandingEffects({
	effect = 'both'
}: LandingEffectsProps) {
	const showLights = effect === 'lights' || effect === 'both'
	const showNoise = effect === 'noise' || effect === 'both'

	return (
		<>
			{showLights && (
				<div className={lightStyles['home-lights']}>
					<div className={lightStyles['light-wrap']}>
						<motion.div
							className={lightStyles['light-right']}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 2, ease: 'easeInOut' }}
						>
							<Image
								src="/landing/lights/light-1.webp"
								alt="Light effect right"
								width={760}
								height={760}
								sizes="(max-width: 1800px) 80vw, 1440px"
								quality={100}
								priority
							/>
						</motion.div>
						<motion.div
							className={lightStyles['light-left']}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 2, ease: 'easeInOut' }}
						>
							<Image
								src="/landing/lights/light-2.webp"
								alt="Light effect left"
								width={1440}
								height={1440}
								sizes="(max-width: 1800px) 80vw, 1440px"
								quality={100}
								priority
							/>
						</motion.div>
					</div>
				</div>
			)}
			{showNoise && <div className={styles.noise} />}
		</>
	)
}
