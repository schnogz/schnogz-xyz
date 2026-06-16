# CLAUDE.md

Guidance for Claude working in this repo. Read this before making changes.

## What this is

Andrew Schneider's personal portfolio at https://schnogz.xyz — a Gatsby 5 + React 19 + TypeScript site deployed via AWS Amplify. Single-page layout (Hero, Hello, Stats, Projects, Experience) plus a standalone `/btc-ticker` page and a 404.

## Stack

- **Gatsby 5.16** (static site, `gatsby develop` / `gatsby build`) — built-in TypeScript via Parcel
- **React 19**, function components throughout (hooks-only)
- **TypeScript 5.7** in `strict: true` mode
- **styled-components 6** with a `createGlobalStyle` global sheet (`src/styles/global-style.ts`)
- **framer-motion** for entrance and hover animations
- **@loadable/component** for code-split content sections on the index page
- **@mui/material** (used only for the tooltip on the GitHub calendar)
- **react-github-calendar** for the contribution heatmaps
- **Yarn 4** (Berry) with the `node-modules` linker — managed via Corepack. The pinned version lives in `packageManager` in `package.json` and `.yarn/releases/yarn-4.17.0.cjs` (committed). Don't introduce `package-lock.json`.

## Commands

First-time setup on a fresh clone: `corepack enable` (one-time per machine), then `yarn install`. Corepack reads `packageManager` from `package.json` and uses the pinned Yarn 4 binary from `.yarn/releases/`.

| Script | What it does |
| --- | --- |
| `yarn` | Install deps |
| `yarn dev` | Start Gatsby dev server at http://localhost:8000 |
| `yarn ci:build` | Production build (`gatsby build`) — what Amplify runs |
| `yarn ci:lint` | ESLint with `--max-warnings=0` across `src/**/*.{js,ts,tsx}`. Husky runs this on pre-commit. |
| `yarn typecheck` | `tsc --noEmit` |
| `yarn lint:fix` | ESLint with `--fix` |
| `yarn format` | Prettier write across `src/**/*.{js,ts,tsx}` |
| `yarn clean` | `gatsby clean` (clears `.cache/` and `public/`) |

## Deploy

Push to `origin master` → AWS Amplify picks it up (`amplify.yml`) → `corepack enable` + `yarn install --immutable` + `yarn ci:build`, serves `/public`. **Never push to master without an explicit ask** — every push is a production deploy.

A Husky **`pre-push`** hook runs `yarn typecheck && yarn ci:build` before the push goes out. If either fails, the push is aborted. Bypass only as a last resort with `git push --no-verify`.

## Project layout

```
src/
├── pages/          # Gatsby routes
│   ├── index.tsx       # Single-page portfolio (lazy-loads content sections)
│   ├── btc-ticker.tsx  # Standalone realtime Binance BTC price page
│   └── 404.tsx
├── components/     # Reusable UI primitives
│   ├── page.tsx        # Top-level wrapper around GlobalStyle (focus-visible handles keyboard-only outlines)
│   ├── head.tsx        # Shared <Head> meta — re-exported by each page
│   ├── header.tsx      # Logo + social links with tooltips
│   ├── hero.tsx        # Full-viewport landing with Spirograph + Header
│   ├── spirograph.tsx  # Canvas-based hypotrochoid animation (function, raw 2D ctx, all imperative state lives in the useEffect closure)
│   ├── section.tsx     # Centered max-916px content container with top border
│   ├── sectionHeading.tsx
│   ├── twoColumns.tsx  # Heading-left / content-right grid (responsive collapses on md)
│   ├── project.tsx     # Logo + title/subtitle/abstract row, used by Projects and Experience
│   ├── scrobbles.tsx   # LastFM top-albums + total-scrobbles fetch
│   ├── scrollHelper.tsx # Floating scroll dot + URL-hash sync as user scrolls
│   ├── icons.tsx       # Inline SVG glyph wrapper (just an arrow today)
│   └── footer.tsx
├── content/        # Page sections (lazy-loaded by index.tsx)
│   ├── hello.tsx
│   ├── stats.tsx       # Scrobbles + GitHubCalendar (multiple years)
│   ├── projects.tsx    # Side projects
│   └── experience.tsx  # Work history
├── config/
│   └── lastFm.ts       # LastFM API key + username
├── styles/
│   ├── theme.ts        # darkMode color palette + fontSize scale (f1..f11), `as const`
│   └── global-style.ts # createGlobalStyle: normalize + base typography
├── utils/
│   ├── animations.ts   # framer-motion preset objects (ROTATE_*, ARRIVE_FROM_TOP)
│   └── media-queries.ts # max-width media template tagged-template helper (generic over Props)
├── types/
│   └── images.d.ts     # `*.png` / `*.jpg` / `*.svg` module declarations
├── img/            # Company / project logos imported as modules
└── static/         # Resume PDF (served as-is)

static/             # Site-level static assets (favicons, manifest, profile.jpeg)
```

## Conventions and gotchas

### Import aliases

Path aliases are defined in `tsconfig.json` (`paths`) and mirrored in `gatsby-config.js` (`gatsby-plugin-root-import`) and `eslint.config.js` (`settings['import/resolver'].typescript` reads `tsconfig.json` directly). Use them — do not write deep relative imports.

```ts
import Header from 'components/header'
import { darkMode, fontSize } from 'styles/theme'
import media from 'utils/media-queries'
import { ARRIVE_FROM_TOP } from 'utils/animations'
```

Aliases: `components`, `config`, `content`, `fonts`, `img`, `pages`, `styles`, `utils`.

If you add a new top-level folder under `src/`, register it in **three** places: `tsconfig.json` (`paths`), `gatsby-config.js` (`gatsby-plugin-root-import` options), and the second import-sort group regex in `eslint.config.js`.

### TypeScript

- `strict: true` is on. Add explicit prop types / interfaces for components; avoid `any`. Cast through `unknown` if you genuinely need it.
- For styled-components props: `styled.div<{ visible: boolean }>` — keep prop types alongside the styled declaration.
- The `@types/loadable__component` package ships its own (older) `@types/react`. We pin our version via `resolutions.@types/react` in `package.json` to keep React 19 typings consistent across the tree. Don't remove that resolution.
- `utils/media-queries.ts` is generic per-call: `${media.lg<{ paddingSmall?: boolean }>\`…\`}`. Pass the prop generic if the inner template uses style functions that read props.

### Linting is strict — match the existing style or the pre-commit hook will reject

The Husky `pre-commit` runs `yarn ci:lint` with `--max-warnings=0`. Notable rules to respect:

- **No semicolons** (`semi: never`)
- **Single quotes** for strings, **single quotes** for JSX attributes
- **Trailing commas** everywhere multi-line (`'all'`)
- **`simple-import-sort/imports`** — groups: (1) `react` + npm packages, (2) the aliased project paths (`components|config|content|fonts|img|pages|styles|utils`), (3) relative + bare. Run `yarn lint:fix` if unsure.
- **`sort-keys`** ascending alphabetical for any object literal with ≥2 keys (case-sensitive, non-natural)
- **`sort-destructure-keys`** alphabetical
- **`arrow-body-style: as-needed`** — no `=> { return … }` when an expression body works
- **`import/no-extraneous-dependencies`** — anything imported must be in `package.json` (no peer-dep cheating)
- **`@typescript-eslint/no-unused-vars`** — args prefixed with `_` are ignored

### Styling

- **No CSS files** — everything is styled-components. New styles go either inline (one-off) or in a `styled.X` at the top of the component file. Match the existing pattern: declare styled components first, then the React component.
- **Use theme tokens** from `styles/theme` (`darkMode.*`, `fontSize.f1..f11`) — don't hardcode hex or px font sizes.
- **Responsive** via `utils/media-queries` — `${media.lg\`…\`}`, `${media.md\`…\`}`, etc. Breakpoints (in em, max-width): `xs=350`, `sm=600`, `md=900`, `lg=1300`, `xl=1700`. If the inner template uses a prop callback, pass the generic: `${media.lg<{ foo?: boolean }>\`...\`}`.
- **Animations** use the presets in `utils/animations.ts` spread onto framer-motion components: `<motion.div {...ARRIVE_FROM_TOP} />`. Add new presets there rather than inlining.

### Page lifecycle

- Page meta uses **Gatsby's `<Head>` API** (not `react-helmet`). Each page in `src/pages/` re-exports the shared head: `export { default as Head } from 'components/head'`. Edit `components/head.tsx` to change site-wide meta.
- `components/page.tsx` is a thin wrapper that just renders `<GlobalStyle>` + children. Routes that should share the base styling render through `<Page>` (see `pages/index.tsx`, `pages/404.tsx`). `pages/btc-ticker.tsx` intentionally bypasses `<Page>` and renders its own `<GlobalStyle>` for a clean look. Keyboard-only focus rings come from a `:focus-visible` rule in `global-style.ts` — no JS needed.
- The index page lazy-loads each content section with `@loadable/component`. When adding a new section: import via `loadable(() => import('../content/foo'))`, wrap in `<Section id='foo'>`, and add the hash to `VIEW_ORDER` in `components/scrollHelper.tsx` so the scroll helper updates the URL hash and can jump there.

### Browser-only APIs

Gatsby SSRs at build time, so `window`, `document`, `navigator`, and `WebSocket` are undefined during build. Touch them only inside `useEffect`, `componentDidMount`, or event handlers. The dev server is forgiving; CI build will surface SSR issues.

### Spirograph

`components/spirograph.tsx` is a hand-rolled canvas animation (function component, two canvases stacked — one for the moving gear, one for the drawn curve). It self-restarts every full revolution and reseeds on window resize. Treat as a stable "set and forget" — modifying it tends to break the math. All imperative state (gear params, animation-frame ID, restart timers) lives in the `useEffect` closure; only the two `<canvas>` elements use refs. The cleanup cancels the frame, clears any pending restart/start timers, and removes the resize listener.

### LastFM data

`components/scrobbles.tsx` fetches `user.getTopAlbums` and `user.getRecentTracks` client-side with the key from `src/config/lastFm.ts`. State is typed as a discriminated union `LastFmAlbum[] | { error: true }`. On fetch failure it renders an apologetic empty state — preserve that behavior. The "average per day" math anchors to May 8, 2011.

## Testing

There is no test suite. Verification is **typecheck + lint + build**:

1. `yarn typecheck` — `tsc --noEmit`
2. `yarn ci:lint` (or just commit — Husky enforces it)
3. `yarn ci:build` for any non-trivial change to confirm Gatsby SSR succeeds

Browser verification is not required by default — trust the diff once typecheck and lint pass. Spin up `yarn dev` only when asked or when the change is canvas/animation/layout-sensitive in a way the static checks cannot catch.

## Commit style

Recent log uses lowercase imperative with Conventional-Commits-ish scopes when relevant:

```
chore(deps): upgrade mui package
chore(release): version bump
Update README to remove live link
```

Mix is fine; short and direct beats ceremony.
