import { describe, expect, it } from 'vitest'
import {
  H1Element,
  H2Element,
  H3Element,
  H4Element,
  H5Element,
  H6Element,
  HeadingElement,
} from '../../../src/components/ui/heading-node'

describe('HeadingElement', () => {
  it('should export HeadingElement component', () => {
    expect(HeadingElement).toBeDefined()
    expect(typeof HeadingElement).toBe('function')
  })

  it('should export H1Element component', () => {
    expect(H1Element).toBeDefined()
    expect(typeof H1Element).toBe('function')
  })

  it('should export H2Element component', () => {
    expect(H2Element).toBeDefined()
    expect(typeof H2Element).toBe('function')
  })

  it('should export H3Element component', () => {
    expect(H3Element).toBeDefined()
    expect(typeof H3Element).toBe('function')
  })

  it('should export H4Element component', () => {
    expect(H4Element).toBeDefined()
    expect(typeof H4Element).toBe('function')
  })

  it('should export H5Element component', () => {
    expect(H5Element).toBeDefined()
    expect(typeof H5Element).toBe('function')
  })

  it('should export H6Element component', () => {
    expect(H6Element).toBeDefined()
    expect(typeof H6Element).toBe('function')
  })
})
