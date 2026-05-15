# Forge — blog pipeline & SEO governance

Canonical checklist: [~/Developer/shared/docs/BLOG_PIPELINE_GOOGLE_CHECKLIST.md](file:///Users/user/Developer/shared/docs/BLOG_PIPELINE_GOOGLE_CHECKLIST.md)

## Automation

- **Weekly** `blog-automation.yml`: opens PR with Forge-valid `draft: true` MDX from `automation/topic-queue.json` (`scripts/blog-open-slot.mjs`).
- **Weekly** `seo-build-health.yml`: `npm ci` + `npm run build` (runs blog quality, GEO, brand, headings).
- **Monthly** `seo-guideline-drift.yml`: Google doc fingerprints vs `automation/guideline-baseline.json`.

## Gates

`check-blog-quality.mjs` enforces depth, internal links, sources for numeric claims, and **AI disclosure** when `howCreated` contains `ai`. `ymylReviewRequired: true` requires three or more sources in frontmatter.

## Commands

```bash
npm run blog:inventory -- --days=90
npm run seo:guidelines:check
npm run seo:guidelines:init
```

## Proof inventory (90-day window)

Rule: `publishDate` within the last **90** days (`blog-inventory.mjs` maps Forge `publishDate` → inventory column).

### Snapshot 2026-05-14

| Slug                                     | File                                         | datePublished | In window |
| ---------------------------------------- | -------------------------------------------- | ------------- | --------- |
| content-refresh-old-service-pages-2026   | content-refresh-old-service-pages-2026.mdx   | 2026-05-10    | yes       |
| internal-linking-money-pages-2026        | internal-linking-money-pages-2026.mdx        | 2026-05-09    | yes       |
| measure-seo-like-a-service-business-2026 | measure-seo-like-a-service-business-2026.mdx | 2026-05-08    | yes       |
| ai-search-visibility-local-brands-2026   | ai-search-visibility-local-brands-2026.mdx   | 2026-05-07    | yes       |
| core-web-vitals-lead-forms-2026          | core-web-vitals-lead-forms-2026.mdx          | 2026-05-06    | yes       |
| review-velocity-without-policy-risk-2026 | review-velocity-without-policy-risk-2026.mdx | 2026-05-05    | yes       |
| gbp-categories-photos-home-services-2026 | gbp-categories-photos-home-services-2026.mdx | 2026-05-04    | yes       |
| schema-jsonld-local-trades-2026          | schema-jsonld-local-trades-2026.mdx          | 2026-05-03    | yes       |
| digital-presence-audit-checklist-2026    | digital-presence-audit-checklist-2026.mdx    | 2026-05-02    | yes       |
| hub-spoke-service-pages-contractors-2026 | hub-spoke-service-pages-contractors-2026.mdx | 2026-05-02    | yes       |

**Count in window:** 10 / 10 total published
