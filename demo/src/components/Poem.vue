<script setup>
import { ref, onMounted } from 'vue'

const title = 'A Poem'
const lines = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await fetch('/README.md')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const text = await res.text()
    const body = text.split(/^##\s+A Poem\s*$/m)[1] ?? text
    lines.value = body
      .split('\n')
      .map((l) => l.trimEnd())
      .filter((l) => l.trim() !== '')
    error.value = ''
  } catch (e) {
    error.value = `Could not load poem: ${e.message}`
    lines.value = []
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main>
    <h1>{{ title }}</h1>
    <p v-if="loading" class="state">Loading…</p>
    <p v-else-if="error" class="state error">{{ error }}</p>
    <pre v-else class="poem"><span v-for="(line, i) in lines" :key="i">{{ line }}<br /></span></pre>
  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
  padding: 64px 24px;
  text-align: center;
}
h1 {
  font-size: 2.5rem;
  margin-bottom: 32px;
}
.state {
  color: var(--text);
}
.error {
  color: #dc2626;
}
.poem {
  font-family: var(--mono, ui-monospace, Consolas, monospace);
  font-size: 1.15rem;
  line-height: 1.8;
  text-align: left;
  white-space: pre-wrap;
  background: var(--code-bg, #f4f3ec);
  color: var(--text-h, #08060d);
  padding: 24px 32px;
  border-radius: 12px;
  border: 1px solid var(--border, #e5e4e7);
}
</style>
