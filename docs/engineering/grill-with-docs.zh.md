## What it does

`grill-with-docs` 会围绕 plan 或 design 进行 relentless interview，按轮次解决 decision tree 当前 frontier 上的全部问题，直到你和 agent 达成 shared understanding，并在过程中写下 vocabulary 和 decisions。

这场 grilling **leaves a paper trail**。普通 interview 会打磨 thinking，然后在 session 结束后消散；这个 skill 会在 term 解决的瞬间将其写入 `CONTEXT.md` glossary，并把 hard、one-way decisions 记录成 ADRs。Alignment 不只存在于脑中，而会留在 conversation 之后。

## When to reach for it

你通过输入 `/grill-with-docs` 调用它，agent 不会自行触达它。

在 change 最开始时使用它：plan 还模糊，domain language 尚未稳定，你希望在任何代码出现前 pressure-test 两者。如果你只需要 interview，不需要 artifacts，使用 [grilling](https://aihero.dev/skills-grilling)；如果 plan 已清楚，只需要钉住或记录 terminology，使用 [domain-modeling](https://aihero.dev/skills-domain-modeling)。如果 change 大到单个 session 装不下，而且路线仍有 fog，例如 greenfield project 或超大 feature build，则从更上游的 [wayfinder](https://aihero.dev/skills-wayfinder) 开始：它先把 effort 绘制成 decision map，路线清晰后再交回 main flow。

## Prerequisites

此 skill 是 stateful，会一边 grill 一边写入 repo。Resolved terms 写入 root `CONTEXT.md` glossary；如果 `CONTEXT-MAP.md` 标记 multi-context repo，则写入相关 context 的 `CONTEXT.md`。真正 hard-to-reverse decisions 写入 `docs/adr/`。二者都是 lazily created，第一个 term 或 decision crystallises 前不会有任何文件。你不需要提前 scaffold，但需要处在可以安全写这些文件的位置。

## The grill

Engine 是一个 **grill**：relentless 地沿 decision tree 向下走。每轮提问当前完整 frontier，也就是 prerequisites 已解决、且彼此不依赖的全部问题；回答后重新计算下一轮。每个问题都提供 recommended answer。代码库能回答的 facts 会交给 background sub-agents 探索，而不是问你。

此 variant 成为独立 skill 的原因在于答案落到哪里。grill 运行时，fuzzy language 会被 sharpen 成 canonical terms，并 inline 写入 glossary，而不是最后 batch。Glossary 始终是 glossary：纯 vocabulary，没有 implementation details，没有 spec。ADRs 只在 decision hard to reverse、surprising without context、且来自 real trade-off 时才提出。多数 sessions 只产生更清晰的 glossary 和很少甚至没有 ADRs，这正是预期形状。

## It's working if

- 它以少数几轮覆盖 frontier；同一轮的问题彼此不依赖，后续轮次建立在此前回答上。
- Terms 一旦解决，就以项目自己的 words 写入 `CONTEXT.md`。
- 它会在能自行回答时进入 codebase 阅读。
- ADRs 保持稀少，你不会被要求 rubber-stamp 可逆选择。

## Common questions

**应该用这个，还是 `/wayfinder`？**

由 scope 决定。一个 session 能解决的工作使用本 skill；单个 session 装不下时使用 [wayfinder](https://aihero.dev/skills-wayfinder)，先把 effort 绘制成 decision [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket) map。Wayfinder 更慢、更 dense；对 well-scoped feature 过早使用它是常见错误。

**运行结束后没有出现 `CONTEXT.md` 或 ADR。**

可能确实没有内容达到门槛：没有新 vocabulary 时无需改 glossary，ADR 也必须同时满足三个 gates。另一个已知 bug 是它位于其他 orchestration layer 内时，interview 正常运行而 file-writing 静默丢失。使用这种 wrapper 时，应检查实际 working directory 与输出文件。

**它一次抛出所有问题、没有 recommendations，也没提 `CONTEXT.md`。**

这通常说明两个依赖没有完整加载。`SKILL.md` 只负责 delegation；agent 若没有加载 [grilling](https://aihero.dev/skills-grilling) 和 [domain-modeling](https://aihero.dev/skills-domain-modeling)，就会自行猜测“grilling”。只加载前者则会得到正确 interview，却没有 paper trail。可直接询问 agent 实际加载了哪些 skills。

**其他 decisions 去哪里了？**

只留在 conversation。Glossary 不是 spec，多数答案也达不到 ADR 门槛，目前没有 ledger 把每个 answer 贯穿到 spec、ticket 和 test。应保留同一 session，立即交给 [to-spec](https://aihero.dev/skills-to-spec)，并逐项对照自己的回答 review spec。

**可以用于完全没有 docs 的现有 repo 吗？**

可以。直接说“help me document my repo”。它会阅读 code，并让你判断 codebase 中哪些 words 才是 canonical；常见做法是与 [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 配合建立或修复 `CONTEXT.md`。

**Session 结束后做什么？**

Main flow 中应在同一 conversation 调用 [to-spec](https://aihero.dev/skills-to-spec)。如果 change 小到可以立即 build，也可以直接进入 [implement](https://aihero.dev/skills-implement)。

**为什么叫 `grill-with-docs`？**

名称并不精确；`grill-domain-model` 是尚未采纳的 rename 建议。若未来 rename，docs path 与 URL 也会随之移动。

## Where it fits

`grill-with-docs` 是 main build chain 的 opening step：

```txt
grill-with-docs -> to-spec -> to-tickets -> implement -> code-review
```

它位于 spec 写下之前，产出 shared understanding 和 settled vocabulary，随后 [to-spec](https://aihero.dev/skills-to-spec) 无需再次 interview 即可合成为 spec。它的近邻是 [grilling](https://aihero.dev/skills-grilling)，也就是不写 docs 的同一 interview，以及 [domain-modeling](https://aihero.dev/skills-domain-modeling)，也就是它驱动的 glossary-and-ADR discipline。无法确定该用哪个 skill 或 flow 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
