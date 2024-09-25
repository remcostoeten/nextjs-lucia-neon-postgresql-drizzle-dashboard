import ThemeWrapper, { metadata } from '@/components/base/ThemeWrapper'
import { DropdownNavigation } from '@/components/elements/DropdownNavigation'
import '../styles/app.scss'
export { metadata }

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (

        <ThemeWrapper>
            <DropdownNavigation />
            {children}
        </ThemeWrapper>
    )
}
