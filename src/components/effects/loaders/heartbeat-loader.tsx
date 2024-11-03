'use client'

import Center from '../../atoms/Center'

type HeartbeatLoaderProps = {
	centered?: boolean
}

export default function HeartbeatLoader({
	centered = false
}: HeartbeatLoaderProps) {
	return (
		<>
			{centered ? (
				<Center method="grid">
					<Heartbeat />
				</Center>
			) : (
				<Heartbeat />
			)}
		</>
	)
}

function Heartbeat() {
	return (
		<div className="heartbeat">
			<div className="loading">
				<svg width="64px" height="48px">
					<defs>
						<linearGradient
							id="heartbeatGradient"
							x1="0%"
							y1="0%"
							x2="100%"
							y2="0%"
						>
							<stop
								offset="0%"
								style={{
									stopColor: '#FCE48F',
									stopOpacity: 0.3
								}}
							/>
							<stop
								offset="100%"
								style={{
									stopColor: '#BB8FFC',
									stopOpacity: 0.3
								}}
							/>
						</linearGradient>
					</defs>
					<polyline
						points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
						className="back"
					/>
					<polyline
						points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
						className="front"
					/>
				</svg>
			</div>
			<style jsx>{`
				.heartbeat .loading svg polyline {
					fill: none;
					stroke-width: 3;
					stroke-linecap: round;
					stroke-linejoin: round;
				}

				.heartbeat .loading svg polyline.back {
					fill: none;
					stroke: url(#heartbeatGradient);
					opacity: 0.5;
				}

				.heartbeat .loading svg polyline.front {
					fill: none;
					stroke: #7a7a7a;
					stroke-dasharray: 48, 144;
					stroke-dashoffset: 192;
					animation: dash_682 1.4s ease-in-out infinite;
				}

				@keyframes dash_682 {
					72.5% {
						opacity: 0;
					}
					to {
						stroke-dashoffset: 0;
					}
				}
			`}</style>
		</div>
	)
}
