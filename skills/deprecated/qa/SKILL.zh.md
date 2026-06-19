---
name: qa
description: Interactive QA session：用户 conversationally 报告 bugs 或 issues，agent 创建 GitHub issues。后台探索 codebase 获取 context 和 domain language。Use when user wants to report bugs, do QA, file issues conversationally, or mentions "QA session".
---

# QA Session

运行 interactive QA session。用户描述他们遇到的问题。你 clarify、探索 codebase 获取 context，并 file durable、user-focused、使用项目 domain language 的 GitHub issues。

## For each issue the user raises

### 1. Listen and lightly clarify

让用户用自己的话描述 problem。最多问 **2-3 个 short clarifying questions**，聚焦：

- 他们 expected 什么 vs actually happened 什么
- Steps to reproduce（如果不 obvious）
- 是否 consistent 或 intermittent

不要 over-interview。如果 description 已经清楚到足以 file，就继续。

### 2. Explore the codebase in the background

与用户交谈时，在后台 kick off 一个 Agent（subagent_type=Explore），理解相关 area。目标不是 find a fix，而是：

- 学习该 area 中使用的 domain language（检查 UBIQUITOUS_LANGUAGE.md）
- 理解 feature 应该做什么
- Identify user-facing behavior boundary

这个 context 帮助你写更好的 issue；但 issue 本身不应 reference specific files、line numbers 或 internal implementation details。

### 3. Assess scope: single issue or breakdown?

Filing 前判断这是 **single issue**，还是需要 **broken down** 成多个 issues。

需要 break down 的情况：

- Fix 跨多个 independent areas（例如 “the form validation is wrong AND the success message is missing AND the redirect is broken”）
- 存在 clearly separable concerns，可由不同人 parallel work
- 用户描述的东西有多个 distinct failure modes 或 symptoms

保持为 single issue 的情况：

- 一个地方的一个 behavior 错了
- Symptoms 都由同一个 root behavior 导致

### 4. File the GitHub issue(s)

用 `gh issue create` 创建 issues。不要要求用户先 review；直接 file 并 share URLs。

Issues 必须 **durable**：即使 major refactors 后也应该 still make sense。从 user's perspective 写。

#### For a single issue

使用此 template：

```text
## What happened

[Describe the actual behavior the user experienced, in plain language]

## What I expected

[Describe the expected behavior]

## Steps to reproduce

1. [Concrete, numbered steps a developer can follow]
2. [Use domain terms from the codebase, not internal module names]
3. [Include relevant inputs, flags, or configuration]

## Additional context

[Any extra observations from the user or from codebase exploration that help frame the issue — e.g. "this only happens when using the Docker layer, not the filesystem layer" — use domain language but don't cite files]
```

#### For a breakdown (multiple issues)

按 dependency order 创建 issues（blockers first），这样可以引用真实 issue numbers。

每个 sub-issue 使用此 template：

```text
## Parent issue

#<parent-issue-number> (if you created a tracking issue) or "Reported during QA session"

## What's wrong

[Describe this specific behavior problem — just this slice, not the whole report]

## What I expected

[Expected behavior for this specific slice]

## Steps to reproduce

1. [Steps specific to THIS issue]

## Blocked by

- #<issue-number> (if this issue can't be fixed until another is resolved)

Or "None — can start immediately" if no blockers.

## Additional context

[Any extra observations relevant to this slice]
```

创建 breakdown 时：

- **Prefer many thin issues over few thick ones** — 每个都应 independently fixable and verifiable
- **Mark blocking relationships honestly** — 如果 issue B 确实要等 issue A fixed 才能 test，就说清楚。如果 independent，就都标 “None — can start immediately”
- **Create issues in dependency order**，这样 “Blocked by” 中能引用真实 issue numbers
- **Maximize parallelism** — 目标是多人（或 agents）可同时 grab 不同 issues

#### Rules for all issue bodies

- **No file paths or line numbers** — 这些会 stale
- **Use the project's domain language**（如果存在，检查 UBIQUITOUS_LANGUAGE.md）
- **Describe behaviors, not code** — “the sync service fails to apply the patch”，不是 “applyPatch() throws on line 42”
- **Reproduction steps are mandatory** — 如果无法 determine，询问用户
- **Keep it concise** — developer 应能在 30 秒内读完 issue

Filing 后，print 所有 issue URLs（并 summarize blocking relationships），然后问：“Next issue, or are we done?”

### 5. Continue the session

持续进行直到用户说 done。每个 issue independent；不要 batch。
