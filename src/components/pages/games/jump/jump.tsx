import { useEffect, useRef } from 'react'
import '@/components/pages/games/jump/jump.css'
import { GameEngine } from './game/gameEngine'

export const Jump = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    ;(async () => {
      const [{ Renderer }, { Player }, { PlatformManager }, { CollectibleManager }, { EnemyManager }] =
        await Promise.all([
          import('./game/renderer'),
          import('./game/player'),
          import('./game/platform'),
          import('./game/collectibles'),
          import('./game/enemy'),
        ])

      const game = new GameEngine(canvas, { Renderer, Player, PlatformManager, CollectibleManager, EnemyManager })
      game.initInput()
      game.loop()

      document.getElementById('start-btn')?.addEventListener('click', () => game.start())
      document.getElementById('restart-btn')?.addEventListener('click', () => game.start())
      document.getElementById('resume-btn')?.addEventListener('click', () => game.resume())

      return () => {
        game.destroy()
      }
    })()
  }, [])

  return (
    <div className="game-wrapper">
      <div id="game-container">
        <canvas id="game-canvas" ref={canvasRef} />
        <div id="ui-layer">
          <div id="start-screen" className="screen active">
            <h1>Pixel Jump Adventure</h1>
            <div className="controls-info">
              <p>A / ← : Move left</p>
              <p>D / → : Move right</p>
              <p>W / ↑ / Space : Jump</p>
              <p>P : Pause game</p>
            </div>
            <button id="start-btn" type="button" className="pixel-btn">
              Start Game
            </button>
          </div>
          <div id="game-ui" className="screen">
            <div id="score-display">Score: 0</div>
            <div id="high-score-display">High Score: 0</div>
            <div id="lives-display">Lives: ♥♥♥</div>
          </div>
          <div id="pause-screen" className="screen">
            <h2>Game Paused</h2>
            <button id="resume-btn" type="button" className="pixel-btn">
              Resume
            </button>
          </div>
          <div id="gameover-screen" className="screen">
            <h2>Game Over</h2>
            <p id="final-score">Final Score: 0</p>
            <p id="final-high-score">High Score: 0</p>
            <button id="restart-btn" type="button" className="pixel-btn">
              Play Again
            </button>
          </div>
        </div>
        <div id="mobile-controls">
          <div id="dpad">
            <button id="btn-left" type="button" className="ctrl-btn swipe-btn">
              <span className="swipe-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  role="img"
                  aria-label="Previous"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" className="arrow-main" />
                  <path d="M19 12H5M12 5l-7 7 7 7" className="arrow-hint" />
                </svg>
              </span>
            </button>
            <button id="btn-right" type="button" className="ctrl-btn swipe-btn">
              <span className="swipe-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  role="img"
                  aria-label="Next"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" className="arrow-main" />
                  <path d="M5 12h14M12 19l7-7-7-7" className="arrow-hint" />
                </svg>
              </span>
            </button>
          </div>
          <button id="btn-jump" type="button" className="ctrl-btn jump">
            JUMP
          </button>
        </div>
      </div>
    </div>
  )
}
