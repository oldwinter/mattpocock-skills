Quickstart:

```bash
npx skills add mattpocock/skills --skill=setup-matt-pocock-skills
```

```bash
npx skills update setup-matt-pocock-skills
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/engineering/setup-matt-pocock-skills)

## What it does

`setup-matt-pocock-skills` 会教会一个 repo：engineering skills 在这里应该如何运行，包括 Issues 在哪里、triage labels 叫什么、domain docs 位于哪里，并把答案记录为其他 skills 会读取的 **config**。

它写 config，不 hard-code behavior。Engineering chain 假设 `docs/agents/` 下有三个文件；这个 skill 是一次性 bootstrap，负责从你的真实 repo 中发现信息（`git remote`、已有 labels、现有 `CONTEXT.md`），向你确认，而不是猜。它是 prompt-driven：explore、呈现 findings、confirm、write，不是 deterministic scaffold。

## When to reach for it

你通过输入 `/setup-matt-pocock-skills` 调用它，agent 不会自行触达它。

**每个 repo 使用任何其他 engineering skill 前运行一次**。如果 [triage](https://aihero.dev/skills-triage)、[to-prd](https://aihero.dev/skills-to-prd) 或 [to-issues](https://aihero.dev/skills-to-issues) 开始猜 Issues 在哪里，或使用不存在的 labels，说明这里还没 setup。只有切换 Issue tracker 或重新开始时才重跑；日常调整只是编辑 `docs/agents/*.md`。

## The three decisions

它会一次一个地带你走过三个 choices，每个都有普通语言解释（它假设你不一定知道这些术语）：

- **Issue tracker**：work 被跟踪在哪里，使 `triage`/`to-prd`/`to-issues` 知道该调用 `gh`、`glab`、写 `.scratch/` 下的 markdown，或跟随你描述的 workflow。可选 GitHub、GitLab、local markdown 或 other。
- **Triage labels**：五个 canonical roles（`needs-triage`、`needs-info`、`ready-for-agent`、`ready-for-human`、`wontfix`）背后的实际字符串，映射到你已经配置好的 labels，避免 `triage` 创建 duplicates。
- **Domain docs**：repo 是一个 `CONTEXT.md`，还是 multi-context map，让读取 domain language 的 skills 查找正确位置。

输出是三个文件：`docs/agents/issue-tracker.md`、`docs/agents/triage-labels.md`、`docs/agents/domain.md`；以及一个指向它们的 `## Agent skills` block，写入 repo 已使用的 `CLAUDE.md` 或 `AGENTS.md`。这些文件是其余 toolkit 所站立的 shared substrate。

## It's working if

- `docs/agents/` 下出现三个文件，且 `CLAUDE.md` 或 `AGENTS.md` 中出现 `## Agent skills` section。
- 它提出的 tracker 匹配真实 `git remote`，labels 匹配 repo 中已存在的 strings。
- 之后 `triage` 和 `to-issues` 会在正确位置使用正确 labels，而不是询问或猜测。

## Where it fits

`setup-matt-pocock-skills` 是 **run-once setup**：它是整个 engineering set 的基础，不是你反复运行的步骤。它的邻居是读取其输出的 skills：[triage](https://aihero.dev/skills-triage) 使用这里配置的 label vocabulary；[to-prd](https://aihero.dev/skills-to-prd) 和 [to-issues](https://aihero.dev/skills-to-issues) 发布到这里配置的 Issue tracker。先运行它；下游一切都假设它已完成。无法确定该用哪个 skill 或 flow 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
