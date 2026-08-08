# In Progress

Beta。这里的 skills 是有意公开的：请试用并反馈哪里会出问题。它们在晋级到 stable bucket 前不会进入 plugin 或 top-level README，也没有 docs pages，并且可能随时发生 breaking changes 或被移除。

Plugin 不会提供这些 skills。单独安装某一个：

```bash
npx skills@latest add oldwinter/mattpocock-skills --skill=<name>
```

- **[loop-me](./loop-me/SKILL.md)** — 使用当前 directory 作为 stateful workspace，跨多个 sessions 把自己 grill 成可实施的 workflow specs。User-invoked。
- **[writing-beats](./writing-beats/SKILL.md)** — 像 choose-your-own-adventure 一样，把文章塑造成一段 beats 旅程：选一个 opening beat，只写这一段，再转向下一段，直到文章自然结束。
- **[writing-fragments](./writing-fragments/SKILL.md)** — 通过 grilling 挖出 heterogeneous writing fragments，并 append 到单个 document，作为未来文章的 raw material。
- **[writing-shape](./writing-shape/SKILL.md)** — 读取 raw material Markdown，逐 paragraph 塑造成文章，并在每一步论证 format choices。
- **[claude-handoff](./claude-handoff/SKILL.md)** — 通过 `claude --bg` 把当前 conversation 交给 fresh background agent，并用 handoff summary 为其提供 seed。User-invoked。
- **[setup-ts-deep-modules](./setup-ts-deep-modules/SKILL.md)** — 在 TypeScript repo 中接入 dependency-cruiser，让每个 package 成为 deep module：implementation 隐藏在 subfolders，只能通过 entry-point files 访问，tests 也只经这些入口 exercise。User-invoked。
