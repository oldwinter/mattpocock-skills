---
name: improve-codebase-architecture
description: Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill through whichever one you pick.
disable-model-invocation: true
---

# Improve Codebase Architecture

Surface architectural friction，并提出 **deepening opportunities**：把 shallow modules 变成 deep ones 的 refactors。目标是 testability 和 AI-navigability。

这个 command 由项目的 domain model _informed_，并建立在 shared design vocabulary 之上：

- 运行 `/codebase-design` skill 获取 architecture vocabulary（**module**、**interface**、**depth**、**seam**、**adapter**、**leverage**、**locality**）及其 principles（deletion test、"the interface is the test surface"、"one adapter = hypothetical seam, two = real"）。每条 suggestion 都精确使用这些 terms，不要漂移到 “component”、“service”、“API” 或 “boundary”。
- `CONTEXT.md` 中的 domain language 为 good seams 命名；`docs/adr/` 中的 ADRs 记录此 command 不应重新争论的 decisions。

## Process

### 1. Explore

**扫描前先确定 scope — YAGNI。** Deepen module 的收益，是让未来对它的 change 更容易，因此要对 codebase 中最近发生变化的部分赋予更高权重。先决定去哪里看，再开始扫描：

- 如果用户已经点名方向，例如 module、subsystem 或 pain point，就沿该方向开始，并跳过下方推断。
- 否则，回看足够长的一段 commit history（`git log --oneline`），找出 codebase 的 hot spots，也就是反复出现的 files 和 areas，并优先关注这些 paths。如果 changes 很分散、没有清晰 hot spot，再扩大范围。

先读取项目的 domain glossary（`CONTEXT.md`），以及你触碰区域的任何 ADRs。

然后 spawn 一个 sub-agent 来 walk the codebase。不要遵循 rigid heuristics；organic explore，并记录你在哪里 experience friction：

- 理解一个 concept 是否需要在许多 small modules 之间 bounce？
- 哪些 modules **shallow**：interface nearly as complex as the implementation？
- 哪些 pure functions 只是为了 testability 被 extracted，但 real bugs 藏在它们如何被调用里（没有 **locality**）？
- 哪里 tightly-coupled modules leak across their seams？
- Codebase 的哪些部分 untested，或很难通过当前 interface test？

对任何你怀疑 shallow 的东西应用 **deletion test**：删除它会 concentrate complexity，还是只是 move it？“yes, concentrates” 就是你想要的 signal。

### 2. Present candidates as an HTML report

将 self-contained HTML file 写到 OS temp directory，避免任何东西落入 repo。从 `$TMPDIR` resolve temp dir，fallback 到 `/tmp`（Windows 上为 `%TEMP%`），写到 `<tmpdir>/architecture-review-<timestamp>.html`，让每次运行都有 fresh file。为用户 open 它：Linux 用 `xdg-open <path>`，macOS 用 `open <path>`，Windows 用 `start <path>`，并告诉他们 absolute path。

Report 使用 **Tailwind via CDN** 做 layout/styling，使用 **Mermaid via CDN** 做适合 graph/flow/sequence 的 diagrams。将 Mermaid 与 hand-crafted CSS/SVG visuals 混合使用：relationships 是 graph-shaped（call graphs、dependencies、sequences）时使用 Mermaid；需要 editorial visuals（mass diagrams、cross-sections、collapse animations）时使用 hand-built divs/SVG。每个 candidate 都有 **before/after visualisation**。Be visual。

每个 candidate 渲染为 card，包含：

- **Files** — 涉及哪些 files/modules
- **Problem** — 当前 architecture 为什么造成 friction
- **Solution** — plain English 描述会改变什么
- **Benefits** — 用 locality 和 leverage 解释，以及 tests 会如何改善
- **Before / After diagram** — side-by-side、custom-drawn，展示 shallowness 和 deepening
- **Recommendation strength** — `Strong`、`Worth exploring`、`Speculative` 之一，渲染为 badge

Report 以 **Top recommendation** section 结尾：你会先 tackle 哪个 candidate，以及 why。

**Domain 使用 CONTEXT.md vocabulary，architecture 使用 `/codebase-design` vocabulary。** 如果 `CONTEXT.md` 定义了 “Order”，就说 “the Order intake module”，而不是 “the FooBarHandler”，也不是 “the Order service”。

**ADR conflicts**：如果 candidate 与 existing ADR 冲突，只有当 friction 足够 real、值得 revisiting ADR 时才 surface。清楚标在 card 中（例如 warning callout：_"contradicts ADR-0007 — but worth reopening because…"_）。不要列出 ADR 禁止的每个 theoretical refactor。

完整 HTML scaffold、diagram patterns 和 styling guidance 见 [HTML-REPORT.zh.md](HTML-REPORT.md)。

先不要 propose interfaces。File 写完后，问用户：“Which of these would you like to explore?”

### 3. Grilling loop

用户选择一个 candidate 后，运行 `/grilling` skill，与他们一起 walk decision tree：constraints、dependencies、deepened module 的 shape、seam 后面放什么、哪些 tests survive。

随着 decisions crystallize，side effects inline 发生；运行 `/domain-modeling` skill，持续保持 domain model 最新：

- **Deepened module 的命名来自 `CONTEXT.md` 中不存在的 concept？** 将该 term 添加到 `CONTEXT.md`。如果 file 不存在，lazily 创建。
- **Conversation 中 sharpen 了 fuzzy term？** 立刻更新 `CONTEXT.md`。
- **用户用 load-bearing reason reject candidate？** Offer 一个 ADR，措辞为：_"Want me to record this as an ADR so future architecture reviews don't re-suggest it?"_ 只有当这个 reason 确实是 future explorer 为避免重提同一件事所需要的，才 offer。跳过 ephemeral reasons（“not worth it right now”）和 self-evident reasons。
- **想探索 deepened module 的 alternative interfaces？** 运行 `/codebase-design` skill，并使用它的 design-it-twice parallel sub-agent pattern。
