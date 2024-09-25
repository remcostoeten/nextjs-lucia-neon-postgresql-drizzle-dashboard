import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

type TriangleProps = {
    selected: number | null
}

export function Triangle({ selected }: TriangleProps) {
    const [left, setLeft] = useState(0)

    const moveNub = useCallback(() => {
        if (selected === null) return

        const hoveredTab = document.getElementById(`shift-tab-${selected}`)
        const overlayContent = document.getElementById('overlay-content')

        if (!hoveredTab || !overlayContent) return

        const tabRect = hoveredTab.getBoundingClientRect()
        const { left: contentLeft } = overlayContent.getBoundingClientRect()

        const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft

        setLeft(tabCenter)
    }, [selected])

    useEffect(() => {
        moveNub()
        window.addEventListener('resize', moveNub)
        return () => window.removeEventListener('resize', moveNub)
    }, [moveNub])

    return (
        <motion.span
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%, 0% 100%)' }}
            animate={{ left }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border-seperator  bg-gradient-to-b from-card via-card to-body"
        />
    )
}
