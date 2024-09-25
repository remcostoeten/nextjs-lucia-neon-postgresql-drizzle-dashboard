'use client'

import { AnimatePresence } from 'framer-motion'
import { useCallback, useState } from 'react'
import { Content } from './Content'
import { Tab } from './Tab'
import { TABS } from './constants'

export function Tabs() {
    const [selected, setSelected] = useState<number | null>(null)
    const [dir, setDir] = useState<null | 'l' | 'r'>(null)

    const handleSetSelected = useCallback(
        (val: number | null) => {
            setDir((prev) => {
                if (val === null) return null
                if (typeof selected === 'number' && typeof val === 'number') {
                    return selected > val ? 'r' : 'l'
                }
                return prev
            })
            setSelected(val)
        },
        [selected],
    )

    const handleMouseLeave = useCallback(
        () => handleSetSelected(null),
        [handleSetSelected],
    )

    return (
        <div
            onMouseLeave={handleMouseLeave}
            className="relative flex h-fit gap-4"
        >
            {TABS.map((tab) => (
                <Tab
                    key={tab.id}
                    selected={selected}
                    handleSetSelected={handleSetSelected}
                    tab={tab.id}
                >
                    {tab.title}
                </Tab>
            ))}
            <AnimatePresence>
                {selected !== null && <Content dir={dir} selected={selected} />}
            </AnimatePresence>
        </div>
    )
}
