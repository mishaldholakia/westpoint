import { parseArticle } from '../lib/parseArticle.js'
import { categoryFor } from '../data/enrichment.js'

export const SOURCE_SLUG = '2025-in-review-highlights-from-nasa-in-silicon-valley'
export const SOURCE_URL = `https://www.nasa.gov/centers-and-facilities/ames/${SOURCE_SLUG}/`
const API_URL = `https://www.nasa.gov/wp-json/wp/v2/posts?slug=${SOURCE_SLUG}&_fields=id,title,link,date,content`

async function fetchLive() {
  const res = await fetch(API_URL, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`NASA API responded ${res.status}`)
  const [post] = await res.json()
  if (!post) throw new Error('Article not found')
  return post
}

async function fetchSnapshot() {
  return (await import('../data/snapshot.json')).default
}

export function buildModel(post, origin) {
  const { intro, items } = parseArticle(post.content.rendered)
  return {
    origin,
    title: 'Highlights from NASA in Silicon Valley',
    published: post.date,
    intro,
    items: items.map((item) => ({ ...item, category: categoryFor(item.title) }))
  }
}

// Live NASA data first; bundled snapshot if the request fails (offline, CORS, rate limit).
export async function loadArticle() {
  try {
    return buildModel(await fetchLive(), 'live')
  } catch {
    return buildModel(await fetchSnapshot(), 'snapshot')
  }
}
