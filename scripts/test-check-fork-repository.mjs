#!/usr/bin/env node
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const FORK = "https://github.com/oldwinter/mattpocock-skills";

const packageJson = JSON.parse(readFileSync(join(repo, "package.json"), "utf8"));
const plugin = JSON.parse(
  readFileSync(join(repo, ".claude-plugin", "plugin.json"), "utf8"),
);

assert.equal(packageJson.repository.url, FORK);
assert.equal(plugin.repository, FORK);
assert.equal(plugin.author.name, "Matt Pocock");
assert.doesNotMatch(packageJson.repository.url, /mattpocock\/skills/);
assert.doesNotMatch(plugin.repository, /mattpocock\/skills/);

const check = spawnSync(process.execPath, [join(repo, "scripts", "check-fork-repository.mjs")], {
  encoding: "utf8",
});
assert.equal(check.status, 0, check.stderr);
assert.match(check.stdout, /oldwinter\/mattpocock-skills/);

console.log("check-fork-repository: ok");
