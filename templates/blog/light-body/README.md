# Light-body blog template (bare minimum)

Use when the site layout has a **white page background** (`body` with `bg-white text-primary`) and a **dark fixed header** (nav links may stay `text-white`).

**Do not** import `<Header />` or `<Footer />` in blog pages — the shared layout already renders them once.

Copy into your repo:

| Template file          | Target                                         |
| ---------------------- | ---------------------------------------------- |
| `slug.astro.template`  | `src/pages/blog/[slug].astro` (or `[...slug]`) |
| `index.astro.template` | `src/pages/blog/index.astro`                   |

After wiring pages, run `npm run build` — `check-blog-chrome.mjs` must pass.

Reference implementation: `~/Developer/css/repos/canadianSmartSavingsWebsite` (Canadian Smart Savings, 2026-05).
