<script setup>
const story = [
  'In the winter of 1943, little Anna sat by the flickering candle,',
  'her fingers tracing letters in the frost on the windowpane.',
  'Outside, the distant hum of planes painted the sky with shadows,',
  'but inside, her mother\'s lullaby wove a cocoon of warmth.',
  'She kept a small tin box beneath the floorboard — a pencil stub,',
  'a folded drawing of her father, and a single page of arithmetic.',
  'Each night she added a line to a story only she could read,',
  'a tale of a girl who rode paper cranes across the sleeping city.',
  'When the war ended, she walked to school on roads she barely knew,',
  'and the tin box became a book, and the book became a life.',
]
</script>

<template>
  <div class="background-story" aria-hidden="true">
    <p v-for="(line, i) in story" :key="i">{{ line }}</p>
  </div>
</template>

<style scoped>
.background-story {
  position: fixed;
  inset: 0;
  z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  pointer-events: none;
  overflow: hidden;
}
.background-story p {
  font-family: var(--mono, ui-monospace, monospace);
  font-size: 0.85rem;
  line-height: 2;
  color: var(--text, #6b6375);
  opacity: 0.04;
  text-align: center;
  white-space: nowrap;
}
</style>
