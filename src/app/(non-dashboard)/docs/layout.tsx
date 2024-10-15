import React from 'react'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full max-w-wrapper mx-auto px-theme pt-[100px]">
            {children}
        </main>
    )
}
