'use client'

import useMouseHoverEffect from '@/core/hooks/use-mouse-hover'
import {
	ArrowLeftFromLine,
	ArrowRightFromLine,
	Building,
	Cat,
	Phone
} from 'lucide-react'
import React from 'react'
import { SiHellofresh } from 'react-icons/si'

type CardProps = {
	icon: React.ReactNode
	title: string
	description: string
}

function Card({ icon, title, description }: CardProps) {
	return (
		<div className="card bg-opacity-10 bg-white rounded-lg cursor-pointer flex flex-col relative h-[260px] w-[300px]">
			<div className="card-content bg-[var(--card-color)] rounded-lg flex flex-col flex-grow inset-[1px] p-[10px] absolute z-[2]">
				<div className="card-image flex items-center justify-center h-[140px] overflow-hidden">
					{React.cloneElement(icon as React.ReactElement, {
						className: 'text-[6em] opacity-25'
					})}
				</div>
				<div className="card-info-wrapper flex items-center flex-grow justify-start px-5">
					<div className="card-info flex items-start gap-[10px]">
						{React.cloneElement(icon as React.ReactElement, {
							className: 'text-[1em] h-5 leading-5'
						})}
						<div className="card-info-title">
							<h3 className="text-[1.1em] leading-5">{title}</h3>
							<h4 className="text-[0.85em] mt-2 text-white text-opacity-50">
								{description}
							</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function CardLayout() {
	const cardsRef = useMouseHoverEffect()

	return (
		<div className="flex items-center justify-center min-h-screen bg-[var(--bg-color)] overflow-hidden p-0 m-0">
			<div
				id="cards"
				ref={cardsRef}
				className="flex flex-wrap gap-2 max-w-[916px] w-[calc(100%-20px)]"
			>
				<Card
					icon={<Building />}
					title="Apartments"
					description="Places to be apart. Wait, what?"
				/>
				<Card
					icon={<SiHellofresh />}
					title="Unicorns"
					description="A single corn. Er, I mean horn."
				/>
				<Card
					icon={<Phone />}
					title="Blender Phones"
					description="These absolutely deserve to exist."
				/>
				<Card
					icon={<ArrowRightFromLine />}
					title="Adios"
					description="See you..."
				/>
				<Card
					icon={<ArrowLeftFromLine />}
					title="I mean hello"
					description="...over here."
				/>
				<Card
					icon={<Cat />}
					title="Otters"
					description="Look at me, imma cute lil fella."
				/>
			</div>
			<style jsx global>{`
				:root {
					--bg-color: rgb(20, 20, 20);
					--card-color: rgb(23, 23, 23);
				}

				.card::before,
				.card::after {
					border-radius: inherit;
					content: '';
					height: 100%;
					left: 0px;
					opacity: 0;
					position: absolute;
					top: 0px;
					transition: opacity 500ms;
					width: 100%;
				}

				.card::before {
					background: radial-gradient(
						800px circle at var(--mouse-x) var(--mouse-y),
						rgba(255, 255, 255, 0.06),
						transparent 40%
					);
					z-index: 3;
				}

				.card::after {
					background: radial-gradient(
						600px circle at var(--mouse-x) var(--mouse-y),
						rgba(255, 255, 255, 0.4),
						transparent 40%
					);
					z-index: 1;
				}

				#cards:hover > .card::after {
					opacity: 1;
				}

				.card:hover::before {
					opacity: 1;
				}

				@media (max-width: 1000px) {
					body {
						align-items: flex-start;
						overflow: auto;
					}

					#cards {
						max-width: 1000px;
						padding: 10px 0px;
					}

					.card {
						flex-shrink: 1;
						width: calc(50% - 4px);
					}
				}

				@media (max-width: 500px) {
					.card {
						height: 180px;
					}

					.card-image {
						height: 80px;
					}

					.card-image > svg {
						font-size: 3em;
					}

					.card-info-wrapper {
						padding: 0px 10px;
					}

					.card-info > svg {
						font-size: 0.8em;
					}

					.card-info-title > h3 {
						font-size: 0.9em;
					}

					.card-info-title > h4 {
						font-size: 0.8em;
						margin-top: 4px;
					}
				}

				@media (max-width: 320px) {
					.card {
						width: 100%;
					}
				}
			`}</style>
		</div>
	)
}
