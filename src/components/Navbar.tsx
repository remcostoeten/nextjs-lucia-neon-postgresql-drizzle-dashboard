'use client'

import { Button } from 'ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { defaultLinks } from '@/config/nav'
import { AlignRight } from 'lucide-react'

export default function Navbar() {
	const [open, setOpen] = useState(false)
	const pathname = usePathname()
	return (
		<div className="md:hidden border-b mb-4 pb-2 w-full border border-border-outline">
			<nav className="flex justify-between w-full items-center">
				<div className="font-semibold text-lg">Logo</div>
				<Button variant="ghost" onClick={() => setOpen(!open)}>
					<AlignRight />
				</Button>
			</nav>
			{open ? (
				<div className="my-4 p-4 bg-muted h">
					<ul className="space-y-2 ">
						{defaultLinks.map(link => (
							<li
								key={link.title}
								onClick={() => setOpen(false)}
								className=""
							>
								<Link
									href={link.href}
									className={
										pathname === link.href
											? 'text-primary hover:text-primary font-semibold'
											: 'text-muted-foreground hover:text-primary'
									}
								>
									{link.title}
								</Link>
							</li>
						))}
					</ul>
				</div>
			) : null}
		</div>
	)
}
