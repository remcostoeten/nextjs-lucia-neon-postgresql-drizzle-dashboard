'use client'

import NoticeBox from '@/components/elements/notice-box'

export default function ErrorPage() {
	return (
		<NoticeBox
			title="Oops! Something went wrong"
			homeLink="/"
			dashboardLink="/dashboard"
		/>
	)
}
