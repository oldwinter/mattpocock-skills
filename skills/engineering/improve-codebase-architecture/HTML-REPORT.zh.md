# HTML Report Format

Architectural review 会渲染成 OS temp directory 中的单个 self-contained HTML file。Tailwind 和 Mermaid 都来自 CDNs。Mermaid 可靠处理 graph-shaped diagrams；hand-built divs 和 inline SVG 处理更 editorial 的 visuals（mass diagrams、cross-sections）。两者混用；不要所有东西都依赖 Mermaid，否则会开始显得 generic。

## Scaffold

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Architecture review — {{repo name}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="module">
      import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
      mermaid.initialize({ startOnLoad: true, theme: "neutral", securityLevel: "loose" });
    </script>
    <style>
      /* small custom layer for things Tailwind doesn't cover cleanly:
         dashed seam lines, hand-drawn-feeling arrow heads, etc. */
      .seam { stroke-dasharray: 4 4; }
      .leak { stroke: #dc2626; }
      .deep { background: linear-gradient(135deg, #0f172a, #1e293b); }
    </style>
  </head>
  <body class="bg-stone-50 text-slate-900 font-sans">
    <main class="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <header>...</header>
      <section id="candidates" class="space-y-10">...</section>
      <section id="top-recommendation">...</section>
    </main>
  </body>
</html>
```

## Header

Repo name、date 和 compact legend：solid box = module，dashed line = seam，red arrow = leakage，thick dark box = deep module。不要 introduction paragraph；直接进入 candidates。

## Candidate card

Diagrams 承担主要表达。Prose 稀疏、plain，并使用 `/codebase-design` skill 中的 glossary terms，不要仪式感。

每个 candidate 是一个 `<article>`：

- **Title** — 简短，命名 deepening（例如 “Collapse the Order intake pipeline”）。
- **Badge row** — recommendation strength（`Strong` = emerald，`Worth exploring` = amber，`Speculative` = slate），再加一个 dependency category tag（`in-process`、`local-substitutable`、`ports & adapters`、`mock`）。
- **Files** — monospaced list，`font-mono text-sm`。
- **Before / After diagram** — centrepiece。Two columns，side by side。见下面 patterns。
- **Problem** — 一句话。What hurts。
- **Solution** — 一句话。What changes。
- **Wins** — bullets，每条 ≤6 words。例如 “Tests hit one interface”、“Pricing logic stops leaking”、“Delete 4 shallow wrappers”。
- **ADR callout**（if applicable）— amber-tinted box 中的一行。

不要长段解释。如果 diagram 需要一段话才能理解，重画 diagram。

## Diagram patterns

选择适合 candidate 的 pattern。混合使用。不要让每个 diagram 看起来都一样；variety 是重点的一部分。

### Mermaid graph（dependencies / call flow 的 workhorse）

当重点是 “X calls Y calls Z, and look at the mess” 时，使用 Mermaid `flowchart` 或 `graph`。用 Tailwind-styled card 包起来，让它不显得 parachuted in。使用 classDef 给 leakage edges 上红色、给 deep module 上深色。Sequence diagrams 很适合表达 “before: 6 round-trips; after: 1”。

```html
<div class="rounded-lg border border-slate-200 bg-white p-4">
  <pre class="mermaid">
    flowchart LR
      A[OrderHandler] --> B[OrderValidator]
      B --> C[OrderRepo]
      C -.leak.-> D[PricingClient]
      classDef leak stroke:#dc2626,stroke-width:2px;
      class C,D leak
  </pre>
</div>
```

### Hand-built boxes-and-arrows（when Mermaid's layout fights you）

Modules 用带 borders 和 labels 的 `<div>`。Arrows 用 inline SVG `<line>` 或 `<path>`，absolute positioned 到 relative container 上。想让 “after” diagram 看起来像一个 thick-bordered deep module，里面有 greyed-out internals 时使用；Mermaid 无法以正确 weight 渲染这种效果。

### Cross-section（good for layered shallowness）

Stack horizontal bands（`h-12 border-l-4`），展示 call 穿过的 layers。Before：6 个 thin layers，每层几乎什么都不做。After：1 个 thick band，标注 consolidated responsibility。

### Mass diagram（good for "interface as wide as implementation"）

每个 module 两个 rectangles：一个表示 interface surface area，一个表示 implementation。Before：interface rectangle 几乎和 implementation rectangle 一样高（shallow）。After：interface rectangle 短，implementation rectangle 高（deep）。

### Call-graph collapse

Before：用 nested boxes 渲染一棵 function calls tree。After：同一棵树 collapse 到一个 box 中，now-internal calls 以 faded 方式显示在里面。

## Style guidance

- Lean editorial，不是 corporate-dashboard。Generous whitespace。Headings 可选 serif（`font-serif` 与 stone/slate 很搭）。
- Sparingly 使用 colour：一个 accent（emerald 或 indigo），red 用于 leakage，amber 用于 warnings。
- Diagrams 保持约 320px 高，让 before/after 能 side by side 舒适展示，不需要 scrolling。
- Diagram 内 module labels 用 `text-xs uppercase tracking-wider`；它们应读起来像 schematic，不像 UI。
- 唯一 scripts 是 Tailwind CDN 和 Mermaid ESM import。Report 其他部分是 static；没有 app code，没有 interactivity，除了 Mermaid 自身 rendering。

## Top recommendation section

一个更大的 card。Candidate name、一句话说明 why、到其 card 的 anchor link。就这些。

## Tone

Plain English，concise；但 architectural nouns 和 verbs 必须直接来自 `/codebase-design` skill。Concision 不是 drift 的借口。

**Use exactly:** module, interface, implementation, depth, deep, shallow, seam, adapter, leverage, locality.

**Never substitute:** component, service, unit（for module） · API, signature（for interface） · boundary（for seam） · layer, wrapper（for module, when you mean module）。

**Phrasings that fit the style:**

- “Order intake module is shallow — interface nearly matches the implementation.”
- “Pricing leaks across the seam.”
- “Deepen: one interface, one place to test.”
- “Two adapters justify the seam: HTTP in prod, in-memory in tests.”

**Wins bullets** 使用 glossary terms 命名 gain：*"locality: bugs concentrate in one module"*，*"leverage: one interface, N call sites"*，*"interface shrinks; implementation absorbs the wrappers"*。不要写 *"easier to maintain"* 或 *"cleaner code"*；这些 terms 不在 glossary 中，没挣到位置。

不要 hedging，不要 throat-clearing，不要 “it's worth noting that…”。如果 sentence 可以变成 bullet，就变成 bullet。如果 bullet 可以 cut，就 cut。如果 term 不在 `/codebase-design` glossary 中，先找一个其中已有 term，再发明新词。
