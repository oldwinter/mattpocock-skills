## What it does

`writing-for-agents` 是编写 agent-consumed documents 的 reference：skills、`AGENTS.md` / `CLAUDE.md`，以及通过 pointer 触达的 docs。Packaging 不同，核心 levers 相同：context pointers、information hierarchy、completion criteria、leading words 与 pruning。

它追求的是每次运行采取相同 _process_，不是让 output 逐字相同。写 skill 时还会读取 `SKILL-MECHANICS.md`，处理 frontmatter、model/user invocation 与 router skills。

## When to reach for it

输入 `/writing-for-agents`，或在创建/编辑 skill、`AGENTS.md`、`CLAUDE.md` 时由 agent 自动触达。

| 任务 | 使用内容 |
| --- | --- |
| 编写任何 agent 会读取的 document | 主 reference |
| 选择 skill 的 invocation mode 或设计 router | `SKILL-MECHANICS.md` |
| 编写普通 human-only docs | 不需要这个 skill |

## The information hierarchy

内容按 agent 需要它的时机放在三层：in-file steps、in-file reference、pointer 后的 disclosed reference。每个 branch 都需要的内容 inline，只有部分 branches 使用的内容 disclose。Co-location 让同一 concept 的 definition、rules 与 caveats 相邻；sprawl 则通过按 branch/sequence 拆分来控制。

每个 step 都需要 checkable、exhaustive 的 completion criterion。Criterion 的 clarity 抵抗 premature completion，demand 决定 agent 会投入多少 legwork。Leading word 则用 model 已有 priors 压缩重复 rules，例如用 _tight_ 表达 fast + deterministic + low-overhead。

## Pruning

- 每个 meaning 只保留一个 source of truth。
- 不 cache environment 中一眼可查的 scripts/config/layout。
- 删除 stale、irrelevant 与 model 默认就会遵守的 no-op sentences。
- 优先写 positive target；只有真正 hard guardrail 才保留 negation。

## It's working if

- Pointer 同时说明 material 是什么，以及哪些 distinct branches 会触发它。
- Steps 没有被只属于少数 branches 的 reference 埋住。
- Completion criteria 能明确区分 done/not-done，并要求完整覆盖。
- Document 变短后 behaviour 更稳定，而不是丢掉必要 guardrails。

## Common questions

**`/writing-great-skills` 去哪了？**

它在 v1.1 重命名为本 skill。实践中人们早已把原 skill 用于 `AGENTS.md`、docs、specs、tickets 与 runtime prompts；structure、leading words 与 pruning 适用于任何 agent-consumed text。没有 alias，需要按新名重新安装。

**“Writing for agents” 是让 agent 负责写吗？**

相反。你是 author，agent 是 reader。困难就在这里：reader 已经拥有大量 priors，重复解释是 waste，precision 才是全部工作。

**不能直接让 agent 自己写吗？**

可以，但通常会冗长。Model 会解释自己已经知道的内容，也不会自动运行 no-op test 或寻找 leading word。本 reference 最有价值的用法往往是对 draft 做 review pass。

**要求 agent trim 文档后，它把 functionality 一起删了。**

“Streamline” 容易让 agent 只优化可见 length。No-op test 是 behavioral：删除一句后，agent behavior 是否改变？失败时删除整句，不要只缩短文字；发生争议时运行 document，以 behavior 决定，而不是凭审美争论。

**怎样知道完成了？**

Document 实际工作，而且找不到 duplication、sediment 或 no-ops 时完成。这里没有 automated eval；需要 manual run，再用 failure-mode vocabulary diagnosis。先命名 failure mode，再修那个问题。

**内容应放进 `CLAUDE.md`，还是 pointer 后的其他文件？**

看你愿意支付哪种 load。`CLAUDE.md` 每个 [session](https://www.aihero.dev/ai-coding-dictionary/session) 都无条件加载；pointer 后的 material 只有触发时才支付。十个 contexts 只有一个适用的内容，不应让另外九个都承担 context load。

**每次新 model 发布都要重写吗？**

通常不用。适配新 model 多半是再做一次 no-op pass，而不是整篇 rewrite；过度拟合某个 model 本身就是 trap。

**我的 skill 只对最初那个具体 task 有效。**

常见原因是“先做一次，再让 agent 把过程写成 skill”，导致 exemplars 过度具体。保留那次 run 作为 evidence，然后主动 abstract：删除只属于那个 repo 与那些 files 的细节，面向整个 task class 写。

**英语不是母语，会失去 leading-word 优势吗？**

不会。找到能用最少 [tokens](https://www.aihero.dev/ai-coding-dictionary/token) 承载最多 behavior 的词，本来就是这个 reference 要帮助完成的工作。

## Where it fits

`writing-for-agents` 是 model-invoked reference standalone。它取代旧名 `writing-great-skills`，范围也从 skill writing 扩展到任何 agent-consumed document；需要整个 skill map 时由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
