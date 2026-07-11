# In Progress

仍在开发中的 skills。它们还没 ready to ship；预期会有 rough edges、breaking changes 和 abandoned experiments。它们在毕业到 stable bucket 前，会被排除在 plugin 和 top-level README 之外。

- **[loop-me](./loop-me/SKILL.zh.md)** — 在当前目录作为 stateful workspace 的前提下，把自己 grill 成可实现的 workflow specs。User-invoked。
- **[wizard](./wizard/SKILL.zh.md)** — 生成交互式 bash wizard，引导用户完成手动流程（setup、一次性 migration、state transition），打开 URL、采集值、写入 `.env` 和 GitHub Actions secrets。User-invoked。
- **[writing-beats](./writing-beats/SKILL.zh.md)** — 将 article 塑造成 beats 之旅，choose-your-own-adventure style。选择 starting beat，只写那个 beat，然后 pivot 到下一个，直到 article 自然结束。
- **[writing-fragments](./writing-fragments/SKILL.zh.md)** — Grilling session，用来挖掘 fragments：异质的 writing nuggets，并把它们 append 到单个 document，作为未来 article 的 raw material。
- **[writing-shape](./writing-shape/SKILL.zh.md)** — 将 raw material markdown file 逐段塑造成 article，并在每一步争论 format choices。
- **[claude-handoff](./claude-handoff/SKILL.zh.md)** — 将当前 conversation 交给 fresh background agent，通过 `claude --bg` 注入 handoff summary 后立即继续工作。User-invoked。
- **[setup-ts-deep-modules](./setup-ts-deep-modules/SKILL.zh.md)** — 为 TypeScript repo 接入 dependency-cruiser，使每个 package 都成为 deep module：implementation 隐藏在 subfolders 中，只能通过 entry-point files 访问。User-invoked。
