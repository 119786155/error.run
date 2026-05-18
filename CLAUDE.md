# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start dev server (Vite)
pnpm build            # Type-check with tsc then build with Vite
pnpm format           # Format with Biome
pnpm test             # Run unit tests (Vitest)
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage
pnpm e2e              # Run Playwright e2e tests
pnpm e2e:ui           # Run e2e tests with Playwright UI
pnpm e2e:debug        # Run e2e tests in debug mode
```

Unit tests live in `test/unittest/**/*.test.{ts,tsx}`. E2e tests live in `test/e2e/`.
Fixtures are in `test/fixtures/`.

To run a single test file: `pnpm vitest run path/to/test.test.ts`
To run a single e2e file: `pnpm exec playwright test path/to/test.e2e.test.ts`

## Architecture

### Routing (TanStack Router)

File-based routing via `@tanstack/router-plugin`. Routes are defined in `src/routes/`:

- `__root.tsx` — Root layout wrapping everything in `<ThemeProvider>`
- `index.tsx` → `/` — Poem landing page
- `write.tsx` → `/write` — Rich text editor (standalone, local IndexedDB storage)
- `room.tsx` → `/room` — Collaborative editor via Yjs/WebRTC

The route tree is auto-generated at `src/tanstackRouteTree.gen.ts`. Files prefixed with `-` are ignored.

### Editor (Plate.js)

The rich text editor wraps Plate.js (`platejs` v51). The core is in `src/components/editor/`:

- `index.tsx` — `Editor` component: initializes the Plate editor, loads/saves via IndexedDB (`src/models/doc.ts`), handles Yjs collaboration
- `plugins/index.tsx` — `getEditorKit()` assembles all editor plugins (blocks, marks, table, code, emoji, excalidraw, media, math, link, etc.). Accepts `{ disableToolbar, enableCollaboration }`.

Each plugin kit (e.g., `link-kit.tsx`, `table-kit.tsx`) follows the same pattern: a `createPlatePlugin` call exported as an array.

Custom Plate UI nodes (rendered React components for each Plate element type) live in `src/components/ui/` alongside standard shadcn/ui-style components. Editor toolbar buttons (e.g., `mark-toolbar-button.tsx`, `font-color-toolbar-button.tsx`) are also here.

### i18n

`src/i18n/index.ts` provides `getContent(path)` — the single function used everywhere for translated strings. It uses `lodash/get` to look up dot-path keys (e.g., `"editor.bold"`) in the content map.

Content is in `src/i18n/content/`, with one file per domain (`app.ts`, `editor.ts`, `poem.ts`, etc.). Each file exports a nested object: `{ en: ..., zh: ..., ... }` for all supported locales.

Supported locales: `zh, en, es, fa, hi, ar, pt, ja, ko, ru, de, fr, id, vi, tr, nl, pl, th, uk`.

Locale detection (`getBrowserCurrentLocale`): maps `navigator.language` through a locale map, falls back to `'en'`. The detected locale is stored in localStorage under key `'locale'`. RTL is applied for `ar` and `fa` via `document.documentElement.dir`.

### Data Layer (IndexedDB)

`src/models/base.ts` — Low-level IndexedDB wrapper: `open()`, `_get()`, `_put()`, `_delete()`.

`src/models/doc.ts` — Document store (`storeName: 'docs'`, `keyPath: 'id'`): `get(docId)`, `put(data)`, `del(docId)`.

`src/models/file.ts` — File store (`storeName: 'files'`, `keyPath: 'id'`).

Call `init()` from `src/models/index.ts` before any DB operations — it opens the DB and creates stores if needed.

### Collaboration (Yjs)

`src/lib/yjs.ts` defines the `ROOM_ID`, signaling server URL, and random cursor fruit/color pairs. The `Editor` component initializes Yjs via `@platejs/yjs` when `enableCollaboration` is true.

### Theme

`src/components/ui/theme-provider.tsx` — React context that applies `light` or `dark` class on `<html>` based solely on `prefers-color-scheme` media query. No localStorage persistence. Updates live when the OS preference changes.

### Pages

- **Poem** (`src/components/pages/poem.tsx`): Static page showing translated poem content with footer.
- **Write** (`src/components/pages/write.tsx`): Editor wrapped in an `ErrorBoundary`, saves to IndexedDB.
- **Room** (`src/components/pages/room.tsx`): Collaborative editor with Yjs sync enabled.

## Key Conventions

- Path alias: `@/` maps to `src/`
- CSS: Tailwind CSS v4 via `@tailwindcss/vite`
- Formatting: Biome with single quotes, no semicolons, 120 char line width
- UI components: shadcn/ui-style pattern (Radix primitives + Tailwind + `cn()` utility)
- `cn()` from `src/lib/utils.ts` merges Tailwind classes with `clsx` + `tailwind-merge`
- Pre-commit hook: `git-secrets` (AWS Labs) scans for secrets
