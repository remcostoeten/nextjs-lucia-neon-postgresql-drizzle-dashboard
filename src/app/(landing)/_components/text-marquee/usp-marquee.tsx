'use client'
import Marquee from '@/components/ui/marquee'

const marqueeItems = [
	{ content: '✔ Dynamic Content Generation' },
	{ content: '✔ Server-Side Rendering' },
	{ content: '✔ Real-Time Collaboration' },
	{ content: '✔ Blazing-Fast Performance' },
	{ content: '✔ Seamless Offline Support' },
	{ content: '✔ Customizable Themes' },
	{ content: '✔ Advanced Search Functionality' },
	{ content: '✔ Encrypted Data Storage' },
	{ content: '✔ AI-Powered Insights' },
	{ content: '✔ Multi-Language Support' },
	{ content: '✔ Scalable Architecture' },
	{ content: '✔ User-Friendly Interface' },
	{ content: '✔ Intelligent Automation' },
	{ content: '✔ Enhanced Security Measures' },
	{ content: '✔ Personalized User Experience' },
	{ content: '✔ Advanced Analytics Tools' },
	{ content: '✔ Streamlined Workflow Management' },
	{ content: '✔ Integrated CRM System' },
	{ content: '✔ Robust API Connectivity' },
	{ content: '✔ Automated Backup and Recovery' },
	{ content: '✔ 24/7 Customer Support' },
	{ content: '✔ Regular Software Updates' },
	{ content: '✔ Compliance with Industry Standards' },
	{ content: '✔ Customizable Reporting and Dashboards' }
]

export default function UspMarquee() {
	return (
		<div className="w-full overflow-hidden shadow-wrapper">
			<span className="shadow-left" />
			<span className="shadow-right" />
			<Marquee className="[--duration:40s]" pauseOnHover>
				{marqueeItems.map((item, index) => (
					<div
						key={index}
						className="flex-shrink-0 rounded-lg text-sm text-subtitle px-4"
					>
						{item.content}
					</div>
				))}
			</Marquee>
		</div>
	)
}
