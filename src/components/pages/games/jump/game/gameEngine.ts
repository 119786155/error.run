import { audioManager } from './audio'
import type { CollectibleManager } from './collectibles'
import type { EnemyManager } from './enemy'
import type { PlatformManager } from './platform'
import type { Player } from './player'
import type { Renderer } from './renderer'
import { Utils } from './utils'

type Platform = ReturnType<PlatformManager['getPlatforms']>[number]

interface Input {
  left: boolean
  right: boolean
  jump: boolean
}

export type GameState = 'start' | 'playing' | 'paused' | 'gameover'

const OUT_OF_BOUNDS_COOLDOWN = 30

export class GameEngine {
  private canvas: HTMLCanvasElement
  private renderer: Renderer
  private player: Player
  private platformManager: PlatformManager
  private collectibleManager: CollectibleManager
  private enemyManager: EnemyManager

  private input: Input = { left: false, right: false, jump: false }
  private state: GameState = 'start'
  private score = 0
  private lives = 3
  private highScore = parseInt(localStorage.getItem('pixelJumpHighScore') || '0', 10)
  private frame = 0
  private outOfBoundsCooldown = 0
  private animFrameId = 0

  constructor(
    canvas: HTMLCanvasElement,
    modules: {
      Renderer: new (c: HTMLCanvasElement) => Renderer
      Player: new () => Player
      PlatformManager: new () => PlatformManager
      CollectibleManager: new () => CollectibleManager
      EnemyManager: new () => EnemyManager
    },
  ) {
    this.canvas = canvas
    this.renderer = new modules.Renderer(canvas)
    this.player = new modules.Player()
    this.platformManager = new modules.PlatformManager()
    this.collectibleManager = new modules.CollectibleManager()
    this.enemyManager = new modules.EnemyManager()
  }

  start() {
    audioManager.init()
    this.state = 'playing'
    this.score = 0
    this.lives = 3
    this.frame = 0
    this.outOfBoundsCooldown = 0
    this.player.reset()
    this.platformManager.init()
    this.collectibleManager.init()
    this.enemyManager.init()
    this.renderer.camera.x = this.player.x
    this.renderer.camera.y = this.player.y - 100
    for (const platform of this.platformManager.getPlatforms()) {
      this.collectibleManager.spawnForPlatform(platform)
      this.enemyManager.spawnForPlatform(platform)
    }
    this.updateUI()
    document.getElementById('start-screen')?.classList.remove('active')
    document.getElementById('gameover-screen')?.classList.remove('active')
    document.getElementById('game-ui')?.classList.add('active')
  }

  pause() {
    if (this.state !== 'playing') return
    this.state = 'paused'
    document.getElementById('pause-screen')?.classList.add('active')
  }

  resume() {
    if (this.state !== 'paused') return
    this.state = 'playing'
    document.getElementById('pause-screen')?.classList.remove('active')
  }

  gameOver() {
    this.state = 'gameover'
    audioManager.playGameOver()
    if (this.score > this.highScore) {
      this.highScore = this.score
      localStorage.setItem('pixelJumpHighScore', String(this.highScore))
    }
    const finalScoreEl = document.getElementById('final-score')
    const finalHighScoreEl = document.getElementById('final-high-score')
    if (finalScoreEl) finalScoreEl.textContent = `Final Score: ${this.score}`
    if (finalHighScoreEl) finalHighScoreEl.textContent = `High Score: ${this.highScore}`
    document.getElementById('gameover-screen')?.classList.add('active')
  }

  // ---- public accessors ----

  getState(): GameState {
    return this.state
  }

  getRenderer(): Renderer {
    return this.renderer
  }

  getPlayer(): Player {
    return this.player
  }

  getPlatformManager(): PlatformManager {
    return this.platformManager
  }

  getCollectibleManager(): CollectibleManager {
    return this.collectibleManager
  }

  getEnemyManager(): EnemyManager {
    return this.enemyManager
  }

  // ---- core ----

  private updateUI() {
    const scoreEl = document.getElementById('score-display')
    const highScoreEl = document.getElementById('high-score-display')
    const livesEl = document.getElementById('lives-display')
    if (scoreEl) scoreEl.textContent = `Score: ${this.score}`
    if (highScoreEl) highScoreEl.textContent = `High Score: ${this.highScore}`
    if (livesEl) livesEl.textContent = `Lives: ${'♥'.repeat(this.lives)}`
  }

  private update() {
    if (this.state !== 'playing') return
    this.frame++
    if (this.outOfBoundsCooldown > 0) this.outOfBoundsCooldown--

    this.platformManager.update(this.player.x)
    this.collectibleManager.update()
    this.enemyManager.update()
    this.player.update(this.input, this.platformManager.getPlatforms())

    const targetCamX = this.player.x
    const targetCamY = this.player.y - 100
    this.renderer.camera.x += (targetCamX - this.renderer.camera.x) * 0.2
    this.renderer.camera.y += (targetCamY - this.renderer.camera.y) * 0.15

    this.handleOutOfBounds(targetCamX)
    this.handleCollectibles()
    this.handleEnemies()
    this.handleSpawns()

    this.score = Math.max(this.score, Math.floor(this.player.x / 10))
    this.updateUI()
  }

  private handleOutOfBounds(targetCamX: number) {
    const halfWidth = this.renderer.width / 2
    const halfHeight = this.renderer.height / 2
    const camX = this.renderer.camera.x
    const camY = this.renderer.camera.y
    const px = this.player.x
    const py = this.player.y
    const pw = this.player.width

    const camLagX = targetCamX - camX
    const maxLagY = 100 / 0.15

    const inBounds =
      px + pw >= camX - halfWidth - 50 + camLagX &&
      px <= camX + halfWidth + 50 &&
      py <= camY + halfHeight + 50 + maxLagY

    if (inBounds) {
      this.outOfBoundsCooldown = 0
    } else if (this.outOfBoundsCooldown === 0) {
      this.outOfBoundsCooldown = OUT_OF_BOUNDS_COOLDOWN
      this.lives--
      if (this.lives <= 0) {
        this.gameOver()
        return
      }
      this.player.x = Math.max(50, this.player.x - 200)
      this.player.y = 300
      this.player.vx = 0
      this.player.vy = 0
      this.renderer.camera.x = this.player.x
      this.renderer.camera.y = this.player.y - 100
    }
  }

  private handleCollectibles() {
    const coinScore = '+10'
    for (const collectible of this.collectibleManager.getCollectibles()) {
      if (Utils.checkRectCollision(this.player.getBounds(), collectible.getBounds())) {
        collectible.collect()
        this.score += 10
        audioManager.playCollect()
        this.renderer.addParticle(collectible.x + 8, collectible.y + 8, '#ffd93d', 5)
        this.renderer.addFloatingText(collectible.x + 8, collectible.y, coinScore)
      }
    }
  }

  private handleEnemies() {
    const enemyScore = '+50'
    for (const enemy of this.enemyManager.getEnemies()) {
      if (Utils.checkRectCollision(this.player.getBounds(), enemy.getBounds())) {
        if (this.player.vy > 0 && this.player.y + this.player.height < enemy.y + enemy.height / 2) {
          enemy.die()
          this.player.vy = -8
          this.score += 50
          audioManager.playHit()
          this.renderer.addParticle(enemy.x + 8, enemy.y + 8, '#e74c3c', 8)
          this.renderer.addFloatingText(enemy.x + 8, enemy.y, enemyScore, '#ff6b6b')
        } else if (this.player.takeDamage()) {
          this.lives--
          this.renderer.shake(10, 5)
          if (this.lives <= 0) {
            this.gameOver()
            return
          }
        }
      }
    }
  }

  private handleSpawns() {
    const allPlatforms = this.platformManager.platforms
    const lastSpawnedIndex = allPlatforms.findIndex((p: Platform) => p.x > this.player.x + 1000)
    if (lastSpawnedIndex > 0) {
      for (let i = lastSpawnedIndex - 1; i < lastSpawnedIndex + 2 && i < allPlatforms.length; i++) {
        if (allPlatforms[i] && !allPlatforms[i].spawned) {
          allPlatforms[i].spawned = true
          this.collectibleManager.spawnForPlatform(allPlatforms[i])
          this.enemyManager.spawnForPlatform(allPlatforms[i])
        }
      }
    }
  }

  private render() {
    this.renderer.clear()
    this.renderer.drawBackground(this.player.x)
    for (const platform of this.platformManager.getPlatforms()) {
      this.renderer.drawPlatform(platform.x, platform.y, platform.width, platform.height, platform.type)
    }
    for (const collectible of this.collectibleManager.getCollectibles()) {
      this.renderer.drawCoin(collectible.x, collectible.y + collectible.getFloatOffset(), this.frame)
    }
    for (const enemy of this.enemyManager.getEnemies()) {
      this.renderer.drawEnemy(enemy.x, enemy.y, enemy.width, enemy.height, enemy.type)
    }
    if (this.player.isVisible()) {
      this.renderer.drawPixelCharacter(
        this.player.x,
        this.player.y,
        this.player.width,
        this.player.height,
        this.player.color,
        this.player.facing,
      )
    }
    this.renderer.updateParticles()
    this.renderer.renderParticles()
  }

  loop = () => {
    this.update()
    this.render()
    this.animFrameId = requestAnimationFrame(this.loop)
  }

  // ---- input ----

  initInput() {
    const handleKey = (e: KeyboardEvent, pressed: boolean) => {
      switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
          this.input.left = pressed
          break
        case 'ArrowRight':
        case 'KeyD':
          this.input.right = pressed
          break
        case 'ArrowUp':
        case 'KeyW':
        case 'Space':
          if (this.state === 'start' && pressed) {
            this.start()
            e.preventDefault()
            break
          }
          this.input.jump = pressed
          e.preventDefault()
          break
        case 'KeyP':
          if (this.state === 'playing' && pressed) this.pause()
          else if (this.state === 'paused' && pressed) this.resume()
          break
      }
    }
    document.addEventListener('keydown', (e) => handleKey(e, true))
    document.addEventListener('keyup', (e) => handleKey(e, false))

    const btnLeft = document.getElementById('btn-left')
    const btnRight = document.getElementById('btn-right')
    const btnJump = document.getElementById('btn-jump')

    const setTouchInput = (key: 'left' | 'right' | 'jump', value: boolean) => {
      this.input[key] = value
      const btnMap: Record<string, HTMLElement | null> = {
        jump: btnJump ?? null,
        left: btnLeft ?? null,
        right: btnRight ?? null,
      }
      const btn = btnMap[key]
      if (btn) {
        if (value) btn.classList.add('active')
        else btn.classList.remove('active')
      }
    }

    const setupSwipeButton = (
      btn: HTMLElement | null,
      direction: 'left' | 'right',
      oppositeDirection: 'left' | 'right',
    ) => {
      if (!btn) return
      let startX = 0
      const swipeThreshold = 30

      const handleStart = () => {
        this.input[direction] = true
        btn.classList.add('active')
      }

      const handleMove = (e: TouchEvent) => {
        const currentX = e.touches[0].clientX
        const deltaX = currentX - startX
        if (direction === 'left' && deltaX > swipeThreshold) {
          this.input[direction] = false
          this.input[oppositeDirection] = true
          btn.classList.remove('active')
          btnRight?.classList.add('active')
        } else if (direction === 'right' && deltaX < -swipeThreshold) {
          this.input[direction] = false
          this.input[oppositeDirection] = true
          btn.classList.remove('active')
          btnLeft?.classList.add('active')
        }
      }

      const handleEnd = () => {
        this.input[direction] = false
        this.input[oppositeDirection] = false
        btn.classList.remove('active')
        btnRight?.classList.remove('active')
        btnLeft?.classList.remove('active')
      }

      btn.addEventListener('pointerdown', () => {
        this.input[direction] = true
        btn.classList.add('active')
      })
      btn.addEventListener('pointerup', handleEnd)
      btn.addEventListener('pointercancel', handleEnd)
      btn.addEventListener('pointerleave', handleEnd)

      btn.addEventListener(
        'touchstart',
        (e) => {
          e.preventDefault()
          startX = e.touches[0].clientX
          handleStart()
        },
        { passive: false },
      )
      btn.addEventListener(
        'touchmove',
        (e) => {
          e.preventDefault()
          handleMove(e)
        },
        { passive: false },
      )
      btn.addEventListener(
        'touchend',
        (e) => {
          e.preventDefault()
          handleEnd()
        },
        { passive: false },
      )
      btn.addEventListener(
        'touchcancel',
        (e) => {
          e.preventDefault()
          handleEnd()
        },
        { passive: false },
      )
    }

    setupSwipeButton(btnLeft, 'left', 'right')
    setupSwipeButton(btnRight, 'right', 'left')

    if (btnJump) {
      btnJump.addEventListener('pointerdown', () => setTouchInput('jump', true))
      btnJump.addEventListener('pointerup', () => setTouchInput('jump', false))
      btnJump.addEventListener('pointercancel', () => setTouchInput('jump', false))
      btnJump.addEventListener('pointerleave', () => setTouchInput('jump', false))
      btnJump.addEventListener(
        'touchstart',
        (e) => {
          e.preventDefault()
          setTouchInput('jump', true)
        },
        { passive: false },
      )
      btnJump.addEventListener(
        'touchend',
        (e) => {
          e.preventDefault()
          setTouchInput('jump', false)
        },
        { passive: false },
      )
      btnJump.addEventListener(
        'touchcancel',
        (e) => {
          e.preventDefault()
          setTouchInput('jump', false)
        },
        { passive: false },
      )
    }

    this.canvas?.addEventListener(
      'touchstart',
      (e) => {
        e.preventDefault()
        if (this.state === 'start') this.start()
        else if (this.state === 'playing' && this.player.grounded) this.input.jump = true
      },
      { passive: false },
    )
    this.canvas?.addEventListener(
      'touchend',
      (e) => {
        e.preventDefault()
        this.input.jump = false
      },
      { passive: false },
    )
  }

  // ---- lifecycle ----

  destroy() {
    cancelAnimationFrame(this.animFrameId)
    this.state = 'gameover'
  }
}
