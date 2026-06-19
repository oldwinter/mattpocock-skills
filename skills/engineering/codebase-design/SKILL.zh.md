---
name: codebase-design
description: Shared vocabulary for designing deep modules. Use when the user wants to design or improve a module's interface, find deepening opportunities, decide where a seam goes, make code more testable or AI-navigable, or when another skill needs the deep-module vocabulary.
---

# Codebase Design

设计 **deep modules**：在一个 clean seam 上，用 small interface 包住大量 behaviour，并能通过该 interface test。凡是设计或重构 code 时，都使用这套 language 和 principles。目标是给 callers leverage，给 maintainers locality，并让每个人都更容易测试。

## Glossary

精确使用这些 terms，不要替换成 “component”、“service”、“API” 或 “boundary”。Consistent language 是重点。

**Module** — 任何拥有 interface 和 implementation 的东西。刻意 scale-agnostic：function、class、package，或跨 tier 的 slice。_Avoid_: unit, component, service。

**Interface** — caller 为正确使用 module 必须知道的一切：type signature，也包括 invariants、ordering constraints、error modes、required configuration、performance characteristics。_Avoid_: API, signature（太窄，只指 type-level surface）。

**Implementation** — module 内部的 code body。不同于 **Adapter**：一个东西可以是 small adapter with large implementation（Postgres repo），也可以是 large adapter with small implementation（in-memory fake）。当 seam 是讨论主题时用 “adapter”；否则用 “implementation”。

**Depth** — interface 上的 leverage：caller（或 test）每学习一单位 interface，可 exercise 的 behaviour 数量。一个 module 在 small interface 后面有大量 behaviour 时是 **deep**；interface 几乎和 implementation 一样复杂时是 **shallow**。

**Seam** _(Michael Feathers)_ — 一个可以在不编辑原处的情况下 alter behaviour 的地方；module interface 所在的 *location*。Where to put the seam 是独立的 design decision，不同于 what goes behind it。_Avoid_: boundary（与 DDD 的 bounded context 过载）。

**Adapter** — 在 seam 处满足 interface 的 concrete thing。描述 *role*（填哪个 slot），不是 substance（内部是什么）。

**Leverage** — callers 从 depth 中得到的东西：每学习一单位 interface 获得更多 capability。一个 implementation 会在 N 个 call sites 和 M 个 tests 上回本。

**Locality** — maintainers 从 depth 中得到的东西：change、bugs、knowledge 和 verification 集中在一个地方，而不是散落到 callers。Fix once, fixed everywhere。

## Deep vs shallow

**Deep module** = small interface + lots of implementation：

```text
┌─────────────────────┐
│   Small Interface   │  ← Few methods, simple params
├─────────────────────┤
│                     │
│  Deep Implementation│  ← Complex logic hidden
│                     │
└─────────────────────┘
```

**Shallow module** = large interface + little implementation（avoid）：

```text
┌─────────────────────────────────┐
│       Large Interface           │  ← Many methods, complex params
├─────────────────────────────────┤
│  Thin Implementation            │  ← Just passes through
└─────────────────────────────────┘
```

设计 interface 时，问：

- 能否减少 methods 数量？
- 能否简化 parameters？
- 能否把更多 complexity 藏到内部？

## Principles

- **Depth 是 interface 的 property，不是 implementation 的 property。** Deep module 内部可以由 small、mockable、swappable parts 组成，只是它们不属于 interface。一个 module 可以同时有 **internal seams**（implementation 私有，供它自己的 tests 使用）和 interface 处的 **external seam**。
- **The deletion test.** 想象删除该 module。如果 complexity 消失，它就是 pass-through。如果 complexity 在 N 个 callers 中重新出现，它就在 earning its keep。
- **The interface is the test surface.** Callers 和 tests 穿过同一个 seam。如果你想 test *past* the interface，这个 module 形状大概率不对。
- **One adapter means a hypothetical seam. Two adapters means a real one.** 除非某个东西真的 across it varies，否则不要 introduce seam。

## Designing for testability

Good interfaces 让 testing natural：

1. **Accept dependencies, don't create them.**

   ```typescript
   // Testable
   function processOrder(order, paymentGateway) {}

   // Hard to test
   function processOrder(order) {
     const gateway = new StripeGateway();
   }
   ```

2. **Return results, don't produce side effects.**

   ```typescript
   // Testable
   function calculateDiscount(cart): Discount {}

   // Hard to test
   function applyDiscount(cart): void {
     cart.total -= discount;
   }
   ```

3. **Small surface area.** Fewer methods = fewer tests needed。Fewer params = simpler test setup。

## Relationships

- 一个 **Module** 恰好有一个 **Interface**（它呈现给 callers 和 tests 的 surface）。
- **Depth** 是 **Module** 的 property，以其 **Interface** 衡量。
- **Seam** 是 **Module** 的 **Interface** 所在的位置。
- **Adapter** 位于 **Seam**，并满足 **Interface**。
- **Depth** 为 callers 产生 **Leverage**，为 maintainers 产生 **Locality**。

## Rejected framings

- **Depth as ratio of implementation-lines to interface-lines**（Ousterhout）：会奖励 padding implementation。这里使用 depth-as-leverage。
- **“Interface” as TypeScript `interface` keyword or a class's public methods**：太窄；这里的 interface 包含 caller 必须知道的每个 fact。
- **“Boundary”**：与 DDD 的 bounded context 过载。说 **seam** 或 **interface**。

## Going deeper

- **Deepening a cluster given its dependencies** — 见 [DEEPENING.zh.md](DEEPENING.zh.md)：dependency categories、seam discipline、replace-don't-layer testing。
- **Exploring alternative interfaces** — 见 [DESIGN-IT-TWICE.zh.md](DESIGN-IT-TWICE.zh.md)：启动 parallel sub-agents，用几种 radically different ways 设计 interface，再按 depth、locality、seam placement 比较。
