import { siteConfig } from '@/config/site-config'
import { ArrowRightIcon } from 'lucide-react'
import React from 'react'

interface ProductLink {
	name: string
	href: string
	external?: boolean
}

interface ProductCategory {
	name: string
	links: ProductLink[]
}

const productCategories: ProductCategory[] = [
	{
		name: 'Elements',
		links: [
			{ name: 'Notice box', href: '/design-system/notice' },
			{ name: 'Card spotlight', href: '/design-system/card-spotlight' }
		]
	},
	{
		name: 'Hooks showcase',
		links: [
			{
				name: 'Color palette',
				href: '/hooks-showcase/palette'
			},
			{
				name: 'Geolocatinon',
				href: '/hooks-showcase/geolocation'
			},
			{
				name: 'KBD hook',
				href: '/design-system/kbd-hook-showoff'
			}
		]
	},
	{
		name: 'Previous apps',
		links: [
			{
				name: 'Productivity panel',
				href: 'http://panel.remcostoeten.com',
				external: true
			},
			{
				name: 'All-in-one dashboard',
				href: 'https://dashboard.remcostoeten.com/login',
				external: true
			},
			{
				name: 'GitHub Repository',
				href: `https://github.com/${siteConfig.username}/${siteConfig.repositoryName}`,
				external: true
			}
		]
	}
	//   name: "Components",
	//   links: [
	//     { name: "Tag input", href: "/design-system/tag-input" },
	//     { name: "Edit form", href: "/design-system/edit-action" },
	//     { name: "Confetti", href: "/design-system/confetti" },
	//   ],
	// },
]

const ProductCategory: React.FC<ProductCategory> = ({ name, links }) => (
	<div>
		<h3 className="mb-2 text-sm text-title font-medium">{name}</h3>
		{links.map((link, index) => (
			<a
				key={index}
				href={link.href}
				target={link.external ? '_blank' : undefined}
				rel={link.external ? 'noopener noreferrer' : undefined}
				className={`block text-sm text-subtitle ${
					index !== links.length - 1 ? 'mb-1' : ''
				}`}
				{...(link.external
					? { rel: 'noopener noreferrer', target: '_blank' }
					: {})}
			>
				{link.name}
			</a>
		))}
	</div>
)

const Products: React.FC = () => {
	return (
		<div>
			<div className="flex gap-4">
				{productCategories.map((category, index) => (
					<ProductCategory key={index} {...category} />
				))}
			</div>
			<button className=" mt-4 flex items-center gap-1 text-sm text-brand">
				<span>View more</span>
				<ArrowRightIcon />
			</button>
		</div>
	)
}

export default Products
