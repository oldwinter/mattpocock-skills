---
name: diagnosing-bugs
description: 面向 hard bugs 和 performance regressions 的 disciplined diagnosis loop。Reproduce → minimise → hypothesise → instrument → fix → regression-test。Use when user says "diagnose this" / "debug this", reports a bug, says something is broken/throwing/failing, or describes a performance regression.
---

# Diagnosing Bugs

用于 hard bugs 的纪律化流程。只有在明确有理由时才跳过 phases。

探索 codebase 时，使用项目的 domain glossary 建立相关 modules 的清晰 mental model，并检查你触碰区域的 ADRs。

## Redact

这个 skill 会要求展示 commands、outputs 与 captured artifacts。**必须先脱敏所有 secret**，并用 `<REDACTED>` 替代。用 env vars 构建 loop，让 credential 留在 environment 中，而不是出现在展示内容里。Captured artifacts 可能带有 auth headers；只引用包含有效 signal 的行。

如果脱敏后的 output 不足以诊断 bug，明确说明并询问用户。

## Phase 1 — Build a feedback loop

**This is the skill.** 其他一切都是机械步骤。如果你拥有一个快速、deterministic、agent-runnable 的 pass/fail signal 来捕捉 bug，你就会找到原因；bisection、hypothesis-testing、instrumentation 都只是在消费这个 signal。如果没有，盯着 code 看再久也救不了你。

在这里投入不成比例的努力。**Be aggressive. Be creative. Refuse to give up.**

### Ways to construct one — 大致按这个顺序尝试

1. **Failing test**，在任何能触达 bug 的 seam 上：unit、integration、e2e。
2. 针对运行中的 dev server 的 **Curl / HTTP script**。
3. 带 fixture input 的 **CLI invocation**，将 stdout 与 known-good snapshot 做 diff。
4. **Headless browser script**（Playwright / Puppeteer）：驱动 UI，并断言 DOM/console/network。
5. **Replay a captured trace.** 将真实 network request / payload / event log 保存到磁盘，并在 isolation 中 replay 该 code path。
6. **Throwaway harness.** 启动系统的最小子集（一个 service、mocked deps），用一次 function call 触发 bug code path。
7. **Property / fuzz loop.** 如果 bug 是 “sometimes wrong output”，运行 1000 个 random inputs 来寻找 failure mode。
8. **Bisection harness.** 如果 bug 出现在两个 known states（commit、dataset、version）之间，自动化 “boot at state X, check, repeat”，让你可以 `git bisect run`。
9. **Differential loop.** 将同一 input 跑过 old-version vs new-version（或两个 configs），并 diff outputs。
10. **HITL bash script.** Last resort。如果必须由 human 点击，用 `scripts/hitl-loop.template.sh` 驱动他们，让 loop 仍然结构化。Captured output 反馈给你。

构建正确的 feedback loop，bug 就修好了 90%。

### Iterate on the loop itself

把 loop 当作 product。一旦你有了一个 loop，就问：

- 我能让它更快吗？（Cache setup、跳过 unrelated init、缩小 test scope。）
- 我能让 signal 更尖锐吗？（断言 specific symptom，而不是 “didn't crash”。）
- 我能让它更 deterministic 吗？（Pin time、seed RNG、isolate filesystem、freeze network。）

一个 30 秒且 flaky 的 loop 只比没有 loop 好一点。一个 2 秒且 deterministic 的 loop 是 debugging superpower。

### Non-deterministic bugs

目标不是 clean repro，而是**更高的 reproduction rate**。循环 trigger 100 次、parallelise、增加 stress、缩窄 timing windows、inject sleeps。50% 的 flake bug 是可调试的；1% 不是。持续提高 rate，直到它可调试。

### When you genuinely cannot build a loop

停下并明确说明。列出你尝试过什么。向用户请求：(a) 能 reproduce 的 environment access，(b) 已脱敏的 captured artifact（HAR file、log dump、core dump、带 timestamps 的 screen recording），或 (c) 允许添加 temporary production instrumentation。没有 loop 时，**不要**继续 hypothesise。

### Completion criterion — a tight loop that goes red

Phase 1 完成的标准是 loop 足够 **tight** 且 **red-capable**：你能指出**一条 command**（script path、test invocation 或 curl），已经至少运行过一次（展示已脱敏的 invocation 与 output），并满足：

- [ ] **Red-capable** — 它会驱动实际 bug code path，并断言**用户描述的 exact symptom**，因此能在这个 bug 上变 red、修复后变 green。仅仅“运行时不报错”不够，它必须能捕获这个 specific bug。
- [ ] **Deterministic** — 每次运行 verdict 相同；flaky bugs 则按上文固定在较高 reproduction rate。
- [ ] **Fast** — 用时数秒，而不是数分钟。
- [ ] **Agent-runnable** — 可以 unattended 运行；human in the loop 只允许通过 `scripts/hitl-loop.template.sh`。

在拥有一个你相信的 loop 前，不要进入 Phase 2。

## Phase 2 — Reproduce

运行 loop。看 bug 出现。

确认：

- [ ] loop 产生的是**用户**描述的 failure mode，而不是附近另一个恰好出现的 failure。Wrong bug = wrong fix。
- [ ] failure 能跨多次运行 reproduce（或对 non-deterministic bugs，以足够高的 rate reproduce，能用于 debugging）。
- [ ] 你已经捕获 exact symptom（error message、wrong output、slow timing），后续 phases 可用它验证 fix 确实解决问题。

没有 reproduce bug 前不要继续。

## Phase 3 — Hypothesise

测试任何 hypothesis 之前，先生成 **3–5 个 ranked hypotheses**。Single-hypothesis generation 会锚定第一个 plausible idea。

每个 hypothesis 必须是 **falsifiable**：说明它做出的 prediction。

> Format: “If <X> is the cause, then <changing Y> will make the bug disappear / <changing Z> will make it worse.”

如果你无法说明 prediction，这个 hypothesis 只是 vibe；丢弃或 sharpen 它。

**测试前把 ranked list 展示给用户。** 他们常有 domain knowledge，可以瞬间重新排序（“我们刚刚 deployed 了 #3 的 change”），或知道哪些 hypotheses 已经被排除。Cheap checkpoint, big time saver。不要因此阻塞；如果用户 AFK，就按你的 ranking 继续。

## Phase 4 — Instrument

每个 probe 都必须映射到 Phase 3 的一个 specific prediction。**一次只改变一个 variable。**

Tool preference:

1. 如果 env 支持，使用 **Debugger / REPL inspection**。一个 breakpoint 胜过十条 logs。
2. 在区分 hypotheses 的 boundaries 添加 **Targeted logs**。
3. 永远不要 “log everything and grep”。

**给每条 debug log 加 unique prefix**，例如 `[DEBUG-a4f2]`。结束时 cleanup 就变成一次 grep。Untagged logs survive；tagged logs die。

**Perf branch.** 对 performance regressions 来说，logs 通常是错误工具。改为建立 baseline measurement（timing harness、`performance.now()`、profiler、query plan），然后 bisect。Measure first, fix second。

## Phase 5 — Fix + regression test

在 fix 前写 regression test，但前提是存在**正确的 seam**。

正确 seam 指的是 test 能按 call site 真实发生的方式 exercise **real bug pattern**。如果唯一可用 seam 太浅（single-caller test 但 bug 需要 multiple callers、unit test 无法 replicate 触发 bug 的 chain），那里的 regression test 会给出 false confidence。

**如果不存在正确 seam，这本身就是 finding。** 记录它。Codebase architecture 正在阻止 bug 被锁定。把这点标记给下一 phase。

如果存在正确 seam：

1. 将 minimised repro 变成该 seam 上的 failing test。
2. 看它 fail。
3. 应用 fix。
4. 看它 pass。
5. 针对 original（un-minimised）scenario 重新运行 Phase 1 feedback loop。

## Phase 6 — Cleanup + post-mortem

宣布 done 前必须完成：

- [ ] Original repro 不再 reproduce（重跑 Phase 1 loop）
- [ ] Regression test passes（或 documented absence of seam）
- [ ] 所有 `[DEBUG-...]` instrumentation 已移除（grep prefix）
- [ ] Throwaway prototypes 已删除（或移动到 clearly-marked debug location）
- [ ] 在 commit / PR message 中说明最终正确的 hypothesis，让下一个 debugger 学到东西

**然后问：什么本可以阻止这个 bug？** 如果答案涉及 architectural change（没有好的 test seam、tangled callers、hidden coupling），带着 specifics hand off 给 `/improve-codebase-architecture` skill。Recommendation 要在 fix 之后提出，而不是之前；现在你比刚开始时掌握更多信息。
