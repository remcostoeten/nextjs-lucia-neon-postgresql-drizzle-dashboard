import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from 'ui'
;('use client')

type PaginationProps = {
	currentPage: number
	totalPages: number
	chatId: string
}

export default function ChatPagination({
	currentPage,
	totalPages,
	chatId
}: PaginationProps) {
	const getPageNumbers = () => {
		const pageNumbers = []
		const maxVisiblePages = 5

		if (totalPages <= maxVisiblePages) {
			return Array.from({ length: totalPages }, (_, i) => i + 1)
		}

		if (currentPage <= 3) {
			pageNumbers.push(1, 2, 3, 4, 5)
		} else if (currentPage >= totalPages - 2) {
			pageNumbers.push(
				totalPages - 4,
				totalPages - 3,
				totalPages - 2,
				totalPages - 1,
				totalPages
			)
		} else {
			pageNumbers.push(
				currentPage - 2,
				currentPage - 1,
				currentPage,
				currentPage + 1,
				currentPage + 2
			)
		}

		return pageNumbers
	}

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={`/dashboard/chats/${chatId}?page=${currentPage - 1}`}
						aria-disabled={currentPage === 1}
					/>
				</PaginationItem>
				{getPageNumbers().map(pageNumber => (
					<PaginationItem key={pageNumber}>
						<PaginationLink
							href={`/dashboard/chats/${chatId}?page=${pageNumber}`}
							isActive={currentPage === pageNumber}
						>
							{pageNumber}
						</PaginationLink>
					</PaginationItem>
				))}
				{totalPages > 5 && currentPage < totalPages - 2 && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}
				<PaginationItem>
					<PaginationNext
						href={`/dashboard/chats/${chatId}?page=${currentPage + 1}`}
						aria-disabled={currentPage === totalPages}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
