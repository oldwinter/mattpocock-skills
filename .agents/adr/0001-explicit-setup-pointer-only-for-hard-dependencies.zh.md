# Explicit `/setup-matt-pocock-skills` pointer only for hard dependencies

Engineering skills 依赖 per-repo config（issue tracker、triage label vocabulary、domain doc layout），这些 config 由 `/setup-matt-pocock-skills` seed。有些 skills 没有这些 config 就无法 meaningful function：它们必须发布到具体 issue tracker，或应用具体 label string。其他 skills 只用这些 config 来 sharpen output（vocabulary、ADR awareness），没有它们也能 graceful degrade。

我们把它们分为 **hard-dependency** 和 **soft-dependency** skills：

- **Hard dependency**（`to-tickets`、`to-spec`、`triage`）— 包含明确的一行提示：_"… should have been provided to you — run `/setup-matt-pocock-skills` if not."_ 没有 mapping 时，output 是 wrong，而不只是 fuzzy。
- **Soft dependency**（`diagnose`、`tdd`、`improve-codebase-architecture`）— 只用 vague prose 提到 “the project's domain glossary” 和 “ADRs in the area you're touching”。如果 docs 不存在，skill 仍可工作；output 只是没那么 sharp。

这个划分让 soft-dependency skills 保持 token-light，并避免把 setup pointer cargo-cult 到不 load-bearing 的地方。
