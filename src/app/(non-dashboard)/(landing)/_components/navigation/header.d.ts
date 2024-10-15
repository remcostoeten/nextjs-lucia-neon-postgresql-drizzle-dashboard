export type ProductCategoryProps = {
    name: string
    links: Array<{
        href: string
        external?: boolean
        name: string
    }>
}

export type BlogPostProps = {
    id: string
    imageSrc: string
    title: string
    description: string
}

export type AuthLinkProps = {
    href: string
    Icon: React.ComponentType<any>
    text: string
}

