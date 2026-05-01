import { audioManager } from './audio'
import type { Platform } from './platform'
import { Utils } from './utils'

interface Input {
  left: boolean
  right: boolean
  jump: boolean
}

export class Player {
  x = 50
  y = 300
  width = 16
  height = 18
  vx = 0
  vy = 0
  speed = 4
  jumpPower = -10
  gravity = 0.4
  grounded = false
  facing = 1
  color = '#4ecdc4'
  invincible = false
  private invincibleTimer = 0
  private blinkTimer = 0
  private frame = 0
  onPlatform: Platform | null = null

  update(input: Input, platforms: Platform[]): void {
    this.frame++

    if (input.left) {
      this.vx = -this.speed
      this.facing = -1
    } else if (input.right) {
      this.vx = this.speed
      this.facing = 1
    } else {
      this.vx *= 0.8
    }

    if (input.jump && this.grounded) {
      this.vy = this.jumpPower
      this.grounded = false
      this.onPlatform = null
      audioManager.playJump()
    }

    this.vy += this.gravity

    this.x += this.vx
    this.y += this.vy

    this.grounded = false
    this.onPlatform = null

    for (const platform of platforms) {
      if (Utils.checkPlatformCollision(this, platform)) {
        this.y = platform.y - this.height
        this.vy = 0
        this.grounded = true
        this.onPlatform = platform

        if (platform.type === 'crumbling') {
          platform.startCrumble()
        }
        break
      }
    }

    if (this.onPlatform && this.onPlatform.type === 'moving') {
      this.x += this.onPlatform.moveSpeed * this.onPlatform.moveDirection
    }

    if (this.invincible) {
      this.invincibleTimer--
      this.blinkTimer++
      if (this.invincibleTimer <= 0) {
        this.invincible = false
      }
    }
  }

  takeDamage(): boolean {
    if (this.invincible) return false
    this.invincible = true
    this.invincibleTimer = 120
    this.blinkTimer = 0
    this.vy = -5
    audioManager.playHit()
    return true
  }

  getBounds(): { x: number; y: number; width: number; height: number } {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    }
  }

  reset(): void {
    this.x = 50
    this.y = 300
    this.vx = 0
    this.vy = 0
    this.grounded = false
    this.facing = 1
    this.invincible = false
    this.invincibleTimer = 0
    this.onPlatform = null
  }

  isVisible(): boolean {
    if (!this.invincible) return true
    return Math.floor(this.blinkTimer / 4) % 2 === 0
  }
}
