## 功能

`to-tickets` 会把 plan、spec 或当前 conversation 拆成一组 **tickets**。每张 ticket 都是 tracer-bullet vertical slice，并明确声明哪些 tickets 会 block 它，然后发布到已配置的 tracker。

Tracer bullet 是贯穿 schema、API、UI、tests 等 integration layers 的狭窄**垂直切片**，不是单独完成某一层的水平切片。完成后的每个 slice 都能独立 demo 或 verify，因此可以安全交给一个 agent。

## 何时使用

这是 user-invoked skill，需要输入 `/to-tickets`；agent 不会自行触发。

当已有 agreed plan 或 written spec，需要拆成 tickets 时使用。可以直接使用当前 conversation，也可以传入 spec 或 issue reference；skill 会先读取 body 与 comments。如果尚未形成 spec，先运行 [to-spec](https://aihero.dev/skills-to-spec)。

## 前置条件

`to-tickets` 会发布到 issue tracker，因此必须先用 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 配置 tracker 和 triage label vocabulary。在真实 tracker 上发布时，它会应用 `ready-for-agent` label。

## 同一 artifact 的两种运行方式

Blocking edges 是核心。根据 tracker，同一组 tickets 有两种读取方式：

- **Local files**：每张 ticket 是 `.scratch/<feature>/issues/` 下的一个独立文件，按 blockers-first 编号，edges 以文本记录；由人保持在环并从上到下处理。
- **真实 tracker（GitHub、Linear）**：每张 ticket 是一个 issue，edges 使用原生 blocking links 或 sub-issues；所有 blockers 已完成的 ticket 都位于 **frontier**，可以被领取，因此多个 agents 能并行工作。

Edges 始终属于 ticket；medium 只决定是否会并行执行。`to-tickets` 负责产出 artifact，顺序手动执行还是并行 fleet 由你决定。

## 垂直切片，而不是水平切片

水平切片只交付某一层，例如全部 schema 或全部 API；在所有层完成前没有任何行为可用。垂直 tracer bullet 则一次贯穿每一层，因此完成后立即可以 demo。

拆分前，`to-tickets` 会寻找 prefactoring opportunities，也就是 “make the change easy, then make the easy change”，并把这些工作排在前面。发布前，它会与你确认 granularity、blocking edges 以及需要 merge/split 的 tickets，并展示准确的 tracker target、完整 issue bodies、labels、relationships 和任何 prototype excerpt；payload 有变化时必须重新确认。发布时 blockers 优先，使每个 “Blocked by” 能引用真实 ticket。

## Wide-refactor 例外

**Wide refactor** 是 tracer-bullet rule 的例外：一次机械性 change（如 rename column、修改 shared symbol type）会把 blast radius 扩散到整个 codebase，无法让单个 vertical slice 保持 green。

此时使用 **expand–contract**：先 expand，在 old form 旁加入 new form；再按 blast radius 分批 migrate callers，每批一张 ticket，旧形式仍存在，因此 CI 持续 green；最后 contract，在所有迁移完成后删除 old form。如果连单批迁移也不能独立 green，则共享 integration branch，并由所有批次 block 最终 integrate-and-verify ticket，只在最后恢复 green。

## Common questions

**三行 change 却生成了十二张 tickets。**

Over-decomposition 是最常见 friction，[model](https://www.aihero.dev/ai-coding-dictionary/model) 容易默认 atomic units，丢掉有意义 grouping。Quiz step 正是用来要求 merge。更根本的 floor 是：整个 change 若装得进一个 context window，就不需要本 skill，直接进入 [implement](https://aihero.dev/skills-implement)。

**Tickets 按 layer 拆了：一张 schema、一张 API。**

这是 vertical-slice rule 要避免的 failure。Quiz 时逐张问：“完成后能 demo 什么？”没有答案就是 horizontal slice。可在每张 ticket 加 “demo path”，促使 model 形成贯穿各层的 decomposition。

**GitHub tickets 没有成为 spec Issue 的 sub-issues。**

这是 [issue #554](https://github.com/mattpocock/skills/issues/554) 的已知问题，在 Codex 上更常见。`gh` 已支持 `gh issue create --parent <n>`，也可事后运行 `gh issue edit <parent> --add-sub-issue <n>`。模板修复前，手工补 parent links 最可靠。

**“Blocked by” 只写进 body，没有 native blocking link。**

同类问题记录在 [issue #513](https://github.com/mattpocock/skills/issues/513)。GitHub 支持 `gh issue create --blocked-by 12,15`；因为 blockers 先发布，创建 downstream Issue 时已有编号。Body text 应只作为不支持 native edge 的 tracker fallback。

**Local tickets 在哪里？v1.1 notes 说 root `tickets.md`。**

旧说明是 bug。Local mode 现在按 dependency order 写入 `.scratch/<feature-slug>/issues/<NN>-<slug>.md`，每张 ticket 一个文件，避免 parallel write race；`NN` 也是可传给 `/implement 03` 的真实 ID。

**读取 spec 时一直 truncation。**

Very large tracker Issue 可能无法一次完整返回，又没有 local copy fallback。不要在 `/to-spec` 与 `/to-tickets` 之间 [clear](https://www.aihero.dev/ai-coding-dictionary/clearing) 或 [compact](https://www.aihero.dev/ai-coding-dictionary/compaction)；在同一 context window 连续运行。

**Acceptance criteria 什么都没检验，甚至 base commit 已经通过。**

逐条命名“什么 observation 会让它失败”，并确认从 implementer 起始 commit 看确实是 red。常见坏形状是 base commit 已满足、只能由 sibling ticket 满足，或只是重复 request 而非从 artifact 导出。正确 vertical slice 通常会自然避免这些问题。

**Tickets 发布后，实际怎样执行？**

Skill 在 artifact 处结束，没有 auto-dispatch。查看 board，数出所有 open blockers 为空的 frontier tickets，打开同样数量的 fresh agent sessions，每个 session 一张。注意 [implement](https://aihero.dev/skills-implement) 不保证关闭或勾选 ticket，最终 state 需要你更新。

## 所处流程

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

它位于 [to-spec](https://aihero.dev/skills-to-spec) 和 [implement](https://aihero.dev/skills-implement) 之间。每个 fresh context 只处理 frontier 上的一张 ticket，并在 tickets 之间清理 context。不确定 flow 时，让 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
