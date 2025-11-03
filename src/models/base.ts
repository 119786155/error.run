import { getContent } from '@/i18n'

const DB_NAME = 'error.run'
export const KEY_PATH = 'id'

let db: IDBDatabase

interface Item {
  storeName: string
  keyPath: string
}

export const open = (list: Item[]) => {
  return new Promise<void>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => {
      db = request.result

      list.forEach(({ storeName, keyPath }) => {
        if (!request.result.objectStoreNames.contains(storeName)) {
          request.result.createObjectStore(storeName, { keyPath })
        }
      })
    }
    request.onsuccess = () => {
      db = request.result
      resolve()
    }
    request.onerror = () => reject(`${getContent('model.open_db_failed')}: ${request.error}`)
  })
}

export const _get = (storeName: string, key: string) => {
  return new Promise((resolve, reject) => {
    if (!db) return resolve(null)
    const transaction = db.transaction([storeName], 'readonly')
    const store = transaction.objectStore(storeName)
    const request = store.get(key)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(`${getContent('model.read_failed')}: ${request.error}`)
  })
}

export const _put = (storeName: string, data: object) => {
  return new Promise((resolve, reject) => {
    if (!db) return resolve(null)
    const transaction = db.transaction([storeName], 'readwrite')
    const store = transaction.objectStore(storeName)
    const request = store.put(data)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(`${getContent('model.write_failed')}: ${request.error}`)
  })
}

export const _delete = (storeName: string, key: string) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite')
    const store = transaction.objectStore(storeName)
    const request = store.delete(key)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(`${getContent('model.delete_failed')}: ${request.error}`)
  })
}
