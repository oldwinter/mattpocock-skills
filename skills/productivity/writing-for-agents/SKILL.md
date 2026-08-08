---
name: writing-for-agents
description: 为 agent 编写 documents。用于创建或编辑 skills，或修改 AGENTS.md、CLAUDE.md。
---

这是所有 agent-consumed document 的 reference：skill、`AGENTS.md` / `CLAUDE.md`，或通过 pointer 触达的 doc。Packaging 会变化，写法不会：相同 levers 会让每次运行遵循同一套 _process_，而不是强迫每次产出相同 output。

当正在编写的 document 是 skill 时，读取 [`SKILL-MECHANICS.md`](SKILL-MECHANICS.md)，了解 frontmatter、invocation choice 与 router skills。

## Context pointers

**Context pointer** 是 agent context 中的一条 reference：它指向 context 外部的 material，并编码应该触达该 material 的条件。Skill description 是一种；`AGENTS.md` 中指向某个 doc 的一行也是同一种 object。决定 agent 何时、以及多可靠地触达 material 的，是 pointer 的 _wording_，不是 target。必须加载的 target 如果藏在措辞薄弱的 pointer 后面，就是 variance bug：先 sharpen wording，只有这样仍失败时才 inline material。

Pointer 同时完成两件事：说明 material 是什么，并列出应触发它的 **branches**。Branch 是 document 处理的一种 distinct case，不同 runs 会经过不同路径。Always-loaded pointer 的每个 word 都会在每个 turn 付费，因此必须比 body 更严格地 prune：

- **Front-load the leading word** — pointer 正是在这里完成 triggering。
- **One trigger per branch.** 只是换个说法重复同一 branch 的 synonyms 属于重复；collapse 它们，只保留真正 distinct 的 branches。
- **Cut identity the body already carries.** 删除 body 已经承载的 identity。

## The two loads

每个新增的 document 和 pointer 都会消耗两类 budgets 之一：

- **Context load** — always-loaded material 占用 agent window 的成本：`AGENTS.md` 的一行、skill description，以及任何每 turn 都处于 context 中、无论是否触发都消耗 tokens 与 attention 的内容。
- **Cognitive load** — human 付出的成本：有哪些 documents、什么时候该使用。Human 是 index。它并非必须最小化的成本，而是 human agency 的价格；在需要 human judgement 的地方支付，在不需要的地方消除。

只通过 pointer 触达的 material 只承担 pointer 那一行 context load；完全没有 pointer 的 material 则全部依赖 cognitive load。

## Information hierarchy

Document 由两类 content 构成：**steps**（agent 按顺序执行的 actions）与 **reference**（按需查阅的 definitions、rules、facts）。两者可以任意组合：全 steps 的 recipe、全 reference 的 review rules，或两者都有。核心判断是每项内容位于 **information hierarchy** 的哪一层，也就是按 agent 多快需要它排序的 ladder：

1. **In-file step** — primary tier，agent 按顺序做什么。
2. **In-file reference** — 按需查阅。它常常是合理的 flat peer-set，例如 review 的每条 rule 都在同一 rung；这不是 smell。
3. **Disclosed reference** — 推到 separate file 中，位于 context pointer 后，只有 pointer 触发时才加载。范围从同 folder 的 sibling file，到任何 document 都能指向的 external reference。

向下推得太少，top 会 bloated；推得太多，则会隐藏 agent 真正需要的 material。这项 tension 就是完整 decision。

**Progressive disclosure** 是沿 ladder 向下移动：把内容移出 main file，放到 pointer 后，让 top 保持 legible。它不主要是 token optimisation，而是保护 hierarchy 的方式。Branching 是最清晰的 disclosure test：每个 branch 都需要的内容 inline，只有部分 branches 需要的内容放到 pointer 后。当 document 含有 steps 时，本该 disclosed 的 in-file reference 会把 steps 埋住，让 agent 是否关注它变成 coin flip；这是 variance lever，不只是 legibility 问题。

**Co-location** 是 file 内的配套原则：ladder 决定 material 要向下放多远，co-location 决定落在该层后什么内容应该相邻。把一个 concept 的 definition、rules 与 caveats 放在同一 heading 下，不要散落，让读取其中一部分时自然带出 neighbours。Test 是：document 应像专门写给 agent 的 documentation；grouped material 符合，scattered material 不符合。它不同于 duplication：duplication 在两处重复同一 meaning，scattering 则把同一 meaning 拆碎到多处。

**Sprawl** 是这里的 failure mode：document 即使每行都 live 且 unique，整体仍然太长。Excess 会稀释 attention，每个额外 line 都要持续维护 relevance。Cure 就是 ladder：把 reference disclose 到 pointers 后，并按 branch 或 sequence 拆分，让每条 path 只携带自身所需内容。

## Steps and completion criteria

每个 step 都以 **completion criterion** 结束，也就是告诉 agent work 已完成的 condition。它由两个 properties 构成：

- **Clarity** — agent 能否分辨 done 与 not-done？Vague bound（如“理解已达成”）会诱发 **premature completion**：step 尚未真正完成，attention 已转向 _being done_。仍可见的后续 steps，也就是 **post-completion steps**，会产生 pull；criterion 的 clarity 则提供 resistance。按顺序防御：先 **sharpen the bound**，因为它 local 且 cheap；只有 bound 无法避免 fuzzy、并且确实观察到 rush 时，才通过拆分 sequence 隐藏后续 steps。隐藏必须跨越真实 context boundary，例如 handoff 或 subagent dispatch；inline call 不会清掉 later steps。
- **Demand** — 它要求做到什么程度。“Every modified model accounted for” 会逼出 thorough work，而 “produce a change list” 不会。Demand 驱动 **legwork**，也就是 agent 在 work 中做的 digging；它隐含在 wording 中，不必独立写成 step。Demand 也不限于 steps：“every rule applied” 可以约束一组 flat reference，因此 all-reference document 仍可拥有 exhaustiveness bar。

最强的 criteria 同时 checkable 且 exhaustive。

## When to split

把一个 document 拆成两个会消耗两类 load 之一，所以只有当拆分真正值得时才做：

- **By sequence** — 当 post-completion steps 会诱使 agent rush 当前 step 时，拆开一段 steps。让后续步骤暂时不可见，可以增加当前 task 的 legwork。也要警惕反向影响：合并 sequences 会让前面每个 step 看到更远的 later steps，从而诱发 premature completion。
- **By invocation** — skill-specific，见 [`SKILL-MECHANICS.md`](SKILL-MECHANICS.md)。

## Leading words

**Leading word** 是 model pretraining 中已存在、agent 在运行 document 时会用来思考的 compact concept，例如 _lesson_、_fog of war_、_tracer bullets_。重复的是 token，不是 sentence；它会积累 distributed definition，以最少 tokens anchor 一整片 behaviour，因为它复用了 model priors。自造 word 也可以，但必须明确定义；made-up word 没有 priors，定义所需 tokens 会抵消收益，所以优先选已有 word。

它会 anchor 两次。在 body 中 anchor _execution_：每次看到该 word，agent 都会触发相同 behaviour，并在 flat reference 中把 attention 聚焦到某类对象。在 pointer 中 anchor _invocation_：同一 word 同时存在于 prompts、docs 与 codebase 时，agent 会把 shared language 与 material 连接起来，更可靠地触达它。

主动寻找用 leading words refactor 的机会。一组三项规则在三处展开、pointer 用整句暗示一个 concept，这些 passages 都应 collapse 成单个 token：

- “fast, deterministic, low-overhead” → _tight_（a _tight_ loop）。
- “a loop you believe in” → _red_；fuzzy gate 变成 binary observable state：loop 要么因 bug 变 _red_，要么没有。

收益有两层：tokens 更少，同时 agent 有了更 sharp 的 hook 来组织 thinking。假设每个 document 都藏着可由 leading words 淘汰的 restatements，并主动找到它们。

**Negation** 是旁边的 failure mode：通过 prohibition steering，会把被禁止 behaviour 拉进 context，让它 _更_ 容易被激活。_Don't think of an elephant_，结果 context 中只剩 elephant；negation 是 weak modifier，会被强激活 concept 覆盖，因此禁令会半读成 instruction。应 prompt **positive target**，例如直接说“write one-line comments”，让被禁止的行为根本不出现。只有无法正向表达的 hard guardrail 才值得写 prohibition；即便如此，也要同时给出 positive target，让 attention 落在应该做什么上。

## Pruning

- 每个 meaning 只保留一个 **single source of truth**，也就是 authoritative location，让 behaviour change 只需修改一处。**Duplication** 在多处重复同一 meaning，会增加 maintenance 与 tokens，还会把该 meaning 在 ladder 上的 prominence 人为放大。它是 leading word 的 accidental inverse：leading word 有意重复一个 token，却从不重复 meaning。
- **Environment** 也是 source of truth，例如 `package.json` scripts、config files、directory layout、`--help` output。Document 如果 restate 它们，就是一份 **cache**：lookup 的副本。只有 lookup 昂贵时 cache 才值得。只 cache agent 无法通过查看环境发现的东西：未写下的 convention、choice 背后的 reason、config 不会暴露的 gotcha。One-file、one-command lookups 留在 environment 中，那里不会 stale。
- 检查每行的 **relevance**：它是否仍与 document 的 job 有关？一行内容可能因为从不影响 task（mere exposition，或应 disclosed 的 branch），也可能因描述的 behaviour/world 改变而 stale。短 documents 更容易保持 relevant。没有 pruning discipline 时，默认结局是 **sediment**：stale layers 因 adding 看似安全、removing 看似危险而不断沉积，直到必须向下钻取才能找到仍 live 的内容。
- 逐句寻找 **no-ops**：如果 agent 默认就会遵守某条 instruction，这条 instruction 只增加 load，不改变 behaviour。Test 是“相比 default，它是否改变 behaviour？”这个问题相对于 model，而不是 reader；两个人对 no-op 有分歧，本质是在争论 default，应通过运行 document 来解决，而不是辩论。Sentence 失败时删掉整句，不要只 trim words。Leading words 也受同一 test：如果 word 太弱，无法压过 default，例如 agent 已经 somewhat thorough 时写 _be thorough_，修复方式是换成更强的 word，例如 _relentless_，而不是换 technique。
