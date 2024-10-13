declare module 'canvas-confetti' {
	function confetti(options?: any): Promise<null>

	namespace confetti {
		function create(
			canvas: HTMLCanvasElement,
			options?: any
		): {
			confetti: typeof confetti
			reset: () => void
		}
	}

	export = confetti
}
