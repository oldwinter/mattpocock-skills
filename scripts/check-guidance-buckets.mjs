#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const personal = join(repo, "skills", "personal");
const guidance = [
  "AGENTS.zh.md",
  "CLAUDE.zh.md",
  "docs/translation-profile.zh-CN.md",
  ".agents/adr/0002-ship-as-a-claude-code-plugin.md",
  ".agents/adr/0002-ship-as-a-claude-code-plugin.zh.md",
];

if (!existsSync(personal)) {
  const stale = guidance.filter((file) =>
    /\bpersonal\/?\b/.test(readFileSync(join(repo, file), "utf8")),
  );
  if (stale.length) {
    for (const file of stale) console.error(`${file}: references absent skills/personal/ bucket`);
    process.exit(1);
  }
}

console.log("guidance bucket references: ok");
