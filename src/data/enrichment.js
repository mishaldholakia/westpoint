// Editorial layer added on top of the NASA text: topic categories and key figures.
// Every number below is quoted from the NASA article itself.

export const CATEGORIES = [
  { id: 'exploration', label: 'Moon, Mars and Venus exploration', short: 'Exploration', color: '#0f62fe', tagBg: '#d0e2ff', tagFg: '#0043ce' },
  { id: 'science', label: 'Planetary science and astrophysics', short: 'Science', color: '#8a3ffc', tagBg: '#e8daff', tagFg: '#6929c4' },
  { id: 'aeronautics', label: 'Aeronautics and airspace', short: 'Aeronautics', color: '#009d9a', tagBg: '#9ef0f0', tagFg: '#005d5d' },
  { id: 'biology', label: 'Space biology and health', short: 'Space biology', color: '#24a148', tagBg: '#a7f0ba', tagFg: '#0e6027' },
  { id: 'spacecraft', label: 'Spacecraft and robotics', short: 'Spacecraft', color: '#d02670', tagBg: '#ffd6e8', tagFg: '#9f1853' }
]

// Matched against the highlight title (lower-cased substring).
const CATEGORY_RULES = [
  ['supercomputers', 'exploration'],
  ['viper', 'exploration'],
  ['heat shield', 'exploration'],
  ['artemis astronauts', 'exploration'],
  ['early solar system', 'science'],
  ['curiosity', 'science'],
  ['betelgeuse', 'science'],
  ['wildfire', 'aeronautics'],
  ['remotely piloted', 'aeronautics'],
  ['cargo drones', 'aeronautics'],
  ['mixed reality', 'aeronautics'],
  ['fermented', 'biology'],
  ['flies', 'biology'],
  ['antibiotic', 'biology'],
  ['biosentinel', 'biology'],
  ['satellite traffic', 'spacecraft'],
  ['satellite swarms', 'spacecraft'],
  ['astrobee', 'spacecraft']
]

export function categoryFor(title) {
  const t = title.toLowerCase()
  const rule = CATEGORY_RULES.find(([needle]) => t.includes(needle))
  return CATEGORIES.find((c) => c.id === (rule ? rule[1] : 'exploration'))
}

// Title substring of the highlight used in the hero.
export const FEATURED_MATCH = 'viper'

export const KEY_FIGURES = [
  { value: '75+ mi', label: 'Distance cargo drones flew payloads across North Dakota', match: 'cargo drones' },
  { value: '48M mi', label: 'BioSentinel’s distance from Earth, three years after launch', match: 'biosentinel' },
  { value: '100', label: 'Spacecraft computers in the swarm-autonomy test racks', match: 'satellite swarms' },
  { value: '2027', label: 'Planned VIPER delivery to the Moon’s South Pole (late 2027)', match: 'viper' }
]
