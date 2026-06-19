# Out-of-Scope Knowledge Base

Repo 中的 `.out-of-scope/` directory 存储被拒绝 feature requests 的 persistent records。它有两个目的：

1. **Institutional memory** — 记录 feature 为什么被 rejected，避免 issue closed 后 reasoning 丢失
2. **Deduplication** — 当新 issue 与 prior rejection 匹配时，skill 可以 surface 之前的 decision，而不是重新争论

## Directory structure

```text
.out-of-scope/
├── dark-mode.md
├── plugin-system.md
└── graphql-api.md
```

每个 **concept** 一个 file，不是每个 issue 一个 file。多个请求同一件事的 issues 聚合到一个 file 下。

## File format

File 应以 relaxed、readable style 编写，更像 short design document，而不是 database entry。使用 paragraphs、code samples 和 examples，让 reasoning 对首次接触的人清晰有用。

```markdown
# Dark Mode

This project does not support dark mode or user-facing theming.

## Why this is out of scope

The rendering pipeline assumes a single color palette defined in
`ThemeConfig`. Supporting multiple themes would require:

- A theme context provider wrapping the entire component tree
- Per-component theme-aware style resolution
- A persistence layer for user theme preferences

This is a significant architectural change that doesn't align with the
project's focus on content authoring. Theming is a concern for downstream
consumers who embed or redistribute the output.

```ts
// The current ThemeConfig interface is not designed for runtime switching:
interface ThemeConfig {
  colors: ColorPalette; // single palette, resolved at build time
  fonts: FontStack;
}
```

## Prior requests

- #42 — "Add dark mode support"
- #87 — "Night theme for accessibility"
- #134 — "Dark theme option"
```

### Naming the file

用短而 descriptive 的 kebab-case name 表示 concept：`dark-mode.md`、`plugin-system.md`、`graphql-api.md`。文件名应该足够 recognizable，让浏览 directory 的人不用打开 file 就理解被 rejected 的是什么。

### Writing the reason

Reason 应 substantive，不是 “we don't want this”，而是说明 why。好的 reasons 会引用：

- Project scope 或 philosophy（“This project focuses on X; theming is a downstream concern”）
- Technical constraints（“Supporting this would require Y, which conflicts with our Z architecture”）
- Strategic decisions（“We chose to use A instead of B because...”）

Reason 应 durable。避免引用 temporary circumstances（“we're too busy right now”）；这些不是真正的 rejections，而是 deferrals。

## When to check `.out-of-scope/`

Triage 期间（Step 1: Gather context），读取 `.out-of-scope/` 中所有 files。Evaluating 新 issue 时：

- 检查 request 是否匹配 existing out-of-scope concept
- Matching 按 concept similarity，而不是 keyword；“night theme” 匹配 `dark-mode.md`
- 如果有 match，surface 给 maintainer：“This is similar to `.out-of-scope/dark-mode.md` — we rejected this before because [reason]. Do you still feel the same way?”

Maintainer 可以：

- **Confirm** — 将新 issue 添加到 existing file 的 “Prior requests” list，然后 close
- **Reconsider** — 删除或更新 out-of-scope file，并让 issue 走 normal triage
- **Disagree** — 这些 issues 相关但 distinct，继续 normal triage

## When to write to `.out-of-scope/`

只有当 **enhancement**（不是 bug）被作为 `wontfix` rejected 时才写入。Flow：

1. Maintainer 决定某个 feature request out of scope
2. 检查是否已有 matching `.out-of-scope/` file
3. 如果有：将新 issue append 到 “Prior requests” list
4. 如果没有：创建一个以 concept 命名的 file，包含 decision、reason 和 first prior request
5. 在 issue 上发布 comment 解释 decision，并提到 `.out-of-scope/` file
6. 用 `wontfix` label close issue

## Updating or removing out-of-scope files

如果 maintainer 改变了对 previously rejected concept 的想法：

- 删除 `.out-of-scope/` file
- Skill 不需要 reopen old issues；它们是 historical records
- 触发 reconsideration 的新 issue 继续 normal triage
