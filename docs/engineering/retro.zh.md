## What it does

`retro` 回顾一次 coding [session](https://www.aihero.dev/ai-coding-dictionary/session)，并为 agent 的 **[environment](https://www.aihero.dev/ai-coding-dictionary/environment)** 提出改进，使下一次运行更顺利。它读取 session record，默认读取当前 session，也可以读取你指定的 session log；然后找出 agent 遇到困难的时刻，按严重程度列出候选 fixes。

它改变 environment，而不是 code。无论问题是 agent 引入的 bug、寻找某文件花了二十次 [tool calls](https://www.aihero.dev/ai-coding-dictionary/tool-call)，还是 reviewer 漏掉了规则，`retro` 都不会直接修复，而是询问 repo 的什么条件让问题发生，并提出能防止复发的 check、pointer 或 standard。它只提出候选项；用户选择前不会修改任何内容。

## When to reach for it

输入 `/retro` 主动调用；agent 不会自行触发它。

在 session 比预期更困难时使用，例如搜索耗时过长、犯了工具本可捕获的错误，或缺少必要信息。顺利的 session 通常没有多少可学内容。若需要评价 session 产出的 code，请改用 [code-review](https://aihero.dev/skills-code-review)。

候选项按问题类型落到不同位置：

| Session 中的问题 | Fix |
| --- | --- |
| 寻找 file 或 fact 花费太久 | 从 agent 已读取的文件添加 **navigation pointer** |
| 犯了工具可捕获的错误 | **[automated check](https://www.aihero.dev/ai-coding-dictionary/automated-check)**，如 lint rule、type、test、pre-commit hook、CI job |
| Reviewer 漏掉需要判断的错误 | 写入 reviewer agent 读取的 `CODING_STANDARDS.md` |
| `AGENTS.md` 或 `CLAUDE.md` 过大 | 把 steering 移到 standards 或 checks |
| Tool call 成本过高 | 精简或替换 tool |
| Steering file 充满不改变行为的内容 | 删除 **no-ops** |
| Agent 无法访问必要信息 | 扩大 read-only access，例如把 dev server log 写入文件 |

Standards 应由 **reviewer** 执行，而不是 implementer。Implementer 承受最大的 context pressure，需要探索、写 code 和 debug；reviewer 直接读取 diff，有更多空间执行规则。新规则不应塞进每个 session 都加载的 `AGENTS.md`。

在写规则前，`retro` 会分类违规。**Mechanical** 违规应变成 deterministic check；只有 linter 无法执行的 judgement call 才写成 prose。若 repo 完全没有 guardrail，`retro` 会把它作为独立 finding。

## Common questions

**它会直接写 lint rule，还是等待确认？可以每个 session 后自动运行吗？**

它会等待。`retro` 只提出建议，用户选择前不编辑文件或安装 hook。可以在每次 implementation 后运行，但顺利 session 往往只会产出不必要的规则。它没有 dry-run mode；接受 check 前，应先在 repo 中验证。

**Lint rules 会不会无限堆积？它会建议删除吗？**

它能建议删除 steering files 中的 no-ops，或把庞大 `AGENTS.md`/`CLAUDE.md` 中的规则迁出，但不会审计上个月创建的 lint rules、hooks 或 CI jobs。持续在正确 code 上触发的规则应由维护者删除。

**它会不会为了填满类别而编造泛泛建议？**

每个候选项都必须追溯到 session record 的具体时刻。无法定位证据的建议应丢弃。严重程度排序也只是 first draft，需要人工判断。

**Session 很长，应该现在运行还是 fresh start？**

默认在当前 session 运行，此时困难仍在 context window 中。如果 session 已离开 [smart zone](https://www.aihero.dev/ai-coding-dictionary/smart-zone)，先 [clear](https://www.aihero.dev/ai-coding-dictionary/clearing)，再让 fresh `/retro` 指向上一 session 的 log。

**Agent 一直犯同一错误，应该往 `CLAUDE.md` 加一行吗？**

通常不应该。Mechanical mistake 应变成 failing check；judgement call 应进入 reviewer 读取的 coding standards。`AGENTS.md` 和 `CLAUDE.md` 主要保留 navigation pointers。`retro` 也不是 memory system，它通过改变 environment 防止错误重现。

**我没有 `CODING_STANDARDS.md`，它从哪里来？**

没有 skill 会预置该文件。第一次出现需要 reviewer 判断的规则时，`retro` 会建议创建；接受后，[code-review](https://aihero.dev/skills-code-review) 会读取它。已有的 `CONTRIBUTING.md` 等 standards doc 也可以承担同一职责。

**它与 `improve-codebase-architecture` 有什么区别？**

[improve-codebase-architecture](https://aihero.dev/skills-improve-codebase-architecture) 只需 code，并寻找 code 的结构改进。`retro` 需要 session history，改进 agent 的运行 environment，而不是 code。二者互不替代。

## It's working if

- 每个候选项都指向 session 中的具体时刻，而不是 generic best practice。
- 重复错误会变成 failing checks，`AGENTS.md` 随时间变短而不是变长。
- 已有但未接入的 check 会被要求接入，而不是重新创建。
- 下一次同类 session 能更快找到所需信息。

## Where it fits

`retro` 是 main chain 的最后一步，用来回顾整条 chain：

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review → retro
```

在值得学习的 build 后运行，可留在同一 session，也可指向 session log；顺利 build 可以跳过。

[code-review](https://aihero.dev/skills-code-review) 是 `retro` 最常调优的 reviewer agent。[writing-for-agents](https://aihero.dev/skills-writing-for-agents) 规定它所提 steering files 和 skills 的写作风格。不确定 flow 时，使用 [ask-matt](https://aihero.dev/skills-ask-matt)。
