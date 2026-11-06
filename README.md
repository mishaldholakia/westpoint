# NASA Ames 2025 discoveries

A Vue 3 + Vite single-page site presenting the 18 highlights from
[2025 in Review: Highlights from NASA in Silicon Valley](https://www.nasa.gov/centers-and-facilities/ames/2025-in-review-highlights-from-nasa-in-silicon-valley/),
styled with IBM Design Language (Carbon color tokens, IBM Plex, 8px grid, Gray 100 header/hero/footer).
No Carbon components are used.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # parser tests against the bundled snapshot
npm run build      # production build in dist/
npm run snapshot   # refresh src/data/snapshot.json from NASA
```

## How data flows

1. `src/services/nasa.js` requests the article from the NASA WordPress REST API
   (`/wp-json/wp/v2/posts?slug=...`, CORS-enabled).
2. If the request fails (offline, rate limit), it falls back to `src/data/snapshot.json`.
3. `src/lib/parseArticle.js` turns the article HTML into structured highlights
   (title, paragraphs, image/video, caption, credit, links).
4. `src/data/enrichment.js` adds topic categories and the key figures. All figures are quoted from the article.

## Structure

| Path | Purpose |
| --- | --- |
| `src/styles/global.css` | IBM color, type and spacing tokens |
| `src/composables/useArticle.js` | Loading, search and category filter state |
| `src/components/` | Header, hero, key figures, filter bar, cards, detail modal, footer |

## Adding more sources

Add another service next to `nasa.js` that returns `{ title, paragraphs, media, links }` items, then
merge them in `useArticle.js`. Categories are assigned by title keyword in `enrichment.js`.

## Accessibility

Skip link, keyboard-operable cards, modal focus trap with Esc and arrow-key navigation, visible focus
rings, `prefers-reduced-motion` support.
