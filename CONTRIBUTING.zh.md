# Contributing

每个 issue 都要按 [`SCOPE.md`](./SCOPE.md) 中的门槛评判。先读它。

## 每类请求去哪里

| 你有 | 去哪里 |
| --- | --- |
| 某个 skill 的 bug | [Bug issue](https://github.com/mattpocock/skills/issues/new?template=bug.yml) |
| 对现有 skill 的改动 | [Idea or feedback issue](https://github.com/mattpocock/skills/issues/new?template=idea.yml) |
| 一个问题，或“我该怎么做……？” | [Discussions: Q&A](https://github.com/mattpocock/skills/discussions/categories/q-a) |
| 新 skill 的想法，或想捐赠一个 skill | [Discussions: Ideas](https://github.com/mattpocock/skills/discussions/categories/ideas) |
| 请求支持其他 harness 或 issue tracker | 先读 [`.out-of-scope/`](./.out-of-scope)，再到 [Discussions: Ideas](https://github.com/mattpocock/skills/discussions/categories/ideas) |

Pull requests 只对 collaborators 开放，因此请在 issue 中描述修复方案。

## 用 AI 写的 issues

欢迎 agents 帮忙，但 issue 由你发布，所以由你负责：

- **每个 issue 只讲一个问题。** 一次 session 中的多个 findings 应拆成多个 issues，或者都不提。
- **简短。** 如果一屏放不下，就删减。
- **Repro 优先。** 展示问题的步骤放在任何分析之前。
- **不要粘贴 specs。** 不要贴完整 proposals、plans 或重写后的 `SKILL.md`。描述问题；修复方案由我们来设计。
- **不要提你项目自己的 issues。** 如果你的 agent 把你项目的 specs 或 tickets 提交到这里，它找错了 repo。请在你的项目中运行 `/setup-matt-pocock-skills`。
