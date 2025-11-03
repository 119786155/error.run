import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDataURL = async (file: File) => {
  return new Promise<string | ArrayBuffer | null>((resolve, _reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.addEventListener(
      'load',
      () => {
        resolve(reader.result)
      },
      false,
    )
  })
}
