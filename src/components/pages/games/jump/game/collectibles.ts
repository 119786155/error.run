import { Utils } from './utils'

export type CollectibleType = 'coin'

export class Collectible {
  x: number
  y: number
  type: CollectibleType
  width = 16
  height = 16
  collected = false
  private floatOffset = 0

  getFloatOffset(): number {
    return this.floatOffset
  }
  private frame = 0

  constructor(x: number, y: number, type: CollectibleType = 'coin') {
    this.x = x
    this.y = y
    this.type = type
  }

  update(): void {
    this.frame++
    this.floatOffset = Math.sin(this.frame * 0.05) * 3
  }

  getBounds(): { x: number; y: number; width: number; height: number } {
    return {
      x: this.x,
      y: this.y + this.floatOffset,
      width: this.width,
      height: this.height,
    }
  }

  collect(): void {
    this.collected = true
  }
}

export class CollectibleManager {
  collectibles: Collectible[] = []
  private spawnChance = 0.6
  private readonly viewMargin = 1000

  init(): void {
    this.collectibles = []
  }

  spawnForPlatform(platform: { x: number; y: number; width: number }): void {
    if (Math.random() > this.spawnChance) return

    const count = Utils.randomInt(1, 3)
    const spacing = platform.width / (count + 1)

    for (let i = 1; i <= count; i++) {
      const x = platform.x + spacing * i - 8
      const y = platform.y - 30
      this.collectibles.push(new Collectible(x, y, 'coin'))
    }
  }

  update(): void {
    for (const c of this.collectibles) {
      c.update()
    }

    this.collectibles = this.collectibles.filter((c) => !c.collected && c.x > -this.viewMargin)
  }

  getCollectibles(): Collectible[] {
    return this.collectibles.filter((c) => !c.collected)
  }

  reset(): void {
    this.init()
  }
}
