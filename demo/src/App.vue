<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useTheme } from './composables/useTheme'

const { theme } = useTheme()

function cycleTheme() {
  const order = ['auto', 'light', 'dark']
  const idx = order.indexOf(theme.value)
  theme.value = order[(idx + 1) % order.length]
}

const themeLabel = {
  auto: 'Auto',
  light: 'Light',
  dark: 'Dark',
}
</script>

<template>
  <a href="#main-content" class="skip-link">Skip to content</a>
  <header class="site-header">
    <RouterLink to="/" class="brand" aria-label="A Poem — home">A Poem</RouterLink>
    <nav aria-label="Main navigation">
      <RouterLink to="/feedback">Feedback</RouterLink>
      <button
        class="theme-toggle"
        @click="cycleTheme"
        :aria-label="`Theme: ${themeLabel[theme]}. Click to change.`"
      >
        {{ themeLabel[theme] }}
      </button>
    </nav>
  </header>
  <RouterView />
  <footer class="site-footer">
    <RouterLink to="/terms">Terms</RouterLink>
  </footer>
</template>

<style scoped>
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 56px;
  border-bottom: 1px solid var(--border, #e5e4e7);
}
.site-header .brand {
  font-family: var(--heading, system-ui, sans-serif);
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--text-h, #08060d);
  text-decoration: none;
}
.site-header nav {
  display: flex;
  align-items: center;
  gap: 16px;
}
.site-header nav a {
  color: var(--accent, #aa3bff);
  text-decoration: none;
  font-size: 0.95rem;
}
.site-header nav a:hover {
  text-decoration: underline;
}
.theme-toggle {
  background: var(--accent-bg, rgba(170, 59, 255, 0.1));
  color: var(--accent, #aa3bff);
  border: 1px solid var(--accent-border, rgba(170, 59, 255, 0.5));
  border-radius: 6px;
  padding: 4px 12px;
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
  min-width: 60px;
}
.theme-toggle:hover {
  background: var(--accent, #aa3bff);
  color: #fff;
}
.site-footer {
  border-top: 1px solid var(--border, #e5e4e7);
  padding: 16px 24px;
  text-align: center;
}
.site-footer a {
  color: var(--accent, #aa3bff);
  text-decoration: none;
  font-size: 0.9rem;
}
.site-footer a:hover {
  text-decoration: underline;
}
</style>
