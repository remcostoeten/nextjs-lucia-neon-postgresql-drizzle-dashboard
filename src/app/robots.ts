import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ''
		},
		sitemap: 'https://noteault.remcostoeten.com/sitemap.xml'
	}
}
