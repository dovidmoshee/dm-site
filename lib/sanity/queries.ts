import {sanityClient} from './client'
import type {BlogPost} from '../blog'

type SanityPost = {
  _id: string
  title: string
  slug: {current: string}
  excerpt: string
  publishedAt: string
  updatedAt?: string
  tags: string[]
  author?: {name?: string; role?: string} | null
  cta?: {title: string; description: string; href: string; label: string}
  body: string
}

const POST_FIELDS = `
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  updatedAt,
  tags,
  author,
  cta,
  body
`

function toReadingMinutes(text: string) {
  const words = text
    .replace(/[`*_>#-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.round(words / 220))
}

function fromSanityPost(post: SanityPost): BlogPost {
  return {
    slug: post.slug.current,
    title: post.title,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    tags: post.tags ?? [],
    author: {
      name: post.author?.name ?? 'Cohevo',
      role: post.author?.role ?? 'Operations Systems',
    },
    cta: post.cta,
    content: post.body ?? '',
    readingMinutes: toReadingMinutes(post.body ?? ''),
  }
}

export async function fetchAllSanityPosts(): Promise<BlogPost[]> {
  try {
    const posts = await sanityClient.fetch<SanityPost[]>(
      `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${POST_FIELDS} }`,
    )

    return posts.map(fromSanityPost)
  } catch {
    return []
  }
}

export async function fetchSanityPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const post = await sanityClient.fetch<SanityPost | null>(
      `*[_type == "post" && slug.current == $slug][0] { ${POST_FIELDS} }`,
      {slug},
    )

    return post ? fromSanityPost(post) : undefined
  } catch {
    return undefined
  }
}
