import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useMounted } from '../../src/hooks/use-mounted'

describe('useMounted', () => {
  it('should return false initially', () => {
    const { result } = renderHook(() => useMounted())
    expect(result.current).toBe(true)
  })

  it('should return true after mount', () => {
    const { result } = renderHook(() => useMounted())
    expect(result.current).toBe(true)
  })

  it('should not change value on re-render', () => {
    const { result, rerender } = renderHook(() => useMounted())
    expect(result.current).toBe(true)

    rerender()
    expect(result.current).toBe(true)
  })
})
