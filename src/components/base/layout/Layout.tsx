'use client'

import { BackgroundGradient, UI_CONFIG } from '@/core/config/hero-ui.config'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import LogoIcon from '../logo'
import SignInButton from './header/SignInButton'

type NavigationItem = {
    title: string
    path: string
}

const navigation: NavigationItem[] = [
    { title: 'Features', path: '#features' },
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Design system', path: '/design-system' },
    { title: 'Design system', path: '/design-system' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isSticky, setIsSticky] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const selectedGradient = BackgroundGradient.PINK_DARK

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div className="relative mt-8">
            <div
                className="absolute -mt-8 inset-0 blur-[100px] h-[710px] animate-opacity-pulse z-10"
                style={{
                    background: UI_CONFIG.COLORS.BACKGROUND[selectedGradient],
                }}
            />
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hover:scale-100 ease-in-out ${
                    isSticky
                        ? 'scale-[.9] bg-background/80 backdrop-blur-sm'
                        : 'bg-transparent'
                }`}
            >
                <nav
                    className={`${UI_CONFIG.FONTS.SIZES.SMALL} ${
                        isSticky ? 'py-2' : 'py-5'
                    } transition-all duration-300 ease-in-out`}
                >
                    <div
                        className={`flex justify-between items-center ${UI_CONFIG.SPACING.SECTION}`}
                    >
                        <LogoIcon isLink />
                        <div className="hidden md:flex items-center space-x-6">
                            <NavigationMenu />
                            <SignInButton />
                        </div>
                        <button
                            className="md:hidden text-primary"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </nav>
            </header>
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm">
                    <div className="flex flex-col items-center justify-center h-full">
                        <MobileNavigationMenu />
                        <div className="mt-6">
                            <SignInButton />
                        </div>
                    </div>
                </div>
            )}
            <div className="relative ">{children}</div>
        </div>
    )
}

function NavigationMenu() {
    return (
        <ul className="flex space-x-6">
            {navigation.map((item) => (
                <li
                    key={item.title}
                    className={`text-${UI_CONFIG.COLORS.SECONDARY} hover:text-${UI_CONFIG.COLORS.PRIMARY}`}
                >
                    <Link href={item.path} className="block">
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

function MobileNavigationMenu() {
    return (
        <ul className="flex flex-col items-center space-y-6 text-lg">
            {navigation.map((item) => (
                <li
                    key={item.title}
                    className={`text-${UI_CONFIG.COLORS.SECONDARY} shadow-3xl shadow-black hover:text-${UI_CONFIG.COLORS.PRIMARY}`}
                >
                    <Link
                        href={item.path}
                        className="block shadow-3xl shadow-black"
                    >
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
