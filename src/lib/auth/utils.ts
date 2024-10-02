import { type Cookie } from 'lucia'
import { redirect } from 'next/navigation'

import { cookies } from 'next/headers'
import { validateRequest } from './lucia'

export type AuthSession = {
    session: {
        user: {
            id: string
            name?: string
            email?: string
            username?: string
        }
    } | null
}

export const getUserAuth = async (): Promise<AuthSession> => {
    const cookieStore = cookies()
    const { session, user } = await validateRequest(cookieStore)
    if (!session) return { session: null }
    if (!user.id || typeof user.id !== 'string') {
        console.error('Invalid user ID:', user.id)
        return { session: null }
    }
    return {
        session: {
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        }
    }
}

export const checkAuth = async (cookieStore: any) => {
    const { session } = await validateRequest(cookieStore)
    if (!session) redirect('/sign-in')
}

export const genericError = { error: 'Error, please try again.' }

export const setAuthCookie = (cookie: Cookie, cookieStore: any) => {
    cookieStore.set(cookie.name, cookie.value, {
        ...cookie.attributes,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    })
}

const getErrorMessage = (errors: any): string => {
    if (errors.email) return 'Invalid Email'
    if (errors.password) return 'Invalid Password - ' + errors.password[0]
    return 'An unexpected error occurred'
}
