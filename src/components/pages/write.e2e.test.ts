import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:5173'

test('write page loads and editor initializes', async ({ page }) => {
  // Navigate to write page
  await page.goto(`${BASE_URL}/write`)
  
  // Wait for editor initialization
  await page.waitForSelector('[data-testid="editor"]')
  
  // Verify editor exists
  expect(await page.isVisible('[data-testid="editor"]')).toBe(true)
  
  // Print page structure for debugging
  console.log('Page structure:', await page.content())
})

test('write page has correct structure', async ({ page }) => {
  await page.goto(`${BASE_URL}/write`)
  
  // Wait for page to load completely
  await page.waitForLoadState('networkidle')
  
  // Verify write page container exists
  expect(await page.isVisible('[data-testid="write-page"]')).toBe(true)
  
  // Verify editor container exists
  expect(await page.isVisible('[data-testid="editor"]')).toBe(true)
  
  // Print all visible elements for debugging
  const elements = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('*')).map(el => {
      return {
        tag: el.tagName,
        class: el.className,
        testid: el.dataset.testid
      }
    }).filter(el => el.testid || el.class)
  })
  console.log('Visible elements:', elements)
})
