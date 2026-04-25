import { act, renderHook } from '@testing-library/react'
import { toast } from 'sonner'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getErrorMessage, showErrorToast, useUploadFile } from '../../../src/hooks/use-upload-file'
import * as utils from '../../../src/lib/utils'

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}))

vi.mock('../../../src/lib/utils', () => ({
  getDataURL: vi.fn(),
}))

describe('useUploadFile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return initial state', () => {
    const { result } = renderHook(() => useUploadFile())

    expect(result.current.isUploading).toBe(false)
    expect(result.current.progress).toBe(0)
    expect(result.current.uploadedFile).toBeUndefined()
    expect(result.current.uploadingFile).toBeUndefined()
    expect(typeof result.current.uploadFile).toBe('function')
  })

  it('should upload file successfully', async () => {
    const mockUrl = 'data:image/png;base64,abc123'
    vi.mocked(utils.getDataURL).mockResolvedValue(mockUrl)

    const onUploadComplete = vi.fn()
    const { result } = renderHook(() => useUploadFile({ onUploadComplete }))

    const file = new File(['content'], 'test.png', { type: 'image/png' })

    await act(async () => {
      await result.current.uploadFile(file)
    })

    expect(result.current.isUploading).toBe(false)
    expect(result.current.uploadedFile).toBeDefined()
    expect(result.current.uploadedFile?.name).toBe('test.png')
    expect(result.current.uploadedFile?.url).toBe(mockUrl)
    expect(onUploadComplete).toHaveBeenCalled()
  })

  it('should handle upload error', async () => {
    const error = new Error('Upload failed')
    vi.mocked(utils.getDataURL).mockRejectedValue(error)

    const onUploadError = vi.fn()
    const { result } = renderHook(() => useUploadFile({ onUploadError }))

    const file = new File(['content'], 'test.png', { type: 'image/png' })

    await act(async () => {
      await result.current.uploadFile(file)
    })

    expect(result.current.isUploading).toBe(false)
    expect(onUploadError).toHaveBeenCalledWith(error)
  })

  it('should set uploading state during upload', async () => {
    vi.mocked(utils.getDataURL).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve('url'), 100)),
    )

    const { result } = renderHook(() => useUploadFile())
    const file = new File(['content'], 'test.png', { type: 'image/png' })

    act(() => {
      result.current.uploadFile(file)
    })

    expect(result.current.isUploading).toBe(true)
    expect(result.current.uploadingFile).toBe(file)
  })
})

describe('getErrorMessage', () => {
  it('should return error message for Error instance', () => {
    const error = new Error('Something went wrong')
    expect(getErrorMessage(error)).toBe('Something went wrong')
  })

  it('should return unknown error message for non-Error values', () => {
    expect(getErrorMessage('string error')).toBe('Something went wrong, please try again later.')
    expect(getErrorMessage(123)).toBe('Something went wrong, please try again later.')
    expect(getErrorMessage(null)).toBe('Something went wrong, please try again later.')
    expect(getErrorMessage(undefined)).toBe('Something went wrong, please try again later.')
  })
})

describe('showErrorToast', () => {
  it('should show toast with error message', () => {
    const error = new Error('Upload failed')
    showErrorToast(error)

    expect(toast.error).toHaveBeenCalledWith('Upload failed')
  })

  it('should show toast with unknown error message when error is empty', () => {
    const error = new Error('')
    showErrorToast(error)

    expect(toast.error).toHaveBeenCalledWith('Something went wrong, please try again later.')
  })

  it('should show toast with unknown error message for non-Error values', () => {
    showErrorToast('random string')

    expect(toast.error).toHaveBeenCalledWith('Something went wrong, please try again later.')
  })
})
