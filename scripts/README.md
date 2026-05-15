# Forge site quality gates (`scripts/`)

These Node scripts run **after** `astro build` (see `package.json` `build` script). All must exit `0` before the site is considered shippable.

## Build order

1. `astro build` → writes `dist/`
2. `check-seo-baseline.mjs` — robots, canonical, sitemap, noindex consistency
3. `check-blog-quality.mjs` — blog frontmatter + content invariants (reads `scripts/site-gates.json` → `blogQuality`)
4. `check-geo-readiness.mjs` — GEO / AI discovery signals (reads `site-gates.json` → `geo`)
5. `check-brand-alignment.mjs` — brand scan (reads `site-gates.json` → `brand`)
6. `audit-headings.mjs` — shipped HTML heading ladder over `dist/**/*.html`

## `site-gates.json`

Per-site JSON next to the scripts. Keys used by the gate scripts:

| Key           | Consumers                   | Notes                                                                                                     |
| ------------- | --------------------------- | --------------------------------------------------------------------------------------------------------- |
| `blogQuality` | `check-blog-quality.mjs`    | `blogDir`, word counts, `minH2`, optional `conversionLink` / `requireBodySubstring`, `prohibitedPatterns` |
| `geo`         | `check-geo-readiness.mjs`   | Content dirs + template paths for blog/case-study checks                                                  |
| `brand`       | `check-brand-alignment.mjs` | `scanDirs`, `skipPathSubstrings`, `forbiddenPatterns`                                                     |

Do **not** add unused keys “for documentation” — only keys the scripts read.

## Heading audit (`audit-headings.mjs`)

- Strips `<script>`, `<style>`, and **`<footer>`** before collecting `h1`–`h6` (footer nav labels must not pollute the main outline).
- Skips redirect-only HTML shells (`<meta http-equiv="refresh">` with no real body).
- Fails if: more than one `h1`, zero `h1`, or any heading level jump **> 1** (e.g. `h1` → `h3`).

**Canonical copy:** this file in `forge-site` is the source of truth; other Astro repos should copy it (or symlink) and wire `npm run build` the same way — do not fork heading rules silently.

## Adopting on another Astro site

1. Copy `audit-headings.mjs`, `check-*.mjs` as needed, and `site-gates.json` (trim keys you do not use).
2. Add `postbuild` / chained `build` in `package.json` matching Forge’s order.
3. Run `npm run build` locally until green; fix outline in **`<main>`** first (footer is already excluded).

See also: repo root `README.md` and `~/Developer/shared/knowledge-hub/seo/website-production-standard.md` (gates + deploy checklist).
