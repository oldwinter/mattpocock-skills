Quickstart:

```bash
npx skills add mattpocock/skills --skill=prototype
```

```bash
npx skills update prototype
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/engineering/prototype)

## What it does

`prototype` 构建一个小型、一次性的程序，它唯一的职责是回答一个 design question：这个 state model 是否合理，或这个 UI 应该长什么样。

代码从第一天起就是 **throwaway**，并且明确标记为如此。它不带 tests，不做超出运行所需的 error handling，不抽象，不持久化。目标是快速学到东西然后删除它；一旦你开始 harden 它，你就已经不在 prototyping。

## When to reach for it

输入 `/prototype`，或当任务匹配时 agent 自动触达。

当你有一个很难靠纸面解决的 design question 时使用它：一个 cases 太多、脑中装不下的 state machine，或一个必须看到几个并排版本才能判断的 screen。如果已经构建的东西行为错误，需要找原因，使用 [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs)；prototype 探索要 build 什么，不解释已 build 的东西为什么 broken。

## Two branches

问题决定形状，而形状只有两种：

- **“Does this logic / state model feel right?”**：一个很小的 interactive terminal app，让 state machine 经过尴尬 cases，并在每个 action 后打印完整 state，方便观察变化。
- **“What should this look like?”**：同一路由上的多个差异很大的 UI variations，通过 floating bar 切换，让你比较真实 renders，而不是靠想象。

选错 branch 会浪费整个 prototype，所以先确定问题。两个 branches 都把 state 放在 memory 中，用一个 command 运行，并在每一步展示完整 state。

## The answer is the artifact

代码是 disposable；唯一值得保留的是 **answer**。当 prototype 解决了问题，把 verdict 写到 durable place：commit message、ADR、Issue，或旁边的 `NOTES.md`，同时记录它回答的问题。然后删除或吸收代码。留在 repo 中腐烂的 prototype 已经超过了它的用途。

## Where it fits

`prototype` 是 reach-for-it-anytime standalone：你进入它解决 design question，然后退出。它的答案常常供下一步使用：validated state model 或 UI direction 会成为 [to-prd](https://aihero.dev/skills-to-prd) 写下的 settled input，或成为通过 [domain-modeling](https://aihero.dev/skills-domain-modeling) 记录的 architectural decision。无法确定该用哪个 skill 或 flow 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
