<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BackgroundStory from './components/BackgroundStory.vue'
</script>

<template>
  <BackgroundStory />
  <header class="site-header">
    <RouterLink to="/" class="brand">A Poem</RouterLink>
    <nav>
      <RouterLink to="/feedback">Feedback</RouterLink>
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
.site-header nav a {
  color: var(--accent, #aa3bff);
  text-decoration: none;
  font-size: 0.95rem;
}
.site-header nav a:hover {
  text-decoration: underline;
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
