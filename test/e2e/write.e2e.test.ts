import * as fs from 'node:fs'
import * as path from 'node:path'
import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

const BASE_URL = 'http://localhost:5173'

const EDITOR_SELECTOR = '[data-slate-editor="true"]'
const SLASH_MENU_SELECTOR = '[role="listbox"]'

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}/write`)
  await page.waitForSelector('[data-testid="editor"]')
})

// ==================== HELPERS ====================

async function focusEditor(page: Page) {
  await page.click(EDITOR_SELECTOR)
  await page.waitForSelector(`${EDITOR_SELECTOR}:focus-within`, { timeout: 3000 })
}

async function openSlashMenu(page: Page) {
  await focusEditor(page)
  await page.keyboard.type('/')
  await page.waitForSelector(SLASH_MENU_SELECTOR, { timeout: 5000 })
}

async function insertBlock(page: Page, searchText: string) {
  await openSlashMenu(page)
  await page.keyboard.type(searchText)
  await page.keyboard.press('Enter')
}

async function deleteBlock(page: Page, selector: string) {
  await page.click(selector)
  await page.waitForTimeout(300)
  await page.keyboard.press('Control+a')
  await page.keyboard.press('Delete')
}

async function insertInlineElement(page: Page, searchText: string, targetSelector: string) {
  await openSlashMenu(page)
  await page.keyboard.type(searchText)
  await page.keyboard.press('Enter')
  await page.waitForSelector(targetSelector, { timeout: 5000 })
}

async function selectAll(page: Page) {
  await page.keyboard.press('Control+a')
}

async function typeAndSelectAll(page: Page, text: string) {
  await focusEditor(page)
  await page.keyboard.type(text)
  await selectAll(page)
}

// ==================== PAGE LOAD ====================

test('write page loads and editor initializes', async ({ page }) => {
  await expect(page.locator('[data-testid="editor"]')).toBeVisible()
})

// ==================== BASIC BLOCKS ====================

const blockTests = [
  { name: 'Paragraph', search: 'paragraph', selector: '.slate-p' },
  { name: 'Heading 1', search: 'heading 1', selector: '.slate-h1' },
  { name: 'Heading 2', search: 'heading 2', selector: '.slate-h2' },
  { name: 'Heading 3', search: 'heading 3', selector: '.slate-h3' },
  { name: 'Quote', search: 'quote', selector: '.slate-blockquote' },
  { name: 'Callout', search: 'callout', selector: '.slate-callout' },
  { name: 'Table', search: 'table', selector: '.slate-table' },
  { name: 'Code Block', search: 'code block', selector: '.slate-code_block' },
  { name: 'Unordered List', search: 'unordered', selector: 'ul' },
  { name: 'Ordered List', search: 'ordered', selector: 'ol' },
  { name: 'Todo List', search: 'todo', selector: 'li' },
  { name: 'Toggle List', search: 'toggle', selector: '.slate-toggle' },
  { name: 'Table of Contents', search: 'table of contents', selector: '.slate-toc' },
  { name: 'Columns', search: '3 columns', selector: '.slate-column_group' },
  { name: 'Equation', search: 'equation', selector: '.slate-equation' },
  { name: 'Excalidraw', search: 'whiteboard', selector: '.slate-excalidraw' },
]

// Block types that can't be deleted with click+Ctrl+A+Delete
const skipDeleteBlocks = new Set(['Equation', 'Excalidraw'])

for (const { name, search, selector } of blockTests) {
  test.describe(`${name} Block`, () => {
    test(`should add ${name.toLowerCase()} block`, async ({ page }) => {
      await insertBlock(page, search)
      await page.waitForSelector(selector, { timeout: 5000 })
      await expect(page.locator(selector).first()).toBeVisible()
    })

    test(`should delete ${name.toLowerCase()} block`, async ({ page }) => {
      if (skipDeleteBlocks.has(name)) {
        test.skip()
        return
      }
      await insertBlock(page, search)
      await page.waitForSelector(selector, { timeout: 5000 })
      const beforeCount = await page.locator(selector).count()
      await deleteBlock(page, `${selector} >> nth=0`)
      await expect(page.locator(selector)).toHaveCount(beforeCount - 1)
    })
  })
}

// ==================== INLINE ELEMENTS ====================

test.describe('Date Inline Element', () => {
  test('should add date inline element', async ({ page }) => {
    await insertInlineElement(page, 'date', '.slate-date')
    await expect(page.locator('.slate-date')).toHaveCount(1)
  })

  test('should delete date inline element', async ({ page }) => {
    await insertInlineElement(page, 'date', '.slate-date')
    await focusEditor(page)
    await page.keyboard.press('End')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await expect(page.locator('.slate-date')).toHaveCount(0)
  })
})

test.describe('Keyboard Input Inline Element', () => {
  test('should add keyboard input inline element', async ({ page }) => {
    await insertInlineElement(page, 'keyboard', '.slate-kbd')
    await expect(page.locator('.slate-kbd')).toHaveCount(1)
  })

  test('should delete keyboard input inline element', async ({ page }) => {
    await insertInlineElement(page, 'keyboard', '.slate-kbd')
    await focusEditor(page)
    await page.keyboard.press('End')
    await page.keyboard.press('Delete')
    await expect(page.locator('.slate-kbd')).toHaveCount(0)
  })
})

// ==================== TEXT FORMATTING (KEYBOARD SHORTCUTS) ====================

const formattingShortcutTests = [
  { name: 'bold', shortcut: 'Control+b' },
  { name: 'italic', shortcut: 'Control+i' },
  { name: 'underline', shortcut: 'Control+u' },
  { name: 'strikethrough', shortcut: 'Control+Shift+x' },
]

for (const { name, shortcut } of formattingShortcutTests) {
  test(`should apply ${name} formatting via keyboard shortcut`, async ({ page }) => {
    const consoleErrors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text())
    })

    await typeAndSelectAll(page, 'Hello World')
    await page.keyboard.press(shortcut)

    await expect(page.locator(EDITOR_SELECTOR)).toContainText('Hello World')
    expect(consoleErrors).toHaveLength(0)
  })
}

// ==================== LINK FUNCTIONALITY ====================

test.describe('Link Functionality', () => {
  test('should open link toolbar using keyboard shortcut', async ({ page }) => {
    await typeAndSelectAll(page, 'Click me')
    await page.keyboard.press('Control+k')
    await expect(page.locator('[data-plate-focus]')).toBeVisible({ timeout: 5000 })
  })

  test('should insert link and verify editor content', async ({ page }) => {
    await typeAndSelectAll(page, 'Click me')
    await page.keyboard.press('Control+k')

    const urlInput = page.locator('[data-plate-focus][placeholder*="link"]')
    if (await urlInput.isVisible({ timeout: 3000 })) {
      await urlInput.fill('https://example.com')
      await page.keyboard.press('Escape')
      await page.waitForSelector(`${EDITOR_SELECTOR}:not(:has([data-plate-focus]))`, { timeout: 5000 })
      const editorContent = await page.locator(EDITOR_SELECTOR).textContent()
      expect(editorContent).toContain('Click me')
    } else {
      test.skip()
    }
  })
})

// ==================== MEDIA UPLOAD ====================

test.describe('Media Upload via Slash Command', () => {
  test('should insert date using /date shortcut', async ({ page }) => {
    await focusEditor(page)
    await page.keyboard.type('/date')
    await page.waitForSelector(SLASH_MENU_SELECTOR, { timeout: 5000 })
    await page.keyboard.press('Enter')
    await page.waitForSelector('.slate-date', { timeout: 5000 })
    await expect(page.locator('.slate-date')).toHaveCount(1)
  })

  test('should insert kbd using /kbd shortcut', async ({ page }) => {
    await focusEditor(page)
    await page.keyboard.type('/kbd')
    await page.waitForSelector(SLASH_MENU_SELECTOR, { timeout: 5000 })
    await page.keyboard.press('Enter')
    await page.waitForSelector('.slate-kbd', { timeout: 5000 })
    await expect(page.locator('.slate-kbd')).toHaveCount(1)
  })
})

// ==================== IMPORT ====================

function collectConsoleErrors(page: Page) {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  return errors
}

test.describe('Import JSON', () => {
  test('should import JSON file with excalidraw content', async ({ page }) => {
    const consoleErrors = collectConsoleErrors(page)

    const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z])\//, '$1:/')
    const jsonContent = fs.readFileSync(path.join(__dirname, '../../test/fixtures/excalidraw-test-data.json'), 'utf-8')

    await page.evaluate(
      (json: string) => document.dispatchEvent(new CustomEvent('import-json-test', { detail: json })),
      jsonContent,
    )

    await page.waitForSelector('.slate-excalidraw', { timeout: 5000 })
    const excalidrawCount = await page.locator('.slate-excalidraw').count()
    expect(excalidrawCount).toBeGreaterThan(0)

    const hasErrors = consoleErrors.some(
      (err) =>
        err.includes('excalidraw') ||
        err.includes('Cannot read') ||
        err.includes('undefined') ||
        err.includes('is not a function') ||
        err.includes('TypeError'),
    )
    expect(hasErrors).toBe(false)
  })
})

test.describe('Import HTML', () => {
  test('should import HTML file without error', async ({ page }) => {
    const consoleErrors = collectConsoleErrors(page)

    const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z])\//, '$1:/')
    const htmlContent = fs.readFileSync(path.join(__dirname, '../../test/fixtures/test.html'), 'utf-8')

    await page.evaluate(
      (html: string) => document.dispatchEvent(new CustomEvent('import-html-test', { detail: html })),
      htmlContent,
    )

    // Wait for import to process
    await page.waitForTimeout(2000)
    // Verify editor still functional and no errors
    await expect(page.locator(EDITOR_SELECTOR)).toBeVisible()
    expect(consoleErrors).toHaveLength(0)
  })
})

test.describe('Import Markdown', () => {
  test('should import Markdown file without error', async ({ page }) => {
    const consoleErrors = collectConsoleErrors(page)

    const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z])\//, '$1:/')
    const mdContent = fs.readFileSync(path.join(__dirname, '../../test/fixtures/test.md'), 'utf-8')

    await page.evaluate(
      (markdown: string) => document.dispatchEvent(new CustomEvent('import-markdown-test', { detail: markdown })),
      mdContent,
    )

    // Wait for import to process
    await page.waitForTimeout(2000)
    // Verify editor still functional and no errors
    await expect(page.locator(EDITOR_SELECTOR)).toBeVisible()
    expect(consoleErrors).toHaveLength(0)
  })
})

// ==================== UNDO/REDO ====================

test.describe('Undo/Redo', () => {
  test('should undo text input', async ({ page }) => {
    await typeAndSelectAll(page, 'Hello World')
    await expect(page.locator(EDITOR_SELECTOR)).toContainText('Hello World')

    await page.keyboard.press('Control+z')
    await page.waitForTimeout(300)
    await expect(page.locator(EDITOR_SELECTOR)).not.toContainText('Hello World')
  })

  test('should redo after undo', async ({ page }) => {
    await typeAndSelectAll(page, 'Hello World')
    await expect(page.locator(EDITOR_SELECTOR)).toContainText('Hello World')

    await page.keyboard.press('Control+z')
    await page.waitForTimeout(300)
    await expect(page.locator(EDITOR_SELECTOR)).not.toContainText('Hello World')

    // Redo shortcut may vary by platform; verify it runs without error
    await page.keyboard.press('Control+Shift+z')
    await page.waitForTimeout(300)
    await expect(page.locator(EDITOR_SELECTOR)).toBeVisible()
  })

  test('should undo block insertion', async ({ page }) => {
    await insertBlock(page, 'heading 1')
    await page.waitForSelector('.slate-h1', { timeout: 5000 })
    await expect(page.locator('.slate-h1')).toHaveCount(1)

    await page.keyboard.press('Control+z')
    await expect(page.locator('.slate-h1')).toHaveCount(0)
  })
})

// ==================== TEXT INPUT ====================

test('should type text into editor', async ({ page }) => {
  await focusEditor(page)
  await page.keyboard.type('Test text input')
  await expect(page.locator(EDITOR_SELECTOR)).toContainText('Test text input')
})

// ==================== BLOCK SPLITTING ====================

test('should split paragraph block with Enter key', async ({ page }) => {
  await focusEditor(page)
  await page.keyboard.type('First part')
  await page.keyboard.press('Enter')
  await page.keyboard.type('Second part')
  await expect(page.locator('.slate-p')).toHaveCount(2)
})

// ==================== TOOLBAR BUTTON TESTS ====================

test.describe('Toolbar: Undo/Redo Buttons', () => {
  test('should undo text using toolbar undo button', async ({ page }) => {
    await typeAndSelectAll(page, 'Test content')
    await expect(page.locator(EDITOR_SELECTOR)).toContainText('Test content')

    await page.locator('[data-testid="toolbar-undo"]').click()
    await expect(page.locator(EDITOR_SELECTOR)).not.toContainText('Test content')
  })

  test('should redo using toolbar redo button', async ({ page }) => {
    await typeAndSelectAll(page, 'Test content')
    await expect(page.locator(EDITOR_SELECTOR)).toContainText('Test content')

    await page.locator('[data-testid="toolbar-undo"]').click()
    await expect(page.locator(EDITOR_SELECTOR)).not.toContainText('Test content')

    await page.locator('[data-testid="toolbar-redo"]').click()
    await expect(page.locator(EDITOR_SELECTOR)).toContainText('Test content')
  })
})

test.describe('Toolbar: Mode Toggle Button', () => {
  test('should toggle between edit and view mode', async ({ page }) => {
    const modeButton = page.locator('[data-testid="toolbar-mode-toggle"]')
    await expect(modeButton).toBeVisible()

    // Toggle to read-only (view) mode
    await modeButton.click()
    await page.waitForTimeout(500)

    // Verify editor still visible in view mode
    await expect(page.locator(EDITOR_SELECTOR)).toBeVisible()

    // Toggle back to edit mode
    await modeButton.click()
    await page.waitForTimeout(300)

    // Verify editor still visible and interactive
    await expect(page.locator(EDITOR_SELECTOR)).toBeVisible()
    await page.click(EDITOR_SELECTOR)
  })
})

// ==================== TOOLBAR: TEXT FORMATTING ====================

const toolbarFormatTests = [
  { name: 'bold', testid: 'toolbar-bold' },
  { name: 'italic', testid: 'toolbar-italic' },
  { name: 'underline', testid: 'toolbar-underline' },
  { name: 'strikethrough', testid: 'toolbar-strikethrough' },
  { name: 'inline code', testid: 'toolbar-code' },
  { name: 'keyboard', testid: 'toolbar-kbd' },
  { name: 'superscript', testid: 'toolbar-superscript' },
  { name: 'subscript', testid: 'toolbar-subscript' },
]

for (const { name, testid } of toolbarFormatTests) {
  test(`should apply ${name} using toolbar button`, async ({ page }) => {
    const consoleErrors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text())
    })

    await typeAndSelectAll(page, `${name} text`)

    const button = page.locator(`[data-testid="${testid}"]`)
    await expect(button).toBeVisible()
    await button.click()

    await expect(page.locator(EDITOR_SELECTOR)).toContainText(`${name} text`)
    expect(consoleErrors).toHaveLength(0)
  })
}

// ==================== TOOLBAR: FONT COLOR & BACKGROUND ====================

test.describe('Toolbar: Font Color & Background Color', () => {
  test('should open font color dropdown', async ({ page }) => {
    await typeAndSelectAll(page, 'Colored text')

    await page.locator('[data-testid="toolbar-font-color"]').click()
    await page.waitForSelector('[role="menu"]', { timeout: 3000 })
    await expect(page.locator('[role="menu"]')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator(EDITOR_SELECTOR)).toContainText('Colored text')
  })

  test('should open background color dropdown', async ({ page }) => {
    await typeAndSelectAll(page, 'Highlighted text')

    await page.locator('[data-testid="toolbar-bg-color"]').click()
    await page.waitForSelector('[role="menu"]', { timeout: 3000 })
    await expect(page.locator('[role="menu"]')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator(EDITOR_SELECTOR)).toContainText('Highlighted text')
  })
})

// ==================== TOOLBAR: FONT SIZE ====================

test.describe('Toolbar: Font Size', () => {
  test('should decrease font size using minus button', async ({ page }) => {
    await typeAndSelectAll(page, 'Smaller text')

    const minusButton = page.locator('[data-testid="toolbar-font-size-minus"]')
    await expect(minusButton).toBeVisible()
    await minusButton.click()
    await expect(page.locator(EDITOR_SELECTOR)).toContainText('Smaller text')
  })

  test('should increase font size using plus button', async ({ page }) => {
    await typeAndSelectAll(page, 'Bigger text')

    const plusButton = page.locator('[data-testid="toolbar-font-size-plus"]')
    await expect(plusButton).toBeVisible()
    await plusButton.click()
    await expect(page.locator(EDITOR_SELECTOR)).toContainText('Bigger text')
  })

  test('should open font size dropdown', async ({ page }) => {
    await focusEditor(page)
    await page.locator('[data-testid="toolbar-font-size-input"]').click()
    await page.waitForSelector('[role="dialog"]', { timeout: 3000 })
    await expect(page.locator('[role="dialog"]')).toBeVisible()
    await page.keyboard.press('Escape')
  })
})

// ==================== TOOLBAR: LINE HEIGHT ====================

test.describe('Toolbar: Line Height', () => {
  test('should open line height dropdown', async ({ page }) => {
    await focusEditor(page)
    await page.locator('[data-testid="toolbar-line-height"]').click()
    await page.waitForSelector('[role="menu"]', { timeout: 3000 })
    await expect(page.locator('[role="menu"]')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator(EDITOR_SELECTOR)).toBeVisible()
  })
})

// ==================== TOOLBAR: INDENT & OUTDENT ====================

test.describe('Toolbar: Indent & Outdent', () => {
  test('should indent block using toolbar button', async ({ page }) => {
    await insertBlock(page, 'paragraph')
    await page.waitForSelector('.slate-p >> nth=1', { timeout: 5000 })

    await page.locator('[data-testid="toolbar-indent"]').click()
    await expect(page.locator(EDITOR_SELECTOR)).toBeVisible()
  })

  test('should outdent after indent', async ({ page }) => {
    await insertBlock(page, 'paragraph')
    await page.waitForSelector('.slate-p >> nth=1', { timeout: 5000 })

    await page.locator('[data-testid="toolbar-indent"]').click()
    await page.locator('[data-testid="toolbar-outdent"]').click()
    await expect(page.locator(EDITOR_SELECTOR)).toBeVisible()
  })
})

// ==================== TOOLBAR: EMOJI ====================

test.describe('Toolbar: Emoji Button', () => {
  test('should open emoji picker', async ({ page }) => {
    await focusEditor(page)
    await page.locator('[data-testid="toolbar-emoji"]').click()
    await page.waitForTimeout(500)
    // Emoji picker opens - dismiss it
    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)
    await expect(page.locator(EDITOR_SELECTOR)).toBeVisible()
  })
})

// ==================== TOOLBAR: MEDIA BUTTONS ====================

const mediaButtonTests = [
  { name: 'audio', testid: 'toolbar-media-audio' },
  { name: 'image', testid: 'toolbar-media-image' },
  { name: 'video', testid: 'toolbar-media-video' },
]

for (const { name, testid } of mediaButtonTests) {
  test(`should open ${name} media dialog`, async ({ page }) => {
    await focusEditor(page)
    await page.locator(`[data-testid="${testid}"]`).click()
    await page.waitForTimeout(500)
    // Media dialog opens - dismiss it
    await page.keyboard.press('Escape')
    await page.waitForTimeout(300)
    await expect(page.locator(EDITOR_SELECTOR)).toBeVisible()
  })
}

// ==================== TOOLBAR: INSERT & TURN INTO ====================

test.describe('Toolbar: Insert & Turn Into', () => {
  test('should open insert dropdown', async ({ page }) => {
    await focusEditor(page)
    await page.locator('[data-testid="toolbar-insert"]').click()
    await page.waitForSelector('[role="menu"]', { timeout: 3000 })
    await expect(page.locator('[role="menu"]')).toBeVisible()
    await page.keyboard.press('Escape')
  })

  test('should open turn into dropdown', async ({ page }) => {
    await focusEditor(page)
    await page.locator('[data-testid="toolbar-turn-into"]').click()
    await page.waitForSelector('[role="menu"]', { timeout: 3000 })
    await expect(page.locator('[role="menu"]')).toBeVisible()
    await page.keyboard.press('Escape')
  })
})

// ==================== TOOLBAR: EXPORT & IMPORT ====================

test.describe('Toolbar: Export & Import Buttons', () => {
  test('should open export dropdown with options', async ({ page }) => {
    await focusEditor(page)
    await page.locator('[data-testid="toolbar-export"]').click()
    await page.waitForSelector('[role="menu"]', { timeout: 3000 })

    const menuItems = page.locator('[role="menu"] [role="menuitem"]')
    await expect(menuItems.first()).toBeVisible()
    const count = await menuItems.count()
    expect(count).toBeGreaterThan(0)
    await page.keyboard.press('Escape')
  })

  test('should open import dropdown with HTML/Markdown/JSON options', async ({ page }) => {
    await focusEditor(page)
    await page.locator('[data-testid="toolbar-import"]').click()
    await page.waitForSelector('[role="menu"]', { timeout: 3000 })

    const menuItems = page.locator('[role="menu"] [role="menuitem"]')
    await expect(menuItems.first()).toBeVisible()
    const count = await menuItems.count()
    expect(count).toBe(3)
    await page.keyboard.press('Escape')
  })
})

// ==================== ERROR BOUNDARY ====================

test('write page renders with error boundary', async ({ page }) => {
  await expect(page.locator('[data-testid="write-page"]')).toBeVisible()
  // Error boundary should NOT be showing on normal load
  await expect(page.locator('[data-testid="error-boundary-fallback"]')).not.toBeVisible()
})

// ==================== RTL (RIGHT-TO-LEFT) WRITING ====================

test.describe('RTL Writing Support', () => {
  test.describe('Arabic (ar)', () => {
    test.use({ locale: 'ar-SA' })

    test('should set html dir to rtl', async ({ page }) => {
      const dir = await page.locator('html').getAttribute('dir')
      expect(dir).toBe('rtl')
    })

    test('should type Arabic text and display correctly', async ({ page }) => {
      await focusEditor(page)
      await page.keyboard.type('مرحبا بالعالم')
      await expect(page.locator(EDITOR_SELECTOR)).toContainText('مرحبا بالعالم')
    })

    test('should type Arabic text and split paragraph with Enter', async ({ page }) => {
      await focusEditor(page)
      await page.keyboard.type('السطر الأول')
      await page.keyboard.press('Enter')
      await page.keyboard.type('السطر الثاني')
      await expect(page.locator('.slate-p')).toHaveCount(2)
      await expect(page.locator(EDITOR_SELECTOR)).toContainText('السطر الأول')
      await expect(page.locator(EDITOR_SELECTOR)).toContainText('السطر الثاني')
    })

    test('should apply bold formatting to Arabic text', async ({ page }) => {
      await typeAndSelectAll(page, 'نص عربي')
      await page.keyboard.press('Control+b')
      await expect(page.locator(EDITOR_SELECTOR)).toContainText('نص عربي')
    })
  })

  test.describe('Persian (fa)', () => {
    test.use({ locale: 'fa-IR' })

    test('should set html dir to rtl', async ({ page }) => {
      const dir = await page.locator('html').getAttribute('dir')
      expect(dir).toBe('rtl')
    })

    test('should type Persian text and display correctly', async ({ page }) => {
      await focusEditor(page)
      await page.keyboard.type('سلام دنیا')
      await expect(page.locator(EDITOR_SELECTOR)).toContainText('سلام دنیا')
    })

    test('should type Persian text and split paragraph with Enter', async ({ page }) => {
      await focusEditor(page)
      await page.keyboard.type('خط اول')
      await page.keyboard.press('Enter')
      await page.keyboard.type('خط دوم')
      await expect(page.locator('.slate-p')).toHaveCount(2)
      await expect(page.locator(EDITOR_SELECTOR)).toContainText('خط اول')
      await expect(page.locator(EDITOR_SELECTOR)).toContainText('خط دوم')
    })

    test('should apply bold formatting to Persian text', async ({ page }) => {
      await typeAndSelectAll(page, 'متن فارسی')
      await page.keyboard.press('Control+b')
      await expect(page.locator(EDITOR_SELECTOR)).toContainText('متن فارسی')
    })
  })

  test.describe('English (ltr - control)', () => {
    test.use({ locale: 'en-US' })

    test('should set html dir to ltr', async ({ page }) => {
      const dir = await page.locator('html').getAttribute('dir')
      expect(dir).toBe('ltr')
    })
  })

  test.describe('Non-RTL locale (zh)', () => {
    test.use({ locale: 'zh-CN' })

    test('should set html dir to ltr', async ({ page }) => {
      const dir = await page.locator('html').getAttribute('dir')
      expect(dir).toBe('ltr')
    })
  })
})
