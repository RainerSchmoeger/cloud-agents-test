<script setup>
const lastUpdated = '2026-07-24'
</script>

<template>
  <main id="main-content" class="page">
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
      <h2>5. Intellectual Property</h2>
      <p>
        All content, including the poem and design elements, is owned by the
        repository owner. You may not copy, modify, or distribute it without
        permission.
      </p>
      <h2>6. Limitation of Liability</h2>
      <p>
        The repository owner shall not be liable for any damages arising from
        the use of this demo application.
      </p>
      <h2>7. Changes to Terms</h2>
      <p>
        These terms may be updated at any time. Continued use of the
        application constitutes acceptance of the updated terms.
      </p>
      <h2>8. Contact</h2>
      <p>
        For questions about these terms, please open an issue on the
        <a href="https://github.com/RainerSchmoeger/cloud-agents-test">GitHub repository</a>.
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
