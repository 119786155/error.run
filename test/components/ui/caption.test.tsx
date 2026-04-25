import { describe, expect, it } from 'vitest'
import { Caption, CaptionTextarea } from '../../../src/components/ui/caption'

describe('Caption', () => {
  it('should export Caption component', () => {
    expect(Caption).toBeDefined()
    expect(typeof Caption).toBe('function')
  })

  it('should export CaptionTextarea component', () => {
    expect(CaptionTextarea).toBeDefined()
    expect(typeof CaptionTextarea).toBe('function')
  })
})
