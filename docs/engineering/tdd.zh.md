Quickstart:

```bash
npx skills add oldwinter/mattpocock-skills --skill=tdd
```

```bash
npx skills update tdd
```

[Source](https://github.com/oldwinter/mattpocock-skills/tree/main/skills/engineering/tdd)

## What it does

`tdd` 会 test-first 地构建 feature 或修复 bug，一次一个 behaviour，通过 red-green loop 驱动代码出现。

它 **不会**一次性写完所有 tests。先 batch tests（“horizontal slicing”）会产生对 _imagined_ behaviour 的 tests：它们检查形状，却对真实变化迟钝。`tdd` 改用 vertical slices：一个 test，然后刚好足够通过它的 code，再下一个 test；每个 cycle 都由上一个 cycle 学到的东西引导。Tests 只针对 public interfaces，因此底层 implementation 可以改变而 tests 不动。

## When to reach for it

输入 `/tdd`，或当任务匹配时 agent 自动触达：test-first 构建 feature、修 bug，或你说 “red-green-refactor”。

当有具体 behaviour 要 build，且你希望 tests 能经受 refactor 时使用它。如果 behaviour 尚未 pinned down，先 settle spec，使用 [to-spec](https://aihero.dev/skills-to-spec)。当工作真正关注的是 interface shape 而不是 tests，使用 [codebase-design](https://aihero.dev/skills-codebase-design)；`tdd` 在 planning 中会调用它获取 deep-module vocabulary。

## Red-green, one slice at a time

Leading idea 是 **red-green loop**：写一个 failing test（red），添加刚好足够的 code 让它通过（green），再为下一个 behaviour 重复。第一轮是 **tracer bullet**：一个证明单条路径 end-to-end 可行的 test，然后再向外构建。因为你刚刚写了 code，你清楚哪个 behaviour 重要以及如何 verify 它；你不会在还不理解 test structure 时提前承诺它。

两条规则保持 tests 诚实。好 test 像 specification 一样读起来（“user can checkout with valid cart”），并通过 public API 走真实 code paths，所以重命名 internal function 不会破坏它。Expected values 来自 independent source of truth，例如 known-good literal、worked example 或 spec，而不是用和 code 相同的方式重新计算；后者会形成 **tautological** test，按构造必然通过，却不给信心。

Refactoring 只在 suite green 后发生；red 时绝不 refactor。

## It's working if

- 它写一个 test，让它通过，然后才写下一个，而不是先 batch tests 再 batch code。
- Tests 命名 behaviours，而不是 internals，并且能经受 internal rename。
- Expected values 是 spec 中的 literals，而不是用 code 同样方式推导的数字。

## Where it fits

`tdd` 是 main build chain 用来写 code 的 red-green loop：

```txt
grill-with-docs -> to-spec -> to-tickets -> implement -> code-review
```

[implement](https://aihero.dev/skills-implement) 是 chain 的 build step，它内部驱动 `tdd` test-first 构建每个 Issue，再交给 [code-review](https://aihero.dev/skills-code-review)，所以 `tdd` 是该 step 的 engine，而不是独立 chain step。你也可以在有具体 behaviour 但没有完整 spec 时直接触达它。另一个邻居是 [codebase-design](https://aihero.dev/skills-codebase-design)，`tdd` 依赖它找到值得测试的 deep-module seams。无法确定该用哪个 skill 或 flow 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
