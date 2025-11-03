import { open } from '@/models/base'
import { KEY_PATH as DOC_KEY_PATH, STORE_NAME as DOC_STORE_NAME } from '@/models/doc'
import { KEY_PATH as FILE_KEY_PATH, STORE_NAME as FILE_STORE_NAME } from '@/models/file'

export const init = () =>
  open([
    { storeName: DOC_STORE_NAME, keyPath: DOC_KEY_PATH },
    { storeName: FILE_STORE_NAME, keyPath: FILE_KEY_PATH },
  ])
