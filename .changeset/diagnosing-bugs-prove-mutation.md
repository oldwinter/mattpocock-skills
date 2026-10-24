---
"mattpocock-skills": patch
---

`diagnosing-bugs` 的 Phase 5 现在要求 agent 在相信 forced mutation 产生的 red 前，先与 pristine copy 做 `diff`；这样，实际没有改变任何内容的 edit 就无法伪装成 failing test（#955）。
