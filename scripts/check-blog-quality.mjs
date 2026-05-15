import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const GATES = JSON.parse(
  await readFile(new URL("./site-gates.json", import.meta.url), "utf8"),
);
const BQ = GATES.blogQuality || {};
const BLOG_DIR = path.resolve(process.cwd(), BQ.blogDir || "src/content/blog");
const MIN_WORDS = BQ.minWords ?? 900;
const MIN_H2 = BQ.minH2 ?? 4;
const PROHIBITED_PATTERNS = (BQ.prohibitedPatterns || []).map(
  (s) => new RegExp(s, "i"),
);
const CONVERSION_LINK = BQ.conversionLink || "/growth-audit/";

function countWords(markdownBody) {
  return markdownBody
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*]\([^)]*\)/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function countH2(markdownBody) {
  return (markdownBody.match(/^##\s+/gm) || []).length;
}

function collectMarkdownLinks(markdownBody) {
  const matches = [...markdownBody.matchAll(/\[[^\]]+]\((\/[^)]+)\)/g)];
  return matches.map((match) => match[1]);
}

function hasNumericClaims(markdownBody) {
  return /\b\d+(?:\.\d+)?%|\b\d{3,}\b/.test(markdownBody);
}

async function main() {
  const entries = await readdir(BLOG_DIR, { withFileTypes: true });
  const files = entries.filter(
    (entry) => entry.isFile() && /\.(md|mdx)$/.test(entry.name),
  );
  const failures = [];

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file.name);
    const raw = await readFile(filePath, "utf8");
    const { data, content } = matter(raw);

    if (data.draft === true) continue;

    if (
      String(data.howCreated || "")
        .toLowerCase()
        .includes("ai") &&
      !/^##\s+how this was created/im.test(content)
    ) {
      failures.push(
        `${file.name}: howCreated references AI but body is missing "## How this was created" section`,
      );
    }

    if (data.ymylReviewRequired === true) {
      const src = Array.isArray(data.sources) ? data.sources : [];
      if (src.length < 3) {
        failures.push(
          `${file.name}: ymylReviewRequired needs at least 3 sources in frontmatter`,
        );
      }
    }

    const wordCount = countWords(content);
    const h2Count = countH2(content);
    const links = collectMarkdownLinks(content);

    if (wordCount < MIN_WORDS) {
      failures.push(`${file.name}: ${wordCount} words (min ${MIN_WORDS})`);
    }

    if (h2Count < MIN_H2) {
      failures.push(`${file.name}: ${h2Count} H2 sections (min ${MIN_H2})`);
    }

    for (const pattern of PROHIBITED_PATTERNS) {
      if (pattern.test(content)) {
        failures.push(
          `${file.name}: contains prohibited claim pattern ${pattern}`,
        );
      }
    }

    const services = Array.isArray(data.internalLinks?.services)
      ? data.internalLinks.services
      : [];
    const related = Array.isArray(data.internalLinks?.related)
      ? data.internalLinks.related
      : [];
    const conversion = data.internalLinks?.conversion;

    const hasServiceLink = services.some((servicePath) =>
      links.includes(servicePath),
    );
    const hasRelatedLink = related.some((relatedPath) =>
      links.includes(relatedPath),
    );
    const hasConversionLink =
      conversion === CONVERSION_LINK && links.includes(CONVERSION_LINK);

    if (!hasServiceLink) {
      failures.push(
        `${file.name}: missing at least one service internal link in content body`,
      );
    }
    if (!hasRelatedLink) {
      failures.push(
        `${file.name}: missing at least one related-post internal link in content body`,
      );
    }
    if (!hasConversionLink) {
      failures.push(
        `${file.name}: missing required conversion link ${CONVERSION_LINK}`,
      );
    }

    if (
      hasNumericClaims(content) &&
      (!Array.isArray(data.sources) || data.sources.length < 2)
    ) {
      failures.push(`${file.name}: numeric claims require at least 2 sources`);
    }
  }

  if (failures.length > 0) {
    console.error("Blog quality gate failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log("Blog quality gate passed.");
}

main().catch((error) => {
  console.error(`Blog quality gate failed: ${error.message}`);
  process.exit(1);
});
