'use client'

import { AuthSession } from '@/lib/auth/client-auth-utils'
import { Frown, Smile } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from 'ui'
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
			className={`fixed bottom-4 right-4 z-50 flex items-center justify-center text-xs rounded-full bg-[#0a0a0a] border border-white/40 p-3 transform-gpu dark:bg-body dark:border-[1px_solid_rgba(39,38,39,.)] ${session ? 'box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_1px_2px_rgba(0,0,0,.05),0_6px_12px_rgba(0,0,0,.05),0_0_8px_rgba(57,255,20,0.5)' : 'box-shadow:0_0_0_1px_rgba(255,0,0,.3),0_1px_2px_rgba(255,0,0,.3),0_6px_12px_rgba(255,0,0,.3),0_0_8px_rgba(255,0,0,0.5)'}`}
		>
			<Tooltip delayDuration={50}>
				<TooltipTrigger>
					{session ? (
						<Smile className="text-success" />
					) : (
						<Frown className="text-error" />
					)}
				</TooltipTrigger>
				<TooltipContent>
					<p>{session ? 'Authenticated' : 'Not Authenticated'}</p>
				</TooltipContent>
			</Tooltip>
		</div>
	)
}
