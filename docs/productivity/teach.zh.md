Quickstart:

```bash
npx skills add mattpocock/skills --skill=teach
```

```bash
npx skills update teach
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/productivity/teach)

## What it does

`teach` 会把当前 directory 变成长期教学 workspace，并跨多个 sessions 教你一个 topic：设计短小、漂亮、interactive 的 lessons，并与 *你为什么想学* 绑定。

它 **不会**从 model 自己的 memory 教学。Parametric knowledge 被视为不可信；在能教之前，它会收集 high-trust resources，并让每个 claim 都基于 citation。它也是 stateful 的：workspace 记住你已经学过什么，所以每个 session 从上次继续，而不是从零开始。

## When to reach for it

你通过输入 `/teach` 调用它，agent 不会自行触达它。

当你想要随时间 *学习* 一个 topic 时使用它：语言、framework、瑜伽、theoretical physics，并且希望 sessions 积累而不是消散。它不适合一次性解释；如果只是临时澄清，直接问即可。当 learning 是一个 project 时，使用 `teach`。

## Prerequisites

`teach` 会就地构建整个 directory，所以请在你愿意保留为 dedicated workspace 的位置运行。随着时间它会写入：

- `MISSION.md`：你学习这件事的原因，是其他一切的根。如果为空，`teach` 的第一项工作就是问到它不为空。
- `RESOURCES.md`：它用于教学的 vetted、high-trust sources。
- `./lessons/*.html`：编号、自包含的 lessons，是 primary unit of teaching。
- `./reference/*.html`：你会回看的 compressed cheat-sheets、algorithms、glossaries。
- `./learning-records/*.md`：你已经学会的内容，ADR-style，用于判断下一步教什么。
- `./assets/*`：reusable components，首先是 shared stylesheet，让 lessons 像同一门课程。
- `NOTES.md`：你的 teaching preferences。

## Mission, and the zone of proximal development

每节课都挂在 **mission** 上。没有它，knowledge 没有附着点，lessons 会变得抽象。因此 mission 是 `teach` 首先钉住、并随你成长持续更新的东西。它会根据 mission 和 learning records 计算你的 **zone of proximal development**：下一课应该 *刚好足够* 挑战你，不能更多。

## Storage strength, not fluency

要记住的词是 **storage strength**，也就是长期保持；它的对立面是 **fluency**，即当下 recall 的顺畅感，看起来像 mastery，但不是。`teach` 通过 desirable difficulty 刻意构建前者：retrieval practice、spacing、interleaving。Knowledge 先被讲授（此时 difficulty 是敌人），skills 再通过 tight feedback loop drill（此时 difficulty 是工具）。

## Where it fits

`teach` 是 reach-for-it-anytime standalone：你逐 session 驱动的长期 learning project，而不是 build chain 中一步。它与其他 productivity skills 不共享 workflow；它拥有自己的 workspace directory 并在那里生活。无法确定该用哪个 skill 或 flow 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
