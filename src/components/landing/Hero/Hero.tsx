'use client'

import FadeIn from '@/components/effects/fade-in'
import NumberTicker from '@/components/effects/number-ticker'
import ShinyButton from '@/components/effects/shiny-button'
import { useInView } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import GradualSpacing from './Gradual-spacing'
import { TopLeftShiningLight, TopRightShiningLight } from './ShinyLighs'

export default function Hero() {
    const navigation = [
        { title: 'Customers', path: 'javascript:void(0)' },
        { title: 'Careers', path: 'javascript:void(0)' },
    ]
    const ref = useRef(null)
    const isInView = useInView(ref)

    return (
        <div className="relative px-10 w-full min-h-full">
            <TopRightShiningLight />
            <TopLeftShiningLight />
            <div className="absolute -z-1 inset-0  h-[600px] w-full bg-transparent opacity-5 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            <div className="justify-between md:flex">
                <Container className="relative py-20 mx-auto  max-w-[1440px] px-4 sm:px-6 lg:px-8 sm:pt-36 sm:pb-24">
                    <div ref={ref}>
                        <GradualSpacing
                            textClassName="justify-start"
                            visiblity={isInView}
                            className="max-w-2xl text-5xl font-normal tracking-tighter  text-title sm:text-7xl font-geist"
                            text={'A design conference'}
                        />
                        <GradualSpacing
                            textClassName="justify-start"
                            visiblity={isInView}
                            className="max-w-2xl text-5xl font-normal tracking-tighter x text-title sm:text-7xl font-geist"
                            text={'for a dark side'}
                        />

                        <div className="mt-6 space-y-6 tracking-tight text-subtitle sm:text-xl font-geist text-md mb-6">
                            <FadeIn delay={0.2}>
                                Modern users crave efficiency and security. They
                                need quick access to data and seamless
                                organization. Scattered workflows are obsolete.
                            </FadeIn>
                            <FadeIn delay={0.4}>
                                Your dashboard: a central hub for digital life.
                                Manage notes, files, and tools in one place.
                                Boost productivity with a streamlined interface.
                            </FadeIn>
                        </div>
                        <FadeIn delay={0.6}>
                            <Link className="mt-10 pt-10" href="/dashboard">
                                <ShinyButton>Get started</ShinyButton>
                            </Link>
                        </FadeIn>
                        <dl className="grid grid-cols-2 gap-y-6 gap-x-10 mt-10 sm:gap-y-10 sm:gap-x-16 sm:mt-16 sm:text-center lg:grid-cols-none lg:grid-flow-col lg:auto-cols-auto lg:justify-start lg:text-left">
                            {[
                                ['Coding streak', '6'],
                                ['Total commits', '123'],
                                ['Last commit', '2024-02-29'],
                                ['Made by', '@remcostoeten'],
                            ].map(([name, value], index) => (
                                <FadeIn key={name} delay={0.8 + index * 0.1}>
                                    <div>
                                        <dt className="font-mono text-sm text-title">
                                            {name}
                                        </dt>
                                        <dd className="mt-0.5 text-2xl font-normal tracking-tight text-subtitle font-geist">
                                            {name === 'Made by' ? (
                                                '@remcostoeten'
                                            ) : (
                                                <NumberTicker
                                                    value={parseInt(value)}
                                                />
                                            )}
                                        </dd>
                                    </div>
                                </FadeIn>
                            ))}
                        </dl>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export function Container({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) {
    return <div className={className} {...props} />
}
