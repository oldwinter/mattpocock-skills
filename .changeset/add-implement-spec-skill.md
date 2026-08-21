---
"mattpocock-skills": patch
---

新增 `implement-spec` skill（in-progress bucket，user-invoked）。它接收一份 spec 及其 tickets，并将它们推进到一个 PR：tickets 会按带有 blocking edges 的 task graph 读取，implementer subagents 在 ready frontier 上的后台 worktrees 中并发运行，merger subagent 将各自结果合回 PR branch，最后在 PR 标记为 ready 前运行 `/code-review` 收尾。
