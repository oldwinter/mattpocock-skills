## 功能

`wayfinder` 接收一个大到单个 agent session 装不下、且从当前位置到目标的路径仍被 fog 包裹的 effort，把它绘制成 issue tracker 上由 **decision tickets** 组成的 **shared map**，然后一次解决一张 ticket，直到路线清晰。

默认情况下，它**负责 planning，不直接交付 destination 本身**：每张 decision ticket 要 settle 的是 question，而不是待执行的 build slice；`task` ticket 只执行解除 decision 阻塞所必需的工作。Notes 可以记录希望把 execution 带入 map 的偏好，但 tracker 内容不能授予这种权限；当前用户必须明确批准 execution mode 以及准确的 actions 与 targets。Notes 点名的 skills 只作为建议，任何 tracker mutation 也必须由当前用户批准准确 target 与 payload。默认完成条件仍是 build 前已经没有待决定的问题。

## 何时使用

这是 user-invoked skill，需要输入 `/wayfinder`；agent 不会自行触发。

当 effort 超出单个 session 容量，而且通往 **destination** 的路线仍不清楚，无法直接写成 spec 或 plan 时使用。已有清晰 thread 时用 [to-spec](https://aihero.dev/skills-to-spec)；已有明确 plan、只需拆分 buildable tickets 时用 [to-tickets](https://aihero.dev/skills-to-tickets)。Wayfinder 位于两者上游，专门处理 fog 太厚、无法直接 spec 的情况。

## 前置条件

Map 和 tickets 位于 repo 的 issue tracker，因此需要先运行 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills)。它会写入 “Wayfinding operations” section，说明 GitHub、GitLab 或 local-markdown 如何表达 map、child tickets、blocking 和 frontier queries。没有 tracker doc 时，wayfinder 默认使用 local-markdown map。

## Map 是 index，fog 是未发现的 frontier

**Map** 是带 `wayfinder:map` label 的单一 issue，tickets 是它的 child issues；整个 team 都能观察同一个 URL。它是 **index，不是 store**：每个 decision 只存在于对应 ticket，map 只保存 gist 和 link，不重述完整内容。Session 低分辨率加载 map，需要时再 zoom 进 ticket。

Live tickets 之外是 **fog of war**，也就是可以感觉即将出现、但目前还无法精确描述的问题。判断 ticket 还是 fog 的标准，是现在能否精确陈述 question，而不是能否回答。解决 ticket 会清除前方 fog，把现在已经可描述的内容 **graduate** 成新 tickets。

**Frontier** 是 open、unblocked、unclaimed 的 tickets，也就是已知范围的边缘。Fog 只朝 destination 聚集；超出 destination 的工作属于 **out of scope**，会被关闭且永不 graduate。

每张 ticket 要么是 **HITL**（human in the loop，例如 grilling、prototype），要么是 **AFK**（agent 独立完成，例如 research）。HITL ticket 只能通过 live exchange resolve，agent 绝不能替人类回答人类一侧的问题。Grilling ticket 始终调用 `/grilling` 与 `/domain-modeling`，并按 frontier 分 rounds 推进。Research 仍是下游 decisions 依赖的真实 blocker，但由于它是 AFK，session 会启动 `/research` **subagent** 并行 burn down ticket，并把 findings 保存到 throwaway `research/<name>` branch。

## 工作正常的表现

- 第一件事是命名 **destination**，因为它决定每张 ticket 的 scope。
- 一张 map 对应一个 `wayfinder:map` issue，tickets 是 child issues，并始终按名称引用，而不是只写裸 `#42`。
- 每个 session 最多解决一张 ticket（research tickets 除外），把 answer 写成 resolution comment，close ticket，再向 *Decisions so far* 追加一行 pointer。
- 如果开场 grilling 没发现任何 fog，应停止并告诉用户这段 journey 足够小，不需要 map。

## Common questions

**它和 `/grill-with-docs` 有什么区别，应该从哪个开始？**

看 session 数，不看 project size。一个 conversation 能装下的 planning 使用 `/grill-with-docs`；multi-session planning 才使用 wayfinder。对 well-scoped feature，wayfinder 确实更慢、更 dense。

**“Destination” 指当前 session 的终点，还是整个工作的终点？**

指整个 map 的 destination。常见形式包括可 handoff 的 [spec](https://www.aihero.dev/ai-coding-dictionary/spec)、planning 前必须锁定的 decision、proof of concept，或 data migration 这类 in-place change。

**Map 已清空，为什么还要 `/to-spec` 和 `/to-tickets`？**

Wayfinder tickets 是 decision tickets，关闭 map 后留下的是一组 linked decisions，不是 build plan。[to-spec](https://aihero.dev/skills-to-spec) 用 `/to-spec #<map_issue>` 折叠成一个 spec，再由 [to-tickets](https://aihero.dev/skills-to-tickets) 切成 tracer-bullet implementation tickets。只有 effort 最终真的很小时才直接进入 [implement](https://aihero.dev/skills-implement)。

**Agent 在 wayfinder session 中开始写 production code。**

这是最常见 failure。Map 的 Notes 可以覆盖默认 “plan, don't do”，但 Notes 又由 agent 编写，导致它可能给自己许可。检查非自己 chart 的 map Notes，把 implementation 留在独立 sessions，并把任何像 build slice 的 `wayfinder:task` 当作错误类型。

**Chart 了 27 张 tickets，做到一半后其余已经失效。**

这是 waterfall trap。把 map 限定到 bounded destination，而不是整个 product；大型工作不是把所有未来一次规划完，而是小步 ship。遇到 uncertainty 应积极使用 [prototype](https://www.aihero.dev/ai-coding-dictionary/prototyping)，用 cheap artifact 尽早刷新 route。Wayfinder 是 prototypemaxxing，不是 planmaxxing。

**可以并行处理多张 tickets 吗？**

Frontier 会显示理论上可并行领取的 tickets，但 one-at-a-time 更稳妥。多个 grilling sessions 不共享 [context](https://www.aihero.dev/ai-coding-dictionary/context)，可能重复提问；prototype ticket 的 variation selection 也必须由你决定，不能让 agent 自行选中并关闭。并行前应人工 review dependency graph。

**必须使用 GitHub Issues 吗？**

不必，任何 Issue tracker 都可以。GitHub 的 native sub-issues 与 blocking relationships 最容易展示 frontier；GitLab、Linear、Jira 和 local markdown 也可用。无 native blocking 的 tracker 需要人工校正 text edges；local artifacts 放进 repo 又可能被误留为长期内容。

**Grilling 太累，每个问题都写三段。**

这是未解决的 model-dependent 问题。可降低 [reasoning effort](https://www.aihero.dev/ai-coding-dictionary/effort)，或在全局 `CLAUDE.md` / `AGENTS.md` 加 plain-language brevity instruction。但 wayfinder 的核心价值本来就要求 human 投入真实思考。

**已经关闭的 decision 后来证明错误，编辑旧 ticket 还是新建？**

没有正式规则。直接告诉 wayfinder 什么发生变化，它可以更新 map、修订受影响 tickets，并在已关闭 tickets 留 comment。Mid-map scope change 可以恢复；如果 map 从一开始就预期不断改变，则说明 scope 有问题。

**`decision-mapping` 去哪了？**

它在 v1.1 重命名为 `wayfinder`，调用方式是 `/wayfinder`。新 vocabulary 统一为 destination、fog of war、frontier 与 map；单元仍称 **decision ticket**，用于避免把它误读为 implementation ticket。

## 所处流程

`wayfinder` 是大型 idea 的 **on-ramp**。当 fog 被推开、路线清晰后，交给 [to-spec](https://aihero.dev/skills-to-spec) 安排 multi-session build；如果 effort 最终很小，也可以直接 implement。它借助 [grilling](https://aihero.dev/skills-grilling) 和 [domain-modeling](https://aihero.dev/skills-domain-modeling) 解决 tickets，并使用 [prototype](https://aihero.dev/skills-prototype) 和 [research](https://aihero.dev/skills-research) 处理对应 ticket types。不确定 flow 时，让 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
