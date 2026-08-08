## 功能

`setup-matt-pocock-skills` 为当前 repo 写入 engineering skills 共享的 configuration：issue tracker、可选的 triage labels，以及 domain docs layout。

它只写 config，不 hard-code behaviour。下游 skills 依赖这些文件，避免猜测 issues 存放位置、label strings 或 `CONTEXT.md` layout。

## 何时使用

输入 `/setup-matt-pocock-skills` 调用；agent 不会自行触发。每个 repo 在第一次使用其他 engineering skills 前运行一次。只有切换 issue tracker 或从头重新配置时才需要重跑；日常调整直接 edit `docs/agents/*.md`。

## 配置决策

它会先探索 repo，再把 recommended answer 放在最前面；能推断的内容不再询问：

- **Issue tracker**：根据 `git remote` 推荐 GitHub 或 GitLab，并确定后续是调用 `gh`、`glab`，还是在 `.scratch/` 下写 local markdown；也支持你描述的自定义 tracker workflow。
- **Triage labels**：只有安装了 `triage` skill 才询问；默认接受 `needs-triage`、`needs-info`、`ready-for-agent`、`ready-for-human`、`wontfix`，仅在 repo 已有不同名称时 override。
- **Domain docs**：默认 single-context，即 root `CONTEXT.md` + `docs/adr/`；只有检测到 monorepo signals 才询问是否使用 `CONTEXT-MAP.md`。

输出位于 `docs/agents/`：始终包括 `issue-tracker.md` 和 `domain.md`，安装了 `triage` 时再包括 `triage-labels.md`；同时在 repo 已使用的 `CLAUDE.md` 或 `AGENTS.md` 中维护 `## Agent skills` block。

## 工作正常的表现

- 推荐的 tracker 与真实 `git remote` 一致。
- 没安装 `triage` 时不创建无用 label config。
- 非 monorepo 不会要求用户做多余的 context-layout 决策。
- 之后 `triage`、`to-spec` 与 `to-tickets` 会直接使用正确 tracker 和 labels。

## Common questions

**必须使用 GitHub 吗？**

不必。GitHub、GitLab 和 `.scratch/` 下的 local markdown 都有内建 templates，其他 tracker 可走 “other” 路径。Tracker 是 setup answer，不是 skill property。

**Skills 更新后要重新运行 setup 吗？**

日常情况下只有切换 tracker 或从头配置才需要重跑；但 seed templates 会随版本变化，旧 `docs/agents/issue-tracker.md` 可能与新 runtime 产生漂移。若 downstream skill 的行为和当前 docs 不一致，重跑是最便宜的修复；先 review diff，避免覆盖自己的定制。

**它写入 `CLAUDE.md`，但我使用 Codex。**

这是尚未解决的 gap。规则是“存在 `CLAUDE.md` 就编辑它，否则编辑 `AGENTS.md`”，检查的是文件存在，不是当前 [harness](https://www.aihero.dev/ai-coding-dictionary/harness)。可手工把 block 移到 `AGENTS.md`，或让 `AGENTS.md` 作为 canonical file、`CLAUDE.md` 只指向它。两者都不存在时，skill 会询问创建哪一个。

**它没有创建 triage labels。**

它只写 `docs/agents/triage-labels.md` mapping，不会运行 `gh label create`。Fresh repo 中 labels 可能真的不存在，需要手工创建。Canonical names 已存在时 identity mapping 就是预期 common case；wayfinder 的 `wayfinder:map` 与 `wayfinder:<type>` labels 也不在这里创建。

**可以在这里配置 grilling cadence、question format 或 tone 吗？**

不能。它只配置 tracker、labels 与 docs layout。用户偏好应作为 plain instructions 放进自己的 `CLAUDE.md` / `AGENTS.md`，由所有 skills 共同读取。

**能把 config 放在 `~/.claude`，而不是每个 repo 都 commit 一份吗？**

当前不支持 user-level mode。每个 repo 都维护自己的 `docs/agents/`。

**用一个 skill 配置其他 skills，不奇怪吗？**

这是有意识的 trade-off；否则每个触碰 Issues 的 skill 都要重复 tracker instructions。输出是可读、可编辑的 Markdown，能由你 review；日常 tweaks 直接修改文件，不需要再次调用 setup。

## 所处流程

`setup-matt-pocock-skills` 是整套 engineering skills 的 **run-once setup**。它写出的配置会被 [triage](https://aihero.dev/skills-triage) 用来应用真实 label vocabulary，也会被 [to-spec](https://aihero.dev/skills-to-spec) 和 [to-tickets](https://aihero.dev/skills-to-tickets) 用来发布到正确的 issue tracker。先运行它；所有下游流程都假设配置已经存在。不确定该用哪个 skill 或 flow 时，让 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
