# In Progress

Beta。这里的 skills 是有意公开的：请试用并反馈哪里会出问题。它们在晋级到 stable bucket 前不会进入 plugin 或 top-level README，也没有 docs pages，并且可能随时发生 breaking changes 或被移除。

Plugin 不会提供这些 skills。单独安装某一个：

```bash
npx skills@latest add oldwinter/mattpocock-skills --skill=<name>
```

- **[loop-me](./loop-me/SKILL.zh.md)** — 使用当前 directory 作为 stateful workspace，跨多个 sessions 把自己 grill 成可实施的 workflow specs。User-invoked。
- **[writing-beats](./writing-beats/SKILL.zh.md)** — 将 article 塑造成 beats 之旅，choose-your-own-adventure style。选择 starting beat，只写那个 beat，然后 pivot 到下一个，直到 article 自然结束。
- **[writing-fragments](./writing-fragments/SKILL.zh.md)** — Grilling session，用来挖掘 fragments：异质的 writing nuggets，并把它们 append 到单个 document，作为未来 article 的 raw material。
- **[writing-shape](./writing-shape/SKILL.zh.md)** — 将 raw material markdown file 逐段塑造成 article，并在每一步争论 format choices。
- **[claude-handoff](./claude-handoff/SKILL.zh.md)** — 将当前 conversation 交给 fresh background agent，通过 `claude --bg` 注入 handoff summary 后立即继续工作。User-invoked。
- **[setup-ts-deep-modules](./setup-ts-deep-modules/SKILL.zh.md)** — 为 TypeScript repo 接入 dependency-cruiser，使每个 package 都成为 deep module：implementation 隐藏在 subfolders 中，只能通过 entry-point files 访问。User-invoked。
