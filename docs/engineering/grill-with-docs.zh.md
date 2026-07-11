Quickstart:

```bash
npx skills add oldwinter/mattpocock-skills --skill=grill-with-docs
```

```bash
npx skills update grill-with-docs
```

[Source](https://github.com/oldwinter/mattpocock-skills/tree/main/skills/engineering/grill-with-docs)

## What it does

`grill-with-docs` 会围绕 plan 或 design relentless interview，一次一个问题，直到你和 agent 达成 shared understanding，并在过程中写下 vocabulary 和 decisions。

这场 grilling **leaves a paper trail**。普通 interview 会打磨 thinking，然后在 session 结束后消散；这个 skill 会在 term 解决的瞬间将其写入 `CONTEXT.md` glossary，并把 hard、one-way decisions 记录成 ADRs。Alignment 不只存在于脑中，而会留在 conversation 之后。

## When to reach for it

你通过输入 `/grill-with-docs` 调用它，agent 不会自行触达它。

在 change 最开始时使用它：plan 还模糊，domain language 尚未稳定，你希望在任何代码出现前 pressure-test 两者。如果你只需要 interview，不需要 artifacts，使用 [grilling](https://aihero.dev/skills-grilling)；如果 plan 已清楚，只需要钉住或记录 terminology，使用 [domain-modeling](https://aihero.dev/skills-domain-modeling)。

## Prerequisites

此 skill 是 stateful，会一边 grill 一边写入 repo。Resolved terms 写入 root `CONTEXT.md` glossary；如果 `CONTEXT-MAP.md` 标记 multi-context repo，则写入相关 context 的 `CONTEXT.md`。真正 hard-to-reverse decisions 写入 `docs/adr/`。二者都是 lazily created，第一个 term 或 decision crystallises 前不会有任何文件。你不需要提前 scaffold，但需要处在可以安全写这些文件的位置。

## The grill

Engine 是一个 **grill**：relentless、one-question-at-a-time 地沿 design tree 向下走，先解决 decisions 之间的 dependencies，再继续下一步，并且每个问题都提供 recommended answer。代码库能回答的问题会通过阅读代码回答，而不是问你。

此 variant 成为独立 skill 的原因在于答案落到哪里。grill 运行时，fuzzy language 会被 sharpen 成 canonical terms，并 inline 写入 glossary，而不是最后 batch。Glossary 始终是 glossary：纯 vocabulary，没有 implementation details，没有 spec。ADRs 只在 decision hard to reverse、surprising without context、且来自 real trade-off 时才提出。多数 sessions 只产生更清晰的 glossary 和很少甚至没有 ADRs，这正是预期形状。

## It's working if

- 它一次只问一个问题并等待，而不是抛出 questionnaire。
- Terms 一旦解决，就以项目自己的 words 写入 `CONTEXT.md`。
- 它会在能自行回答时进入 codebase 阅读。
- ADRs 保持稀少，你不会被要求 rubber-stamp 可逆选择。

## Where it fits

`grill-with-docs` 是 main build chain 的 opening step：

```txt
grill-with-docs -> to-spec -> to-tickets -> implement -> code-review
```

它位于 spec 写下之前，产出 shared understanding 和 settled vocabulary，随后 [to-spec](https://aihero.dev/skills-to-spec) 无需再次 interview 即可合成为 spec。它的近邻是 [grilling](https://aihero.dev/skills-grilling)，也就是不写 docs 的同一 interview，以及 [domain-modeling](https://aihero.dev/skills-domain-modeling)，也就是它驱动的 glossary-and-ADR discipline。无法确定该用哪个 skill 或 flow 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
