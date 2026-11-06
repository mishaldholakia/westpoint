<script setup>
import { computed, ref } from 'vue'
import { useArticle } from './composables/useArticle.js'
import { SOURCE_URL } from './services/nasa.js'
import { FEATURED_MATCH } from './data/enrichment.js'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import KeyFigures from './components/KeyFigures.vue'
import FilterBar from './components/FilterBar.vue'
import HighlightCard from './components/HighlightCard.vue'
import DetailModal from './components/DetailModal.vue'
import SiteFooter from './components/SiteFooter.vue'

const { article, items, filtered, counts, loading, error, activeCategory, query, reload } = useArticle()

const selected = ref(null)
const featured = computed(() => items.value.find((i) => i.title.toLowerCase().includes(FEATURED_MATCH)))

const index = computed(() => (selected.value ? items.value.findIndex((i) => i.id === selected.value.id) : -1))
const hasPrev = computed(() => index.value > 0)
const hasNext = computed(() => index.value >= 0 && index.value < items.value.length - 1)
const step = (d) => (selected.value = items.value[index.value + d])
</script>

<template>
  <SiteHeader :source-url="SOURCE_URL" />

  <main>
    <div v-if="loading" class="state" role="status">
      <div class="skeleton" aria-hidden="true" />
      <p>Loading highlights from NASA…</p>
    </div>

    <div v-else-if="error" class="state" role="alert">
      <p class="heading-03">Highlights could not be loaded</p>
      <p>{{ error }}</p>
      <button type="button" class="retry" @click="reload">Try again</button>
    </div>

    <template v-else-if="article">
      <HeroSection
        :intro="article.intro"
        :published="article.published"
        :total="items.length"
        :featured="featured"
        @open="selected = $event"
      />
      <KeyFigures :items="items" @open="selected = $event" />

      <section id="highlights" class="highlights" aria-labelledby="highlights-title">
        <div class="container">
          <h2 id="highlights-title" class="heading-04 highlights__title">Highlights</h2>
          <FilterBar v-model:category="activeCategory" v-model:query="query" :counts="counts" />

          <p class="sr-only" role="status">{{ filtered.length }} highlights shown</p>

          <ul v-if="filtered.length" class="grid">
            <li v-for="item in filtered" :key="item.id">
              <HighlightCard :item="item" @open="selected = $event" />
            </li>
          </ul>
          <p v-else class="empty">No highlights match your search. Try a different keyword or topic.</p>
        </div>
      </section>
    </template>
  </main>

  <SiteFooter :source-url="SOURCE_URL" :origin="article?.origin" />

  <DetailModal
    :item="selected"
    :has-prev="hasPrev"
    :has-next="hasNext"
    @close="selected = null"
    @prev="step(-1)"
    @next="step(1)"
  />
</template>

<style scoped>
.highlights {
  padding: var(--sp-10) 0 var(--sp-12);
}
.highlights__title {
  margin-bottom: var(--sp-07);
}
.grid {
  display: grid;
  gap: var(--sp-05);
  margin: 0;
  padding: 0;
  list-style: none;
}
.grid li {
  display: flex;
}
.grid li > * {
  width: 100%;
}
.empty {
  padding: var(--sp-09) 0;
  color: var(--text-secondary);
}
.state {
  min-height: 60vh;
  padding: var(--sp-10) var(--sp-05);
  text-align: center;
  color: var(--text-secondary);
}
.skeleton {
  width: min(32rem, 90%);
  height: 12rem;
  margin: 0 auto var(--sp-06);
  background: linear-gradient(90deg, var(--gray-10) 25%, var(--gray-20) 50%, var(--gray-10) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s linear infinite;
}
@keyframes shimmer {
  to {
    background-position: -200% 0;
  }
}
.retry {
  margin-top: var(--sp-05);
  padding: var(--sp-04) var(--sp-07);
  border: 0;
  background: var(--blue-60);
  color: var(--white);
  font-size: 0.875rem;
  cursor: pointer;
}
.retry:hover {
  background: var(--blue-70);
}
@media (min-width: 42rem) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 66rem) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
