<script setup>
const lastUpdated = '2026-07-24'
</script>

<template>
  <main class="page">
    <h1>Terms</h1>
    <div class="content">
      <p><strong>Last updated:</strong> {{ lastUpdated }}</p>
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing this poem demo application, you agree to these terms.
        This is a demo project and not a commercial service.
      </p>
      <h2>2. Use of Content</h2>
      <p>
        The poem displayed on this site is for demonstration purposes only.
        You may not reproduce it without attribution.
      </p>
      <h2>3. Privacy</h2>
      <p>
        This demo does not collect personal data. No cookies or tracking
        mechanisms are used.
      </p>
      <h2>4. Disclaimer</h2>
      <p>
        The application is provided "as is" without warranty of any kind.
      </p>
    </div>
  </main>
</template>

<style scoped>
.page {
  max-width: 720px;
  margin: 0 auto;
  padding: 64px 24px;
  text-align: left;
}
.page h1 {
  font-size: 2.5rem;
  margin-bottom: 32px;
  text-align: center;
}
.content h2 {
  margin: 24px 0 8px;
}
.content p {
  color: var(--text, #6b6375);
  line-height: 1.6;
}
</style>
