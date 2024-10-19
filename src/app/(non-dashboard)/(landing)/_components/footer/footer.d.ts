export
    type FooterLink = {
        text: string
        href: string
        isNew?: boolean
        isBeta?: boolean
        external?: boolean
    }

export type FooterColumnProps = {
    title: string
    links: FooterLink[]
}

export type FooterContactLinkProps = {
    href: string
    icon: React.ReactNode
    text: string
    target?: string
    external?: boolean
}
