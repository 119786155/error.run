import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { KEY_PATH, open } from '../../src/models/base'

describe('base', () => {
  let mockDB: IDBDatabase
  let mockRequest: IDBOpenDBRequest
  let mockTransaction: IDBTransaction
  let mockObjectStore: IDBObjectStore

  beforeEach(() => {
    mockObjectStore = {
      get: vi.fn().mockReturnValue({
        onsuccess: null,
        onerror: null,
        result: { id: 'test-id', data: 'test-data' },
      } as unknown as IDBRequest),
      put: vi.fn().mockReturnValue({
        onsuccess: null,
        onerror: null,
        result: 'test-id',
      } as unknown as IDBRequest),
      delete: vi.fn().mockReturnValue({
        onsuccess: null,
        onerror: null,
        result: undefined,
      } as unknown as IDBRequest),
    } as unknown as IDBObjectStore

    mockTransaction = {
      objectStore: vi.fn().mockReturnValue(mockObjectStore),
    } as unknown as IDBTransaction

    mockDB = {
      transaction: vi.fn().mockReturnValue(mockTransaction),
      objectStoreNames: {
        contains: vi.fn().mockReturnValue(false),
      },
      createObjectStore: vi.fn().mockReturnValue(mockObjectStore),
    } as unknown as IDBDatabase

    mockRequest = {
      onsuccess: null,
      onerror: null,
      onupgradeneeded: null,
      result: mockDB,
      error: null,
    } as unknown as IDBOpenDBRequest

    vi.stubGlobal('indexedDB', {
      open: vi.fn().mockReturnValue(mockRequest),
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('open', () => {
    it('should open database and create object stores', async () => {
      const promise = open([{ storeName: 'testStore', keyPath: 'id' }])

      if (mockRequest.onsuccess) {
        mockRequest.onsuccess(new Event('success'))
      }

      await expect(promise).resolves.toBeUndefined()
    })

    it('should reject on error', async () => {
      const promise = open([{ storeName: 'testStore', keyPath: 'id' }])

      Object.defineProperty(mockRequest, 'error', {
        value: new Error('DB open failed'),
        configurable: true,
      })
      if (mockRequest.onerror) {
        mockRequest.onerror(new Event('error'))
      }

      await expect(promise).rejects.toContain('Failed to open the database')
    })
  })

  describe('KEY_PATH', () => {
    it('should be "id"', () => {
      expect(KEY_PATH).toBe('id')
    })
  })
})
