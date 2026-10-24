# Issue tracker integrations：仅限 GitHub、GitLab 和 local markdown

`setup-matt-pocock-skills` 恰好为三种 issue trackers 提供 first-class support，每种对应 `skills/engineering/setup-matt-pocock-skills/` 中的一个 seed template：

- **GitHub**（`issue-tracker-github.md`，通过 `gh`）
- **GitLab**（`issue-tracker-gitlab.md`，通过 `glab`）
- **Local markdown**（`issue-tracker-local.md`，files 位于 `.scratch/`）

为其他 tracker 增加 first-class backend 的 requests 不在范围内，包括 Jira、Linear、Azure DevOps、Trello、YouTrack，以及新的 agent-focused trackers。

## 为什么不在范围内

每个 issue-tracker backend 都会把一种 CLI shape hard-code 到 skills 中（commands、flags、output parsing）。每个新 backend 都是 permanent maintenance surface：它必须随着该 tool 的 CLI evolve 持续可用，也必须持续针对 `/to-spec`、`/to-tickets`、`/triage` 和相关 skills 被测试。我使用 GitHub，因此这是我实际能保持正确的 backend。GitLab 的 shape 足够接近，可以一起维护；local markdown 完全不需要 CLI。

Popularity 不改变这一点。Jira 使用广泛，也有官方 CLI（`acli`），但仍不会获得 template：它是我不会运行的 backend，有自己的 link semantics、workflow states 和 CLI quirks 要持续测试。无论 tool 是否 mainstream，成本都会落在我身上。

其他所有 tracker 都通过 `/setup-matt-pocock-skills` 的 **Other** option 接入：你用一段话描述 workflow，skill 把它作为 prose 记录到 `docs/agents/issue-tracker.md`。该文件属于你。如果你打磨出一套可用的 Jira 或 Linear workflow，可以保留在自己的 repo 中或发布出来，并让 setup 指向它。

## Prior requests

- #99 — “Add dex as an issue tracker backend”（请求时 dex 大约 3 个月大，约 300 stars）
- #258：“Add Jira as first-class issue tracker via Rovo MCP”
- #1137：“Add Jira as a first-class issue tracker, via Atlassian's official CLI (`acli`)”
