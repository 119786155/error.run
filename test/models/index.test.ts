import { describe, expect, it, vi } from 'vitest'
import * as base from '../../src/models/base'
import { init } from '../../src/models/index'

describe('models index', () => {
  it('should call open with correct store configurations', async () => {
    const openSpy = vi.spyOn(base, 'open').mockResolvedValue(undefined)

    await init()

    expect(openSpy).toHaveBeenCalledWith([
      { storeName: 'docs', keyPath: 'id' },
      { storeName: 'files', keyPath: 'id' },
    ])

    openSpy.mockRestore()
  })

  it('should reject when open fails', async () => {
    const openSpy = vi.spyOn(base, 'open').mockRejectedValue(new Error('Failed to open'))

    await expect(init()).rejects.toThrow('Failed to open')

    openSpy.mockRestore()
  })
})
