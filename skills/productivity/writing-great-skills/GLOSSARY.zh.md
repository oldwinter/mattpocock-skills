# Glossary — Building Great Skills

这是关于什么让 skill 变好的 domain model。Skill 的存在，是为了从 stochastic system 中 wrangle determinism；root virtue 是 **Predictability**，下面每个 term 都是它的 lever。这是 [`writing-great-skills`](SKILL.zh.md) disclosed 出来的 reference。

Terms 按 axis 分组：**Invocation**（skill 如何被触达）、**Information Hierarchy**（content 如何安排）、**Steering**（agent runtime behaviour 如何被塑形）和 **Pruning**（如何保持 lean）。每个 **failure mode** 都放在 cure 它的 lever 旁边，并标记为 _failure mode_。

任何 definition 中的 **bold terms** 本身也在这个 glossary 中定义；按 heading 查找。

## Predictability

Skill 让 agent 每次运行都以相同 _方式_ 行动的程度：相同 process，而不是相同 output（brainstorming skill 应该 _predictably_ diverge；tokens 会变，behaviour 不变）。这是其他每个 term 服务的 root virtue；cost 和 maintainability 是它的 symptoms，不是 rivals。

_Avoid_: consistency, reliability, robustness, output-determinism

## Invocation

Skill 如何被触达，以及这种选择会让你支付哪两种 loads。

### Model-Invoked

保留 **description** field 的 skill，因此 agent 能看见它并自主触发它，同时 human 仍可输入其名字；所以 model-invocation 总是 *includes* user reach。不存在 model-only state：description 只会 _增加_ agent discovery，不会移除 human reach。它用每轮永久 **context load** 换 discoverability。因为让它 agent-discoverable 的 description 也让它 invocable，所以其他 skills 也可触达它。Content 全是 **reference** 的 model-invoked skill，也可以作为 shared reference 的 home：另一个 skill 能 invoke 它，因此多个 skills 需要的 reference 可放在一个地方。只有当 agent 必须自己触达 skill 时，才选择 model-invocation；如果它只会手动触发，就删除 description，不支付 context load。

_Avoid_: ability, tool, capability

### User-Invoked

删除 **description** 的 skill：对 agent invisible，只能由 human 输入其名字触达（user-*only*，而 **model-invoked** 是 user-*and-agent*）。用 agent-discoverability 换零 **context load**。因为它没有 description，除了 human，没有任何东西能触达它：没有其他 skill 能 fire 它。

_Avoid_: procedure, workflow, command

### Description

Skill 的 machine-readable trigger，也是 **model-invoked** skill 被迫一直加载的一个 **context pointer**。它的 presence 本身 _就是_ invocation axis：保留它，skill 就是 model-invoked（且可被其他 skills 触达）；删除它，skill 就是 **user-invoked**，只能由 human 触达。它是 model-invoked skill **context load** 的来源。

_Avoid_: frontmatter, summary

### Context Pointer

Agent context 中持有的 reference：它命名某些 out-of-context material，并编码触达该材料的 condition。**Description** 是 top-level context pointer（context window → skill）；指向 disclosed files 的 pointers 是下一层的同一对象。决定 agent _何时_ 触达、以及 _多可靠_ 触达的是 pointer 的 wording，而不是 target。Must-have target 若藏在 weakly worded pointer 后，就是 variance bug：先修 wording；只有 sharpening 失败时才 inline。

_Avoid_: link, reference, import

### Context Load

**Model-invoked** skill 施加在 agent context window 上的成本：它的 **description** 永远 loaded，花费 tokens 和 attention。**User-invoked** skills 通过没有 description 避开这个成本；它也是 split 出更多 model-invoked skills 时的刹车。

_Avoid_: token cost, context bloat

### Cognitive Load

**User-invoked** skill 施加在 human 上的成本：human 必须记住哪些 skills 存在、何时触达（human 是 index）。**Model-invocation** 通过 agent-discoverable 移除它；它也是 split 出更多 user-invoked skills 时的刹车。它不是要 minimize 的成本，而是 human agency 的价格，是某些 skills 保持 user-invoked 的原因。把它花在需要 human judgement 的地方；在不需要处移除。

_Avoid_: human index, burden, overhead

### Granularity

Skills 被划分得多细。更细的划分会花费两种 loads 之一：更多 **model-invoked** skills 花费 **context load**（更多 descriptions 挤进 window、竞争 attention）；更多 **user-invoked** skills 花费 **cognitive load**（human 需要记住和触达更多东西）。两个 cuts 指导划分。按 **invocation**，当你有一个 distinct **leading word** 可触发它时 split 出 model-invoked skill，也就是你确实会在 prompts 中使用的 trigger word。按 **sequence**，当某 step 的 **post-completion steps** 需要隐藏时 split 一串 **steps**，因为在自己的 context 中隔离它会清空后续内容。Beware reverse：合并 sequences 会把每个 step 的 post-completion steps 暴露给前面的内容，引发 premature completion。

_Avoid_: chunking, modularity

### Router Skill

一种 **user-invoked** skill，工作是指向你的其他 user-invoked skills：命名每个 skill 以及何时触达，这样 human 只需记住一个 skill，而不是很多。它只能 hint，不能 fire 它们：user-invoked skills 没有 **description**，所以只有 human 能触达它们。它是 user-invoked skills 增多时治疗 **cognitive load** 的方式。

_Avoid_: dispatcher, menu, registry, index, router procedure

## Information Hierarchy

Skill content 按 agent 需要它的 immediate 程度排序；一个 ladder，由两种 cut 产生：in-file 或 pointer 后，step 或 reference。Rungs：

- **Steps** — in-file, primary
- **Reference**, in-file — secondary
- **Reference**, disclosed — behind a **context pointer**

没有 **steps** 的 skill 只使用后两层；它常常是合法的 flat peer-set（例如 review 的每条 rule 都在一个 rung），这不是 smell。Hierarchy 与 invocation independent：skill 可以 model- 或 user-invoked，不论它全是 steps、全是 reference，还是两者都有。当 skill 有 steps 时，本应 disclosed 的 in-file reference 会 bury steps，让 agent 是否注意到它们变成 coin-flip；这是 variance lever，不只是 legibility issue。让 ladder 顶部保持 legible；尽可能把内容往下推。

_Avoid_: structure, organization, layout

### Co-location

把 agent 同时需要的材料放在同一处：一个 concept 的 definition、rules 和 caveats 放在一个 heading 下，而不是 scattered across file；这样读到一部分会带出相邻内容。它是 **Information Hierarchy** 在文件内部的 companion：hierarchy 排名 _how far down_，co-location 决定到了那里之后 _what sits beside it_。Reference body 没有固定正确格式；测试是 skill 是否读起来像给 agent 写的 documentation，而 grouped material 比 scattered material 更像。不同于 **Duplication**：duplication 是一个 meaning 重复在两处，scattering 是一个 meaning 被拆成碎片分散到多处。

_Avoid_: grouping, clustering, cohesion

### Sprawl

_Failure mode._ Skill simply too long：`SKILL.md` 行数太多，独立于这些行是否 stale 或重复。即使一个 skill 全部 live、全部 unique，也可能 sprawl。它伤害 readability（agent 必须 wade through more before act，attention 被过量内容稀释）、maintainability（每多一行都要保持 **relevant**）、并浪费 tokens。Cure 是 **information hierarchy**：将 **reference** 推到 **context pointers** 后面，并按 **branch** 或 sequence split，让每条 path 只携带自己需要的东西。不同于 **sediment**（由 stale accumulation 导致的 length）和 **duplication**（由 repeated meaning 导致的 length）；sprawl 是 length 本身，不管原因是什么。

_Avoid_: bloat, length, size, verbosity

## Steering

塑造 agent runtime behaviour、让它趋向 **Predictability** 的 levers。

### Branch

Skill 可被 invoked 的一种 distinct way，即该 skill 处理的一个 case；所以不同 runs 会在 skill 中走不同 paths。Steps 很多的 skill 可能带有很多 branches；linear skill 没有 branch。

_Avoid_: path, case, fork

### Progressive Disclosure

把 **reference** 往 ladder 下方移动：移出 `SKILL.md` 并放到 **context pointer** 后面，让顶部保持 legible。它不是主要 token optimisation；它是保护 **information hierarchy** 的方式。它由 **branching** 授权：只被部分 branches 需要的 disclosed，每条 path 都需要的 inline；如果 pointer 对 must-have material 触发不可靠，先 sharpen wording，只有失败时才 pull it back inline。

_Avoid_: lazy loading, chunking

### Steps

Agent 执行的 ordered actions；当 skill 有 steps 时，它们是内容的 primary tier，也是 `SKILL.md` 中最值得占位的部分。不是每个 skill 都有 steps：skill 可以全是 steps（`tdd`）、全是 **reference**（review），或两者都有，且与 invocation independent。每个 step 以 **completion criterion** 结束，清晰或模糊。

_Avoid_: workflow, instructions, choreography

### Completion Criterion

告诉 agent 一个 work unit 已完成的 condition，即 agent 判断的 target。两个 properties 让它成为 lever，而不只是 quality。它的 **clarity**（agent 能否判断 done/not-done？）抵抗 **premature completion**：vague bound（“understanding reached”）会让 agent 宣告 done 并滑到下一步；这一轴需要 *steps* 才会咬住，因为 premature completion 是 between-steps failure。它的 **demand**（要求多少）设定 **legwork**：“every modified model accounted for” 会强迫 thorough work，而 “produce a change list” 不会；这一轴 _不_ 绑定 steps：它也能约束 flat reference body，这就是没有 steps 的 skill 仍能带着 exhaustiveness bar（“every rule applied”）的方式。最强 criteria 同时 checkable 且 exhaustive。

_Avoid_: done condition, exit condition, stopping rule

### Post-Completion Steps

当前 step 后面的 **steps**。当它们可见时，会把 agent 往 **premature completion** 拉；可见越多，tug 越强。Defence 是通过 splitting sequence of steps 来隐藏它们。

_Avoid_: horizon, fog of war, lookahead

### Legwork

Agent 在单个 step 内部幕后完成的 work：reading files、exploring codebase、making changes、digging up what it needs，而不是把工作 offload 给 user。它位于 step structure 之下：永远不写成自己的 step，而是 latent in wording，由 agent 控制而不是 skill 控制。它是 **post-completion steps** across-step pull 的 within-step counterpart。由 **leading word**（_comprehensive_, _thorough_）或 demanding exhaustive 的 **completion criterion** 提高，包括 demand axis 作用于 flat reference；这正是驱动 flat reference skill 覆盖所有 rungs 的方式。当 demand 缺失，或 **premature completion** 截短 step 时，legwork 会变薄。

_Avoid_: scope, effort, diligence, coverage

### Reference

Agent 按需查阅的材料：definitions、facts、parameters、examples、conditional instructions。当 skill 有 **steps** 时它是 secondary；当 skill 没有 steps 时它是全部 content；或它可以完全位于任何 skill 外部，见 **External Reference**。通过 **context pointers** 触达，也是 **progressive disclosure** 的主要候选。

_Avoid_: supporting material, docs, background

### External Reference

位于 skill system 之外的 **Reference**：plain file，没有 **description**，没有 **steps**，不可 invoke；任何 skill 都可以指向它。它适合存放无需独立触发的 shared reference，也是两个 **user-invoked** skills 共享内容的唯一 home，因为二者都没有 description，互相无法 fire。

_Avoid_: doc, resource, knowledge base

### Leading Word

一个 compact concept，也叫 *Leitwort*，已经存在于 model pretraining 中，agent 在运行 skill 时会用它思考。它用尽可能少的 tokens 编码一个 behavioural principle，调用 model 已有 priors（例如 _lesson_、_proximal zone of development_、_fog of war_、_tracer bullets_）。Repeated as a token，而不是 repeated as a sentence，它会在 skill 中累积 distributed definition，并 anchor 一整片 behaviour。Coining your own 可以，如果你清楚定义它；但 made-up word 无法调用 priors，你要用 definition tokens 支付 pretrained word 免费给你的东西。优先使用 existing word。

Leading word 两次服务 **predictability**。在 body 中，它 anchor **execution**：agent 每次看到该 concept 都 reach for same behaviour；在 flat reference 中，它把 attention 聚焦到一类要寻找的 thing，使每次运行都招募正确 checks。在 **description** 中，它 anchor **invocation**；而且不只是在 skill 内部：当同一个 word 生活在 prompts、docs 和 codebase 中，agent 会把 shared language link 到 skill，并更可靠地 fire 它。用你实际希望触发 skill 时会用的 leading words 来写 description。

_Avoid_: keyword, term, motif

### Premature Completion

_Failure mode._ 在当前 step 还没有 genuinely done 时结束，因为 agent 的 attention 从 work 滑向 being done。它是 between-steps failure：需要 **steps** 才会发生；没有 steps 的 skill 如果 early quit，不叫 premature completion，而是 unmet demand 下的 thin **legwork**。这是两种力量的 tug-of-war：visible **post-completion steps**（forward pull）和 **completion criterion** 的 clarity（resistance；sharp、checkable bar 能 hold；vague bar 会让位）。Fuzziness 是必要条件：sharp bound 无论后续 steps 有多少都能抵抗拉力，所以从不 rush 的 step 不需要防御。两种 levers 可以 hold 一个会 rush 的 step，但按顺序使用：**先 sharpen the bound**，因为它 local 且 cheap。只有当 criterion irreducibly fuzzy 且你确实观察到 rush 时，才 **hide the later steps**；而隐藏只有跨真实 context boundary 时才有效（user-invoked hand-off 或 subagent dispatch；inline model-invoked call 仍把 later steps 留在 context 中，什么也没清空）。Premature completion 是 thin legwork 的一个 cause，但不同于 thin legwork：即使 step 完整运行，legwork 也可能 thin。

_Avoid_: premature closure, the rush, rushing, shortcutting

### Negation

_Failure mode._ 用 prohibition 来 steering，也就是告诉 agent *不要*做什么；这会把被禁止的 behavior 拖进 context，让它变得**更**可用，而不是更不可用。_Don't think of an elephant_ 之后，elephant 就全是它；_never write verbose comments_ 之后，verbosity 反而成为 agent 刚读到的 pattern。Negation 是弱 modifier，会被强激活的 concept 覆盖，所以 ban 会半读成“去做这件事”的 instruction。它的 **leading word** 就是那个 _elephant_：prohibition 放进 frame 的东西。Cure：prompt the **positive**，描述 target behaviour（例如 “write one-line comments”），让被 ban 的东西根本不被说出。只有当某个 behavior 无法正向表述、必须作为 hard guardrail 时，prohibition 才值得保留；即使如此，也要同时配上 positive target，让 attention 落在要做什么上。

_Avoid_: ironic rebound, don't-prompting, the pink elephant

## Pruning

保持 skill lean；每个 remedy 都对应一个它 cure 的 failure。

### Single Source of Truth

每个 meaning 恰好位于一个 authoritative place 的理想状态，这样改变 skill behaviour 时只需改变一处。**Duplication** 是它的 violation。

_Avoid_: home, canonical location

### Duplication

_Failure mode._ 同一个 meaning 拥有不止一个 **single source of truth**。它增加 maintenance（改一处，还必须改其他处）、花费 tokens，并 inflate prominence：重复一个 meaning 会让它在 ladder 上的权重超过真实 rank。它是 **leading word** 的 accidental inverse；leading word 通过重复 token 有意 raise attention，而不是重复 meaning。

_Avoid_: repetition, redundancy

### Relevance

一行是否仍然 bear on 这个 skill 做什么。Line 失去 relevance 的原因可能是从未与 task 相关（mere exposition，或应 disclosed 的 **branch**），也可能是 stale：随着 behaviour 或 world 变化而漂移。Shorter skills 更容易保持 relevant，因为每一行更便宜检查。不同于 **no-op**：relevance 问的是一行是否 bear on task，不问它是否改变 behaviour。

_Avoid_: load-bearing, staleness, freshness

### Sediment

_Failure mode._ Skill 中沉积的 old content layers：它们从不被清理，因为 adding feels safe、removing feels risky；于是 stale and irrelevant lines 累积，你必须 core down 才能找到仍然 live 的内容。没有 pruning discipline 的 skill 默认都会这样；这是 **relevance** 的慢性 erosion，不同于 **duplication** 的 repeated meaning。

_Avoid_: accretion, bloat, cruft, rot

### No-Op

_Failure mode._ 因为 model 默认已经会做而不改变任何行为的 instruction：你付出 load 却告诉 agent 它本来就会做的事。Test：这行相对 default 是否改变 behaviour？一行可以完全 **relevant**，但仍是 no-op。让 **leading word** 免费的 same priors，也会让 no-op 变得 worthless。

Leading word 是一种 *technique*；No-Op 是对某行的 *verdict*，二者可以交叉。太弱的 leading word 无法超过 default，就是 no-op（例如 model 已经 thorough-ish 时写 _be thorough_）；fix 是换一个能通过 verdict 的 stronger word（_relentless_），而不是 different technique。所以 No-Op test（是否改变 default behaviour？）也是评估 leading word 是否配得上重复的方式。这是 model-relative，不是 reader-relative：两个人争论一行是否 no-op，本质是在争论 default，应该通过运行 skill 而不是 debate 来解决。

_Avoid_: redundant instruction, restating the obvious, belaboring
