import { getBaseUrl } from '@/core/constants/get-base-url'
import type { MetadataRoute } from 'next/dist/lib/metadata/types/metadata-interface'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  }
}

