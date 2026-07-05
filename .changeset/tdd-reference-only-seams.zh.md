---
"mattpocock-skills": patch
---

将 `tdd` skill 重塑为 reference-only。red -> green -> refactor loop 已由 model 熟悉的 leading words 锚定，所以 step-by-step Workflow 多数只是在重述 loop，并重复 horizontal-slicing anti-pattern。移除 Workflow 和 per-cycle checklist；把其中一个持久想法，vertical slices / tracer bullets，折入 Anti-patterns section 和短 Rules-of-the-loop list。引入 **seam** 作为 tests 放置位置的 leading word，把旧 Philosophy 中 “public interfaces” prose 和 Planning 中 “confirm interface / behaviors” handshake 合并为一条规则：只在 pre-agreed seams 上测试，并在写任何 test 前与用户确认。

同时移除 refactor stage：TDD 现在是 red -> green，而不是 red -> green -> refactor。Refactoring 属于 review stage，不属于 implementation loop，因此移除 refactor rule 和 `refactoring.md`，其归属是 `review` skill。
