import React, { useCallback, useEffect, useState } from 'react'

interface HackerTextProps {
	children: string
	duration?: number
	speed?: number
	lowercase?: boolean
	className?: string
}

const HackerText: React.FC<HackerTextProps> = ({
	children,
	duration = 3000,
	speed = 50,
	lowercase = false,
	className = ''
}) => {
	const [text, setText] = useState('')
	const letters = lowercase
		? 'abcdefghijklmnopqrstuvwxyz'
		: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

	const scrambleText = useCallback(() => {
		return children
			.split('')
			.map(() => letters[Math.floor(Math.random() * letters.length)])
			.join('')
	}, [children, letters])

	useEffect(() => {
		let startTime = Date.now()
		let interval: NodeJS.Timeout
		let revealInterval: NodeJS.Timeout

		const animate = () => {
			if (Date.now() - startTime < duration) {
				setText(scrambleText())
			} else {
				clearInterval(interval)
				let iteration = 0
				revealInterval = setInterval(() => {
					setText(prev =>
						prev
							.split('')
							.map((letter, index) => {
								if (index < iteration) {
									return children[index]
								}
								return letters[
									Math.floor(Math.random() * letters.length)
								]
							})
							.join('')
					)

					if (iteration >= children.length) {
						clearInterval(revealInterval)
					}

					iteration += 1
				}, speed * 2)
			}
		}

		interval = setInterval(animate, speed)

		return () => {
			clearInterval(interval)
			clearInterval(revealInterval)
		}
	}, [children, duration, speed, letters, scrambleText])

	return <span className={className}>{text}</span>
}

export default HackerText
