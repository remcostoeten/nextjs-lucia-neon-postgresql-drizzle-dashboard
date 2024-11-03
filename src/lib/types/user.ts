export type UpdateUserNameData = {
	name: string
}

export type IpApiResponse = {
	ip: string
	country_name: string
	city: string
	region: string
	timezone: string
}

export type UserSystemInfo = {
	browser: string
	os: string
	device: string
	ip: string
	location?: {
		country?: string
		city?: string
		region?: string
		timezone?: string
	}
	lastLogin: string
}
