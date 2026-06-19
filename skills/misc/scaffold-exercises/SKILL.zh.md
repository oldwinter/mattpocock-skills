---
name: scaffold-exercises
description: 创建带 sections、problems、solutions 和 explainers 的 exercise directory structures，并确保通过 linting。Use when user wants to scaffold exercises, create exercise stubs, or set up a new course section.
---

# Scaffold Exercises

创建能通过 `pnpm ai-hero-cli internal lint` 的 exercise directory structures，然后用 `git commit` commit。

## Directory naming

- **Sections**：`exercises/` 内的 `XX-section-name/`（例如 `01-retrieval-skill-building`）
- **Exercises**：section 内的 `XX.YY-exercise-name/`（例如 `01.03-retrieval-with-bm25`）
- Section number = `XX`，exercise number = `XX.YY`
- Names 使用 dash-case（lowercase、hyphens）

## Exercise variants

每个 exercise 至少需要这些 subfolders 中的一个：

- `problem/` - 带 TODOs 的 student workspace
- `solution/` - reference implementation
- `explainer/` - conceptual material，无 TODOs

Stubbing 时，除非 plan 指定其他类型，否则 default to `explainer/`。

## Required files

每个 subfolder（`problem/`、`solution/`、`explainer/`）都需要一个 `readme.md`，并且：

- **非空**（必须有 real content，即使只有一行 title 也可以）
- 没有 broken links

Stubbing 时，创建包含 title 和 description 的 minimal readme：

```md
# Exercise Title

Description here
```

如果 subfolder 有 code，它还需要 `main.ts`（>1 line）。但对于 stubs，readme-only exercise 就可以。

## Workflow

1. **Parse the plan** - 提取 section names、exercise names 和 variant types
2. **Create directories** - 对每个 path 执行 `mkdir -p`
3. **Create stub readmes** - 每个 variant folder 一个带 title 的 `readme.md`
4. **Run lint** - 运行 `pnpm ai-hero-cli internal lint` validate
5. **Fix any errors** - iterate 直到 lint passes

## Lint rules summary

Linter（`pnpm ai-hero-cli internal lint`）检查：

- 每个 exercise 有 subfolders（`problem/`、`solution/`、`explainer/`）
- 至少存在 `problem/`、`explainer/` 或 `explainer.1/` 之一
- Primary subfolder 中存在且非空的 `readme.md`
- 没有 `.gitkeep` files
- 没有 `speaker-notes.md` files
- Readmes 中没有 broken links
- Readmes 中没有 `pnpm run exercise` commands
- 除非是 readme-only，否则每个 subfolder 都需要 `main.ts`

## Moving/renaming exercises

Renumbering 或 moving exercises 时：

1. 使用 `git mv`（不是 `mv`）rename directories，以 preserve git history
2. 更新 numeric prefix，保持 order
3. Moves 后重新 run lint

Example：

```bash
git mv exercises/01-retrieval/01.03-embeddings exercises/01-retrieval/01.04-embeddings
```

## Example: stubbing from a plan

给定这样的 plan：

```text
Section 05: Memory Skill Building
- 05.01 Introduction to Memory
- 05.02 Short-term Memory (explainer + problem + solution)
- 05.03 Long-term Memory
```

创建：

```bash
mkdir -p exercises/05-memory-skill-building/05.01-introduction-to-memory/explainer
mkdir -p exercises/05-memory-skill-building/05.02-short-term-memory/{explainer,problem,solution}
mkdir -p exercises/05-memory-skill-building/05.03-long-term-memory/explainer
```

然后创建 readme stubs：

```text
exercises/05-memory-skill-building/05.01-introduction-to-memory/explainer/readme.md -> "# Introduction to Memory"
exercises/05-memory-skill-building/05.02-short-term-memory/explainer/readme.md -> "# Short-term Memory"
exercises/05-memory-skill-building/05.02-short-term-memory/problem/readme.md -> "# Short-term Memory"
exercises/05-memory-skill-building/05.02-short-term-memory/solution/readme.md -> "# Short-term Memory"
exercises/05-memory-skill-building/05.03-long-term-memory/explainer/readme.md -> "# Long-term Memory"
```
