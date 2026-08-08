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

## Common questions

**Files 会写到哪里？我的内容跑进了 `~/.claude/skills`。**

这是 [issue #377](https://github.com/mattpocock/skills/issues/377) 的 open bug。`SKILL.md` 同时用 `./` 指 skill 自带 templates 和用户 workspace；agent 可能把后者也解析到安装目录。开始时明确指定 workspace path，并在第一课后检查 `lessons/` 实际落点。

**每节课都留在同一 session，还是开新 session？**

三种都可：同一 session 继续、在新 session 重新调用 `/teach`，或在相同 folder 开 fresh session。每节 lesson 是独立 invocation，连续性来自 folder，不是 conversation。

**怎样确认它没有编造知识？**

不能只凭 skill 保证，必须检查 primary sources。`RESOURCES.md`、每课 citations 与推荐 source 的作用是降低 verification 成本，不是取消 verification。Procedural domain 与精确 notation 风险最高；能直接运行的 code 等可观测输出风险较低。

**Quiz 正确答案总在第一个位置。**

这是多个 models 都复现、仍未修复的问题。当前 rule 只要求 options 字数相同，没解决 position bias；instruction-level shuffling 也未必有效。可在自己的 `assets/` 中加入 render-time shuffle component，暂时不要把答案位置当作信号。

**它假设我已经懂某些内容，又使用未定义术语。**

当前没有正式 assessment step，第一 session 也没有 learning records。开始时明确写出 prior knowledge 与 gaps；lesson level 不对时当场纠正，correction 会进入 learning record 并影响下一课。显式 knowledge assessment 仍是 [feature request #725](https://github.com/mattpocock/skills/issues/725)。

**支持 spaced repetition 吗？知道何时停止教学吗？**

前者没有 scheduler，后者也不可靠。Spacing 与 interleaving 是设计原则，但没有 Anki/calendar integration；skill 更擅长生成 next lesson，不一定会主动切换到 review 或 real practice。需要时应显式要求 review/drill 或停止。

**只适合学习 code 吗？**

不是。语言、音乐、board game design、film plot、认证考试、儿童 printable books 等都可用。Mission、resources、zone of proximal development 与 drill 不依赖 programming。Coding 中特别适合熟悉陌生 codebase 或新 team stack。

**应该使用哪个 model？**

没有唯一答案，reported differences 很大。更高 [reasoning effort](https://www.aihero.dev/ai-coding-dictionary/effort) 通常产生更完整 lessons；同一 skill 在不同 [harness](https://www.aihero.dev/ai-coding-dictionary/harness) 可能从完整课程退化成很短 HTML card。Output 太薄时，先换 model、harness 或 effort，再考虑重写 prompt。

## Where it fits

`teach` 是 reach-for-it-anytime standalone：你逐 session 驱动的长期 learning project，而不是 build chain 中一步。它与其他 productivity skills 不共享 workflow；它拥有自己的 workspace directory 并在那里生活。无法确定该用哪个 skill 或 flow 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
