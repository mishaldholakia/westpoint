import { describe, it, expect } from 'vitest'
import snapshot from '../data/snapshot.json'
import { parseArticle, slugify } from './parseArticle.js'
import { categoryFor, CATEGORIES } from '../data/enrichment.js'

const { intro, items } = parseArticle(snapshot.content.rendered)

describe('parseArticle (NASA snapshot)', () => {
  it('extracts all 18 highlights in order', () => {
    expect(items).toHaveLength(18)
    expect(items[0].title).toMatch(/Supercomputers to Wind Tunnels/)
    expect(items[17].title).toMatch(/Astrobee/)
    expect(items.map((i) => i.number)).toEqual(Array.from({ length: 18 }, (_, i) => i + 1))
  })

  it('captures the intro without the editor’s note', () => {
    expect(intro).toMatch(/Ames Research Center/)
    expect(intro).not.toMatch(/Editor/i)
  })

  it('gives every highlight text, media and a unique id', () => {
    for (const i of items) {
      expect(i.paragraphs.length).toBeGreaterThan(0)
      expect(i.media).toBeTruthy()
      expect(i.media.src).toMatch(/^https:\/\//)
    }
    expect(new Set(items.map((i) => i.id)).size).toBe(18)
  })

  it('detects the video highlight and collects links', () => {
    expect(items[0].media.type).toBe('video')
    expect(items[0].links.length).toBeGreaterThan(0)
  })

  it('assigns every highlight a known category', () => {
    const ids = CATEGORIES.map((c) => c.id)
    for (const i of items) expect(ids).toContain(categoryFor(i.title).id)
  })

  it('slugifies titles', () => {
    expect(slugify('Artemis Astronauts & Orion Leadership')).toBe('artemis-astronauts-and-orion-leadership')
  })
})
