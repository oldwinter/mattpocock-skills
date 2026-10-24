# Triage Labels

Skills 使用五个 canonical triage roles。本文件把这些 roles 映射到此 repo issue tracker 实际使用的 label strings。

| mattpocock/skills 中的 label | 我们的 tracker 中的 label | 含义 |
| ---------------------------- | ------------------------- | ---- |
| `needs-triage`               | `needs-triage`            | Maintainer 需要评估此 issue |
| `needs-info`                 | `needs-info`              | 等待 reporter 提供更多信息 |
| `ready-for-agent`            | `ready-for-agent`         | 已完整定义，可由 AFK agent 处理 |
| `ready-for-human`            | `ready-for-human`         | 需要 human 实现 |
| `wontfix`                    | `wontfix`                 | 不会处理 |

当 skill 提到某个 role（例如 “apply the AFK-ready triage label”）时，使用表中对应的 label string。

选择 state 前，先按 [`SCOPE.zh.md`](../../SCOPE.zh.md) 判断每个 issue。Rejection 以 “not planned” 关闭。
