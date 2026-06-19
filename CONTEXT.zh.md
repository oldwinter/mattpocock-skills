# Matt Pocock Skills

一组由 Claude Code 加载的 agent skills（slash commands 和 behaviors）。Skills 按 bucket 组织，并由 `/setup-matt-pocock-skills` 生成的 per-repo configuration 消费。

## Language

**Issue tracker**:
托管某个 repo 的 issues 的工具，例如 GitHub Issues、Linear、本地 `.scratch/` markdown convention 或类似系统。`to-issues`、`to-prd`、`triage`、`qa` 等 skills 会从中读取并写入。
_Avoid_: backlog manager, backlog backend, issue host

**Issue**:
**Issue tracker** 内一个被追踪的工作单元，可以是 bug、task、PRD，或由 `to-issues` 生成的 slice。
_Avoid_: ticket（仅在引用外部系统自身称其为 ticket 时使用）

**Triage role**:
Triage 期间应用到某个 **Issue** 上的 canonical state-machine label（例如 `needs-triage`、`ready-for-afk`）。每个 role 都会通过 `docs/agents/triage-labels.md` 映射到 **Issue tracker** 里的真实 label string。

## Relationships

- 一个 **Issue tracker** 持有多个 **Issues**
- 一个 **Issue** 同一时间携带一个 **Triage role**

## Flagged ambiguities

- “backlog” 过去同时表示托管 issues 的 *tool* 和其中的 *body of work*。已解决：工具称为 **Issue tracker**；“backlog” 不再作为 domain term 使用。
- “backlog backend” / “backlog manager” 已解决：统一折叠为 **Issue tracker**。
