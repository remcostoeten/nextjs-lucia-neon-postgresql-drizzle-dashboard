'use client'

import { en } from '@/core/config/locales/locales'
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import Image from 'next/image'
import { OssChip } from './oss-chips'
import { OssLight } from './oss-light'
import { HeroMainboardStuff } from './ShinyLighs'

export default function GithubOpenSource() {
	return (
		<div>
			<div className="md:mt-14 mx-auto text-gray-400 md:px-8 relative py-20 flex flex-col justify-center items-center overflow-hidden">
				<motion.p
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 1, ease: 'easeInOut' }}
					className="mt-8 max-w-2xl mx-auto font-geist text-center text-5xl font-normal tracking-tight text-gray-800 dark:text-gray-200"
				>
					{en.default.githubOpenSource.title}
				</motion.p>
				<HeroMainboardStuff className="absolute top-[-100px] invert brightness-50 block dark:hidden" />
				<motion.p
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
					className="mt-4 max-w-xl mx-auto text-lg text-center tracking-tight text-subtitle"
				>
					{en.default.githubOpenSource.subtitle}
				</motion.p>
				<div className="relative flex flex-col justify-center gap-6 items-center">
					<div className="absolute top-[-100px] left-1/2 -translate-x-1/2">
						<OssLight />
					</div>
					<motion.a
						className="z-50"
						href="/dashboard"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{
							duration: 1,
							ease: 'easeInOut',
							delay: 1
						}}
					>
						<button className="mt-4 container inline-flex -translate-y-1/4 gap-2 justify-center items-center py-2 px-10 text-lg tracking-tighter text-center bg-gradient-to-br rounded-md ring-2 ring-offset-2 transition-all hover:ring-transparent group/button from-zinc-100 to-zinc-300 font-geist text-md text-zinc-900 dark:ring-zinc-500/80 dark:ring-offset-zinc-950 hover:scale-[1.02] active:scale-[0.98] active:dark:ring-zinc-500/70 ring-black/20 z-50">
							<Github className="w-4 h-4" />{' '}
							{en.default.githubOpenSource.button}
							<div
								aria-hidden
								className="pointer-events-none absolute inset-0 opacity-0 group-hover:animate-shineButton rounded-[inherit] bg-[length:200%_100%] bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,.7),75%,transparent)]"
							/>
						</button>
					</motion.a>
				</div>

				<div className="relative flex justify-center items-center md:mt-[-40px]">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 1, ease: 'easeInOut' }}
					>
						<Image
							width={800}
							height={800}
							alt={en.default.githubOpenSource.altText}
							src="/github-oss-animation.svg"
							className="-z-10 hidden dark:block"
						/>

						<div className="absolute -z-50 top-[150px] left-[-50px] lg:w-[1000px] lg:h-[400px] lg:top-[400px] lg:left-[150px]">
							<OssChip className="flex" />
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	)
}
