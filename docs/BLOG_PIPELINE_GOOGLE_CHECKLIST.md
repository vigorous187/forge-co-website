# Blog pipeline — Google guideline checklist

Vendored for CI; keep in sync with shared docs.

Reviewed **2026-09-21**. The shared file at `~/Developer/shared/docs/BLOG_PIPELINE_GOOGLE_CHECKLIST.md` was not on the machine that vendored this copy, so this path is the in-repo canonical checklist. Monthly drift check: `npm run seo:guidelines:check` against `automation/guideline-baseline.json` (sources in `scripts/seo-guideline-sources.json`). Both init and check request `Accept-Language: en`. Without that header, Google serves these pages in rotating locales, and the fingerprint changes even when the English policy text does not.

Blog gates below are the ones `scripts/check-blog-quality.mjs` already enforces, plus editorial rules that stay human.

## Helpful, reliable, people-first content

Source: [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

Page last updated **2025-12-10 UTC**. No material policy change since the 2026-05-15 fingerprint. That date is older than the previous baseline.

Blog-gate expectations:

- Write for an existing audience. Original reporting or analysis, not a rewrite of other pages and not a post made mainly to rank.
- Who / How / Why: keep `author`, `howCreated`, and a clear reason the post helps a reader who arrived on the site directly.
- Titles and H1s describe the piece. Do not exaggerate, shock, or promise a ranking outcome. `prohibitedPatterns` in `scripts/site-gates.json` blocks guaranteed-ranking claims.
- Depth the build already checks: at least 900 words, at least 4 H2s, one service link, one related-post link, and the `/growth-audit/` conversion link in the body.
- Numeric claims need at least 2 `sources`. `ymylReviewRequired: true` needs at least 3 `sources` (health, money, safety, or similar).
- Do not change `publishDate` or add and remove posts just to look fresh.

## Generative AI content

Source: [Guidance on using generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)

Page last updated **2025-12-10 UTC**. No material policy change since the 2026-05-15 fingerprint.

Blog-gate expectations:

- Generative AI may help research or structure a draft. Generating many pages without added value is scaled content abuse.
- Accuracy, quality, and relevance apply to the title, meta description, structured data, and image alt text, not only the article body.
- If `howCreated` contains `ai`, the body must include a `## How this was created` section (`check-blog-quality.mjs`). Say what was automated and why it was useful when a reader would reasonably ask.
- Do not publish unedited, low-originality, or mass-produced drafts. Queue slots stay editorially reviewed.
- Merchant Center IPTC `DigitalSourceType` / `TrainedAlgorithmicMedia` rules are for ecommerce product images and AI product attributes. They are not a blog gate on this site.

## Spam policies

Source: [Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies)

Page last updated **2026-08-28 UTC**. This is the material change since the 2026-05-15 fingerprint.

Material delta (2026-08-28, enforcement from 2026-08-30):

- The site reputation section is now the **site reputation policy**, with different effects inside and outside the European Economic Area (EEA).
- Outside the EEA, a manual action still affects the portion of the site that is out of line with the policy. The rest of the site is unchanged.
- Inside the EEA, that manual-action impact does not apply. The pages may be categorized as separate from the main domain and ranked on their own merits. Previous EEA manual actions under this policy are lifted. Search Console notice, reconsideration, and mediation for eligible sites remain.
- Human review weighs whether the host actually controls the page: presentation consistent with the host, quality in line with the host, clear authorship and editorial responsibility, and whether the same content appears on other sites. Freelance work with those marks, written for this site, is described as unlikely to draw action. Third-party pages published mainly to borrow the host's ranking signals stay out of line with the policy.

Blog-gate expectations:

- No scaled content abuse, including generative-AI pages created mainly to manipulate rankings. No scraping, synonymizing, doorway city pages, keyword stuffing, hidden text, cloaking, or sneaky redirects.
- No link spam: paid, exchanged, or guest links that pass ranking credit.
- Forge posts are first-party and on the site's topic. Do not host third-party content here mainly to borrow domain signals.
- The EEA split does not loosen spam rules for publishing. It changes where a site-reputation manual action changes rankings. This site still does not publish parasite or scaled pages.

## Refresh

1. Re-read the three URLs above.
2. Update the bullets on this page if the policy text changed.
3. Run `npm run seo:guidelines:init`, then `npm run seo:guidelines:check`.
4. Commit this file and `automation/guideline-baseline.json` together.
