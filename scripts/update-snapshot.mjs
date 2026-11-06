// Refreshes src/data/snapshot.json from the NASA WordPress REST API.
// The app uses this file as an offline fallback if the live request fails.
import { writeFile, mkdir } from 'node:fs/promises'

const SLUG = '2025-in-review-highlights-from-nasa-in-silicon-valley'
const url = `https://www.nasa.gov/wp-json/wp/v2/posts?slug=${SLUG}&_fields=id,title,link,date,modified,content`

const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
if (!res.ok) throw new Error(`NASA API responded ${res.status}`)
const [post] = await res.json()
if (!post) throw new Error('Article not found')

await mkdir(new URL('../src/data/', import.meta.url), { recursive: true })
await writeFile(
  new URL('../src/data/snapshot.json', import.meta.url),
  JSON.stringify(post, null, 2)
)
console.log(`Saved snapshot: ${post.title.rendered.trim()} (${post.date})`)
