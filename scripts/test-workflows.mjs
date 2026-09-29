#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(readFileSync(join(repo, "package.json"), "utf8"));
const validate = readFileSync(join(repo, ".github", "workflows", "validate.yml"), "utf8");
const release = readFileSync(join(repo, ".github", "workflows", "release.yml"), "utf8");

assert.equal(typeof packageJson.scripts?.validate, "string");
assert.match(validate, /^\s*pull_request:/m);
assert.match(validate, /^\s*push:/m);
assert.match(validate, /npm run validate/);
assert.match(release, /npm run validate/);
assert.ok(release.indexOf("npm run validate") < release.indexOf("changesets\/action"));

console.log("workflow validation gates: ok");
