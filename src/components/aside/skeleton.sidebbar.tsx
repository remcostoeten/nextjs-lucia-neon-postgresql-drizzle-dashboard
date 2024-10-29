'use client'

type SidebarSkeletonLoaderProps = {
	width?: string
	height?: string
}

export default function SidebarSkeletonLoader({
	width = '250px',
	height = '100vh'
}: SidebarSkeletonLoaderProps) {
	return (
		<div
			className="skeleton-loader"
			style={{
				width,
				height,
				backgroundColor: '#f0f0f0',
				animation: 'pulse 1.5s infinite'
			}}
		>
			<div
				className="skeleton-item"
				style={{ height: '40px', margin: '20px 0' }}
			/>
			<div
				className="skeleton-item"
				style={{ height: '20px', margin: '10px 0' }}
			/>
			<div
				className="skeleton-item"
				style={{ height: '20px', margin: '10px 0' }}
			/>
			<div
				className="skeleton-item"
				style={{ height: '20px', margin: '10px 0' }}
			/>
			<div
				className="skeleton-item"
				style={{ height: '40px', margin: '20px 0' }}
			/>
			<div
				className="skeleton-item"
				style={{ height: '20px', margin: '10px 0' }}
			/>
			<div
				className="skeleton-item"
				style={{ height: '20px', margin: '10px 0' }}
			/>
		</div>
	)
}
