# Phase boundaries

一个 **phase** 是 session 内的一段 work，例如 grilling、implementation 或 QA。这个定义有意保持 fuzzy：当你想到“好，这部分完成了”时，phase 就结束。

**Phase boundary** 是两个 phases 之间的间隙，也是唯一应该做这项选择的地方。Mid-phase 没有要做的选择：继续，或把剩余 work 拆给 subagents。Mid-phase compact 会让 agent 丢失 thread。

## The five options

| Option | What it does |
| --- | --- |
| **Continue** | 留在当前 session，完全不切换 context。 |
| **`/clear`** | 清空 context window，从零开始。 |
| **`/handoff`** | 写出可移植的 Markdown file，用它在任意位置启动 session。 |
| **Subagent** | 把 task 交给独立 context window，再收回 report。 |
| **`/compact`** | 压缩当前 context，并用 summary 为 fresh session 提供 seed。 |

## The tree

在 boundary 按从上到下的顺序判断，第一个 **yes** 胜出。

**1. 能否在当前 session 中继续？** 两种情况会让答案为 yes：下一 phase 需要把当前 phase 当作 **primary source**，或剩余 [smart zone](https://www.aihero.dev/ai-coding-dictionary/smart-zone)（约 150k tokens）足以容纳下一 phase。Grilling → implementation 是标准的 yes：implementation 需要 verbatim reasoning，而不是它的 summary。Continue 没有成本，也不丢失内容，所以先排除它，再考虑其他选择。

**2. 当前 context 与下一步无关吗？** 这个 session 中的一切，包括 exploration、decisions 与 dead ends，是否都可以丢弃？如果是，执行 **`/clear`**。这是整张图上成本最低的 move：不耗时间，并归还完整 window。`/clear` 也不是 terminal，旧 session 仍可 resume。

选错的代价是单向的。清掉 _relevant_ context 会丢失 build 背后的 **why**，之后再读 diff 也无法找回。

**3. 是否需要 hand off？** `/handoff` 的适用范围很窄，只在以下情况需要：

- 切换到 **new harness**（Claude → Codex）；
- 移动到 **new directory** 或 repo；
- 把 work 交给 **colleague**；
- 或在 **mid-phase** fork 一个刚发现的 side task，同时不打断当前工作。

这份列表就是完整条件。`/handoff` 换来的是 **portability**，即一个可以移动的 file。如果没有任何东西要移动，就不需要它。

**4. Task 能否 AFK 完成？** 它是否已经 scoped 到无需你在 keyboard 前 steering？如果是，把它交给 **subagent**，当前 session 保持不动。Automated review 是标准例子：agent 读取 diff 并报告，期间不需要你参与。

**5. 其他情况使用 `/compact`。** Context 仍 relevant、harness 与 directory 不变，而且你需要持续参与，这就是决策树经常落到的位置。给它一条 instruction（例如 `/compact 接下来要 QA 这个区域`），让 summary 保留下一 phase 所需内容。

`/compact` 是 **default，而不是 first reach**。它位于底部，因为上方四个问题的选择都更便宜或更精确。从这里起手的典型 failure mode 是：fresh session 对一个被 summary 压平的 decision 产生了错误但自信的理解。

## Primary and secondary sources

除 **Continue** 外，每个 move 都会把 **primary source** 变成 **secondary source**：用 summary 替代真实发生过的 session。Tradeoff 始终相同：

| Source | Information | Noise | Room to move |
| --- | --- | --- | --- |
| Primary（Continue） | Full | Lots | Little |
| Secondary（`/compact`、`/handoff`） | Lossy | Less | Lots |

这就是问题 1 排在最前面的原因。只有当留下的成本高于收益时，才支付 lossiness。

## These are judgement calls

这些问题并不 objective，每一项都包含 taste；同一个 boundary 在不同日期可能得到不同选择。价值在于：只在 boundary 做决定，并按固定顺序逐项询问，而不是在 work 中途随意选择。
