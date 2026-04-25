import { expect, test } from '@playwright/test'

const BASE_URL = 'http://localhost:5173'

test('write page loads and editor initializes', async ({ page }) => {
  await page.goto(`${BASE_URL}/write`)

  await page.waitForSelector('[data-testid="editor"]')

  expect(await page.isVisible('[data-testid="editor"]')).toBe(true)

  console.log('Page structure:', await page.content())
})

test('write page has correct structure', async ({ page }) => {
  await page.goto(`${BASE_URL}/write`)

  await page.waitForLoadState('networkidle')

  expect(await page.isVisible('[data-testid="write-page"]')).toBe(true)

  expect(await page.isVisible('[data-testid="editor"]')).toBe(true)

  const elements = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('*'))
      .map((el) => {
        return {
          tag: el.tagName,
          class: el.className,
          testid: el.dataset.testid,
        }
      })
      .filter((el) => el.testid || el.class)
  })
  console.log('Visible elements:', elements)
})
