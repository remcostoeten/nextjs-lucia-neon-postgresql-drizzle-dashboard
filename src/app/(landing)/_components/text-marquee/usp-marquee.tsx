'use client'
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
		<>
			<div className="w-full overflow-hidden">
				<div
					className="flex animate-marquee gap-4"
					style={{
						animationDuration: '30s',
						animationTimingFunction: 'linear',
						animationIterationCount: 'infinite'
					}}
				>
					{marqueeItems.map((item, index) => (
						<div
							key={index}
							className="flex-shrink-0 rounded-lg text-sm text-white"
						>
							{item.content}
						</div>
					))}
				</div>
			</div>
			<div className="carousel-overlay"></div>
		</>
	)
}
