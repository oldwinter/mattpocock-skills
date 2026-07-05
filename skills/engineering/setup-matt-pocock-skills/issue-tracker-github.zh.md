# Issue tracker: GitHub

此 repo 的 Issues 和 PRDs 存放在 GitHub issues 中。所有 operations 使用 `gh` CLI。

## Conventions

- **Create an issue**：`gh issue create --title "..." --body "..."`。Multi-line bodies 使用 heredoc。
- **Read an issue**：`gh issue view <number> --comments`，用 `jq` 过滤 comments，并同时 fetch labels。
- **List issues**：`gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'`，并配合合适的 `--label` 和 `--state` filters。
- **Comment on an issue**：`gh issue comment <number> --body "..."`
- **Apply / remove labels**：`gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**：`gh issue close <number> --comment "..."`

从 `git remote -v` infer repo；在 clone 内运行时，`gh` 会自动做到这点。

## Pull requests as a triage surface

**PRs as a request surface: no.**（如果这个 repo 将 external PRs 当作 feature requests 处理，则设为 `yes`；`/triage` 会读取这个 flag。）

当设为 `yes` 时，PRs 会使用相同 labels 和 states 流转，并使用 `gh pr` equivalents：

- **Read a PR**：`gh pr view <number> --comments`，以及 `gh pr diff <number>` 查看 diff。
- **List external PRs for triage**：`gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments`，然后只保留 `authorAssociation` 为 `CONTRIBUTOR`、`FIRST_TIME_CONTRIBUTOR` 或 `NONE` 的 PR（丢弃 `OWNER`/`MEMBER`/`COLLABORATOR`）。
- **Comment / label / close**：`gh pr comment`、`gh pr edit --add-label`/`--remove-label`、`gh pr close`。

GitHub 的 issues 和 PRs 共享同一个 number space，所以裸 `#42` 可能是二者之一；先用 `gh pr view 42` resolve，失败后 fallback 到 `gh issue view 42`。

## When a skill says "publish to the issue tracker"

创建 GitHub issue。

## When a skill says "fetch the relevant Issue"

运行 `gh issue view <number> --comments`。

## Wayfinding operations

由 `/wayfinder` 使用。**map** 是一个单独 issue，**child** issues 表示 map 中的 Issues。

- **Map**：带 `wayfinder:map` label 的单一 issue，body 中保存 Notes / Decisions-so-far / Fog。使用 `gh issue create --label wayfinder:map`。
- **Child Issue**：作为 GitHub sub-issue 链接到 map（通过 sub-issues endpoint 调用 `gh api`）。若未启用 sub-issues，则把 child 加到 map body 的 task list，并在 child body 顶部写 `Part of #<map>`。Labels：`wayfinder:<type>`（`research`/`prototype`/`grilling`/`task`）。被 claim 后，将 Issue assign 给驱动 map 的 dev。
- **Blocking**：GitHub 的 **native issue dependencies**，是 canonical 且 UI-visible 的表达。用 `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>` 添加 edge，其中 `<blocker-db-id>` 是 blocker 的 numeric **database id**（`gh api repos/<owner>/<repo>/issues/<n> --jq .id`，不是 `#number` 或 `node_id`）。GitHub 会报告 `issue_dependencies_summary.blocked_by`（仅 open blockers，这是 live gate）。如果 dependencies 不可用，则 fallback 到 child body 顶部的 `Blocked by: #<n>, #<n>` line。所有 blockers closed 后，Issue 即 unblocked。
- **Frontier query**：列出 map 的 open children（`gh issue list --state open`，scope 到 map 的 sub-issues / task list），去掉有 open blocker 的项（`issue_dependencies_summary.blocked_by > 0`，或 `Blocked by` line 中有 open issue）和已有 assignee 的项；map order 中第一个获胜。
- **Claim**：`gh issue edit <n> --add-assignee @me`，这是 session 的 first write。
- **Resolve**：`gh issue comment <n> --body "<answer>"`，然后 `gh issue close <n>`，最后向 map 的 Decisions-so-far 追加 context pointer（gist + link）。
