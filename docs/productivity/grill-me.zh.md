Quickstart:

```bash
npx skills add oldwinter/mattpocock-skills --skill=grill-me
```

```bash
npx skills update grill-me
```

[Source](https://github.com/oldwinter/mattpocock-skills/tree/main/skills/productivity/grill-me)

## What it does

`grill-me` 会围绕 plan 或 design 进行 relentless interview，走遍 decision tree 的每个 branch，直到你和 agent 达成 **shared understanding**。

它 **一次只问一个问题** 并等待。它不会一次性抛出一批问题，因为那会令人迷失；能通过阅读 codebase 回答的问题，它会自己去读，而不是问你。每个问题都带 agent 自己的 recommended answer，因此你是在回应一个 proposal，而不是盯着空白 prompt。

## When to reach for it

你通过输入 `/grill-me` 调用它，agent 不会自行触达它。

在 build 前使用它：plan 大体正确，但你能感觉里面藏着未解决 decisions，需要把软点找出来并摊开。如果你希望同样的 interrogation 还留下 ADRs 和 glossary 的 paper trail，使用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)。

## The design tree

Session 会把 plan 当作 decision tree 来走，逐个解决 decisions 之间的 dependencies：先 settle parent decision，再处理挂在下面的 choices。目标不是快速达成一致，而是把每个 implicit call 变 explicit，让重要内容不再被默默假设。走完后，你得到的是每个 branch 都被访问过的 plan。

`grill-me` 是 **stateless**：不写文件，不留下 workspace。它能在任何地方运行，唯一 artifact 是 conversation 中被 sharpened understanding。这正是它和 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 的刻意区别，后者会把同一 interview 捕获为 durable ADRs 和 glossary。

## Where it fits

`grill-me` 是 reach-for-it-anytime standalone，是任何 plan 需要 hardening 时的 pre-build stress test。它是 [grilling](https://aihero.dev/skills-grilling) primitive 的 stateless、user-invoked front door；最接近的邻居是 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，也就是同样 interview 但额外把 decisions 记录成 ADRs 和 glossary 的 stateful sibling。如果结果是你想写下来的 spec，就交给 [to-spec](https://aihero.dev/skills-to-spec)，后者会把 settled understanding 合成为 spec，而不会再次 interview。无法确定哪个 flow 合适时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
