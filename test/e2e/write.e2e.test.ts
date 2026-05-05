import * as fs from 'node:fs'
import * as path from 'node:path'
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

async function insertBlock(page: Page, searchText: string) {
  await page.click('[data-slate-editor="true"]')
  await page.keyboard.type('/')
  await page.waitForSelector('[role="listbox"]', { timeout: 5000 })
  await page.keyboard.type(searchText)
  await page.waitForTimeout(300)
  await page.keyboard.press('Enter')
  await page.waitForTimeout(500)
}

async function deleteBlock(page: Page, selector: string) {
  await page.click(selector)
  await page.waitForTimeout(200)
  await page.keyboard.press('Control+a')
  await page.waitForTimeout(100)
  await page.keyboard.press('Delete')
  await page.waitForTimeout(200)
}

// ==================== BASIC BLOCKS ====================

test.describe('Paragraph Block', () => {
  test('should add paragraph block', async ({ page }) => {
    await insertBlock(page, 'paragraph')
    const paragraphs = page.locator('.slate-p')
    await expect(paragraphs).toHaveCount(2)
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
    await page.click('[data-slate-editor="true"]')
    await page.waitForTimeout(200)
    await page.keyboard.press('ArrowDown')
    await page.waitForTimeout(200)
    await page.click('.slate-p')
    await page.waitForTimeout(200)
    await page.keyboard.press('End')
    await page.waitForTimeout(200)
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
    await page.click('[data-slate-editor="true"]')
    await page.waitForTimeout(200)
    await page.keyboard.press('ArrowDown')
    await page.waitForTimeout(200)
    await page.click('.slate-p')
    await page.waitForTimeout(200)
    await page.keyboard.press('End')
    await page.waitForTimeout(200)
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

// ==================== TEXT FORMATTING ====================

test.describe('Text Formatting', () => {
  test('should apply bold formatting and verify editor state', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.keyboard.type('Hello World')
    await page.waitForTimeout(200)
    await page.keyboard.press('Control+a')
    await page.waitForTimeout(200)
    await page.keyboard.press('Control+b')
    await page.waitForTimeout(300)
    const editorContent = await page.locator('[data-slate-editor="true"]').textContent()
    expect(editorContent).toContain('Hello World')
  })

  test('should apply italic formatting', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.keyboard.type('Hello World')
    await page.waitForTimeout(200)
    await page.keyboard.press('Control+a')
    await page.waitForTimeout(200)
    await page.keyboard.press('Control+i')
    await page.waitForTimeout(300)
    const editorContent = await page.locator('[data-slate-editor="true"]').textContent()
    expect(editorContent).toContain('Hello World')
  })

  test('should apply underline formatting', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.keyboard.type('Hello World')
    await page.waitForTimeout(200)
    await page.keyboard.press('Control+a')
    await page.waitForTimeout(200)
    await page.keyboard.press('Control+u')
    await page.waitForTimeout(300)
    const editorContent = await page.locator('[data-slate-editor="true"]').textContent()
    expect(editorContent).toContain('Hello World')
  })

  test('should apply strikethrough formatting', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.keyboard.type('Hello World')
    await page.waitForTimeout(200)
    await page.keyboard.press('Control+a')
    await page.waitForTimeout(200)
    await page.keyboard.press('Control+Shift+x')
    await page.waitForTimeout(300)
    const editorContent = await page.locator('[data-slate-editor="true"]').textContent()
    expect(editorContent).toContain('Hello World')
  })
})

// ==================== LINK FUNCTIONALITY ====================

test.describe('Link Functionality', () => {
  test('should open link toolbar using keyboard shortcut', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.keyboard.type('Click me')
    await page.waitForTimeout(200)
    await page.keyboard.press('Control+a')
    await page.waitForTimeout(200)
    await page.keyboard.press('Control+k')
    await page.waitForTimeout(500)
    const linkToolbar = page.locator('[data-plate-focus]')
    await expect(linkToolbar).toBeVisible()
  })

  test('should insert link and verify editor content', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.keyboard.type('Click me')
    await page.waitForTimeout(200)
    await page.keyboard.press('Control+a')
    await page.waitForTimeout(200)
    await page.keyboard.press('Control+k')
    await page.waitForTimeout(500)
    const urlInput = page.locator('[data-plate-focus][placeholder*="link"]')
    if (await urlInput.isVisible()) {
      await urlInput.fill('https://example.com')
      await page.waitForTimeout(200)
      await page.keyboard.press('Escape')
      await page.waitForTimeout(500)
      const editorContent = await page.locator('[data-slate-editor="true"]').textContent()
      expect(editorContent).toContain('Click me')
    } else {
      test.skip()
    }
  })
})

// ==================== THEME SWITCHING ====================

test.describe('Theme Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/write`)
    await page.waitForSelector('[data-testid="editor"]')
  })

  test('should toggle from light to dark theme', async ({ page }) => {
    const toggleButton = page.locator('[data-testid="theme-toggle"]').first()
    await expect(toggleButton).toBeVisible()
    const initialHtmlClass = await page.locator('html').getAttribute('class')
    expect(initialHtmlClass).not.toContain('dark')
    await toggleButton.click()
    await page.waitForTimeout(500)
    const darkHtmlClass = await page.locator('html').getAttribute('class')
    expect(darkHtmlClass).toContain('dark')
  })

  test('should toggle from dark to light theme', async ({ page }) => {
    const toggleButton = page.locator('[data-testid="theme-toggle"]').first()
    await expect(toggleButton).toBeVisible()
    await toggleButton.click()
    await page.waitForTimeout(500)
    expect(await page.locator('html').getAttribute('class')).toContain('dark')
    await toggleButton.click()
    await page.waitForTimeout(500)
    const htmlClass = await page.locator('html').getAttribute('class')
    expect(htmlClass).not.toContain('dark')
  })

  test('should persist theme preference after reload', async ({ page }) => {
    const toggleButton = page.locator('[data-testid="theme-toggle"]').first()
    await toggleButton.click()
    await page.waitForTimeout(500)
    await page.reload()
    await page.waitForSelector('[data-testid="editor"]')
    const htmlClass = await page.locator('html').getAttribute('class')
    expect(htmlClass).toContain('dark')
  })
})

// ==================== MEDIA UPLOAD ====================

test.describe('Media Upload', () => {
  test('should insert date inline element using slash command', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.waitForTimeout(200)
    await page.keyboard.type('/date')
    await page.waitForSelector('[role="listbox"]', { timeout: 5000 })
    await page.keyboard.press('Enter')
    await page.waitForTimeout(500)
    const dates = page.locator('.slate-date')
    await expect(dates).toHaveCount(1)
  })

  test('should insert keyboard inline element using slash command', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.waitForTimeout(200)
    await page.keyboard.type('/kbd')
    await page.waitForSelector('[role="listbox"]', { timeout: 5000 })
    await page.keyboard.press('Enter')
    await page.waitForTimeout(500)
    const kbds = page.locator('.slate-kbd')
    await expect(kbds).toHaveCount(1)
  })
})

// ==================== IMPORT/EXPORT ====================

test.describe('Import JSON', () => {
  test('should import JSON file with excalidraw content without error', async ({ page }) => {
    const consoleErrors: string[] = []
    const consoleWarnings: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text())
      }
    })

    await page.goto(`${BASE_URL}/write`)
    await page.waitForSelector('[data-testid="editor"]')

    const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z])\//, '$1:/')
    const jsonFilePath = path.join(__dirname, '../../test/fixtures/excalidraw-test-data.json')
    const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8')

    await page.evaluate((json: string) => {
      const event = new CustomEvent('import-json-test', { detail: json })
      document.dispatchEvent(event)
    }, jsonContent)

    await page.waitForTimeout(3000)

    if (consoleErrors.length > 0) {
      console.log('=== Console Errors ===')
      consoleErrors.forEach((err, index) => {
        console.log(`${index + 1}. ${err}`)
      })
    }

    if (consoleWarnings.length > 0) {
      console.log('=== Console Warnings ===')
      consoleWarnings.forEach((warn, index) => {
        console.log(`${index + 1}. ${warn}`)
      })
    }

    const excalidrawElements = page.locator('.slate-excalidraw')
    const excalidrawCount = await excalidrawElements.count()
    console.log(`Excalidraw elements found: ${excalidrawCount}`)

    const hasErrors = consoleErrors.some(
      (err) =>
        err.includes('excalidraw') ||
        err.includes('Cannot read') ||
        err.includes('undefined') ||
        err.includes('is not a function') ||
        err.includes('TypeError'),
    )

    expect(hasErrors).toBe(false)
    expect(excalidrawCount).toBeGreaterThan(0)
  })
})

test.describe('Import HTML', () => {
  test('should import HTML file without error', async ({ page }) => {
    const consoleErrors: string[] = []
    const consoleWarnings: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text())
      }
    })

    await page.goto(`${BASE_URL}/write`)
    await page.waitForSelector('[data-testid="editor"]')

    const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z])\//, '$1:/')
    const htmlFilePath = path.join(__dirname, '../../test/fixtures/test.html')
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8')

    await page.evaluate((html: string) => {
      const event = new CustomEvent('import-html-test', { detail: html })
      document.dispatchEvent(event)
    }, htmlContent)

    await page.waitForTimeout(3000)

    if (consoleErrors.length > 0) {
      console.log('=== Console Errors ===')
      consoleErrors.forEach((err, index) => {
        console.log(`${index + 1}. ${err}`)
      })
    }

    if (consoleWarnings.length > 0) {
      console.log('=== Console Warnings ===')
      consoleWarnings.forEach((warn, index) => {
        console.log(`${index + 1}. ${warn}`)
      })
    }

    const hasErrors = consoleErrors.length > 0
    expect(hasErrors).toBe(false)
  })
})

test.describe('Import Markdown', () => {
  test('should import Markdown file without error', async ({ page }) => {
    const consoleErrors: string[] = []
    const consoleWarnings: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text())
      }
    })

    await page.goto(`${BASE_URL}/write`)
    await page.waitForSelector('[data-testid="editor"]')

    const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z])\//, '$1:/')
    const mdFilePath = path.join(__dirname, '../../test/fixtures/test.md')
    const mdContent = fs.readFileSync(mdFilePath, 'utf-8')

    await page.evaluate((markdown: string) => {
      const event = new CustomEvent('import-markdown-test', { detail: markdown })
      document.dispatchEvent(event)
    }, mdContent)

    await page.waitForTimeout(3000)

    if (consoleErrors.length > 0) {
      console.log('=== Console Errors ===')
      consoleErrors.forEach((err, index) => {
        console.log(`${index + 1}. ${err}`)
      })
    }

    if (consoleWarnings.length > 0) {
      console.log('=== Console Warnings ===')
      consoleWarnings.forEach((warn, index) => {
        console.log(`${index + 1}. ${warn}`)
      })
    }

    const hasErrors = consoleErrors.length > 0
    expect(hasErrors).toBe(false)
  })
})

// ==================== BASIC EDITING ====================

test.describe('Undo/Redo', () => {
  test('should undo text input', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.keyboard.type('Hello World')
    await page.waitForTimeout(200)
    const editorContent = await page.locator('[data-slate-editor="true"]').textContent()
    expect(editorContent).toContain('Hello World')

    await page.keyboard.press('Control+z')
    await page.waitForTimeout(300)
  })

  test('should redo after undo', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.keyboard.type('Hello World')
    await page.waitForTimeout(200)

    await page.keyboard.press('Control+z')
    await page.waitForTimeout(300)

    await page.keyboard.press('Control+Shift+z')
    await page.waitForTimeout(300)
  })

  test('should undo block insertion', async ({ page }) => {
    await insertBlock(page, 'heading 1')
    await page.waitForTimeout(200)
    let headings = page.locator('.slate-h1')
    await expect(headings).toHaveCount(1)

    await page.keyboard.press('Control+z')
    await page.waitForTimeout(300)
    headings = page.locator('.slate-h1')
    await expect(headings).toHaveCount(0)
  })
})

test.describe('Text Input', () => {
  test('should type text into editor', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.keyboard.type('Test text input')
    await page.waitForTimeout(200)

    const editorContent = await page.locator('[data-slate-editor="true"]').textContent()
    expect(editorContent).toContain('Test text input')
  })
})

test.describe('Block Splitting', () => {
  test('should split paragraph block with Enter key', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.keyboard.type('First part')
    await page.waitForTimeout(200)
    await page.keyboard.press('Enter')
    await page.waitForTimeout(200)
    await page.keyboard.type('Second part')
    await page.waitForTimeout(200)

    const paragraphs = page.locator('.slate-p')
    await expect(paragraphs).toHaveCount(2)
  })
})

// ==================== 完整工具栏按钮测试 ====================

async function typeTextAndSelect(page: Page, text: string) {
  await page.click('[data-slate-editor="true"]')
  await page.keyboard.type(text)
  await page.waitForTimeout(200)
  await page.keyboard.press('Control+a')
  await page.waitForTimeout(200)
}

test.describe('Toolbar: Undo/Redo Buttons', () => {
  test('should undo text using toolbar undo button', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.keyboard.type('Test content')
    await page.waitForTimeout(200)

    const undoButton = page.locator('[data-testid="toolbar-undo"]')
    await expect(undoButton).toBeVisible()
    await undoButton.click()
    await page.waitForTimeout(300)

    const editorContent = await page.locator('[data-slate-editor="true"]').textContent()
    expect(editorContent).not.toContain('Test content')
  })

  test('should redo using toolbar redo button', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.keyboard.type('Test content')
    await page.waitForTimeout(200)

    const undoButton = page.locator('[data-testid="toolbar-undo"]')
    const redoButton = page.locator('[data-testid="toolbar-redo"]')

    await undoButton.click()
    await page.waitForTimeout(300)

    await redoButton.click()
    await page.waitForTimeout(300)

    const editorContent = await page.locator('[data-slate-editor="true"]').textContent()
    expect(editorContent).toContain('Test content')
  })
})

test.describe('Toolbar: Mode Toggle Button', () => {
  test('should toggle between edit and view mode', async ({ page }) => {
    const modeButton = page.locator('[data-testid="toolbar-mode-toggle"]')
    await expect(modeButton).toBeVisible()

    await modeButton.click()
    await page.waitForTimeout(200)

    await page.click('[data-slate-editor="true"]')
    await page.waitForTimeout(200)

    await modeButton.click()
    await page.waitForTimeout(200)
  })
})

test.describe('Toolbar: Text Formatting Buttons', () => {
  test('should apply bold using toolbar button', async ({ page }) => {
    await typeTextAndSelect(page, 'Bold text')

    const boldButton = page.locator('[data-testid="toolbar-bold"]')
    await expect(boldButton).toBeVisible()
    await boldButton.click()
    await page.waitForTimeout(300)

    const editorContent = await page.locator('[data-slate-editor="true"]').textContent()
    expect(editorContent).toContain('Bold text')
  })

  test('should apply italic using toolbar button', async ({ page }) => {
    await typeTextAndSelect(page, 'Italic text')

    const italicButton = page.locator('[data-testid="toolbar-italic"]')
    await expect(italicButton).toBeVisible()
    await italicButton.click()
    await page.waitForTimeout(300)

    const editorContent = await page.locator('[data-slate-editor="true"]').textContent()
    expect(editorContent).toContain('Italic text')
  })

  test('should apply underline using toolbar button', async ({ page }) => {
    await typeTextAndSelect(page, 'Underline text')

    const underlineButton = page.locator('[data-testid="toolbar-underline"]')
    await expect(underlineButton).toBeVisible()
    await underlineButton.click()
    await page.waitForTimeout(300)

    const editorContent = await page.locator('[data-slate-editor="true"]').textContent()
    expect(editorContent).toContain('Underline text')
  })

  test('should apply strikethrough using toolbar button', async ({ page }) => {
    await typeTextAndSelect(page, 'Strikethrough text')

    const strikethroughButton = page.locator('[data-testid="toolbar-strikethrough"]')
    await expect(strikethroughButton).toBeVisible()
    await strikethroughButton.click()
    await page.waitForTimeout(300)

    const editorContent = await page.locator('[data-slate-editor="true"]').textContent()
    expect(editorContent).toContain('Strikethrough text')
  })

  test('should apply inline code using toolbar button', async ({ page }) => {
    await typeTextAndSelect(page, 'Code text')

    const codeButton = page.locator('[data-testid="toolbar-code"]')
    await expect(codeButton).toBeVisible()
    await codeButton.click()
    await page.waitForTimeout(300)

    const editorContent = await page.locator('[data-slate-editor="true"]').textContent()
    expect(editorContent).toContain('Code text')
  })

  test('should apply keyboard mark using toolbar button', async ({ page }) => {
    await typeTextAndSelect(page, 'Keyboard text')

    const kbdButton = page.locator('[data-testid="toolbar-kbd"]')
    await expect(kbdButton).toBeVisible()
    await kbdButton.click()
    await page.waitForTimeout(300)

    const editorContent = await page.locator('[data-slate-editor="true"]').textContent()
    expect(editorContent).toContain('Keyboard text')
  })

  test('should apply superscript using toolbar button', async ({ page }) => {
    await typeTextAndSelect(page, 'Superscript text')

    const superscriptButton = page.locator('[data-testid="toolbar-superscript"]')
    await expect(superscriptButton).toBeVisible()
    await superscriptButton.click()
    await page.waitForTimeout(300)

    const editorContent = await page.locator('[data-slate-editor="true"]').textContent()
    expect(editorContent).toContain('Superscript text')
  })

  test('should apply subscript using toolbar button', async ({ page }) => {
    await typeTextAndSelect(page, 'Subscript text')

    const subscriptButton = page.locator('[data-testid="toolbar-subscript"]')
    await expect(subscriptButton).toBeVisible()
    await subscriptButton.click()
    await page.waitForTimeout(300)

    const editorContent = await page.locator('[data-slate-editor="true"]').textContent()
    expect(editorContent).toContain('Subscript text')
  })
})

test.describe('Toolbar: Font Color & Background Color', () => {
  test('should open font color dropdown', async ({ page }) => {
    await typeTextAndSelect(page, 'Colored text')

    const colorButton = page.locator('[data-testid="toolbar-font-color"]')
    await expect(colorButton).toBeVisible()
    await colorButton.click()
    await page.waitForTimeout(300)

    const dropdown = page.locator('[role="menu"]')
    await expect(dropdown).toBeVisible()

    await page.keyboard.press('Escape')
    await page.waitForTimeout(200)
  })

  test('should open background color dropdown', async ({ page }) => {
    await typeTextAndSelect(page, 'Highlighted text')

    const bgColorButton = page.locator('[data-testid="toolbar-bg-color"]')
    await expect(bgColorButton).toBeVisible()
    await bgColorButton.click()
    await page.waitForTimeout(300)

    const dropdown = page.locator('[role="menu"]')
    await expect(dropdown).toBeVisible()

    await page.keyboard.press('Escape')
    await page.waitForTimeout(200)
  })
})

test.describe('Toolbar: Font Size', () => {
  test('should decrease font size using minus button', async ({ page }) => {
    await typeTextAndSelect(page, 'Smaller text')

    const minusButton = page.locator('[data-testid="toolbar-font-size-minus"]')
    await expect(minusButton).toBeVisible()
    await minusButton.click()
    await page.waitForTimeout(200)

    const editorContent = await page.locator('[data-slate-editor="true"]').textContent()
    expect(editorContent).toContain('Smaller text')
  })

  test('should increase font size using plus button', async ({ page }) => {
    await typeTextAndSelect(page, 'Bigger text')

    const plusButton = page.locator('[data-testid="toolbar-font-size-plus"]')
    await expect(plusButton).toBeVisible()
    await plusButton.click()
    await page.waitForTimeout(200)

    const editorContent = await page.locator('[data-slate-editor="true"]').textContent()
    expect(editorContent).toContain('Bigger text')
  })

  test('should open font size dropdown', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.waitForTimeout(200)

    const fontSizeInput = page.locator('[data-testid="toolbar-font-size-input"]')
    await expect(fontSizeInput).toBeVisible()
    await fontSizeInput.click()
    await page.waitForTimeout(300)

    const popover = page.locator('[role="dialog"]')
    await expect(popover).toBeVisible()

    await page.keyboard.press('Escape')
    await page.waitForTimeout(200)
  })
})

test.describe('Toolbar: Line Height', () => {
  test('should open line height dropdown', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.waitForTimeout(200)

    const lineHeightButton = page.locator('[data-testid="toolbar-line-height"]')
    await expect(lineHeightButton).toBeVisible()
    await lineHeightButton.click()
    await page.waitForTimeout(300)

    const dropdown = page.locator('[role="menu"]')
    await expect(dropdown).toBeVisible()

    await page.keyboard.press('Escape')
    await page.waitForTimeout(200)
  })
})

test.describe('Toolbar: Indent & Outdent', () => {
  test('should indent block using toolbar button', async ({ page }) => {
    await insertBlock(page, 'paragraph')
    await page.waitForTimeout(200)

    const indentButton = page.locator('[data-testid="toolbar-indent"]')
    await expect(indentButton).toBeVisible()
    await indentButton.click()
    await page.waitForTimeout(200)
  })

  test('should outdent block using toolbar button', async ({ page }) => {
    await insertBlock(page, 'paragraph')
    await page.waitForTimeout(200)

    const indentButton = page.locator('[data-testid="toolbar-indent"]')
    const outdentButton = page.locator('[data-testid="toolbar-outdent"]')

    await indentButton.click()
    await page.waitForTimeout(200)

    await outdentButton.click()
    await page.waitForTimeout(200)
  })
})

test.describe('Toolbar: Emoji Button', () => {
  test('should open emoji picker', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.waitForTimeout(200)

    const emojiButton = page.locator('[data-testid="toolbar-emoji"]')
    await expect(emojiButton).toBeVisible()
    await emojiButton.click()
    await page.waitForTimeout(300)

    await page.keyboard.press('Escape')
    await page.waitForTimeout(200)
  })
})

test.describe('Toolbar: Media Buttons', () => {
  test('should open audio media button', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.waitForTimeout(200)

    const audioButton = page.locator('[data-testid="toolbar-media-audio"]')
    await expect(audioButton).toBeVisible()
    await audioButton.click()
    await page.waitForTimeout(300)

    await page.keyboard.press('Escape')
    await page.waitForTimeout(200)
  })

  test('should open image media button', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.waitForTimeout(200)

    const imageButton = page.locator('[data-testid="toolbar-media-image"]')
    await expect(imageButton).toBeVisible()
    await imageButton.click()
    await page.waitForTimeout(300)

    await page.keyboard.press('Escape')
    await page.waitForTimeout(200)
  })

  test('should open video media button', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.waitForTimeout(200)

    const videoButton = page.locator('[data-testid="toolbar-media-video"]')
    await expect(videoButton).toBeVisible()
    await videoButton.click()
    await page.waitForTimeout(300)

    await page.keyboard.press('Escape')
    await page.waitForTimeout(200)
  })
})

test.describe('Toolbar: Insert & Turn Into', () => {
  test('should open insert dropdown', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.waitForTimeout(200)

    const insertButton = page.locator('[data-testid="toolbar-insert"]')
    await expect(insertButton).toBeVisible()
    await insertButton.click()
    await page.waitForTimeout(300)

    const dropdown = page.locator('[role="menu"]')
    await expect(dropdown).toBeVisible()

    await page.keyboard.press('Escape')
    await page.waitForTimeout(200)
  })

  test('should open turn into dropdown', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.waitForTimeout(200)

    const turnIntoButton = page.locator('[data-testid="toolbar-turn-into"]')
    await expect(turnIntoButton).toBeVisible()
    await turnIntoButton.click()
    await page.waitForTimeout(300)

    const dropdown = page.locator('[role="menu"]')
    await expect(dropdown).toBeVisible()

    await page.keyboard.press('Escape')
    await page.waitForTimeout(200)
  })
})

test.describe('Toolbar: Export & Import Buttons', () => {
  test('should open export dropdown', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.waitForTimeout(200)

    const exportButton = page.locator('[data-testid="toolbar-export"]')
    await expect(exportButton).toBeVisible()
    await exportButton.click()
    await page.waitForTimeout(300)

    await page.keyboard.press('Escape')
    await page.waitForTimeout(200)
  })

  test('should open import dropdown', async ({ page }) => {
    await page.click('[data-slate-editor="true"]')
    await page.waitForTimeout(200)

    const importButton = page.locator('[data-testid="toolbar-import"]')
    await expect(importButton).toBeVisible()
    await importButton.click()
    await page.waitForTimeout(300)

    await page.keyboard.press('Escape')
    await page.waitForTimeout(200)
  })
})
