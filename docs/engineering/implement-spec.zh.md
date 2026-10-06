## What it does

`implement-spec` 接收一份 [spec](https://www.aihero.dev/ai-coding-dictionary/spec) 及其 [tickets](https://www.aihero.dev/ai-coding-dictionary/ticket)，在一次运行中完成全部实现。负责 orchestration 的 [agent](https://www.aihero.dev/ai-coding-dictionary/agent) 会把每个 ticket 交给独立 git worktree 中的 implementer [subagent](https://www.aihero.dev/ai-coding-dictionary/subagent)，把完成的 branches merge 到同一个 **integration branch**，对结果运行 [code-review](https://aihero.dev/skills-code-review)，最后解决 tickets。

它把 tickets 读取为 **task graph**，而不是列表。Blocking edges 决定哪些工作可以开始；所有 blockers 都已落地的 tickets 构成 **frontier**，frontier 上的 tickets 会同时运行。推进速度由 graph shape 决定，而不是 tracker 中的 ticket 顺序。

## When to reach for it

输入 `/implement-spec` 主动调用；agent 不会自行触发它。

| 情况 | 使用 |
| --- | --- |
| 已有带 blocking edges 的 spec 和 tickets，希望一次完成 | `/implement-spec` |
| 想在自己的 context window 中逐个处理 ticket，并在中间 clear | [implement](https://aihero.dev/skills-implement) |
| Spec 尚未拆成 tickets | 先运行 [to-tickets](https://aihero.dev/skills-to-tickets) |
| 工作很小，没有真正的 graph | 直接运行 [implement](https://aihero.dev/skills-implement) |

前置条件包括：已由 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 配置的 issue tracker；由 [to-tickets](https://aihero.dev/skills-to-tickets) 记录的 blocking edges；以及能在 background 运行 subagents、并为每个 subagent 提供 git worktree 的 [harness](https://www.aihero.dev/ai-coding-dictionary/harness)。缺少这些条件时，并发优势会消失。

所有工作最终落在一个 integration branch。每个 implementer 开始前确认 worktree 基于该分支，使用 [tdd](https://aihero.dev/skills-tdd) 按 red-green slices 实现 ticket，并在报告完成前把 integration branch tip merge 到自己的 branch。

Tracker 决定是否需要 PR。Tracker 通过 PR 关闭工作，或用户明确要求时，skill 会在第一次 merge 后创建 draft PR，并在结束时标记为 ready。否则运行会停在 integration branch，并按 tracker 的方式解决所有 tickets，因此 local markdown tracker 也能离线工作。

Implementers 通过 [context pointers](https://www.aihero.dev/ai-coding-dictionary/context-pointer) 沟通，包括 spec、ticket、共享 exploration notes 和较早 commits，避免粘贴重复 summary。

## Common questions

**它与自己逐个运行 `/implement` 有什么区别？**

逐个运行时，你负责调度 session、clear context 并跟踪哪些 tickets 已解除阻塞。`implement-spec` 把调度交给一个 orchestration session，并在结束时统一 review integration branch。对于没有实际 task graph 的小改动，仍应直接使用 `implement`。

**它必须使用 GitHub 吗？**

不需要。默认产物是 integration branch。只有配置的 tracker 通过 PR 关闭工作，或你明确要求时，才会创建 PR。

**为什么 review/fix loop 会运行很久，甚至修复尚未实现的 tickets？**

`code-review` 必须在所有 tickets 落地后只运行一次。中途运行时，未实现的 ticket 都会被判为失败并触发错误循环。最终 review 后应把 findings 交给一个 fix subagent；如果又开始第二次 broad review，应改为只运行针对 fixes 的 focused checks，然后停止。

**它会像 `implement` 一样驱动 TDD 吗？**

会。每个 implementer 都使用 `tdd`。但这里没有交互式确认 seams 的步骤；需要固定 seams 时，应把它们写进 spec 或 tickets。

**并行 implementers 修改了同一个文件，或为同一概念选择了不同名称，怎么办？**

Worktrees 只会把冲突推迟到 merge。若两个 frontier tickets 会触碰共享文件，应在它们之间增加 blocking edge，或在共享 exploration notes 中固定新增名称。

**Blocker 已 merge，但 blocked ticket 仍未启动，为什么？**

GitHub 的 blocked-by count 通常要等 blocker close 才更新，而 tickets 往往在最终 PR merge 时才 close。运行期间应由 orchestrator 根据已经 merge 到 integration branch 的 tickets 自行计算 frontier。

**它会替代 Sandcastle 或 AFK script 吗？**

不会。`implement-spec` 在一个 harness session 内由 agent 做 orchestration，便于观察和干预。真正 AFK 的工作更适合 deterministic loop，例如 [Sandcastle](https://github.com/mattpocock/sandcastle)、shell script 或 CI job。

**Worktree 中跳过了关键测试却报告 green，怎么办？**

Worktree 只包含 git 跟踪的内容。依赖 gitignored fixtures、local databases 或 credentials 的验证可能被跳过；这类检查应在 main checkout 中运行。

## It's working if

- Graph 允许时有多个 implementers 同时运行，而不是逐个运行。
- Ticket 在最后一个 blocker 落到 integration branch 后立即启动。
- 每个 ticket 的 trace 都显示 `tdd` 先运行 failing test，再编写 code。
- Merge 到 integration branch 时是 fast-forward，而不是现场解冲突。
- 最终只有一个 branch，所有 tickets 都已解决；只有 tracker 要求时才存在 PR。

## Where it fits

`implement-spec` 是 main chain 的 build step，也是逐 ticket 运行 [implement](https://aihero.dev/skills-implement) 的并行替代：

```txt
grill-with-docs → to-spec → to-tickets → implement-spec → retro
```

它读取 [to-tickets](https://aihero.dev/skills-to-tickets) 声明的 blocking edges，并在结束前对 integration branch 运行 [code-review](https://aihero.dev/skills-code-review)。不确定该走哪条 flow 时，使用 [ask-matt](https://aihero.dev/skills-ask-matt)。
