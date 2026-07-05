Quickstart:

```bash
npx skills add mattpocock/skills --skill=to-prd
```

```bash
npx skills update to-prd
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-prd)

## What it does

`to-prd` 会把当前 conversation 和你对 codebase 的理解转成 product requirements document，然后发布到 Issue tracker。

它 **不会**再次 interview 你。到你触达它时，alignment work 已完成；`to-prd` synthesize 已知内容，而不是开启新一轮问题。

## When to reach for it

你通过输入 `/to-prd` 调用它，agent 不会自行触达它。

当 change 已经讨论清楚、domain language 已 settled，并且你想在任何 code 写下前把 shared understanding 写成 spec 时使用它。如果还没有 aligned，先 grill，使用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)。要把完成的 PRD 拆成 Issues，使用 [to-issues](https://aihero.dev/skills-to-issues)。

## Prerequisites

`to-prd` 会发布到 Issue tracker，因此必须先由 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 配置此 repo 的 tracker 和 triage labels。它会自行应用 `ready-for-agent` label，不需要单独 triage pass。

## What the PRD includes

- **Problem statement**：什么 broken 或 missing，以及为什么值得解决，使用项目自己的 vocabulary。
- **Solution**：高层 fix shape，先于任何 implementation detail。
- **User stories**：具体 behaviours 的 extensive numbered list，每条都 independently checkable。
- **Implementation decisions**：conversation 中已经 settled 的 choices，避免之后重新争论。
- **Testing decisions**：feature 要测试的 seams，以及 “done” 的含义。
- **Out-of-scope items**：这个 change 刻意不覆盖的内容，用来保持 Issue bounded。
- **Further notes**：其他值得带入后续、但不适合上述 sections 的内容。

## Deep modules

写 PRD 前，`to-prd` 会 sketch feature 将在哪些 **seams** 上测试，并寻找 **deep module** opportunities，即大量功能隐藏在小而稳定的 interface 后。它偏好 existing seams 而不是 new seams，并倾向于最高的 seam，理想情况下整个 change 只有一个。

这对 agentic development 很重要：好的 interface 让 tests 有 durable target，因此底层 code 可以改变而 tests 不动。

## It's working if

- 它直接开始写 PRD，而不是重新问你一轮问题。
- 它在写作前与你确认 seams，并尽量提出少量 seams。
- PRD 使用你项目的 domain vocabulary，而不是 generic boilerplate。

## Where it fits

`to-prd` 是 main build chain 的一步：

```txt
grill-with-docs -> to-prd -> to-issues -> implement -> code-review
```

在 plan 和 domain language resolved 后、将 work 拆成 implementation Issues 前使用它。关键邻居是 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，它打磨 context 让 PRD 精确；以及 [to-issues](https://aihero.dev/skills-to-issues)，它把 PRD 转为可独立领取的 Issues，供 [implement](https://aihero.dev/skills-implement) 构建。无法确定该用哪个 skill 或 flow 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
