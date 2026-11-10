# Issue tracker: GitHub

此 repo 的 Issues 和 specs 存放在 GitHub issues 中。所有 operations 使用 `gh` CLI。

## Conventions

- **Create an issue**：`gh issue create --title "..." --body "..."`。Multi-line bodies 使用 heredoc。
- **Read an issue**：`gh issue view <number> --json number,title,body,labels,comments`。
- **List issues**：`gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'`，并配合合适的 `--label` 和 `--state` filters。
- **Make an issue a sub-issue of a parent**：`gh issue create --parent <parent> ...`，或之后用 `gh issue edit <parent> --add-sub-issue <child>`（`gh` 2.94+）。更旧的 `gh`：`gh api --method POST repos/<owner>/<repo>/issues/<parent>/sub_issues -F sub_issue_id=<child-db-id>`（database id，见下文 **Blocking**）。不支持 sub-issues 时，在 child body 顶部写 `Part of #<parent>`。
- **Blocking**：GitHub 的 **native issue dependencies**，是 canonical 且 UI-visible 的表达。用 `gh issue create --blocked-by <n>,<n> ...` 或 `gh issue edit <child> --add-blocked-by <blocker>` 添加 edge（`gh` 2.94+）。更旧的 `gh`：`gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`，其中 `<blocker-db-id>` 是 blocker 的 numeric **database id**（`gh api repos/<owner>/<repo>/issues/<n> --jq .id`，_不是_ `#number` 或 `node_id`）。dependencies 不可用时，fallback 到 child body 顶部的 `Blocked by: #<n>, #<n>` line。所有 blockers closed 后，ticket 即 unblocked。
- **Count open blockers**：`gh api repos/<owner>/<repo>/issues/<n> --jq .issue_dependencies_summary.blocked_by`（仅 open blockers；0 表示可以开始）。`gh issue view <n> --json blockedBy` 也会列出 closed blockers，因此要过滤：`--jq '[.blockedBy.nodes[] | select(.state == "OPEN")] | length'`。
- **Comment on an issue**：`gh issue comment <number> --body "..."`
- **Apply / remove labels**：`gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**：先用 `gh issue comment <number> --body "..."` 发布说明，再 `gh issue close <number>`。对已经 closed 的 issue，`gh issue close --comment` 会丢弃 comment 且仍以 0 退出。

从 `git remote -v` infer repo；在 clone 内运行时，`gh` 会自动做到这点。

只把 issues 提交到用户自己的 repo。除非用户拥有 `mattpocock/skills`（这些 skills 的来源 repo），否则绝不向它提交 issue。在 fork 中，`gh` 可能默认指向上游 parent，因此每次 session 第一次 `gh issue create` 之前，用 `gh repo view --json nameWithOwner` 检查目标；如果不是用户的 repo，先与用户确认。

## Pull requests as a triage surface

**PRs as a request surface: no.**（如果这个 repo 将 external PRs 当作 feature requests 处理，则设为 `yes`；`/triage` 会读取这个 flag。）

当设为 `yes` 时，PRs 会使用相同 labels 和 states 流转，并使用 `gh pr` equivalents：

- **Read a PR**：`gh pr view <number>`，然后 `gh pr view <number> --comments`（非 TTY 时，`--comments` 只打印 comments，不打印 body），以及 `gh pr diff <number>` 查看 diff。
- **List external PRs for triage**：`gh api --paginate 'repos/{owner}/{repo}/pulls?state=open' --jq '.[] | select(.author_association | IN("OWNER","MEMBER","COLLABORATOR") | not) | {number, title, author: .user.login, author_association, labels: [.labels[].name]}'`。
- **Comment / label / close**：`gh pr comment`、`gh pr edit --add-label`/`--remove-label`、`gh pr close`。

GitHub 的 issues 和 PRs 共享同一个 number space，所以裸 `#42` 可能是二者之一；先用 `gh pr view 42` resolve，失败后 fallback 到 `gh issue view 42`。

## When a skill says "publish to the issue tracker"

创建 GitHub issue。

## When a skill says "fetch the relevant Issue"

运行 `gh issue view <number> --comments`。

## Wayfinding operations

由 `/wayfinder` 使用。**map** 是一个单独 issue，**child** issues 表示 map 中的 Issues。

- **Map**：带 `wayfinder:map` label 的单一 issue，body 中保存 Notes / Decisions-so-far / Fog。使用 `gh issue create --label wayfinder:map`。
- **Child ticket**：作为 GitHub sub-issue 链接到 map 的 issue（见 **Make an issue a sub-issue of a parent**）。未启用 sub-issues 时，把 child 加到 map body 的 task list，并在 child body 顶部写 `Part of #<map>`。Labels：`wayfinder:<type>`（`research`/`prototype`/`grilling`/`task`）。被 claim 后，将 ticket assign 给驱动 map 的 dev。
- **Blocking**：见 Conventions 下的 **Blocking**。
- **Frontier query**：列出 map 的 open children（`gh issue list --state open`，scope 到 map 的 sub-issues / task list），去掉有 open blocker 的项（见 **Count open blockers**，或 `Blocked by` line 中有 open issue）和已有 assignee 的项；map order 中第一个获胜。
- **Claim**：`gh issue edit <n> --add-assignee @me`，这是 session 的 first write。
- **Resolve**：`gh issue comment <n> --body "<answer>"`，然后 `gh issue close <n>`，最后向 map 的 Decisions-so-far 追加 context pointer（gist + link）。
