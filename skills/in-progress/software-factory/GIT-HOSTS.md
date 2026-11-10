# Git hosts

> 调查于 2026-10，不保证仍然最新。用它建立方向，然后自行研究当前选项：产品、价格、限制和 betas 变化很快。

## The types

### All-in-one platforms

与 ticket tracker、充当 orchestrator 的 CI 系统以及 hosted runners 捆绑在一起的 git host，全部共享一个 event stream 和一套 permission model。一个产品填充 git host、ticket tracker、orchestrator 和 runner，其 CI run pages 通常也覆盖 observability platform。每个 PR、review、label 和 check event 既是 webhook 也是 native trigger，因此这类平台拥有最丰富的 trigger catalogue。

**选择它的时机**：factory 从小规模开始、code 已经在那里，或用户希望一张账单、一个登录入口。这就是 [SKILL.md](SKILL.md) 中的 "All on GitHub" design。供应商也提供自己的 agents，它们要么与用户的 runs 竞争，要么作为其中一个 run 接入。

- [GitHub](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)：默认选择；Issues、Actions、Apps 和最大的 integration ecosystem。
- [GitLab](https://about.gitlab.com/pricing/)：issues、merge requests、CI/CD 和 runners 合于一个产品，支持 SaaS 或 self-managed。

### Suite git hosts

作为更大型 suite 的一个模块出售的 git host，其中 ticket tracker 是同级产品（Jira、Azure Boards），通过 links 和 webhooks 连接。Tracker events 走第二条 stream，因此 orchestrator 要合并两个 event sources。

**选择它的时机**：组织已经在运行该 suite，人员生活在 Jira 或 Azure Boards 中。Factory 继承该 tracker 作为人类界面。

- [Bitbucket Cloud](https://support.atlassian.com/bitbucket-cloud/docs/api-request-limits/)：Atlassian 的 git host，与 Jira 和 Bitbucket Pipelines 搭配。
- [Azure DevOps (Azure Repos)](https://learn.microsoft.com/en-us/azure/devops/integrate/concepts/rate-limits)：Repos、Boards、Pipelines 和 Entra identities 位于一个组织，因此填充全部四个 slots。
- [AWS CodeCommit](https://aws.amazon.com/blogs/devops/aws-codecommit-returns-to-general-availability/)：只有 git host，使用 IAM identities；需搭配外部 tracker 和 CI。

### Self-hosted git hosts

用户在自己的 infrastructure 上运行的 git host，通常与 orchestrator 和 runners 位于同一网络。Operator 设定 rate limits，因此上限取决于硬件。用户要为它填充的每个 slot 负责升级、备份和 uptime。

**选择它的时机**：code 必须留在 on-premises 或 air-gapped 环境、用户希望零 per-seat 成本，或 SaaS API 预算限制了繁忙的 factory。Forgejo 和 Gitea 适合小团队，捆绑 issues 和兼容 GitHub-Actions 的 CI；GitLab self-managed 和 GitHub Enterprise Server 适合组织，并保留 Apps 和 service accounts。

- [Forgejo](https://forgejo.org/2026-10-release-v17-0/)：社区治理、轻量，带 Forgejo Actions。
- [Gitea](https://about.gitea.com/)：轻量，带 Gitea Actions；也提供 managed 版本。
- [GitLab self-managed](https://about.gitlab.com/install/) 和 [GitHub Enterprise Server](https://docs.github.com/en/enterprise-server@latest)：在用户自己的 infrastructure 上运行完整平台。

### Review-first and decentralised git hosts

review model 偏离 branch-and-PR 形态的 git hosts：带 voted labels 的 per-commit patchsets，或跨用户运行节点联邦的 repositories。大多数 factory tooling 假设使用 PRs，因此预计要构建更多 glue。在 Gerrit 中，automated check run 由 bot account 投 `Verified`，人类投 `Code-Review`。

**选择它的时机**：用户团队已经这样 review，或更看重 federation 而非 ecosystem。

- [Gerrit](https://www.gerritcodereview.com/)：带 label votes 的 patchset review；Android 和 Chromium 的模式。
- [Tangled](https://blog.tangled.org/ci/)：基于 AT Protocol 的 git hosting，带 stacked PRs 和自己的 CI runner。

### Agent-native git hosts

围绕 agents 作为主要作者构建的新 git hosts：高 commit throughput、以 server-side reads 代替 clones、per-agent attribution。整个类型仍处于早期（截至 2026-10），因此 gates 和 rate limits 可能未公开：向供应商询问。

**选择它的时机**：factory 对一个大 repository 运行许多并发 runs，clone 时间或 API 限制成为瓶颈。先在单个 repository 的 mirror 上试点，保留 GitHub 作为 fallback。

- [Cursor Origin](https://cursor.com/origin)：来自 Graphite 团队，支持 GitHub sync 和签名的 PR、review、push webhooks。
- [GitLab next-gen SCM](https://about.gitlab.com/blog/gitlab-next-gen-scm/)：重建的 GitLab backend，提供 clone-free agent APIs。

### Git storage for runs

以千为单位创建的无头、API-first git repositories：branches、commits 和 diffs，没有 PRs、reviews 或 gates。它们填充半个 slot，每次 run 铸造短命的 per-repository tokens。

**选择它的时机**：runs 需要便宜的 per-run scratch repositories 或 forks（每张 ticket 一个 fork、agent 的 working state），而 PR 仍要落到上述类型中的完整 git host。

- [Cloudflare Artifacts](https://www.cloudflare.com/product/artifacts/)：Workers 上的 git-compatible storage；为每个 task fork 一个 baseline。
- [Pierre code.storage](https://code.storage/docs)：white-label git API，带 ephemeral branches。

## Researching further

用这些问题检查每个 candidate：

1. **Triggers**：哪些 events（PR opened、push、review submitted、label added、check finished）作为 webhooks 到达 orchestrator，deliveries 是否签名？
2. **Identity**：run 能否以专用 bot 或 app identity 行动？这能让 runs 可归因，让 automated review run 批准由另一 identity 创作的 PR，也决定 run 自己的 pushes 是否触发下一次 run。
3. **Gates**：required checks、required approvals 和 branch protection 是否在用户的 plan 和 repository visibility 上可用，bot 能否进入 bypass list？
4. **Rate limits**：每个 runner 上的每次 run 共享多少 API 预算，按什么单位（installation、token、user、workspace）计算，如何扩展？
5. **Slots filled**：同一个产品覆盖 ticket tracker、orchestrator、runner 和 observability platform 中的哪些？

在 primary sources 中找答案：REST API 和 webhook reference、rate-limit page、pricing 和 plan comparison page、access-token 或 app docs，以及 changelog 或 release notes。

最快过时的内容：beta 和 preview 状态（整个 agent-native 和 git-storage 类型）、rate-limit 数字、哪个 plan 解锁 gates，以及 acquisitions、shutdowns 和 reopenings 后的可用性。例如截至 2026-10，AWS CodeCommit 已重新向新客户开放，Bitbucket Data Center 仅作为与 Cloud 搭配的 hybrid licence 出售。

## Durable gotchas

在设计依赖每一条之前，先验证它仍然成立。

- **GitHub `GITHUB_TOKEN` 会终止链路。** 由内置 Actions token 引起的事件不会启动新的 workflow runs（`workflow_dispatch` 和 `repository_dispatch` 除外），因此用它 push 的 run 会静默停止下一次 run。从第一天起就给 runs 一个 GitHub App identity。
- **Gates 常常位于付费 plan 之后。** 截至 2026-10，private repositories 上的 GitHub rulesets 需要 Pro、Team 或 Enterprise，GitLab approval rules 需要 Premium，强制 Bitbucket merge checks 需要 Premium。
- **Rate limits 按 identity 计算，bot 的类型会改变它们。** 截至 2026-10，GitHub App installation 每小时 5,000 requests，而 `GITHUB_TOKEN` 为 1,000；Bitbucket user tokens 保持 base rate，而 access tokens 会扩展；Azure DevOps 会随 access level 提高 bot 的预算。
- **Suite trackers 意味着两条 event streams。** Orchestrator 要自行合并 git host 和 ticket tracker events。
