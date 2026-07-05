Quickstart:

```bash
npx skills add mattpocock/skills --skill=diagnosing-bugs
```

```bash
npx skills update diagnosing-bugs
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/engineering/diagnosing-bugs)

## What it does

`diagnosing-bugs` 为困难 bug 和 performance regressions 运行 disciplined diagnosis loop：构建 repro、最小化、排序 hypotheses、instrument，然后带 regression test 修复。

在你拥有 **tight feedback loop** 前，它拒绝 hypothesize。这个 loop 是一个可运行命令，并且已经会因 *这个* bug 变红。先读代码构造理论、却没有这条命令，正是此 skill 要防止的失败模式。没有能变红的 loop，就没有 diagnosis。

## When to reach for it

输入 `/diagnosing-bugs`，或当任务匹配时 agent 自动触达。它会在 “diagnose” / “debug this”、或你报告某处 broken、throwing、failing、slow 时触发。

在困难问题上使用它：第一眼看不出的 bug、intermittent flake、在两个 known-good states 之间悄悄出现的 regression。若只是用一次性小程序 sanity-check design question，而不是追 defect，使用 [prototype](https://aihero.dev/skills-prototype)。

## The tight loop is the skill

一旦有了信号，其余事情，比如 bisection、hypothesis-testing、instrumentation，都变成机械工作。因此此 skill 将大量精力放在 Phase 1：构建一个 pass/fail command，驱动真正的 bug code path，并断言用户报告的 exact symptom，然后持续 **tighten** 到它 fast、deterministic、agent-runnable。30 秒且 flaky 的 loop 比没有好不了多少；2 秒且 deterministic 的 loop 才是真正的 debugging superpower。

它提供构建 loop 的梯子：failing test、curl script、CLI diff、headless browser、replayed trace、throwaway harness、fuzz loop、`git bisect run`、differential run。最后才使用 human-in-the-loop bash script。对于 non-deterministic bugs，目标不是干净 repro，而是 **higher reproduction rate**：循环触发、并行化、增加压力，直到 flake 可调试。

## It's working if

- 它先构建并运行 repro command，再开始理论化，并贴出 invocation 和 red output。
- Loop 断言你实际报告的 symptom，而不是附近的另一个 failure。
- Hypotheses 以 ranked、falsifiable list 出现，并在测试前展示给你。
- Debug instrumentation 带有 tag（`[DEBUG-...]`），并在宣称完成前 grep 清理。

## Where it fits

`diagnosing-bugs` 是 reach-for-it-anytime standalone：一旦某东西 broken 就进入它，修复和 regression test 完成后退出。当真正发现是没有好 seam 可以锁住 bug 时，它的 post-mortem 会交给 [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture)：问题在代码结构，而不只是 bug。无法确定该用哪个 skill 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
