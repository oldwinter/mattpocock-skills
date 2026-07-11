Quickstart:

```bash
npx skills add oldwinter/mattpocock-skills --skill=research
```

```bash
npx skills update research
```

[Source](https://github.com/oldwinter/mattpocock-skills/tree/main/skills/engineering/research)

## What it does

`research` 通过阅读拥有答案的 sources 来回答问题，并留下一个带引用的 Markdown 文件。它只使用 **primary sources**，例如官方文档、source code、specs、first-party APIs，不使用二手文章，因此保存下来的内容能追溯到权威来源，而不是 summary of a summary。

## When to reach for it

输入 `/research`，或当任务变成阅读工作时由 agent 自动触达。

当下一步是 *弄清一件事* 时使用它：API 实际如何表现、spec 到底怎么说、某个 claim 是否成立，并且你不想让当前 thread 卡在阅读上。若要通过 interview 打磨计划而不是阅读，使用 [grilling](https://aihero.dev/skills-grilling)；若要通过 throwaway code 探索要 build 什么，使用 [prototype](https://aihero.dev/skills-prototype)。

## Delegated legwork

核心动作是让阅读由 **background agent** 执行。你继续工作；它离开当前 thread，把每个 claim 追溯到 primary source，并把一个带引用的 Markdown 文件放到 repo 惯用的 notes 位置。Research 是你委派的 legwork，不是你外包的 thinking；你拿回的是一份可反应、可 grill、可 plan 的文档，以及它附带的 sources。

## Where it fits

这是 reach-for-it-anytime standalone，会为 thinking skills 提供输入：它产出的文件可以被 grill、plan 或 design 使用。因此它位于 [grilling](https://aihero.dev/skills-grilling) 和 [to-spec](https://aihero.dev/skills-to-spec) 这类 work 的上游，而不在 build chain 中。整套 map 见 [ask-matt](https://aihero.dev/skills-ask-matt)。
