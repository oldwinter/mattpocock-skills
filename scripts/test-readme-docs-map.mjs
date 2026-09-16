#!/usr/bin/env node
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const plugin = JSON.parse(
  readFileSync(join(repo, ".claude-plugin", "plugin.json"), "utf8"),
);

const promoted = plugin.skills.map((raw) => {
  const parts = raw.replace(/^\.\//, "").split("/");
  assert.equal(parts[0], "skills");
  assert.equal(parts.length, 3, raw);
  return { bucket: parts[1], name: parts[2] };
});

assert.equal(promoted.length, 25);

for (const { bucket, name } of promoted) {
  assert.ok(
    existsSync(join(repo, "skills", bucket, name, "SKILL.md")),
    `missing runtime ${bucket}/${name}`,
  );
  assert.ok(
    existsSync(join(repo, "docs", bucket, `${name}.md`)),
    `missing docs ${bucket}/${name}`,
  );
}

const grillDocs = readFileSync(
  join(repo, "docs", "engineering", "grill-with-docs.md"),
  "utf8",
);
assert.match(grillDocs, /## When to reach for it/);

for (const file of ["README.md", "README.zh.md"]) {
  const text = readFileSync(join(repo, file), "utf8");
  const marker = file === "README.md" ? "## Three file layers" : "## 三层文件";
  assert.match(text, new RegExp(marker));
  assert.match(text, /\| Runtime \|/);
  assert.match(text, /\| Sidecar \|/);
  assert.match(text, /\| Human docs \|/);
  assert.match(text, /docs\/engineering\/grill-with-docs\.md/);

  const refIndex = text.indexOf("\n## Reference\n");
  assert.notEqual(refIndex, -1, `${file} has no Reference`);
  const reference = text.slice(refIndex);
  assert.doesNotMatch(reference, /SKILL\.zh\.md/);

  for (const { bucket, name } of promoted) {
    const runtime = `./skills/${bucket}/${name}/SKILL.md`;
    const docs = `./docs/${bucket}/${name}.md`;
    assert.match(
      reference,
      new RegExp(runtime.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      `${file} Reference missing runtime ${name}`,
    );
    assert.match(
      reference,
      new RegExp(docs.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      `${file} Reference missing docs ${name}`,
    );
  }
}

for (const file of ["AGENTS.zh.md", "CLAUDE.zh.md"]) {
  const text = readFileSync(join(repo, file), "utf8");
  assert.match(text, /\.\/skills\/engineering\/ask-matt\/SKILL\.md/);
  assert.doesNotMatch(text, /\.\/skills\/engineering\/ask-matt\/SKILL\.zh\.md/);
}

const agents = readFileSync(join(repo, "AGENTS.md"), "utf8");
assert.match(agents, /docs\/<bucket>\/<skill-name>\.md/);

console.log(`readme-docs-map: ok (${promoted.length} promoted skills)`);
