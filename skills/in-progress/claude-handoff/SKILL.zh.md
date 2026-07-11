---
name: claude-handoff
description: 将当前对话交接给一个新的 background agent，让它立即接手继续工作。
argument-hint: "下一轮 session 将用于什么？"
disable-model-invocation: true
---

为当前对话写一份 handoff summary，使新的 agent 可以继续工作。不要保存为文件，而是启动一个以该 summary 作为 prompt 的 background agent：`claude --bg --name "<descriptive name>" "<handoff summary>"`。它会在当前工作目录启动并立即返回；用户通过 `claude agents` 管理它。

始终传入 `-n`/`--name`，并使用描述性名称（例如 `--name "Fix login bug"`）；它会设置 job list、session picker 和 terminal title 中显示的名称。

在 summary 中包含 “suggested skills” section，建议该 agent 应调用哪些 skills。

不要重复已经记录在其他 artifacts（specs、plans、ADRs、issues、commits、diffs）中的内容。改为通过 path 或 URL 引用它们。

删去敏感信息，例如 API keys、passwords 或 personally identifiable information；该 summary 会成为 agent 的 prompt。

如果用户传入了 arguments，把它们视为下一轮 session focus 的描述，并据此调整 summary。
