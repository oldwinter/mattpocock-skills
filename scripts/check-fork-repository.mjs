#!/usr/bin/env node
// npm / plugin metadata must name this fork, not the upstream mattpocock/skills repo.

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const FORK = "https://github.com/oldwinter/mattpocock-skills";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(readFileSync(join(repo, "package.json"), "utf8"));
const plugin = JSON.parse(
  readFileSync(join(repo, ".claude-plugin", "plugin.json"), "utf8"),
);
const changesets = JSON.parse(
  readFileSync(join(repo, ".changeset", "config.json"), "utf8"),
);

const packageUrl = packageJson.repository?.url;
const pluginUrl = plugin.repository;
const changesetRepo = changesets.changelog?.[1]?.repo;
const errors = [];

if (packageUrl !== FORK) {
  errors.push(`package.json repository.url is ${packageUrl}, expected ${FORK}`);
}
if (pluginUrl !== FORK) {
  errors.push(`plugin.json repository is ${pluginUrl}, expected ${FORK}`);
}
if (changesetRepo !== "oldwinter/mattpocock-skills") {
  errors.push(
    `changeset changelog repo is ${changesetRepo}, expected oldwinter/mattpocock-skills`,
  );
}
if (typeof packageUrl === "string" && packageUrl.includes("mattpocock/skills")) {
  errors.push("package.json repository.url still points at upstream mattpocock/skills");
}
if (typeof pluginUrl === "string" && pluginUrl.includes("mattpocock/skills")) {
  errors.push("plugin.json repository still points at upstream mattpocock/skills");
}
if (changesetRepo === "mattpocock/skills") {
  errors.push("changeset changelog still points at upstream mattpocock/skills");
}

if (errors.length) {
  for (const line of errors) console.error(line);
  process.exit(1);
}

console.log(`fork repository is ${FORK}`);
