'use client'

import { useEffect } from 'react'

export default function Error({
	error,
	reset
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<div className="flex flex-col items-center justify-center min-h-screen ">
			<h1 className="text-4xl font-bold text-red-600 mb-4">
				Oops! Something went wrong
			</h1>
			<p className="text-xl text-gray-400 mb-8">
				We're sorry, but an error occurred while processing your
				request.
			</p>
			<button
				onClick={() => reset()}
				className="px-4 py-2 bg-white border text-zinc-950 border-zinc-950 text-white rounded hover:bg-blue-600 transition-colors"
			>
				Try again
			</button>
		</div>
	)
}
