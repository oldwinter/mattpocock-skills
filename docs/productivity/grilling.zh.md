## What it does

`grilling` 是在 build 前 stress-test plan、decision 或 idea 的 relentless interview。它把问题映射成 **design tree**，再按 **rounds** 推进：每轮询问当前 **frontier**，也就是 prerequisites 已 settled、此刻可以回答的所有 decisions，然后等待用户回答并重新计算下一轮 frontier。

Facts 由 agent 负责查找，decisions 才交给用户。需要 environment fact 时，它 dispatch sub-agent 去探索，但只让依赖该 fact 的 branch 等待；当前 frontier 其余问题继续提出。在用户确认 shared understanding 前，它不会开始执行。

## When to reach for it

输入 `/grilling`，或当任务匹配时由 agent 自动触达。它是 model-invoked primitive；实践中通常通过两个 wrappers 使用：plain session 用 [grill-me](https://aihero.dev/skills-grill-me)，希望同时维护 ADRs 和 glossary 时用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)。

当 plan/design 仍有 soft spots、需要在 code 写下前暴露所有 silently assumed branches 时使用。它不负责执行决定，也不用于询问 agent 可以自行查到的 facts。

## The design tree

每个 decision 都会分叉出依赖它的后续 decisions。只有 prerequisites 已 settled 的 nodes 才进入本轮 frontier；如果一个问题依赖本轮另一个 open answer，它必须留到下一轮。

每个问题编号、带明确 title 和 agent 的 recommended answer。整轮回答会改变 tree，再把 frontier 向外推进。完成标准不是“问了很多”，而是 frontier 为空：每条 branch 都已访问，没有 silent assumption。

## It's working if

- 每轮只包含当前 prerequisites 已 settled 的 questions。
- 每个 question 都有编号、title 与 recommended answer。
- Agent 自行探索 facts，不把可查问题转交给用户。
- 一个 branch 等待 sub-agent 时，其他 frontier questions 仍继续。
- Frontier 为空且用户确认 shared understanding 后才结束。

## Common questions

**可以改回一次只问一个问题吗？**

可以，在全局 `CLAUDE.md` / `AGENTS.md` 加：

```
When grilling, ask one question at a time.
```

Round-based default 确实存在争议。慢速阅读、使用第二语言或需要 sequential focus scaffolding 的人可能更适合 one-at-a-time，这个 opt-out 是正式支持的。

**`/batch-grill-me` 去哪了？**

Round-based questioning 曾短暂作为单独 skill，随后并入 `grilling` primitive，因此 `grill-me`、`grill-with-docs`、`triage` 与 `wayfinder` 同时获得该行为。没有需要安装的 `batch-grill-me`，也没有独立 sequential skill；使用上面的全局 instruction 即可恢复。

**一整轮同时提问，不会漏掉前面答案引出的后续问题吗？**

Frontier 正是答案：一轮只包含彼此不依赖的 questions，所以本轮任何回答都不会让同轮另一个问题失效。Answers 仍会重塑 downstream tree，下一轮会重新计算，而不是预先写死。

**问题问完后，它直接开始 build。**

Frontier 为空还不算完成，必须由你确认 shared understanding。较弱或低-effort [models](https://www.aihero.dev/ai-coding-dictionary/model) 仍可能把“持续 interview”压缩成几个问题加 outline；可在自己的 agent docs 明确禁止未获许可开始 implementation。

**它替我回答了自己的 questions。**

这是 run bug，不是设计行为，常见于另一个 skill 在 “resolve this ticket” frame 内调用 `grilling`，surrounding task 被误读成继续推进许可。因此没有 async mode：无人回答的 grilling session 只产出 agent opinion，不是用户 decisions。

**可以限制问题总数吗？**

不能，固定 cap 会截断 hard case，也会在 easy case 显得任意。应使用 plain language steering：要求 wrap up，或停止并接受当前 plan。特别长通常说明 scope 太大，应拆开后分别 grill。

**只安装 `grill-me` 后没有反应。**

`grill-me` 的主体只是“运行 `/grilling` session”，因此也必须安装本 primitive。`grill-with-docs` 还依赖 [domain-modeling](https://aihero.dev/skills-domain-modeling)。Selective install 必须一起选择 dependencies；整套安装可避免遗漏。

**`grill-with-docs` 运行了，却没有加载 `grilling`。**

这是跨 [harnesses](https://www.aihero.dev/ai-coding-dictionary/harness) 与 models 的已知 rough edge：skill 提到另一个 skill 并不保证后者实际加载。一次抛出全部问题、没有 recommendations，通常表示 model 在 improvising。直接询问是否加载 `grilling` 与 `domain-modeling` 往往能恢复。

## Where it fits

`grilling` 是 main build chain 下方的 interview **primitive**。[grill-me](https://aihero.dev/skills-grill-me) 与 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 是两个 user-facing front doors；[triage](https://aihero.dev/skills-triage)、[wayfinder](https://aihero.dev/skills-wayfinder) 与 [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 也会在内部调用它。无法确定入口时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
