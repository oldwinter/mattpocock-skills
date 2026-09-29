#!/usr/bin/env node
import assert from "node:assert/strict";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const root = mkdtempSync(join(tmpdir(), "sync-plugin-version-"));
process.on("exit", () => rmSync(root, { recursive: true, force: true }));

function fixture(name, packageJson) {
  const dir = join(root, name);
  mkdirSync(join(dir, "scripts"), { recursive: true });
  mkdirSync(join(dir, ".claude-plugin"), { recursive: true });
  copyFileSync(join(repo, "scripts", "sync-plugin-version.mjs"), join(dir, "scripts", "sync-plugin-version.mjs"));
  writeFileSync(join(dir, "package.json"), `${JSON.stringify(packageJson, null, 2)}\n`);
  writeFileSync(join(dir, ".claude-plugin", "plugin.json"), '{\n  "name": "fixture",\n  "version": "1.0.0"\n}\n');
  return dir;
}

const valid = fixture("valid", { version: "2.3.4" });
const validRun = spawnSync(process.execPath, [join(valid, "scripts", "sync-plugin-version.mjs")], { encoding: "utf8" });
assert.equal(validRun.status, 0, validRun.stderr);
assert.equal(JSON.parse(readFileSync(join(valid, ".claude-plugin", "plugin.json"), "utf8")).version, "2.3.4");

for (const [name, packageJson] of [["missing", {}], ["number", { version: 123 }], ["invalid", { version: "banana" }]]) {
  const dir = fixture(name, packageJson);
  const pluginPath = join(dir, ".claude-plugin", "plugin.json");
  const before = readFileSync(pluginPath, "utf8");
  const run = spawnSync(process.execPath, [join(dir, "scripts", "sync-plugin-version.mjs")], { encoding: "utf8" });
  assert.notEqual(run.status, 0, `${name} version unexpectedly succeeded`);
  assert.match(run.stderr, /valid semantic version/);
  assert.equal(readFileSync(pluginPath, "utf8"), before, `${name} version changed plugin.json`);
}

console.log("sync-plugin-version input validation: ok");
