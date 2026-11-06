<script setup>
import { computed } from 'vue'

const props = defineProps({
  intro: String,
  published: String,
  total: Number,
  featured: Object
})
defineEmits(['open'])

const dateLabel = computed(() =>
  props.published
    ? new Date(props.published).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''
)
</script>

<template>
  <section id="top" class="hero dark">
    <div class="container hero__grid">
      <div class="hero__text">
        <p class="eyebrow">NASA Ames Research Center · Silicon Valley</p>
        <h1 class="heading-display">
          2025 in review: <span class="hero__accent">discoveries</span> that move exploration forward
        </h1>
        <p class="hero__intro">{{ intro }}</p>
        <p class="hero__meta">
          <span>{{ total }} highlights</span>
          <span v-if="dateLabel">Published {{ dateLabel }}</span>
        </p>
        <a class="btn" href="#highlights">
          Explore highlights
          <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
            <path d="M16 22 6 12l1.4-1.4L16 19.2l8.6-8.6L26 12z" />
          </svg>
        </a>
      </div>

      <button v-if="featured" class="hero__feature" type="button" @click="$emit('open', featured)">
        <img
          v-if="featured.media?.type === 'image'"
          :src="featured.media.src"
          :alt="featured.media.alt"
          loading="eager"
        />
        <span class="hero__feature-body">
          <span class="hero__feature-label">Featured</span>
          <span class="hero__feature-title">{{ featured.title }}</span>
        </span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: var(--gray-100);
  color: var(--gray-10);
  padding: var(--sp-10) 0;
}
.hero .eyebrow {
  color: var(--gray-30);
}
.hero__grid {
  display: grid;
  gap: var(--sp-09);
  align-items: end;
}
.hero__accent {
  color: var(--blue-40);
}
.hero__intro {
  max-width: 36rem;
  margin: var(--sp-06) 0;
  font-size: 1.25rem;
  font-weight: 300;
  line-height: 1.4;
  color: var(--gray-30);
}
.hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-03) var(--sp-06);
  margin: 0 0 var(--sp-07);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--gray-50);
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-09);
  min-width: 16rem;
  padding: var(--sp-05) var(--sp-05);
  background: var(--blue-60);
  color: var(--white);
  font-size: 0.875rem;
  text-decoration: none;
  transition: background 110ms;
}
.btn:hover {
  background: var(--blue-70);
}
.btn:active {
  background: var(--blue-80);
}
.btn svg {
  transform: rotate(0deg);
}
.hero__feature {
  position: relative;
  display: block;
  width: 100%;
  min-height: 20rem;
  padding: 0;
  border: 0;
  background: var(--gray-90);
  overflow: hidden;
  cursor: pointer;
  text-align: left;
  color: inherit;
}
.hero__feature img {
  width: 100%;
  height: 100%;
  min-height: 20rem;
  object-fit: cover;
  transition: transform 240ms cubic-bezier(0.2, 0, 0.38, 0.9);
}
.hero__feature:hover img {
  transform: scale(1.03);
}
.hero__feature-body {
  position: absolute;
  inset: auto 0 0 0;
  padding: var(--sp-06) var(--sp-05) var(--sp-05);
  background: linear-gradient(to top, rgb(22 22 22 / 95%), rgb(22 22 22 / 0%));
}
.hero__feature-label {
  display: block;
  margin-bottom: var(--sp-02);
  font-size: 0.75rem;
  letter-spacing: 0.32px;
  text-transform: uppercase;
  color: var(--blue-40);
}
.hero__feature-title {
  display: block;
  font-size: 1.25rem;
  line-height: 1.4;
  color: var(--white);
}
@media (min-width: 66rem) {
  .hero__grid {
    grid-template-columns: 7fr 5fr;
  }
}
</style>
