# Engineering

我日常用于 code work 的 skills。

## User-invoked

只有在你输入它们时才能触达（Claude Code：`disable-model-invocation: true`；Codex：`agents/openai.yaml` 中的 `policy.allow_implicit_invocation: false`）。

- **[ask-matt](./ask-matt/SKILL.md)** — 询问哪个 skill 或 flow 适合你的情况；它是这个 repo 中 skills 的 router。
- **[grill-with-docs](./grill-with-docs/SKILL.md)** — Grilling session，也会构建项目的 domain model、打磨 terminology，并 inline 更新 `CONTEXT.md` 和 ADRs。
- **[triage](./triage/SKILL.md)** — 让 issues 通过 triage roles 的 state machine 流转。
- **[improve-codebase-architecture](./improve-codebase-architecture/SKILL.md)** — 扫描 codebase 的 deepening opportunities，生成 visual HTML report，然后围绕你选中的机会进行 grilling。
- **[setup-matt-pocock-skills](./setup-matt-pocock-skills/SKILL.md)** — 为 engineering skills 配置当前 repo（issue tracker、triage labels、domain doc layout）。每个 repo 运行一次。
- **[to-spec](./to-spec/SKILL.md)** — 将当前 conversation 整理成 spec，并发布到 issue tracker。
- **[to-tickets](./to-tickets/SKILL.md)** — 把 plan、spec 或 conversation 拆成 tracer-bullet tickets，每张都明确 blocking edges；local tracker 用文本文件，真实 tracker 用原生 blocking links。
- **[implement](./implement/SKILL.md)** — 按 spec 或 tickets 实现工作，在预先约定的 seams 上驱动 `/tdd`，并在 commit 前完成 `/code-review`。
- **[wayfinder](./wayfinder/SKILL.md)** — 把单个 agent session 装不下的大型工作绘制成 issue tracker 上共享的 decision ticket map，一次解决一个 ticket，直到通往 destination 的路径清晰。

## Model-invoked

Model 或 user 都能触达（使用 rich trigger phrasing，让 model 能主动 reach for them）。

- **[prototype](./prototype/SKILL.md)** — 构建 throwaway prototype 来回答 design question：针对 state/logic 的 runnable terminal app，或多个可切换 UI variations。
- **[diagnosing-bugs](./diagnosing-bugs/SKILL.md)** — 面向 hard bugs 和 performance regressions 的 disciplined diagnosis loop：reproduce → minimise → hypothesise → instrument → fix → regression-test。
- **[research](./research/SKILL.md)** — 基于高可信 primary sources 调查问题，并作为 background agent 在 repo 中保存带引用的 Markdown findings。
- **[tdd](./tdd/SKILL.md)** — 使用 red-green loop 的 Test-driven development。一次一个 vertical slice 构建 feature 或修复 bug。
- **[domain-modeling](./domain-modeling/SKILL.md)** — 主动构建和打磨项目的 domain model：challenge terms、用 scenarios stress-test，并 inline 更新 `CONTEXT.md` 和 ADRs。
- **[codebase-design](./codebase-design/SKILL.md)** — 设计 deep modules 的 shared discipline 和 vocabulary：small interfaces、clean seams、通过 interface test。
- **[code-review](./code-review/SKILL.md)** — 针对 fixed point 之后的 diff 做 two-axis review：**Standards**（是否遵守 repo coding standards 加 Fowler smell baseline）和 **Spec**（是否忠实实现 originating Issue/spec），并用 parallel sub-agents 运行。
- **[resolving-merge-conflicts](./resolving-merge-conflicts/SKILL.md)** — 逐 hunk 处理进行中的 git merge 或 rebase conflict，依据两侧 primary source 的 intent 解决，然后完成操作；绝不 `--abort`。
