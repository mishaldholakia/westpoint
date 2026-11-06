<script setup>
import { computed } from 'vue'

const props = defineProps({ item: Object })
defineEmits(['open'])

const excerpt = computed(() => {
  const text = props.item.paragraphs[0] || ''
  return text.length > 190 ? text.slice(0, 187).replace(/\s+\S*$/, '') + '…' : text
})
const num = computed(() => String(props.item.number).padStart(2, '0'))
</script>

<template>
  <article class="card" :style="{ '--accent': item.category.color }">
    <button type="button" class="card__btn" :aria-label="`Read more: ${item.title}`" @click="$emit('open', item)">
      <span class="card__media">
        <img
          v-if="item.media?.type === 'image'"
          :src="item.media.src"
          :alt="item.media.alt"
          loading="lazy"
          decoding="async"
        />
        <video
          v-else-if="item.media?.type === 'video'"
          :src="item.media.src"
          muted
          loop
          playsinline
          autoplay
          aria-hidden="true"
        />
        <span v-else class="card__media-empty" />
      </span>
      <span class="card__body">
        <span class="card__top">
          <span class="tag" :style="{ background: item.category.tagBg, color: item.category.tagFg }">
            {{ item.category.short }}
          </span>
          <span class="card__num">{{ num }}</span>
        </span>
        <h3 class="card__title">{{ item.title }}</h3>
        <span class="card__excerpt">{{ excerpt }}</span>
        <span class="card__more" aria-hidden="true">
          Read more
          <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
            <path d="M18 6 16.57 7.393 24.15 15H4v2h20.15l-7.58 7.573L18 26 28 16z" />
          </svg>
        </span>
      </span>
    </button>
  </article>
</template>

<style scoped>
.card {
  background: var(--layer);
  border-top: 4px solid var(--accent);
  transition: background 110ms, box-shadow 110ms;
}
.card:hover {
  background: var(--gray-20);
}
.card__btn {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: none;
  text-align: left;
  color: inherit;
  cursor: pointer;
}
.card__media {
  display: block;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--gray-90);
}
.card__media img,
.card__media video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: var(--sp-05);
}
.card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--sp-04);
}
.tag {
  display: inline-block;
  padding: 0 var(--sp-03);
  border-radius: 1rem;
  font-size: 0.75rem;
  line-height: 1.5rem;
}
.card__num {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--gray-60);
}
.card__title {
  margin: 0 0 var(--sp-03);
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.4;
}
.card__excerpt {
  flex: 1;
  margin-bottom: var(--sp-06);
  font-size: 0.875rem;
  line-height: 1.43;
  color: var(--text-secondary);
}
.card__more {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--link);
}
</style>
