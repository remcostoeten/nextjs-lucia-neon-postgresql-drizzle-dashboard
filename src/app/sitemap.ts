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
			url: 'https://notevault.remcostoeten.com/sign-up',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.8
		},
		{
			url: 'https://notevault.remcostoeten.com/changelog',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9
		}, {
			url: 'https://notevault.remcostoeten.com/sign-in',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.8
		},

		{
			url: 'https://notevault.remcostoeten.com/docs/todo',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.6
		},
		{
			url: 'https://notevault.remcostoeten.com/design-system/notice',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.6
		},
		{
			url: 'https://notevault.remcostoeten.com/hooks-showcase/geolocation',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.6
		},
		{
			url: 'https://notevault.remcostoeten.com/docs/todo',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.6
		}
	]
}
