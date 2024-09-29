'use client'

import { useState } from 'react'
import { Button } from 'ui'
import { ColorPicker } from './color-picker'

interface ColorPaletteGeneratorProps {
    onSelectColor: (color: string) => void
}

export function ColorPaletteGenerator({ onSelectColor }: ColorPaletteGeneratorProps) {
    const [baseColor, setBaseColor] = useState('#000000')
    const [palette, setPalette] = useState<string[]>([])

    const generatePalette = () => {
        const hsl = hexToHSL(baseColor)
        const newPalette = [
            baseColor,
            hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 20)),
            hslToHex(hsl.h, hsl.s, Math.min(100, hsl.l + 20)),
            hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
            hslToHex((hsl.h + 60) % 360, hsl.s, hsl.l),
        ]
        setPalette(newPalette)
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Color Palette Generator</h3>
            <div className="flex items-center space-x-4">
                <ColorPicker label="Base Color" color={baseColor} onChange={setBaseColor} />
                <Button onClick={generatePalette}>Generate Palette</Button>
            </div>
            <div className="flex space-x-2">
                {palette.map((color, index) => (
                    <button
                        key={index}
                        className="w-10 h-10 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                        onClick={() => onSelectColor(color)}
                    />
                ))}
            </div>
        </div>
    )
}

function hexToHSL(hex: string): { h: number; s: number; l: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) {
        return { h: 0, s: 0, l: 0 }
    }
    let r = parseInt(result[1], 16)
    let g = parseInt(result[2], 16)
    let b = parseInt(result[3], 16)
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    let l = (max + min) / 2
    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }
        h /= 6
    }
    return { h: h * 360, s: s * 100, l: l * 100 }
}

function hslToHex(h: number, s: number, l: number): string {
    l /= 100
    const a = (s * Math.min(l, 1 - l)) / 100
    const f = (n: number) => {
        const k = (n + h / 30) % 12
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
}
