# Domain Docs

Engineering skills 在探索 codebase 时，应如何消费此 repo 的 domain documentation。

## Before exploring, read these

- Repo root 的 **`CONTEXT.md`**，或
- 如果 repo root 存在 **`CONTEXT-MAP.md`**，它会指向每个 context 的一个 `CONTEXT.md`。读取与 topic 相关的每一个。
- **`docs/adr/`** — 读取会触及你即将工作区域的 ADRs。在 multi-context repos 中，也检查 `src/<context>/docs/adr/` 中的 context-scoped decisions。

如果这些 files 不存在，**proceed silently**。不要 flag absence；不要 upfront 建议创建它们。`/domain-modeling` skill（通过 `/grill-with-docs` 和 `/improve-codebase-architecture` 触达）会在 terms 或 decisions 真正被 resolved 时 lazily 创建它们。

## File structure

Single-context repo（大多数 repos）：

```text
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-event-sourced-orders.md
│   └── 0002-postgres-for-write-model.md
└── src/
```

Multi-context repo（root 存在 `CONTEXT-MAP.md`）：

```text
/
├── CONTEXT-MAP.md
├── docs/adr/                          ← system-wide decisions
└── src/
    ├── ordering/
    │   ├── CONTEXT.md
    │   └── docs/adr/                  ← context-specific decisions
    └── billing/
        ├── CONTEXT.md
        └── docs/adr/
```

## Use the glossary's vocabulary

当你的 output 命名一个 domain concept（issue title、refactor proposal、hypothesis、test name）时，使用 `CONTEXT.md` 中定义的 term。不要漂移到 glossary 明确 avoid 的 synonyms。

如果你需要的 concept 不在 glossary 中，这是一个 signal：要么你正在发明项目不用的 language（reconsider），要么确实存在 gap（为 `/domain-modeling` note it）。

## Flag ADR conflicts

如果你的 output 与 existing ADR 冲突，明确 surface 它，而不是 silently overriding：

> _Contradicts ADR-0007 (event-sourced orders) — but worth reopening because…_
