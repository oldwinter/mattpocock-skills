---
name: implement-spec
description: "在代码中实施一份规格说明。"
disable-model-invocation: true
---

你已获得一份 spec。该 spec 应关联一组 tickets，用于说明如何实施它。

目标是在单个 branch 上通过一个 PR 实施整份 spec。

这些 tickets 不是步骤列表，而是带有 blocking relationships 的 **task graph**。因此，始终会存在一组已经可以领取的 tickets，称为 **frontier**。

与 subagents 之间应尽量少通信，主要通过指向 spec、tickets、research notes 和先前 commits 的 **context pointers** 传递上下文。不要重复指针已经能够提供的信息。

应尽可能在后台运行 **implementer subagents**，以获得 **maximum concurrency**。

## 步骤

1. 阅读 spec 和 tickets，直到足以理解 task graph。

2. （可选）使用 **exploration subagent** 完成 tickets 所需的探索，包括相关 codebase files 或外部文档。确保 exploration subagent 可以保存文件：它应把 Markdown notes 放在 repo 外、所有后续 subagents 都能访问的目录中。这样 **implementer subagents** 就能专注于实施，而不是重复探索。

3. 创建 branch 和 draft PR。该 PR 应标记为会关闭 spec issue 和相关 tickets。

4. 使用 **implementer subagents** 实施各个 ticket。每个 implementer subagent 都应在自己的 worktree 和 branch 中工作。

5. 一个 **implementer subagent** 完成后，使用 **merger subagent** 将其工作合并到 PR branch。

6. 如果可用 tickets 的 **frontier** 发生变化，启动更多 **implementer subagents** 处理新进入 frontier 的 tickets，以保持 maximum concurrency。

7. 所有 tickets 完成后，在 PR branch 上运行 `/code-review`。使用一个 **implementer subagent** 集中修复 code review 提出的全部问题。

8. 将 PR 标记为 ready for review。

9. 清理所有 **implementer subagent** worktrees。
