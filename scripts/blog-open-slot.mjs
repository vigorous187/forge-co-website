/**
 * Forge site: open one draft PR with a valid-schema MDX stub (draft: true).
 * Queue: automation/topic-queue.json
 */
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";
import { constants as fsConstants } from "node:fs";

const ROOT = process.cwd();
const queueFile = path.join(ROOT, "automation", "topic-queue.json");
const blogDir = path.join(ROOT, "src", "content", "blog");
const runsDir = path.join(ROOT, "automation", "blog-runs");

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

function longBody() {
  const p = (s) => s + "\n\n";
  return (
    p(
      "This draft exists so editors can replace placeholder copy with a people-first article that matches Forge positioning. ",
    ) +
    p(
      "Remove sections you do not need, add first-hand examples from client work, and tighten claims before publishing.",
    )
  );
}

async function main() {
  const raw = JSON.parse(await readFile(queueFile, "utf8"));
  const pending = Array.isArray(raw) ? raw : raw.pending || [];
  const today = new Date().toISOString().slice(0, 10);
  let picked = null;
  for (const entry of pending) {
    if (!entry?.slug) continue;
    const mdx = path.join(blogDir, `${entry.slug}.mdx`);
    if (!(await fileExists(mdx))) {
      picked = entry;
      break;
    }
  }

  if (!picked) {
    console.log("No pending topic without file — skipping.");
    return;
  }

  const branch = `automation/blog/${isoWeek()}-${picked.slug}`;
  try {
    execSync("git fetch origin", { stdio: "pipe", cwd: ROOT });
  } catch {
    /* ignore */
  }
  const remote = execSync(`git ls-remote --heads origin "${branch}"`, {
    encoding: "utf8",
    cwd: ROOT,
  }).trim();
  if (remote) {
    console.log(`Branch ${branch} already exists on origin — skipping.`);
    return;
  }
  try {
    execSync(`git checkout -b ${branch}`, { stdio: "inherit", cwd: ROOT });
  } catch {
    execSync(`git checkout ${branch}`, { stdio: "inherit", cwd: ROOT });
  }

  const title = String(picked.title).replace(/"/g, '\\"');
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

  const fm = `---
title: "${title}"
description: "${desc}"
author: "Michael Sifontes"
publishDate: ${picked.publishDate || today}
category: "strategy"
tags: ["draft", "forge", "gta"]
readTime: 8
featured: false
draft: true
canonical: "https://forge-co.ca/blog/${picked.slug}/"
primaryIntent: "informational"
targetEntity: "GTA restaurant marketing"
region: "Greater Toronto Area"
lastReviewedBy: "Michael Sifontes"
reviewedDate: ${today}
howCreated: human-outlined-queue
sources:
  - name: "Google Search Central"
    url: "https://developers.google.com/search"
    publisher: "Google"
    date: "2026"
  - name: "Google Business Profile help"
    url: "https://support.google.com/business"
    publisher: "Google"
    date: "2026"
internalLinks:
  services:
    - "/services/search-forge/"
  related:
    - "${related}"
  conversion: "/growth-audit/"
---

## Draft outline

${longBody()}

## How this was created

Topic queued in \`automation/topic-queue.json\`. Replace body with production copy; set \`draft: false\` when checks pass.

## Placeholder depth section one

${longBody()}

## Placeholder depth section two

${longBody()}

## Placeholder depth section three

${longBody()}

## Internal links to verify

See [growth audit](/growth-audit/) and [search services](/services/search-forge/). Related: [related post](${related}).
`;

  await mkdir(blogDir, { recursive: true });
  const outPath = path.join(blogDir, `${picked.slug}.mdx`);
  await writeFile(outPath, fm, "utf8");

  await mkdir(runsDir, { recursive: true });
  const logPath = path.join(runsDir, `${today}.md`);
  await writeFile(
    logPath,
    `# Blog run ${today}\n- Slot: ${picked.slug}\n- Branch: ${branch}\n`,
    { flag: "a" },
  );

  execSync(`git add "${outPath}" "${logPath}"`, {
    stdio: "inherit",
    cwd: ROOT,
  });
  execSync(`git commit -m "chore(blog): open draft slot ${picked.slug}"`, {
    stdio: "inherit",
    cwd: ROOT,
  });
  execSync(`git push -u origin ${branch}`, { stdio: "inherit", cwd: ROOT });

  try {
    execSync(
      `gh pr create --head ${branch} --title "Blog draft: ${picked.slug}" --body "Automated Forge draft. Expand content, satisfy check-blog-quality, then publish."`,
      { stdio: "inherit", cwd: ROOT, env: { ...process.env } },
    );
  } catch {
    console.log("gh pr create failed — branch pushed; open PR manually.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
