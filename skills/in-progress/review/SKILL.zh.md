---
name: review
description: Review 自 fixed point（commit、branch、tag 或 merge-base）以来的 changes，沿两条 axes：Standards（code 是否遵守此 repo documented coding standards？）和 Spec（code 是否符合 originating issue/PRD 要求？）。Runs both reviews in parallel sub-agents and reports them side by side. Use when the user wants to review a branch, a PR, work-in-progress changes, or asks to "review since X".
---

# Review

对用户提供的 fixed point 与 `HEAD` 之间 diff 做 two-axis review：

- **Standards** — code 是否 conform to 此 repo 的 documented coding standards？
- **Spec** — code 是否 faithfully implement originating issue / PRD / spec？

两条 axes 作为 **parallel sub-agents** 运行，避免彼此污染 context，然后此 skill aggregate findings。

Issue tracker 应该已经提供；如果缺少 `docs/agents/issue-tracker.md`，运行 `/setup-matt-pocock-skills`。

## Process

### 1. Pin the fixed point

用户说的任何东西都是 fixed point：commit SHA、branch name、tag、`main`、`HEAD~5` 等。如果他们没指定，就询问 fixed point。

Capture diff command once：`git diff <fixed-point>...HEAD`（three-dot，所以 comparison against merge-base）。也用 `git log <fixed-point>..HEAD --oneline` note commits list。

继续前，确认 fixed point 能 resolve（`git rev-parse <fixed-point>`），并且 diff non-empty。Bad ref 或 empty diff 应在这里 fail，而不是在两个 parallel sub-agents 中 fail。

### 2. Identify the spec source

按顺序寻找 originating spec：

1. Commit messages 中的 issue references（`#123`、`Closes #45`、GitLab `!67` 等）— 通过 `docs/agents/issue-tracker.md` 中 workflow fetch。
2. 用户作为 argument 传入的 path。
3. `docs/`、`specs/` 或 `.scratch/` 下，与 branch name 或 feature 匹配的 PRD/spec file。
4. 如果什么都找不到，询问用户 spec 在哪里。如果他们说没有，**Spec** sub-agent 会 skip 并报告 “no spec available”。

### 3. Identify the standards sources

Repo 中任何记录 code 应如何写的内容，例如 `CODING_STANDARDS.md` 或 `CONTRIBUTING.md`。

### 4. Spawn both sub-agents in parallel

发送一条 message，包含两个 `Agent` tool calls。两者都使用 `general-purpose` subagent。

**Standards sub-agent prompt** — include：

- Full diff command 和 commit list。
- Step 3 找到的 standards-source files list。
- Brief: “Report — per file/hunk where relevant — every place the diff violates a documented standard. Cite the standard (file + the rule). Distinguish hard violations from judgement calls. Skip anything tooling enforces. Under 400 words.”

**Spec sub-agent prompt** — include：

- Diff command 和 commit list。
- Spec 的 path 或 fetched contents。
- Brief: “Report: (a) requirements the spec asked for that are missing or partial; (b) behaviour in the diff that wasn't asked for (scope creep); (c) requirements that look implemented but where the implementation looks wrong. Quote the spec line for each finding. Under 400 words.”

如果 spec missing，skip Spec sub-agent，并在 final report 中 note。

### 5. Aggregate

在 `## Standards` 和 `## Spec` headings 下展示两个 reports，verbatim 或 lightly cleaned。不要 merge 或 rerank findings；两条 axes 故意分开（见 _Why two axes_）。

用一行 summary 结尾：每条 axis 的 total findings，以及每条 axis 内 worst issue（如果有）。不要跨 axes 选单一 winner；这正是 separation 要避免的 reranking。

## Why two axes

一个 change 可以 pass 一条 axis 但 fail 另一条：

- Code 遵守每条 standard，但实现了错误的东西 → **Standards pass, Spec fail.**
- Code 完全符合 issue 要求，但破坏项目 conventions → **Spec pass, Standards fail.**

Separate reporting 防止一条 axis mask 另一条。
