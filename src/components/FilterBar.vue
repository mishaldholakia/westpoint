<script setup>
import { CATEGORIES } from '../data/enrichment.js'

defineProps({ counts: Object })
const category = defineModel('category', { default: 'all' })
const query = defineModel('query', { default: '' })
</script>

<template>
  <div class="filters">
    <div class="search">
      <label for="search" class="search__label">Search highlights</label>
      <div class="search__field">
        <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <path
            d="m29 27.586-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9 9.01 9.01 0 0 1-9-9Z"
          />
        </svg>
        <input id="search" v-model="query" type="search" placeholder="Search by topic, mission or keyword" />
      </div>
    </div>

    <div class="tabs" role="group" aria-label="Filter by topic">
      <button
        type="button"
        class="tab"
        :class="{ 'tab--active': category === 'all' }"
        :aria-pressed="category === 'all'"
        @click="category = 'all'"
      >
        All <span class="tab__count">{{ counts.all ?? 0 }}</span>
      </button>
      <button
        v-for="c in CATEGORIES"
        :key="c.id"
        type="button"
        class="tab"
        :class="{ 'tab--active': category === c.id }"
        :aria-pressed="category === c.id"
        @click="category = c.id"
      >
        {{ c.short }} <span class="tab__count">{{ counts[c.id] ?? 0 }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.filters {
  display: grid;
  gap: var(--sp-06);
  margin-bottom: var(--sp-07);
}
.search__label {
  display: block;
  margin-bottom: var(--sp-03);
  font-size: 0.75rem;
  letter-spacing: 0.32px;
  color: var(--text-secondary);
}
.search__field {
  position: relative;
  max-width: 28rem;
  color: var(--gray-70);
}
.search__field svg {
  position: absolute;
  left: var(--sp-05);
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.search__field input {
  width: 100%;
  height: 2.5rem;
  padding: 0 var(--sp-05) 0 var(--sp-08);
  border: 0;
  border-bottom: 1px solid var(--gray-50);
  background: var(--layer);
  font: inherit;
  font-size: 0.875rem;
  color: var(--text-primary);
}
.search__field input::placeholder {
  color: var(--gray-60);
}
.search__field input:focus {
  outline: 2px solid var(--focus);
  outline-offset: -2px;
}
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-03);
}
.tab {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-03);
  height: 2rem;
  padding: 0 var(--sp-05);
  border: 1px solid var(--gray-30);
  border-radius: 1rem;
  background: var(--white);
  font-size: 0.875rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: background 110ms;
}
.tab:hover {
  background: var(--gray-10);
}
.tab--active,
.tab--active:hover {
  border-color: var(--gray-100);
  background: var(--gray-100);
  color: var(--white);
}
.tab__count {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  opacity: 0.75;
}
</style>
