# Ticket trackers

> 调查于 2026-10，不保证仍然最新。用它建立方向，然后自行研究当前选项：产品、价格、限制和 betas 变化很快。

ticket tracker 是 factory 的人类界面。下面每种类型都是起点：先读它是什么、factory 何时选择它，再对照 [Researching further](#researching-further) 中的问题检查示例。

## The types

### 1. Git-host tracker

内建于 git host 的 tracker，因此 tickets、branches 和 PRs 共享一个产品、一套 permission model 和一个 identity。factory 规模小、团队已经生活在 git host 上，或 repo 公开时，会选择它。这就是 "All on GitHub" design：git host 的 CI 无需 glue 就能填充 orchestrator slot。Labels 是可靠的 router，因为 statuses 位于单独的 board。外部开发者把东西提交到 code 所在之处；非开发者需要账号，因此 feedback button 通过 API 提交。Self-hosted git hosts 自带它们的 tracker。

- [GitHub Issues](https://docs.github.com/en/copilot/concepts/agents/about-third-party-agents)：默认选择；可为 Copilot、Claude 和 Codex 使用 assign-to-agent。
- [GitLab Issues](https://about.gitlab.com/blog/how-to-use-a-work-item-created-trigger/)：从 work items 触发的 Duo Agent Platform flows。
- [Forgejo](https://forgejo.org/2026-10-release-v17-0/)：self-hosted，兼容 Actions。

待验证：哪些 assign-to-agent 功能仍在 preview，哪些 plans 包含它们；native agent 会读取后续 comments，还是只读取 assignment 时的 ticket（截至 2026-10，Copilot 只在 assignment 时读取）。

### 2. Agent-native dev tracker

面向软件团队的独立 SaaS tracker，把 agents 当作 first-class assignees，并提供 agent API 和自己的 coding agent。当产品、支持或设计人员安排工作、团队已经生活在那里，或需要精致的 triage 和 planning views 时，factory 会选择它。这就是 "Linear tickets" design。Statuses 和 workflows 是 first-class，因此 "moved to Ready" 是干净的 trigger。Agents 以 app users 的身份出现，由人类委派工作，runs 可以把进度流式写入 ticket。这里的 native agents 是所有类型中最深的，因此也能部分填充 orchestrator 和 runner slots。

- [Linear](https://linear.app/developers/agents)：最 agent-shaped 的 tracker。
- [Jira](https://support.atlassian.com/jira-software-cloud/docs/collaborate-on-work-items-with-ai-agents/)：status-triggered agents；适合已经使用 Atlassian 的组织。
- [Shortcut](https://www.shortcut.com/help/integrations/using-ai-agents)：分配 story，或在 comment 中提及 agent。
- [YouTrack](https://www.jetbrains.com/youtrack/)：workflows-as-code；可 self-host。

待验证：agent API 状态（截至 2026-10，Linear 的仍是 developer preview）；native agent runs 如何计量和定价；agent seat 成本；agent webhooks 的 acknowledgement deadlines；哪个 plan 解锁 customer-facing forms；self-hosted edition 的 end-of-life 日期。

### 3. Open-source dev tracker

可以在自己的 infrastructure 上运行的 Linear-style tracker，附带 cloud edition。当数据必须留在内部（air-gapped、受监管），或用户希望在使用的同时阅读并 patch tracker 源码时，factory 会选择它。按 states、labels 和 custom properties 路由的方式与类型 2 大致相同；native agents 更年轻。

- [Plane](https://developers.plane.so/dev-tools/agents/overview)：类似 Linear；每个 app 可有 bot users；agents 在 comments 中回复。
- [Huly](https://github.com/hcengineering/huly-selfhost)：all-in-one workspace，支持双向 GitHub sync；运维栈较重。
- [OpenProject](https://www.openproject.org/)：成熟、经典的项目管理。

待验证：agent 功能状态（截至 2026-10，Plane 的仍是 beta）；哪个 edition 包含 guest roles 和 intake forms；licence；self-hosted stack 的运维成本。

### 4. General work tool

一种 work-management 或 docs 工具，其 database 或 task list 兼作 tracker。当它服务于已经生活在那里的非工程团队，或 tickets 主要是内容、ops 或 research 而非 code 时，factory 会选择它。Forms 是强项：任何拿到链接的人都能提交 ticket。Routing 依赖灵活的 database properties，因此每个 factory 都会发明自己的 schema。Developer context（diffs、PRs）在 git host 上点一下就到。仅 SaaS。

- [Notion](https://www.notion.com/help/custom-agents)：database-as-tracker；agents 在 database 变化时触发。
- [Asana](https://asana.com/product/ai/ai-teammates)：AI Teammates 接受分配的任务。
- [ClickUp](https://clickup.com/brain/cloud-agents)：Cloud Agents 在 task thread 中返回 PR。
- [Trello](https://developer.atlassian.com/cloud/trello/guides/rest-api/webhooks/)：boards 和 lists；webhooks 加 Butler automation。

待验证：webhook latency 和 granularity（截至 2026-10，Notion 会批量合并内容更新，延迟一两分钟到达）；哪个 plan 包含 agents。

### 5. Repo-native tracker

Tickets 以 files 形式存放在 repo 中（JSONL、Markdown），agents 通过 CLI 或 MCP server 编辑，并像 code 一样 merge。当单个开发者本地驱动 agents、希望 plan 进入 git，或作为真实 tracker 旁边的 run working memory 时，factory 会选择它。Push 到 git host 是唯一的 trigger，因此 orchestrator 通过 diff files 找出变化。Identity 来自 git host。外部提交只能靠 commit 或 PR，是所有类型中最弱的，因此一旦有其他人提交 tickets，factory 就应升级到 git-host tracker。

- [Beads](https://github.com/steveyegge/beads)：带 dependency tracking 的 JSONL，run 可以选择下一张 unblocked ticket。
- [Backlog.md](https://github.com/MrLesk/Backlog.md)：Markdown tasks，带 Kanban view 和 MCP server。

### 6. Build-your-own

factory 自己的 app 把 tickets 存在自己的 database 中，通常与 orchestrator 放在一起。这就是 "Own tracker" design。当 tracker *就是* 产品（内部平台、面向客户的支持 factory），或没有现成模型适配时，factory 会选择它。Triggers 变成 function calls；下面问题中的每个 trait 都变成需要编写和维护的 code，这也是此 skill 偏好购买的原因。带 webhooks 的 [Airtable](https://airtable.com/developers/web/api/webhooks-overview) base 是半成品中间态。

## Researching further

用这些问题检查每个 candidate。它们决定该 slot：

- **Triggers**：哪些 ticket 变化（created、labelled、status moved、assigned、commented、mentioned）会发出 webhook 或 event，让 orchestrator 转成 run？多快、多细？
- **Routing**：run 可以读取哪些 labels、statuses 或 fields 来判断自己的类型（explore、implement、rework）？
- **Thread**：人类能在 comments 中回答 agent 吗？该回复会触发下一次 run 吗？
- **Identity**：是否有 API 加 bot identity，让 runs 以自己的身份行动，人类也能区分 agent 和同事？bot 是否占用 seat？
- **Native agents**：ticket 能直接分配给 agent 吗？哪些 agents、在哪个 plan、如何计量？它读取什么：assignment 时的 ticket，还是整个 thread？
- **Outside filing**：ticket source 或客户如何创建 tickets：forms、email、chat、API？哪个 plan 解锁它？
- **Hosting**：仅 SaaS，还是可 self-hosted，采用哪种 licence？

答案在 primary sources 中：API 和 webhook reference（event lists、payloads、delivery 和 retry rules）、agent 或 app developer docs、pricing page 和 plan comparison table，以及 changelog 或 release notes。优先于 blog posts 和 comparison sites。

最容易过时：agent 功能及其 preview 或 beta 状态、agent 计量和 credit 价格、agents 和 forms 的 plan gating、rate limits，以及 self-hosted editions 的 acquisitions、shutdowns 和 end-of-life 日期。Webhook event lists 和 routing models 变化较慢。

## Durable gotchas

依赖每一条之前，先验证它仍然成立：

- **GitHub 的 `GITHUB_TOKEN` 陷阱**：用默认 `GITHUB_TOKEN` 做的修改不会触发新的 workflow runs。通过给 ticket 加 label 或 comment 来触发下一次 run 的 run，应通过 GitHub App token 行动。
- **Assignment-time context**：某些 native agents 只在 assignment 时读取 ticket，因此后续 context 要写到 PR 上。
- **Agent webhooks 期望快速 acknowledgement**：orchestrator 立即确认，然后再启动 run。
- **General work tools 中的 batched webhooks** 会迟到；需要及时 runs 的 factory 应改为在 property changes 上触发，或选择其他类型。
