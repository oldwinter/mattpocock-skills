Quickstart:

```bash
npx skills add mattpocock/skills --skill=code-review
```

```bash
npx skills update code-review
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/engineering/code-review)

## What it does

`code-review` 会审查 `HEAD` 与你提供的固定点之间的 diff，固定点可以是 commit、branch、tag 或 merge-base。它沿两个独立轴审查：**Standards**（代码是否遵守此 repo 的文档化约定）和 **Spec**（是否实现了 originating issue 或 PRD 的要求）。每个轴由独立 parallel sub-agent 运行，并并排报告。它绝不合并或重新排序两组 findings，因为分开就是重点：一个 change 可能通过一个轴但未通过另一个，混成单一 verdict 会让其中一方遮住另一方。

## When to reach for it

输入 `/code-review`，或当你要求 review branch、PR、work-in-progress changes、或任何 “since X” 的内容时，agent 会自动触达它。

当你有一个 diff，需要相对某个 known-good point 判断，并希望两个问题独立得到回答时使用它：*它构建得对吗？* 以及 *它构建的是对的东西吗？* 它位于 build loop 的末尾；实际 test-first 写代码时使用 [tdd](https://aihero.dev/skills-tdd)，将完整 spec build 成 code 时使用 [implement](https://aihero.dev/skills-implement)，后者会在 commit 前运行自己的 `/code-review` pass。

## Prerequisites

**Spec** 轴需要找到 originating spec：commit message 中的 issue reference、你传入的路径，或 `docs/`/`specs/` 下的 PRD。issue-tracker wiring 来自 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills)；没有 spec 时，Spec 轴会直接 skip 并说明。**Standards** 轴不需要任何 setup，即使 repo 没有文档化 conventions，它也始终携带内建 Fowler smell baseline。

## Two axes, never merged

核心想法是 **two axes**。**Standards** 问的是 diff 是否符合此 repo 写代码的方式：它的 `CODING_STANDARDS.md` 或 `CONTRIBUTING.md`，再加上一组固定的 Fowler code smells baseline（Mysterious Name、Duplicated Code、Feature Envy、Data Clumps 等）。两条规则保证 baseline 安全：文档化 repo standard 永远覆盖 baseline；每个 smell 都是 judgement call，不是硬性违规。**Spec** 问的是正交问题：代码是否真的完成 issue 或 PRD 要求，没有漏需求，也没有偷塞 scope creep。

两个轴以 parallel sub-agents 运行，避免彼此污染 context。最终报告使用分开的 `## Standards` 和 `## Spec` headings，并分别给出 per-axis summary。这里刻意没有跨轴的单一赢家。

## It's working if

- 它先 pin 并确认 fixed point（`git rev-parse`），bad ref 或 empty diff 会快速失败，而不是在 sub-agents 内部才失败。
- Standards 和 Spec findings 分成两个清晰 blocks，每条都引用其来源：前者是 repo standard 或 baseline smell，后者是 quoted spec line。
- 找不到 spec 时，Spec 轴报告 “no spec available”，而不是编造需求。

## Where it fits

`code-review` 是 main build chain 尾部的 review step：

```txt
grill-with-docs -> to-prd -> to-issues -> implement -> code-review
```

它最接近的邻居是 [implement](https://aihero.dev/skills-implement)，后者驱动 build，并在 commit 前调用本 skill 做 review pass；上游由 [to-prd](https://aihero.dev/skills-to-prd) 和 [to-issues](https://aihero.dev/skills-to-issues) 产出它要检查的 spec。无法确定该用哪个 skill 或 flow 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
