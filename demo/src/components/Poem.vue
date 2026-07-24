<script setup>
const title = 'A Poem'
const lines = [
  'In circuits deep and threads unseen,',
  'A quiet thought begins to gleam.',
  'From line to line, the code takes flight—',
  'A small spark born to find the light.',
  '',
  'It hums through silicon and wire,',
  'Fueled by coffee, fueled by fire.',
  'And though the hours stretch and bend,',
  'Each bug fixed brings a hopeful end.',
]
</script>

<template>
  <main>
    <h1>{{ title }}</h1>
    <pre class="poem"><span v-for="(line, i) in lines" :key="i">{{ line }}<br /></span></pre>
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
