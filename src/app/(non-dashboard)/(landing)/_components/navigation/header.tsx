'use client'

import { Flex } from '@/components/atoms'
import NotificationBar from '@/components/elements/notification-bar/notification-bar'
import { Button } from '@/components/ui'
import { menuConfig } from '@/config/menu-config'
import { createShortcutMap, useKeyboardShortcuts } from '@/core/hooks'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { JSX, Key, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import HorizontalLine from '../horizontal-line'
import Logo from './_components/logo'
import SecondaryButton from './_components/sign-in-button'
import { AuthLinkProps, BlogPostProps, ProductCategoryProps } from './header.d'
import styles from './header.module.scss'

const ProductCategory = ({
	name,
	links,
	onLinkClick
}: ProductCategoryProps & { onLinkClick: () => void }) => {
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
					onClick={onLinkClick}
					className={`block text-sm ${pathname === link.href
						? 'text-title font-medium'
						: 'text-subtitle hover:text-title'
						} mb-1.5 transition-colors duration-200 flex items-center`}
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
				<div className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
					<span className="text-title text-sm font-medium ">
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

const AuthLink = ({
	href,
	Icon,
	text,
	onLinkClick
}: AuthLinkProps & { onLinkClick: () => void }) => {
	const pathname = usePathname()

	return (
		<Link
			href={href}
			onClick={onLinkClick}
			className={`flex flex-col items-center justify-center py-2 ${pathname === href
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
	const [showNotification, setShowNotification] = useState(true)
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

	const shortcuts = createShortcutMap([['escape', closeMenu]])
	useKeyboardShortcuts(shortcuts)

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
			{showNotification && (
				<NotificationBar
					badgeText="New"
					badgeEmoji="fire"
					message="We've updated the design of our landing page!"
					animated={true}
					onClose={() => setShowNotification(false)}
				/>
			)}
			<motion.div
				ref={headerRef}
				initial="closed"
				animate="open"
				exit="closed"
				variants={containerVariants}
				className={`${styles.header} ${isScrolled ? styles.scrolled : ''} fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'top-0 backdrop-blur-lg' : 'top-10'}`}
				style={{
					height: isScrolled ? '60px' : '80px'
				}}
			>
				<div className={`w-full ${isScrolled ? 'shadow-md' : ''}`}>
					<nav className="flex justify-between items-center w-full lg:max-w-[1128px] mx-auto px-theme h-full">
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
								className={`flex items-center justify-center p-2 ${isScrolled ? 'rounded-lg border' : 'border-none'}  rounded-lg bg-body hover:border hover:bg-section transition-all duration-300 ease-in-out`}
								onClick={toggleMenu}
								style={{
									transform: isScrolled
										? 'scale(0.9)'
										: 'scale(1)'
								}}
							>
								<svg
									className={`${isScrolled ? 'w-4 h-4' : 'w-6 h-6'} transition-all duration-300 ease-in-out`}
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
						className="fixed left-0 right-0 bg-body backdrop-blur-sm shadow-lg z-40 overflow-y-auto"
						style={{
							top: isScrolled ? '60px' : showNotification ? '120px' : '80px',
							maxHeight: 'calc(100vh - 60px)',
							transition: 'top 0.3s ease-in-out'
						}}
					>
						<div className="max-w-big-wrapper mx-auto px-4 md:px-theme py-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
							<Button
								size="icon"
								variant="outline"
								className="absolute top-4 right-4"
								onClick={closeMenu}
							>
								<X className="w-6 h-6" />
							</Button>
							<div className="overflow-y-auto max-h-[60vh]">
								{menuConfig.products.map(
									(
										category: JSX.IntrinsicAttributes &
											ProductCategoryProps,
										index: Key
									) => (
										<ProductCategory
											key={index}
											{...category}
											onLinkClick={closeMenu}
										/>
									)
								)}
							</div>
							<div className="overflow-y-auto max-h-[60vh]">
								<h2 className="text-xl font-semibold mb-4">
									<span className="gradient-span">Blog</span>
								</h2>
								{menuConfig.blog.map(
									(
										post: JSX.IntrinsicAttributes &
											BlogPostProps
									) => (
										<BlogPostCard key={post.id} {...post} />
									)
								)}
							</div>
							<div className="overflow-y-auto max-h-[60vh]">
								<h2 className="text-lg font-semibold mb-4">
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
