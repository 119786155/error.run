interface Rect {
  x: number
  y: number
  width: number
  height: number
}

interface Platform {
  x: number
  y: number
  width: number
  height: number
  vy?: number
}

interface Player extends Rect {
  vy: number
}

interface Context2D {
  fillStyle: string | CanvasGradient | CanvasPattern
  font: string
  textAlign: string
  fillRect(x: number, y: number, width: number, height: number): void
  fillText(text: string, x: number, y: number): void
}

export const Utils = {
  randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min
  },

  randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },

  clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value))
  },

  lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t
  },

  checkRectCollision(rect1: Rect, rect2: Rect): boolean {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    )
  },

  checkPlatformCollision(player: Player, platform: Platform): boolean {
    const playerBottom = player.y + player.height
    const playerPrevBottom = player.y + player.height - player.vy
    const platformTop = platform.y

    if (
      player.vy >= 0 &&
      playerBottom >= platformTop &&
      playerPrevBottom <= platformTop + platform.height &&
      player.x + player.width > platform.x &&
      player.x < platform.x + platform.width
    ) {
      return true
    }
    return false
  },

  formatScore(score: number): string {
    return score.toString().padStart(6, '0')
  },

  drawPixelRect(ctx: Context2D, x: number, y: number, width: number, height: number, color: string): void {
    ctx.fillStyle = color
    ctx.fillRect(Math.floor(x), Math.floor(y), width, height)
  },

  drawPixelText(
    ctx: Context2D,
    text: string,
    x: number,
    y: number,
    size = 16,
    color = '#fff',
    align: CanvasTextAlign = 'left',
  ): void {
    ctx.font = `${size}px 'Courier New', monospace`
    ctx.fillStyle = color
    ctx.textAlign = align
    ctx.fillText(text, x, y)
  },

  darkenColor(hex: string, amount: number): string {
    const num = parseInt(hex.replace('#', ''), 16)
    const r = Math.max(0, (num >> 16) - amount)
    const g = Math.max(0, ((num >> 8) & 0x00ff) - amount)
    const b = Math.max(0, (num & 0x0000ff) - amount)
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
  },

  lightenColor(hex: string, amount: number): string {
    const num = parseInt(hex.replace('#', ''), 16)
    const r = Math.min(255, (num >> 16) + amount)
    const g = Math.min(255, ((num >> 8) & 0x00ff) + amount)
    const b = Math.min(255, (num & 0x0000ff) + amount)
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
  },

  isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  },
}
