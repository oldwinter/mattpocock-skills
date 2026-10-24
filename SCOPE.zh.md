# 范围

这个 repo 是我每天使用的一组 skills。它经过筛选：欢迎提出想法，但每个想法都要按下面的门槛判断。Issues 用于跟踪 skills 的改动；问题和讨论请前往 [GitHub Discussions](https://github.com/mattpocock/skills/discussions)。

## 门槛

一个想法或反馈 issue 只有在同时满足**两个部分**时才保持 open：

1. **实际观察到的 failure。** 它描述真实 session 中出了什么问题：运行了什么、skill 做了什么、你期待什么。假设性的改进（“如果……会更好”）不能通过这一部分。
2. **符合项目理念。** 它不匹配 [`.out-of-scope/`](./.out-of-scope/) 中的任何记录或过去的 rejection，也不是 config option、harness-specific branch，或只为适配某个人 workflow 的 tweak。这些内容应放在你自己的 `CLAUDE.md` / `AGENTS.md`，或 fork 中（skills.sh 会给你一份可编辑副本）。

改动大小无关紧要：一个单词的修正和一次重写面对同一门槛。Reaction 和 +1 评论不计入。

## 按 bucket

- **`engineering/`、`productivity/`、`in-progress/`**：使用上面的门槛。
- **`misc/`**：已冻结且不再维护。所有 issue 都会关闭。见 [`frozen-misc-skills.zh.md`](./.out-of-scope/frozen-misc-skills.zh.md)。
- **新 skills**：不再接受 proposal 和 contribution。如果行为能由现有 skills 组合出来，就不会新增 skill。见 [`new-skills.zh.md`](./.out-of-scope/new-skills.zh.md)。

## 已有决定

[`.out-of-scope/`](./.out-of-scope/) 中的每个文件记录一个已拒绝的概念及原因。提交前先阅读：

- [`frozen-misc-skills.zh.md`](./.out-of-scope/frozen-misc-skills.zh.md)
- [`harness-name-collisions.zh.md`](./.out-of-scope/harness-name-collisions.zh.md)
- [`mainstream-issue-trackers-only.zh.md`](./.out-of-scope/mainstream-issue-trackers-only.zh.md)
- [`native-question-tool.zh.md`](./.out-of-scope/native-question-tool.zh.md)
- [`new-skills.zh.md`](./.out-of-scope/new-skills.zh.md)
- [`question-limits.zh.md`](./.out-of-scope/question-limits.zh.md)
- [`setup-skill-verify-mode.zh.md`](./.out-of-scope/setup-skill-verify-mode.zh.md)
- [`subagent-recursion.zh.md`](./.out-of-scope/subagent-recursion.zh.md)

## 无法判断的 issues

无法按门槛判断的 issue 会得到一轮提问和 `needs-info` label。reporter 14 天没有回复时，issue 会关闭。Rejection 以 “not planned” 关闭。
