## What it does

`resolving-merge-conflicts` 会处理正在进行的 git merge 或 rebase conflict，逐个 hunk 解决，并完成整个操作：resolved、checked、committed。

它按 **intent** 解决，而不是按 text。触碰 hunk 前，它会把每一边追溯到 **primary source**：commit message、PR、original issue，理解 change 为什么发生，然后在兼容时保留双方 intent。它不会发明新行为来遮盖冲突，也不会使用 `--abort`：merge 一定会完成。

## When to reach for it

输入 `/resolving-merge-conflicts`，或当任务匹配时 agent 自动触达。

当你处于 merge 或 rebase 中途，而 git 停在无法自动解决的 conflicts 时使用它。它处理眼前的 conflict，不用于规划 merge，也不用于调试 merge 后出现的行为错误。若 merge 已完成但某些东西现在失败且原因不明，使用 [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs)。

## Resolving by intent

Conflict 的陷阱是把它当成 text problem：选择 “ours” 或 “theirs” 让 markers 消失。此 skill 把它视为 **intent** problem。hunk 的每一边都因某个人想要某件事而存在；resolution 必须在可能时尊重双方 wants，真正不兼容时选择符合此次 merge 目标的一方，并明确说出 trade-off。

这就是 primary sources 重要的原因。没读过 intent，就无法保留 intent，所以工作从 history 开始：commits、PRs、Issues，而不是 diff。

## It's working if

- 每个 resolved hunk 都保留双方行为，或说明无法同时保留时的 trade-off。
- 没有引入任一分支上都不存在的新行为。
- 项目的 checks，包括 typecheck、tests、format，被找到并在 commit 前通过。
- Merge 或 rebase 被一路完成为 clean committed tree，而不是 abort。

## Common questions

**Claude Code 本来就很会解决 conflicts，为什么还需要 skill？**

增量价值在“找到 primary sources”和“运行 feedback loops”两步。未提示的 agent 往往只看 diff 产出 plausible resolution，然后停止；本 skill 不允许跳过每一侧为什么存在，以及 resolution 后是否真的工作。随着 [model](https://www.aihero.dev/ai-coding-dictionary/model) 提升，这个 margin 可以很薄。

**为避免 conflicts，是否应让 parallel agents 永远不碰同一文件？**

通常没必要，按文件 zoning 的成本往往大于 conflict 本身。真正值得保留的 discipline 是先做大型 refactor，避免十个 branches 都从 rename 之前分出。独立 worktrees 合回时，最好让写出 change 的原 session 处理自己的 conflict，因为它已经掌握 intent；全部交给末尾一个 agent，会丢掉本 skill 又要重建的 [context](https://www.aihero.dev/ai-coding-dictionary/context)。

**为什么绝不 `--abort`？**

Abort 会丢弃已完成的 resolution work，并让下次尝试再次遇到同一 conflict。本 skill 面向“这个 merge 确实要完成”的情况；若决定不 merge，应在调用前作出，而不是把 abort 放进 resolution loop。

## Where it fits

这是 reach-for-it-anytime standalone：merge 或 rebase 卡住时调用它，它把 clean、committed tree 交还给你。自然邻居是 [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs)，因为一个能干净 resolve 但 merge 后行为异常的问题，是 diagnosis problem，不是 conflict problem。无法确定该用哪个 skill 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
