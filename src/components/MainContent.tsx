/**
 * This code was generated by Builder.io.
 */
import React from 'react'

const GRADIENT_TEXT = 'bg-clip-text bg-gradient-to-b from-white to-white/64'

function MainContent() {
	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
			<section className="text-center">
				<h2 className={`text-5xl font-bold mb-4 ${GRADIENT_TEXT}`}>
					Streamline Writing <br /> Processes with Intelligent AI
				</h2>
				<p className="text-xl mb-8">
					Enhance your productivity with our cutting-edge AI solutions
				</p>
				<form className="flex flex-col items-center sm:flex-row sm:justify-center">
					<label htmlFor="email" className="sr-only">
						Enter your email
					</label>
					<input
						type="email"
						id="email"
						placeholder="Enter your email"
						className="px-4 py-2 mb-2 sm:mb-0 sm:mr-2 rounded-md text-gray-900"
						required
					/>
					<button
						type="submit"
						className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
					>
						Get Started
					</button>
				</form>
			</section>
		</main>
	)
}

export default MainContent