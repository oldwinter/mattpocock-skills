Quickstart:

```bash
npx skills add oldwinter/mattpocock-skills --skill=codebase-design
```

```bash
npx skills update codebase-design
```

[Source](https://github.com/oldwinter/mattpocock-skills/tree/main/skills/engineering/codebase-design)

## What it does

`codebase-design` 为设计 **deep modules** 提供共享、精确的 vocabulary：大量行为隐藏在小接口后，位于清晰 seam 上，并能通过该接口测试。

它是 **language, not a procedure**。它不会重构代码，也不会交给你 refactor plan；它固定的是词语（module、interface、depth、seam、adapter、leverage、locality），让每次 design conversation 和每个触及 design 的 skill 都用同一种语言。统一语言就是重点；“component”、“service”、“API” 和 “boundary” 被刻意禁用，因为它们模糊了真正重要的区别。

## When to reach for it

输入 `/codebase-design`，或当任务匹配时由 agent 自动触达。

当你在设计或改进 module interface、寻找 deepening opportunities、决定 seam 应该放在哪里，或让代码更可测试、更便于 AI navigate 时使用它。其他 skills 需要 deep-module vocabulary 时也会拉入它。如果你要打磨的是项目的 *domain* terms，而不是 module design，使用 [domain-modeling](https://aihero.dev/skills-domain-modeling)；如果你要对现有 codebase 做完整 architecture pass，使用 [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture)。

## Deep, not shallow

当大量行为位于小接口背后时，module 是 **deep**；当接口复杂度几乎和实现一样高时，它是 **shallow**。Depth 以 **leverage** 衡量：caller 或 test 每学习一单位接口，能驱动多少行为。关键是，depth 是 *interface* 的性质，不是 implementation 的性质：deep module 内部可以由小而可替换的 parts 组成，只要这些 parts 不暴露给 callers。

两个检查承担大部分工作。**deletion test**：想象删除这个 module，如果 complexity 消失，它只是 pass-through；如果 complexity 在 N 个 callers 中重新出现，它就真的有价值。以及 **one adapter means a hypothetical seam; two adapters means a real one**，也就是不要在确实存在 variation 前切 seam。

## The interface is the test surface

Callers 和 tests 穿过同一个 seam，所以放置良好的 interface 会给 tests 一个稳定目标，而底层代码可以自由移动。这就是为什么 vocabulary 坚持使用 **seam**（Feathers 的术语，指不用编辑当前位置即可改变行为的地方），而不是 overloaded “boundary”。这里的 “interface” 指 caller 必须知道的每个事实：signatures 是一部分，还包括 invariants、ordering、error modes 和 performance，而不只是 type-level surface。

## Pulled out on purpose

`codebase-design` 是 deep-module vocabulary 的 **single source of truth**，作为独立 model-invoked skill 拆出，因此任何 skill 都能触达它。其他 skills 指向它而不是重述这些词：[tdd](https://aihero.dev/skills-tdd) 借它在写 test 前放置 seam，[improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 在重塑现有代码时依赖它，[to-spec](https://aihero.dev/skills-to-spec) 在写 spec 前勾勒 seams 和 deepening opportunities 时也使用它。

保持 standalone 的意义在于，你也可以单独触达它，将其作为思考 module design 的 **reference**，而不触发任何更大的流程。只在一个地方固定词语，每次 design conversation 都继承它们。

## Where it fits

`codebase-design` 是 **reach-for-it-anytime standalone**，位于 engineering skills 下方的共享 vocabulary layer。它最接近的邻居是 [domain-modeling](https://aihero.dev/skills-domain-modeling)，后者是 problem domain 的并行 vocabulary skill，而不是 module structure。无法确定该用哪个 skill 或 flow 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
