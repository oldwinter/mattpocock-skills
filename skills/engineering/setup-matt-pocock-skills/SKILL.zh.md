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

### 2. Present findings and ask

Summarise 哪些 present、哪些 missing。然后带用户逐一做三个 decisions：**一次一个**。展示一个 section，获取用户 answer，再进入下一个。不要一次 dump 三个。

Assume 用户不知道这些 terms 的含义。每个 section 以短 explainer 开头（它是什么、为什么这些 skills 需要它、选择不同会改变什么）。然后展示 choices 和 default。

**Section A — Issue tracker.**

> Explainer: The “issue tracker” is where issues live for this repo. Skills like `to-issues`, `triage`, `to-prd`, and `qa` read from and write to it — they need to know whether to call `gh issue create`, write a markdown file under `.scratch/`, or follow some other workflow you describe. Pick the place you actually track work for this repo.

Default posture：这些 skills 是为 GitHub 设计的。如果 `git remote` 指向 GitHub，就 propose GitHub。如果 `git remote` 指向 GitLab（`gitlab.com` 或 self-hosted host），就 propose GitLab。否则（或用户偏好），提供：

- **GitHub** — issues live in the repo's GitHub Issues（使用 `gh` CLI）
- **GitLab** — issues live in the repo's GitLab Issues（使用 [`glab`](https://gitlab.com/gitlab-org/cli) CLI）
- **Local markdown** — issues 作为 files 存放在本 repo 的 `.scratch/<feature>/` 下（适合 solo projects 或无 remote 的 repos）
- **Other**（Jira、Linear 等）— 要求用户用一段话描述 workflow；skill 会将其记录为 freeform prose

如果且仅当用户选择 **GitHub** 或 **GitLab**，问一个 follow-up：

> Explainer: Open-source repos often receive feature requests as pull requests, not just issues — a PR is an issue with attached code. If you turn this on, `/triage` pulls *external* PRs into the same queue and runs them through the same labels and states as issues (collaborators' in-flight PRs are left alone). Leave it off if PRs aren't a request surface for you.

- **PRs as a request surface** — yes / no（default: no）。将答案记录到 `docs/agents/issue-tracker.md`。对 local-markdown 和 other trackers，跳过此问题，因为没有 PRs。

**Section B — Triage label vocabulary.**

> Explainer: When the `triage` skill processes an incoming issue, it moves it through a state machine — needs evaluation, waiting on reporter, ready for an AFK agent to pick up, ready for a human, or won't fix. To do that, it needs to apply labels (or the equivalent in your issue tracker) that match strings *you've actually configured*. If your repo already uses different label names (e.g. `bug:triage` instead of `needs-triage`), map them here so the skill applies the right ones instead of creating duplicates.

五个 canonical roles：

- `needs-triage` — maintainer needs to evaluate
- `needs-info` — waiting on reporter
- `ready-for-agent` — fully specified, AFK-ready（agent 可以在没有 human context 的情况下接手）
- `ready-for-human` — needs human implementation
- `wontfix` — will not be actioned

Default：每个 role 的 string 等于它的 name。询问用户是否要 override 任何项。如果 issue tracker 没有 existing labels，defaults 就可以。

**Section C — Domain docs.**

> Explainer: Some skills (`improve-codebase-architecture`, `diagnosing-bugs`, `tdd`) read a `CONTEXT.md` file to learn the project's domain language, and `docs/adr/` for past architectural decisions. They need to know whether the repo has one global context or multiple (e.g. a monorepo with separate frontend/backend contexts) so they look in the right place.

Confirm layout：

- **Single-context** — repo root 一个 `CONTEXT.md` + `docs/adr/`。大多数 repos 是这种。
- **Multi-context** — root 的 `CONTEXT-MAP.md` 指向 per-context `CONTEXT.md` files（通常是 monorepo）。

### 3. Confirm and edit

向用户展示 draft：

- 要添加到 `CLAUDE.md` / `AGENTS.md` 中的 `## Agent skills` block（selection rules 见 step 4）
- `docs/agents/issue-tracker.md`、`docs/agents/triage-labels.md`、`docs/agents/domain.md` 的 contents

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

[one-line summary of where issues are tracked, plus whether external PRs are a triage surface]. See `docs/agents/issue-tracker.md`.

### Triage labels

[one-line summary of the label vocabulary]. See `docs/agents/triage-labels.md`.

### Domain docs

[one-line summary of layout — "single-context" or "multi-context"]. See `docs/agents/domain.md`.
```

然后用此 skill folder 中的 seed templates 作为起点写三个 docs files：

- [issue-tracker-github.zh.md](./issue-tracker-github.zh.md) — GitHub issue tracker
- [issue-tracker-gitlab.zh.md](./issue-tracker-gitlab.zh.md) — GitLab issue tracker
- [issue-tracker-local.zh.md](./issue-tracker-local.zh.md) — local-markdown issue tracker
- [triage-labels.zh.md](./triage-labels.zh.md) — label mapping
- [domain.zh.md](./domain.zh.md) — domain doc consumer rules + layout

对 “other” issue trackers，根据用户描述从零写 `docs/agents/issue-tracker.md`。

### 5. Done

告诉用户 setup 已完成，以及哪些 engineering skills 现在会读取这些 files。说明他们之后可以直接 edit `docs/agents/*.md`；只有在想切换 issue trackers 或从头 restart 时才需要重新运行此 skill。
