---
name: decision-mapping
description: 将 loose idea 转成按顺序推进的 investigation tickets map，并逐个 drive 到 resolution。
disable-model-invocation: true
---

当一个 loose idea 需要不止一个 agent session 才能转成 plan 时，会 invoke 这个 skill。它会在 markdown file 中创建 stateful decision map，并引导用户按 tickets 顺序解决 open questions；这些 questions 可能需要 prototyping、research 或 discussion。

## The Decision Map

Decision map 是一个 compact Markdown file，每个 planning effort 一个，git-tracked alongside the project。它是 canonical artifact：**整个 map 都会作为 context 加载到每个 session**，所以它必须保持 compact。

Tickets 过程中创建的 assets 应从 map link out，而不是复制到 map 内。

### Structure

Numbered entries（“tickets”），每个都有自己的 section，并以 number 为 key：

```markdown
## #1: Relational Or Non-Relational Database?

Blocked by: #<ticket-number>, #<ticket-number>
Type: Research | Prototype | Discuss

### Question

<question-here>

### Answer

<answer-here>
```

每个 ticket 的大小应适配一个 100K token agent session。

## Ticket Types

Tickets 有三种 types：

- **Research**：阅读 documentation、third-party APIs，或 local resources（例如 knowledge bases）。创建 markdown summary 作为 asset。当需要 current working directory 之外的 knowledge 时使用。
- **Prototype**：写 UI 或 logic code 来测试 hypothesis，或探索 design space。使用 `/prototype` skill。创建 prototype 作为 asset。当关键问题是 “how should it look” 或 “how should it behave” 时使用。
- **Discuss**：与 agent 对话。使用 `/grilling` 和 `/domain-modelling` skills。Default case。

## Fog of war

Map 在 frontier 之外是 _deliberately_ incomplete。你的工作是调查 frontier，并按顺序 resolve tickets 来推动 frontier 前进。一次推开一个 node 的 fog of war。

到某个时刻，fog of war 应该已经被推开到足够远，通往 finish line 的 path 已经清楚。此时不再需要更多 tickets，decision map 可视为 done。

## Invocation

这个 skill 有两种 invocation：**bootstrap** 和 **resume**。

### Bootstrap

用户用 loose idea invoke。

1. 运行 `/grilling` 和 `/domain-modelling` session，surface open decisions。
2. 写一个新的 decision map：大部分是 fog，frontier 已识别，trivially-decidable entries inline resolved。
3. Stop。Map-building 是一个 session 的工作；不要同时 resolve tickets。

### Resume

用户用 existing map path 和 ticket number invoke。

1. 将 **whole map** 作为 context load。
2. 运行一个 session resolve 该 ticket，并按需 invoke skills。如果不确定，使用 `/grilling` 和 `/domain-modelling`。
3. 在 ticket body 中记录 session resolved 的内容。
4. 添加 newly-discovered tickets（带正确的 `blocked_by` edges）。
5. Stop。

如果已做 decisions 使 map 的其他部分失效，update 或 delete 那些 nodes。

## Parallelism

用户可能选择 parallel 运行 tickets，所以要预期其他 agents 会修改 map。

## Skipping The Decision Map

很多时候，initial grilling 会得出没有 fog of war 的结果。没有 unresolved tickets。除了 implement 外没什么要做。

这种情况下，你应该 offer 用户跳过 decision map 的机会，因为 decision map 只有在需要 multi-session decisions 时才必要。

如果他们跳过，你应建议直接 implement，或使用 `/to-prd` 来安排 multi-session implementation。
