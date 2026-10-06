## What it does

`pr` 定义 pull request 正文的形状：展示变更的 **Summary**、证明变更可用的 **Evidence**，以及评估合并风险的 **Merge Danger**。它是格式 reference，不是 workflow；不会 push branch、创建 PR 或决定 PR 范围，只规定 agent 编写正文时应采用的结构。

Summary 使用 visual，而不是长段 prose。它选择能说明关键点的最小 view，例如 pseudocode、call tree、component tree、file tree、Mermaid diagram 或 shaped diff。Reviewer 已经能看到 diff，因此正文只需先展示 diff 的形状。

## When to reach for it

输入 `/pr`，或在 agent 编写 PR 正文时由它自动触发。

| 情况 | 使用 |
| --- | --- |
| Branch 已 ready，需要 reviewer 可快速扫描的正文 | `pr` |
| Code 已写好但尚未 review | 先运行 [code-review](https://aihero.dev/skills-code-review)，再运行 `pr` |
| PR 已打开，正在收到 review comments | 当前 skill set 尚无对应能力；`pr` 只写正文 |

正文按顺序包含三节：

- **Summary**：一个或多个小 visual，每个都紧邻其支持的简短说明。通常只用一个，很少需要全部形式。
- **Evidence**：before 与 after。Visual change 优先截图；否则提供之前失败、现在通过的准确 test，或发生变化的 console output。
- **Merge Danger**：说明是 **one-way door** 还是 **two-way door**，并写出 **blast radius**。Two-way door 容易撤回；destructive migration、public API removal 等难撤回变更属于 one-way door。

Door 判断是正文的核心。它把“是否可以安全合并”从直觉变成 reviewer 可以质疑的明确 claim，也提示 human review 应在哪里投入更多精力。

## Common questions

**可以相信 agent 对 door 的判断吗？**

不能盲信，明确写出来正是为了让 reviewer 检查。尤其要警惕“two-way door、small blast radius”的结论。Rollback commit 无法撤回已发送的邮件，也无法撤销已经按新格式写入的数据。让 agent 同时读取 ticket/spec，并在 repo 文档中记录一贯视为 one-way 的变更类型。

**它会帮我创建 PR 吗？**

不会，`pr` 只负责正文。[implement-spec](https://aihero.dev/skills-implement-spec) 是例外：tracker 通过 PR 关闭工作或用户要求时，它会创建 draft PR。此时 model-invoked 的 `pr` 会负责正文形状。

**它会不会仍然生成一堵文字和 diagrams？**

不应如此。正文应跳过 preamble、保持 prose 简短，并选择最小 view，通常一个 visual 即可。若大 diff 导致正文很大，应拆分 PR；`pr` 本身不会拆分。

**Repo 已有 PR template，哪个优先？**

默认都不会自动覆盖对方。应在 repo agent docs 中明确组合方式，例如先填 repo template，再把 Summary、Evidence 和 Merge Danger 放到相应位置。

**输出是 HTML 吗？为什么 Mermaid 没渲染？**

输出是 Markdown PR body。GitHub 和 GitLab 能渲染 Mermaid，terminal 只会显示原始文本。需要跨环境一致时，使用 call tree、file tree 或 shaped diff。

**它会处理 review comments 或持续更新正文吗？**

不会。它在一个时间点写正文并停止。PR 大幅变化后，应让 agent 重新编写正文。Review comments 的 triage 不属于这个 skill。

**没有 UI 时，Evidence 放什么？**

放之前失败、现在通过的准确 test，或前后变化的 console output。单独写“tests are green”只是 claim，不是 before/after evidence。

**可以标注正文由 LLM 编写吗？**

Skill 自身不会添加。可在 repo agent docs 中设置覆盖 issue、comment 和 PR 的统一 disclosure rule。

## It's working if

- 不打开 diff，也能从 Summary visual 看出 PR 改了什么。
- 正文没有 preamble，直接从 Summary heading 开始。
- Evidence 展示 before 和 after，而不是仅声称 tests pass。
- 每个 PR 都声明 door 与 blast radius，one-way doors 会得到更谨慎的 review。

## Where it fits

`pr` 位于 review 与 retro 之间：`to-spec → to-tickets → implement → code-review → pr → retro`。它是 model-invoked，因此 agent 在这条 chain 外编写 PR body 时也会自动使用。

[code-review](https://aihero.dev/skills-code-review) 在它之前运行，[implement](https://aihero.dev/skills-implement) 产出它描述的 commits。不确定该使用哪个 skill 时，使用 [ask-matt](https://aihero.dev/skills-ask-matt)。
