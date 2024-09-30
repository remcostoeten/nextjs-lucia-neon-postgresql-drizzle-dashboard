import { useEffect, useRef } from 'react'

const CardGrid = () => {
	const cardsRef = useRef(null)

	useEffect(() => {
		const cards = cardsRef.current
		if (!cards) return

		const handleMouseMove = e => {
			const cardElements = cards.getElementsByClassName('card')
			for (const card of cardElements) {
				const rect = card.getBoundingClientRect()
				const x = e.clientX - rect.left
				const y = e.clientY - rect.top
				card.style.setProperty('--mouse-x', `${x}px`)
				card.style.setProperty('--mouse-y', `${y}px`)
			}
		}

		cards.addEventListener('mousemove', handleMouseMove)

		return () => {
			cards.removeEventListener('mousemove', handleMouseMove)
		}
	}, [])

	const cardData = [
		{
			icon: 'fa-apartment',
			title: 'Apartments',
			subtitle: 'Places to be apart. Wait, what?'
		},
		{
			icon: 'fa-unicorn',
			title: 'Unicorns',
			subtitle: 'A single corn. Er, I mean horn.'
		},
		{
			icon: 'fa-blender-phone',
			title: 'Blender Phones',
			subtitle: 'These absolutely deserve to exist.'
		},
		{ icon: 'fa-person-to-portal', title: 'Adios', subtitle: 'See you...' },
		{
			icon: 'fa-person-from-portal',
			title: 'I mean hello',
			subtitle: '...over here.'
		},
		{
			icon: 'fa-otter',
			title: 'Otters',
			subtitle: 'Look at me, imma cute lil fella.'
		}
	]

	return (
		<div className="flex items-center justify-center min-h-screen bg-[#141414] overflow-hidden p-5">
			<div
				id="cards"
				ref={cardsRef}
				className="flex flex-wrap gap-2 max-w-[916px] w-full"
			>
				{cardData.map((card, index) => (
					<div
						key={index}
						className="card bg-white/10 rounded-lg cursor-pointer flex flex-col relative w-[300px] h-[260px] group"
					>
						<div className="card-content bg-[#171717] rounded-lg flex flex-col flex-grow inset-[1px] p-2.5 absolute z-[2]">
							<div className="card-image flex items-center justify-center h-[140px] overflow-hidden">
								<i
									className={`fa-duotone ${card.icon} text-6xl text-white/25`}
								></i>
							</div>
							<div className="card-info-wrapper flex items-center flex-grow justify-start px-5">
								<div className="card-info flex items-start gap-2.5">
									<i
										className={`fa-duotone ${card.icon} text-base text-white`}
									></i>
									<div className="card-info-title">
										<h3 className="text-[1.1em] leading-5 text-white font-normal">
											{card.title}
										</h3>
										<h4 className="text-[0.85em] mt-2 text-white/50 font-normal">
											{card.subtitle}
										</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default CardGrid
