'use client'

import { useDismissedState } from "@/core/hooks/use-local-storage"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from 'framer-motion'
import { XIcon } from "lucide-react"
import { useEffect, useState } from 'react'

import type { HTMLAttributes, ReactNode } from "react"

type NoticeProps = HTMLAttributes<HTMLDivElement> & {
    className?: string
    badge?: string
    children?: ReactNode
    href?: string
    id: string // Unique identifier for the notice
}

export default function Notice({
    className,
    badge,
    children,
    href,
    id,
    ...props
}: Readonly<NoticeProps>) {
    const [isDismissed, setDismissed] = useDismissedState(`notice_${id}`)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    if (isDismissed) {
        return null
    }

    return (
        <AnimatePresence>
            {isLoaded && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="pointer-events-none z-40 fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8"
                >
                    <div
                        className={cn(
                            "pointer-events-auto flex items-center justify-between gap-x-6 bg-body border text-subtitle px-6 backdrop-blur-md sm:rounded-xl py-2 z-50 sm:pr-3.5 sm:pl-4",
                            className,
                        )}
                        {...props}
                    >
                        <p className="text-sm text-white leading-6">
                            <a href={href}>
                                {children}
                                {badge && (
                                    <span className="ml-1 cursor-pointer rounded-full bg-white px-2 py-0.5 font-medium text-black text-sm">
                                        {badge}
                                    </span>
                                )}
                            </a>
                        </p>
                        <button
                            className="-m-1.5 flex-none p-1.5 bg-body"
                            type="button"
                            onClick={setDismissed}
                        >
                            <span className="sr-only">Dismiss</span>
                            <XIcon className="size-5 text-subtitle hover:text-white trans-300" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
