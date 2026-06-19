---
name: to-issues
description: 使用 tracer-bullet vertical slices，将 plan、spec 或 PRD 拆成可独立领取的 issues，并发布到项目 issue tracker。Use when user wants to convert a plan into issues, create implementation tickets, or break down work into issues.
---

# To Issues

使用 vertical slices（tracer bullets）将 plan 拆成可独立领取的 issues。

Issue tracker 和 triage label vocabulary 应该已经提供给你；如果没有，运行 `/setup-matt-pocock-skills`。

## Process

### 1. Gather context

从 conversation context 中已有内容开始。如果用户将 issue reference（issue number、URL 或 path）作为 argument 传入，就从 issue tracker fetch 它，并读取完整 body 和 comments。

### 2. Explore the codebase (optional)

如果还没有探索 codebase，就探索它以理解当前 code 状态。Issue titles 和 descriptions 应使用项目的 domain glossary vocabulary，并尊重你触碰区域的 ADRs。

### 3. Draft vertical slices

将 plan 拆成 **tracer bullet** issues。每个 issue 都是一个 thin vertical slice，端到端穿过 ALL integration layers，而不是某一层的 horizontal slice。

Slices 可以是 `HITL` 或 `AFK`。HITL slices 需要 human interaction，例如 architectural decision 或 design review。AFK slices 可以在没有 human interaction 的情况下实现并 merge。尽可能偏向 AFK，而不是 HITL。

<vertical-slice-rules>
- 每个 slice 都交付一条 narrow but COMPLETE path，穿过每一层（schema、API、UI、tests）
- 一个 completed slice 可以独立 demo 或 verify
- 偏好多而薄的 slices，而不是少而厚的 slices
</vertical-slice-rules>

### 4. Quiz the user

用 numbered list 展示 proposed breakdown。每个 slice 展示：

- **Title**：简短 descriptive name
- **Type**：HITL / AFK
- **Blocked by**：哪些其他 slices（如果有）必须先完成
- **User stories covered**：这处理了哪些 user stories（如果 source material 中有）

询问用户：

- Granularity 是否合适？（too coarse / too fine）
- Dependency relationships 是否正确？
- 是否应该 merge 或进一步 split 某些 slices？
- 哪些 slices 标成 HITL/AFK 是否正确？

持续 iterate，直到用户 approve breakdown。

### 5. Publish the issues to the issue tracker

对每个 approved slice，在 issue tracker 中发布一个新 issue。使用下面的 issue body template。这些 issues 被视为 ready for AFK agents，所以除非另有说明，发布时应用正确 triage label。

按 dependency order 发布 issues（blockers first），这样你可以在 “Blocked by” field 中引用真实 issue identifiers。

<issue-template>
## Parent

对 issue tracker 上 parent issue 的引用（如果 source 是 existing issue，否则省略此 section）。

## What to build

这个 vertical slice 的简洁描述。描述 end-to-end behavior，而不是逐层 implementation。

避免 specific file paths 或 code snippets；它们很快会过时。Exception：如果 prototype 产出的 snippet 能比 prose 更精确地编码一个 decision（state machine、reducer、schema、type shape），可以 inline 到这里，并简短注明它来自 prototype。只保留 decision-rich parts；不是 working demo，只是重要部分。

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Blocked by

- 对 blocking ticket 的引用（如果有）

如果没有 blockers，则写 “None - can start immediately”。

</issue-template>

不要 close 或 modify 任何 parent issue。
