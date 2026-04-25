import { describe, expect, it, vi } from 'vitest'
import * as base from '../../src/models/base'
import { del, get, KEY_PATH, put, STORE_NAME } from '../../src/models/file'

describe('file model', () => {
  it('should have correct STORE_NAME', () => {
    expect(STORE_NAME).toBe('files')
  })

  it('should have correct KEY_PATH', () => {
    expect(KEY_PATH).toBe('id')
  })

  it('should call _get with correct parameters', async () => {
    const _getSpy = vi.spyOn(base, '_get').mockResolvedValue({ id: 'file1', name: 'test.txt' })

    const result = await get('file1')

    expect(_getSpy).toHaveBeenCalledWith('files', 'file1')
    expect(result).toEqual({ id: 'file1', name: 'test.txt' })

    _getSpy.mockRestore()
  })

  it('should call _put with correct parameters', async () => {
    const _putSpy = vi.spyOn(base, '_put').mockResolvedValue('file1')

    const data = { id: 'file1', name: 'test.txt' }
    const result = await put(data)

    expect(_putSpy).toHaveBeenCalledWith('files', data)
    expect(result).toBe('file1')

    _putSpy.mockRestore()
  })

  it('should call _delete with correct parameters', async () => {
    const _deleteSpy = vi.spyOn(base, '_delete').mockResolvedValue(undefined)

    const result = await del('file1')

    expect(_deleteSpy).toHaveBeenCalledWith('files', 'file1')
    expect(result).toBeUndefined()

    _deleteSpy.mockRestore()
  })
})
