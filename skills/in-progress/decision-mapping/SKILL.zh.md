---
name: decision-mapping
description: 将 loose idea 转成按顺序推进的 investigation map，并逐个决策条目 drive 到 resolution。
disable-model-invocation: true
---

当一个 loose idea 需要不止一个 agent session 才能转成 plan 时，会 invoke 这个 skill。它会在 markdown file 中创建 stateful decision map，并引导用户按决策条目顺序解决 open questions；这些 questions 可能需要 prototyping、research 或 discussion。

## The Decision Map

Decision map 是一个 compact Markdown file，每个 planning effort 一个，git-tracked alongside the project。它是 canonical artifact：**整个 map 都会作为 context 加载到每个 session**，所以它必须保持 compact。

处理决策条目过程中创建的 assets 应从 map link out，而不是复制到 map 内。

### Structure

Numbered entries（上游称为 “tickets”），每个都有自己的 section，并以 number 为 key：

```markdown
## #1: Relational Or Non-Relational Database?

Blocked by: #<ticket-number>, #<ticket-number>
Status: open | in-progress | resolved
Type: Research | Prototype | Grilling

### Question

<question-here>

### Answer

<answer-here>
```

当 `Blocked by` 列表里的每个决策条目都是 `resolved` 时，该条目才算 **unblocked**。一个 session 在开始任何工作前，要先把自己的条目设为 `Status: in-progress` 并保存 map，这样并发 session 会跳过它。

每个决策条目的大小应适配一个 100K token agent session。

## 条目类型

决策条目有三种 types：

- **Research**：阅读 documentation、third-party APIs，或 local resources（例如 knowledge bases）。创建 markdown summary 作为 asset。当需要 current working directory 之外的 knowledge 时使用。
- **Prototype**：写 UI 或 logic code 来测试 hypothesis，或探索 design space。使用 `/prototype` skill。创建 prototype 作为 asset。当关键问题是 “how should it look” 或 “how should it behave” 时使用。
- **Grilling**：与 agent 对话。使用 `/grilling` 和 `/domain-modeling` skills。一次只问一个问题。Default case。

## Fog of war

Map 在 frontier 之外是 _deliberately_ incomplete。你的工作是调查 frontier，并按顺序 resolve 决策条目来推动 frontier 前进。一次推开一个 node 的 fog of war。

到某个时刻，fog of war 应该已经被推开到足够远，通往 finish line 的 path 已经清楚。此时不再需要更多决策条目，decision map 可视为 done。

## Invocation

两条 branches。无论哪条，**每个 session 都以 [Handoff](#handoff) 结束**；永远不要在一个 session 里 resolve 超过一个决策条目。

### Create the map

用户用 loose idea invoke。

1. 运行 `/grilling` + `/domain-modeling` session，surface open decisions。一次只问一个问题。
2. 写一个新的 decision map：大部分是 fog，frontier 已识别，trivially-decidable entries inline resolved。
3. Handoff。Map-building 是一个 session 的工作；不要同时 resolve 决策条目。

### Work through the map

用户用 existing map path invoke。条目编号是 **optional**；没有指定时，由你选择下一个 decision，而不是用户选择。

1. 将 **whole map** 作为 context load。
2. 选择决策条目。如果用户指定了，就使用它。否则选择编号最低且 [unblocked](#structure) 的 `open` 条目。按 [Structure](#structure) 中的规则 claim 它：在开始任何工作前设置 `Status: in-progress` 并保存。
3. Resolve 它，并按需 invoke skills。如果不确定，使用 `/grilling` 和 `/domain-modeling`。
4. 在条目 body 中记录 answer，并设置 `Status: resolved`。
5. 添加 newly-discovered 决策条目（带正确的 `Blocked by` edges）。如果已做 decisions 使 map 的其他部分失效，update 或 delete 那些 nodes。
6. Handoff。

用户可能并行运行 unblocked 决策条目，所以要预期其他 agents 会在自己的 sessions 中编辑同一张 map。

## Handoff

每个 session 结束时都要清空 context，并打开一个或多个 fresh sessions。结尾给出用户可 copy-paste 的 **Next steps** block。两种情况：

**仍有 open 决策条目。** 列出当前 unblocked 条目，然后给两种可 copy-paste 的选项：一个 bare command 用于单 session（你选择下一个条目），以及针对每个 unblocked 条目的 pinned command，用来并行运行。每个 fresh window 粘贴一行；可以打开一个、几个或全部。

> **Next steps** — 3 tickets unblocked: #4, #5, #6.
> Clear the context, then open fresh sessions.
>
> **One session** — resolves the next unblocked ticket:
> ```
> Invoke /decision-mapping with the map at <path>.
> ```
>
> **Parallel** — paste one line per window, up to all 3:
> ```
> Invoke /decision-mapping with the map at <path>, ticket #4.
> Invoke /decision-mapping with the map at <path>, ticket #5.
> Invoke /decision-mapping with the map at <path>, ticket #6.
> ```

**没有 open 决策条目。** Fog 已被推开到足够远，通往 finish line 的 path 已经清楚；map 完成。（Initial grilling 也可能发现根本没有 fog，那就一开始不需要建 map。）建议直接 implement，或使用 `/to-prd` 安排 multi-session implementation。
