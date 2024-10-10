export type ActionResult = {
	error: string | null
	success: boolean
	message?: string
	data?: Record<string, any>
}
