#!/usr/bin/env node
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const required = ["## What it does", "## When to reach for it", "## Common questions", "## It's working if", "## Where it fits"];
const requested = process.argv.slice(2);
const files = requested.length
  ? requested.map((path) => join(repo, path))
  : ["engineering", "productivity"].flatMap((bucket) =>
      readdirSync(join(repo, "docs", bucket))
        .filter((name) => name.endsWith(".md") && !name.endsWith(".zh.md"))
        .map((name) => join(repo, "docs", bucket, name)),
    );

const errors = [];
for (const file of files) {
  const text = readFileSync(file, "utf8");
  let previous = -1;
  for (const heading of required) {
    const position = text.indexOf(heading);
    if (position < 0) errors.push(`${relative(repo, file)}: missing ${heading}`);
    else if (position < previous) errors.push(`${relative(repo, file)}: ${heading} is out of order`);
    previous = Math.max(previous, position);
  }
}

if (errors.length) {
  for (const error of errors) console.error(error);
  process.exit(1);
}
console.log(`docs contract: ok (${files.length} files)`);
