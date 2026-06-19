---
"mattpocock-skills": patch
---

扩展 **`triage`** skill，使其能够 triage external pull requests：把 PR 当作一个附带 code 的 issue，走相同的 roles 和 state machine。PR 与 issues 一起 inline 流转（由 per-repo setup toggle 控制），discovery surface 只包含 external PRs，bug-only 的 “reproduce” step 泛化为统一的 “verify the claim” step；redundancy check 会把 already-implemented requests resolve 为 `wontfix`，且不会污染 out-of-scope knowledge base。`setup-matt-pocock-skills` 为 GitHub/GitLab 增加 “PRs as a request surface” toggle。
