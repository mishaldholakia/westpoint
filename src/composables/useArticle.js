import { ref, computed, onMounted } from 'vue'
import { loadArticle } from '../services/nasa.js'

export function useArticle() {
  const article = ref(null)
  const loading = ref(true)
  const error = ref('')
  const activeCategory = ref('all')
  const query = ref('')

  async function load() {
    loading.value = true
    error.value = ''
    try {
      article.value = await loadArticle()
    } catch (e) {
      error.value = e.message || 'Unable to load highlights.'
    } finally {
      loading.value = false
    }
  }

  onMounted(load)

  const items = computed(() => article.value?.items ?? [])

  const filtered = computed(() => {
    const q = query.value.trim().toLowerCase()
    return items.value.filter((i) => {
      const inCat = activeCategory.value === 'all' || i.category.id === activeCategory.value
      const inText = !q || i.title.toLowerCase().includes(q) || i.paragraphs.join(' ').toLowerCase().includes(q)
      return inCat && inText
    })
  })

  const counts = computed(() => {
    const c = { all: items.value.length }
    for (const i of items.value) c[i.category.id] = (c[i.category.id] || 0) + 1
    return c
  })

  return { article, items, filtered, counts, loading, error, activeCategory, query, reload: load }
}
