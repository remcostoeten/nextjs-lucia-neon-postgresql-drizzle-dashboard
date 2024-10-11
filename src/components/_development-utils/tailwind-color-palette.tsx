import tailwindConfig from '@/../tailwind.config'
import { CommandCode } from '@/components/elements/display-code/command-inline-code'
import resolveConfig from 'tailwindcss/resolveConfig'

const fullConfig = resolveConfig(tailwindConfig)
const colorCategories = Object.keys(fullConfig.theme.colors)

export function TailwindColorPalette() {
	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold">Tailwind Color Palette</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{colorCategories.map(category => {
					const colorValue = fullConfig.theme.colors[category]
					if (typeof colorValue === 'string') {
						return (
							<div key={category} className="space-y-2">
								<h3 className="text-lg font-semibold capitalize">
									{category}
								</h3>
								<div className="flex items-center space-x-2">
									<div
										className="w-8 h-8 rounded"
										style={{ backgroundColor: colorValue }}
									/>
									<CommandCode>{`bg-${category}`}</CommandCode>
								</div>
							</div>
						)
					} else if (typeof colorValue === 'object') {
						return (
							<div key={category} className="space-y-2">
								<h3 className="text-lg font-semibold capitalize">
									{category}
								</h3>
								<div className="flex flex-col space-y-2">
									{Object.entries(colorValue).map(
										([shade, shadeValue]) => (
											<div
												key={shade}
												className="flex items-center space-x-2"
											>
												<div
													className="w-8 h-8 rounded"
													style={{
														backgroundColor:
															shadeValue as string
													}}
												/>
												<CommandCode>{`bg-${category}-${shade}`}</CommandCode>
											</div>
										)
									)}
								</div>
							</div>
						)
					}
					return null
				})}
			</div>
		</div>
	)
}
