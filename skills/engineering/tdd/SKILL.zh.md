---
name: tdd
description: Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests.
---

# Test-Driven Development

## Philosophy

**Core principle**：Tests 应该通过 public interfaces 验证 behavior，而不是 implementation details。Code 可以完全改变；tests 不应该。

**Good tests** 是 integration-style：它们通过 public APIs exercise real code paths。它们描述 system 做**什么**，而不是**如何**做。一个好 test 读起来像 specification：“user can checkout with valid cart” 清楚说明存在什么 capability。因为它们不关心 internal structure，这些 tests 能 survive refactors。

**Bad tests** 与 implementation coupling。它们 mock internal collaborators、测试 private methods，或通过 external means 验证（例如直接 query database，而不是使用 interface）。Warning sign：refactor 时 behavior 没变但 test breaks。如果你 rename internal function 后 tests fail，这些 tests 测的是 implementation，不是 behavior。

示例见 [tests.zh.md](tests.zh.md)，mocking guidelines 见 [mocking.zh.md](mocking.zh.md)。

## Anti-Pattern: Horizontal Slices

**不要先写所有 tests，再写所有 implementation。** 这是 “horizontal slicing”：把 RED 当作 “write all tests”，把 GREEN 当作 “write all code”。

这会产生 **crap tests**：

- Bulk 写出的 tests 测的是 imagined behavior，而不是 actual behavior
- 你最终测试的是 things 的 shape（data structures、function signatures），而不是 user-facing behavior
- Tests 对真实 changes 变得 insensitive：behavior breaks 时它们 pass，behavior 正常时它们 fail
- 你跑得超过 headlights，在理解 implementation 前就承诺了 test structure

**Correct approach**：通过 tracer bullets 做 vertical slices。一个 test → 一个 implementation → repeat。每个 test 都响应你从上一个 cycle 学到的东西。因为你刚写完 code，你清楚什么 behavior 重要，以及如何 verify。

```text
WRONG (horizontal):
  RED:   test1, test2, test3, test4, test5
  GREEN: impl1, impl2, impl3, impl4, impl5

RIGHT (vertical):
  RED→GREEN: test1→impl1
  RED→GREEN: test2→impl2
  RED→GREEN: test3→impl3
  ...
```

## Workflow

### 1. Planning

探索 codebase 时，读取 `CONTEXT.md`（如果存在），让 test names 和 interface vocabulary 与项目 domain language 匹配，并尊重你触碰区域的 ADRs。

写任何 code 前：

- [ ] 与用户确认需要哪些 interface changes
- [ ] 与用户确认要测试哪些 behaviors（prioritize）
- [ ] 识别 deep modules opportunities（small interface、deep implementation）— 运行 `/codebase-design` skill 获取 vocabulary 和 testability checks
- [ ] 列出要测试的 behaviors（不是 implementation steps）
- [ ] 获得用户对 plan 的 approval

Ask: “What should the public interface look like? Which behaviors are most important to test?”

**You can't test everything.** 与用户确认哪些 behaviors 最重要。把 testing effort 聚焦在 critical paths 和 complex logic，而不是每个 possible edge case。

### 2. Tracer Bullet

写 ONE test，确认 system 的 ONE thing：

```text
RED:   Write test for first behavior → test fails
GREEN: Write minimal code to pass → test passes
```

这是你的 tracer bullet：证明 path 能 end-to-end 工作。

### 3. Incremental Loop

对每个 remaining behavior：

```text
RED:   Write next test → fails
GREEN: Minimal code to pass → passes
```

Rules：

- 一次一个 test
- 只写足够让当前 test pass 的 code
- 不预判 future tests
- Tests 聚焦 observable behavior

### 4. Refactor

所有 tests pass 后，寻找 [refactor candidates](refactoring.zh.md)：

- [ ] Extract duplication
- [ ] Deepen modules（把 complexity 移到 simple interfaces 后面）
- [ ] 在自然时应用 SOLID principles
- [ ] 思考 new code 暴露了 existing code 的哪些问题
- [ ] 每个 refactor step 后运行 tests

**Never refactor while RED.** 先到 GREEN。

## Checklist Per Cycle

```text
[ ] Test describes behavior, not implementation
[ ] Test uses public interface only
[ ] Test would survive internal refactor
[ ] Code is minimal for this test
[ ] No speculative features added
```
