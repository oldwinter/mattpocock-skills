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

## When a skill says "fetch the relevant ticket"

运行 `gh issue view <number> --comments`。
