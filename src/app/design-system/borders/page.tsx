import DesignSystemWrapper from '../_components/DesignSystemWrapper'

export default function BorderShowcase() {
	const borderTypes = [
		'border',
		'border-top',
		'border-right',
		'border-bottom',
		'border-left',
		'border-tr',
		'border-rb',
		'border-bl',
		'border-lt',
		'border-tb',
		'border-lr'
	]

	const opacityLevels = [5, 10, 25, 50, 75, 95]

	return (
		<DesignSystemWrapper
			title="Border Combinations Showcase"
			description="This showcase demonstrates various border combinations and opacity levels."
		>
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
				{borderTypes.map(borderType => (
					<div key={borderType} className="p-4 bg-body rounded-lg">
						<h3 className="text-lg font-semibold mb-2">
							{borderType}
						</h3>
						<div
							className={`w-full text-subtitle h-10 bg-card ${borderType} flex items-center justify-center`}
						>
							<code className="text-sm text-title">{`.${borderType}`}</code>
						</div>
					</div>
				))}
			</div>

			<div className="mt-8 p-4 bg-body rounded-lg">
				<h3 className="text-lg font-semibold mb-4">
					Opacity Variations
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{borderTypes.map(borderType => (
						<div key={borderType} className="space-y-2">
							<h4 className="font-medium subtitle">
								{borderType}
							</h4>
							{opacityLevels.map(opacity => {
								const className = `${borderType}-${opacity}`
								return (
									<div
										key={className}
										className="flex flex-col items-center space-x-2 text-subtitle "
									>
										<div
											className={`h-14 w-full grid place-items-center bg-card ${className}`}
										>
											<code className="text-sm text-title">{`.${className}`}</code>
										</div>
									</div>
								)
							})}
						</div>
					))}
				</div>
			</div>
		</DesignSystemWrapper>
	)
}
