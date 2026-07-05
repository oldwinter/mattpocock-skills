# Issue tracker: GitLab

此 repo 的 Issues 和 PRDs 存放在 GitLab issues 中。所有 operations 使用 [`glab`](https://gitlab.com/gitlab-org/cli) CLI。

## Conventions

- **Create an issue**：`glab issue create --title "..." --description "..."`。Multi-line descriptions 使用 heredoc。传 `--description -` 可打开 editor。
- **Read an issue**：`glab issue view <number> --comments`。使用 `-F json` 获取 machine-readable output。
- **List issues**：`glab issue list -F json`，配合合适的 `--label` filters。
- **Comment on an issue**：`glab issue note <number> --message "..."`。GitLab 将 comments 称为 “notes”。
- **Apply / remove labels**：`glab issue update <number> --label "..."` / `--unlabel "..."`。多个 labels 可 comma-separated 或重复 flag。
- **Close**：`glab issue close <number>`。`glab issue close` 不接受 closing comment，所以先用 `glab issue note <number> --message "..."` 发布 explanation，再 close。
- **Merge requests**：GitLab 将 PRs 称为 “merge requests”。使用 `glab mr create`、`glab mr view`、`glab mr note` 等；shape 与 `gh pr ...` 相同，只是用 `mr` 替换 `pr`，用 `note`/`--message` 替换 `comment`/`--body`。

从 `git remote -v` infer repo；在 clone 内运行时，`glab` 会自动做到这点。

## Merge requests as a triage surface

**MRs as a request surface: no.**（如果这个 repo 将 external merge requests 当作 feature requests 处理，则设为 `yes`；`/triage` 会读取这个 flag。）

当设为 `yes` 时，MRs 会使用相同 labels 和 states 流转，并使用 `glab mr` equivalents：

- **Read an MR**：`glab mr view <number> --comments`，以及 `glab mr diff <number>` 查看 diff。
- **List external MRs for triage**：`glab mr list -F json`，然后只保留 author 不是 project member/owner 的 MRs（contributor's MR，而不是 maintainer's in-flight work）。
- **Comment / label / close**：`glab mr note`、`glab mr update --label`/`--unlabel`、`glab mr close`。

不同于 GitHub，GitLab 的 issues 和 MRs 分别编号，所以当你知道 maintainer 指的是哪个 surface 时，`#42` 是 unambiguous 的。

## When a skill says "publish to the issue tracker"

创建 GitLab issue。

## When a skill says "fetch the relevant Issue"

运行 `glab issue view <number> --comments`。

## Wayfinding operations

由 `/wayfinder` 使用。**map** 是一个单独 issue，**child** issues 表示 map 中的 Issues。

- **Map**：带 `wayfinder:map` label 的单一 issue，body 中保存 Notes / Decisions-so-far / Fog。使用 `glab issue create --label wayfinder:map`。（在支持 native epics 的 GitLab tiers 上，也可以用 epic 承载 map；labelled issue everywhere works。）
- **Child Issue**：description 顶部写 `Part of #<map>`，并带 labels `wayfinder:<type>`（`research`/`prototype`/`grilling`/`task`）。被 claim 后，将 Issue assign 给驱动 map 的 dev。
- **Blocking**：GitLab 的 **native blocking link**，是 canonical 且 UI-visible 的表达。用 `/blocked_by #<n>` quick action 添加，作为 note 发布：`glab issue note <child> --message "/blocked_by #<blocker>"`。Native blocking links 是 Premium/Ultimate feature；free tier 或不可用时，fallback 到 description 顶部的 `Blocked by: #<n>, #<n>` line。所有 blockers closed 后，Issue 即 unblocked。
- **Frontier query**：`glab issue list -F json` scoped 到 map children，去掉有 open blocker 的项，包括指向 open issue 的 native `blocked_by` link（`glab api projects/:id/issues/:iid/links`），或 `Blocked by` line 中的 open issue；也去掉已有 assignee 的项；map order 中第一个获胜。
- **Claim**：`glab issue update <n> --assignee @me`，这是 session 的 first write。
- **Resolve**：`glab issue note <n> --message "<answer>"`，然后 `glab issue close <n>`，最后向 map 的 Decisions-so-far 追加 context pointer（gist + link）。
