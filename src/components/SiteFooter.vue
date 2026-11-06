<script setup>
defineProps({ sourceUrl: String, origin: String })
</script>

<template>
  <footer class="footer dark">
    <div class="container footer__grid">
      <div>
        <p class="footer__title">NASA Ames 2025 discoveries</p>
        <p class="footer__text">
          Content and imagery are from NASA and are shown here for informational purposes. Design follows IBM Design
          Language colors, IBM Plex type and 8px grid; no Carbon components are used.
        </p>
      </div>
      <div>
        <p class="footer__label">Source</p>
        <a :href="sourceUrl" target="_blank" rel="noopener noreferrer">2025 in Review: Highlights from NASA in Silicon Valley</a>
        <p class="footer__data">
          Data: {{ origin === 'live' ? 'live from NASA.gov' : 'bundled snapshot (offline fallback)' }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: var(--sp-09) 0;
  background: var(--gray-100);
  color: var(--gray-30);
  font-size: 0.875rem;
}
.footer__grid {
  display: grid;
  gap: var(--sp-07);
}
.footer__title {
  margin: 0 0 var(--sp-03);
  font-size: 1rem;
  color: var(--white);
}
.footer__text {
  max-width: 32rem;
  margin: 0;
  line-height: 1.5;
}
.footer__label {
  margin: 0 0 var(--sp-03);
  font-size: 0.75rem;
  letter-spacing: 0.32px;
  text-transform: uppercase;
  color: var(--gray-50);
}
.footer a {
  color: var(--blue-40);
}
.footer__data {
  margin: var(--sp-03) 0 0;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--gray-50);
}
@media (min-width: 42rem) {
  .footer__grid {
    grid-template-columns: 2fr 1fr;
  }
}
</style>
