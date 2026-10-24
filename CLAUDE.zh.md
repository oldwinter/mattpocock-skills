Skills 按 bucket folders 组织在 `skills/` 下：

- `engineering/`: 日常 code work
- `productivity/`: 日常 non-code workflow tools
- `misc/`: 保留着但很少使用，不推广
- `in-progress/`: beta：有意公开、欢迎反馈，但不随 plugin 发布
- `deprecated/`: 不再使用

`engineering/` 或 `productivity/`（**promoted** buckets）中的每个 skill，都必须在 top-level `README.md` 中有 reference，并在 `.claude-plugin/plugin.json` 的 `skills` array 中有 entry（Claude Code plugin 只发布 promoted set）。`misc/`、`in-progress/` 和 `deprecated/` 中的 skills 不得出现在两者中。

安装命令必须逐字同步自 [.agents/install-block.md](./.agents/install-block.md)。本 fork 的 Claude Code 安装使用仓库自带的 `.claude-plugin/marketplace.json`，其他 agent 使用 skills.sh，因为上游 marketplace 路径会安装英文 runtime。修改任一 manifest 后运行 `claude plugin validate . --strict`。原因见 [ADR 0002](./.agents/adr/0002-ship-as-a-claude-code-plugin.zh.md)。

Top-level `README.md` 中的每个 skill entry，都必须将 skill name link 到它的 `SKILL.md`。

每个 bucket folder 都有一个 `README.md`，列出 bucket 中的每个 skill，并附一行 description，skill name link 到它的 `SKILL.md`。Promoted buckets 的 `README.md` 和 top-level `README.md` 会将 entries 分为 **User-invoked** 和 **Model-invoked**；non-promoted bucket `README.md`s（`misc/`、`in-progress/`）使用 flat list。

`engineering/` 和 `productivity/` 中的 skills 还拥有面向人的 docs page：`docs/<bucket>/<skill-name>.md`（docs tree 镜像 `skills/` 下这两个 bucket）。发布 URL 始终是 `https://aihero.dev/skills-<skill-name>`，与 bucket 无关；docs path 只是 repo organization。添加、重命名或改变 `engineering/` 或 `productivity/` 中 skill 的行为时，按 [.agents/writing-docs.zh.md](./.agents/writing-docs.zh.md) 创建或重新同步 docs page。Non-promoted buckets（`misc/`、`in-progress/`、`deprecated/`）中的 skills **没有** docs page；唯一例外是被彻底删除的 promoted skill，其页面应保留并标记 archived。

每个 `SKILL.md` 要么是 user-invoked（`disable-model-invocation: true`，并在 `agents/openai.yaml` 中设置 `policy.allow_implicit_invocation: false`，只有 human 可触达），要么是 model-invoked（model 或 user 均可触达）。见 [.agents/invocation.zh.md](./.agents/invocation.zh.md)。

[`ask-matt`](./skills/engineering/ask-matt/SKILL.zh.md) 是映射所有 user-reachable skills 及其关系的 router。与 docs page 重新同步相同的 trigger 也适用于它：每当你 add、rename、remove，或改变 user-reachable skill 在 flows 中的位置时，都要重读 `ask-matt` 的 `SKILL.md` 并更新它，确保 map 准确。新 skill 从未被提到，或旧 skill 仍被路由过去，都会让 router 说谎。

要把所有 skills 重新 link 到本地 harness skill directories（`~/.claude/skills`、`~/.agents/skills`），运行 `scripts/link-skills.sh`。每个 entry 都是指向此 repo 的 symlink，因此 `git pull` 会保持 installed skills 当前；添加、删除或重命名 skill 后重新运行该 script。

此 repo 的 prose（`SKILL.md` files、docs、`README.md`、`CHANGELOG.md`、ADRs、changesets、code comments）中不得使用 em dash。遇到需要 em dash 的句子时，按句意改成 comma、colon、period、parentheses 或 conjunction，绝不能机械替换字符。

## Agent skills

### Triage labels

Canonical names 保持不变。见 [`docs/agents/triage-labels.zh.md`](./docs/agents/triage-labels.zh.md)。每个 issue 都按 [`SCOPE.zh.md`](./SCOPE.zh.md) 判断。
