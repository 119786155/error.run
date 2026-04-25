import { describe, expect, it, vi } from 'vitest'
import * as base from '../../src/models/base'
import { del, get, KEY_PATH, put, STORE_NAME } from '../../src/models/doc'

describe('doc model', () => {
  it('should have correct STORE_NAME', () => {
    expect(STORE_NAME).toBe('docs')
  })

  it('should have correct KEY_PATH', () => {
    expect(KEY_PATH).toBe('id')
  })

  it('should call _get with correct parameters', async () => {
    const _getSpy = vi.spyOn(base, '_get').mockResolvedValue({ id: 'doc1', content: 'hello' })

    const result = await get('doc1')

    expect(_getSpy).toHaveBeenCalledWith('docs', 'doc1')
    expect(result).toEqual({ id: 'doc1', content: 'hello' })

    _getSpy.mockRestore()
  })

  it('should call _put with correct parameters', async () => {
    const _putSpy = vi.spyOn(base, '_put').mockResolvedValue('doc1')

    const data = { id: 'doc1', content: 'hello' }
    const result = await put(data)

    expect(_putSpy).toHaveBeenCalledWith('docs', data)
    expect(result).toBe('doc1')

    _putSpy.mockRestore()
  })

  it('should call _delete with correct parameters', async () => {
    const _deleteSpy = vi.spyOn(base, '_delete').mockResolvedValue(undefined)

    const result = await del('doc1')

    expect(_deleteSpy).toHaveBeenCalledWith('docs', 'doc1')
    expect(result).toBeUndefined()

    _deleteSpy.mockRestore()
  })
})
