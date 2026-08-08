## What it does

`ask-matt` 是本 repo 的 skill router。你描述当前处境，例如不知道 idea 从哪里开始、incoming bug reports 堆积，或 session 已经很长，它会指出适合的 skill/flow，以及 human decisions 位于哪里。

它只推荐，然后停止。它不会开始 grilling、写 spec、打开 file，或替你调用刚推荐的 skill；你得到的是下一条应输入的 command。它维护的是本 repo 的手写 map，不会扫描并路由到你自己或其他作者安装的 skills。

## When to reach for it

输入 `/ask-matt`；agent 不会自动调用它。

| 你的情况 | Router 返回什么 |
| --- | --- |
| 有 idea，但不知道从哪开始 | Main flow 的入口，以及 build 是否小到可以跳过 spec |
| 他人提交的 bugs/requests 不断进入 | [triage](https://aihero.dev/skills-triage) on-ramp；自己生成的 tickets 不应进入 triage |
| 两个 skill 看起来可互换 | 它们之间的具体 boundary，例如是否位于 working directory、effort 是否装得进一个 session |
| Long session，需要决定如何处理 context | Phase boundary 上五种选择的有序决策树 |
| 已经选好 skill | 没有额外价值，直接调用那个 skill |

Tracker-dependent routes 假设 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 已配置 issue tracker；router 不会替你完成安装或 setup。

## Flows, not skills

它的 leading word 是 **flow**，也就是穿过多个 skills 的 path，而不是只根据 keyword 匹配一个工具。Main flow 是 idea → grill → spec → tickets → implement → review；on-ramps 用于 incoming work、broken behavior 或大到单 session 容不下的 foggy effort；standalone 处理 prototype、questionnaire 或已经发生的 merge conflict；底层 vocabulary layer 则由 `domain-modeling` 与 `codebase-design` 提供。

## The phase boundary

Phase 是 session 内的一段 work，例如 grilling、implementation 或 QA；只有两个 phases 的 boundary 才需要决定 context 去向。按顺序判断：

| Option | 何时选择 |
| --- | --- |
| **Continue** | 下一 phase 需要当前内容的 verbatim primary source，或 smart zone 足够 |
| **`/clear`** | 之前的 exploration、decisions 与 dead ends 全部可丢弃 |
| **[handoff](https://aihero.dev/skills-handoff)** | Context 必须移动到 new harness、new directory、colleague，或 mid-phase side task |
| **Subagent** | Task 已 tightly scoped，可以 AFK 运行 |
| **`/compact`** | 以上都不符合；这是最后的 default，不是 first reach |

## It's working if

- 最后只说明该输入什么并停止，不会自行开始 work。
- Route 会标出在哪里 clear/compact，以及哪里需要 human review。
- 两个 skills 相近时，它会说明选择哪一个，以及另一个为什么不适用。
- 关于其他 skill 的 load-bearing claim 能追溯到对应 `SKILL.md`。

## Common questions

**不能直接给一张按顺序排列的 skills 清单吗？**

`ask-matt` 本身就是这张清单。静态表格可能只写 `wayfinder -> to-spec -> to-tickets -> implement -> code-review`，但多数情况真正重要的是 branches：有没有 codebase、build 是否跨 sessions、问题能否只靠对话解决。代价是 router 由人工维护，可能落后于 repo；当它说到关键行为时，应打开对应 `SKILL.md` 核对。

**它说一半 skills 没有安装。**

这是已知问题。许多 user-invoked skills 设置了 `disable-model-invocation: true`，harness 因此不会把它们放进注入 agent context 的 model-visible 列表；agent 错把这个列表当作完整安装清单。它们通常已经安装，仍可直接输入 slash command，或以 `.claude-plugin/plugin.json` 为 promoted set 的权威来源。

**它描述的 skill 行为和实际不一致。**

Router 依赖自己维护的一行摘要，不一定会主动打开目标 skill。若它对另一个 skill 作出会影响路线的断言，先要求它读取该 `SKILL.md`。Map 未覆盖的问题也一样，例如是否使用 [plan mode](https://www.aihero.dev/ai-coding-dictionary/agent-mode)，回答可能只是 [model](https://www.aihero.dev/ai-coding-dictionary/model) 的推断。

**为什么用 prose，而不是 numbered checklist？**

因为 prose 承载的是条件分支、需要 human decision 的位置，以及 phase 之间何时 clear 或 compact。只想看压缩路径时可以要求“只给 sequence”，但 flat checklist 会丢失这些 branches。

**它能为我自己的 skills 或其他作者的 skills 路由吗？**

不能。它是这一个 skill set 的手工维护 map，不会扫描本地 `skills/` 后为任意已安装内容建立通用 router。

**它建议我编辑 `SKILL.md`，这样可靠吗？**

通常不持久。`npx skills update` 会覆盖 skills.sh 安装的文件，plugin 安装则是只读的。长期行为应放在自己的 `CLAUDE.md` / `AGENTS.md`，或在 invocation 中说明；prompt-level adaptation 能跨更新保留。

**它提到一个我没有的 skill，或漏掉我已有的 skill。**

先查 changelog。常见 rename 包括 `writing-great-skills` -> [writing-for-agents](https://aihero.dev/skills-writing-for-agents)、`to-prd` -> [to-spec](https://aihero.dev/skills-to-spec)、`pathfinder` -> [wayfinder](https://aihero.dev/skills-wayfinder)，都没有 alias。`ubiquitous-language`、`design-an-interface`、`qa`、`request-refactor-plan` 则已被吸收到其他 skills 后删除。反向情况通常是 router 自身落后。

## Where it fits

`ask-matt` 是位于整个集合上方的 **standalone router**，不是任何 chain 中的一步。它最常把你送到 main flow 入口 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，或 incoming work 的 [triage](https://aihero.dev/skills-triage)。它只是其他 skills 的 secondary source；发生冲突时，以目标 `SKILL.md` 为准。
