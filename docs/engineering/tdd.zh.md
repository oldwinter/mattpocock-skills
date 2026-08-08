## What it does

`tdd` 会 test-first 地构建 feature 或修复 bug，一次一个 behaviour，通过 red-green loop 驱动代码出现。

它 **不会**一次性写完所有 tests。先 batch tests（“horizontal slicing”）会产生对 _imagined_ behaviour 的 tests：它们检查形状，却对真实变化迟钝。`tdd` 改用 vertical slices：一个 test，然后刚好足够通过它的 code，再下一个 test；每个 cycle 都由上一个 cycle 学到的东西引导。Tests 只针对 public interfaces，因此底层 implementation 可以改变而 tests 不动。

## When to reach for it

输入 `/tdd`，或当任务匹配时 agent 自动触达：test-first 构建 feature、修 bug，或你说 “red-green-refactor”。

当有具体 behaviour 要 build，且你希望 tests 能经受 refactor 时使用它。如果 behaviour 尚未 pinned down，先 settle spec，使用 [to-spec](https://aihero.dev/skills-to-spec)。当工作真正关注的是 interface shape 而不是 tests，使用 [codebase-design](https://aihero.dev/skills-codebase-design)；`tdd` 在 planning 中会调用它获取 deep-module vocabulary。

## Red-green, one slice at a time

Leading idea 是 **red-green loop**：写一个 failing test（red），添加刚好足够的 code 让它通过（green），再为下一个 behaviour 重复。第一轮是 **tracer bullet**：一个证明单条路径 end-to-end 可行的 test，然后再向外构建。因为你刚刚写了 code，你清楚哪个 behaviour 重要以及如何 verify 它；你不会在还不理解 test structure 时提前承诺它。

两条规则保持 tests 诚实。好 test 像 specification 一样读起来（“user can checkout with valid cart”），并通过 public API 走真实 code paths，所以重命名 internal function 不会破坏它。Expected values 来自 independent source of truth，例如 known-good literal、worked example 或 spec，而不是用和 code 相同的方式重新计算；后者会形成 **tautological** test，按构造必然通过，却不给信心。

Refactoring 不属于这个 loop；它进入 review stage，由 [code-review](https://aihero.dev/skills-code-review) 处理。这里的 implementation cycle 只有 red -> green。

## It's working if

- 它写一个 test，让它通过，然后才写下一个，而不是先 batch tests 再 batch code。
- Tests 命名 behaviours，而不是 internals，并且能经受 internal rename。
- Expected values 是 spec 中的 literals，而不是用 code 同样方式推导的数字。

## Common questions

**Description 写了 “red-green-refactor”，为什么它不 refactor？**

Refactor step 已有意移除，因为 agents 几乎从不可靠执行它，把 implementation 与 review 放在不同 sessions 效果更好。Trigger phrase 仍保留，因此你说 “red-green-refactor” 会触发本 skill，但实际得到 red -> green，refactoring 交给 [code-review](https://aihero.dev/skills-code-review)。这个文案 mismatch 记录在 [issue #589](https://github.com/mattpocock/skills/issues/589)。

**它让我选 test seam，但我不知道如何选择。**

这是 [issue #607](https://github.com/mattpocock/skills/issues/607) 记录的常见 friction。当前 prompt 只列 candidate 名称，不解释 trade-offs。回答前先要求 agent 说明每个 seam 能捕获/遗漏什么，以及运行速度；更理想的是在 `to-spec` 阶段看到完整 feature 时就预先约定 seams。

**它还是先写 implementation，再补 test。**

这会发生。任何 instruction 都无法让 agent 100% 遵守，过度强制又会牺牲其他能力。某个 slice 必须严格 test-first 时，应观察 run，确认 test 先因正确原因变红，不能只相信 skill 会自动 enforce。

**应该先写 browser 或 end-to-end tests 吗？**

通常不要，本 skill 也不会自动阻止。Browser tests 太慢，会让 red-green feedback loop 失去收益。可在 repo `CLAUDE.md` / `AGENTS.md` 中规定：先让 behaviour 工作，再写 browser tests。

**`/tdd` 会取代 `/implement` 或课程里的 `/do-work` 吗？**

不会。`tdd` 定义 methodology；`implement` 是 work -> feedback -> commit 的 driver，也最接近 `/do-work`。对一张 ticket 开始工作时，通常运行 `/implement`，由它在内部使用 `/tdd`。

**Deep-modules 与 interface-design guidance 去哪里了？**

在 v1.0 被抽到 [codebase-design](https://aihero.dev/skills-codebase-design)，供多个 skills 共享。`refactoring.md` 同期移除，refactoring 由带 Fowler smell baseline 的 [code-review](https://aihero.dev/skills-code-review) 负责。

**它知道 sibling tickets 的 scope 吗？**

不知道。只给一张 ticket 时，它可能提出属于另一张 ticket 的工作。附带 spec 会有所帮助，更根本的解决方式是在上游正确切分 tickets。

## Where it fits

`tdd` 是 main build chain 用来写 code 的 red-green loop：

```txt
grill-with-docs -> to-spec -> to-tickets -> implement -> code-review
```

[implement](https://aihero.dev/skills-implement) 是 chain 的 build step，它内部驱动 `tdd` test-first 构建每个 Issue，再交给 [code-review](https://aihero.dev/skills-code-review)，所以 `tdd` 是该 step 的 engine，而不是独立 chain step。你也可以在有具体 behaviour 但没有完整 spec 时直接触达它。另一个邻居是 [codebase-design](https://aihero.dev/skills-codebase-design)，`tdd` 依赖它找到值得测试的 deep-module seams。无法确定该用哪个 skill 或 flow 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
