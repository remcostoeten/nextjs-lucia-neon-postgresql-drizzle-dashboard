import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://topbar.remcostoeten.com',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1
		},
		{
			url: 'https://topbar.remcostoeten.com/normal',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8
		},
		{
			url: 'https://topbar.remcostoeten.com/slow',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8
		},
		{
			url: 'https://topbar.remcostoeten.com/super-slow',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8
		}
	]
}
