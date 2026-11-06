// Converts the NASA article HTML (WordPress `content.rendered`) into structured highlights.
// Structure of the source: each <h2> starts a highlight; it is followed by one
// `.hds-media` block (image or video + caption + credit) and one or more <p>.

const clean = (s = '') => s.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()

export const slugify = (s) =>
  clean(s)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

function parseMedia(node) {
  const video = node.querySelector('video source')
  const img = node.querySelector('img')
  const caption = clean(node.querySelector('.hds-caption-text')?.textContent)
  const credit = clean(node.querySelector('.hds-credits')?.textContent)

  if (video) {
    return { type: 'video', src: video.getAttribute('src'), alt: '', caption, credit }
  }
  if (img) {
    return {
      type: 'image',
      src: img.getAttribute('src'),
      alt: clean(img.getAttribute('alt')),
      caption,
      credit
    }
  }
  return null
}

export function parseArticle(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const items = []
  const introParagraphs = []
  let current = null

  for (const node of doc.body.children) {
    if (node.tagName === 'H2') {
      const title = clean(node.textContent)
      current = { id: slugify(title), number: items.length + 1, title, paragraphs: [], media: null, links: [] }
      items.push(current)
    } else if (node.matches('.hds-media')) {
      if (current && !current.media) current.media = parseMedia(node)
    } else if (node.tagName === 'P') {
      const text = clean(node.textContent)
      if (!text) continue
      if (!current) {
        if (!/^editor.s note/i.test(text)) introParagraphs.push(text)
        continue
      }
      current.paragraphs.push(text)
      for (const a of node.querySelectorAll('a[href]')) {
        const href = a.getAttribute('href')
        if (!current.links.some((l) => l.href === href)) {
          current.links.push({ href, text: clean(a.textContent) })
        }
      }
    }
  }

  return { intro: introParagraphs.join(' '), items }
}
