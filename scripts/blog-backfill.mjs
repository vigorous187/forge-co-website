/**
 * Backfill missed weekly blog automation slots.
 * Reads automation/topic-queue.json "backfill" array and opens one PR per week.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();
const queueFile = path.join(ROOT, "automation", "topic-queue.json");

async function main() {
  const raw = JSON.parse(await readFile(queueFile, "utf8"));
  const slots = raw.backfill || [];
  if (slots.length === 0) {
    console.log("No backfill slots configured.");
    return;
  }

  for (const slot of slots) {
    console.log(`\n=== Backfill ${slot.week} — ${slot.slug} ===`);
    const env = {
      ...process.env,
      BLOG_TOPIC_SLUG: slot.slug,
      BLOG_ISO_WEEK: slot.week,
      BLOG_AUTO_GENERATE: slot.useLocal ? "0" : "1",
      BLOG_USE_LOCAL: slot.useLocal ? "1" : "0",
      BLOG_FORCE_REGENERATE: slot.useLocal ? "0" : "1",
    };
    const r = spawnSync("node", ["scripts/blog-open-slot.mjs"], {
      cwd: ROOT,
      stdio: "inherit",
      env,
    });
    if (r.status !== 0) {
      throw new Error(`Backfill failed for ${slot.slug} (${slot.week})`);
    }
  }

  console.log("\nBackfill complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
