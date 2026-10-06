---
name: implement-spec
description: "用代码实现 /to-spec 与 /to-tickets 的产出。"
disable-model-invocation: true
---

你已获得一份 spec。该 spec 应关联若干 tickets，用于描述如何实现它。

Issue tracker 应已提供给你。如果没有，告诉用户运行 `/setup-matt-pocock-skills`。

目标是在单个 **integration branch** 上实现完整 spec，并按 issue tracker 关闭工作的方式解决每个 ticket。

Tickets 不是步骤列表，而是带有 blocking relationships 的 **task graph**。因此，始终会有一组已经 ready、可以领取的 tickets，称为 **frontier**。

与 subagents 的双向沟通应保持精简。主要通过 **context pointers** 沟通，指向 spec、tickets、research notes 和之前的 commits。不要重复 pointers 已经提供的信息。

在条件允许时，让 **implementer subagents** 在 background 中运行，以获得最大 concurrency。

## Steps

1. 阅读 spec 和 tickets，理解 task graph。

2. （可选）使用 **exploration subagent** 完成 tickets 所需的探索，例如相关 codebase files 或 external documentation。确保 exploration subagent 能保存文件，并让它把 Markdown notes 保存到 repo 外、所有后续 subagents 都能访问的 directory。这样 **implementer subagents** 可以专注于 implementation，而不是 exploration。

3. 创建 integration branch。如果 issue tracker 通过 PR 关闭工作，或用户要求创建 PR，则在第 5 步第一次 merge 后打开 draft PR（没有领先 main 的 commit 时无法创建 PR），并标记它会关闭 spec 和 tickets。

4. 使用 **implementer subagents** 实现每个 ticket，每个 subagent 都在独立 worktree 和独立 branch 中工作。每个 implementer subagent：
   - 开始前确认其 worktree 基于 integration branch；若不是，则 reset 到该分支；
   - 调用 `tdd` Skill 构建 ticket；
   - 报告完成前，将 integration branch 的 tip merge 到自己的 branch。

5. 某个 **implementer subagent** 完成后，使用 **merger subagent** 将其工作 merge 到 integration branch。

6. 如果 available tickets 的 **frontier** 因此变化，启动更多 **implementer subagents** 处理新的 tickets，以获得最大 concurrency。

7. 所有 tickets 完成后，在 integration branch 上调用 `code-review` Skill。使用单个 **implementer subagent** 修复 code review 提出的所有问题。

8. 如果 draft PR 已存在，将它标记为 ready for review。否则，按 issue tracker 关闭工作的方式解决每个 ticket，并报告 integration branch。

9. 清理所有 **implementer subagent** worktrees。
