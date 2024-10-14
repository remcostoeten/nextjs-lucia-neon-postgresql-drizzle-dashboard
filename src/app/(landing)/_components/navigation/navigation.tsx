'use client'

import { Flex } from '@/components/atoms'
import { siteConfig } from '@/config/site-config'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Github, LogIn, User, UserPlus, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import HorizontalLine from '../horizontal-line'
import Logo from './_components/logo'
import SecondaryButton from './_components/sign-in-button'

type ProductCategoryProps = {
	name: string
	links: { name: string; href: string; external?: boolean }[]
}

type BlogPostProps = {
	id: string
	imageSrc: string
	title: string
	description: string
}

type AuthLinkProps = {
	href: string
	Icon: React.ComponentType<any>
	text: string
}

const menuConfig = {
	products: [
		{
			name: 'Elements',
			links: [
				{ name: 'Notice box', href: '/design-system/notice' },
				{
					name: 'Card spotlight',
					href: '/design-system/card-spotlight'
				}
			]
		},
		{
			name: 'Hooks showcase',
			links: [
				{ name: 'Color palette', href: '/hooks-showcase/palette' },
				{
					name: 'use-geolocation',
					href: '/hooks-showcase/geolocation'
				},
				{ name: 'KBD hook', href: '/design-system/kbd-hook-showoff' }
			]
		},
		{
			name: 'Previous itterations',
			links: [
				{
					name: 'Productivity panel',
					href: 'http://panel.remcostoeten.com',
					external: true
				},
				{
					name: 'All-in-one dashboard',
					href: 'https://dashboard.remcostoeten.com/login',
					external: true
				},
				{
					name: 'GitHub Repository',
					href: `https://github.com/${siteConfig.username}/${siteConfig.repositoryName}`,
					external: true
				}
			]
		}
	],
	blog: [
		{
			id: '1',
			imageSrc: '/menu/blog1.jpg',
			title: 'Lorem ipsum dolor',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo quidem eos.'
		},
		{
			id: '2',
			imageSrc: '/menu/blog2.jpeg',
			title: 'Lorem ipsum dolor',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo quidem eos.'
		}
	],
	authentication: [
		{ href: '/sign-in', Icon: LogIn, text: 'Log In' },
		{ href: '/sign-up', Icon: UserPlus, text: 'Register' },
		{ href: '/dashboard', Icon: User, text: 'Dashboard' }
	]
}

const ProductCategory = ({ name, links }: ProductCategoryProps) => {
	const pathname = usePathname()

	return (
		<div className="mb-6">
			<h2 className="mb-2 text-xl font-medium text-[#221d21]">
				<span className="gradient-span">{name}</span>
			</h2>
			{links.map((link, index) => (
				<Link
					key={index}
					href={link.href}
					target={link.external ? '_blank' : undefined}
					rel={link.external ? 'noopener noreferrer' : undefined}
					className={`block text-sm ${
						pathname === link.href
							? 'text-title font-medium'
							: 'text-subtitle hover:text-title'
					} mb-1 transition-colors duration-200 flex items-center`}
				>
					{link.name}
					{link.external && <ExternalLink className="ml-1 h-3 w-3" />}
				</Link>
			))}
		</div>
	)
}

const BlogPostCard = ({ imageSrc, title, description }: BlogPostProps) => {
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()
		toast('Blogs coming soon!')
	}

	return (
		<div onClick={handleClick} className="block mb-4 group cursor-pointer">
			<div className="relative overflow-hidden rounded aspect-video">
				<img
					className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
					src={imageSrc}
					alt={title}
				/>
				<div className="absolute inset-0 bg-body bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
					<span className="text-title text-sm font-medium">
						Coming Soon
					</span>
				</div>
			</div>
			<h4 className="mt-2 mb-0.5 text-sm font-medium text-title group-hover:text-[#221d21] transition-colors duration-200">
				{title}
			</h4>
			<p className="text-xs text-subtitle">{description}</p>
		</div>
	)
}

const AuthLink = ({ href, Icon, text }: AuthLinkProps) => {
	const pathname = usePathname()

	return (
		<Link
			href={href}
			className={`flex flex-col items-center justify-center py-2 ${
				pathname === href
					? 'text-title'
					: 'text-subtitle hover:text-title'
			} transition-colors duration-200`}
		>
			<Icon
				className={`mb-1 text-2xl ${pathname === href ? 'text-[#201c20]' : 'text-title'}`}
			/>
			<span className="text-xs">{text}</span>
		</Link>
	)
}

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)

	const toggleMenu = () => setIsOpen(!isOpen)

	const menuVariants = {
		closed: {
			opacity: 0,
			y: -20,
			transition: {
				y: { stiffness: 1000 }
			},
			transformOrigin: 'top'
		},
		open: {
			opacity: 1,
			y: 0,
			transition: {
				y: { stiffness: 1000, velocity: -100 }
			},
			transformOrigin: 'top'
		}
	}

	const containerVariants = {
		open: {
			clipPath: 'inset(0% 0% 0% 0% round 10px)',
			transition: {
				type: 'spring',
				bounce: 0,
				duration: 0.7,
				delayChildren: 0.3,
				staggerChildren: 0.05
			}
		},
		closed: {
			clipPath: 'inset(10% 50% 90% 50% round 10px)',
			transition: {
				type: 'spring',
				bounce: 0,
				duration: 0.3
			}
		}
	}

	const heartBeatVariants = {
		beat: {
			scale: [1, 1.2, 1],
			transition: {
				duration: 0.8,
				repeat: Infinity,
				repeatType: 'loop'
			}
		}
	}

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0)
		}

		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<div className="fixed top-0 left-0 right-0 z-50 bg-black text-title transition-all duration-300 w-screen md:w-full">
			<div className={`w-full ${isScrolled ? 'shadow-md' : ''}`}>
				<nav className="flex justify-between items-center w-full lg:max-w-[1128px] mx-auto py-4 px-4 md:px-theme">
					<Logo />
					<Flex gap="4" align="center">
						<SecondaryButton href="/dashboard">
							Dashboard
						</SecondaryButton>
						<button
							className="flex items-center justify-center p-2 rounded-xl bg-body border hover:bg-section transition-colors duration-200"
							onClick={toggleMenu}
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</Flex>
				</nav>
				<HorizontalLine />
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial="closed"
						animate="open"
						exit="closed"
						variants={containerVariants}
						className="border-t border-[#221d21] absolute left-0 right-0 bg-black bg-opacity-80 backdrop-blur-md z-50 shadow-lg overflow-hidden w-screen md:w-full"
					>
						<motion.div
							variants={menuVariants}
							className="max-w-[1128px] mx-auto px-4 md:px-theme py-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative max-h-[80vh] overflow-y-auto"
						>
							<button
								onClick={toggleMenu}
								className="absolute top-4 right-4 p-2 rounded-full bg-body hover:bg-section transition-colors duration-200"
							>
								<X className="w-6 h-6" />
							</button>
							<div className="overflow-y-auto max-h-[60vh]">
								{menuConfig.products.map((category, index) => (
									<ProductCategory
										key={index}
										{...category}
									/>
								))}
							</div>
							<div className="overflow-y-auto max-h-[60vh]">
								<h2 className="text-xl font-semibold mb-4">
									<span className="gradient-span">Blog</span>
								</h2>
								{menuConfig.blog.map(post => (
									<BlogPostCard key={post.id} {...post} />
								))}
							</div>
							<div className="overflow-y-auto max-h-[60vh]">
								<h2 className="text-lg font-semibold mb-4">
									Authentication
								</h2>
								<div className="grid grid-cols-3 gap-4">
									{menuConfig.authentication.map(link => (
										<AuthLink key={link.href} {...link} />
									))}
								</div>
							</div>
						</motion.div>

						<div className="max-w-[1128px] mx-auto px-4 md:px-theme py-4 flex justify-between items-center border-t border mt-6">
							<div className="flex items-center">
								<span className="text-sm text-subtitle">
									Built with
								</span>
								<motion.span
									className="mx-1 text-red-500"
									variants={heartBeatVariants}
									animate="beat"
								>
									❤️
								</motion.span>
								<span className="text-sm text-subtitle">
									by remco stoeten
								</span>
							</div>
							<Link
								href={`https://github.com/${siteConfig.username}/${siteConfig.repositoryName}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Github className="w-6 h-6 text-subtitle hover:text-title trans-300" />
							</Link>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
