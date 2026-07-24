<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const stars = ref(0)
const feedback = ref('')
const hovered = ref(0)

function selectStars(n) {
  stars.value = n
}

function submit() {
  router.push('/')
}
</script>

<template>
  <main class="page">
    <h1>Feedback</h1>
    <form class="feedback-form" @submit.prevent="submit">
      <div class="field">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="you@example.com"
        />
      </div>

      <div class="field">
        <label>Rating</label>
        <div class="stars">
          <button
            v-for="n in 5"
            :key="n"
            type="button"
            class="star"
            :class="{ active: n <= (hovered || stars) }"
            @click="selectStars(n)"
            @mouseenter="hovered = n"
            @mouseleave="hovered = 0"
            :aria-label="`${n} star${n > 1 ? 's' : ''}`"
          >
            &#9733;
          </button>
        </div>
      </div>

      <div class="field">
        <label for="feedback">Feedback</label>
        <textarea
          id="feedback"
          v-model="feedback"
          rows="5"
          placeholder="Tell us what you think..."
        ></textarea>
      </div>

      <button type="submit" class="submit-btn">Submit</button>
    </form>
  </main>
</template>

<style scoped>
.page {
  max-width: 640px;
  margin: 0 auto;
  padding: 64px 24px;
  text-align: center;
}
.page h1 {
  font-size: 2.5rem;
  margin-bottom: 32px;
}
.feedback-form {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.field label {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-h, #08060d);
}
.field input,
.field textarea {
  font: inherit;
  padding: 10px 14px;
  border: 1px solid var(--border, #e5e4e7);
  border-radius: 8px;
  background: var(--bg, #fff);
  color: var(--text-h, #08060d);
  outline: none;
  transition: border-color 0.2s;
}
.field input:focus,
.field textarea:focus {
  border-color: var(--accent, #aa3bff);
}
.field textarea {
  resize: vertical;
}
.stars {
  display: flex;
  gap: 4px;
}
.star {
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: var(--border, #e5e4e7);
  padding: 0;
  line-height: 1;
  transition: color 0.15s;
}
.star.active {
  color: var(--accent, #aa3bff);
}
.submit-btn {
  align-self: center;
  padding: 12px 40px;
  font: inherit;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background: var(--accent, #aa3bff);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.submit-btn:hover {
  opacity: 0.9;
}
</style>
