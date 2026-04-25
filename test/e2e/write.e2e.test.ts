import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

const BASE_URL = 'http://localhost:5173'

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}/write`)
  await page.waitForSelector('[data-testid="editor"]')
})

test('write page loads and editor initializes', async ({ page }) => {
  expect(await page.isVisible('[data-testid="editor"]')).toBe(true)
})

// Helper function to open slash menu and insert a block
async function insertBlock(page: Page, searchText: string) {
  // Click on the editor to focus
  await page.click('[data-slate-editor="true"]')
  // Type slash to open the menu
  await page.keyboard.type('/')
  // Wait for the combobox popover to appear
  await page.waitForSelector('[role="listbox"]', { timeout: 5000 })
  // Type to search for the block
  await page.keyboard.type(searchText)
  // Wait a bit for filtering
  await page.waitForTimeout(300)
  // Press Enter to select the first option
  await page.keyboard.press('Enter')
  // Wait for the block to be inserted
  await page.waitForTimeout(500)
}

// Helper function to select a block and delete it using keyboard shortcut
async function deleteBlock(page: Page, selector: string) {
  // Click on the block to select it
  await page.click(selector)
  // Wait for selection
  await page.waitForTimeout(200)
  // Select all content in the block
  await page.keyboard.press('Control+a')
  await page.waitForTimeout(100)
  // Press Delete to remove the block
  await page.keyboard.press('Delete')
  await page.waitForTimeout(200)
}

// ==================== BASIC BLOCKS ====================

test.describe('Paragraph Block', () => {
  test('should add paragraph block', async ({ page }) => {
    await insertBlock(page, 'paragraph')
    const paragraphs = page.locator('.slate-p')
    await expect(paragraphs).toHaveCount(2) // default + inserted
  })

  test('should delete paragraph block', async ({ page }) => {
    await insertBlock(page, 'paragraph')
    await deleteBlock(page, '.slate-p >> nth=1')
    const paragraphs = page.locator('.slate-p')
    await expect(paragraphs).toHaveCount(1)
  })
})

test.describe('Heading 1 Block', () => {
  test('should add heading 1 block', async ({ page }) => {
    await insertBlock(page, 'heading 1')
    const headings = page.locator('.slate-h1')
    await expect(headings).toHaveCount(1)
  })

  test('should delete heading 1 block', async ({ page }) => {
    await insertBlock(page, 'heading 1')
    await deleteBlock(page, '.slate-h1')
    const headings = page.locator('.slate-h1')
    await expect(headings).toHaveCount(0)
  })
})

test.describe('Heading 2 Block', () => {
  test('should add heading 2 block', async ({ page }) => {
    await insertBlock(page, 'heading 2')
    const headings = page.locator('.slate-h2')
    await expect(headings).toHaveCount(1)
  })

  test('should delete heading 2 block', async ({ page }) => {
    await insertBlock(page, 'heading 2')
    await deleteBlock(page, '.slate-h2')
    const headings = page.locator('.slate-h2')
    await expect(headings).toHaveCount(0)
  })
})

test.describe('Heading 3 Block', () => {
  test('should add heading 3 block', async ({ page }) => {
    await insertBlock(page, 'heading 3')
    const headings = page.locator('.slate-h3')
    await expect(headings).toHaveCount(1)
  })

  test('should delete heading 3 block', async ({ page }) => {
    await insertBlock(page, 'heading 3')
    await deleteBlock(page, '.slate-h3')
    const headings = page.locator('.slate-h3')
    await expect(headings).toHaveCount(0)
  })
})

test.describe('Quote Block', () => {
  test('should add quote block', async ({ page }) => {
    await insertBlock(page, 'quote')
    const quotes = page.locator('.slate-blockquote')
    await expect(quotes).toHaveCount(1)
  })

  test('should delete quote block', async ({ page }) => {
    await insertBlock(page, 'quote')
    await deleteBlock(page, '.slate-blockquote')
    const quotes = page.locator('.slate-blockquote')
    await expect(quotes).toHaveCount(0)
  })
})

test.describe('Callout Block', () => {
  test('should add callout block', async ({ page }) => {
    await insertBlock(page, 'callout')
    const callouts = page.locator('.slate-callout')
    await expect(callouts).toHaveCount(1)
  })

  test('should delete callout block', async ({ page }) => {
    await insertBlock(page, 'callout')
    await deleteBlock(page, '.slate-callout')
    const callouts = page.locator('.slate-callout')
    await expect(callouts).toHaveCount(0)
  })
})

test.describe('Table Block', () => {
  test('should add table block', async ({ page }) => {
    await insertBlock(page, 'table')
    const tables = page.locator('.slate-table')
    await expect(tables).toHaveCount(1)
  })

  test('should delete table block', async ({ page }) => {
    await insertBlock(page, 'table')
    await deleteBlock(page, '.slate-table')
    const tables = page.locator('.slate-table')
    await expect(tables).toHaveCount(0)
  })
})

test.describe('Code Block', () => {
  test('should add code block', async ({ page }) => {
    await insertBlock(page, 'code block')
    const codeBlocks = page.locator('.slate-code_block')
    await expect(codeBlocks).toHaveCount(1)
  })

  test('should delete code block', async ({ page }) => {
    await insertBlock(page, 'code block')
    await deleteBlock(page, '.slate-code_block')
    const codeBlocks = page.locator('.slate-code_block')
    await expect(codeBlocks).toHaveCount(0)
  })
})

// ==================== LISTS ====================

test.describe('Unordered List Block', () => {
  test('should add unordered list block', async ({ page }) => {
    await insertBlock(page, 'unordered')
    const lists = page.locator('ul')
    await expect(lists).toHaveCount(1)
  })

  test('should delete unordered list block', async ({ page }) => {
    await insertBlock(page, 'unordered')
    await deleteBlock(page, 'ul')
    const lists = page.locator('ul')
    await expect(lists).toHaveCount(0)
  })
})

test.describe('Ordered List Block', () => {
  test('should add ordered list block', async ({ page }) => {
    await insertBlock(page, 'ordered')
    const lists = page.locator('ol')
    await expect(lists).toHaveCount(1)
  })

  test('should delete ordered list block', async ({ page }) => {
    await insertBlock(page, 'ordered')
    await deleteBlock(page, 'ol')
    const lists = page.locator('ol')
    await expect(lists).toHaveCount(0)
  })
})

test.describe('Todo List Block', () => {
  test('should add todo list block', async ({ page }) => {
    await insertBlock(page, 'todo')
    const lists = page.locator('li')
    await expect(lists).toHaveCount(1)
  })

  test('should delete todo list block', async ({ page }) => {
    await insertBlock(page, 'todo')
    await deleteBlock(page, 'li')
    const lists = page.locator('li')
    await expect(lists).toHaveCount(0)
  })
})

test.describe('Toggle List Block', () => {
  test('should add toggle list block', async ({ page }) => {
    await insertBlock(page, 'toggle')
    const toggles = page.locator('.slate-toggle')
    await expect(toggles).toHaveCount(1)
  })

  test('should delete toggle list block', async ({ page }) => {
    await insertBlock(page, 'toggle')
    await deleteBlock(page, '.slate-toggle')
    const toggles = page.locator('.slate-toggle')
    await expect(toggles).toHaveCount(0)
  })
})

// ==================== ADVANCED BLOCKS ====================

test.describe('Table of Contents Block', () => {
  test('should add table of contents block', async ({ page }) => {
    await insertBlock(page, 'table of contents')
    const tocs = page.locator('.slate-toc')
    await expect(tocs).toHaveCount(1)
  })

  test('should delete table of contents block', async ({ page }) => {
    await insertBlock(page, 'table of contents')
    await deleteBlock(page, '.slate-toc')
    const tocs = page.locator('.slate-toc')
    await expect(tocs).toHaveCount(0)
  })
})

test.describe('Columns Block', () => {
  test('should add columns block', async ({ page }) => {
    await insertBlock(page, '3 columns')
    const columns = page.locator('.slate-column_group')
    await expect(columns).toHaveCount(1)
  })

  test('should delete columns block', async ({ page }) => {
    await insertBlock(page, '3 columns')
    await deleteBlock(page, '.slate-column_group')
    const columns = page.locator('.slate-column_group')
    await expect(columns).toHaveCount(0)
  })
})

test.describe('Equation Block', () => {
  test('should add equation block', async ({ page }) => {
    await insertBlock(page, 'equation')
    const equations = page.locator('.slate-equation')
    await expect(equations).toHaveCount(1)
  })

  test('should delete equation block', async ({ page }) => {
    await insertBlock(page, 'equation')
    // Equation block has contentEditable=false, so we need to position cursor before it and press Delete twice
    await page.click('[data-slate-editor="true"]')
    await page.waitForTimeout(200)
    await page.keyboard.press('ArrowDown')
    await page.waitForTimeout(200)
    await page.click('.slate-p')
    await page.waitForTimeout(200)
    await page.keyboard.press('End')
    await page.waitForTimeout(200)
    // First Delete removes the empty paragraph, second Delete removes the equation
    await page.keyboard.press('Delete')
    await page.waitForTimeout(200)
    await page.keyboard.press('Delete')
    await page.waitForTimeout(200)
    const equations = page.locator('.slate-equation')
    await expect(equations).toHaveCount(0)
  })
})

test.describe('Excalidraw Block', () => {
  test('should add excalidraw block', async ({ page }) => {
    await insertBlock(page, 'whiteboard')
    const excalidraws = page.locator('.slate-excalidraw')
    await expect(excalidraws).toHaveCount(1)
  })

  test('should delete excalidraw block', async ({ page }) => {
    await insertBlock(page, 'whiteboard')
    // Excalidraw block has contentEditable=false, so we need to position cursor before it and press Delete twice
    await page.click('[data-slate-editor="true"]')
    await page.waitForTimeout(200)
    await page.keyboard.press('ArrowDown')
    await page.waitForTimeout(200)
    await page.click('.slate-p')
    await page.waitForTimeout(200)
    await page.keyboard.press('End')
    await page.waitForTimeout(200)
    // First Delete removes the empty paragraph, second Delete removes the excalidraw
    await page.keyboard.press('Delete')
    await page.waitForTimeout(200)
    await page.keyboard.press('Delete')
    await page.waitForTimeout(200)
    const excalidraws = page.locator('.slate-excalidraw')
    await expect(excalidraws).toHaveCount(0)
  })
})

// ==================== INLINE ELEMENTS ====================

test.describe('Date Inline Element', () => {
  test('should add date inline element', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.keyboard.type('/')
    await page.waitForSelector('[role="listbox"]', { timeout: 5000 })
    await page.keyboard.type('date')
    await page.waitForTimeout(300)
    await page.keyboard.press('Enter')
    await page.waitForTimeout(500)
    const dates = page.locator('.slate-date')
    await expect(dates).toHaveCount(1)
  })

  test('should delete date inline element', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.keyboard.type('/')
    await page.waitForSelector('[role="listbox"]', { timeout: 5000 })
    await page.keyboard.type('date')
    await page.waitForTimeout(300)
    await page.keyboard.press('Enter')
    await page.waitForTimeout(500)
    // Date inline element needs special handling: focus editor, go to end, press Backspace twice
    await page.click('[data-slate-editor="true"]')
    await page.waitForTimeout(200)
    await page.keyboard.press('End')
    await page.waitForTimeout(200)
    await page.keyboard.press('Backspace')
    await page.waitForTimeout(200)
    await page.keyboard.press('Backspace')
    await page.waitForTimeout(200)
    const dates = page.locator('.slate-date')
    await expect(dates).toHaveCount(0)
  })
})

test.describe('Keyboard Input Inline Element', () => {
  test('should add keyboard input inline element', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.keyboard.type('/')
    await page.waitForSelector('[role="listbox"]', { timeout: 5000 })
    await page.keyboard.type('keyboard')
    await page.waitForTimeout(300)
    await page.keyboard.press('Enter')
    await page.waitForTimeout(500)
    const kbds = page.locator('.slate-kbd')
    await expect(kbds).toHaveCount(1)
  })

  test('should delete keyboard input inline element', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.keyboard.type('/')
    await page.waitForSelector('[role="listbox"]', { timeout: 5000 })
    await page.keyboard.type('keyboard')
    await page.waitForTimeout(300)
    await page.keyboard.press('Enter')
    await page.waitForTimeout(500)
    // KBD inline element needs special handling: focus editor, go to end, press Delete
    await page.click('[data-slate-editor="true"]')
    await page.waitForTimeout(200)
    await page.keyboard.press('End')
    await page.waitForTimeout(200)
    await page.keyboard.press('Delete')
    await page.waitForTimeout(200)
    const kbds = page.locator('.slate-kbd')
    await expect(kbds).toHaveCount(0)
  })
})
