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

## Common questions

**我的 `CONTEXT.md` 已经有 500、1000 甚至 3000 行，怎么办？**

长度是症状，真正问题是文件吸收了 implementation details 和不属于 glossary 的 decisions。直接运行 `/grill-with-docs make my CONTEXT.md more concise and remove any implementation details from it`。只有文件已经足够 lean，却仍覆盖两个不应同时装进读者脑中的 domains 时，才拆成 `CONTEXT-MAP.md`；拆分 bloated file 只会得到多个 bloated files。

**为什么叫 `CONTEXT.md`，而不是 `GLOSSARY.md`？**

这个命名没有定论。`GLOSSARY.md` 更准确地表达“只放 glossary”，而 `CONTEXT-MAP.md` 指向多个 bounded-context `CONTEXT.md` 又更自然。可以在 fork 中改名，但整套 skills 都会查找 `CONTEXT.md`，因此必须一起修改。

**`/ubiquitous-language` 去哪了？**

它已删除，职责并入 `domain-modeling`。新 skill 持续维护整个 model，而不是从一次 conversation 中一次性 dump glossary；vocabulary enforcement 现在运行在 grilling、triage 和 mapping 下方。

**现有 codebase 没有 glossary，怎么开始？**

显式调用：`/grill-with-docs help me scaffold my existing repo with a CONTEXT.md`。Brownfield repo 靠日常使用慢慢积累通常太慢；预期会有一次较长的 interview。

**可以保留 domain model，但使用团队自己的 ADR format 吗？**

当前不够干净。Glossary 与 ADR instructions 位于同一个 skill。可在本地 fork 中修改，或在 repo 的 agent docs 中覆盖 ADR location、template 与 naming；将两者拆分仍是 [open request](https://github.com/mattpocock/skills/issues/557)。

**Glossary 真的值得维护吗？它也会 stale。**

不总是。它的收益位于 naming 与 concept alignment，尤其是 module、table、status enum、Issue title、CLI command 等命名边界；在普通 prose 中价值更低。一天就结束的 build 可以跳过。未经 review、由 agent 自行生成的 glossary 甚至比没有更糟，因为后续 sessions 会把自信的 lore 当作事实。

**它能自动把模糊 prompt 改写成 domain language 吗？**

不能。自己都不理解的 domain language 写出来只会变成空话。本 skill 在你已有理解后强制 precision，不会凭空制造 vocabulary；仅使用正确 nouns、却没有正确 conceptual structure，同样会得到看似正确的错误结果。

## Where it fits

`domain-modeling` 是 **reach-for-it-anytime standalone**，它常常位于其他 skills 下方运行，而不是固定链条中的某一步。它最接近的邻居是 [codebase-design](https://aihero.dev/skills-codebase-design)，因为 shared language 才能精确命名 deep module 及其 seam；下游，settled glossary 正是 [to-spec](https://aihero.dev/skills-to-spec) 合成为使用项目自身词汇的 spec 的输入。无法确定该用哪个 skill 或 flow 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
