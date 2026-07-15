# Model-invoked vs user-invoked

这个 repo 中每个 `SKILL.md` 都是一个 skill。划分它们的唯一轴线是 **invocation**：谁能触达它。

- **User-invoked** — 只有 human 输入它的名字时才能触达。Frontmatter 中设置 `disable-model-invocation: true`（Claude Code），并在 `agents/openai.yaml` 中设置 `policy.allow_implicit_invocation: false`（Codex）。`description` 面向 human：供人浏览 slash commands 时阅读的一行摘要。去掉 trigger lists（例如 “Use when the user says…”）。
- **Model-invoked** — model 或 user 都能触达。默认状态：省略 `disable-model-invocation`，同时省略 `agents/openai.yaml` 中的 `policy` block。`description` 面向 model，并保留丰富的 trigger phrasing（例如 “Use when the user wants…, mentions…, asks for…”），这样 auto-invocation 才会触发。判断一个 skill 是否应保持 model-invoked 的标准是：_model 能否有用地自主触达它？_（Reuse 是抽取 skill 的理由，不是这个判断标准。）

每个 harness 都用自己的方式排除 model 对 user-invoked skill 的触达，因此除了 human，没有任何东西能触发它。User-invoked skill 可以 invoke model-invoked skills，但永远不能触达另一个 user-invoked skill。

每个 skill 的 `SKILL.md` 旁边都有一个 `agents/openai.yaml`。它保存 Codex UI metadata：skill picker 使用 `interface.display_name` 和 `interface.short_description`；user-invoked skill 还带有与 `disable-model-invocation` 配对的 `policy.allow_implicit_invocation: false`。两种 harness 必须保持同步：一个 skill 要么在两边都是 user-invoked，要么两边都不是。

Bucket `README.md` 和 top-level `README.md` 会将 entries 分为 **User-invoked** 与 **Model-invoked**。

## Dependencies between them

Dependencies 用 **`/skill`-style prose invocation** 表达（例如 “Run the `/grilling` skill”），而不是深层 `../other-skill/FILE.md` cross-references。Shared reference docs 放在拥有它们的 skill 内；其他 skills 通过 invoke 该 skill 触达这些材料，而不是跨 folders 链接。

## Passive vs active domain work

仅仅为了 vocabulary _reading_ `CONTEXT.md`，是一条 prose pointer，不是 `domain-modeling` skill。只有主动 build/sharpen 的 discipline（challenge terms、edge-case scenarios、write ADRs、inline update `CONTEXT.md`）才是 `domain-modeling`。
