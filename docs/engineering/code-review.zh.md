## What it does

`code-review` 会审查 `HEAD` 与你提供的固定点之间的 diff，固定点可以是 commit、branch、tag 或 merge-base。它沿两个独立轴审查：**Standards**（代码是否遵守此 repo 的文档化约定）和 **Spec**（是否实现了 originating issue 或 spec 的要求）。每个轴由独立 parallel sub-agent 运行，并并排报告。它绝不合并或重新排序两组 findings，因为分开就是重点：一个 change 可能通过一个轴但未通过另一个，混成单一 verdict 会让其中一方遮住另一方。

## When to reach for it

输入 `/code-review`，或当你要求 review branch、PR、work-in-progress changes、或任何 “since X” 的内容时，agent 会自动触达它。

当你有一个 diff，需要相对某个 known-good point 判断，并希望两个问题独立得到回答时使用它：*它构建得对吗？* 以及 *它构建的是对的东西吗？* 它位于 build loop 的末尾；实际 test-first 写代码时使用 [tdd](https://aihero.dev/skills-tdd)，将完整 spec build 成 code 时使用 [implement](https://aihero.dev/skills-implement)，后者会在 commit 前运行自己的 `/code-review` pass。

## Prerequisites

**Spec** 轴需要找到 originating spec：commit message 中的 issue reference、你传入的路径，或 `docs/`/`specs/` 下的 spec。issue-tracker wiring 来自 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills)；没有 spec 时，Spec 轴会直接 skip 并说明。**Standards** 轴不需要任何 setup，即使 repo 没有文档化 conventions，它也始终携带内建 Fowler smell baseline。

## Two axes, never merged

核心想法是 **two axes**。**Standards** 问的是 diff 是否符合此 repo 写代码的方式：它的 `CODING_STANDARDS.md` 或 `CONTRIBUTING.md`，再加上一组固定的 Fowler code smells baseline（Mysterious Name、Duplicated Code、Feature Envy、Data Clumps 等）。两条规则保证 baseline 安全：文档化 repo standard 永远覆盖 baseline；每个 smell 都是 judgement call，不是硬性违规。**Spec** 问的是正交问题：代码是否真的完成 issue 或 spec 要求，没有漏需求，也没有偷塞 scope creep。

两个轴以 parallel sub-agents 运行，避免彼此污染 context。最终报告使用分开的 `## Standards` 和 `## Spec` headings，并分别给出 per-axis summary。这里刻意没有跨轴的单一赢家。

## It's working if

- 它先 pin 并确认 fixed point（`git rev-parse`），bad ref 或 empty diff 会快速失败，而不是在 sub-agents 内部才失败。
- Standards 和 Spec findings 分成两个清晰 blocks，每条都引用其来源：前者是 repo standard 或 baseline smell，后者是 quoted spec line。
- 找不到 spec 时，Spec 轴报告 “no spec available”，而不是编造需求。

## Common questions

**它和 Claude Code 自带的 `/code-review` 重名，怎么办？**

这是最常见、尚未解决的问题。Claude Code 内建版本主要找 diff 中的 bugs，本 skill 检查 spec compliance 与 repo standards。Plugin marketplace 安装会使用 `mattpocock-skills:` 前缀；普通 skills 安装则可能让本地文件覆盖内建版本。持久做法是把本 skill fork 成新名字，并从 managed set 中移除原名；直接改 frontmatter 或目录名会被 `npx skills update` 覆盖。

**Sub-agents 会再次调用 `/code-review` 并继续派生 agents。**

这是多个 harness 中都复现过的 open bug。Standards 与 Spec briefs 没有禁止 delegation，sub-agent 可能重新发现本 skill 并扇出。常用 fork 修复是在两个 brief 末尾加入：“不要调用 `/code-review` 或继续派生 agents，直接完成本次 review。”无人值守运行时应观察 agent 数量。

**应该在刚写完 code 的同一 [session](https://www.aihero.dev/ai-coding-dictionary/session) 运行吗？**

优先使用 fresh session。同一 context 中的 reviewing agent 持有塑造代码的全部 assumptions，容易把 review 变成 confirmation。Clean session 中手动调用 `/code-review` 才更接近独立 review。

**每张 ticket 后运行，还是 branch 完成后统一运行？**

两种都可以。Per-ticket 能让 diff 足够小，Spec 轴只需对照一个 spec；branch 末尾统一 review 能发现 tickets 之间的 interaction。拿不准时，每张 ticket 后跑一次，再从 branch point 做最终 pass。

**可以直接相信 findings 吗？**

不可以。Sub-agent output 是 hypothesis，不是 evidence；本 skill 汇总两份报告时不会逐条重新验证，finding 可能引用错误位置或夸大影响。行动前检查每条 citation。强制附带 standards rule、smell+hunk 或 spec line，正是为了让它可核验。

**为什么每次重跑都会找到新问题？**

修复会创造新 surface，Standards 轴中的 judgement calls 也不具备跨运行确定性。没有 convergence guarantee。把一次 pass 当成带引用的 leads，处理有依据的部分后停止，不要循环运行直到“完全干净”。

**它会 review 未提交的工作吗？**

不会。它比较 `<fixed-point>...HEAD`，three-dot diff 从 merge-base 计算，不包含 staged 或 working-tree changes。先 commit，再 review，之后 amend 或追加 fixup。

## Where it fits

`code-review` 是 main build chain 尾部的 review step：

```txt
grill-with-docs -> to-spec -> to-tickets -> implement -> code-review
```

它最接近的邻居是 [implement](https://aihero.dev/skills-implement)，后者驱动 build，并在 commit 前调用本 skill 做 review pass；上游由 [to-spec](https://aihero.dev/skills-to-spec) 和 [to-tickets](https://aihero.dev/skills-to-tickets) 产出它要检查的 spec。无法确定该用哪个 skill 或 flow 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
