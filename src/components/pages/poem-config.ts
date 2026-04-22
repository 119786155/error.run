export type ParticleConfig = {
  count: number
  colors: string[]
  minSize: number
  maxSize: number
  minDuration: number
  maxDuration: number
  minDelay: number
  maxDelay: number
}

export type ThemeConfig = {
  colors: string[]
  background: {
    light: string
    dark: string
  }
}

export const themes = {
  pink: {
    colors: ['#e45a84', '#ffacac'],
    background: {
      light: '#fff',
      dark: '#000',
    },
  },
  blue: {
    colors: ['#5a84e4', '#accbff'],
    background: {
      light: '#f0f4f8',
      dark: '#0a1929',
    },
  },
  green: {
    colors: ['#5ae484', '#acffc3'],
    background: {
      light: '#f0f8f0',
      dark: '#0a2915',
    },
  },
  purple: {
    colors: ['#845ae4', '#c3acff'],
    background: {
      light: '#f8f0f8',
      dark: '#290a29',
    },
  },
}

export const defaultConfig: ParticleConfig = {
  count: 50,
  colors: themes.purple.colors,
  minSize: 0.5,
  maxSize: 1.5,
  minDuration: 10,
  maxDuration: 400,
  minDelay: -500,
  maxDelay: 0,
}
