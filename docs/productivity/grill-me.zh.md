## What it does

`grill-me` 接收一个 **模糊想法**，持续追问，直到其中形成真正的 decisions。开始时不需要已有完整 plan；产出 plan 正是这次 [session](https://www.aihero.dev/ai-coding-dictionary/session) 的目的。它按 **轮次** 提问：每轮覆盖完整 **frontier**，也就是 prerequisites 已经解决的全部问题，因此不会在尚未获得前置答案时追问下游问题。

它是 **[stateless](https://www.aihero.dev/ai-coding-dictionary/stateless)** 的：不写文件，也不留下 workspace。它唯一留下的是你脑中更清晰、更可辩护的想法。

## When to reach for it

输入 `/grill-me` 调用；[agent](https://www.aihero.dev/ai-coding-dictionary/agent) 不会自行触达。应在一个 **fresh conversation** 中开始，而不是叠在 agent 已经写好的 plan 上。

只要一个想法值得认真对待，就可以使用：feature、产品方向、商业决策或文章都可以，而且越早越好。模糊不是等待的理由，正是 session 要处理的材料；如果你已经能精确描述它，就不需要再 grill。

三个 grilling skills 的选择取决于眼前材料：

- **任何主题、任何环境**：使用 `grill-me`。它不需要 repo、不写文件，主题也不必是 code。
- **需要与 codebase 对齐**：使用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)。它执行同类 interview，但属于 [stateful](https://www.aihero.dev/ai-coding-dictionary/stateful) flow，会读取 code 并把结论写入 `CONTEXT.md` 和 ADRs。
- **单个 session 装不下**：使用 [wayfinder](https://aihero.dev/skills-wayfinder)。它先把大型 effort 画成 map，再在其中运行多次 grilling session。

关闭 [plan mode](https://www.aihero.dev/ai-coding-dictionary/agent-mode)。Plan mode 会促使 agent 尽快产出 plan，与持续 inquiry 的目标相反。

## 这是 conversation，不是单向 interview

Skill 负责提问，但 **scope 由你掌控**。这一点决定 session 是把想法变成 decisions，还是只产出自信但空洞的内容。

常见失败模式是 **passivity**：对四十个问题连续回答“同意”，最后得到一份 agent 写、你只点头的 plan。过程很长，看起来很 productive，但其实没有作出 decisions，结论的确定性也没有依据。

主动参与意味着 steering：问题低于所需 fidelity 时要反驳；scope 漂移时要指出；不知道时就明确说“不知道”。这个 skill 用来帮助 engineer，不是替代 engineer；结果质量取决于回答质量，而不是问题数量。

另一种相反的错误虽然更少见，但同样真实：一直停在 interview，永远不开始 code。

## 可 grill 与不可 grill 的问题

有些问题可以靠对话回答，有些不行，再多追问也不会产生答案。

“一个长表单还是三页？”、“这个 interaction 应该是什么感觉？”都属于 **不可 grill** 的问题，需要先看到东西。遇到这种问题时停止 grilling，用 [prototype](https://aihero.dev/skills-prototype) 做 throwaway version，实际观察后再回来用一句话回答。

试图纯靠对话解决不可 grill 的问题，会让 session 不断膨胀：agent 反复换说法，你不断猜测，scope 最终填满全部 uncertainty。

## It's working if

- 你曾经明确反对某个建议；完全没有 pushback 的 session 通常没有必要。
- 问题以少数几轮出现，而不是一条条滴出；后续轮次明显建立在前面的回答上。
- 你最终到达了原先没预料的位置，因为某个问题暴露了之前隐式作出的 decision。
- 结束时，你可以向没参与 session 的人解释并捍卫每个选择。

## Common questions

**通常会有多少问题，何时结束？**
数轮次，不数问题。四轮共四十六个问题很正常。Frontier 为空时结束：所有 branch 都已访问，没有沉默的假设。

**它问了两百个问题，哪里出错了？**
通常是 scope 太大。先让 agent 拆成较小部分，再分别 grill。超长 session 也会进入 **[dumb zone](https://www.aihero.dev/ai-coding-dictionary/smart-zone)**：当 [context window](https://www.aihero.dev/ai-coding-dictionary/context-window) 过满时，问题质量会下降。

**可以恢复成一次一个问题吗？**
可以。在全局 `CLAUDE.md` 中加入：

```
When grilling, ask one question at a time.
```

**如果我真的不知道答案呢？**
直接说“不知道”。这是有效答案；无法回答的问题通常说明应该先 prototype，而不是猜。

**写 spec 前要开新 session 吗？**
不要。这个 session 的价值就是刚刚建立的 [context](https://www.aihero.dev/ai-coding-dictionary/context)。直接在同一 conversation 中调用 [to-spec](https://aihero.dev/skills-to-spec)。

**Model 重要吗？**
比多数 skills 更重要。Grilling 依赖 [model](https://www.aihero.dev/ai-coding-dictionary/model) 对系统失效方式的判断，因此应使用最强 model；implementation 更依赖既有 context，通常可以容忍更便宜的 model。

## Where it fits

`grill-me` 是 **可在任何地方、针对任何主题运行的 standalone**。Stateless 使它具备 portability：不需要 repo、workspace 或 setup，也不假定主题与软件有关。它可以用于商业决策、写作和下一步选择。

这正是它和 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 的差异：后者运行同类 interview，但会读取 codebase，并把结论记录到 `CONTEXT.md` 与 ADRs。两者都建立在 [grilling](https://aihero.dev/skills-grilling) primitive 上；`grill-me` 是 user-invoked、且不携带任何状态的入口。

如果 grill 的内容最终是软件工作，可以在同一 conversation 中交给 [to-spec](https://aihero.dev/skills-to-spec)，继续 build flow；这只是可选后续，不是 skill 本身的目的。不确定该用哪条 flow 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
