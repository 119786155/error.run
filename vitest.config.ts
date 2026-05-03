import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './test/setupTests.ts',
    include: ['test/unittest/**/*.test.ts', 'test/unittest/**/*.test.tsx'],
    exclude: ['test/**/*.e2e.test.ts', 'test/**/*.e2e.test.tsx', 'node_modules'],
    coverage: {
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'node_modules',
        'src/routes',
        'src/models',
        'src/components/editor',
        'src/main.tsx',
        'src/tanstackRouteTree.gen.ts',
        'src/components/ui/**/*',
        'src/lib/uploadthing.ts',
        'src/components/pages/**/*',
      ],
    },
    globals: true,
  },
})
