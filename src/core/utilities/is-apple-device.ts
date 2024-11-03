export function isAppleDevice() {
	return /Macintosh|MacIntel|MacPPC|Mac68K/i.test(navigator.userAgent)
}
