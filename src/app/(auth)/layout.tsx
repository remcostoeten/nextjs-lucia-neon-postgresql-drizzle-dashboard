import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Logo } from '@/components/icons'
import { AuthModeToggle } from './components/auth-mode-toggle'

export default function AuthLayout({ children }: React.PropsWithChildren) {
	return (
		<div className="container h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div className="relative hidden h-full flex-col justify-between border-r p-10 lg:flex">
				<div className="absolute inset-0 bg-zinc-900" />

				<div className="z-10 w-fit font-handwriting text-2xl font-medium lowercase text-background dark:text-foreground">
					<Link
						aria-label="Go to home page"
						href="/"
						className="flex items-center gap-2 rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					>
						<Logo size={48} />
					</Link>
				</div>

				<div className="m-auto">
					<Image
						priority
						src="/illustrations/success.svg"
						alt="Get started"
						width={500}
						height={500}
						className="drop-shadow-xl invert"
					/>
				</div>

				<div className="z-10 ml-auto text-muted-foreground">
					<p className="text-sm">
						Illustrations by{' '}
						<a
							href="https://popsy.co/"
							className="underline underline-offset-4 transition-colors hover:text-background focus-visible:underline focus-visible:outline-none dark:hover:text-foreground"
						>
							Popsy
						</a>
						.
					</p>
				</div>
			</div>

			<AuthModeToggle />

			<div className="m-auto flex w-full flex-col justify-center space-y-6 p-8 sm:w-[350px] sm:p-0">
				<Logo className="mx-auto size-14 drop-shadow" />
				{children}
				<p className="mx-auto px-10 text-center text-sm text-muted-foreground">
					By clicking continue, you agree to our{' '}
					<Link
						href="/terms"
						className="underline underline-offset-4 outline-none hover:text-foreground hover:underline"
					>
						Terms of Service
					</Link>{' '}
					and{' '}
					<Link
						href="/privacy"
						className="underline underline-offset-4 outline-none hover:text-foreground hover:underline"
					>
						Privacy Policy
					</Link>
					.
				</p>
			</div>
		</div>
	)
}
