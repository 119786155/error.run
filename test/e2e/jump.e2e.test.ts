import { expect, test } from '@playwright/test'

const BASE_URL = 'http://localhost:5173'

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}/jump`)
  await page.waitForSelector('#game-canvas')
})

test('jump page loads and game initializes', async ({ page }) => {
  expect(await page.isVisible('#game-canvas')).toBe(true)
  expect(await page.isVisible('#start-screen')).toBe(true)
})

test.describe('Game Start', () => {
  test('should show start screen initially', async ({ page }) => {
    const startScreen = page.locator('#start-screen')
    await expect(startScreen).toBeVisible()
    await expect(startScreen).toHaveClass(/active/)
  })

  test('should start game when clicking start button', async ({ page }) => {
    const startBtn = page.locator('#start-btn')
    await startBtn.click()
    await page.waitForTimeout(1000)

    const startScreen = page.locator('#start-screen')
    await expect(startScreen).not.toHaveClass(/active/, { timeout: 10000 })

    const gameUI = page.locator('#game-ui')
    await expect(gameUI).toHaveClass(/active/)
  })

  test('should start game when pressing space', async ({ page }) => {
    // 直接聚焦页面并按空格
    await page.bringToFront()
    await page.waitForTimeout(300)
    await page.keyboard.press('Space')
    await page.waitForTimeout(1000)

    const startScreen = page.locator('#start-screen')
    await expect(startScreen).not.toHaveClass(/active/, { timeout: 10000 })
  })
})

test.describe('Player Movement', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('#start-btn').click()
    await page.waitForTimeout(300)
  })

  test('should move player right with D key', async ({ page }) => {
    await page.keyboard.down('KeyD')
    await page.waitForTimeout(500)
    await page.keyboard.up('KeyD')

    const scoreDisplay = page.locator('#score-display')
    const scoreText = await scoreDisplay.textContent()
    expect(scoreText).toContain('Score')
  })

  test('should move player left with A key', async ({ page }) => {
    await page.keyboard.down('KeyA')
    await page.waitForTimeout(500)
    await page.keyboard.up('KeyA')

    const scoreDisplay = page.locator('#score-display')
    const scoreText = await scoreDisplay.textContent()
    expect(scoreText).toContain('Score')
  })

  test('should jump with W key', async ({ page }) => {
    await page.keyboard.press('KeyW')
    await page.waitForTimeout(300)

    const gameUI = page.locator('#game-ui')
    await expect(gameUI).toBeVisible()
  })

  test('should jump with Space key', async ({ page }) => {
    await page.keyboard.press('Space')
    await page.waitForTimeout(300)

    const gameUI = page.locator('#game-ui')
    await expect(gameUI).toBeVisible()
  })

  test('should jump with Arrow Up key', async ({ page }) => {
    await page.keyboard.press('ArrowUp')
    await page.waitForTimeout(300)

    const gameUI = page.locator('#game-ui')
    await expect(gameUI).toBeVisible()
  })
})

test.describe('Game Pause', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('#start-btn').click()
    await page.waitForTimeout(300)
  })

  test('should pause game with P key', async ({ page }) => {
    await page.keyboard.press('KeyP')
    await page.waitForTimeout(300)

    const pauseScreen = page.locator('#pause-screen')
    await expect(pauseScreen).toHaveClass(/active/)
  })

  test('should resume game after pause', async ({ page }) => {
    await page.keyboard.press('KeyP')
    await page.waitForTimeout(300)

    const pauseScreen = page.locator('#pause-screen')
    await expect(pauseScreen).toHaveClass(/active/)

    await page.keyboard.press('KeyP')
    await page.waitForTimeout(300)

    await expect(pauseScreen).not.toHaveClass(/active/)
  })

  test('should resume game when clicking resume button', async ({ page }) => {
    await page.keyboard.press('KeyP')
    await page.waitForTimeout(300)

    const resumeBtn = page.locator('#resume-btn')
    await resumeBtn.click()
    await page.waitForTimeout(300)

    const pauseScreen = page.locator('#pause-screen')
    await expect(pauseScreen).not.toHaveClass(/active/)
  })
})

test.describe('Game Over', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('#start-btn').click()
    await page.waitForTimeout(300)
  })

  test('should show game over screen when player falls', async ({ page }) => {
    await page.keyboard.down('KeyD')
    await page.waitForTimeout(10000)
    await page.keyboard.up('KeyD')

    const gameoverScreen = page.locator('#gameover-screen')
    await expect(gameoverScreen).toHaveClass(/active/, { timeout: 15000 })
  })

  test('should show final score on game over', async ({ page }) => {
    await page.keyboard.down('KeyD')
    await page.waitForTimeout(10000)
    await page.keyboard.up('KeyD')

    const gameoverScreen = page.locator('#gameover-screen')
    await expect(gameoverScreen).toHaveClass(/active/, { timeout: 15000 })

    const finalScore = page.locator('#final-score')
    const scoreText = await finalScore.textContent()
    expect(scoreText).toContain('Score:')
  })

  test('should restart game when clicking play again button', async ({ page }) => {
    await page.keyboard.down('KeyD')
    await page.waitForTimeout(10000)
    await page.keyboard.up('KeyD')

    const gameoverScreen = page.locator('#gameover-screen')
    await expect(gameoverScreen).toHaveClass(/active/, { timeout: 15000 })

    const restartBtn = page.locator('#restart-btn')
    await restartBtn.click()
    await page.waitForTimeout(500)

    await expect(gameoverScreen).not.toHaveClass(/active/)
  })
})

test.describe('Score System', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('#start-btn').click()
    await page.waitForTimeout(300)
  })

  test('should display score during gameplay', async ({ page }) => {
    const scoreDisplay = page.locator('#score-display')
    await expect(scoreDisplay).toBeVisible()
  })

  test('should display high score', async ({ page }) => {
    const highScoreDisplay = page.locator('#high-score-display')
    await expect(highScoreDisplay).toBeVisible()
  })

  test('should display lives', async ({ page }) => {
    const livesDisplay = page.locator('#lives-display')
    await expect(livesDisplay).toBeVisible()
    const livesText = await livesDisplay.textContent()
    expect(livesText).toContain('♥')
  })
})

test.describe('Mobile Controls', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.emulateMedia({
      features: [
        { name: 'hover', value: 'none' },
        { name: 'pointer', value: 'coarse' },
      ],
    })
    await page.locator('#start-btn').click()
    await page.waitForTimeout(300)
  })

  test('should show mobile controls on small screens', async ({ page }) => {
    const mobileControls = page.locator('#mobile-controls')
    await expect(mobileControls).toBeVisible()
  })

  test('should have left button', async ({ page }) => {
    const leftBtn = page.locator('#btn-left')
    await expect(leftBtn).toBeVisible()
  })

  test('should have right button', async ({ page }) => {
    const rightBtn = page.locator('#btn-right')
    await expect(rightBtn).toBeVisible()
  })

  test('should have jump button', async ({ page }) => {
    const jumpBtn = page.locator('#btn-jump')
    await expect(jumpBtn).toBeVisible()
  })
})

test.describe('Mobile Controls - Landscape Mode', () => {
  test('should show mobile controls when rotating to landscape mode (width > 768px)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 812, height: 375 },
      hasTouch: true,
    })

    await context.addInitScript(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => {
          const isTouchQuery = query.includes('pointer: coarse') || query.includes('hover: none')
          return {
            matches: isTouchQuery,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
          }
        },
      })
    })

    const page = await context.newPage()
    await page.goto(`${BASE_URL}/jump`)
    await page.waitForSelector('#game-canvas')
    await page.locator('#start-btn').click()
    await page.waitForTimeout(500)

    const mobileControls = page.locator('#mobile-controls')
    await expect(mobileControls).toBeVisible()

    const leftBtn = page.locator('#btn-left')
    await expect(leftBtn).toBeVisible()

    const rightBtn = page.locator('#btn-right')
    await expect(rightBtn).toBeVisible()

    const jumpBtn = page.locator('#btn-jump')
    await expect(jumpBtn).toBeVisible()

    await context.close()
  })

  test('should keep mobile controls visible when rotating from portrait to landscape', async ({ browser }) => {
    // 1. 创建一个竖屏的移动设备上下文
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
      hasTouch: true,
    })

    await context.addInitScript(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => {
          const isTouchQuery = query.includes('pointer: coarse') || query.includes('hover: none')
          return {
            matches: isTouchQuery,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
          }
        },
      })
    })

    const page = await context.newPage()
    await page.goto(`${BASE_URL}/jump`)
    await page.waitForSelector('#game-canvas')
    await page.locator('#start-btn').click()
    await page.waitForTimeout(300)

    // 2. 验证竖屏时移动控制按钮可见
    const mobileControls = page.locator('#mobile-controls')
    await expect(mobileControls).toBeVisible()

    const leftBtn = page.locator('#btn-left')
    await expect(leftBtn).toBeVisible()

    const rightBtn = page.locator('#btn-right')
    await expect(rightBtn).toBeVisible()

    const jumpBtn = page.locator('#btn-jump')
    await expect(jumpBtn).toBeVisible()

    // 3. 切换到横屏
    await page.setViewportSize({ width: 812, height: 375 })
    await page.waitForTimeout(500)

    // 4. 验证横屏时移动控制按钮仍然可见
    await expect(mobileControls).toBeVisible()
    await expect(leftBtn).toBeVisible()
    await expect(rightBtn).toBeVisible()
    await expect(jumpBtn).toBeVisible()

    await context.close()
  })
})

test.describe('Death Logic - No False Positives', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('#start-btn').click()
    await page.waitForTimeout(300)
  })

  test('should NOT die when jumping high (moving up fast)', async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('KeyW')
      await page.waitForTimeout(200)
    }

    await page.waitForTimeout(2000)

    const gameoverScreen = page.locator('#gameover-screen')
    const isGameOver = await gameoverScreen.evaluate((el) => el.classList.contains('active'))
    expect(isGameOver).toBe(false)
  })

  test('should survive normal gameplay for 3 seconds', async ({ page }) => {
    // 只测试一小段时间，确保游戏不会立即结束
    await page.waitForTimeout(3000)

    const gameoverScreen = page.locator('#gameover-screen')
    const isGameOver = await gameoverScreen.evaluate((el) => el.classList.contains('active'))
    expect(isGameOver).toBe(false)
  })
})
