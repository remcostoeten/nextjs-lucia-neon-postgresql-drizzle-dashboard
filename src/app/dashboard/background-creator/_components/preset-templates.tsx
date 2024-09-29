import { Button } from 'ui'
import { BackgroundConfig } from '../_utils/types'

interface PresetTemplatesProps {
    loadPreset: (preset: BackgroundConfig) => void
}

const presets: BackgroundConfig[] = [
    {
        pattern: 'dot',
        dotSize: 5,
        dotSpacing: 20,
        gridSize: 50,
        lineWidth: 1,
        patternColor: '#ffffff',
        backgroundColor: '#000000',
        gradientEnabled: true,
        gradientDirection: 'radial',
        gradientStartColor: '#ff0000',
        gradientEndColor: '#0000ff',
        gradientExtent: 100,
        animationEnabled: false,
        animationType: 'shift',
        animationDuration: 5,
    },
    {
        pattern: 'grid',
        dotSize: 5,
        dotSpacing: 20,
        gridSize: 30,
        lineWidth: 2,
        patternColor: '#00ff00',
        backgroundColor: '#ffffff',
        gradientEnabled: true,
        gradientDirection: 'top-left',
        gradientStartColor: '#00ffff',
        gradientEndColor: '#ff00ff',
        gradientExtent: 75,
        animationEnabled: true,
        animationType: 'color',
        animationDuration: 3,
    },
    // Add more presets as needed
]

export function PresetTemplates({ loadPreset }: PresetTemplatesProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preset Templates</h3>
            <div className="grid grid-cols-2 gap-4">
                {presets.map((preset, index) => (
                    <Button
                        key={index}
                        onClick={() => loadPreset(preset)}
                        variant="outline"
                        className="h-20 flex flex-col items-center justify-center"
                    >
                        <div
                            className="w-full h-12 rounded-md mb-2"
                            style={{
                                backgroundColor: preset.backgroundColor,
                                backgroundImage: `radial-gradient(${preset.patternColor} 1px, transparent 1px)`,
                                backgroundSize: `${preset.dotSpacing}px ${preset.dotSpacing}px`,
                            }}
                        />
                        <span>Preset {index + 1}</span>
                    </Button>
                ))}
            </div>
        </div>
    )
}
