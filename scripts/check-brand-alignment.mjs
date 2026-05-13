import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "src");
const SCAN_DIRS = ["pages", "components", "layouts"];
const FORBIDDEN = [/\bwe only work with restaurants\b/i, /\$\d[\d,]*/i];

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(fullPath)));
      continue;
    }
    if (
      entry.name.endsWith(".astro") ||
      entry.name.endsWith(".mdx") ||
      entry.name.endsWith(".md")
    ) {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  const violations = [];
  for (const dir of SCAN_DIRS) {
    const target = path.join(ROOT, dir);
    const files = await listFiles(target);
    for (const file of files) {
      const rel = path.relative(process.cwd(), file);
      const content = await readFile(file, "utf8");
      for (const pattern of FORBIDDEN) {
        if (pattern.test(content)) {
          violations.push(`${rel}: matches ${pattern}`);
        }
      }
    }
  }

  if (violations.length > 0) {
    console.error("Forge brand alignment check failed:");
    for (const violation of violations) {
      console.error(`- ${violation}`);
    }
    process.exit(1);
  }

  console.log("Forge brand alignment check passed.");
}

main().catch((error) => {
  console.error("Failed to run Forge brand alignment check:", error);
  process.exit(1);
});
