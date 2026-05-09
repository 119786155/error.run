import { Utils } from './utils'

export type PlatformType = 'normal' | 'moving' | 'crumbling'

export class Platform {
  x: number
  y: number
  width: number
  height: number
  type: PlatformType
  private startX: number
  moveRange = 100
  moveSpeed = 1
  moveDirection = 1
  private crumbleTimer = 0
  crumbling = false
  visible = true
  spawned?: boolean

  constructor(x: number, y: number, width: number, height: number, type: PlatformType = 'normal') {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.type = type
    this.startX = x
  }

  update(): void {
    if (this.type === 'moving') {
      this.x += this.moveSpeed * this.moveDirection
      if (Math.abs(this.x - this.startX) > this.moveRange) {
        this.moveDirection *= -1
      }
    }

    if (this.crumbling && this.crumbleTimer > 0) {
      this.crumbleTimer--
      if (this.crumbleTimer <= 0) {
        this.visible = false
      }
    }
  }

  startCrumble(): void {
    if (this.type === 'crumbling' && !this.crumbling) {
      this.crumbling = true
      this.crumbleTimer = 60
    }
  }

  reset(): void {
    if (this.type === 'crumbling') {
      this.crumbling = false
      this.crumbleTimer = 0
      this.visible = true
    }
    if (this.type === 'moving') {
      this.x = this.startX
      this.moveDirection = 1
    }
  }

  getBounds(): { x: number; y: number; width: number; height: number } {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    }
  }
}

export class PlatformManager {
  platforms: Platform[] = []
  private lastPlatformX = 0
  private gapMin = 60
  private gapMax = 120
  private platformWidthMin = 80
  private platformWidthMax = 200
  private difficulty = 1

  init(): void {
    this.platforms = []
    this.lastPlatformX = 0
    this.difficulty = 1

    this.platforms.push(new Platform(0, 400, 300, 20, 'normal'))
    this.lastPlatformX = 300

    for (let i = 0; i < 10; i++) {
      this.generatePlatform()
    }
  }

  private generatePlatform(): void {
    const clampedDifficulty = Math.min(this.difficulty, 12)
    const gap = Utils.randomInt(Math.max(10, this.gapMin - clampedDifficulty * 5), this.gapMax)
    const width = Utils.randomInt(Math.max(50, this.platformWidthMin - clampedDifficulty * 5), this.platformWidthMax)
    const height = 20

    const lastY = this.platforms.length > 0 ? this.platforms[this.platforms.length - 1].y : 400
    const yVariation = Utils.randomInt(-80, 80)
    const y = Utils.clamp(lastY + yVariation, 200, 500)

    let type: PlatformType = 'normal'
    const rand = Math.random()
    if (this.difficulty > 2 && rand < 0.15) {
      type = 'moving'
    } else if (this.difficulty > 3 && rand < 0.25) {
      type = 'crumbling'
    }

    const platform = new Platform(this.lastPlatformX + gap, y, width, height, type)

    if (type === 'moving') {
      platform.moveRange = Utils.randomInt(50, 100)
      platform.moveSpeed = 0.5 + this.difficulty * 0.2
    }

    this.platforms.push(platform)
    this.lastPlatformX += gap + width
  }

  update(playerX: number): void {
    for (const platform of this.platforms) {
      platform.update()
    }

    this.platforms = this.platforms.filter((p) => p.x + p.width > playerX - 1000)

    while (this.lastPlatformX < playerX + 1500) {
      this.generatePlatform()
    }

    this.difficulty = 1 + Math.floor(playerX / 2000)
  }

  getPlatforms(): Platform[] {
    return this.platforms.filter((p) => p.visible)
  }

  reset(): void {
    this.init()
  }
}
