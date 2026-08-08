## 功能

`prototype` 构建一个小型、可丢弃的程序，只回答一个 design question：state model 是否合理，或 UI 应该长什么样。

代码从第一天起就是 **throwaway**，并明确标记。它不包含 tests、超出可运行范围的 error handling、abstractions，也默认不做 persistence。目标是快速学习后把它从 main 和 production 移除；经单独批准的 side-branch 副本可以作为 primary-source evidence 保留。一旦开始 harden，它就不再是 prototype。

## 何时使用

输入 `/prototype`，或在任务符合条件时由 agent 自动触发。

当纸面推理不足以回答 “state model 是否合理” 或 “这个 UI 应该长什么样” 时使用。如果已有实现正在出错，需要找出原因，请改用 [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs)；prototype 探索要 build 什么，而不是已完成的东西为何出错。

## 两种 branch

Question 决定形状：

- **“Does this logic / state model feel right?”**：构建一个可双击打开、可分享给 non-developer 的 self-contained HTML file。它包含 free-play buttons 与按 tabs 组织的 guided walkthroughs，并在每次 action 后 render 完整 state。
- **“What should this look like?”**：在单一路由上构建多个结构差异明显的 UI variants，通过 floating bar 切换，以真实 render 做比较。

两个 branches 都保持 state in memory、做到 trivial-to-run，并在每一步 surface 完整 state。Logic demo 不使用 framework、bundler 或 server，labels 使用 domain language 而不是 code vocabulary；选错 branch 会浪费整个 prototype，因此必须先明确 question。

## 把 prototype 作为 primary source 保存

完成后的 prototype 留下两样东西：

- **Answer**：verdict 与它解决的 question，记录到 issue、ADR 或 commit。
- **Prototype**：answer 的 runnable evidence，是 primary source。

Prototype 不属于 main branch：它没有 tests，也没有 production error handling。但这不意味着应销毁它。先把 validated decision fold 到真实 code，再把完整 prototype 保存到永不 merge 的 throwaway branch，并在 implementation issue 中留下 pointer。Main 保持干净，原始探索仍可重新运行。

## Common questions

**Prototype 不是应该删除吗？**

现在不再删除。以前是“build、保留答案、丢掉 code”，但 prose summary 会丢失让 prototype 有说服力的证据。现在 prototype 被视为 [primary source](https://www.aihero.dev/ai-coding-dictionary/primary-source)：保存在从 main 分出的 `prototype/<name>` branch，implementation Issue 指向它。它仍然不会 merge 回 main。

**以前会构建 terminal app，为什么改了？**

Logic branch 现在生成一个可分享的 self-contained HTML。Terminal app 要求对方 clone repo 并安装 runtime，恰好排除了最需要给反馈的 designer、PM 或 domain expert；单个可双击、可邮件发送的文件人人都能操作。底层 pure logic module 仍可迁移进 production。

**Agent 在本该 implementation 时推荐 `/prototype`。**

这是 generic name 带来的已知误用。若已经明确知道要 build 什么，应逐 ticket 进入 `/implement`。只有仍存在 specific design question，且继续谈也无法解决时，才 prototype。

**应该先 prototype 整个 application，再实现 production features 吗？**

不应该。本 skill 的 prototype 只回答一个问题；“整个 app 是什么”没有自然停止点，容易靠惯性变成 production app，让无 tests、无 error handling 的 throwaway code 直接面向用户。Sales demo 应明确作为 demo 单独 build；design question 应继续缩小。

**怎样在独立 session 中运行？**

Prototype 放在自己的 directory，并会产生大量不应污染原 conversation 的 [context](https://www.aihero.dev/ai-coding-dictionary/context)。在其他 session 运行，只带回答案；往返可用 [handoff](https://aihero.dev/skills-handoff)。

**这会不会非常浪费 tokens？**

如果拿本可靠对话回答的问题去 prototype，或让一个 prototype 覆盖整项 feature，确实会。真正比较对象不是 tokens 与零，而是 [tokens](https://www.aihero.dev/ai-coding-dictionary/token) 与“build 错 state model 后才发现”的成本。问题保持 narrow、run 保持 short，成本才成比例。

## 所处流程

`prototype` 可以随时独立调用，也常作为 main flow 的 detour。验证后的 state model 或 UI direction 可以交给 [to-spec](https://aihero.dev/skills-to-spec) 固化，architecture decision 可以通过 [domain-modeling](https://aihero.dev/skills-domain-modeling) 记录。不确定该用哪个 skill 或 flow 时，让 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
