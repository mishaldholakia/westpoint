<script setup>
import { KEY_FIGURES } from '../data/enrichment.js'

defineProps({ items: Array })
defineEmits(['open'])

const target = (items, match) => items.find((i) => i.title.toLowerCase().includes(match))
</script>

<template>
  <section id="key-figures" class="figures" aria-labelledby="figures-title">
    <div class="container">
      <h2 id="figures-title" class="heading-04 figures__title">Key figures from the year</h2>
      <ul class="figures__grid">
        <li v-for="f in KEY_FIGURES" :key="f.match" class="figure">
          <p class="figure__value">{{ f.value }}</p>
          <p class="figure__label">{{ f.label }}</p>
          <button
            v-if="target(items, f.match)"
            type="button"
            class="figure__link"
            @click="$emit('open', target(items, f.match))"
          >
            Read highlight
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.figures {
  padding: var(--sp-10) 0 var(--sp-09);
  background: var(--layer);
}
.figures__title {
  margin-bottom: var(--sp-07);
}
.figures__grid {
  display: grid;
  gap: 1px;
  margin: 0;
  padding: 0;
  list-style: none;
  background: var(--gray-30);
  border: 1px solid var(--gray-30);
}
.figure {
  display: flex;
  flex-direction: column;
  padding: var(--sp-06) var(--sp-05);
  background: var(--white);
}
.figure__value {
  margin: 0 0 var(--sp-03);
  font-size: clamp(2.25rem, 4vw, 3.5rem);
  font-weight: 300;
  line-height: 1.15;
  color: var(--blue-60);
}
.figure__label {
  flex: 1;
  margin: 0 0 var(--sp-05);
  font-size: 0.875rem;
  line-height: 1.4;
  color: var(--text-secondary);
}
.figure__link {
  align-self: flex-start;
  padding: 0;
  border: 0;
  background: none;
  font-size: 0.875rem;
  color: var(--link);
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.figure__link:hover {
  color: var(--blue-70);
}
@media (min-width: 42rem) {
  .figures__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 66rem) {
  .figures__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
