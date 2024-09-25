'use client'

import Logo from '@/components/base/logo'
import { motion } from 'framer-motion'
import { Tabs } from './Tabs'

const fadeInVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.01 } },
}

export const DropdownNavigation = () => {
    return (
        <motion.div
            className="flex items-center w-full justify-start md:justify-center"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
        >
            <span className="fixed z-50 top-6 flex items-center">
                <Logo isLink={true} />
                <Tabs />
            </span>
        </motion.div>
    )
}
