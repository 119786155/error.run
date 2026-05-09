export type EnemyType = 'walker' | 'flyer'

export class Enemy {
  x: number
  y: number
  type: EnemyType
  width = 16
  height = 16
  vx = 0
  vy = 0
  direction = -1
  speed = 1
  patrolRange = 60
  private startX: number
  private frame = 0
  alive = true

  constructor(x: number, y: number, type: EnemyType = 'walker') {
    this.x = x
    this.y = y
    this.type = type
    this.startX = x
  }

  update(): void {
    this.frame++

    if (this.type === 'walker') {
      this.vx = this.speed * this.direction
      this.x += this.vx

      if (Math.abs(this.x - this.startX) > this.patrolRange) {
        this.direction *= -1
      }
    } else if (this.type === 'flyer') {
      this.x += this.speed * this.direction
      this.y += Math.sin(this.frame * 0.03) * 0.5

      if (Math.abs(this.x - this.startX) > this.patrolRange * 1.5) {
        this.direction *= -1
      }
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

  die(): void {
    this.alive = false
  }
}

export class EnemyManager {
  enemies: Enemy[] = []
  private spawnChance = 0.3
  private readonly viewMargin = 1000

  init(): void {
    this.enemies = []
  }

  spawnForPlatform(platform: { x: number; y: number; width: number }): void {
    if (Math.random() > this.spawnChance) return

    const type: EnemyType = Math.random() < 0.7 ? 'walker' : 'flyer'
    const x = platform.x + platform.width / 2 - 8
    const y = platform.y - 16

    const enemy = new Enemy(x, y, type)
    enemy.patrolRange = platform.width / 2 - 10
    enemy.speed = 0.5 + Math.random() * 0.5

    if (type === 'flyer') {
      enemy.y -= 40
      enemy.speed *= 1.5
    }

    this.enemies.push(enemy)
  }

  update(): void {
    for (const enemy of this.enemies) {
      if (enemy.alive) {
        enemy.update()
      }
    }

    this.enemies = this.enemies.filter((e) => e.alive && e.x > -this.viewMargin)
  }

  getEnemies(): Enemy[] {
    return this.enemies
  }

  reset(): void {
    this.init()
  }
}
