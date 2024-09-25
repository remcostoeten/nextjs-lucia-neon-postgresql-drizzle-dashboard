'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

type LogoProps = {
    width?: string
    height?: string
    fill?: string
    className?: string
    isLink?: boolean
}

const LogoIcon: React.FC<LogoProps> = ({
    width = '124',
    height = '124',
    fill = '#fff',
    className = '',
    isLink = false,
    ...props
}) => {
    const logo = (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width={width}
            height={height}
            className={`logo ${className}`}
            whileHover={{ rotate: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            viewBox="0 0 66 66"
            preserveAspectRatio="xMidYMid meet"
            {...props}
        >
            <style>{`.st0 { fill: ${fill}; }`}</style>
            <g transform="translate(7, 7)">
                <path
                    d="M23.885 19.583a13.83 13.83 0 0 0 1.604-3.552c1.474 3.161 4.679 5.36 8.39 5.36v3.219h-.029c-5.098 0-9.25 4.156-9.25 9.265h-3.214c-.01-4.669 2.557-8.743 6.355-10.884a12.485 12.485 0 0 1-3.856-3.408z"
                    className="st0 svg-elem-1 logo__icon-right origin-center"
                />
                <path
                    d="M20.499 29.92c-1.426-3.025-4.432-5.156-7.95-5.316-.14.005-.28.005-.426.005V21.37c.14 0 .286.005.426.005a9.175 9.175 0 0 0 6.118-2.697 9.204 9.204 0 0 0 2.707-6.554h3.219c0 3.335-1.296 6.467-3.654 8.825a12.464 12.464 0 0 1-2.673 2.045 12.559 12.559 0 0 1 3.842 3.392A13.93 13.93 0 0 0 20.5 29.92z"
                    className="st0 svg-elem-2 logo__icon-left origin-center"
                />
            </g>
        </motion.svg>
    )

    return isLink ? <Link href="/">{logo}</Link> : logo
}

export default LogoIcon
