---
name: domain-modeling
description: 构建并打磨项目的 domain model。Use when the user wants to pin down domain terminology or a ubiquitous language, record an architectural decision, or when another skill needs to maintain the domain model.
---

# Domain Modeling

在 design 时主动 build 并 sharpen 项目的 domain model。这是一种 *active* discipline：challenge terms、发明 edge-case scenarios，并在概念 crystallise 的那一刻写入 glossary 和 decisions。（仅仅为了 vocabulary _reading_ `CONTEXT.md` 不是这个 skill；那只是任何 skill 都可以做的一行 habit。这个 skill 用于改变 model，而不只是 consuming it。）

## File structure

大多数 repos 只有一个 context：

```text
/
├── CONTEXT.md
├── docs/
│   └── adr/
│       ├── 0001-event-sourced-orders.md
│       └── 0002-postgres-for-write-model.md
└── src/
```

如果 root 有 `CONTEXT-MAP.md`，这个 repo 有多个 contexts。Map 指向每个 context 的位置：

```text
/
├── CONTEXT-MAP.md
├── docs/
│   └── adr/                          ← system-wide decisions
├── src/
│   ├── ordering/
│   │   ├── CONTEXT.md
│   │   └── docs/adr/                 ← context-specific decisions
│   └── billing/
│       ├── CONTEXT.md
│       └── docs/adr/
```

Lazily create files：只在有内容要写时创建。如果没有 `CONTEXT.md`，在第一个 term 被 resolved 时创建。如果没有 `docs/adr/`，在第一个 ADR 需要时创建。

## During the session

### Challenge against the glossary

当用户使用的 term 与 `CONTEXT.md` 中现有 language 冲突时，立即指出。“Your glossary defines 'cancellation' as X, but you seem to mean Y — which is it?”

### Sharpen fuzzy language

当用户使用 vague 或 overloaded terms 时，提出 precise canonical term。“You're saying 'account' — do you mean the Customer or the User? Those are different things.”

### Discuss concrete scenarios

讨论 domain relationships 时，用 specific scenarios stress-test。发明能探测 edge cases、迫使用户精确定义 concepts 之间 boundaries 的 scenarios。

### Cross-reference with code

当用户陈述某件事如何工作时，检查 code 是否一致。如果发现 contradiction，就 surface it：“Your code cancels entire Orders, but you just said partial cancellation is possible — which is right?”

### Update CONTEXT.md inline

当一个 term 被 resolved，立刻更新 `CONTEXT.md`。不要 batch；随着发生及时 capture。使用 [CONTEXT-FORMAT.zh.md](./CONTEXT-FORMAT.zh.md) 中的格式。

`CONTEXT.md` 应完全不含 implementation details。不要把 `CONTEXT.md` 当作 spec、scratch pad 或 implementation decisions repository。它只是 glossary。

### Offer ADRs sparingly

只有三个条件同时为 true 时，才 offer 创建 ADR：

1. **Hard to reverse** — 之后改变主意的成本 meaningful
2. **Surprising without context** — 未来读者会疑惑 “why did they do it this way?”
3. **The result of a real trade-off** — 存在真实 alternatives，并且你出于具体原因选择了一个

只要缺少其中任何一个，就跳过 ADR。使用 [ADR-FORMAT.zh.md](./ADR-FORMAT.zh.md) 中的格式。
