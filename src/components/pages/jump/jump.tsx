import { useEffect, useRef } from 'react'
import { getContent } from '@/i18n'
import '@/components/pages/jump/jump.css'

export const Jump = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const initGame = async () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const { Renderer }: any = await import('@/components/pages/jump/game/renderer')
      const { Player }: any = await import('@/components/pages/jump/game/player')
      const { PlatformManager }: any = await import('@/components/pages/jump/game/platform')
      const { CollectibleManager }: any = await import('@/components/pages/jump/game/collectibles')
      const { EnemyManager }: any = await import('@/components/pages/jump/game/enemy')
      const { audioManager }: any = await import('@/components/pages/jump/game/audio')
      const { Utils }: any = await import('@/components/pages/jump/game/utils')

      class GameInstance {
        canvas: HTMLCanvasElement
        renderer: any
        player: any
        platformManager: any
        collectibleManager: any
        enemyManager: any

        input = { left: false, right: false, jump: false }
        state: 'start' | 'playing' | 'paused' | 'gameover' = 'start'
        score = 0
        lives = 3
        highScore = parseInt(localStorage.getItem('pixelJumpHighScore') || '0')
        frame = 0

        constructor(canvas: HTMLCanvasElement) {
          this.canvas = canvas
          this.renderer = new Renderer(canvas)
          this.player = new Player()
          this.platformManager = new PlatformManager()
          this.collectibleManager = new CollectibleManager()
          this.enemyManager = new EnemyManager()
          this.initInput()
          this.loop()
        }

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

          const handleTouchStart = (key: 'left' | 'right' | 'jump') => (e: TouchEvent) => {
            e.preventDefault()
            this.input[key] = true
            if (key === 'jump') btnJump?.classList.add('active')
            if (key === 'left') btnLeft?.classList.add('active')
            if (key === 'right') btnRight?.classList.add('active')
          }

          const handleTouchEnd = (key: 'left' | 'right' | 'jump') => (e: TouchEvent) => {
            e.preventDefault()
            this.input[key] = false
            if (key === 'jump') btnJump?.classList.remove('active')
            if (key === 'left') btnLeft?.classList.remove('active')
            if (key === 'right') btnRight?.classList.remove('active')
          }

          if (btnLeft) {
            btnLeft.addEventListener('mousedown', () => (this.input.left = true))
            btnLeft.addEventListener('mouseup', () => (this.input.left = false))
            btnLeft.addEventListener('mouseleave', () => (this.input.left = false))
            btnLeft.addEventListener('touchstart', handleTouchStart('left'), { passive: false })
            btnLeft.addEventListener('touchend', handleTouchEnd('left'), { passive: false })
            btnLeft.addEventListener('touchcancel', handleTouchEnd('left'), { passive: false })
          }
          if (btnRight) {
            btnRight.addEventListener('mousedown', () => (this.input.right = true))
            btnRight.addEventListener('mouseup', () => (this.input.right = false))
            btnRight.addEventListener('mouseleave', () => (this.input.right = false))
            btnRight.addEventListener('touchstart', handleTouchStart('right'), { passive: false })
            btnRight.addEventListener('touchend', handleTouchEnd('right'), { passive: false })
            btnRight.addEventListener('touchcancel', handleTouchEnd('right'), { passive: false })
          }
          if (btnJump) {
            btnJump.addEventListener('mousedown', () => (this.input.jump = true))
            btnJump.addEventListener('mouseup', () => (this.input.jump = false))
            btnJump.addEventListener('mouseleave', () => (this.input.jump = false))
            btnJump.addEventListener('touchstart', handleTouchStart('jump'), { passive: false })
            btnJump.addEventListener('touchend', handleTouchEnd('jump'), { passive: false })
            btnJump.addEventListener('touchcancel', handleTouchEnd('jump'), { passive: false })
          }

          canvas?.addEventListener(
            'touchstart',
            (e) => {
              e.preventDefault()
              if (this.state === 'start') {
                game.start()
              } else if (this.state === 'playing' && this.player.grounded) {
                this.input.jump = true
              }
            },
            { passive: false },
          )

          canvas?.addEventListener(
            'touchend',
            (e) => {
              e.preventDefault()
              this.input.jump = false
            },
            { passive: false },
          )
        }

        start() {
          audioManager.init()
          this.state = 'playing'
          this.score = 0
          this.lives = 3
          this.frame = 0
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
          this.state = 'paused'
          document.getElementById('pause-screen')?.classList.add('active')
        }

        resume() {
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
          if (finalScoreEl) finalScoreEl.textContent = `${getContent('jump.ui.score')}: ${this.score}`
          if (finalHighScoreEl) finalHighScoreEl.textContent = `${getContent('jump.ui.highScore')}: ${this.highScore}`
          document.getElementById('gameover-screen')?.classList.add('active')
        }

        updateUI() {
          const scoreEl = document.getElementById('score-display')
          const highScoreEl = document.getElementById('high-score-display')
          const livesEl = document.getElementById('lives-display')
          if (scoreEl) scoreEl.textContent = `${getContent('jump.ui.score')}: ${this.score}`
          if (highScoreEl) highScoreEl.textContent = `${getContent('jump.ui.highScore')}: ${this.highScore}`
          if (livesEl) livesEl.textContent = `${getContent('jump.ui.lives')}: ` + '♥'.repeat(this.lives)
        }

        update() {
          if (this.state !== 'playing') return
          this.frame++
          this.platformManager.update(this.player.x)
          this.collectibleManager.update()
          this.enemyManager.update()
          this.player.update(this.input, this.platformManager.getPlatforms())

          const targetCamX = this.player.x
          const targetCamY = this.player.y - 100
          this.renderer.camera.x += (targetCamX - this.renderer.camera.x) * 0.1
          this.renderer.camera.y += (targetCamY - this.renderer.camera.y) * 0.05

          const halfWidth = this.renderer.width / 2
          const halfHeight = this.renderer.height / 2
          const camX = this.renderer.camera.x
          const camY = this.renderer.camera.y
          const px = this.player.x
          const py = this.player.y
          const pw = this.player.width
          const ph = this.player.height

          const outOfBounds =
            px + pw < camX - halfWidth - 50 ||
            px > camX + halfWidth + 50 ||
            py + ph < camY - halfHeight - 50 ||
            py > camY + halfHeight + 50

          if (outOfBounds) {
            this.lives = 0
            this.gameOver()
            return
          }

          for (const collectible of this.collectibleManager.getCollectibles()) {
            if (Utils.checkRectCollision(this.player.getBounds(), collectible.getBounds())) {
              collectible.collect()
              this.score += 10
              audioManager.playCollect()
              this.renderer.addParticle(collectible.x + 8, collectible.y + 8, '#ffd93d', 5)
              this.renderer.addFloatingText(collectible.x + 8, collectible.y, getContent('jump.score.coin'))
            }
          }

          for (const enemy of this.enemyManager.getEnemies()) {
            if (Utils.checkRectCollision(this.player.getBounds(), enemy.getBounds())) {
              if (this.player.vy > 0 && this.player.y + this.player.height < enemy.y + enemy.height / 2) {
                enemy.die()
                this.player.vy = -8
                this.score += 50
                audioManager.playHit()
                this.renderer.addParticle(enemy.x + 8, enemy.y + 8, '#e74c3c', 8)
                this.renderer.addFloatingText(enemy.x + 8, enemy.y, getContent('jump.score.enemy'), '#ff6b6b')
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

          const allPlatforms = this.platformManager.platforms
          const lastSpawnedIndex = allPlatforms.findIndex((p: any) => p.x > this.player.x + 1000)
          if (lastSpawnedIndex > 0) {
            for (let i = lastSpawnedIndex - 1; i < lastSpawnedIndex + 2 && i < allPlatforms.length; i++) {
              if (allPlatforms[i] && !(allPlatforms[i] as any).spawned) {
                ;(allPlatforms[i] as any).spawned = true
                this.collectibleManager.spawnForPlatform(allPlatforms[i])
                this.enemyManager.spawnForPlatform(allPlatforms[i])
              }
            }
          }

          this.score = Math.max(this.score, Math.floor(this.player.x / 10))
          this.updateUI()
        }

        render() {
          this.renderer.clear()
          this.renderer.drawBackground(this.player.x)
          for (const platform of this.platformManager.getPlatforms()) {
            this.renderer.drawPlatform(platform.x, platform.y, platform.width, platform.height, platform.type)
          }
          for (const collectible of this.collectibleManager.getCollectibles()) {
            this.renderer.drawCoin(collectible.x, collectible.y + collectible.floatOffset, this.frame)
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
          requestAnimationFrame(this.loop)
        }
      }

      const game = new GameInstance(canvas)
      ;(window as any).game = game

      document.getElementById('start-btn')?.addEventListener('click', () => game.start())
      document.getElementById('restart-btn')?.addEventListener('click', () => game.start())
      document.getElementById('resume-btn')?.addEventListener('click', () => game.resume())
    }

    initGame()
  }, [])

  return (
    <div className="game-wrapper">
      <div id="game-container">
        <canvas id="game-canvas" ref={canvasRef} />
        <div id="ui-layer">
          <div id="start-screen" className="screen active">
            <h1>{getContent('jump.title')}</h1>
            <p className="subtitle">{getContent('jump.subtitle')}</p>
            <div className="controls-info">
              <p>{getContent('jump.controls.left')}</p>
              <p>{getContent('jump.controls.right')}</p>
              <p>{getContent('jump.controls.jump')}</p>
              <p>{getContent('jump.controls.pause')}</p>
            </div>
            <button id="start-btn" className="pixel-btn">
              {getContent('jump.btn.start')}
            </button>
          </div>
          <div id="game-ui" className="screen">
            <div id="score-display">{getContent('jump.ui.score')}: 0</div>
            <div id="high-score-display">{getContent('jump.ui.highScore')}: 0</div>
            <div id="lives-display">{getContent('jump.ui.lives')}: ♥♥♥</div>
          </div>
          <div id="pause-screen" className="screen">
            <h2>{getContent('jump.screen.pause.title')}</h2>
            <button id="resume-btn" className="pixel-btn">
              {getContent('jump.btn.resume')}
            </button>
          </div>
          <div id="gameover-screen" className="screen">
            <h2>{getContent('jump.screen.gameover.title')}</h2>
            <p id="final-score">{getContent('jump.screen.gameover.finalScore')}: 0</p>
            <p id="final-high-score">{getContent('jump.ui.highScore')}: 0</p>
            <button id="restart-btn" className="pixel-btn">
              {getContent('jump.btn.restart')}
            </button>
          </div>
        </div>
        <div id="mobile-controls">
          <div id="dpad">
            <button id="btn-left" className="ctrl-btn">
              ←
            </button>
            <button id="btn-right" className="ctrl-btn">
              →
            </button>
          </div>
          <button id="btn-jump" className="ctrl-btn jump">
            {getContent('jump.mobile.jump')}
          </button>
        </div>
      </div>
    </div>
  )
}
