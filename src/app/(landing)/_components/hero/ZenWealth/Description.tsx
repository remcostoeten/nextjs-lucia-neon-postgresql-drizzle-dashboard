import React from 'react'

type DescriptionProps = {
	text: string[]
}

export function Description({ text }: DescriptionProps) {
	return (
		<section className="paragraph-regularl">
			{text.map((line, index) => (
				<React.Fragment key={index}>
					{line}
					<br />
				</React.Fragment>
			))}
		</section>
	)
}
