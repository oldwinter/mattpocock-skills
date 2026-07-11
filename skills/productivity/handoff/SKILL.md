---
name: handoff
description: 将当前 conversation 压缩成 handoff document，方便另一个 agent 接手。
argument-hint: "下一次 session 会用来做什么？"
---

写一份 handoff document，总结当前 conversation，让一个 fresh agent 可以继续这项工作。保存到用户 OS 的 temporary directory，而不是 current workspace。

在文档里包含一个 “suggested skills” section，建议 agent 应该 invoke 哪些 skills。

不要重复已经被其他 artifacts 捕获的内容（specs、plans、ADRs、issues、commits、diffs）。改用 path 或 URL 引用它们。

删去任何 sensitive information，例如 API keys、passwords 或 personally identifiable information。

如果用户传入了 arguments，将其视为下一次 session 重点关注内容的描述，并据此调整文档。
