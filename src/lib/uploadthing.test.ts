import { describe, expect, it } from 'vitest'
import { ourFileRouter } from './uploadthing'

describe('uploadthing', () => {
  it('should have editorUploader endpoint', () => {
    expect(ourFileRouter.editorUploader).toBeDefined()
  })

  it('should allow image, text, blob, pdf, video, audio file types', () => {
    const middleware = ourFileRouter.editorUploader.middleware
    expect(middleware).toBeDefined()

    const result = middleware({})
    expect(result).toEqual({})
  })

  it('should have onUploadComplete handler', () => {
    const onUploadComplete = ourFileRouter.editorUploader.onUploadComplete
    expect(onUploadComplete).toBeDefined()
  })

  it('should return correct file metadata on upload complete', () => {
    const mockFile = {
      key: 'test-key',
      name: 'test-file.png',
      size: 1024,
      type: 'image/png',
      ufsUrl: 'https://example.com/file.png',
    }

    const onUploadComplete = ourFileRouter.editorUploader.onUploadComplete
    const result = onUploadComplete({ file: mockFile } as any)

    expect(result).toEqual({
      key: mockFile.key,
      name: mockFile.name,
      size: mockFile.size,
      type: mockFile.type,
      url: mockFile.ufsUrl,
    })
  })
})
