# CLAUDE.md

Guidance for Claude working in this repo. Read this before making changes.

## What this is

Andrew Schneider's personal portfolio at https://schnogz.xyz — a Gatsby 5 + React 19 site deployed via AWS Amplify. Single-page layout (Hero, Hello, Stats, Projects, Experience) plus a standalone `/btc-ticker` page and a 404.

## Stack

- **Gatsby 5.16** (static site, `gatsby develop` / `gatsby build`)
- **React 19** with class components (`Page`, `Header`, `Spirograph`) and function components mixed
- **styled-components 6** with a `createGlobalStyle` global sheet (`src/styles/global-style.js`)
- **framer-motion** for entrance and hover animations
- **@loadable/component** for code-split content sections on the index page
- **@mui/material** (used only for the tooltip on the GitHub calendar)
- **react-github-calendar** for the contribution heatmaps
- **Yarn** for package management (yarn.lock is the source of truth — do not introduce package-lock.json)

## Commands

| Script | What it does |
| --- | --- |
| `yarn` | Install deps |
| `yarn dev` | Start Gatsby dev server at http://localhost:8000 |
| `yarn ci:build` | Production build (`gatsby build`) — what Amplify runs |
| `yarn ci:lint` | ESLint with `--max-warnings=0`. Husky runs this on pre-commit. |
| `yarn lint:fix` | ESLint with `--fix` |
| `yarn format` | Prettier write across `src/**/*.js` |
| `yarn clean` | `gatsby clean` (clears `.cache/` and `public/`) |

## Deploy

Push to `origin master` → AWS Amplify picks it up (`amplify.yml`) → runs `yarn` then `yarn ci:build`, serves `/public`. **Never push to master without an explicit ask** — every push is a production deploy.

## Project layout

```
src/
├── pages/          # Gatsby routes
│   ├── index.js        # Single-page portfolio (lazy-loads content sections)
│   ├── btc-ticker.js   # Standalone realtime Binance BTC price page
│   └── 404.js
├── components/     # Reusable UI primitives
│   ├── page.js         # Top-level wrapper: Helmet meta + GlobalStyle + tab-key outlines
│   ├── header.js       # Logo + social links with tooltips
│   ├── hero.js         # Full-viewport landing with Spirograph + Header
│   ├── spirograph.js   # Canvas-based hypotrochoid animation (class component, raw 2D ctx)
│   ├── section.js      # Centered max-916px content container with top border
│   ├── sectionHeading.js
│   ├── twoColumns.js   # Heading-left / content-right grid (responsive collapses on md)
│   ├── project.js      # Logo + title/subtitle/abstract row, used by Projects and Experience
│   ├── scrobbles.js    # LastFM top-albums + total-scrobbles fetch
│   ├── scrollHelper.js # Floating scroll dot + URL-hash sync as user scrolls
│   ├── icons.js        # Inline SVG glyph wrapper (just an arrow today)
│   └── footer.js
├── content/        # Page sections (lazy-loaded by index.js)
│   ├── hello.js
│   ├── stats.js        # Scrobbles + GitHubCalendar (multiple years)
│   ├── projects.js     # Side projects
│   └── experience.js   # Work history
├── config/
│   └── lastFm.js       # LastFM API key + username
├── styles/
│   ├── theme.js        # darkMode color palette + fontSize scale (f1..f11)
│   └── global-style.js # createGlobalStyle: normalize + base typography
├── utils/
│   ├── animations.js   # framer-motion preset objects (ROTATE_*, ARRIVE_FROM_TOP)
│   └── media-queries.js  # max-width media template tagged-template helper
├── img/            # Company / project logos imported as modules
└── static/         # Resume PDF (served as-is)

static/             # Site-level static assets (favicons, manifest, profile.jpeg)
```

## Conventions and gotchas

### Import aliases

Root imports are configured in `gatsby-config.js` via `gatsby-plugin-root-import` and mirrored in `.eslintrc.js`. Use them — do not write deep relative imports.

```js
import Header from 'components/header'
import { darkMode, fontSize } from 'styles/theme'
import media from 'utils/media-queries'
import { ARRIVE_FROM_TOP } from 'utils/animations'
```

Aliases: `components`, `content`, `fonts`, `img`, `layouts`, `pages`, `src`, `styles`, `utils`.

### Linting is strict — match the existing style or the pre-commit hook will reject

The Husky `pre-commit` runs `yarn ci:lint` with `--max-warnings=0`. Notable rules to respect:

- **No semicolons** (`semi: never`)
- **Single quotes** for JS strings, **single quotes** for JSX attributes
- **Trailing commas** everywhere multi-line (`'all'`)
- **`simple-import-sort/imports`** — groups: (1) `react` + npm packages, (2) the aliased project paths (`components|config|content|fonts|img|pages|styles|utils`), (3) relative + bare. Run `yarn lint:fix` if unsure.
- **`sort-keys`** ascending alphabetical for any object literal with ≥2 keys (case-sensitive, non-natural)
- **`sort-destructure-keys`** alphabetical
- **`arrow-body-style: as-needed`** — no `=> { return … }` when an expression body works
- **`import/no-extraneous-dependencies`** — anything imported must be in `package.json` (no peer-dep cheating)

If you add a new top-level folder under `src/`, register it in **three** places: `gatsby-config.js` (`gatsby-plugin-root-import` options), `.eslintrc.js` (`import/resolver` alias), and add it to the second import-sort group regex.

### Styling

- **No CSS files** — everything is styled-components. New styles go either inline (one-off) or in a `styled.X` at the top of the component file. Match the existing pattern: declare styled components first, then the React component.
- **Use theme tokens** from `styles/theme.js` (`darkMode.*`, `fontSize.f1..f11`) — don't hardcode hex or px font sizes.
- **Responsive** via `utils/media-queries` — `${media.lg`…`}`, `${media.md`…`}`, etc. Breakpoints (in em, max-width): `xs=350`, `sm=600`, `md=900`, `lg=1300`, `xl=1700`.
- **Animations** use the presets in `utils/animations.js` spread onto framer-motion components: `<motion.div {...ARRIVE_FROM_TOP} />`. Add new presets there rather than inlining.

### Page lifecycle

- `components/page.js` wraps every route with `<Helmet>` meta + `<GlobalStyle>`. Routes that should share metadata should render through `<Page>` (see `pages/index.js`, `pages/404.js`, but **not** `pages/btc-ticker.js` which intentionally renders its own `<GlobalStyle>` for a clean look).
- The index page lazy-loads each content section with `@loadable/component`. When adding a new section: import via `loadable(() => import('./../content/foo'))`, wrap in `<Section id='foo'>`, and add the hash to `VIEW_ORDER` in `components/scrollHelper.js` so the scroll helper updates the URL hash and can jump there.

### Browser-only APIs

Gatsby SSRs at build time, so `window`, `document`, `navigator`, and `WebSocket` are undefined during build. Touch them only inside `useEffect`, `componentDidMount`, or event handlers. The dev server is forgiving; CI build will surface SSR issues.

### Spirograph

`components/spirograph.js` is a hand-rolled canvas animation (class component, two canvases stacked — one for the moving gear, one for the drawn curve). It self-restarts every full revolution and reseeds on window resize. Treat as a stable "set and forget" — modifying it tends to break the math.

### LastFM data

`components/scrobbles.js` fetches `user.getTopAlbums` and `user.getRecentTracks` client-side with the key from `src/config/lastFm.js`. On fetch failure it renders an apologetic empty state — preserve that behavior. The "average per day" math anchors to May 8, 2011.

## Testing

There is no test suite. Verification is **lint + build**:

1. `yarn ci:lint` (or just commit — Husky enforces it)
2. `yarn ci:build` for any non-trivial change to confirm Gatsby SSR succeeds

Browser verification is not required by default — trust the diff once lint passes. Spin up `yarn dev` only when asked or when the change is canvas/animation/layout-sensitive in a way lint cannot catch.

## Commit style

Recent log uses lowercase imperative with Conventional-Commits-ish scopes when relevant:

```
chore(deps): upgrade mui package
chore(release): version bump
Update README to remove live link
```

Mix is fine; short and direct beats ceremony.
