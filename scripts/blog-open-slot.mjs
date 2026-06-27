/**
 * FORGE_PIPELINE_VERSION=2
 * Opens a PR with one new post from automation/topic-queue.json.
 * When BLOG_AUTO_GENERATE=1 (default in CI), drafts full body via Anthropic.
 */
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import { execSync, spawnSync } from "node:child_process";
import { constants as fsConstants } from "node:fs";
import { generateBlogBody } from "./blog-generate-body.mjs";

const ROOT = process.cwd();
const queueFile = path.join(ROOT, "automation", "topic-queue.json");
const blogDir = path.join(ROOT, "src", "content", "blog");
const runsDir = path.join(ROOT, "automation", "blog-runs");

const autoGenerate = process.env.BLOG_AUTO_GENERATE !== "0";
const forceRegenerate =
  process.env.BLOG_FORCE_REGENERATE === "1" ||
  process.argv.includes("--regenerate");
const useLocal = process.env.BLOG_USE_LOCAL === "1";
const topicSlug = process.env.BLOG_TOPIC_SLUG || "";
const isoWeekOverride = process.env.BLOG_ISO_WEEK || "";

const PR_BODY_GENERATED = [
  "Automated blog post (AI-drafted, build gates passed).",
  "",
  "**Before merge:** skim for accuracy, then merge and deploy.",
].join("\n");

const PR_BODY_MANUAL = [
  "Automated blog slot (editorial draft, build gates passed).",
  "",
  "**Before merge:** skim for accuracy, then merge and deploy.",
].join("\n");

async function fileExists(p) {
  try {
    await access(p, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function isoWeek(d = new Date()) {
  const t = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
  );
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const y = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((t - y) / 86400000 + 1) / 7);
  return `${t.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

function yamlQuote(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function runBuild() {
  const r = spawnSync("npm", ["run", "build"], {
    cwd: ROOT,
    stdio: "inherit",
    env: process.env,
  });
  if (r.status !== 0) {
    throw new Error("npm run build failed after generating post");
  }
}

function ensurePullRequest(branch, slug, generated) {
  const body = generated ? PR_BODY_GENERATED : PR_BODY_MANUAL;
  const title = generated ? `Blog: ${slug}` : `Blog: ${slug}`;
  try {
    execSync(
      `gh pr create --head ${branch} --title ${JSON.stringify(title)} --body ${JSON.stringify(body)}`,
      { stdio: "inherit", cwd: ROOT, env: { ...process.env } },
    );
  } catch {
    console.log(
      `gh pr create failed for ${branch} — open PR manually in GitHub.`,
    );
  }
}

async function isPlaceholderPost(filePath) {
  if (!(await fileExists(filePath))) return true;
  const raw = await readFile(filePath, "utf8");
  return (
    /howCreated:\s*["']human-outlined-queue["']/i.test(raw) ||
    /Replace this outline with people-first content/i.test(raw) ||
    /Placeholder depth section/i.test(raw)
  );
}

async function loadSiteConfig() {
  try {
    return JSON.parse(
      await readFile(path.join(ROOT, "automation", "site.json"), "utf8"),
    );
  } catch {
    return {};
  }
}

function defaultSources() {
  return `sources:
  - name: "Google Search Central"
    url: "https://developers.google.com/search"
    publisher: "Google"
    date: "2026"
  - name: "Google Business Profile help"
    url: "https://support.google.com/business"
    publisher: "Google"
    date: "2026"`;
}

function buildForgeFrontmatter(picked, { generated, slotOpened }) {
  const howCreated = generated
    ? "automation-llm-ai"
    : picked.howCreated || "human-outlined-queue";
  const desc = String(
    picked.description ||
      picked.metaDescription ||
      "Draft topic for Forge editorial review.",
  )
    .slice(0, 160)
    .replace(/"/g, '\\"');
  const related = String(
    picked.relatedBlog || "/blog/google-business-profile-gta-restaurants/",
  );
  const tags = JSON.stringify(picked.tags || ["forge", "gta"]);
  const category = picked.category || "strategy";
  const author = picked.author || "Michael Sifontes";
  const publishDate = picked.publishDate || slotOpened;

  return `---
title: "${yamlQuote(picked.title)}"
description: "${desc}"
author: "${yamlQuote(author)}"
publishDate: ${publishDate}
category: "${category}"
tags: ${tags}
readTime: ${picked.readTime || 8}
featured: false
draft: false
canonical: "https://forge-co.ca/blog/${picked.slug}/"
primaryIntent: "${picked.primaryIntent || "informational"}"
targetEntity: "${yamlQuote(picked.targetEntity || picked.title)}"
region: "${yamlQuote(picked.region || "Greater Toronto Area")}"
lastReviewedBy: "${yamlQuote(author)}"
reviewedDate: ${slotOpened}
howCreated: ${howCreated}
${defaultSources()}
internalLinks:
  services:
    - "${picked.serviceLink || "/services/search-forge/"}"
  related:
    - "${related}"
  conversion: "/growth-audit/"
---

`;
}

async function writePost(picked, outPath, slotOpened) {
  if (useLocal && (await fileExists(outPath))) {
    console.log(`[blog-open-slot] Using local file for ${picked.slug}`);
    runBuild();
    return false;
  }

  let body;
  let generated = false;

  if (autoGenerate) {
    console.log(`[blog-open-slot] Generating body for ${picked.slug}…`);
    body = await generateBlogBody(picked);
    generated = true;
  } else {
    body = `## Draft outline

Replace this outline with people-first content before publishing.

## How this was created

Topic queued in \`automation/topic-queue.json\`. Body is a starter outline for human editing.
`;
  }

  const fm = buildForgeFrontmatter(picked, { generated, slotOpened });
  await mkdir(blogDir, { recursive: true });
  await writeFile(outPath, fm + body, "utf8");

  console.log("[blog-open-slot] Running npm run build…");
  runBuild();
  return generated;
}

async function pickTopic(pending) {
  if (topicSlug) {
    const found = pending.find((entry) => entry.slug === topicSlug);
    if (!found) throw new Error(`Topic slug not found in queue: ${topicSlug}`);
    return found;
  }

  for (const entry of pending) {
    if (!entry?.slug) continue;
    const md = path.join(blogDir, `${entry.slug}.md`);
    const mdx = path.join(blogDir, `${entry.slug}.mdx`);
    if (!(await fileExists(md)) && !(await fileExists(mdx))) {
      return entry;
    }
  }
  return null;
}

async function main() {
  const raw = JSON.parse(await readFile(queueFile, "utf8"));
  const pending = Array.isArray(raw)
    ? raw
    : [...(raw.backfill || []), ...(raw.pending || [])];
  const today = new Date().toISOString().slice(0, 10);
  const picked = await pickTopic(pending);

  if (!picked) {
    console.log("No pending topic without file — skipping.");
    return;
  }

  await loadSiteConfig();
  const week = isoWeekOverride || picked.week || isoWeek();
  const branch = `automation/blog/${week}-${picked.slug}`;
  const outPath = path.join(blogDir, `${picked.slug}.mdx`);

  try {
    execSync("git fetch origin", { stdio: "pipe", cwd: ROOT });
  } catch {
    /* ignore */
  }

  execSync("git checkout main", { stdio: "inherit", cwd: ROOT });
  try {
    execSync("git pull --ff-only origin main", { stdio: "inherit", cwd: ROOT });
  } catch {
    /* ignore */
  }

  const remote = execSync(`git ls-remote --heads origin "${branch}"`, {
    encoding: "utf8",
    cwd: ROOT,
  }).trim();

  if (remote) {
    execSync(`git checkout ${branch}`, { stdio: "inherit", cwd: ROOT });
    const placeholder = await isPlaceholderPost(outPath);
    if (!forceRegenerate && !placeholder && !useLocal) {
      const openPrs = execSync(
        `gh pr list --head ${branch} --state open --json number --jq 'length'`,
        { encoding: "utf8", cwd: ROOT, env: { ...process.env } },
      ).trim();
      if (openPrs === "0") {
        console.log(`Branch ${branch} exists without open PR — opening PR.`);
        ensurePullRequest(branch, picked.slug, !placeholder);
      } else {
        console.log(`Branch ${branch} already has open PR — nothing to do.`);
      }
      return;
    }
    if (forceRegenerate || placeholder) {
      console.log(
        `[blog-open-slot] Regenerating ${picked.slug} on existing branch…`,
      );
    }
  } else {
    execSync(`git checkout -b ${branch}`, { stdio: "inherit", cwd: ROOT });
  }

  if (useLocal && !(await fileExists(outPath))) {
    throw new Error(
      `BLOG_USE_LOCAL=1 but local file missing: ${outPath}. Restore prewritten copy first.`,
    );
  }

  const generated = await writePost(picked, outPath, today);

  await mkdir(runsDir, { recursive: true });
  const logPath = path.join(runsDir, `${today}-${picked.slug}.md`);
  await writeFile(
    logPath,
    `# Blog run ${today} — ${picked.slug}\n- Slot: ${picked.slug}\n- Branch: ${branch}\n- Week: ${week}\n- Status: ${generated ? "AI-generated, build passed" : useLocal ? "local draft, build passed" : "draft outline"}\n`,
    "utf8",
  );

  execSync(`git add "${outPath}" "${logPath}"`, {
    stdio: "inherit",
    cwd: ROOT,
  });
  const msg = generated
    ? `chore(blog): generate post ${picked.slug}`
    : `chore(blog): backfill post ${picked.slug}`;
  execSync(`git commit -m ${JSON.stringify(msg)}`, {
    stdio: "inherit",
    cwd: ROOT,
  });
  execSync(`git push -u origin ${branch}`, { stdio: "inherit", cwd: ROOT });

  const openPrs = execSync(
    `gh pr list --head ${branch} --state open --json number --jq 'length'`,
    { encoding: "utf8", cwd: ROOT, env: { ...process.env } },
  ).trim();
  if (openPrs === "0") {
    ensurePullRequest(branch, picked.slug, generated);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
