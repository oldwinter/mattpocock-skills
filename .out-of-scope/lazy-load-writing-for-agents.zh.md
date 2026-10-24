# 在判断 agent-facing writing 的 skills 中 lazy-load `writing-for-agents`

`retro` 每次运行都会加载 `writing-for-agents`，而不是只在写入前加载。要求把加载推迟到 skill 编辑 skill、`AGENTS.md`/`CLAUDE.md` 或 doc 时的 requests 不在范围内。

## 为什么不在范围内

`writing-for-agents` 不只是 style guide。它定义什么是 no-op instruction，以及什么构成好的 skill；`retro` 在写入任何内容前，会先用这些定义判断它读到的 steering files。即使 retro 只读取和报告，也仍需要它。如果改为 lazy-load，No-ops 和 Skills candidates 就会失去判断标尺。

## 此前的 requests

- #1238：“retro: load writing-for-agents only before writing”（已关闭）
