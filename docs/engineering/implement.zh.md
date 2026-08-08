## 功能

`implement` 根据 spec 或一组 tickets 实现工作，通过 test-driven development、typechecking 和完整 test suite 推进，最后交给 review 并 commit 到当前 branch。

它**不决定要 build 什么**。Spec 已确定、seams 已约定；`implement` 负责执行，而不是重新打开 planning。

## 何时使用

这是 user-invoked skill，需要输入 `/implement`。当工作已写成 spec 或拆成 tickets，并准备转成 code 时使用。如果还没有 spec，先用 [to-spec](https://aihero.dev/skills-to-spec)；需要拆分时用 [to-tickets](https://aihero.dev/skills-to-tickets)。只想针对一个明确 behaviour 做 test-first 实现时，可以直接用 [tdd](https://aihero.dev/skills-tdd)。

## Pre-agreed seams

`implement` 围绕预先约定的 **seam** 工作，也就是 feature 被测试的 stable interface。它不在实现中途随意发明 seams，而是使用 [to-spec](https://aihero.dev/skills-to-spec) 已确认的 seams，并通过 [tdd](https://aihero.dev/skills-tdd) 先写 tests。

它会频繁 typecheck、运行单个 test file，最后运行完整 suite；然后执行 [code-review](https://aihero.dev/skills-code-review) 并 commit。

## Common questions

**实现完成了，但 ticket 仍然 open，acceptance criteria 也没勾选。**

这是当前预期行为。`implement` 在 commit 处结束，不会关闭 GitHub/local tracker work item，也不会处理 `code-review` findings 或勾选 issue body。需要人工 reconcile criteria 并关闭 ticket；否则 `to-tickets` 依赖“blockers 已关闭”计算的 frontier 不会向前移动。

**可以一次交给它全部 tickets，或并行运行多个吗？**

不能。一次 invocation 只处理一张 ticket。多个 sessions 共用同一 checkout 时会争用 working directory、index 和 HEAD，可能让 amend、stash 或 commit 落到错误 work 上。需要并行时自行使用独立 git worktrees；注意 `refs/stash` 在 worktrees 之间仍共享。

**能不能开 PR，而不是直接 commit？**

没有内建 PR mode，也没有配置 flag。它会 commit 到当前 branch。需要不同流程时，在 invocation 中明确要求使用新 branch 并开 PR，或维护本地 fork。

**`code-review` 说看不到我的 changes。**

`code-review` 比较 `git diff <fixed-point>...HEAD`，不包含 staged/working-tree changes；而 `implement` 在 commit 前调用它，因此没有 interim commit 时 review 看不到当前工作。这是两边尚未修复的交互。可靠做法是先 commit，再从 branch point review，随后 amend 或 fixup。也可以在 fresh session 单独运行 review，减少同一 agent 自审的 bias。

**一张 ticket 消耗了 150k tokens，是用错了吗？**

更可能是 ticket 太大。一次 run 包含 codebase exploration、每个 seam 的 red-green loop、full suite 与 review，复杂 ticket 超过 100k [tokens](https://www.aihero.dev/ai-coding-dictionary/token) 并不罕见。应在 [to-tickets](https://aihero.dev/skills-to-tickets) 上游缩小 ticket，使每张适合一个 fresh window，而不是单纯提高 [effort](https://www.aihero.dev/ai-coding-dictionary/effort)。

**Fresh session 中运行 `/implement #2`，却处理了无关内容。**

`#2` 可能被解析成 agent 看到的任意编号列表，而不是 configured tracker，且解析并不会 fail closed。传完整 issue URL 或 `owner/repo#2`，并让 agent 在开始前复述确认 title。

## 所处流程

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

每个 fresh context 处理一张 frontier ticket。其上游是声明 blocking edges 的 [to-tickets](https://aihero.dev/skills-to-tickets)，内部驱动 [tdd](https://aihero.dev/skills-tdd)，结束前运行 [code-review](https://aihero.dev/skills-code-review)。
