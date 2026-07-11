---
name: request-refactor-plan
description: 通过 user interview 创建包含 tiny commits 的 detailed refactor plan，然后将其 filed as GitHub issue。Use when user wants to plan a refactor, create a refactoring RFC, or break a refactor into safe incremental steps.
---

当用户想创建 refactor request 时 invoke 此 skill。按以下 steps 进行。若你认为某些 steps 不必要，可以 skip。

1. 要求用户详细描述他们想解决的问题，以及任何 potential solution ideas。

2. Explore repo，verify 用户 assertions，并理解 codebase 当前状态。

3. 询问他们是否考虑过其他 options，并向他们 present other options。

4. Interview 用户关于 implementation 的细节。要 extremely detailed and thorough。

5. Hammer out exact scope of implementation。明确计划改变什么、不改变什么。

6. 查看 codebase，检查这片 codebase 是否有 test coverage。如果 insufficient test coverage，询问用户 testing plans。

7. 将 implementation 拆成 tiny commits 的 plan。记住 Martin Fowler 的建议：“make each refactoring step as small as possible, so that you can always see the program working.”

8. 使用 refactor plan 创建 GitHub issue。Issue description 使用下面 template：

<refactor-plan-template>

## Problem Statement

Developer 面临的问题，从 developer perspective 描述。

## Solution

问题的 solution，从 developer perspective 描述。

## Commits

一个 LONG、detailed implementation plan。用 plain English 写 plan，将 implementation 拆成尽可能 tiny 的 commits。每个 commit 都应让 codebase 保持 working state。

## Decision Document

列出已经做出的 implementation decisions。可以包括：

- 将被 built/modified 的 modules
- 将被 modified 的 module interfaces
- 来自 developer 的 technical clarifications
- Architectural decisions
- Schema changes
- API contracts
- Specific interactions

不要包含 specific file paths 或 code snippets。它们可能很快 outdated。

## Testing Decisions

列出已经做出的 testing decisions。包括：

- 好 test 的描述（只测试 external behavior，不测试 implementation details）
- 将被测试的 modules
- Tests 的 prior art（即 codebase 中 similar types of tests）

## Out of Scope

描述此 refactor 范围外的内容。

## Further Notes (optional)

关于 refactor 的任何 further notes。

</refactor-plan-template>
