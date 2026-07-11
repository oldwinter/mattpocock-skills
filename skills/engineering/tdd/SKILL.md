---
name: tdd
description: Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests.
---

# Test-Driven Development

TDD 是 red → green loop。这个 skill 是让该 loop 产出值得保留的 tests 的 reference：什么是好 test、tests 放在哪里、anti-patterns、以及 loop rules。每个 section 都适用于每个 cycle；在 loop 之前和期间查阅它，而不是事后。

探索 codebase 时，读取 `CONTEXT.md`（如果存在），让 test names 和 interface vocabulary 与项目 domain language 匹配，并尊重你触碰区域的 ADRs。

## What a good test is

Tests 应通过 public interfaces 验证 behavior，而不是 implementation details。Code 可以完全改变；tests 不应该。好 test 读起来像 specification：“user can checkout with valid cart” 清楚说明存在什么 capability；因为它不关心 internal structure，所以能 survive refactors。

示例见 [tests.zh.md](tests.zh.md)，mocking guidelines 见 [mocking.zh.md](mocking.zh.md)。

## Seams - where tests go

**seam** 是你测试的 public boundary：你观察 behavior、但不伸手进内部的 interface。Tests 位于 seams 上，绝不对着 internals。

**只在 pre-agreed seams 上测试。** 写任何 test 前，先写下要测试的 seams，并与用户确认。未确认 seam 上不得写 test。你不可能测试一切；预先同意 seams，才能让 testing effort 落在 critical paths 和 complex logic 上，而不是每个 edge case。

Ask: "What's the public interface, and which seams should we test?"

## Anti-patterns

- **Implementation-coupled**：mock internal collaborators、测试 private methods，或通过 side channel 验证（例如直接 query database，而不是使用 interface）。识别信号：refactor 时 behavior 没变，但 test breaks。
- **Tautological**：assertion 用与 code 相同的方式重新计算 expected value（`expect(add(a, b)).toBe(a + b)`、以同样方式手写 snapshot、constant asserted equal to itself），因此按构造必然通过，永远不会与 code 不一致。Expected values 必须来自 independent source of truth：known-good literal、worked example 或 spec。
- **Horizontal slicing**：先写所有 tests，再写所有 implementation。Bulk tests 验证 _imagined_ behavior：你测试的是 things 的 _shape_，而不是 user-facing behavior；tests 对真实 changes 迟钝；你在理解 implementation 前就承诺 test structure。改用 **vertical slices**：一个 test -> 一个 implementation -> repeat；每个 test 都是 **tracer bullet**，响应上一个 cycle 学到的东西。

## Rules of the loop

- **Red before green.** 先写 failing test，然后只写足够让它通过的 code。不要预判 future tests，也不要添加 speculative features。
- **One slice at a time.** 每个 cycle 一个 seam、一个 test、一个 minimal implementation。
- **Refactoring is not part of the loop.** 它属于 review stage（见 `code-review` skill），不属于 red → green implementation cycle。
