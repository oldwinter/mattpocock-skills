快速开始：

```bash
npx skills add oldwinter/mattpocock-skills --skill=setup-matt-pocock-skills
```

```bash
npx skills update setup-matt-pocock-skills
```

[源码](https://github.com/oldwinter/mattpocock-skills/tree/main/skills/engineering/setup-matt-pocock-skills)

## 功能

`setup-matt-pocock-skills` 为当前 repo 写入 engineering skills 共享的 configuration：issue tracker、可选的 triage labels，以及 domain docs layout。

它只写 config，不 hard-code behaviour。下游 skills 依赖这些文件，避免猜测 issues 存放位置、label strings 或 `CONTEXT.md` layout。

## 何时使用

这是 user-invoked skill。每个 repo 在第一次使用其他 engineering skills 前运行一次。只有切换 issue tracker 或从头重新配置时才需要重跑；日常调整直接 edit `docs/agents/*.md`。

## 配置决策

它会先探索 repo，再把 recommended answer 放在最前面；能推断的内容不再询问：

- **Issue tracker**：根据 `git remote` 推荐 GitHub 或 GitLab，也支持 local markdown 和自定义 tracker。
- **Triage labels**：只有安装了 `triage` skill 才询问；默认接受 `needs-triage`、`needs-info`、`ready-for-agent`、`ready-for-human`、`wontfix`，仅在 repo 已有不同名称时 override。
- **Domain docs**：默认 single-context，即 root `CONTEXT.md` + `docs/adr/`；只有检测到 monorepo signals 才询问是否使用 `CONTEXT-MAP.md`。

输出位于 `docs/agents/`：始终包括 `issue-tracker.md` 和 `domain.md`，安装了 `triage` 时再包括 `triage-labels.md`；同时在 repo 已使用的 `CLAUDE.md` 或 `AGENTS.md` 中维护 `## Agent skills` block。

## 工作正常的表现

- 推荐的 tracker 与真实 `git remote` 一致。
- 没安装 `triage` 时不创建无用 label config。
- 非 monorepo 不会要求用户做多余的 context-layout 决策。
- 之后 `triage`、`to-spec` 与 `to-tickets` 会直接使用正确 tracker 和 labels。
