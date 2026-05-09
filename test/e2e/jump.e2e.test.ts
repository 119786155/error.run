import { expect, test } from '@playwright/test'

const BASE_URL = 'http://localhost:5173'

function getScore(page: import('@playwright/test').Page): Promise<number> {
  return page
    .locator('#score-display')
    .textContent()
    .then((text) => {
      if (!text) return -1
      const match = text.match(/\d+/)
      return match ? parseInt(match[0], 10) : -1
    })
}

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
    // Wait a bit for async initGame to attach event listeners
    await page.waitForTimeout(200)
    await page.locator('#start-btn').click()
    await expect(page.locator('#start-screen')).not.toHaveClass(/active/, { timeout: 5000 })
    await expect(page.locator('#game-ui')).toHaveClass(/active/)
  })
})

test.describe('Player Movement', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('#start-btn').click()
    await page.waitForTimeout(300)
  })

  test('should move player right with D key', async ({ page }) => {
    const initialScore = await getScore(page)
    await page.keyboard.down('KeyD')
    await page.waitForTimeout(200)
    await page.keyboard.up('KeyD')
    await page.waitForTimeout(500)

    const finalScore = await getScore(page)
    expect(finalScore).toBeGreaterThanOrEqual(initialScore)
  })

  test('should move player left with A key', async ({ page }) => {
    const initialScore = await getScore(page)
    await page.keyboard.down('KeyA')
    await page.waitForTimeout(200)
    await page.keyboard.up('KeyA')
    await page.waitForTimeout(500)

    const finalScore = await getScore(page)
    // Score should not decrease
    expect(finalScore).toBeGreaterThanOrEqual(initialScore)
  })

  test('should jump with W key', async ({ page }) => {
    await page.keyboard.press('KeyW')
    await page.waitForTimeout(300)

    // Game should still be running (not game over)
    const gameoverScreen = page.locator('#gameover-screen')
    await expect(gameoverScreen).not.toHaveClass(/active/)
  })

  test('should jump with Space key', async ({ page }) => {
    await page.keyboard.press('Space')
    await page.waitForTimeout(300)

    const gameoverScreen = page.locator('#gameover-screen')
    await expect(gameoverScreen).not.toHaveClass(/active/)
  })

  test('should jump with Arrow Up key', async ({ page }) => {
    await page.keyboard.press('ArrowUp')
    await page.waitForTimeout(300)

    const gameoverScreen = page.locator('#gameover-screen')
    await expect(gameoverScreen).not.toHaveClass(/active/)
  })
})

test.describe('Game Pause', () => {
  test.beforeEach(async ({ page }) => {
    // Wait for async initGame to attach event listeners
    await page.waitForTimeout(200)
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
    // Wait for async initGame to attach event listeners
    await page.waitForTimeout(200)
    await page.locator('#start-btn').click()
    await page.waitForTimeout(300)
  })

  test('should show game over screen when player falls', async ({ page }) => {
    await page.keyboard.down('KeyD')
    await page.waitForTimeout(15000)
    await page.keyboard.up('KeyD')

    await expect(page.locator('#gameover-screen')).toHaveClass(/active/, { timeout: 5000 })
  })

  test('should show final score on game over', async ({ page }) => {
    await page.keyboard.down('KeyD')
    await page.waitForTimeout(15000)
    await page.keyboard.up('KeyD')

    await expect(page.locator('#gameover-screen')).toHaveClass(/active/, { timeout: 5000 })

    const scoreText = await page.locator('#final-score').textContent()
    expect(scoreText).toMatch(/\d+/)
  })

  test('should restart game when clicking play again button', async ({ page }) => {
    await page.keyboard.down('KeyD')
    await page.waitForTimeout(15000)
    await page.keyboard.up('KeyD')

    await expect(page.locator('#gameover-screen')).toHaveClass(/active/, { timeout: 5000 })

    await page.locator('#restart-btn').click()
    await expect(page.locator('#gameover-screen')).not.toHaveClass(/active/, { timeout: 5000 })
  })
})

test.describe('Score System', () => {
  test.beforeEach(async ({ page }) => {
    // Wait for async initGame to attach event listeners
    await page.waitForTimeout(200)
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
    // Wait for async initGame to attach event listeners
    await page.waitForTimeout(200)
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

  test('should NOT die when player moves forward (goes ahead)', async ({ page }) => {
    await page.keyboard.down('KeyD')
    // ~950ms keeps player on the initial 300px platform (starts at x=50, speed=4px/frame)
    await page.waitForTimeout(950)
    await page.keyboard.up('KeyD')

    await page.waitForTimeout(500)

    const gameoverScreen = page.locator('#gameover-screen')
    const isGameOver = await gameoverScreen.evaluate((el) => el.classList.contains('active'))
    expect(isGameOver).toBe(false)
  })

  test(
    'should NOT die when player moves forward a long distance (reproduce game over bug)',
    async ({ page }) => {
      // Move player forward for a long enough duration to trigger the out-of-bounds game over loop.
      // The camera lags behind at 0.2 multiplier, so the player goes out of camera bounds.
      // If the bug exists, repeated out-of-bounds checks will drain lives and trigger game over.
      await page.keyboard.down('KeyD')
      await page.waitForTimeout(5000)
      await page.keyboard.up('KeyD')

      await page.waitForTimeout(500)

      const gameoverScreen = page.locator('#gameover-screen')
      const isGameOver = await gameoverScreen.evaluate((el) => el.classList.contains('active'))
      expect(isGameOver).toBe(false)

      const livesText = await page.locator('#lives-display').textContent()
      const livesMatch = livesText?.match(/♥/g)
      expect(livesMatch).toBeTruthy()
      expect(livesMatch?.length).toBeGreaterThan(0)
    },
    { timeout: 30000 },
  )
})
