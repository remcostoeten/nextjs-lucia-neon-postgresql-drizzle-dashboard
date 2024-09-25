import React from "react";

export default function BackgroundEffect() {
    return (
        <div
            className="absolute inset-0"
            style={{
                background: `
                    radial-gradient(circle at top right, rgba(29, 28, 29, 0.3), rgba(10, 10, 10, 0) 50%),
                    repeating-linear-gradient(to right, rgba(39, 38, 39, 0.2) 0px, rgba(39, 38, 39, 0.2) 1px, transparent 1px, transparent 50px),
                    repeating-linear-gradient(to bottom, rgba(39, 38, 39, 0.2) 0px, rgba(39, 38, 39, 0.2) 1px, transparent 1px, transparent 50px),
                    #0a0a0a
                `,
                backgroundBlendMode: 'overlay, normal, normal, normal',
                maskImage: 'radial-gradient(circle at top right, black, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(circle at top right, black, transparent 70%)',
            }}
        ></div>
    );
}
