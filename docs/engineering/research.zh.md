## What it does

`research` 通过阅读拥有答案的 sources 来回答问题，并留下一个带引用的 Markdown 文件。它只使用 **primary sources**，例如官方文档、source code、specs、first-party APIs，不使用二手文章，因此保存下来的内容能追溯到权威来源，而不是 summary of a summary。

## When to reach for it

输入 `/research`，或当任务变成阅读工作时由 agent 自动触达。

当下一步是 *弄清一件事* 时使用它：API 实际如何表现、spec 到底怎么说、某个 claim 是否成立，并且你不想让当前 thread 卡在阅读上。若要通过 interview 打磨计划而不是阅读，使用 [grilling](https://aihero.dev/skills-grilling)；若要通过 throwaway code 探索要 build 什么，使用 [prototype](https://aihero.dev/skills-prototype)。

## Delegated legwork

核心动作是让阅读由 **background agent** 执行。你继续工作；它离开当前 thread，把每个 claim 追溯到 primary source，并把一个带引用的 Markdown 文件放到 repo 惯用的 notes 位置。Research 是你委派的 legwork，不是你外包的 thinking；你拿回的是一份可供评议、grill 和 plan 的文档，以及它附带的 sources。

## Common questions

**它又派生了第二个 research agent，这是预期吗？**

不是，这是 [issue #530](https://github.com/mattpocock/skills/issues/530) 的 open bug。Background agent 可能继承同样 instructions 后再次 delegation，形成重叠 runs；相反，禁止 re-delegation 的全局规则也可能让它拒绝工作。当前没有 structural fix。调用后检查 background task list，停止 duplicate；本地 fork 可明确要求已经处于 subagent 的 agent 直接执行。

**Research file 应放哪里，要 commit 吗？**

Skill 只会沿用 repo 的 notes convention。常见实践是保留 ADR、但不长期 commit research：它记录写作当天的事实，stale 后可能污染未来 repo reads。也可放进 Obsidian、独立 knowledge repo 或 Issue tracker。若必须留在 git，应明确 freshness 与 owner。

**什么算 high-trust primary source，由谁判断？**

由 [model](https://www.aihero.dev/ai-coding-dictionary/model) 判断。Skill 只列 source 类型：official docs、source code、specs、first-party APIs，没有 allowlist 或独立 verification pass。真正的防线是每条 claim 的 citation；随机打开两三条，如果落到 summary 而不是原始材料，run 就失败了。

**之后的 session 会自动复用过去 findings 吗？**

不会。Research file 不会 auto-load，必须由 human 或另一个 skill 指向它。把它附在 spec、引用进 grilling session，或让 [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket) 持有 pointer，才能产生后续价值。

**为什么不直接让 agent 去读 docs？**

小问题完全可以。这个 skill 额外提供两点：background run 保持当前 [context](https://www.aihero.dev/ai-coding-dictionary/context) 干净，以及稳定的 primary-source constraint 与 cited Markdown artifact。若两行 prompt 已经足够，就用两行 prompt。

**它何时停止阅读？**

Skill 没有内建 stopping criterion，因此 scope 由你负责。一个 API、一个 behavior 或一个 version claim 这样的 narrow、answerable question，远好于“research X”。

**`/wayfinder` 创建了 research tickets，要我手工解决吗？**

不用。当前 wayfinder 会为每张 research ticket 启动 `/research` subagent，并行 burn down，把 findings 放在 throwaway `research/<name>` branch，再由 ticket 保存 [context pointer](https://www.aihero.dev/ai-coding-dictionary/context-pointer)。Research tickets 是 one-ticket-per-session rule 的唯一例外，因为它们属于 [AFK](https://www.aihero.dev/ai-coding-dictionary/afk) work。不要误开永远不会 merge 的 draft PR，也不要随意删除仍被 pointer 引用的 branch。

## Where it fits

这是一个可以随时调用的独立 skill，会为 thinking skills 提供输入：它产出的文件可以被 grill、plan 或 design 使用。因此它位于 [grilling](https://aihero.dev/skills-grilling) 和 [to-spec](https://aihero.dev/skills-to-spec) 这类 work 的上游，而不在 build chain 中。整套 map 见 [ask-matt](https://aihero.dev/skills-ask-matt)。
