import { test, expect } from '@playwright/test'

test('poem title and lines are rendered', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('h1')).toHaveText('A Poem')

  const poem = page.locator('.poem')
  await expect(poem).toBeVisible()

  const firstLine = poem.locator('span').first()
  await expect(firstLine).toContainText('In circuits deep and threads unseen')
})

test('poem contains all stanzas', async ({ page }) => {
  await page.goto('/')

  const poemText = await page.locator('.poem').textContent()
  expect(poemText).toContain('In circuits deep and threads unseen')
  expect(poemText).toContain('Each bug fixed brings a hopeful end')
})
