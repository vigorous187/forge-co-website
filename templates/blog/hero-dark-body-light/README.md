# Hero-dark + body-light blog (Forge pattern)

Use when the post has a **dark hero band** (title, byline, category on `bg-brand-primary`) and a **light article column** below.

**Do not** import `<Header />` or `<Footer />` in blog routes — `Layout.astro` owns chrome.

Canonical implementation: `src/pages/blog/[...slug].astro` in this repo.

Run `check-blog-chrome.mjs` after build; hero sections may use `text-brand-white` — the gate only blocks invisible copy inside `<article>` on light-body pages.
