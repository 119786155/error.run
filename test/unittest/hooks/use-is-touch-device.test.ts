import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useIsTouchDevice } from '../../../src/hooks/use-is-touch-device'

describe('useIsTouchDevice', () => {
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>
  let originalOntouchstart: unknown
  let originalMaxTouchPoints: number

  beforeEach(() => {
    originalOntouchstart = (window as unknown as Record<string, unknown>).ontouchstart
    originalMaxTouchPoints = navigator.maxTouchPoints

    addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
  })

  afterEach(() => {
    Object.defineProperty(window, 'ontouchstart', {
      value: originalOntouchstart,
      configurable: true,
      writable: true,
    })
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: originalMaxTouchPoints,
      configurable: true,
    })
    vi.restoreAllMocks()
  })

  it('should add resize event listener on mount', () => {
    renderHook(() => useIsTouchDevice())
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('should remove resize event listener on unmount', () => {
    const { unmount } = renderHook(() => useIsTouchDevice())
    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('should detect touch device when ontouchstart is in window', () => {
    Object.defineProperty(window, 'ontouchstart', {
      value: () => {},
      configurable: true,
      writable: true,
    })
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: 0,
      configurable: true,
    })

    const { result } = renderHook(() => useIsTouchDevice())
    expect(result.current).toBe(true)
  })

  it('should detect touch device when maxTouchPoints > 0', () => {
    Object.defineProperty(window, 'ontouchstart', {
      value: undefined,
      configurable: true,
      writable: true,
    })
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: 2,
      configurable: true,
    })

    const { result } = renderHook(() => useIsTouchDevice())
    expect(result.current).toBe(true)
  })

  it('should detect non-touch device when no touch support', () => {
    Object.defineProperty(window, 'ontouchstart', {
      value: undefined,
      configurable: true,
      writable: true,
    })
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: 0,
      configurable: true,
    })

    delete (window as unknown as Record<string, unknown>).ontouchstart

    const { result } = renderHook(() => useIsTouchDevice())
    expect(result.current).toBe(false)
  })
})
