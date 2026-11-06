<script setup>
defineProps({ sourceUrl: String })
</script>

<template>
  <header class="header dark">
    <a class="skip" href="#highlights">Skip to highlights</a>
    <div class="container header__inner">
      <a class="header__name" href="#top"><span>NASA Ames</span>&nbsp;2025 discoveries</a>
      <nav class="header__nav" aria-label="Page sections">
        <a href="#key-figures">Key figures</a>
        <a href="#highlights">Highlights</a>
        <a :href="sourceUrl" target="_blank" rel="noopener noreferrer">Source</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--header-height);
  background: var(--gray-100);
  color: var(--gray-10);
  border-bottom: 1px solid var(--gray-80);
}
.header__inner {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.header__name {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--gray-10);
  text-decoration: none;
}
.header__name span {
  font-weight: 600;
}
.header__nav {
  display: flex;
  height: 100%;
}
.header__nav a {
  display: flex;
  align-items: center;
  padding: 0 var(--sp-05);
  font-size: 0.875rem;
  color: var(--gray-30);
  text-decoration: none;
  transition: background 110ms, color 110ms;
}
.header__nav a:hover {
  background: var(--gray-80);
  color: var(--white);
}
.skip {
  position: absolute;
  left: -999px;
  top: 0;
  background: var(--blue-60);
  color: var(--white);
  padding: var(--sp-03) var(--sp-05);
  z-index: 200;
}
.skip:focus {
  left: 0;
}
@media (max-width: 41.98rem) {
  .header__nav a:first-child {
    display: none;
  }
}
</style>
