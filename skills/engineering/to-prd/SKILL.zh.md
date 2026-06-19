---
name: to-prd
description: 将当前 conversation context 转成 PRD，并发布到项目的 issue tracker。Use when user wants to create a PRD from the current context.
---

这个 skill 会结合当前 conversation context 和 codebase understanding 产出 PRD。不要 interview 用户；只 synthesise 你已经知道的内容。

Issue tracker 和 triage label vocabulary 应该已经提供给你；如果没有，运行 `/setup-matt-pocock-skills`。

## Process

1. 如果还没做过，探索 repo，理解 codebase 当前状态。在整个 PRD 中使用项目的 domain glossary vocabulary，并尊重你触碰区域的 ADRs。

2. Sketch 出你准备用来测试 feature 的 seams。优先使用 existing seams，而不是新增 seam。使用尽可能高的 seam。如果需要新 seams，在你能做到的最高点提出。

向用户确认这些 seams 是否符合他们预期。

3. 使用下面的 template 写 PRD，然后发布到项目 issue tracker。应用 `ready-for-agent` triage label；不需要额外 triage。

<prd-template>

## Problem Statement

用户正在面对的问题，从用户视角描述。

## Solution

问题的解决方案，从用户视角描述。

## User Stories

一个很长的 numbered list，列出 user stories。每条 user story 使用以下格式：

1. As an <actor>, I want a <feature>, so that <benefit>

<user-story-example>
1. As a mobile bank customer, I want to see balance on my accounts, so that I can make better informed decisions about my spending
</user-story-example>

这组 user stories 应该极其 extensive，覆盖 feature 的所有方面。

## Implementation Decisions

列出已经做出的 implementation decisions。可以包括：

- 将被构建/修改的 modules
- 将被修改的 module interfaces
- 来自 developer 的 technical clarifications
- Architectural decisions
- Schema changes
- API contracts
- Specific interactions

不要包含 specific file paths 或 code snippets。它们可能很快过时。

Exception：如果 prototype 产出的 snippet 能比 prose 更精确地编码一个 decision（state machine、reducer、schema、type shape），可以 inline 到相关 decision 中，并简短注明它来自 prototype。只保留 decision-rich parts；不是 working demo，只是重要部分。

## Testing Decisions

列出已经做出的 testing decisions。包括：

- 好 test 的描述（只测试 external behavior，不测试 implementation details）
- 将被测试的 modules
- Tests 的 prior art（也就是 codebase 中类似类型的 tests）

## Out of Scope

描述此 PRD 范围外的内容。

## Further Notes

关于 feature 的其他 notes。

</prd-template>
