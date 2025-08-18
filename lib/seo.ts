import { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
  noindex?: boolean
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  ogImage = '/og-image.png',
  canonical,
  noindex = false
}: SEOProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'User Admin System' }],
    creator: 'User Admin System',
    publisher: 'User Admin System',
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title,
      description,
      url: canonical || baseUrl,
      siteName: 'User Admin System',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonical || baseUrl,
    },
    verification: {
      // Adicione IDs de verificação se necessário
      // google: 'google-verification-id',
      // yandex: 'yandex-verification-id',
    },
  }
}

// Dados estruturados para SEO
export function generateJsonLd(data: {
  name: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: data.name,
    description: data.description,
    url: data.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
  }
}
