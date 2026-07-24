# Feature Proposal — Demo Page Improvements

## Current State

The demo page currently has:
- A poem display (home page)
- Terms page
- Feedback form page (email, stars, feedback text)
- Basic routing (vue-router)
- Light/dark theme support (on branch `cloud/issue-31-design-updates`)
- Playwright e2e tests (on branch `cloud/playwright-tests`)
- CI: deploy to gh-pages, playwright tests (pending)

## Proposed Features

### 1. Poem of the Day
- Rotate through multiple poems, showing a different one each day
- Add a "Previous Poems" archive page listing past poems
- Store last-visited date in localStorage to show a "new poem" badge

### 2. Social Sharing
- Add share buttons (Twitter/X, Mastodon, Copy Link) below the poem
- Use the Web Share API for mobile sharing
- Generate OG meta tags for link previews

### 3. Print / Export
- "Print Poem" button that opens a print-optimized layout
- "Download as PDF" using browser print-to-PDF
- "Copy Poem" button to copy the full text to clipboard

### 4. Reading Progress
- Track which poems the user has read (localStorage)
- Show a progress indicator (e.g. "2 of 5 poems read")
- "Mark as favorite" button per poem

### 5. Search & Filter
- If the poem archive grows, add a search bar to filter by keyword
- Filter by tag/mood (if tags are added to poems)

### 6. Accessibility Enhancements
- Add an accessibility settings panel (font size, line height, contrast)
- Support keyboard shortcuts (← → for poem navigation, `t` for theme toggle)
- Add a high-contrast theme variant

### 7. Analytics (Privacy-Respecting)
- Add a minimal, privacy-respecting analytics solution (e.g. Plausible)
- Track page views and theme preference (no PII)
- Display a "stats" page showing aggregate visit counts

### 8. PWA Support
- Add a web manifest for installability
- Add a service worker for offline reading
- Enable "Add to Home Screen" on mobile

### 9. Internationalization (i18n)
- Add vue-i18n for multi-language support
- Translate the UI (header, footer, terms) into at least German and English
- Language switcher in the header

### 10. SEO Improvements
- Add dynamic `<title>` and meta description per route
- Add structured data (JSON-LD) for the poem as a CreativeWork
- Generate a sitemap.xml

## Priority

| Feature | Effort | Impact |
|--------|--------|--------|
| Print/Export | Low | High |
| Social Sharing | Low | High |
| Poem of the Day | Medium | High |
| PWA Support | Medium | Medium |
| Accessibility Panel | Medium | High |
| SEO Improvements | Low | Medium |
| Reading Progress | Low | Medium |
| i18n | High | Medium |
| Search & Filter | Medium | Low |
| Analytics | Low | Low |
