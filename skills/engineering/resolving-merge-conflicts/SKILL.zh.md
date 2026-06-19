---
name: resolving-merge-conflicts
description: "当你需要解决正在进行的 git merge/rebase conflict 时使用。"
---

1. **查看 merge/rebase 的当前状态**。检查 git history 和 conflicting files。

2. **找到每个 conflict 的 primary sources**。深入理解每个 change 为什么发生、原始 intent 是什么。阅读 commit messages，检查 PRs，检查原始 issues/tickets。

3. **解决每个 hunk**。尽可能保留双方 intent。若二者不兼容，选择符合本次 merge stated goal 的一方，并记录 trade-off。不要 invent new behaviour。必须 resolve，永远不要 `--abort`。

4. 发现并运行项目的 **automated checks**，通常是 typecheck、tests、format。修复 merge 造成的任何问题。

5. **完成 merge/rebase**。Stage everything 并 commit。如果是在 rebase，继续 rebase process，直到所有 commits 都完成 rebase。
