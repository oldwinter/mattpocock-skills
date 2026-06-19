---
name: design-an-interface
description: 使用 parallel sub-agents 为 module 生成多个 radically different interface designs。Use when user wants to design an API, explore interface options, compare module shapes, or mentions "design it twice".
---

# Design an Interface

基于 “A Philosophy of Software Design” 中的 “Design It Twice”：你的第一个想法不太可能是最好的。生成多个 radically different designs，然后比较。

## Workflow

### 1. Gather Requirements

设计前先理解：

- [ ] 这个 module 解决什么 problem？
- [ ] Callers 是谁？（other modules、external users、tests）
- [ ] Key operations 是什么？
- [ ] 有什么 constraints？（performance、compatibility、existing patterns）
- [ ] 什么应该 hidden inside，什么应该 exposed？

Ask: “What does this module need to do? Who will use it?”

### 2. Generate Designs (Parallel Sub-Agents)

使用 Task tool 同时 spawn 3+ sub-agents。每个都必须产出一个 **radically different** approach。

```text
Prompt template for each sub-agent:

Design an interface for: [module description]

Requirements: [gathered requirements]

Constraints for this design: [assign a different constraint to each agent]
- Agent 1: "Minimize method count - aim for 1-3 methods max"
- Agent 2: "Maximize flexibility - support many use cases"
- Agent 3: "Optimize for the most common case"
- Agent 4: "Take inspiration from [specific paradigm/library]"

Output format:
1. Interface signature (types/methods)
2. Usage example (how caller uses it)
3. What this design hides internally
4. Trade-offs of this approach
```

### 3. Present Designs

展示每个 design：

1. **Interface signature** - types、methods、params
2. **Usage examples** - callers 实际如何使用
3. **What it hides** - 内部保留的 complexity

Sequentially 展示 designs，让用户先 absorb 每个 approach，再进入 comparison。

### 4. Compare Designs

展示所有 designs 后，按以下维度比较：

- **Interface simplicity**：更少 methods、更简单 params
- **General-purpose vs specialized**：flexibility vs focus
- **Implementation efficiency**：shape 是否允许 efficient internals？
- **Depth**：small interface hiding significant complexity（good）vs large interface with thin implementation（bad）
- **Ease of correct use** vs **ease of misuse**

用 prose 讨论 trade-offs，不用 tables。突出 designs 最 diverge 的地方。

### 5. Synthesize

最好的 design 往往结合多个 options 的 insights。Ask：

- “Which design best fits your primary use case?”
- “Any elements from other designs worth incorporating?”

## Evaluation Criteria

来自 “A Philosophy of Software Design”：

**Interface simplicity**：Fewer methods、simpler params = 更易学习并正确使用。

**General-purpose**：无需 changes 即可 handle future use cases。但小心 over-generalization。

**Implementation efficiency**：Interface shape 是否允许 efficient implementation？还是 force awkward internals？

**Depth**：Small interface hiding significant complexity = deep module（good）。Large interface with thin implementation = shallow module（avoid）。

## Anti-Patterns

- 不要让 sub-agents 产出 similar designs；enforce radical difference
- 不要跳过 comparison；价值在 contrast
- 不要 implement；这里只关心 interface shape
- 不要基于 implementation effort evaluate
