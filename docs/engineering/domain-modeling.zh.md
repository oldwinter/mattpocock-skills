Quickstart:

```bash
npx skills add mattpocock/skills --skill=domain-modeling
```

```bash
npx skills update domain-modeling
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/engineering/domain-modeling)

## What it does

`domain-modeling` 会在 design 过程中构建并打磨项目的 **ubiquitous language**：挑战模糊术语，用具体场景 pressure-test relationships，并在 glossary 和 decisions 成形时立即写下。

这是 **active** discipline，而不是 passive one。仅仅读取 `CONTEXT.md` 借用 vocabulary，是任何 skill 都能做的一行习惯；此 skill 用于你正在 *改变* model 的场景：创造 canonical term，发现代码与你刚说的话矛盾，记录难以逆转的决定。它也会保持 glossary 清洁：`CONTEXT.md` 是 glossary，仅此而已，不包含 implementation details、spec 或 scratch pad。

## When to reach for it

输入 `/domain-modeling`，或当任务匹配时 agent 自动触达，例如你在钉住 terminology、解决 overloaded word，或记录 architectural decision。

当 *words* 才是问题时使用它：两个人对 “cancellation” 意思不同，“account” 同时做三件事，或 design conversation 总被某个从未精确命名的 concept 卡住。如果问题是 module 的 *shape*，例如 seam 放哪里、interface 多 deep，使用 [codebase-design](https://aihero.dev/skills-codebase-design)。如果你想在 build 前审问 plan 本身，使用 [grilling](https://aihero.dev/skills-grilling)。

## Prerequisites

此 skill 写入两个位置，且都 lazily created，只有出现值得记录的内容时才创建。Resolved terms 写入 root `CONTEXT.md`；在带 `CONTEXT-MAP.md` 的 multi-context repo 中，写入对应 context 的 `CONTEXT.md`。Decisions 写入 `docs/adr/`。开始前无需任何文件存在；第一个 resolved term 创建 glossary，第一个真正 trade-off 创建 ADR。

## Glossary vs. ADR

两个 artifacts，两条不同门槛：

- **The glossary**（`CONTEXT.md`）捕获 language。每次 vague term 变成 canonical，就 inline 写下，而不是 batch 到最后，这样 shared vocabulary 与 conversation 同步。它严格排除 implementation detail。
- **An ADR** 捕获 decision，门槛很高：只有当 choice **hard to reverse**、**surprising without context**、且 **result of a real trade-off** 时才提出。缺任一项，就没有 ADR。这样 `docs/adr/` 保存的是 consequential forks，而不是 diary。

让它真正起作用的动作是：当你陈述某件事如何运作时，此 skill 会 cross-reference code 并浮现矛盾，例如 “你的代码取消整个 Order，但你刚说 partial cancellation 可行，哪个才对？” Language 和 code 被迫对齐。

## Pulled out on purpose

`domain-modeling` 是构建项目 ubiquitous language 的 **single source of truth**，作为独立 model-invoked skill 拆出，因此其他 skill 都能触达它。[grill-with-docs](https://aihero.dev/skills-grill-with-docs) 依赖它在 grilling session 中记录 terms 和 decisions，[triage](https://aihero.dev/skills-triage) 用它让 tickets 使用项目自己的 words，[improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 工作时也会触达它。

保持 standalone 意味着你也可以直接触达它，将其作为打磨 model 的 **reference**，而不接受任何其他 skill 的强制步骤。Language 只存在于一个地方，所有需要它的流程都指向那里。

## Where it fits

`domain-modeling` 是 **reach-for-it-anytime standalone**，它常常位于其他 skills 下方运行，而不是固定链条中的某一步。它最接近的邻居是 [codebase-design](https://aihero.dev/skills-codebase-design)，因为 shared language 才能精确命名 deep module 及其 seam；下游，settled glossary 正是 [to-prd](https://aihero.dev/skills-to-prd) 合成为使用项目自身词汇的 spec 的输入。无法确定该用哪个 skill 或 flow 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
