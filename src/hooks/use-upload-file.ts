import * as React from 'react'
import { toast } from 'sonner'
import type { ClientUploadedFileData, UploadFilesOptions } from 'uploadthing/types'
import type { OurFileRouter } from '@/lib/uploadthing'
import { getDataURL } from '@/lib/utils'

export type UploadedFile<T = unknown> = ClientUploadedFileData<T>

interface UseUploadFileProps
  extends Pick<
    UploadFilesOptions<OurFileRouter['editorUploader']>,
    'headers' | 'onUploadBegin' | 'onUploadProgress' | 'skipPolling'
  > {
  onUploadComplete?: (file: UploadedFile) => void
  onUploadError?: (error: unknown) => void
}

export function useUploadFile({ onUploadComplete, onUploadError }: UseUploadFileProps = {}) {
  const [uploadedFile, setUploadedFile] = React.useState<UploadedFile>()
  const [uploadingFile, setUploadingFile] = React.useState<File>()
  const [progress, setProgress] = React.useState<number>(0)
  const [isUploading, setIsUploading] = React.useState(false)

  async function uploadThing(file: File) {
    setIsUploading(true)
    setUploadingFile(file)

    try {
      const url = await getDataURL(file)

      const _uploadedFile = {
        key: URL.createObjectURL(file),
        url,
        name: file.name,
        size: file.size,
        type: file.type,
      } as UploadedFile<unknown>

      setUploadedFile(_uploadedFile)

      onUploadComplete?.(_uploadedFile)

      return uploadedFile
    } catch (error) {
      showErrorToast(error)

      onUploadError?.(error)
    } finally {
      setProgress(0)
      setIsUploading(false)
      setUploadingFile(undefined)
    }
  }

  return {
    isUploading,
    progress,
    uploadedFile,
    uploadFile: uploadThing,
    uploadingFile,
  }
}

export function getErrorMessage(err: unknown) {
  const unknownError = 'Something went wrong, please try again later.'

  if (err instanceof Error) {
    return err.message
  }
  return unknownError
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err)

  const message = errorMessage.length > 0 ? errorMessage : 'Something went wrong, please try again later.'

  return toast.error(message)
}
