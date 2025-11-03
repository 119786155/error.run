import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const vendor1 = ['react', 'react-dom']
const vendor2 = ['react-day-picker', 'react-dnd', 'react-dnd-html5-backend', 'react-textarea-autosize']
const vendor3 = ['lodash/get', 'lodash/debounce']
const vendor4 = ['@tanstack/react-router']
const vendor5 = [
  '@platejs/basic-nodes',
  '@platejs/basic-styles',
  '@platejs/callout',
  '@platejs/code-block',
  '@platejs/table',
  '@platejs/toc',
  '@platejs/toggle',
  '@platejs/list',
  '@platejs/autoformat',
]
const vendor6 = [
  '@platejs/caption',
  '@platejs/combobox',
  '@platejs/date',
  '@platejs/floating',
  '@platejs/indent',
  '@platejs/layout',
  '@platejs/link',
  '@platejs/math',
  '@platejs/mention',
  '@platejs/resizable',
  '@platejs/selection',
]
const vendor7 = ['@platejs/excalidraw', '@platejs/emoji', '@platejs/media', '@platejs/markdown']
const vendor8 = ['@platejs/dnd', '@platejs/slash-command', '@platejs/suggestion']
const vendor9 = [
  '@/components/editor/plugins/basic-blocks-kit',
  '@/components/editor/plugins/basic-marks-kit',
  '@/components/editor/plugins/autoformat-kit',
  '@/components/editor/plugins/block-menu-kit',
  '@/components/editor/plugins/block-selection-kit',
]
const vendor10 = [
  '@/components/editor/plugins/dnd-kit',
  '@/components/editor/plugins/exit-break-kit',
  '@/components/editor/plugins/indent-kit',
  '@/components/editor/plugins/line-height-kit',
  '@/components/editor/plugins/link-kit',
]
const vendor11 = [
  '@/components/editor/plugins/column-kit',
  '@/components/editor/plugins/cursor-overlay-kit',
  '@/components/editor/plugins/date-kit',
]
const vendor12 = [
  '@/components/editor/plugins/list-kit',
  '@/components/editor/plugins/markdown-kit',
  '@/components/editor/plugins/math-kit',
  '@/components/editor/plugins/slash-kit',
  '@/components/editor/plugins/table-kit',
  '@/components/editor/plugins/toc-kit',
  '@/components/editor/plugins/toggle-kit',
]
const vendor13 = ['@/components/editor/plugins/emoji-kit']
const vendor14 = ['@/components/editor/plugins/excalidraw-kit']
const vendor15 = ['@/components/editor/plugins/code-block-kit']
//const vendor16 = [
//]

export default defineConfig({
  plugins: [
    // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './src/routes',
      generatedRouteTree: './src/tanstackRouteTree.gen.ts',
      routeFileIgnorePrefix: '-',
      quoteStyle: 'single',
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor1: vendor1,
          vendor2: vendor2,
          vendor3: vendor3,
          vendor4: vendor4,
          vendor5: vendor5,
          vendor6: vendor6,
          vendor7: vendor7,
          vendor8: vendor8,
          vendor9: vendor9,
          vendor10: vendor10,
          vendor11: vendor11,
          vendor12: vendor12,
          vendor13: vendor13,
          vendor14: vendor14,
          vendor15: vendor15,
          // vendor16: vendor16,
        },
      },
    },
  },
})
