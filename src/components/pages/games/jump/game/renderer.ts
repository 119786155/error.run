import { Utils } from './utils'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  decay: number
  color: string
  size: number
}

interface FloatingText {
  x: number
  y: number
  text: string
  color: string
  life: number
  vy: number
}

interface Camera {
  x: number
  y: number
}

type PlatformType = 'normal' | 'moving' | 'crumbling'

export class Renderer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  readonly width = 800
  readonly height = 600
  camera: Camera = { x: 0, y: 0 }
  private shakeTimer = 0
  private shakeIntensity = 0
  private particles: Particle[] = []
  private floatingTexts: FloatingText[] = []
  private bgOffset = 0

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    // biome-ignore lint/style/noNonNullAssertion: 2d context always available
    this.ctx = canvas.getContext('2d')!
    this.resize()
    window.addEventListener('resize', () => this.resize())
  }

  resize(): void {
    const container = this.canvas.parentElement
    // biome-ignore lint/style/noNonNullAssertion: container always exists when resize is called
    const rect = container!.getBoundingClientRect()
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.canvas.style.width = `${rect.width}px`
    this.canvas.style.height = `${rect.height}px`
  }

  setCamera(x: number, y: number): void {
    this.camera.x = x
    this.camera.y = y
  }

  shake(duration: number, intensity: number): void {
    this.shakeTimer = duration
    this.shakeIntensity = intensity
  }

  addParticle(x: number, y: number, color: string, count = 1, speed = 2): void {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        life: 1.0,
        decay: 0.02 + Math.random() * 0.03,
        color,
        size: 2 + Math.random() * 3,
      })
    }
  }

  addFloatingText(x: number, y: number, text: string, color = '#ffd93d'): void {
    this.floatingTexts.push({
      x,
      y,
      text,
      color,
      life: 1.0,
      vy: -1,
    })
  }

  clear(): void {
    this.ctx.fillStyle = '#0f0f1a'
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  drawBackground(scrollX: number): void {
    this.bgOffset = scrollX * 0.3

    for (let i = 0; i < 100; i++) {
      const x = (((i * 137.5 + this.bgOffset * 0.1) % this.width) + this.width) % this.width
      const y = (i * 73.3) % this.height
      const brightness = 0.3 + (i % 5) * 0.15
      const size = 1 + (i % 3)
      this.ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`
      this.ctx.fillRect(x, y, size, size)
    }

    this.drawMountains(scrollX * 0.2, '#1a1a3e', 150, 0.3)
    this.drawMountains(scrollX * 0.4, '#2a2a4e', 100, 0.5)
  }

  private drawMountains(offset: number, color: string, baseHeight: number, opacity: number): void {
    this.ctx.fillStyle = color
    this.ctx.globalAlpha = opacity
    this.ctx.beginPath()
    this.ctx.moveTo(0, this.height)

    for (let x = 0; x <= this.width; x += 10) {
      const worldX = x + offset
      const height = baseHeight + Math.sin(worldX * 0.01) * 50 + Math.sin(worldX * 0.03) * 30
      this.ctx.lineTo(x, this.height - height)
    }

    this.ctx.lineTo(this.width, this.height)
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.globalAlpha = 1
  }

  worldToScreen(x: number, y: number): { x: number; y: number } {
    let screenX = x - this.camera.x + this.width / 2
    let screenY = y - this.camera.y + this.height / 2

    if (this.shakeTimer > 0) {
      screenX += (Math.random() - 0.5) * this.shakeIntensity
      screenY += (Math.random() - 0.5) * this.shakeIntensity
    }

    return { x: screenX, y: screenY }
  }

  updateParticles(): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.05
      p.life -= p.decay

      if (p.life <= 0) {
        this.particles.splice(i, 1)
      }
    }

    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const t = this.floatingTexts[i]
      t.y += t.vy
      t.life -= 0.02

      if (t.life <= 0) {
        this.floatingTexts.splice(i, 1)
      }
    }

    if (this.shakeTimer > 0) {
      this.shakeTimer--
    }
  }

  renderParticles(): void {
    for (const p of this.particles) {
      this.ctx.globalAlpha = p.life
      this.ctx.fillStyle = p.color
      this.ctx.fillRect(p.x - this.camera.x + this.width / 2, p.y - this.camera.y + this.height / 2, p.size, p.size)
    }
    this.ctx.globalAlpha = 1

    for (const t of this.floatingTexts) {
      this.ctx.globalAlpha = t.life
      Utils.drawPixelText(
        this.ctx,
        t.text,
        t.x - this.camera.x + this.width / 2,
        t.y - this.camera.y + this.height / 2,
        14,
        t.color,
        'center',
      )
    }
    this.ctx.globalAlpha = 1
  }

  drawPixelCharacter(x: number, y: number, width: number, height: number, color: string, facing = 1): void {
    const screen = this.worldToScreen(x, y)
    this.ctx.save()
    this.ctx.translate(screen.x + width / 2, screen.y + height / 2)
    this.ctx.scale(facing, 1)
    this.ctx.translate(-width / 2, -height / 2)

    // Claude crab (小螃蟹) - pixel art style
    // Eye stalks
    this.ctx.fillStyle = color
    this.ctx.fillRect(4, 0, 2, 3)
    this.ctx.fillRect(10, 0, 2, 3)
    this.ctx.fillStyle = '#fff'
    this.ctx.fillRect(4, 0, 2, 2)
    this.ctx.fillRect(10, 0, 2, 2)
    this.ctx.fillStyle = '#1a1a2e'
    this.ctx.fillRect(5, 0, 1, 1)
    this.ctx.fillRect(11, 0, 1, 1)

    // Main body (carapace)
    this.ctx.fillStyle = color
    this.ctx.fillRect(1, 3, 14, 8)

    // Carapace highlight
    this.ctx.fillStyle = Utils.lightenColor(color, 30)
    this.ctx.fillRect(3, 3, 10, 2)

    // Carapace center detail
    this.ctx.fillStyle = Utils.darkenColor(color, 20)
    this.ctx.fillRect(5, 6, 6, 1)

    // Front edge (claw attachment area)
    this.ctx.fillStyle = Utils.darkenColor(color, 10)
    this.ctx.fillRect(1, 8, 14, 3)

    // Claws (pinchers) - left claw
    this.ctx.fillStyle = '#e74c3c'
    this.ctx.fillRect(-2, 2, 4, 4)
    this.ctx.fillRect(-3, 2, 2, 2)
    this.ctx.fillRect(-3, 3, 2, 2)
    // Left claw pincer teeth
    this.ctx.fillRect(-3, 4, 2, 2)
    this.ctx.fillRect(-1, 5, 2, 1)

    // Claws - right claw
    this.ctx.fillStyle = '#e74c3c'
    this.ctx.fillRect(14, 2, 4, 4)
    this.ctx.fillRect(17, 2, 2, 2)
    this.ctx.fillRect(17, 3, 2, 2)
    // Right claw pincer teeth
    this.ctx.fillRect(17, 4, 2, 2)
    this.ctx.fillRect(15, 5, 2, 1)

    // Claws inner (lighter)
    this.ctx.fillStyle = '#c0392b'
    this.ctx.fillRect(0, 4, 1, 2)
    this.ctx.fillRect(15, 4, 1, 2)

    // Legs (bottom)
    this.ctx.fillStyle = Utils.darkenColor(color, 30)
    // Left legs
    this.ctx.fillRect(2, 11, 3, 2)
    this.ctx.fillRect(1, 13, 3, 2)
    this.ctx.fillRect(4, 11, 2, 2)
    // Right legs
    this.ctx.fillRect(11, 11, 3, 2)
    this.ctx.fillRect(12, 13, 3, 2)
    this.ctx.fillRect(10, 11, 2, 2)

    // Mouth/mandible (small smile)
    this.ctx.fillStyle = Utils.darkenColor(color, 20)
    this.ctx.fillRect(6, 9, 4, 1)
    this.ctx.fillRect(7, 8, 2, 1)

    this.ctx.restore()
  }

  drawPlatform(x: number, y: number, width: number, height: number, type: PlatformType = 'normal'): void {
    const screen = this.worldToScreen(x, y)
    const colors: Record<PlatformType, { top: string; body: string }> = {
      normal: { top: '#4ecdc4', body: '#2a8a82' },
      moving: { top: '#ffd93d', body: '#c9a227' },
      crumbling: { top: '#ff6b6b', body: '#c44d4d' },
    }
    const c = colors[type] || colors.normal

    this.ctx.fillStyle = c.body
    this.ctx.fillRect(screen.x, screen.y + 4, width, height - 4)

    this.ctx.fillStyle = c.top
    this.ctx.fillRect(screen.x, screen.y, width, 4)

    this.ctx.fillStyle = 'rgba(0,0,0,0.2)'
    for (let i = 0; i < width; i += 8) {
      this.ctx.fillRect(screen.x + i, screen.y + 4, 2, height - 4)
    }
  }

  drawCoin(x: number, y: number, frame: number): void {
    const screen = this.worldToScreen(x, y)
    const offset = Math.sin(frame * 0.1) * 2

    this.ctx.fillStyle = '#ffd93d'
    this.ctx.fillRect(screen.x + 2 + offset, screen.y + 2, 4, 8)
    this.ctx.fillRect(screen.x + offset, screen.y + 4, 8, 4)

    this.ctx.fillStyle = '#fff'
    this.ctx.fillRect(screen.x + 3 + offset, screen.y + 4, 2, 4)
  }

  drawEnemy(x: number, y: number, _width: number, _height: number, type: 'walker' | 'flyer' = 'walker'): void {
    const screen = this.worldToScreen(x, y)

    if (type === 'walker') {
      this.ctx.fillStyle = '#e74c3c'
      this.ctx.fillRect(screen.x + 2, screen.y + 4, 12, 10)

      this.ctx.fillStyle = '#c0392b'
      this.ctx.fillRect(screen.x + 2, screen.y + 2, 2, 4)
      this.ctx.fillRect(screen.x + 6, screen.y, 4, 6)
      this.ctx.fillRect(screen.x + 12, screen.y + 2, 2, 4)

      this.ctx.fillStyle = '#fff'
      this.ctx.fillRect(screen.x + 4, screen.y + 6, 3, 3)
      this.ctx.fillRect(screen.x + 10, screen.y + 6, 3, 3)
      this.ctx.fillStyle = '#000'
      this.ctx.fillRect(screen.x + 6, screen.y + 7, 1, 2)
      this.ctx.fillRect(screen.x + 11, screen.y + 7, 1, 2)
    } else if (type === 'flyer') {
      this.ctx.fillStyle = '#9b59b6'
      this.ctx.fillRect(screen.x + 2, screen.y + 6, 12, 8)

      this.ctx.fillStyle = '#8e44ad'
      const wingOffset = Math.sin(Date.now() * 0.01) * 3
      this.ctx.fillRect(screen.x - 2, screen.y + 4 + wingOffset, 6, 4)
      this.ctx.fillRect(screen.x + 12, screen.y + 4 - wingOffset, 6, 4)
    }
  }

  drawSpike(x: number, y: number, width: number, height: number): void {
    const screen = this.worldToScreen(x, y)
    this.ctx.fillStyle = '#95a5a6'

    const spikeCount = Math.floor(width / 8)
    for (let i = 0; i < spikeCount; i++) {
      const sx = screen.x + i * 8
      this.ctx.beginPath()
      this.ctx.moveTo(sx, screen.y + height)
      this.ctx.lineTo(sx + 4, screen.y)
      this.ctx.lineTo(sx + 8, screen.y + height)
      this.ctx.closePath()
      this.ctx.fill()
    }
  }
}
