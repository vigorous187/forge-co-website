import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.enum(["Michael Sifontes", "Jayden Aj"]),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum([
      "seo",
      "social-media",
      "restaurant-marketing",
      "local-business",
      "industry-trends",
      "case-study",
      "strategy",
    ]),
    tags: z.array(z.string()),
    featuredImage: z.string().optional(),
    readTime: z.number(),
    featured: z.boolean(),
    draft: z.boolean(),
    canonical: z.string().url().optional(),
    primaryIntent: z.enum([
      "informational",
      "commercial-investigation",
      "transactional",
      "navigational",
    ]),
    targetEntity: z.string().min(2),
    region: z.string().min(2),
    lastReviewedBy: z.string().min(2),
    reviewedDate: z.coerce.date(),
    sources: z
      .array(
        z.object({
          name: z.string().min(2),
          url: z.string().url(),
          publisher: z.string().min(2),
          date: z.string().min(4),
        }),
      )
      .min(2),
    internalLinks: z.object({
      services: z.array(z.string().regex(/^\/services\/.+\/$/)).min(1),
      related: z.array(z.string().regex(/^\/blog\/.+\/$/)).min(1),
      conversion: z.string().regex(/^\/growth-audit\/$/),
    }),
    faq: z
      .array(
        z.object({
          question: z.string().min(8),
          answer: z.string().min(12),
        }),
      )
      .optional(),
    howCreated: z.string().optional(),
    ymylReviewRequired: z.boolean().optional(),
  }),
});

const caseStudies = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/case-studies",
  }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    industry: z.enum(["restaurant", "local-business", "franchise"]),
    location: z.string(),
    services: z.array(z.string()),
    metrics: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        prefix: z.string().optional(),
        suffix: z.string().optional(),
      }),
    ),
    testimonial: z
      .object({
        quote: z.string(),
        author: z.string(),
        role: z.string(),
      })
      .optional(),
    featuredImage: z.string().optional(),
    publishDate: z.coerce.date(),
    featured: z.boolean(),
  }),
});

export const collections = { blog, caseStudies };
