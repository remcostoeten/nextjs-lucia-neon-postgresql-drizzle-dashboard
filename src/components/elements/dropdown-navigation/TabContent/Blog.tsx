import { ArrowBigRight } from 'lucide-react'
import React from 'react'

interface BlogPost {
	id: string
	imageSrc: string
	title: string
	description: string
}

const blogPosts: BlogPost[] = [
	{
		id: '1',
		imageSrc: '/menu/blog1.jpg',
		title: 'Lorem ipsum dolor',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo quidem eos.'
	},
	{
		id: '2',
		imageSrc: '/menu/blog2.jpeg',
		title: 'Lorem ipsum dolor',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo quidem eos.'
	}
]

const BlogPostCard: React.FC<BlogPost> = ({ imageSrc, title, description }) => (
	<a href="#" className="block">
		<img
			className="mb-2 h-14 w-full rounded object-cover"
			src={imageSrc}
			alt={title}
		/>
		<h4 className="mb-0.5 text-sm font-medium">{title}</h4>
		<p className="text-xs text-text-regular-nav">{description}</p>
	</a>
)

const Blog: React.FC = () => {
	return (
		<div>
			<div className="grid grid-cols-2 gap-2">
				{blogPosts.map(post => (
					<BlogPostCard key={post.id} {...post} />
				))}
			</div>
			<button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
				<span>View more</span>
				<ArrowBigRight />
			</button>
		</div>
	)
}

export default Blog
