# Forge Website — Complete Build Plan

**Domain:** forge-co.ca
**CF Pages Project:** forge-co
**Tech Stack:** Astro 6 + Tailwind 4 + TypeScript
**Source:** Competitive research from Top 5 US Restaurant Marketing Agencies analysis (2026-04)
**Benchmark:** The Digital Restaurant (thedigitalrestaurant.com) — scored 9.5/10

---

## Strategic Positioning

**Forge** is not a freelancer portfolio. It's a **growth systems agency** built for restaurants first, with permission to serve local businesses that share similar growth challenges.

### Core Narrative

> "Stop buying marketing tactics. Start running a growth system."

The #1 insight from the research: The Digital Restaurant wins because it sells a **named system**, not services. Forge must do the same.

### Named Methodology: **The Forge Growth System**

Three-stage framework (mirrors TDR's "Visibility → Conversion → Revenue"):

| Stage | Name              | What It Means                                                            |
| ----- | ----------------- | ------------------------------------------------------------------------ |
| 1     | **Be Found**      | SEO, Google Business Profile, AI search, local listings, social presence |
| 2     | **Be Chosen**     | Website conversion, reviews, content, photography, brand identity        |
| 3     | **Be Remembered** | Email/SMS, loyalty content, retargeting, reputation management           |

Sub-components (named, with plain-English subtitles):

- **SearchForge** — SEO, Google Maps, AI visibility, listings, and citation management
- **ContentForge** — Video, social media, and photography
- **ReviewForge** — Reviews, reputation, and response systems
- **WebForge** — Conversion-optimized website design and development

> PresenceForge merged into SearchForge (per review: fewer buckets convert better, and the GBP/citation/directory work is inseparable from search visibility in practice).

### Target Client

- Independent restaurants + local businesses doing **$500K+ annual revenue**
- GTA-based (Toronto, Mississauga, Brampton, Hamilton, Oakville, Burlington, Vaughan, Markham)
- Operators who are overwhelmed by marketing, not looking for a "social media person"

### Dual-Brand Architecture

| Brand                         | Domain                     | Target                                                      | Voice                                     |
| ----------------------------- | -------------------------- | ----------------------------------------------------------- | ----------------------------------------- |
| **Forge**                     | forge-co.ca                | All local businesses, restaurants at scale, franchise/chain | Professional, systems-thinking, authority |
| **Toronto Restaurant Growth** | torontorestaurantgrowth.ca | Independent GTA restaurants, neighbourhood-level            | Urgent, insider, survival-and-growth      |

**This plan covers Forge (forge-co.ca) only.** TRG is Phase 2.

---

## Site Architecture

### Launch Pages (13 pages — ship fast, ship strong)

```
/                           → Homepage (restaurant-first positioning)
/about                      → About Forge (team, story, values)
/services                   → Services overview (The Forge Growth System)
/services/search-forge      → SearchForge (SEO + GBP + AI search + listings + citations)
/services/content-forge     → ContentForge (video, social, photography)
/services/web-design        → Website Design & Development
/pricing                    → Transparent pricing tiers
/case-studies               → Case studies hub (1-2 strong studies at launch)
/case-studies/[slug]        → Individual case study pages (dynamic)
/blog                       → Blog index
/blog/[slug]                → Individual blog posts (4 strong posts at launch)
/contact                    → Contact + booking form
/growth-audit               → $497 Growth Audit landing page (dominant CTA)
```

### Phase 1.5 Pages (ship within 2 weeks of launch):

```
/services/review-forge      → ReviewForge (reviews, reputation, response systems)
/industries/restaurants     → Restaurant vertical landing page
/industries/local-business  → Local business vertical landing page
```

### Future pages (post-launch):

- `/gta/[city]` — City-specific landing pages (Toronto, Mississauga, Brampton, etc.)
- `/industries/[vertical]` — Additional verticals (dental, real estate, fitness, etc.)
- `/tools` — Free tools / calculators
- `/partners` — Partner/referral page

---

## Page-by-Page Content Spec

### 1. Homepage (`/`)

**Goal:** Convince in 10 seconds that Forge is the only growth partner worth talking to.

**Sections (in scroll order):**

1. **Hero**
   - Headline: "Your Restaurant Deserves a Growth System, Not Another Social Media Post"
   - Subhead: "Forge builds connected marketing systems that turn visibility into revenue. Built for restaurants first, and local businesses with similar growth challenges."
   - Qualifier line: "Best fit for businesses doing $500K+ annually"
   - CTA: "Get Your Growth Audit — $497" (primary) + "See How It Works" (secondary, scrolls to system section)
   - Trust bar below hero: "Trusted by [X] GTA businesses" + client logos

2. **The Problem**
   - "7,000 Canadian restaurants closed last year. The ones surviving aren't working harder — they're marketing smarter."
   - 3 pain-point cards: "Invisible on Google", "Posting but not growing", "Spending without tracking"

3. **The Forge Growth System** (Be Found → Be Chosen → Be Remembered)
   - Visual 3-step framework with icons
   - Each step: name, 1-sentence description, key services underneath
   - "This isn't a menu of tactics. It's a connected system where every piece amplifies the others."

4. **Services Preview**
   - 3 cards: SearchForge, ContentForge, WebForge (ReviewForge added in Phase 1.5)
   - Each: icon, branded name + plain-English subtitle, 1-line description, "Learn more →"

5. **Results / Social Proof**
   - 3-4 metric callouts (e.g., "340% increase in Google Maps visibility", "$28K monthly revenue attributed to organic search")
   - Named testimonial with photo, name, business name, role

6. **Case Study Preview**
   - 1-2 featured case studies with before/after metrics
   - "See all case studies →"

7. **The Growth Audit CTA**
   - Full-width section explaining the $497 Growth Audit
   - What's included (GBP health, local SEO, social audit, website conversion, 90-day plan)
   - "Credit applied to your first month"
   - Book now CTA

8. **Blog Preview**
   - 3 latest posts with thumbnails
   - "Read more on the blog →"

9. **Footer**
   - Logo + tagline
   - Quick links (Services, Case Studies, Blog, Contact)
   - Contact info (phone, email, address)
   - Social links
   - "© 2026 Forge. Toronto's growth agency."

### 2. About (`/about`)

- Forge origin story — Michael + Jayden, why restaurants, what they saw in the market
- "We're not a social media agency. We're a growth systems company."
- Team section (Michael: strategy + tech, Jayden: client relationships + content)
- Values: Results over activity, Systems over tactics, Transparency over promises
- GTA-focused: "We live here. We eat here. We grow businesses here."
- CTA: Book a call

### 3. Services Overview (`/services`)

- The Forge Growth System visual (hero-level)
- All 5 service areas as expandable cards with descriptions
- "Every service connects. That's the system." positioning statement
- Pricing teaser: "Transparent pricing. No surprises. →"
- CTA: Growth Audit

### 4. SearchForge (`/services/search-forge`)

- **What:** Local SEO + Organic SEO + AI Search Optimization
- **Why it matters:** "When someone asks ChatGPT for the best pizza in Mississauga, will your restaurant show up?"
- Pain points list (from TDR model)
- What's included: GBP optimization, on-page SEO, technical SEO, AI search signals, local citations, link building
- Results metrics from case studies
- Pricing reference
- FAQ (embedded objection handling)
- CTA: Growth Audit

### 5. ContentForge (`/services/content-forge`)

- **What:** On-site video production, social media management, brand photography
- **Key differentiator:** "We come to your restaurant. We film. We post. You fill seats."
- Content types: TikTok/Reels/Shorts, Instagram feed, Stories, Google Posts
- Monthly content calendar example
- "68% of Gen Z diners discover restaurants on social media"
- CTA: Growth Audit

### 6. ReviewForge (`/services/review-forge`)

- **What:** Review generation, response management, reputation monitoring
- "A restaurant at 4.2 stars gets 33% more clicks than one at 3.8"
- Automated review request flows
- AI-assisted response drafting
- Multi-platform monitoring (Google, Yelp, TripAdvisor, UberEats)
- CTA: Growth Audit

### 7. Web Design (`/services/web-design`)

- **What:** Conversion-optimized restaurant websites
- Mobile-first, fast, SEO-ready
- Astro-powered (mention speed advantage)
- Before/after examples
- "Your website should be your hardest-working employee"
- Includes: design, development, hosting, ongoing updates
- CTA: Growth Audit

### 9. Pricing (`/pricing`)

**Transparent. Tiered. Clear.**

| Tier    | Name             | Price         | Target                                  |
| ------- | ---------------- | ------------- | --------------------------------------- |
| Entry   | **Growth Audit** | $497 one-time | Any business — credited to first month  |
| Starter | **Ignite**       | $1,200/mo     | Single-location, core visibility        |
| Growth  | **Accelerate**   | $1,800/mo     | Full system, content + SEO + reviews    |
| Scale   | **Dominate**     | $2,500+/mo    | Multi-location, franchise, full service |

Each tier lists exactly what's included. No ambiguity.

- **Ignite** = foundation + visibility (for operators just getting started with marketing)
- **Accelerate** = the flagship tier where most serious restaurants should land
- **Dominate** = explicitly multi-location, franchise, or aggressive growth
- Minimum commitment: 6 months (stated clearly)
- "For less than a part-time employee, you get a full marketing team"
- "Most restaurant clients invest between $1,800 and $2,500/mo"
- FAQ section (objection handling): "Why 6 months?", "What if it's not working?", "Can I upgrade mid-contract?"
- CTA: Get Your Growth Audit (primary) / Book a Strategy Call (secondary)

### Site-Wide CTA Strategy

- **Primary CTA everywhere:** "Get Your Growth Audit" → links to /growth-audit/
- **Secondary CTA:** "Book a Strategy Call" → links to booking embed on /contact/
- Avoid too many CTA variants. One dominant action across the site.

### 10. Case Studies (`/case-studies`)

- Launch with 1-2 strong, defensible case studies (not a thin library)
- Use "Selected Client Work" framing if we have fewer than 3
- Each case study requires at least 2 of: real metric, named testimonial, published approval
- Grid of case study cards (scales as we add more)
- Each card: client logo/photo, business name, industry, key metric
- CTA: "Get Your Growth Audit"

### 11. Case Study Detail (`/case-studies/[slug]`)

- Content collection (Markdown + frontmatter)
- Structure: Challenge → Solution → Results → Testimonial
- Specific metrics (%, $, timeframe)
- Services used (tagged)
- CTA: Growth Audit

### 12. Blog Index (`/blog`)

- Card grid with featured image, title, date, category, read time
- Categories: SEO, Social Media, Restaurant Marketing, Local Business, Industry Trends
- Pagination
- Newsletter signup sidebar/section

### 13. Blog Post (`/blog/[slug]`)

- Content collection (MDX for rich content)
- Table of contents (auto-generated)
- Author attribution
- Related posts
- CTA: Growth Audit (bottom)
- Schema: Article + BreadcrumbList

### 14. Contact (`/contact`)

- Contact form (name, email, phone, business name, message)
- Calendly or Cal.com embed for booking
- Phone number, email, business hours
- Map embed (GTA area)
- "15-30 minute consultation. No obligation."

### 15. Growth Audit Landing Page (`/growth-audit`)

- Dedicated conversion page for the $497 audit
- What's included (detailed breakdown)
- "Credit applied to first month of any package"
- Testimonial from past audit client
- FAQ
- Booking form / Calendly embed
- This is the highest-intent page — optimized for conversion above all

### 16-17. Industry Pages (`/industries/restaurants`, `/industries/local-business`)

- Vertical-specific messaging
- Pain points specific to that vertical
- Case studies filtered to that vertical
- Relevant services highlighted
- City mentions for local SEO
- CTA: Growth Audit

---

## Blog Content Plan (First 90 Days)

### Month 1 — Foundation (8 posts)

| #   | Title                                                                    | Target Keyword                      | Category |
| --- | ------------------------------------------------------------------------ | ----------------------------------- | -------- |
| 1   | How Toronto Restaurants Can Rank on Google Maps in 2026                  | toronto restaurant google maps      | SEO      |
| 2   | The Complete Google Business Profile Guide for GTA Restaurants           | google business profile restaurant  | SEO      |
| 3   | Why 7,000 Canadian Restaurants Closed Last Year (And How to Not Be Next) | canadian restaurant closures        | Industry |
| 4   | TikTok for Toronto Restaurants: The Complete Guide                       | tiktok restaurant marketing toronto | Social   |
| 5   | Restaurant SEO Checklist: 15 Things to Fix This Week                     | restaurant seo checklist            | SEO      |
| 6   | How Much Should a Toronto Restaurant Spend on Marketing?                 | restaurant marketing budget toronto | Strategy |
| 7   | Google Reviews for Restaurants: How to Get More (Ethically)              | restaurant google reviews           | Reviews  |
| 8   | What Is a Growth System? Why Tactics Alone Don't Work                    | growth system marketing             | Strategy |

### Month 2 — Depth (6 posts)

| #   | Title                                                              | Target Keyword                      | Category   |
| --- | ------------------------------------------------------------------ | ----------------------------------- | ---------- |
| 9   | AI Search for Restaurants: ChatGPT, Gemini, and Your Visibility    | ai search restaurant marketing      | SEO        |
| 10  | Instagram vs TikTok for Restaurants: Where to Focus in 2026        | instagram vs tiktok restaurant      | Social     |
| 11  | How to Respond to Negative Restaurant Reviews (Templates Included) | respond negative restaurant reviews | Reviews    |
| 12  | Local SEO for Mississauga Businesses: The Complete Guide           | local seo mississauga               | SEO        |
| 13  | 5 Signs Your Restaurant Website Is Costing You Customers           | restaurant website optimization     | Web        |
| 14  | Behind the Scenes: How We Grew [Client] 340% in 6 Months           | restaurant marketing case study     | Case Study |

### Month 3 — Authority (6 posts)

| #   | Title                                                              | Target Keyword                      | Category |
| --- | ------------------------------------------------------------------ | ----------------------------------- | -------- |
| 15  | The Restaurant Survival Package: Marketing on a Tight Budget       | restaurant marketing budget small   | Strategy |
| 16  | Food Photography Tips for Restaurant Owners (Phone Only)           | restaurant food photography tips    | Content  |
| 17  | Google Ads for Toronto Restaurants: Strategy, Budget & ROI         | google ads restaurant toronto       | Paid     |
| 18  | Why Your Restaurant's Social Media Isn't Working (And What to Fix) | restaurant social media not working | Social   |
| 19  | Local SEO for Brampton Businesses: The Complete Guide              | local seo brampton                  | SEO      |
| 20  | Email Marketing for Restaurants: The Underrated Growth Channel     | restaurant email marketing          | Strategy |

---

## SEO Strategy

### Technical SEO

- **trailingSlash: "always"** in astro.config.mjs (per deploy rules)
- **Auto-generated sitemap** via @astrojs/sitemap with noindex filter
- **IndexNow** key: `a1dbf428838544d38bc459ab6dbfbc71` (already in domain-manifest)
- **Canonical URLs** on every page
- **robots.txt** allowing all crawlers + AI bots (GPTBot, ClaudeBot, PerplexityBot)
- **llms.txt** at root for AI discoverability
- **Page speed target:** Lighthouse 95+ on all pages
- **Core Web Vitals:** LCP < 2.5s, INP < 200ms, CLS < 0.1

### On-Page SEO

Every page gets:

- Unique `<title>` with primary keyword + brand
- Meta description (150-160 chars, includes CTA)
- Open Graph tags (og:title, og:description, og:image, og:type)
- Twitter Card tags
- Canonical URL
- H1 with primary keyword (one per page)
- Structured internal linking

### Schema Markup

**Site-wide:**

- `Organization` — Forge agency details
- `WebSite` with `SearchAction`
- `BreadcrumbList` on all pages

**Page-specific:**

- Homepage: `ProfessionalService` + `Organization`
- Service pages: `Service` with `provider`, `areaServed`, `serviceType`
- Blog posts: `Article` with `author`, `datePublished`, `dateModified`
- Case studies: `Article` + `Review`
- Pricing: `Product` with `Offer` for each tier
- Contact: `LocalBusiness` with `openingHours`, `address`, `telephone`
- Growth Audit: `Product` + `Offer` ($497)

### Content SEO

- **Branded terms:** SearchForge, ContentForge, ReviewForge, WebForge, The Forge Growth System
- **City pages (Phase 2):** Toronto, Mississauga, Brampton, Hamilton, Oakville, Burlington, Vaughan, Markham
- **Long-tail targets:** "[city] restaurant marketing agency", "restaurant seo [city]", "google business profile optimization [city]"
- **AI citation readiness:** Clear, quotable statements in every service page. "Forge is a GTA-based growth agency..." format.

---

## Design Direction

### Brand Identity

- **Primary color:** Deep navy / dark blue (authority, trust)
- **Secondary color:** Muted amber / burnished gold (energy, premium — not too bright, not "finance brand")
- **Accent:** Off-white, stone, or warm gray backgrounds (not stark white)
- **Typography:**
  - Display: Bold, modern sans-serif (e.g., Plus Jakarta Sans, Outfit, or Satoshi)
  - Body: Clean, readable sans-serif (Inter or similar)
- **Tone:** Professional but not corporate. Direct but not aggressive. Confident but not arrogant.

### Design Principles

1. **Not generic AI aesthetic** — no gradient blobs, no generic stock photos, no "modern SaaS" template feel
2. **Photography-forward** — real photos of real restaurants, real food, real GTA locations
3. **Data-forward** — metrics, numbers, percentages prominently displayed
4. **Mobile-first** — 70%+ of restaurant operator traffic is mobile
5. **Fast** — no heavy animations, no unnecessary JavaScript, Astro islands only where needed
6. **Dark sections for authority** — hero and key CTAs on dark backgrounds
7. **Cards for scanability** — services, case studies, blog posts all use card layouts

### Component Library (extend from forge-starter)

Reuse from forge-starter where applicable, build new:

- `Hero.astro` — redesign for multi-page (not single-page scroll)
- `SystemDiagram.astro` — Be Found → Be Chosen → Be Remembered visual
- `ServiceCard.astro` — icon + name + description + link
- `PricingTable.astro` — tiered pricing with feature comparison
- `CaseStudyCard.astro` — image + metrics + link
- `BlogCard.astro` — image + title + date + category
- `TestimonialCard.astro` — quote + attribution + photo
- `MetricCallout.astro` — big number + label
- `CTABanner.astro` — full-width CTA section (reusable)
- `FAQ.astro` — accordion-style FAQ
- `BreadcrumbNav.astro` — breadcrumb navigation
- `TableOfContents.astro` — auto-generated for blog posts
- `Header.astro` — site-wide nav with dropdowns
- `Footer.astro` — site-wide footer
- `Layout.astro` — base layout with SEO meta, schema, analytics

---

## Content Collections

### Case Studies (`src/content/case-studies/`)

```yaml
# frontmatter schema
title: string
client: string
industry: "restaurant" | "local-business" | "franchise"
location: string
services: string[] # ["SearchForge", "ContentForge", etc.]
metrics:
  - label: string
    value: string
    prefix?: string
    suffix?: string
testimonial:
  quote: string
  author: string
  role: string
featuredImage: string
publishDate: date
featured: boolean
```

### Blog Posts (`src/content/blog/`)

```yaml
# frontmatter schema
title: string
description: string
author: "Michael Sifontes" | "Jayden Aj"
publishDate: date
updatedDate?: date
category: "seo" | "social-media" | "restaurant-marketing" | "local-business" | "industry-trends" | "case-study" | "strategy"
tags: string[]
featuredImage: string
readTime: number # minutes
featured: boolean
draft: boolean
```

---

## Integrations & Analytics

- **Google Analytics 4** — via Cloudflare Zaraz (if available) or direct gtag
- **Google Search Console** — verify at launch
- **Forge Tracker** — engagement tracking snippet (from `~/forge/forge-tracker/tracking-snippet.html`)
- **Meta Pixel** — via Zaraz when CAPI token available
- **Cal.com** — embedded booking on contact + growth-audit pages (single consistent experience)
- **Form submissions** — Forge-specific CF Worker at `api.forge-co.ca` (spec: `strategy/form-backend-spec.md`)

---

## Deployment

- **Repo:** `~/Developer/forge/repos/forge-site/`
- **Build:** `npm run build` → outputs to `dist/`
- **Deploy:** `wrangler pages deploy dist/ --project-name=forge-co` (via cf-pages-deploy-guard.sh)
- **Production tag:** `.production-live` file at repo root
- **IndexNow:** Auto-submitted by deploy guard
- **Custom domain:** forge-co.ca (already configured in CF Pages)

---

## Build Phases

### Phase 0 — Scaffold (Day 1)

- [ ] Initialize Astro project in `~/Developer/forge/repos/forge-site/`
- [ ] Configure astro.config.mjs (site URL, trailingSlash, sitemap, Tailwind)
- [ ] Set up content collections (blog, case-studies)
- [ ] Create base Layout.astro with SEO meta + schema
- [ ] Create Header + Footer components
- [ ] Set up brand tokens in global.css (navy + muted amber + warm grays)
- [ ] Add .production-live, IndexNow key, robots.txt, llms.txt

### Phase 1 — Core Pages (Days 2-3)

- [ ] Homepage (all sections, restaurant-first hero)
- [ ] About page
- [ ] Services overview (The Forge Growth System)
- [ ] Contact page (with booking embed)
- [ ] Growth Audit landing page (dominant conversion page)

### Phase 2 — Service Pages + Pricing (Day 4)

- [ ] SearchForge page (SEO + GBP + AI search + listings + citations)
- [ ] ContentForge page (video, social, photography)
- [ ] Web Design page
- [ ] Pricing page with tiers (Ignite / Accelerate / Dominate + Growth Audit)

### Phase 3 — Case Studies + Blog (Days 5-6)

- [ ] Case studies hub ("Selected Client Work" if < 3 studies)
- [ ] Case study template
- [ ] 1-2 strong case studies with real metrics + testimonials
- [ ] Blog index page
- [ ] Blog post template (MDX)
- [ ] First 4 blog posts (from Month 1 plan)

### Phase 4 — Polish & Launch (Day 7)

- [ ] Full SEO audit (all pages pass)
- [ ] Lighthouse audit (95+ all pages)
- [ ] Schema validation (all types)
- [ ] Mobile responsive check
- [ ] Cross-browser check
- [ ] Deploy to CF Pages via deploy guard
- [ ] Verify live site
- [ ] Submit to Google Search Console
- [ ] IndexNow submission

### Phase 5 — Phase 1.5 Pages (Week 2)

- [ ] ReviewForge service page
- [ ] Restaurant vertical landing page
- [ ] Local business vertical landing page
- [ ] Newsletter signup component
- [ ] Additional case studies

### Phase 6 — Post-Launch Growth (Week 3+)

- [ ] City-specific landing pages (GTA)
- [ ] Remaining blog posts (complete Month 1 calendar)
- [ ] Forge-specific form backend worker
- [ ] A/B test Growth Audit CTA
- [ ] Email capture / newsletter integration

---

## Decisions Made (from Perplexity review)

| #   | Question             | Decision                                   | Notes                                                                                        |
| --- | -------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------- |
| 1   | Named methodology    | **Keep** The Forge Growth System           | Be Found → Be Chosen → Be Remembered confirmed                                               |
| 2   | Service architecture | **Merge** PresenceForge into SearchForge   | 3 core services at launch + WebForge. ReviewForge in Phase 1.5                               |
| 3   | Pricing              | **Keep** $497 / $1,200 / $1,800 / $2,500+  | Sharpen package boundaries (Ignite=foundation, Accelerate=flagship, Dominate=multi-location) |
| 4   | Brand colors         | **Keep** navy + muted amber/gold           | Burnished gold, not bright. Warm gray backgrounds, not stark white                           |
| 5   | Form backend         | **Build Forge-specific**                   | Reuse mhb-chatbot temporarily for week 1 if needed, but architect for own endpoint           |
| 6   | Booking tool         | **Cal.com preferred** / Calendly if faster | Single consistent booking experience across all CTAs                                         |
| 7   | Blog authorship      | **Named authors** (Michael + Jayden)       | Forge as publisher. Better E-E-A-T signals                                                   |
| 8   | Homepage focus       | **Restaurant-first**                       | Local businesses as secondary line, not co-equal                                             |

## All Questions Resolved

| #   | Question     | Decision                                                                                                                                                               |
| --- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Case studies | **Crab Boil** confirmed. Metrics: 202K social followers, 523K monthly search gap, 28/100 SEO score, 87% content velocity gap, 3 locations. Review forensics available. |
| 2   | Team photos  | **Found.** Michael: `forge/outreach/new-york-sliders/screenshots/michael-sifontes-headshot.jpg`. Jayden: `forge/assets/photos/jayden-aj-profile-256.png`               |
| 3   | Booking tool | **Cal.com** confirmed                                                                                                                                                  |
| 4   | Form backend | **Forge-specific CF Worker** (api.forge-co.ca). Full spec saved in `strategy/form-backend-spec.md`. Build in Phase 6.                                                  |

**Status: READY TO BUILD. All questions answered. Plan approved.**

---

## Files Reference

- Competitive research: `~/Developer/forge/strategy/competitive-research-2026-04.md`
- Domain manifest: `~/Developer/shared/scripts/config/domain-manifest.json`
- Forge starter template: `~/Developer/forge/forge-starter/`
- Tracking snippet: `~/forge/forge-tracker/tracking-snippet.html`
- Deploy guard: `~/Developer/shared/scripts/cf-pages-deploy-guard.sh`
