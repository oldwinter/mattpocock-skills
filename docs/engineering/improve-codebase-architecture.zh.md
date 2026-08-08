## What it does

`improve-codebase-architecture` 会扫描 codebase 中的 **deepening opportunities**，也就是 shallow module（接口几乎和它隐藏的东西一样复杂）可以变成 deep module 的位置；它将候选项呈现为自包含 visual HTML report，然后围绕你选中的项进行 grilling。

它 **不是**给你一张平铺的 refactors 列表。每个 candidate 必须通过 **deletion test**：移除这个 module 会把 complexity *concentrate* 到更小接口后，还是只是把 complexity 移到别处？只有 “concentrates” cases 才配有 card。这个过滤器防止 report 变成 generic cleanup advice。

除非你点名 specific area，否则它还会把 scope 收拢到 development 真正发生的位置：读取 recent commits，优先关注你仍在修改的代码。Deepen module 的回报来自让未来 changes 更容易，因此最近频繁变化的 repo 部分会获得更高权重。

## When to reach for it

你通过输入 `/improve-codebase-architecture` 调用它，agent 不会自行触达它。

把它当作 periodic health check：每隔几天运行一次，或当你感觉为了理解一个 concept 需要在许多小 modules 之间来回跳转时使用。它读取现有 architecture，并提出 deepen 的位置。如果你已经知道要 redesign 哪个 module，只需要 vocabulary 来思考，使用 [codebase-design](https://aihero.dev/skills-codebase-design)；本 skill 是寻找 candidates 的 survey，而那个 skill 是 design bench。

## Deepening opportunities

整个 skill 围绕一个想法：**depth**。Deep module 将大量功能隐藏在小而稳定的 interface 后；shallow module 会通过几乎和底下代码一样宽的 interface 泄露 implementation。Report 会寻找 shallowness：为了 testability 抽出的 pure functions，但真正 bugs 藏在调用方式中（没有 **locality**）；跨 **seams** 泄露的 modules；必须打开五个文件才能理解的 concepts。然后它提出能修复这些问题的 deepening。

它使用共享 design vocabulary（**module**、**interface**、**depth**、**seam**、**adapter**、**leverage**、**locality**）和你项目 `CONTEXT.md` 中的 domain language，所以 candidate 会读作 “deepen the Order intake module”，而不是 “refactor the FooBarHandler”。

## The report, then the grill

输出是写入 OS temp directory 的浏览器可打开 HTML file，不会落入 repo。每个 candidate 是一张 card，包含涉及文件、friction、plain-English solution、以 locality 和 leverage 表达的 benefit、before/after diagram，以及 `Strong` / `Worth exploring` / `Speculative` badge。最后会给出它优先处理的那一个。

随后它停下，询问你要探索哪个。选中一个后，它会围绕该 design 运行 [grilling](https://aihero.dev/skills-grilling) loop：constraints、seam 后面放什么、哪些 tests 能保留，并在 decisions crystallise 时 inline 更新 domain model。

## Common questions

**它没有先展示 options，却围绕一个 idea grill 了一小时。可以关闭吗？**

可以在 invocation 中明确说“don't grill me, just show the report”。设计意图是 report 先出现，只对你选中的 candidate 启动 grill；较弱 [models](https://www.aihero.dev/ai-coding-dictionary/model) 可能跳过选择步骤，直接围绕第一个想法提问。这仍是 open issue。

**Report 只显示未样式化 HTML，没有 diagrams。**

Report 默认从 CDN 加载 Tailwind 和 Mermaid，打开时需要网络；security hook、SRI mismatch、offline 或 locked-down environment 都可能静默阻止 scripts。Agent 自身不渲染页面，因此看不到问题。可要求改用 inline CSS 与 hand-built SVG diagrams；该 rough edge 尚未修复。

**Report 给了十二个 candidates，应该在同一 session 逐个处理吗？**

不要，一次 session 只处理一个 candidate。多个 candidates 会让 [context window](https://www.aihero.dev/ai-coding-dictionary/context-window) 同时装入 report、grilling、domain-model edits 和 code changes。挑一个，grill 后交给 `/to-spec`；其余转成可独立领取的 [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket)。

**应该怎样 prompt？**

带着下一项 build direction。大型 change 即将开始时，把 spec 交给它并问“how can we make this change easy?”；未指定方向的 periodic run 会自行扫描 hot spots，但显式方向通常更 actionable。

**大型 legacy codebase 也适用吗？**

部分适用。它擅长维护已有、但结构不一致的 codebase；对真正失控的多年 legacy project，可能只能改善一部分，model 也可能原地打转。目前没有专门 `/refactor` skill。若连 shared vocabulary 都没有，先用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 建立它，通常能提高 report 质量。

**它和 `/codebase-design` 有什么区别？**

`codebase-design` 是 vocabulary reference，不是 session driver；它提供 module、interface、depth、seam、adapter、leverage、locality。应由本 skill 驱动 survey，再消费那套词汇。直接要求 fresh agent “执行 `/codebase-design`”会让 reference 缺少 process，从而自行发明长流程。

**它会不会告诉我 codebase 已经没问题？**

很少。Skill 的 framing 会推动它产出 candidates。Strength badges 是防线：如果所有项都是 `Speculative`，基本等价于“没有找到足够有把握的问题”。

**在 Codex 或其他 harness 中能工作吗？**

当前版本已把 Claude Code 专属 `Agent` / `subagent_type=Explore` 名称改为 harness-neutral 的 parallel sub-agent 指令。只要 harness 提供等价 delegation，exploration 就可以完整运行；没有该能力时仍可 serial exploration，但覆盖会更弱。

**TypeScript 中怎样把建议真正实现成 deep modules？**

本 skill 不提供固定 `TYPESCRIPT.md` layout。它会指出 deepening 放在哪里、seam 后面应包含什么；package 或 directory structure 仍需结合 repo 约束设计。需要 import guardrails 时可考虑 `in-progress/setup-ts-deep-modules` 与 dependency-cruiser。

## Where it fits

`improve-codebase-architecture` 是 **periodic maintenance**：每隔几天运行，而不是 chain 中一步。它的邻居是 [codebase-design](https://aihero.dev/skills-codebase-design)，也就是所有 candidates 使用的 depth-and-seam vocabulary 的所有者；[grilling](https://aihero.dev/skills-grilling)，用于在你选定 candidate 后走 decision tree；以及 [domain-modeling](https://aihero.dev/skills-domain-modeling)，用于在 redesign settle 时保持 `CONTEXT.md` 和 ADRs 当前。无法确定该用哪个 skill 或 flow 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
