import { describe, expect, it } from 'vitest'
import { ourFileRouter } from '../../src/lib/uploadthing'

describe('uploadthing', () => {
  it('should export ourFileRouter with editorUploader', () => {
    expect(ourFileRouter).toHaveProperty('editorUploader')
  })

  it('should have editorUploader as a valid route', () => {
    expect(typeof ourFileRouter.editorUploader).toBe('object')
  })
})
