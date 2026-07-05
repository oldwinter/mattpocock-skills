---
name: code-review
description: Review 自 fixed point（commit、branch、tag 或 merge-base）以来的 changes，沿两条 axes：Standards（code 是否遵守此 repo documented coding standards？）和 Spec（code 是否匹配 originating issue/PRD 要求？）。并行运行两个 sub-agents 并 side by side 报告。用于用户想 review branch、PR、work-in-progress changes，或要求 “review since X” 的场景。
---

对用户提供的 fixed point 与 `HEAD` 之间 diff 做 two-axis review：

- **Standards** — code 是否符合此 repo 的 documented coding standards？
- **Spec** — code 是否 faithfully implement originating issue / PRD / spec？

两条 axes 作为 **parallel sub-agents** 运行，避免彼此污染 context，然后此 skill aggregate findings。

Issue tracker 应该已经提供；如果缺少 `docs/agents/issue-tracker.md`，运行 `/setup-matt-pocock-skills`。

## Process

### 1. Pin the fixed point

用户说的任何东西都是 fixed point：commit SHA、branch name、tag、`main`、`HEAD~5` 等。如果他们没指定，就询问 fixed point。

Capture diff command once：`git diff <fixed-point>...HEAD`（three-dot，因此 comparison against merge-base）。也用 `git log <fixed-point>..HEAD --oneline` note commit list。

继续前，确认 fixed point 能 resolve（`git rev-parse <fixed-point>`），并且 diff non-empty。Bad ref 或 empty diff 应在这里 fail，而不是在两个 parallel sub-agents 中 fail。

### 2. Identify the spec source

按顺序寻找 originating spec：

1. Commit messages 中的 issue references（`#123`、`Closes #45`、GitLab `!67` 等）— 通过 `docs/agents/issue-tracker.md` 中 workflow fetch。
2. 用户作为 argument 传入的 path。
3. `docs/`、`specs/` 或 `.scratch/` 下，与 branch name 或 feature 匹配的 PRD/spec file。
4. 如果什么都找不到，询问用户 spec 在哪里。如果他们说没有，**Spec** sub-agent 会 skip 并报告 “no spec available”。

### 3. Identify the standards sources

Repo 中任何记录 code 应如何写的内容，例如 `CODING_STANDARDS.md` 或 `CONTRIBUTING.md`。

除 repo 自己记录的 standards 外，Standards axis 始终携带下面的 **smell baseline**：一组固定的 Fowler code smells（_Refactoring_, ch.3）。即使 repo 没有记录标准，它也适用。两条规则约束它：

- **The repo overrides.** 已记录的 repo standard 始终优先；如果它认可了 baseline 会 flag 的内容，就 suppress 该 smell。
- **Always a judgement call.** 每个 smell 都是带 label 的 heuristic（例如 “possible Feature Envy”），绝不是 hard violation；和这里的任何 standard 一样，跳过 tooling 已经 enforce 的内容。

每个 smell 都按 *what it is* -> *how to fix* 的形式阅读；用它匹配 diff：

- **Mysterious Name** — function、variable 或 type 的名字没有揭示它做什么或保存什么。-> rename；如果没有诚实名称，说明 design 模糊。
- **Duplicated Code** — 同一 logic shape 出现在 change 的多个 hunk 或 file 中。-> extract shared shape，并从两处调用。
- **Feature Envy** — method 访问另一个 object 的数据多过访问自身数据。-> 把 method 移到它羡慕的数据上。
- **Data Clumps** — 同一组 fields 或 params 反复一起移动（一个 type 想出生）。-> 把它们捆成一个 type 并传递它。
- **Primitive Obsession** — primitive 或 string 代替了值得拥有自身 type 的 domain concept。-> 给该 concept 一个小 type。
- **Repeated Switches** — 对同一 type 的同类 `switch`/`if` cascade 在 change 中重复出现。-> 用 polymorphism，或让两个 sites 共享一个 map。
- **Shotgun Surgery** — 一个 logical change 迫使 diff 中多个文件散点编辑。-> 把一起变化的内容聚合到一个 module。
- **Divergent Change** — 一个 file 或 module 因多个无关原因被编辑。-> 拆分，使每个 module 只因一个原因变化。
- **Speculative Generality** — 为 spec 没有要求的需求添加 abstraction、parameters 或 hooks。-> 删除；inline 回去，直到出现真实需求。
- **Message Chains** — caller 不应该依赖的长 `a.b().c().d()` navigation。-> 把这段 walk 隐藏在第一个 object 的一个 method 后。
- **Middle Man** — class 或 function 主要只是继续 delegate。-> 删掉它，直接调用真实 target。
- **Refused Bequest** — subclass 或 implementer 忽略或覆盖了继承来的大部分内容。-> 去掉 inheritance，使用 composition。

### 4. Spawn both sub-agents in parallel

发送一条 message，包含两个 `Agent` tool calls。两者都使用 `general-purpose` subagent。

**Standards sub-agent prompt** — include：

- Full diff command 和 commit list。
- Step 3 找到的 standards-source files list，**加上 Step 3 中完整粘贴的 smell baseline**；sub-agent 没有其他途径访问它。
- Brief: “Report — per file/hunk where relevant — (a) every place the diff violates a documented standard: cite the standard (file + the rule); and (b) any baseline smell you spot: name it and quote the hunk. Distinguish hard violations from judgement calls — documented-standard breaches can be hard, but baseline smells are always judgement calls, and a documented repo standard overrides the baseline. Skip anything tooling enforces. Under 400 words.”

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

- Code 遵守每条 standard，但实现了错误的东西 -> **Standards pass, Spec fail.**
- Code 完全符合 issue 要求，但破坏项目 conventions -> **Spec pass, Standards fail.**

Separate reporting 防止一条 axis mask 另一条。
