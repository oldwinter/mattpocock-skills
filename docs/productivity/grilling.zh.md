Quickstart:

```bash
npx skills add oldwinter/mattpocock-skills --skill=grilling
```

```bash
npx skills update grilling
```

[Source](https://github.com/oldwinter/mattpocock-skills/tree/main/skills/productivity/grilling)

## What it does

`grilling` 是在 build 前 stress-test plan 或 design 的 relentless interview。它沿 decision tree 逐 branch 向下走，一次解决一个 decision dependency，直到你和 agent 拥有同一份 understanding。

它 **一次只问一个问题**，并在下一个问题前等待你的回答；绝不抛出 bulk list，因为那会让人迷失。每个问题都带 agent 自己的 recommended answer；任何 codebase 能 settle 的问题，它会探索而不是问你。在你确认 shared understanding 已达成前，它不会开始执行计划。

## When to reach for it

输入 `/grilling`，或当任务匹配时 agent 自动触达。它是 underlying primitive，不只是 user-only entry point。

当 plan 或 design 仍有 soft spots，需要在 code 写下前浮现它们时使用它。实践中你通常通过两个 wrappers 调用它，而不是直接用名字：plain grilling session 使用 [grill-me](https://aihero.dev/skills-grill-me)；希望 session 同时写 ADRs 和 glossary 时使用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)。

## The decision tree

Mental model 是 **decision tree**：每个 plan 都分叉为 decisions，而 decisions 之间有依赖。`grilling` 一次走一个 node，所以早期答案会重塑后续问题。正因如此，问题按依赖顺序单个到达；并行问题的 firehose 会丢失让 interview 收敛到 shared understanding 的结构。

## Pulled out on purpose

`grilling` 是 interview technique 的 **single source of truth**，作为 model-invoked **primitive** 拆出，因此每个需要 interview 的 skill 都能触达它，而不用重新发明。[grill-me](https://aihero.dev/skills-grill-me) 和 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 是两个 user-invoked front doors，但 [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 和 [triage](https://aihero.dev/skills-triage) 也依赖它来 pressure-test 自己的 decisions。

把 technique 放在一个地方，也意味着当你只想要 interview，而不想要 ADR-writing 或 Issue-shaping 时，可以直接触达它。

## Where it fits

`grilling` 是 main build chain 下方的 interview **primitive**：[grill-with-docs](https://aihero.dev/skills-grill-with-docs) 运行它来 sharpen context，然后 [to-spec](https://aihero.dev/skills-to-spec) 写 spec。无法确定哪个入口合适时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
