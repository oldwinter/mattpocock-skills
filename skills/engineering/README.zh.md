# Engineering

我日常用于 code work 的 skills。

## User-invoked

只有在你输入它们时才能触达（`disable-model-invocation: true`）。

- **[ask-matt](./ask-matt/SKILL.zh.md)** — 询问哪个 skill 或 flow 适合你的情况；它是这个 repo 中 skills 的 router。
- **[grill-with-docs](./grill-with-docs/SKILL.zh.md)** — Grilling session，也会构建项目的 domain model、打磨 terminology，并 inline 更新 `CONTEXT.md` 和 ADRs。
- **[triage](./triage/SKILL.zh.md)** — 让 issues 通过 triage roles 的 state machine 流转。
- **[improve-codebase-architecture](./improve-codebase-architecture/SKILL.zh.md)** — 扫描 codebase 的 deepening opportunities，生成 visual HTML report，然后围绕你选中的机会进行 grilling。
- **[setup-matt-pocock-skills](./setup-matt-pocock-skills/SKILL.zh.md)** — 为 engineering skills 配置当前 repo（issue tracker、triage labels、domain doc layout）。每个 repo 运行一次。
- **[to-issues](./to-issues/SKILL.zh.md)** — 使用 vertical slices 将任意 plan、spec 或 PRD 拆成可独立领取的 Issues。
- **[to-prd](./to-prd/SKILL.zh.md)** — 将当前 conversation 转成 PRD，并发布到 issue tracker。

## Model-invoked

Model 或 user 都能触达（使用 rich trigger phrasing，让 model 能主动 reach for them）。

- **[prototype](./prototype/SKILL.zh.md)** — 构建 throwaway prototype 来回答 design question：针对 state/logic 的 runnable terminal app，或多个可切换 UI variations。
- **[diagnosing-bugs](./diagnosing-bugs/SKILL.zh.md)** — 面向 hard bugs 和 performance regressions 的 disciplined diagnosis loop：reproduce → minimise → hypothesise → instrument → fix → regression-test。
- **[research](./research/SKILL.zh.md)** — 基于高可信 primary sources 调查问题，并作为 background agent 在 repo 中保存带引用的 Markdown findings。
- **[tdd](./tdd/SKILL.zh.md)** — 使用 red-green loop 的 Test-driven development。一次一个 vertical slice 构建 feature 或修复 bug。
- **[domain-modeling](./domain-modeling/SKILL.zh.md)** — 主动构建和打磨项目的 domain model：challenge terms、用 scenarios stress-test，并 inline 更新 `CONTEXT.md` 和 ADRs。
- **[codebase-design](./codebase-design/SKILL.zh.md)** — 设计 deep modules 的 shared discipline 和 vocabulary：small interfaces、clean seams、通过 interface test。
- **[code-review](./code-review/SKILL.zh.md)** — 针对 fixed point 之后的 diff 做 two-axis review：**Standards**（是否遵守 repo coding standards 加 Fowler smell baseline）和 **Spec**（是否忠实实现 originating Issue/PRD），并用 parallel sub-agents 运行。
