import clsx from 'clsx'
import React from 'react'

type SpacerProps = {
    children: React.ReactNode
    spaceX?: string
    spaceY?: string
    margin?: string
    padding?: string
    className?: string
    as?: keyof JSX.IntrinsicElements
}

/**
 * Spacer component to handle space-x, space-y, margin, and padding utility classes.
 *
 * @param {React.ReactNode} children - The content to be displayed inside the container.
 * @param {string} [spaceX] - Horizontal spacing between children (TailwindCSS space-x-* classes).
 * @param {string} [spaceY] - Vertical spacing between children (TailwindCSS space-y-* classes).
 * @param {string} [margin] - Custom margin (TailwindCSS margin classes like 'm-4', 'mt-2', etc.).
 * @param {string} [padding] - Custom padding (TailwindCSS padding classes like 'p-4', 'pt-2', etc.).
 * @param {string} [className=''] - Additional custom class names.
 * @param {keyof JSX.IntrinsicElements} [as='div'] - The HTML element to render as.
 * @returns {JSX.Element} The rendered Spacer component.
 */
const Spacer: React.FC<SpacerProps> = ({
    children,
    spaceX = '0',
    spaceY = '0',
    margin = '0',
    padding = '0',
    className = '',
    as: Component = 'div',
    ...props
}) => {
    const classes = clsx(
        {
            [`space-x-${spaceX}`]: spaceX !== '0',
            [`space-y-${spaceY}`]: spaceY !== '0',
            [`m-${margin}`]: margin !== '0',
            [`p-${padding}`]: padding !== '0',
        },
        className,
    )

    return (
        <Component className={classes} {...props}>
            {children}
        </Component>
    )
}

export default Spacer
