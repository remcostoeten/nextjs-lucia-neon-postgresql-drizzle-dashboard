/**
 * Converts a string into a slug format suitable for URLs.
 *
 * This function takes a string as input, converts it to lowercase, trims it,
 * replaces spaces with dashes, removes non-word characters, replaces multiple
 * dashes with a single dash, and trims dashes from the start and end of the string.
 *
 * @param {string} text - The input string to be slugified.
 * @returns {string} The slugified string.
 */
export function slugify(text: string): string {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w\-]+/g, '') // Remove all non-word chars
		.replace(/\-\-+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, '') // Trim - from end of text
}
