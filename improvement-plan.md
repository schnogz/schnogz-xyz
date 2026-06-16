# Improvement Plan

A backlog of modernization opportunities surfaced during a codebase review. Items are checkboxes so this doc can be picked at over time. Priorities at the top, full categorized list below.

## Suggested priority order

**Quick wins (~15 min total, removes 2 deps, fixes broken behavior):**

- [ ] #1 — GA tracking is dead
- [ ] #2 — Orphan resume PDF
- [ ] #3 — Wasted preconnect
- [x] #21 — `target='blank'` → `target='_blank'`
- [x] #18 — Drop IE6–9 hacks from global-style

**Highest architectural value:**

- [x] #6 — Spirograph class → hooks (biggest legacy code)
- [ ] #14 — `gatsby-plugin-image` (biggest perf win)
- [x] #17 — Per-page Head + structured data (biggest SEO win)

**Worth doing eventually:**

- [ ] #8, #10 — Remove deps that are no longer pulling weight (#7 done alongside #20)

---

---

## 🔴 Dead / broken code

- [ ] **1. Google Analytics tracking is dead.** `gatsby-plugin-google-analytics` has a deprecation notice in its own README pointing at `gatsby-plugin-google-gtag`. The tracking ID `UA-62555232-1` in `gatsby-config.js:31` is a Universal Analytics property — UA stopped collecting data on **July 1, 2023**. This plugin is now a no-op. Either swap to `gatsby-plugin-google-gtag` with a GA4 measurement ID or remove the plugin entirely.
- [ ] **2. Orphan resume PDF.** `src/static/Andrew_Schneider_Resume.pdf` is in the wrong directory — Gatsby only auto-serves the **root** `static/` folder, not `src/static/`. The file has zero references in the source. Either move to `static/` and link to it, or delete the file and `src/static/`.
- [ ] **3. Wasted preconnect.** `gatsby-plugin-preconnect` is wired up to preconnect to `https://www.google-analytics.com`, but the analytics plugin above doesn't send anything there anymore. Either remove the plugin or update both together.

## 🟡 React modernization (class → hooks)

- [x] **4. `page.tsx` class → function.** Tab-key state can be `useState` + `useEffect`. Also worth noting: the `displayOutlines` state is passed to `GlobalStyle` but **the global stylesheet doesn't use it** — pure dead prop. Modern alternative: ditch the JS entirely and use CSS `:focus-visible` which gives keyboard-only focus rings for free.
- [x] **5. `header.tsx` class → function.** Tooltip state is trivial useState. The four `<SocialLink>` blocks repeat almost verbatim — map over a config array.
- [x] **6. `spirograph.tsx` class → function.** Bigger rewrite. The ~20 `!:` instance fields become a single `useRef<SpirographState>(null!)` (or several refs). `componentDidMount` / `componentWillUnmount` → `useEffect`. Animation frame ID should live in a ref so the cleanup can `cancelAnimationFrame`. The module-level `let windowWidth: number` (line 28) is a singleton that breaks if the component ever mounts twice — should be a ref.

## 🟡 Outdated dependencies / patterns

- [x] **7. `@loadable/component` → `React.lazy` + `Suspense`.** Gatsby 5 supports native React.lazy with SSR. `@loadable/component` was the Gatsby 4-era workaround that's no longer needed. Used in `pages/index.tsx` (4 imports) and `components/hero.tsx`. Removing it saves a dep and a babel plugin. *(Completed alongside #20 — all uses were eager-imported instead of lazy-loaded, and the dep was removed.)*
- [ ] **8. `@n8tb1t/use-scroll-position` is replaceable.** Used only by `components/scrollHelper.tsx`. The same behavior is achievable with a 5-line `useEffect` + `IntersectionObserver`, which is **more performant** than the polling approach (no scroll listener firing on every frame).
- [ ] **9. `scrollHelper.tsx` uses `window.history.pushState` directly.** Gatsby ships `navigate()` from `gatsby` which integrates with the SPA router. Direct `pushState` bypasses Gatsby's route awareness.
- [ ] **10. `gatsby-plugin-root-import` is mostly redundant.** Path aliases are now duplicated across `gatsby-config.js` and `tsconfig.json` (paths). Gatsby 5 can read tsconfig paths if you wire `onCreateWebpackConfig`, or drop the plugin and use only relative imports past a certain depth. Either route eliminates the "register in 3 places" rule.
- [ ] **11. Module-level `let ws: WebSocket` in `pages/btc-ticker.tsx:52`.** Anti-pattern — module scope outlives the component, causes bugs under HMR and React Strict Mode double-mounting. Should be `useRef<WebSocket | null>(null)` inside the component. Same for the no-cleanup `setTimeout` reconnect loop.
- [ ] **12. `scrobbles.tsx` has two near-identical `useEffect`+`fetch` blocks.** Could extract a small `useFetch` hook, or use Gatsby's GraphQL sourcing at build time so the LastFM call doesn't run client-side (faster paint, no in-flight skeleton).

## 🟡 Gatsby 5 features you're not using

- [ ] **13. `gatsby-config.ts` / `gatsby-node.ts`.** Now that the rest of the codebase is TS, the configs can be too. Gatsby 5 supports both natively. (`amplify.yml` doesn't care.)
- [ ] **14. `gatsby-plugin-image` + `<StaticImage>`.** Your company/project logos in `src/img/` are raw PNGs (geminiLogo2.png is 90KB, questionLogo.png is 58KB). `gatsby-plugin-image` would emit responsive AVIF/WebP, lazy-load below the fold, and serve placeholders during load. Big LCP win for the Experience section.
- [ ] **15. Gatsby Slices API.** `components/head.tsx`, `components/footer.tsx`, and `components/header.tsx` are rendered on every page — perfect Slice candidates (cached separately from page content, instant updates when only the slice changes).
- [ ] **16. `gatsby-plugin-robots-txt` could be replaced by `static/robots.txt`.** A static file is simpler than a plugin for a one-line robots policy.

## 🟡 SEO / accessibility / performance

- [x] **17. `components/head.tsx` is identical across all three pages.** Page-specific titles (`schnogz.xyz`, `404 — schnogz.xyz`, `BTC — schnogz.xyz`) would help SEO and tab-switching UX. The OpenGraph image has no `og:image:width` / `og:image:height` (most social embedders want them). No `twitter:card` tag. No structured data (JSON-LD `Person` schema would be apt for a portfolio).
- [x] **18. `global-style.ts` has ~50 lines of legacy IE6–9 hacks** (`_zoom: 1`, `*display`, `*margin-left`, `-ms-text-size-adjust`, `_font-family`, `[hidden] { display: none }`, etc.). Safe to delete. Or replace the whole hand-rolled normalize with the [`modern-normalize`](https://github.com/sindresorhus/modern-normalize) package (12 lines) or just drop normalization — modern browsers are uniform.
- [x] **19. `canvas` in Spirograph has no accessible name.** Add `role='img'` + `aria-label`, plus a hidden text fallback. *(Chose `aria-hidden='true'` instead — the animation is purely decorative, so hiding it from AT is more correct than naming it.)*
- [x] **20. Lazy-loading the content sections may hurt LCP.** Every section on `pages/index.tsx` is wrapped in `loadable()`, but they all render above the fold on the initial visit. Lazy-loading means more network round-trips before LCP. Worth measuring; the simpler eager-import may be faster.

## 🟢 Code-quality cleanups (low risk)

- [x] **21. `target='blank'` should be `target='_blank'`.** 5 occurrences across `header.tsx`, `footer.tsx`, `scrobbles.tsx`, `stats.tsx`. Browsers treat `'blank'` as a *named window* (so the second click reuses that window), not as "open new tab." Almost certainly not the intent.
- [x] **22. Mixed `rel` attributes.** Some links: `rel='noopener noreferrer'`, others: `rel='noreferrer'` (in `project.tsx`). Modern browsers default to `noopener` for `target='_blank'`, so functionally fine, but consistency helps.
- [x] **23. Inline `style={{...}}` in 3 places** (`stats.tsx:59`, `experience.tsx:27,42`). Should be styled-components for consistency with the rest of the codebase.
- [x] **24. The "TODO: get linkout to work" comment** was already deleted during TS migration — no remaining TODOs in the codebase. (Noted for completeness; nothing to do.)
- [x] **25. `lodash/debounce`** is the only lodash usage. A 6-line custom `debounce` would let you drop both `lodash` and `@types/lodash` (~440KB unpacked).
- [x] **26. `scrobbles.tsx`** computes "days since 2011-05-08" via raw `Date.getTime()` math. Modern alternative: `Intl.DateTimeFormat` with relative time, or just hardcode it as a string and update yearly. *(Also fixed a latent off-by-one bug: `new Date(2011, 5, 8)` was June 8, not May 8 — JS months are 0-indexed.)*

## 🟢 Toolchain / repo hygiene

- [x] **27. Yarn 1 → Yarn 4 (or pnpm).** Yarn 1 is in maintenance mode. Yarn 4 has lockfile-level integrity, plug'n'play (optional), and is materially faster. pnpm gives you stricter dependency resolution and disk savings. Either is a net upgrade.
- [x] **28. No `lint-staged`.** The pre-commit hook runs `yarn ci:lint` over the entire `src/`. With `lint-staged` it would only lint changed files — faster commits.
