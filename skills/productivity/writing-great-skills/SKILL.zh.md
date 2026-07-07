---
name: writing-great-skills
description: 写好和编辑 skills 的 reference：让 skill predictable 的 vocabulary 和 principles。
disable-model-invocation: true
---

Skill 的存在，是为了从 stochastic system 中 wrangle determinism。**Predictability** 是根本 virtue：agent 每次运行都采取相同的 _process_，不是产出相同 output。下面每个 lever 都服务于它。

**Bold terms** 在 [`GLOSSARY.zh.md`](GLOSSARY.zh.md) 中定义；需要完整含义时去那里查。

## Invocation

两个选择，各自支付不同成本：

- **Model-invoked** skill 保留 **description**，所以 agent 可以自主触发它，其他 skills 也能触达它（你仍然可以手动输入它的名字）。它带来 **context load**：description 每一轮都在 window 中。Mechanics：省略 `disable-model-invocation`，并写 model-facing description，带 rich trigger phrasing（“Use when the user wants…, mentions…”）。
- **User-invoked** skill 把 description 从 agent 的 reach 中移除：只有你输入它的名字才能 invoke，且没有其他 skill 能触达。零 context load，但会花费 **cognitive load**：_你_ 必须记住它存在并知道何时使用。Mechanics：设置 `disable-model-invocation: true`；`description` 变成 human-facing 的一行摘要，去掉 trigger lists。

只有当 agent 必须自己触达该 skill，或另一个 skill 必须触达它时，才选择 model-invocation。如果它只会手动触发，就让它 user-invoked，不支付 context load。

当 user-invoked skills 多到你记不住时，这堆 cognitive load 可由 **router skill** 解决：一个 user-invoked skill，列出其他 skills 以及何时使用它们。

## Writing the description

Model-invoked **description** 做两件事：说明 skill 是什么，并列出应该触发它的 **branches**。每个 word 都增加 **context load**，所以 description 比 body 更需要 pruning：

- **Front-load the skill's leading word** — description 是它进行 invocation work 的地方。
- **One trigger per branch.** 把同一个 branch 换词重写的 synonyms 是 **duplication**；例如 “build features using TDD … asks for test-first development” 是同一个 branch 写了两次。Collapse 它们，只保留 genuinely distinct branches。
- **Cut identity that's already in the body.** Description 只保留 triggers，加上任何 “when another skill needs…” reach clause。

## Information hierarchy

Skill 由两类 content 构成：**steps** 和 **reference**。它们可以自由混合：skill 可以全是 steps、全是 reference，或两者都有。核心 decision 是使用哪类，以及每类放在 **information hierarchy** 的哪一层。这个 ladder 按 agent 多么立即需要材料排序：

1. **In-skill step** — `SKILL.md` 中的 ordered action，primary tier：agent 做什么、按什么顺序做。每个 step 都以 **completion criterion** 结束，即判断 work done 的 condition。让它 _checkable_（agent 能否判断 done/not-done？），并在重要处 _exhaustive_（“every modified model accounted for”，而不是 “produce a change list”）；vague criterion 会诱发 **premature completion**。
2. **In-skill reference** — `SKILL.md` 中的 definition、rule 或 fact，按需 consult。它经常是合法的 flat peer-set（一个 rung 上放 review 的每条 rule），这不是 smell。_这个 skill 全是 reference。_
3. **External reference** — 从 `SKILL.md` 推到 separate file，并通过 **context pointer** 触达的 reference，只在 pointer 触发时 load。（范围从 _disclosed_ reference，例如同 folder 的 `GLOSSARY.md`，到完全 **external reference**，即位于 skill system 之外、任何 skill 都可指向的材料。）

严格的 completion criterion 会推动 thorough **legwork**：agent 在 work 内部做 digging。无论 skill 有 steps 还是没有，都是如此；因为 “every rule applied” 会约束 flat reference，正如 “every step done” 约束 sequence。

往下推太少，top 会 bloated；往下推太多，会隐藏 agent 实际需要的材料。这个 tension 就是整个 decision。

**Progressive disclosure** 是沿 ladder 向下移动：把 `SKILL.md` 中的内容挪到 linked file，使 top 保持 legible。Mechanics：skill folder 中的 linked `.md` file，按其持有内容命名（这个 skill 把完整 definitions disclosed 到 `GLOSSARY.md`）。有些 skills 有不止一种使用方式，每种 distinct way 都是一个 **branch**：不同 runs 在 skill 中走不同 paths。Branching 是最干净的 disclosure test：每个 branch 都需要的 inline，只被部分 branches 触达的放到 pointer 后面。**Context pointer** 的 _wording_，不是 target，决定 agent 何时以及多可靠地触达材料。

Ladder 决定某个 piece 放 _多深_，**co-location** 决定它到了那里之后 _旁边放什么_：把一个 concept 的 definition、rules 和 caveats 放在一个 heading 下，而不是 scattering，这样读到一个部分时会带出邻近材料。

## When to split

**Granularity** 是你如何细分 skills；每个 cut 都会花费两种 loads 之一，所以只有当 cut 值得时才 split。两种 cut：

- **By invocation** — 当你有 distinct **leading word** 应该独立触发，或另一个 skill 必须触达它时，split 出一个 **model-invoked** skill。你会为新的 always-loaded **description** 支付 **context load**，所以这种 independent reach 必须值得。
- **By sequence** — 当后续还未执行的 **steps**（某 step 的 **post-completion steps**）会诱使 agent rush 前面的 step（**premature completion**）时，把这串 **steps** split。把它们移出视野会鼓励 agent 在当前 task 上做更多 **legwork**。

## Pruning

让每个 meaning 只有一个 **single source of truth**：一个 authoritative place，这样 changing behaviour 只需 one-place edit。

检查每一行的 **relevance**：它是否仍然 bear on 这个 skill 做什么？

然后 sentence by sentence 猎杀 **no-ops**，而不只是 line by line。对每个 sentence 单独运行 no-op test；如果失败，删除整个 sentence，而不是 trim words。Be aggressive：多数失败的 prose 应该被删除，不是重写。

## Leading words

**Leading word** 是一个 compact concept，已经存在于 model 的 pretraining 中，agent 会在运行 skill 时用它思考（例如 _lesson_、_fog of war_、_tracer bullets_）。它在全文中重复（虽然不一定必须重复；strong leading word 可能只需一次），会累积 distributed definition，并用最少 tokens anchor 一整片 behaviour，因为它借用了 model 已有 priors。

它两次服务 predictability。在 body 中，它 anchor _execution_：每次看到这个 word，agent 都 reach for the same behaviour。在 description 中，它 anchor _invocation_：当同一个 word 出现在 prompts、docs 和 code 中，agent 会把这套 shared language link 到 skill，并更可靠地触发它。

寻找机会把 skills refactor 成使用 leading words。一个 triad 在三个地方 spelled out（**duplication**），或 description 花一个 sentence 指向一个 idea，都说明这段文本想要 **collapse** 成 single token。例如：

- “fast, deterministic, low-overhead” -> _tight_：一个 phase 中反复出现的 quality，collapse 成一个 pretrained word（a _tight_ loop）。
- “a loop you believe in” -> _red_：把 fuzzy gate 转成 binary observable state（loop 会在 bug 上 _red_，或者不会）。

你会赢两次：更少 tokens，_and_ 更 sharp hook 供 agent 悬挂 thinking。假设每个 skill 都带着可被 leading words 替代的 restatements；go find them。

## Failure modes

用这些诊断用户可能遇到的 skill 问题。

- **Premature completion** — step 尚未 genuinely done 就结束，attention 滑向 _being done_。Defence 顺序：先 sharpen completion criterion（cheap、local）；只有当它 irreducibly fuzzy 且你观察到 rushing 时，才通过 splitting 隐藏 post-completion steps。
- **Duplication** — 同一个 meaning 出现在多个地方。它增加 maintenance 和 tokens，并让一个 meaning 在 ladder 上显得比真实 rank 更重要。
- **Sediment** — stale layers 因为 adding feels safe、removing feels risky 而沉积。没有 pruning discipline 的 skill 默认都会如此。
- **Sprawl** — skill simply too long，即使每一行都 live 且 unique。伤害 readability、maintainability，并浪费 tokens。Cure 是 ladder：把 **reference** disclosed 到 pointers 后，并按 **branch** 或 sequence split，让每条 path 只携带自己需要的东西。
- **No-op** — model 默认已经会遵守的 line，所以你付出 load 却没有改变行为。Test：它相对 default 是否改变 behaviour？弱 leading word（例如 model 已经 somewhat thorough 时写 _be thorough_）就是 no-op；fix 是 stronger word（_relentless_），不是不同 technique。
- **Negation** — 用 prohibition steering 会 backfire：_don't think of an elephant_ 命名了 elephant，让它更可用而不是更不可用。Prompt the **positive**，直接陈述 target behaviour，让被 ban 的东西不被说出；只有在无法正向表述的 hard guardrail 中保留 prohibition，而且也要配上该做什么。
