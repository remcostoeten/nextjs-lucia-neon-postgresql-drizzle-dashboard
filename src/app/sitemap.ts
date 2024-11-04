import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://notevault.remcostoeten.com',
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1
		},
		{
			url: 'https://notevault.remcostoeten.com/signup',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.8
		},
		{
			url: 'https://notevault.remcostoeten.com/login',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.8
		},
		{
			url: 'https://notevault.remcostoeten.com/reset-password',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.4
		},
		{
			url: 'https://notevault.remcostoeten.com/changelog',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9
		},
		{
			url: 'https://notevault.remcostoeten.com/dashboard/',
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.6
		}
		/*{
			url: '  ',
			lastModified: new Date(),
			changeFrequency: '
			// daily
			// weekly
			// monthly
			// yearly
			',
			priority: // 0 - 1 
		}*/
	]
}
