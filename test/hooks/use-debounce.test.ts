import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useDebounce } from '../../src/hooks/use-debounce'

describe('useDebounce', () => {
  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500))
    expect(result.current).toBe('initial')
  })

  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 100 },
    })

    expect(result.current).toBe('initial')

    rerender({ value: 'changed', delay: 100 })
    expect(result.current).toBe('initial')

    await waitFor(() => expect(result.current).toBe('changed'), { timeout: 200 })
  })

  it('should cancel previous timeout when value changes rapidly', async () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'a', delay: 50 },
    })

    rerender({ value: 'b', delay: 50 })
    rerender({ value: 'c', delay: 50 })
    rerender({ value: 'd', delay: 50 })

    expect(result.current).toBe('a')

    await waitFor(() => expect(result.current).toBe('d'), { timeout: 200 })
  })

  it('should use default delay when not provided', async () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'initial' },
    })

    rerender({ value: 'changed' })
    expect(result.current).toBe('initial')

    await waitFor(() => expect(result.current).toBe('changed'), { timeout: 700 })
  })

  it('should clear timeout on unmount', () => {
    const { unmount } = renderHook(() => useDebounce('value', 500))
    unmount()
  })
})
