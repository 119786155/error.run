type OscillatorType = 'sine' | 'square' | 'sawtooth' | 'triangle'

class AudioManager {
  private ctx: AudioContext | null = null
  private initialized = false
  private muted = false

  init(): void {
    if (this.initialized) return
    try {
      // biome-ignore lint/suspicious/noExplicitAny: webkit prefix support
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      this.initialized = true
    } catch (_e) {
      console.warn('Web Audio API not supported')
    }
  }

  playJump(): void {
    if (this.muted || !this.initialized) return
    this.playTone(300, 0.1, 'square')
    setTimeout(() => this.playTone(450, 0.1, 'square'), 50)
  }

  playCollect(): void {
    if (this.muted || !this.initialized) return
    this.playTone(600, 0.05, 'square')
    setTimeout(() => this.playTone(800, 0.1, 'square'), 50)
  }

  playHit(): void {
    if (this.muted || !this.initialized) return
    this.playTone(150, 0.2, 'sawtooth')
    setTimeout(() => this.playTone(100, 0.3, 'sawtooth'), 100)
  }

  playGameOver(): void {
    if (this.muted || !this.initialized) return
    ;[300, 250, 200, 150].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.3, 'square'), i * 200)
    })
  }

  playTone(frequency: number, duration: number, type: OscillatorType = 'square'): void {
    if (!this.ctx) return
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(frequency, this.ctx.currentTime)
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration)
    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start(this.ctx.currentTime)
    osc.stop(this.ctx.currentTime + duration)
  }

  toggleMute(): boolean {
    this.muted = !this.muted
    return this.muted
  }
}

export const audioManager = new AudioManager()
