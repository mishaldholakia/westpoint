<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'

const props = defineProps({ item: Object, hasPrev: Boolean, hasNext: Boolean })
const emit = defineEmits(['close', 'prev', 'next'])

const dialog = ref(null)
const closeBtn = ref(null)
let lastFocused = null

function focusables() {
  return dialog.value
    ? [...dialog.value.querySelectorAll('a[href], button:not([disabled])')]
    : []
}

function onKey(e) {
  if (e.key === 'Escape') return emit('close')
  if (e.key === 'ArrowLeft' && props.hasPrev) return emit('prev')
  if (e.key === 'ArrowRight' && props.hasNext) return emit('next')
  if (e.key === 'Tab') {
    const els = focusables()
    if (!els.length) return
    const first = els[0]
    const last = els[els.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

watch(
  () => props.item,
  async (item, old) => {
    if (item && !old) {
      lastFocused = document.activeElement
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', onKey)
      await nextTick()
      closeBtn.value?.focus()
    } else if (!item && old) {
      cleanup()
    }
    if (item) dialog.value?.querySelector('.modal__scroll')?.scrollTo({ top: 0 })
  }
)

function cleanup() {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKey)
  lastFocused?.focus?.()
}

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="item" class="overlay" @click.self="emit('close')">
      <div
        ref="dialog"
        class="modal"
        role="dialog"
        aria-modal="true"
        :aria-label="item.title"
        :style="{ '--accent': item.category.color }"
      >
        <div class="modal__bar">
          <span class="tag" :style="{ background: item.category.tagBg, color: item.category.tagFg }">
            {{ item.category.short }}
          </span>
          <button ref="closeBtn" type="button" class="icon-btn" aria-label="Close" @click="emit('close')">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
              <path d="M24 9.4 22.6 8 16 14.6 9.4 8 8 9.4l6.6 6.6L8 22.6 9.4 24l6.6-6.6 6.6 6.6 1.4-1.4-6.6-6.6z" />
            </svg>
          </button>
        </div>

        <div class="modal__scroll">
          <figure v-if="item.media" class="modal__media">
            <img v-if="item.media.type === 'image'" :src="item.media.src" :alt="item.media.alt" />
            <video v-else :src="item.media.src" controls muted loop playsinline autoplay />
            <figcaption v-if="item.media.caption || item.media.credit">
              <span>{{ item.media.caption }}</span>
              <span v-if="item.media.credit" class="modal__credit">Credit: {{ item.media.credit }}</span>
            </figcaption>
          </figure>

          <div class="modal__content">
            <p class="eyebrow">Highlight {{ String(item.number).padStart(2, '0') }}</p>
            <h2 class="heading-04">{{ item.title }}</h2>
            <p v-for="(p, i) in item.paragraphs" :key="i" class="modal__p">{{ p }}</p>

            <div v-if="item.links.length" class="modal__links">
              <h3 class="eyebrow">Learn more on nasa.gov</h3>
              <ul>
                <li v-for="l in item.links" :key="l.href">
                  <a :href="l.href" target="_blank" rel="noopener noreferrer">{{ l.text }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="modal__nav">
          <button type="button" class="nav-btn" :disabled="!hasPrev" @click="emit('prev')">
            <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
              <path d="m14 26 1.41-1.41L7.83 17H28v-2H7.83l7.58-7.59L14 6 4 16z" />
            </svg>
            Previous
          </button>
          <button type="button" class="nav-btn" :disabled="!hasNext" @click="emit('next')">
            Next
            <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
              <path d="M18 6 16.57 7.393 24.15 15H4v2h20.15l-7.58 7.573L18 26 28 16z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(22 22 22 / 70%);
}
.modal {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--white);
  border-top: 4px solid var(--accent);
}
.modal__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 var(--sp-05);
  height: 3rem;
  border-bottom: 1px solid var(--border-subtle);
}
.tag {
  padding: 0 var(--sp-03);
  border-radius: 1rem;
  font-size: 0.75rem;
  line-height: 1.5rem;
}
.icon-btn {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border: 0;
  background: none;
  color: var(--text-primary);
  cursor: pointer;
}
.icon-btn:hover {
  background: var(--gray-10);
}
.modal__scroll {
  flex: 1;
  overflow-y: auto;
}
.modal__media {
  margin: 0;
  background: var(--gray-100);
}
.modal__media img,
.modal__media video {
  width: 100%;
  max-height: 26rem;
  object-fit: cover;
}
.modal__media figcaption {
  display: grid;
  gap: var(--sp-02);
  padding: var(--sp-04) var(--sp-05);
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--gray-30);
}
.modal__credit {
  font-family: var(--font-mono);
  color: var(--gray-50);
}
.modal__content {
  padding: var(--sp-07) var(--sp-05);
  max-width: 44rem;
}
.modal__p {
  margin: var(--sp-05) 0 0;
  font-family: var(--font-serif);
  font-size: 1.125rem;
  font-weight: 300;
  line-height: 1.55;
  color: var(--gray-90);
}
.modal__links {
  margin-top: var(--sp-07);
  padding-top: var(--sp-05);
  border-top: 1px solid var(--border-subtle);
}
.modal__links ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.modal__links li {
  padding: var(--sp-02) 0;
  font-size: 0.875rem;
}
.modal__nav {
  display: flex;
  border-top: 1px solid var(--border-subtle);
}
.nav-btn {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding: 0 var(--sp-05);
  border: 0;
  background: var(--layer);
  font-size: 0.875rem;
  color: var(--text-primary);
  cursor: pointer;
}
.nav-btn:first-child {
  border-right: 1px solid var(--border-subtle);
}
.nav-btn:hover:not(:disabled) {
  background: var(--gray-20);
}
.nav-btn:disabled {
  color: var(--gray-30);
  cursor: not-allowed;
}
@media (min-width: 42rem) {
  .modal {
    width: min(56rem, 92vw);
    height: min(52rem, 92vh);
  }
  .modal__content {
    padding: var(--sp-08);
  }
}
</style>
