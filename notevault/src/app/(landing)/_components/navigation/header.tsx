'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'
import { toast } from 'sonner'

import type {
	AuthLinkProps,
	BlogPostProps,
	NavCategory,
	NavLink
} from './header.d'
import type { JSX } from 'react'

import { Flex } from '@/components/atoms'
import NotificationBar from '@/components/elements/notification-bar/notification-bar'
import { Button } from '@/components/ui'
import { menuConfig } from '@/config/megamenu-config'
import { useDismissedState } from '@/core/hooks/use-local-storage'
import HorizontalLine from '../horizontal-line'
import Logo from './_components/logo'
import SecondaryButton from './_components/sign-in-button'

type ProductCategoryProps = NavCategory & {
	onLinkClick: () => void
}

const ProductCategory = ({
	name,
	links,
	onLinkClick
}: ProductCategoryProps) => {
	const pathname = usePathname()

	return (
		<div className="mb-6">
			<h2 className="mb-2 text-xl font-medium text-[#221d21]">
				<span className="gradient-span">{name}</span>
			</h2>
			{links.map((link: NavLink, index) => (
				<Link
					key={index}
					href={link.href}
					target={link.external ? '_blank' : undefined}
					rel={link.external ? 'noopener noreferrer' : undefined}
					onClick={onLinkClick}
					className={`block text-sm ${
						pathname === link.href
							? 'text-title font-medium'
							: 'text-subtitle hover:text-title'
					} mb-1.5 flex items-center transition-colors duration-200`}
				>
					{link.name}
					{link.external && <ExternalLink className="ml-1 size-3" />}
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
		<div onClick={handleClick} className="group mb-4 block cursor-pointer">
			<div className="relative aspect-video overflow-hidden rounded">
				<img
					className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-110"
					src={imageSrc}
					alt={title}
				/>
				<div className="absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
					<span className="text-title text-sm font-medium ">
						Coming Soon
					</span>
				</div>
			</div>
			<h4 className="text-title mb-0.5 mt-2 text-sm font-medium transition-colors duration-200 group-hover:text-[#221d21]">
				{title}
			</h4>
			<p className="text-subtitle text-xs">{description}</p>
		</div>
	)
}

const AuthLink = ({
	href,
	Icon,
	text,
	onLinkClick
}: AuthLinkProps & { onLinkClick: () => void }) => {
	const pathname = usePathname() as string

	return (
		<Link
			href={href}
			onClick={onLinkClick}
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

export default function Header() {
	const [isOpen, setIsOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const [isDismissed] = useDismissedState('feature-notification')
	const menuRef = useRef<HTMLDivElement>(null)
	const headerRef = useRef<HTMLDivElement>(null)

	const toggleMenu = () => {
		setIsOpen(!isOpen)
		document.body.style.overflow = isOpen ? 'auto' : 'hidden'
	}

	const closeMenu = () => {
		setIsOpen(false)
		document.body.style.overflow = 'auto'
	}

	const menuVariants = {
		closed: {
			opacity: 0,
			y: -20,
			transition: {
				y: { stiffness: 1000 }
			}
		},
		open: {
			opacity: 1,
			y: 0,
			transition: {
				y: { stiffness: 1000, velocity: -100 }
			}
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

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10)
		}

		handleScroll()
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node) &&
				headerRef.current &&
				!headerRef.current.contains(event.target as Node)
			) {
				closeMenu()
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	useEffect(() => {
		const handleRouteChange = () => {
			closeMenu()
		}

		window.addEventListener('routeChangeStart', handleRouteChange)
		return () => {
			window.removeEventListener('routeChangeStart', handleRouteChange)
			document.body.style.overflow = 'auto'
		}
	}, [])

	return (
		<>
			{!isDismissed && (
				<NotificationBar
					notices={[
						{
							badgeText: 'Design',
							badgeEmoji: 'fire',
							message:
								"We've just launched our new landing page! 🎉 Beware of bugs!"
						},
						{
							badgeText: 'Update',
							badgeEmoji: 'exclamation',
							message:
								'Refactoring entire dashboard/api/server logic from scratch.'
						}
					]}
					storageKey="feature-notification"
				/>
			)}
			<motion.div
				ref={headerRef}
				initial="closed"
				animate="open"
				exit="closed"
				variants={containerVariants}
				className={`fixed inset-x-0 z-50 transition-all duration-300 ease-in-out ${
					isScrolled
						? 'top-0 backdrop-blur-lg'
						: isDismissed
							? 'top-0'
							: 'top-10'
				}`}
				style={{
					height: isScrolled ? '60px' : '80px'
				}}
			>
				<div className={`w-full ${isScrolled ? 'shadow-md' : ''}`}>
					<nav className="px-theme mx-auto flex size-full items-center justify-between lg:max-w-[1128px]">
						<Logo
							className={`${isScrolled ? 'scale-75' : 'scale-100'} transition-transform duration-300`}
							isScrolled={isScrolled}
						/>
						<Flex
							gap="4"
							align="center"
							className={`${isScrolled ? '' : 'translate-y-[12px]'}`}
						>
							<SecondaryButton
								href="/dashboard"
								className={`${isScrolled ? 'scale-90' : 'scale-100 '} transition-transform duration-300`}
							>
								Dashboard
							</SecondaryButton>
							<button
								className={`flex items-center justify-center p-2 ${isScrolled ? 'rounded-lg border' : 'border-none'}  bg-body hover:bg-section rounded-lg transition-all duration-300 ease-in-out hover:border`}
								onClick={toggleMenu}
								style={{
									transform: isScrolled
										? 'scale(0.9)'
										: 'scale(1)'
								}}
							>
								<svg
									className={`${isScrolled ? 'size-4' : 'size-6'} transition-all duration-300 ease-in-out`}
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
			</motion.div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						ref={menuRef}
						initial="closed"
						animate="open"
						exit="closed"
						variants={menuVariants}
						className="bg-body fixed inset-x-0 z-40 overflow-y-auto shadow-lg backdrop-blur-sm"
						style={{
							top: isScrolled
								? '60px'
								: isDismissed
									? '80px'
									: '120px',
							maxHeight: 'calc(100vh - 60px)',
							transition: 'top 0.3s ease-in-out'
						}}
					>
						<div className="max-w-big-wrapper md:px-theme relative mx-auto grid grid-cols-1 gap-8 px-4 py-6 md:grid-cols-2">
							<Button
								size="icon"
								variant="outline"
								className="absolute right-4 top-4"
								onClick={closeMenu}
							>
								<X className="size-6" />
							</Button>
							<div className="max-h-[60vh] overflow-y-auto">
								<h2 className="mb-4 text-xl font-semibold">
									<span className="gradient-span">Menu</span>
								</h2>
								<div className="grid grid-cols-2 gap-8">
									<div className="space-y-4">
										<div className="space-y-2">
											<h3 className="text-title text-lg font-medium">
												Docs
											</h3>
											<div className="space-y-1">
												<Link
													href="/docs/auth"
													className="text-subtitle hover:text-title block text-sm transition-colors"
												>
													Client & server auth
												</Link>
												<Link
													href="/docs/kanban-board"
													className="text-subtitle hover:text-title block text-sm transition-colors"
												>
													Kanban board (NL)
												</Link>
												<Link
													href="/docs/todo"
													className="text-subtitle hover:text-title block text-sm transition-colors"
												>
													Todo app (NL)
												</Link>
											</div>
										</div>
										<div className="space-y-2">
											<h3 className="text-title text-lg font-medium">
												Resources
											</h3>
											<div className="space-y-1">
												<Link
													href="/help"
													className="text-subtitle hover:text-title block text-sm transition-colors"
												>
													Help Center
												</Link>
												<Link
													href="/community"
													className="text-subtitle hover:text-title block text-sm transition-colors"
												>
													Community
												</Link>
												<Link
													href="/contact"
													className="text-subtitle hover:text-title block text-sm transition-colors"
												>
													Contact Us
												</Link>
											</div>
										</div>
									</div>
									<div className="space-y-4">
										<div className="space-y-2">
											<h3 className="text-title text-lg font-medium">
												Company
											</h3>
											<div className="space-y-1">
												<Link
													href="/about"
													className="text-subtitle hover:text-title block text-sm transition-colors"
												>
													About Us
												</Link>
												<Link
													href="/careers"
													className="text-subtitle hover:text-title block text-sm transition-colors"
												>
													Careers
												</Link>
												<Link
													href="/blog"
													className="text-subtitle hover:text-title block text-sm transition-colors"
												>
													Blog
												</Link>
											</div>
										</div>
										<div className="space-y-2">
											<h3 className="text-title text-lg font-medium">
												Legal
											</h3>
											<div className="space-y-1">
												<Link
													href="/privacy"
													className="text-subtitle hover:text-title block text-sm transition-colors"
												>
													Privacy Policy
												</Link>
												<Link
													href="/terms"
													className="text-subtitle hover:text-title block text-sm transition-colors"
												>
													Terms of Service
												</Link>
												<Link
													href="/cookies"
													className="text-subtitle hover:text-title block text-sm transition-colors"
												>
													Cookie Policy
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="max-h-[60vh] overflow-y-auto">
								<h2 className="mb-4 text-lg font-semibold">
									Authentication
								</h2>
								<div className="grid grid-cols-3 gap-4">
									{menuConfig.authentication.map(
										(
											link: JSX.IntrinsicAttributes &
												AuthLinkProps
										) => (
											<AuthLink
												key={link.href}
												{...link}
												onLinkClick={closeMenu}
											/>
										)
									)}
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
