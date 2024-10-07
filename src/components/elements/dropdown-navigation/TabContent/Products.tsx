import { ArrowRightIcon } from 'lucide-react'
import React from 'react'

interface ProductLink {
	name: string
	href: string
}

interface ProductCategory {
	name: string
	links: ProductLink[]
}

const productCategories: ProductCategory[] = [
	{
		name: 'Elements',
		links: [{ name: 'Notice box', href: '/design-system/notice' }]
	},
	{
		name: 'Hooks showcase',
		links: [
			{
				name: 'use-localstorage',
				href: '/hooks-showcase/localstorage'
			},
			{
				name: 'use-geolocation',
				href: '/hooks-showcase/geolocation'
			},
		]
	},
	{
		name: 'Tools',
		links: [
			{
				name: 'KBD hook',
				href: '/design-system/kbd-hook-showoff'
			},
			{
				name: 'Background creator',
				href: '/dashboard/background-creator'
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
				className={`block text-sm text-subtitle ${index !== links.length - 1 ? 'mb-1' : ''
					}`}
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
