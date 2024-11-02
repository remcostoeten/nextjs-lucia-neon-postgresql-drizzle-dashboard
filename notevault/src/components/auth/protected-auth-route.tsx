'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

type ProtectedAuthRouteProps = {
	children: React.ReactNode
}

export default function ProtectedAuthRoute({
	children
}: ProtectedAuthRouteProps) {
	const { status } = useSession()

	useEffect(() => {
		if (status === 'authenticated') {
			redirect('/')
		}
	}, [status])

	if (status === 'loading') {
		return null // Or your loading component
	}

	return <>{children}</>
}
