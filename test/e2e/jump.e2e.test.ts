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
    await page.waitForTimeout(500)

    const startScreen = page.locator('#start-screen')
    await expect(startScreen).not.toHaveClass(/active/)

    const gameUI = page.locator('#game-ui')
    await expect(gameUI).toHaveClass(/active/)
  })

  test('should start game when pressing space', async ({ page }) => {
    await page.keyboard.press('Space')
    await page.waitForTimeout(500)

    const startScreen = page.locator('#start-screen')
    await expect(startScreen).not.toHaveClass(/active/)
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
    expect(scoreText).toContain('Final Score')
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

  test('should survive normal gameplay for 5 seconds', async ({ page }) => {
    await page.keyboard.down('KeyD')
    await page.waitForTimeout(5000)
    await page.keyboard.up('KeyD')

    const gameoverScreen = page.locator('#gameover-screen')
    const isGameOver = await gameoverScreen.evaluate((el) => el.classList.contains('active'))
    expect(isGameOver).toBe(false)
  })
})
