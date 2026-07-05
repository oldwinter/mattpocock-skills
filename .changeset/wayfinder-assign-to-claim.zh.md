---
"mattpocock-skills": minor
---

将 **`wayfinder`** 的 claim mechanism 从 label 改为 assignee。

现在 session 会通过把 Issue assign 给驱动 map 的 dev 来 **claim** 它，而不是设置 `wayfinder:claimed` label。assignee 本身就是 claim：open 且 unassigned 的 Issue 才是 unclaimed。这在 GitHub 自己的 UI 中更自然，也让 label vocabulary 只需保留 `wayfinder:<type>`。*claim* leading word 以及 “first, before any work” rationale 不变，只是物理表达方式改变。
