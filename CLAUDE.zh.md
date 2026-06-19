Skills 按 bucket folders 组织在 `skills/` 下：

- `engineering/` — 日常 code work
- `productivity/` — 日常 non-code workflow tools
- `misc/` — 保留着但很少使用
- `personal/` — 与我自己的 setup 绑定，不推广
- `in-progress/` — 尚未 ready to ship 的 drafts
- `deprecated/` — 不再使用

`engineering/`、`productivity/` 或 `misc/` 中的每个 skill，都必须在 top-level `README.md` 中有 reference，并在 `.claude-plugin/plugin.json` 中有 entry。`personal/`、`in-progress/` 和 `deprecated/` 中的 skills 不得出现在两者中。

Top-level `README.md` 中的每个 skill entry，都必须将 skill name link 到它的 `SKILL.md`。

每个 bucket folder 都有一个 `README.md`，列出 bucket 中的每个 skill，并附一行 description，skill name link 到它的 `SKILL.md`。Bucket `README.md`s 和 top-level `README.md` 会将 entries 分为 **User-invoked** 和 **Model-invoked**。

每个 `SKILL.md` 要么是 user-invoked（`disable-model-invocation: true`，只有 human 可触达），要么是 model-invoked（model 或 user 均可触达）。完整 definitions、description conventions，以及为什么 user-invoked skill 可以 invoke model-invoked skills 但永远不能 invoke 另一个 user-invoked skill，见 [docs/invocation.zh.md](./docs/invocation.md)。
