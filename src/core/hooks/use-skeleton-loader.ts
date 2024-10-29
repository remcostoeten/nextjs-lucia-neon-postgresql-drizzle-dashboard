'use client'

import { useEffect, useState } from 'react'

interface SkeletonLoaderOptions<T> {
	fetchData: () => Promise<{ [key: string]: T[] }>
	getItemCount: () => Promise<number>
}

export function useSkeletonLoader<T>({
	fetchData,
	getItemCount
}: SkeletonLoaderOptions<T>) {
	const [data, setData] = useState<T[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [itemCount, setItemCount] = useState(0)

	useEffect(() => {
		async function load() {
			try {
				setIsLoading(true)
				const count = await getItemCount()
				setItemCount(count)
				const result = await fetchData()
				setData(Object.values(result)[0])
			} catch (error) {
				console.error('Error fetching data:', error)
			} finally {
				setIsLoading(false)
			}
		}

		load()
	}, [fetchData, getItemCount])

	return { data, isLoading, itemCount }
}
