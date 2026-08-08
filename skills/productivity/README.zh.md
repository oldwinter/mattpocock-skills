# Productivity

通用 workflow tools，不限于代码工作。

## User-invoked

只有在你输入它们时才能触达（Claude Code：`disable-model-invocation: true`；Codex：`agents/openai.yaml` 中的 `policy.allow_implicit_invocation: false`）。

- **[grill-me](./grill-me/SKILL.md)** — 围绕 plan 或 design 按轮次追问当前 frontier，直到 decision tree 被解决。
- **[handoff](./handoff/SKILL.md)** — 将当前 conversation 压缩成 handoff document，方便另一个 agent 接续工作。
- **[teach](./teach/SKILL.md)** — 使用当前 directory 作为 stateful teaching workspace，跨多个 sessions 教用户一个新 skill 或 concept。
- **[to-questionnaire](./to-questionnaire/SKILL.md)** — 把用户无法独自回答的 decision 转成 Markdown questionnaire，交给掌握缺失知识的人异步填写或在 meeting 中共同完成。
- **[wait-what](./wait-what/SKILL.md)** — 当上一条消息没有讲明白时触发；agent 会补齐缺失 context，并用 `CONTEXT.md` 术语和 plain language 重讲。

## Model-invoked

Model 或 user 都能触达（使用 rich trigger phrasing，让 model 能主动 reach for them）。

- **[grilling](./grilling/SKILL.md)** — 围绕 plan、decision 或 idea 按轮次追问当前 frontier，直到 decision tree 被解决。
- **[writing-for-agents](./writing-for-agents/SKILL.md)** — 编写供 agent 使用的文档，包括 skills、`AGENTS.md` / `CLAUDE.md`，以及 agent 通过 pointer 读取的任何文档。
