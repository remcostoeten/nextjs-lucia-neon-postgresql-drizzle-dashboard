import Authentication from './TabContent/Authentication'
import Blog from './TabContent/Blog'
import Products from './TabContent/Products'

export const TABS = [
	{
		title: 'Showcase',
		Component: Products
	},
	{
		title: 'Authentication',
		Component: Authentication
	},
	{
		title: 'Blog',
		Component: Blog
	}
].map((n, idx) => ({ ...n, id: idx + 1 }))
