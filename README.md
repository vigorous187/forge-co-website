# Forge site (`forge-co.ca`)

Astro static site for Forge Growth Co. Deploy target: **Cloudflare Pages** (`forge-co`).

## Commands

| Command                  | Action                                                                |
| ------------------------ | --------------------------------------------------------------------- |
| `npm run dev`            | Dev server (default [http://localhost:4321](http://localhost:4321))   |
| `npm run build`          | Production build + SEO / blog / GEO / brand / **heading audit** gates |
| `npm run preview`        | Serve `dist/` locally before deploy                                   |
| `npm run audit-headings` | Re-run heading audit only (needs `dist/` from a build)                |

## Deploy

```bash
npm run build
npx wrangler pages deploy dist --project-name forge-co --commit-dirty=true
```

Post-deploy smoke tests and favicon checks: see **`~/Developer/shared/knowledge-hub/seo/website-production-standard.md`**.

## Standards (do not ship without)

Multi-brand playbook (blog Typography, author assets, final-site checklist, Cloudflare mapping):  
**`~/Developer/shared/knowledge-hub/seo/website-production-standard.md`** (or the same path relative to your workspace root under `shared/knowledge-hub/seo/`).

Forge repo layout: **`../REPO-MAP.md`** (parent forge workspace).
