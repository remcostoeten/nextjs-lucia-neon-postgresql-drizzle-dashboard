import HorizontalLine from '../horizontal-line'
import FAQItem from './faq-item'

type FAQItem = {
	question: string
	answer: string
}

const faqItems: FAQItem[] = [
	{
		question: 'What is the tech stack of this project?',
		answer: 'Nextjs 14, TailwindCSS + SCSS(& modules), TypeScript,Postgresql via Drizzle-ORM, Lucia auth,ShadCN UI, alot of custom ui, Zustand, Framer Motion and tiptap would be the main ones.'
	},
	{
		question: 'What is this application used for?',
		answer: 'Mainly for personal use. Tools I built for myself I host here to prevent annoyance of other people their ads or trackers. Building in open source because why not.'
	},
	{
		question: 'Can I fork this project?',
		answer: '👍 '
	},
	{
		question: 'What features are currently done?',
		answer: 'To write'
	},
	{
		question: 'Any features on the roadmap?',
		answer: 'To write'
	},
	{
		question: 'why not X or Y?',
		answer: 'To write'
	}
]

export default function FAQSection() {
	return (
		<div className="container-lines-large">
			<HorizontalLine />
			<div className="container-x-small">
				<div className="header-center-small">
					<h3>
						<span className="gradient-span">
							Frequently Asked Questions
						</span>
					</h3>
					<div className="max-width-x-small text-subtitle">
						<p className="paragraph-regular text-subtitle">
							Actually no one asked these questions but the toggle
							animation is pretty cool. And I needed another
							section to fill the landing..
						</p>
					</div>
				</div>
				<div className="w-layout-grid faq-grid">
					<div className="wrap-v-regular">
						{faqItems.slice(0, 3).map((item, index) => (
							<FAQItem
								key={index}
								question={item.question}
								answer={item.answer}
							/>
						))}
					</div>
					<div className="wrap-v-regular">
						{faqItems.slice(3).map((item, index) => (
							<FAQItem
								key={index + 3}
								question={item.question}
								answer={item.answer}
							/>
						))}
					</div>
				</div>
			</div>
			<div className="lines-group">
				<div className="line-vertical-left"></div>
				<div className="line-vertical-right"></div>
				<div className="line-dot bottom-left"></div>
				<div className="line-dot bottom-right"></div>
			</div>
		</div>
	)
}
