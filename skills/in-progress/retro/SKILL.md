---
name: retro
description: "复盘一次 coding session。"
disable-model-invocation: true
---

用户要求进行一次 **retrospective**。你要为 coding agent 的 **environment** 提出改进建议，帮助未来的 session。

## 步骤

1. 使用 `writing-for-agents` Skill 获取写作风格指南。

2. 读取用户指定 session 的 primary sources。这可能意味着搜索本机上的 session logs。如果用户没有指定 session，默认使用当前 session。

3. 从以下类别中寻找改进候选项。

- **Navigation**：agent 找到正确文件的过程是否顺畅？文件之间是否存在隐藏依赖？增加 **navigation pointer** 是否会更容易？_适用于_ session 花了很长时间才找到某条信息的情况。
- **Automated checks**：是否可以通过自动化检查捕获 agent 犯的错误？例如 lint、typing、tests、filesystem linter？_适用于_ agent 犯了本可由自动化检查发现的错误的情况。
- **Coding standards**：是否应该给 **reviewer agent** 增加一条必须执行的新规则？是否应该删除或澄清现有规则？_适用于_ reviewer agent 没有发现某个错误的情况。
- **Global AGENTS.md**：是否有 steering instructions 应该移入 coding standards 或 automated checks？_适用于_ repo 或用户全局范围内的 AGENTS.md 过于庞大的情况。
- **Tool economy**：agent 是否进行了可以精简的昂贵 tool calls？是否存在 token 使用效率特别低的自定义 tooling（CLI、MCP tools）？_适用于_ agent 进行了昂贵 tool call 的情况。
- **No-ops**：查找 steering files 中不会改变 agent 行为的指令。_适用于_ steering files 过大且难以维护的情况。
- **Information access**：查找增加 agent 信息获取能力的机会，例如接入 dev server logs、提供对第三方服务的只读访问。_适用于_ agent 无法获得某项关键信息的情况。

4. 按严重程度排序，向用户展示这些候选项。

## 参考

### Implementation 与 Review

请记住，所有工作都要经过两个阶段：implementation 和 review。implementation agent 承受最大的 **context pressure**，负责探索、编写代码和调试失败。

review agent 承受的 context pressure 最小，因为它直接接收 diff，不需要探索。它通常也不需要编写代码或调试。

因此，应由 review agent 负责施加 coding standards，而不是 implementation agent。

### 文件

你可以访问 repo 中的以下文件：

- `CLAUDE.md`/`AGENTS.md`：这些文件会被推送到在该 repo 中工作的 agent 的 context window。应极其克制地使用，通常只用来提供指向其他文件的 **navigation pointers**。
- `CODING_STANDARDS.md`：该文件在 review 阶段读取，而不是 implementation 阶段。若 standards file 超过 1,000 行，应增加指向 docs folders 的 **navigation pointers**。
- Docs：将 docs 作为参考文件，并从其他文件指向它们。写新文档前先查找已有 docs。
- Skills：对于文档内容使用 skills（因为 skill 的 description 会进入 agent 的 context window）；对于用户调用的命令也使用 skills。遵循 `writing-for-agents` skill 的建议。
