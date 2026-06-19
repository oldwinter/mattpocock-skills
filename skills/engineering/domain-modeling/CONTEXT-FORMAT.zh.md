# CONTEXT.md Format

## Structure

```md
# {Context Name}

{用一两句话说明这个 context 是什么，以及它为什么存在。}

## Language

**Order**:
{这个 term 的一两句话描述}
_Avoid_: Purchase, transaction

**Invoice**:
交付后发送给 customer 的付款请求。
_Avoid_: Bill, payment request

**Customer**:
下单的人或组织。
_Avoid_: Client, buyer, account
```

## Rules

- **Be opinionated.** 当多个词表示同一 concept 时，选择最好的那个，并把其他词列在 `_Avoid_` 下。
- **Keep definitions tight.** 最多一两句话。定义它 IS 什么，而不是它 does 什么。
- **只包含这个项目 context 特有的 terms。** General programming concepts（timeouts、error types、utility patterns）不属于这里，即使项目大量使用它们。添加 term 前先问：这是此 context 独有 concept，还是 general programming concept？只有前者属于这里。
- **自然出现 clusters 时，用 subheadings 分组。** 如果所有 terms 都属于单一 cohesive area，flat list 就可以。

## Single vs multi-context repos

**Single context（大多数 repos）：** root 一个 `CONTEXT.md`。

**Multiple contexts：** root 的 `CONTEXT-MAP.md` 列出 contexts、它们所在位置以及彼此关系：

```md
# Context Map

## Contexts

- [Ordering](./src/ordering/CONTEXT.md) — receives and tracks customer orders
- [Billing](./src/billing/CONTEXT.md) — generates invoices and processes payments
- [Fulfillment](./src/fulfillment/CONTEXT.md) — manages warehouse picking and shipping

## Relationships

- **Ordering → Fulfillment**: Ordering emits `OrderPlaced` events; Fulfillment consumes them to start picking
- **Fulfillment → Billing**: Fulfillment emits `ShipmentDispatched` events; Billing consumes them to generate invoices
- **Ordering ↔ Billing**: Shared types for `CustomerId` and `Money`
```

Skill 会 infer 应用哪种 structure：

- 如果 `CONTEXT-MAP.md` 存在，读取它来寻找 contexts
- 如果只有 root `CONTEXT.md`，就是 single context
- 如果都不存在，在第一个 term 被 resolved 时 lazily 创建 root `CONTEXT.md`

当存在多个 contexts 时，infer 当前 topic 属于哪个。若不清楚，就询问。
