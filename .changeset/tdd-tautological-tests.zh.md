---
"mattpocock-skills": patch
---

为 `tdd` skill 增加 **tautological test** anti-pattern。那些用与 code 相同方式重新计算 assertion 的 tests，按构造就会通过，给出零信心。它不同于已有的 implementation-coupling anti-pattern。该内容作为 peer 添加到三个位置：Philosophy principle（expected values 必须来自 independent source of truth）、per-cycle checklist gate，以及 `tests.md` 中的 BAD/GOOD example pair。
