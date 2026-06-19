# ADR Format

ADRs 存放在 `docs/adr/`，使用 sequential numbering：`0001-slug.md`、`0002-slug.md` 等。

Lazily 创建 `docs/adr/` directory：只在第一个 ADR 需要时创建。

## Template

```md
# {Short title of the decision}

{1-3 sentences: context 是什么、我们决定了什么、为什么。}
```

就这些。一个 ADR 可以只有一段。价值在于记录某个 decision 曾经被做出以及 why，而不是填满 sections。

## Optional sections

只有在真正增加 value 时才包含这些。大多数 ADRs 不需要。

- **Status** frontmatter（`proposed | accepted | deprecated | superseded by ADR-NNNN`）— decision 被重新审视时有用
- **Considered Options** — 仅当 rejected alternatives 值得记住时
- **Consequences** — 仅当 non-obvious downstream effects 需要被指出时

## Numbering

扫描 `docs/adr/`，找到最高 existing number 并加一。

## When to offer an ADR

以下三项必须全部为 true：

1. **Hard to reverse** — 之后改变主意的成本 meaningful
2. **Surprising without context** — 未来读者看到 code 会想 “why on earth did they do it this way?”
3. **The result of a real trade-off** — 存在真实 alternatives，并且你出于具体原因选择了一个

如果 decision 很容易 reverse，就跳过；你迟早会 reverse。若它并不 surprising，没人会问 why。若没有真实 alternative，就没必要记录 “we did the obvious thing” 之外的内容。

### What qualifies

- **Architectural shape.** “We're using a monorepo.” “The write model is event-sourced, the read model is projected into Postgres.”
- **Integration patterns between contexts.** “Ordering and Billing communicate via domain events, not synchronous HTTP.”
- **Technology choices that carry lock-in.** Database、message bus、auth provider、deployment target。不是每个 library，只是那些替换会花一个 quarter 的选择。
- **Boundary and scope decisions.** “Customer data is owned by the Customer context; other contexts reference it by ID only.” 明确的 no-s 和 yes-s 一样有价值。
- **Deliberate deviations from the obvious path.** “We're using manual SQL instead of an ORM because X.” 任何 reasonable reader 会假设相反的地方。这能阻止下一个 engineer 去 “fixing” 一个 deliberate decision。
- **Constraints not visible in the code.** “We can't use AWS because of compliance requirements.” “Response times must be under 200ms because of the partner API contract.”
- **Rejected alternatives when the rejection is non-obvious.** 如果你考虑过 GraphQL 并因 subtle reasons 选择 REST，记录下来，否则六个月后又会有人提 GraphQL。
