Skills 按 bucket folders 组织在 `skills/` 下：

- `engineering/` — 日常 code work
- `productivity/` — 日常 non-code workflow tools
- `misc/` — 保留着但很少使用
- `personal/` — 与我自己的 setup 绑定，不推广
- `in-progress/` — 尚未 ready to ship 的 drafts
- `deprecated/` — 不再使用

`engineering/`、`productivity/` 或 `misc/` 中的每个 skill，都必须在 top-level `README.md` 中有 reference，并在 `.claude-plugin/plugin.json` 中有 entry。`personal/`、`in-progress/` 和 `deprecated/` 中的 skills 不得出现在两者中。

Top-level `README.md` 中的每个 skill entry，都必须将 skill name link 到它的 `SKILL.md`。

每个 bucket folder 都有一个 `README.md`，列出 bucket 中的每个 skill，并附一行 description，skill name link 到它的 `SKILL.md`。
