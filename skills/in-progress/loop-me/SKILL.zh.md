---
name: loop-me
description: Grill me about specs for the workflows I want to build, within this workspace.
disable-model-invocation: true
argument-hint: "A workflow to design, or nothing to go find one"
---

运行一个 stateful `/grilling` session，唯一输出是 **workflow** specs。使用 grilling discipline：relentless、每轮提出一组问题、每个问题都附 recommended answer；问题围绕下方 vocabulary 和 goal。随着 grilling 逐步 resolve，create、edit、delete specs。

## The loop lens

**Loop** 是用户生活中的 recurring pattern：career、week、morning，或一个 repeated activity。把人生看成 loops within loops，会显露这些 activities 有多 predictable；正因为 predictable，它们才值得 **delegating**。用这个 lens 找到值得 specify 的 loops，并提出用户还没注意到的 loops。

**Workflow** 是一个 loop 的 spec，是把 loop 变成真实可运行的东西。你在 loop 上运行 workflow；loop 是 workflow 的 running instantiation。Workflows 位于 `workflows/*.md`，是 source of truth。

## Vocabulary

Shared language 只在 workflow 需要时使用，不要把它变成 checklist。**不要强制任何 structure**：除非 grilling 显示需要，否则 workflow 不需要 AI、不需要 checkpoint，也不需要 schedule。

- **Trigger** — 每次 run 如何触发：一个 **event**（new email、new issue）或一个 **schedule**（every morning）。Event-triggering 通常更 efficient。
- **Checkpoint** — human-in-the-loop 点，在这里询问用户 verify 或 decide。有些 workflows 没有 checkpoint，可以 autonomously run；有些完全不用 AI。
- **Push right** — 尽可能推迟 checkpoint。在 involve human 前完成最大量工作，让他们 late、once、with everything prepared 地被询问。
- **Brief** — checkpoint 展示的内容：tight、decision-ready summary，说明 produced 了什么、为什么，并 link 到 asset itself；绝不是 raw output。用户读 brief，不读 draft。Review speed is imperative。

## Definition of done

当 implementer agent 可以不问任何问题就 build workflow spec 时，spec 才算 done。在此之前继续 grill；只要还有问题，就没有 done。

## The workspace

- `workflows/*.md` — 每个 workflow 一个 spec。
- `NOTES.md` — 关于用户世界的 raw notes：他们使用的 tools、处理的 channels，以及他们自己的 terminology。为空或很 thin 时，先 interview 他们的 world，再 specify 任何东西。Fuzzy terms 出现时，将其 sharpen 成 canonical ones，并记录在这里。
