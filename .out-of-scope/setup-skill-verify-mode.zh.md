# Verify/Check Mode for `setup-matt-pocock-skills`

此项目不会为 `setup-matt-pocock-skills` 添加 dedicated verify/check mode（或 separate verify skill）。

## Why this is out of scope

用于检查 `docs/agents/*.md` artifacts 是否仍匹配 seed-template schema 的第二个 skill，或 `--verify` flag，会 duplicate existing setup skill 已经能在 conversation 中处理的工作。

Intended workflow 是：**运行 `/setup-matt-pocock-skills`，并告诉它 verify your current setup。** 这个 skill 是 prompt-driven，因此 maintainer 可以把它 scope 到 verification pass（“don't rewrite anything, just check my existing files against the current seed templates and report drift”），而不需要 separate code path。添加 flag 或 sibling skill 会 split 一个已经能通过 natural-language entry point 表达的 feature surface area。

将 configuration management 保持在单个 skill 中，也能避免 seed templates evolve 时两个 skills 相互 drift 的 maintenance cost。

## Prior requests

- #106 — Feature request: verify/check mode for setup-matt-pocock-skills
