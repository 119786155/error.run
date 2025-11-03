import { _delete, _get, _put } from '@/models/base'

export const STORE_NAME = 'files'
export const KEY_PATH = 'id'
export const get = (fileId: string) => _get(STORE_NAME, fileId)
export const put = (data: object) => _put(STORE_NAME, data)
export const del = (fileId: string) => _delete(STORE_NAME, fileId)
