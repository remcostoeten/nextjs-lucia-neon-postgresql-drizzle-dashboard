'use client'

import { AuthSession } from '@/lib/auth/client-utils'
import { useEffect, useState } from 'react'

export default function AuthStatusIndicator() {
	const [session, setSession] = useState<AuthSession['session']>(null)

	useEffect(() => {
		const fetchSession = async () => {
			const response = await fetch('/api/auth/session')
			if (response.ok) {
				const data = await response.json()
				setSession(data.session)
			}
		}
		fetchSession()
	}, [])

	return (
		<div
			className={`fixed bottom-4 right-4 z-50 flex items-center justify-center text-xs rounded-full bg-[#0a0a0a] border border-white/40 p-3 transform-gpu dark:bg-body dark:[border:1px_solid_rgba(39,38,39,.)] ${session ? '[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_1px_2px_rgba(0,0,0,.05),0_6px_12px_rgba(0,0,0,.05)]' : '[box-shadow:0_0_0_1px_rgba(255,0,0,.3),0_1px_2px_rgba(255,0,0,.3),0_6px_12px_rgba(255,0,0,.3)]'}`}
		>
			{session ? (
				<span className="text-green-400">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="44"
						height="44"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						<path d="M3 12a9 9 0 1018 0 9 9 0 10-18 0M9 9h.01M15 9h.01"></path>
						<path d="M8 13a4 4 0 108 0H8"></path>
					</svg>
				</span>
			) : (
				<span className="text-white/40">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="44"
						height="44"
						fill="none"
						stroke="red"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						<path d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2M16 4h2a2 2 0 012 2v2M16 20h2a2 2 0 002-2v-2M9 10h.01M15 10h.01M9.5 15.05a3.5 3.5 0 015 0"></path>
					</svg>{' '}
				</span>
			)}
		</div>
	)
}
