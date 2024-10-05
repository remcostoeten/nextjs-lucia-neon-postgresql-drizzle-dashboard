'use client'

import NoticeBox from '@/components/elements/notice-box'

export default function ErrorPage() {
	return (
		<div className="flex min-h-screen w-full items-center justify-center">
			<NoticeBox title="Oops! Something went wrong" homeLink="/" />
		</div>
	)
}
