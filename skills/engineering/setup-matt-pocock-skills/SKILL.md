---
name: setup-matt-pocock-skills
description: 配置此 repo 的 engineering skills：设置 issue tracker、triage label vocabulary 和 domain doc layout。Run once before first use of the other engineering skills.
disable-model-invocation: true
---

# Setup Matt Pocock's Skills

Scaffold engineering skills 假定存在的 per-repo configuration：

- **Issue tracker** — issues 存放位置（默认 GitHub；local markdown 也 out of the box 支持）
- **Triage labels** — 五个 canonical triage roles 使用的 strings
- **Domain docs** — `CONTEXT.md` 和 ADRs 的位置，以及读取它们的 consumer rules

这是 prompt-driven skill，不是 deterministic script。Explore，present 你发现的内容，与用户 confirm，然后 write。

## Process

### 1. Explore

查看 current repo，理解 starting state。读取已存在的内容；不要 assume：

- `git remote -v` 和 `.git/config` — 这是 GitHub repo 吗？哪一个？
- Repo root 的 `AGENTS.md` 和 `CLAUDE.md` — 是否存在？其中是否已有 `## Agent skills` section？
- Repo root 的 `CONTEXT.md` 和 `CONTEXT-MAP.md`
- `docs/adr/` 和任何 `src/*/docs/adr/` directories
- `docs/agents/` — 这个 skill 的 prior output 是否已存在？
- `.scratch/` — 表示 local-markdown issue tracker convention 可能已在使用
- `triage` skill 是否已安装？检查当前 skill 同级是否有 `triage` folder，或 available skills 中是否存在 `triage`。这决定 Section B 是否需要运行。
- Monorepo signals：`pnpm-workspace.yaml`、`package.json` 中的 `workspaces` 字段，或包含自身 `src/` 的 `packages/*`。只有真正的大型 multi-package repo 才算；这些 signals 缺失时，默认是 single-context，绝大多数 repo 都属于这一类。

### 2. Present findings and ask

Summarise 哪些 present、哪些 missing。然后按顺序处理 sections：一次只展示一个 section，获取一个 answer，再进入下一个。

每个 section 先给 recommended answer，让用户可以用一个词接受。只有 choice 确实会产生分支时才给一行 explainer；如果 exploration 已经决定答案，就完全跳过该 section（未安装 `triage` 时跳过 Section B；没有 monorepo signals 时跳过 Section C）。

**Section A — Issue tracker.**

> Explainer: “issue tracker” 是这个 repo 存放 issues 的位置。`to-tickets`、`triage`、`to-spec` 和 `qa` 等 skills 会读写它；它们需要知道应该调用 `gh issue create`、在 `.scratch/` 下写 markdown file，还是遵循你描述的其他 workflow。请选择你实际用于跟踪此 repo 工作的位置。

Default posture：这些 skills 是为 GitHub 设计的。如果 `git remote` 指向 GitHub，就 propose GitHub。如果 `git remote` 指向 GitLab（`gitlab.com` 或 self-hosted host），就 propose GitLab。否则（或用户偏好），提供：

- **GitHub** — issues live in the repo's GitHub Issues（使用 `gh` CLI）
- **GitLab** — issues live in the repo's GitLab Issues（使用 [`glab`](https://gitlab.com/gitlab-org/cli) CLI）
- **Local markdown** — issues 作为 files 存放在本 repo 的 `.scratch/<feature>/` 下（适合 solo projects 或无 remote 的 repos）
- **Other**（Jira、Linear 等）— 要求用户用一段话描述 workflow；skill 会将其记录为 freeform prose

把选择记录到 `docs/agents/issue-tracker.md`。GitHub 和 GitLab templates 都带有 “PRs as a request surface” flag，default 为 **off**；保持关闭且不要主动询问。希望把 external PRs 纳入 triage queue 的用户之后可以直接在文件中打开它。

**Section B — Triage label vocabulary.** 如果 exploration 发现没有安装 `triage` skill，就完全跳过本节；未安装的 skill 不需要 labels。

如果已安装，只问一个问题：

> 是否保留默认 triage labels？（recommended: **yes**）

Defaults 是五个 canonical roles，且每个 label string 与 role 名相同：`needs-triage`、`needs-info`、`ready-for-agent`、`ready-for-human`、`wontfix`。用户回答 yes 时原样写入。只有用户回答 no 时才收集 overrides，通常是因为 tracker 已使用其他名称，例如用 `bug:triage` 表示 `needs-triage`；这样 `triage` 会复用 existing labels，而不是创建 duplicates。

**Section C — Domain docs.** Default 为 **single-context**：repo root 一个 `CONTEXT.md` + `docs/adr/`。这适合绝大多数 repo，直接写入，不要询问。

只有 exploration 找到 monorepo signals 时，才提供 **multi-context** 选项：root 的 `CONTEXT-MAP.md` 指向 per-context `CONTEXT.md` files。此时再确认用户想要哪种 layout。

### 3. Confirm and edit

向用户展示 draft：

- 要添加到 `CLAUDE.md` / `AGENTS.md` 中的 `## Agent skills` block（selection rules 见 step 4）
- `docs/agents/issue-tracker.md`、`docs/agents/domain.md`，以及仅在安装了 `triage` 时才存在的 `docs/agents/triage-labels.md` 的 contents

写入前允许他们 edit。

### 4. Write

**Pick the file to edit:**

- 如果 `CLAUDE.md` 存在，edit it。
- 否则如果 `AGENTS.md` 存在，edit it。
- 如果两者都不存在，询问用户创建哪一个；不要替他们选。

当 `CLAUDE.md` 已存在时，永远不要 create `AGENTS.md`（反之亦然）；始终 edit 已存在的那个。

如果 chosen file 已有 `## Agent skills` block，就 in-place 更新其内容，而不是 append duplicate。不要 overwrite surrounding sections 中的 user edits。

Block：

```markdown
## Agent skills

### Issue tracker

[one-line summary of where issues are tracked]. See `docs/agents/issue-tracker.md`.

### Triage labels

[one-line summary of the label vocabulary]. See `docs/agents/triage-labels.md`.

### Domain docs

[one-line summary of layout — "single-context" or "multi-context"]. See `docs/agents/domain.md`.
```

只有安装了 `triage` 且 Section B 实际运行时，才包含 `### Triage labels` sub-block 并写入 `docs/agents/triage-labels.md`；否则两者都省略。

然后用此 skill folder 中的 seed templates 作为起点写 docs files：

- [issue-tracker-github.zh.md](./issue-tracker-github.zh.md) — GitHub issue tracker
- [issue-tracker-gitlab.zh.md](./issue-tracker-gitlab.zh.md) — GitLab issue tracker
- [issue-tracker-local.zh.md](./issue-tracker-local.zh.md) — local-markdown issue tracker
- [triage-labels.zh.md](./triage-labels.zh.md) — label mapping（仅在安装了 `triage` 时）
- [domain.zh.md](./domain.zh.md) — domain doc consumer rules + layout

对 “other” issue trackers，根据用户描述从零写 `docs/agents/issue-tracker.md`。

### 5. Done

告诉用户 setup 已完成，以及哪些 engineering skills 现在会读取这些 files。说明他们之后可以直接 edit `docs/agents/*.md`；只有在想切换 issue trackers 或从头 restart 时才需要重新运行此 skill。
