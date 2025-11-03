import { getContent } from '@/i18n'

const DB_NAME = 'error.run'
const STORE_NAME = 'docs'
export const KEY_PATH = 'id'

let db: IDBDatabase

const _open = (dbName: string, storeName: string) => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, 1)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: KEY_PATH })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(`${getContent('model.open_db_failed')}: ${request.error}`)
  })
}

const _get = (db: IDBDatabase, storeName: string, key: string) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly')
    const store = transaction.objectStore(storeName)
    const request = store.get(key)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(`${getContent('model.read_failed')}: ${request.error}`)
  })
}

const _put = (db: IDBDatabase, storeName: string, data: object) => {
  return new Promise((resolve, reject) => {
    if (!db) return resolve(null)
    const transaction = db.transaction([storeName], 'readwrite')
    const store = transaction.objectStore(storeName)
    const request = store.put(data)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(`${getContent('model.write_failed')}: ${request.error}`)
  })
}

const _delete = (db: IDBDatabase, storeName: string, key: string) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite')
    const store = transaction.objectStore(storeName)
    const request = store.delete(key)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(`${getContent('model.delete_failed')}: ${request.error}`)
  })
}

export const init = async () => {
  db = await _open(DB_NAME, STORE_NAME)
}
export const get = (docId: string) => _get(db, STORE_NAME, docId)
export const put = (data: object) => _put(db, STORE_NAME, data)
export const del = (docId: string) => _delete(db, STORE_NAME, docId)
