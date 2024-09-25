const prefix = '/design-system'

export const designSystemItems = [
    { href: '/color-tool', label: 'Color UI picker', alias: 'Cfg creator' },
    { href: '/easing', label: '(Bezier) ease showcase', alias: 'Cubic Ease' },
    {
        href: '/color-adjuster',
        label: 'Color Tweaker',
        alias: 'Color adjuster',
    },
    { href: '/tag-input', label: 'Tag input showcase', alias: 'Tag input' },
    { href: '/loaders', label: 'All loaders', alias: 'Loaders' },
    { href: '/different-toasts', label: 'Toast variants', alias: 'Toasts' },
    {
        href: '/vercel-geist-system',
        label: 'Vercel/geist design system',
        alias: 'Vercel/geist',
    },

    { href: '/edit-action', label: 'Accessible edit form', alias: 'Edit form' },
    {
        href: '/tailwind-colors',
        label: 'Theme tailwind colors',
        alias: 'Config Colors',
    },
    { href: '/kbd-variants', label: 'KBD variants', alias: "KBD's" },
    { href: '/theme-buttons', label: 'Theme buttons', alias: 'Buttons' },
    {
        href: '/pattern-cards',
        label: 'Pattern cards',
        alias: 'Cards',
        disabled: true,
    },
].map((item) => ({ ...item, href: `${prefix}${item.href}` }))
