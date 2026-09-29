#!/usr/bin/env node
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const directory = join(repo, ".changeset");
const invalid = readdirSync(directory)
  .filter((name) => name.endsWith(".md") && name !== "README.md")
  .filter((name) => !readFileSync(join(directory, name), "utf8").startsWith("---\n"));

if (invalid.length) {
  for (const name of invalid) console.error(`.changeset/${name}: missing changeset frontmatter`);
  process.exit(1);
}

console.log("changeset files: ok");
