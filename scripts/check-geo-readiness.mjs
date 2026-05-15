import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const GATES = JSON.parse(
  await readFile(new URL("./site-gates.json", import.meta.url), "utf8"),
);
const GEO = GATES.geo || {};
const BLOG_DIR = path.resolve(process.cwd(), GEO.blogDir || "src/content/blog");
const CASE_STUDY_DIR = path.resolve(
  process.cwd(),
  GEO.caseStudyDir || "src/content/case-studies",
);
const BLOG_TEMPLATE = path.resolve(
  process.cwd(),
  GEO.blogTemplate || "src/pages/blog/[...slug].astro",
);
const CASE_TEMPLATE = path.resolve(
  process.cwd(),
  GEO.caseTemplate || "src/pages/case-studies/[...slug].astro",
);

const MIN_ANSWER_FIRST_WORDS = 5;

function wordCount(text = "") {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function hasScannableFormats(markdownBody) {
  const hasBullets = /^\s*[-*]\s+/m.test(markdownBody);
  const hasNumbered = /^\s*\d+\.\s+/m.test(markdownBody);
  const hasTable = /^\|.+\|$/m.test(markdownBody);
  return hasBullets || hasNumbered || hasTable;
}

function hasExternalLink(markdownBody) {
  return /\[[^\]]+]\(https?:\/\/[^)]+\)/i.test(markdownBody);
}

function validateAnswerFirstSections(fileName, markdownBody, failures) {
  const h2Blocks = markdownBody
    .split(/\n(?=##\s+)/g)
    .filter((block) => block.startsWith("## "));
  if (h2Blocks.length === 0) {
    failures.push(
      `${fileName}: missing H2 sections for answer-first structure`,
    );
    return;
  }

  for (const block of h2Blocks) {
    const lines = block.split("\n");
    const heading = lines[0].replace(/^##\s+/, "").trim();
    const remainder = lines.slice(1).join("\n").trim();
    const firstParagraph = remainder.split(/\n\s*\n/)[0]?.trim() ?? "";
    const count = wordCount(firstParagraph);
    if (count < MIN_ANSWER_FIRST_WORDS) {
      failures.push(
        `${fileName}: H2 "${heading}" lacks answer-first intro (${count} words, min ${MIN_ANSWER_FIRST_WORDS})`,
      );
    }
  }
}

async function validateBlogGeoReadiness(failures) {
  const entries = await readdir(BLOG_DIR, { withFileTypes: true });
  const files = entries.filter(
    (entry) => entry.isFile() && /\.mdx?$/.test(entry.name),
  );

  for (const file of files) {
    const fullPath = path.join(BLOG_DIR, file.name);
    const raw = await readFile(fullPath, "utf8");
    const { data, content } = matter(raw);
    if (data.draft === true) continue;

    if (!data.reviewedDate && !data.updatedDate) {
      failures.push(
        `${file.name}: missing reviewedDate or updatedDate metadata`,
      );
    }
    if (!Array.isArray(data.sources) || data.sources.length < 2) {
      failures.push(`${file.name}: requires at least 2 sources in frontmatter`);
    }
    if (!hasScannableFormats(content)) {
      failures.push(`${file.name}: requires at least one list or table`);
    }
    if (
      !hasExternalLink(content) &&
      (!Array.isArray(data.sources) || data.sources.length === 0)
    ) {
      failures.push(
        `${file.name}: requires at least one external citation link or source entry`,
      );
    }
    validateAnswerFirstSections(file.name, content, failures);
  }
}

async function validateCaseStudyGeoReadiness(failures) {
  const entries = await readdir(CASE_STUDY_DIR, { withFileTypes: true });
  const files = entries.filter(
    (entry) => entry.isFile() && /\.mdx?$/.test(entry.name),
  );

  for (const file of files) {
    const fullPath = path.join(CASE_STUDY_DIR, file.name);
    const raw = await readFile(fullPath, "utf8");
    const { data, content } = matter(raw);

    if (!data.publishDate) {
      failures.push(`${file.name}: missing publishDate metadata`);
    }
    if (!hasScannableFormats(content)) {
      failures.push(`${file.name}: requires at least one list or table`);
    }
    validateAnswerFirstSections(file.name, content, failures);
  }
}

async function validateTemplates(failures) {
  const [blogTemplateRaw, caseTemplateRaw] = await Promise.all([
    readFile(BLOG_TEMPLATE, "utf8"),
    readFile(CASE_TEMPLATE, "utf8"),
  ]);

  if (!blogTemplateRaw.includes("'@type': 'Article'")) {
    failures.push("Blog template missing Article schema type");
  }
  if (!blogTemplateRaw.includes("'@type': 'FAQPage'")) {
    failures.push("Blog template missing FAQPage schema support");
  }
  if (!blogTemplateRaw.includes("'@type': 'Person'")) {
    failures.push("Blog template missing Person author schema");
  }
  if (!caseTemplateRaw.includes("'@type': 'Article'")) {
    failures.push("Case study template missing Article schema type");
  }
}

async function main() {
  const failures = [];

  await validateBlogGeoReadiness(failures);
  await validateCaseStudyGeoReadiness(failures);
  await validateTemplates(failures);

  if (failures.length > 0) {
    console.error("GEO readiness check failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log("GEO readiness check passed.");
}

main().catch((error) => {
  console.error(`GEO readiness check failed: ${error.message}`);
  process.exit(1);
});
