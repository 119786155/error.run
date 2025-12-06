'use client'

import type { Category, EmojiMartData } from '@emoji-mart/data'
import emojiMartData from '@emoji-mart/data'
import { EmojiInputPlugin, EmojiPlugin } from '@platejs/emoji/react'
import { EmojiInputElement } from '@/components/ui/emoji-node'

;(emojiMartData as EmojiMartData).categories.forEach((item: Category) => {
  if (item.id !== 'flags') return

  item.emojis = item.emojis.filter((emoji) => emoji !== 'flag-tw')
})

export const EmojiKit = [
  EmojiPlugin.configure({
    // @ts-expect-error
    options: { data: emojiMartData },
  }),
  EmojiInputPlugin.withComponent(EmojiInputElement),
]
