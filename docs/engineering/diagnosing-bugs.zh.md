## What it does

`diagnosing-bugs` 为困难 bug 和 performance regressions 运行 disciplined diagnosis loop：构建 repro、最小化、排序 hypotheses、instrument，然后带 regression test 修复。

在你拥有 **tight feedback loop** 前，它拒绝 hypothesize。这个 loop 是一个可运行命令，并且已经会因 *这个* bug 变红。先读代码构造理论、却没有这条命令，正是此 skill 要防止的失败模式。没有能变红的 loop，就没有 diagnosis。

## When to reach for it

输入 `/diagnosing-bugs`，或当任务匹配时 agent 自动触达。它会在 “diagnose” / “debug this”、或你报告某处 broken、throwing、failing、slow 时触发。

在困难问题上使用它：第一眼看不出的 bug、intermittent flake、在两个 known-good states 之间悄悄出现的 regression。若只是用一次性小程序 sanity-check design question，而不是追 defect，使用 [prototype](https://aihero.dev/skills-prototype)。

## The tight loop is the skill

一旦有了信号，其余事情，比如 bisection、hypothesis-testing、instrumentation，都变成机械工作。因此此 skill 将大量精力放在 Phase 1：构建一个 pass/fail command，驱动真正的 bug code path，并断言用户报告的 exact symptom，然后持续 **tighten** 到它 fast、deterministic、agent-runnable。30 秒且 flaky 的 loop 比没有好不了多少；2 秒且 deterministic 的 loop 才是真正的 debugging superpower。

Commands、outputs 与 captured artifacts 在展示前必须先脱敏：secret 用 `<REDACTED>` 替换，credentials 通过 env vars 留在 environment 中，HAR/log 等 artifacts 只引用包含 signal 的 lines。如果脱敏后不足以 diagnosis，skill 会明确说明并请求用户决定下一步，而不会泄露原始内容。

它提供构建 loop 的梯子：failing test、curl script、CLI diff、headless browser、replayed trace、throwaway harness、fuzz loop、`git bisect run`、differential run。最后才使用 human-in-the-loop bash script。对于 non-deterministic bugs，目标不是干净 repro，而是 **higher reproduction rate**：循环触发、并行化、增加压力，直到 flake 可调试。

## It's working if

- 它先构建并运行 repro command，再开始理论化，并展示已脱敏的 invocation 和 red output。
- Loop 断言你实际报告的 symptom，而不是附近的另一个 failure。
- Hypotheses 以 ranked、falsifiable list 出现，并在测试前展示给你。
- Debug instrumentation 带有 tag（`[DEBUG-...]`），并在宣称完成前 grep 清理。

## Common questions

**它会在我只想要直接答案时自动触发。**

这是最常见的已知问题，尤其在 activation threshold 较低的 [model](https://www.aihero.dev/ai-coding-dictionary/model) 上。正式 diagnosis 会先构造 repro，可能让简单问题变慢。当前可明确说“只回答，不要 diagnosis”，或在 [harness](https://www.aihero.dev/ai-coding-dictionary/harness) 中关闭 model invocation；从轻量回答逐步升级到完整 loop 的改进尚未发布。

**可以让它扫描整个 codebase，主动找 performance problems 吗？**

不能。它诊断一个已经能命名的 failure；performance branch 针对带 symptom 的 regression，会先建立 baseline 再 bisect。当前没有 proactive performance sweep skill。

**写 fix 前会停下来征求确认吗？**

不会。只有 Phase 3 的 ranked hypothesis list 是 human checkpoint；如果你离开，它会按自己的排序继续。Instrumentation 与 fix 之间没有额外 gate，需要时应在 invocation 中明确要求。

**我已经对 bug report 运行过 `/triage`，会重复吗？**

部分重复。`triage` 做 bounded 的“这是否真是 bug、surface 在哪里”检查，本 skill 做完整 diagnosis。Triage 的验证结果通常能提供 Phase 1 原料，但仍需在这里建立可重复、tight 的 feedback loop。

**它会不会泄露 repro command 或 HAR 中的 secrets？**

当前版本明确要求先脱敏所有 commands、outputs 与 captured artifacts，并让 credentials 只留在 env vars 中。脱敏后的材料不足时应停下询问，而不是展示原始 secret。

**安全扫描器为什么把它标成 high risk？**

它是 skill set 中少数携带可执行 shell template、要求运行脚本并可能 curl dev server 的项目，这种 capability surface 足以触发 static scanner。模板本身主要用 `read -r -p` 等待 human input；告警描述的是能力组合，不是已证明 exploit。

**`/diagnose` 去哪了？**

它在 v1.0.0 重命名为 `/diagnosing-bugs`，旧名不再存在。Wrapper skill 或 saved prompt 中的旧调用都需要更新。

## Where it fits

`diagnosing-bugs` 是 reach-for-it-anytime standalone：一旦某东西 broken 就进入它，修复和 regression test 完成后退出。当真正发现是没有好 seam 可以锁住 bug 时，它的 post-mortem 会交给 [improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture)：问题在代码结构，而不只是 bug。无法确定该用哪个 skill 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
