Quickstart:

```bash
npx skills add mattpocock/skills --skill=ask-matt
```

```bash
npx skills update ask-matt
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/engineering/ask-matt)

## What it does

`ask-matt` 是这个 repo 中所有 skills 的 router。你描述当前处境，它告诉你哪个 skill 或 flow 合适，以及应按什么顺序运行。

它 **本身不做工作**。它不会 grill、写 PRD 或修 bug，只负责定向。它尤其服务于 **user-invoked** skills：这些不会自动触发，所以必须由 *你* 记住它们存在，而 `ask-matt` 就是你卸载这段记忆的地方。它也会指向可以按名称触达的 model-invoked skills，例如 `/tdd`、`/diagnosing-bugs`、`/prototype`、`/code-review`，以及两个 vocabulary reference：`/domain-modeling` 和 `/codebase-design`。它回答“该用哪个、何时用”，然后把你交给真正做事的 skill。

## When to reach for it

你通过输入 `/ask-matt` 调用它，agent 不会自行触达它。

当你不确定某个情况需要哪个 skill 或 flow 时使用它：你有一个 idea 但不知道从哪里开始；一堆 bug reports 不确定是否该走 `/triage`；两个 skill 看起来可互换但边界不清。如果你已经知道要用哪个 skill，就跳过 router，直接调用那个 skill。

## Flows, not just skills

`ask-matt` 提供给你的思维单位是 **flow**，也就是穿过多个 skills 的路径，而不是单个工具。多数工作沿一条 **main flow** 运行（idea -> ship: grill -> PRD -> issues -> implement -> review）；两个 **on-ramps** 汇入它（处理 incoming bugs 和 requests 的 triage lane；生成 ideas 的 codebase-health lane）；其余是可独立触达的 **standalone**。你问一个问题，它会把你放到正确 flow 的正确 step，而不仅仅递给你一个工具。

## Where it fits

`ask-matt` 是 **router**，是整套 skills 之上的 standalone map。其他 docs 页面都会链接回 [ask-matt](https://aihero.dev/skills-ask-matt)，所以它不处在某条 chain 里，而是指向每条 chain。你从这里最常落到 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，也就是 main flow 的开头，或 [triage](https://aihero.dev/skills-triage)，也就是你未主动创建的 work 的入口。当 router 自己的图也过时时，它的 [Source](https://github.com/mattpocock/skills/tree/main/skills/engineering/ask-matt) 是权威 map。
