import React from 'react'

const NoDataComponent: React.FC = () => {
	return (
		<div className="w-full flex items-center flex-wrap justify-center gap-10">
			<div className="grid gap-4 w-60">
				<svg
					width="100"
					height="100"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<filter id="darken">
							<feComponentTransfer>
								<feFuncR type="linear" slope="0.5" />
								<feFuncG type="linear" slope="0.5" />
								<feFuncB type="linear" slope="0.5" />
							</feComponentTransfer>
						</filter>
					</defs>
					<circle
						cx="50"
						cy="50"
						r="40"
						stroke="black"
						stroke-width="3"
						fill="red"
						filter="url(#darken)"
					/>
				</svg>
				<div>
					<h2 className="text-center text-title text-xl font-semibold leading-loose pb-2">
						There’s no folder yet
					</h2>
					<p className="text-center text-black text-base font-normal leading-relaxet text-subtitle pb-4">
						Try creating a folder to store your issues
					</p>
					<div className="flex gap-3">
						<button className="w-full px-3 py-2 rounded-full border border-gray-300 text-gray-900 text-xs font-semibold leading-4">
							{' '}
							Clear Filter{' '}
						</button>
						<button className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 transition-all duration-500 rounded-full text-white text-xs font-semibold leading-4">
							{' '}
							Change Filter{' '}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NoDataComponent
