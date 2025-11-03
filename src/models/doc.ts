import { _delete, _get, _put } from '@/models/base'

export const STORE_NAME = 'docs'
export const KEY_PATH = 'id'
export const get = (docId: string) => _get(STORE_NAME, docId)
export const put = (data: object) => _put(STORE_NAME, data)
export const del = (docId: string) => _delete(STORE_NAME, docId)
