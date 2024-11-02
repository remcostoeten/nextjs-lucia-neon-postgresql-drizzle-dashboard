'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'
import Link from 'next/link'

interface LogoProps {
	className?: string
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	width?: number
	height?: number
	fill?: string
	bgFill?: string
	animated?: boolean
	hasTooltip?: boolean
	tooltipText?: string
	hasLink?: boolean
	linkTo?: string
}

const sizeMap = {
	xs: { width: 32, height: 32 },
	sm: { width: 48, height: 48 },
	md: { width: 64, height: 64 },
	lg: { width: 96, height: 96 },
	xl: { width: 128, height: 128 }
}

export default function Logo({
	className = '',
	size = 'md',
	width,
	height,
	fill = 'var(--white)',
	bgFill = 'transparent',
	animated = true,
	hasTooltip = true,
	tooltipText = 'Remco Stoeten',
	hasLink = true,
	linkTo = '/'
}: LogoProps) {
	const { width: defaultWidth, height: defaultHeight } = sizeMap[size]
	const finalWidth = width || defaultWidth
	const finalHeight = height || defaultHeight

	const pathVariants = {
		hidden: {
			opacity: 0,
			scale: 0
		},
		visible: (i: number) => ({
			opacity: 1,
			scale: 1,
			transition: {
				type: 'spring',
				stiffness: 100,
				damping: 12,
				delay: i * 0.2
			}
		}),
		hover: {
			scale: 1.05,
			transition: {
				type: 'spring',
				stiffness: 300,
				damping: 10
			}
		}
	}

	const containerVariants = {
		hover: {
			scale: 1.02,
			transition: { duration: 0.3 }
		}
	}

	const AnimatedPath = ({ d, index }: { d: string; index: number }) => (
		<motion.path
			d={d}
			variants={pathVariants}
			initial="hidden"
			animate="visible"
			whileHover="hover"
			custom={index}
			fill={fill}
			aria-hidden="true"
		/>
	)

	const StaticPath = ({ d }: { d: string }) => (
		<path d={d} fill={fill} aria-hidden="true" />
	)

	const PathComponent = animated ? AnimatedPath : StaticPath

	const LogoSVG = (
		<motion.svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width={finalWidth}
			height={finalHeight}
			viewBox="0 0 400 585"
			variants={containerVariants}
			whileHover="hover"
			role="img"
			aria-label="Company Logo"
		>
			<rect width="100%" height="100%" fill={bgFill} aria-hidden="true" />
			<g>
				<PathComponent
					d="M65.255 137.908C62.231 138.469 62.232 138.452 62.422 200.249C62.515 230.249 62.762 255.379 62.971 256.093C63.376 257.475 63.512 257.513 73.266 259.020C78.350 259.806 98.929 259.644 105.571 258.766C154.358 252.321 192.011 225.224 223.926 173.593C227.452 167.888 227.743 167.388 231.099 161.270C234.338 155.364 235.756 147.579 233.998 145.356C232.074 142.923 221.144 140.042 208.468 138.625C201.187 137.811 69.335 137.151 65.255 137.908"
					index={0}
				/>
				<PathComponent
					d="M270.707 166.283C269.322 166.762 266.296 168.476 263.982 170.092C259.245 173.400 248.606 181.365 247.530 182.408C247.142 182.784 244.807 184.762 242.341 186.803C226.311 200.076 210.615 218.611 199.106 237.858C191.853 249.989 185.067 268.757 182.356 284.184C177.783 310.202 180.473 341.262 190.098 373.599C194.298 387.710 195.826 392.445 199.262 401.993C200.395 405.143 201.501 408.281 201.719 408.966C205.651 421.349 224.457 461.849 229.176 468.099C232.748 472.831 228.661 472.478 279.950 472.478C330.112 472.478 326.835 472.703 328.299 469.168C329.351 466.629 329.446 466.777 293.898 415.610C250.489 353.127 253.911 358.308 253.911 355.073C253.911 352.213 255.094 350.977 261.534 347.107C321.387 311.134 336.930 235.138 295.437 181.341C285.119 167.963 278.140 163.713 270.707 166.283"
					index={1}
				/>
				<PathComponent
					d="M64.757 275.378C62.237 276.144 62.277 274.411 62.432 375.093C62.512 426.463 62.756 469.106 62.976 469.855C63.731 472.427 63.198 472.399 116.065 472.611C179.148 472.863 175.457 473.235 176.719 466.501C178.604 456.431 179.291 425.928 177.936 412.453C176.909 402.251 175.596 391.497 174.833 387.049C164.412 326.284 142.693 294.831 101.868 281.383C87.989 276.810 69.752 273.860 64.757 275.378"
					index={2}
				/>
			</g>
		</motion.svg>
	)

	const LogoWithTooltip = hasTooltip ? (
		<Tooltip>
			<TooltipTrigger asChild>{LogoSVG}</TooltipTrigger>
			<TooltipContent>
				<p>{tooltipText}</p>
			</TooltipContent>
		</Tooltip>
	) : (
		LogoSVG
	)

	return hasLink ? (
		<Link
			href={linkTo}
			aria-describedby={hasTooltip ? 'tooltip-content' : undefined}
		>
			{LogoWithTooltip}
		</Link>
	) : (
		LogoWithTooltip
	)
}
