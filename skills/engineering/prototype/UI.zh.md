# UI Prototype

在 single route 上生成**几个 radically different UI variations**，并从 floating bottom bar 切换。用户在 browser 中翻看 variants，选择一个（或从每个里偷一点），然后把其余全部 throw away。

如果问题关于 logic/state，而不是东西长什么样，那就是 wrong branch。使用 [LOGIC.zh.md](LOGIC.zh.md)。

## When this is the right shape

- “What should this page look like?”
- “I want to see a few options for this dashboard before committing.”
- “Try a different layout for the settings screen.”
- 任何用户原本要花一天在脑中比较三个 vague mockups 的场景。

## Two sub-shapes — strongly prefer sub-shape A

当 UI prototype **butting up against the rest of the app** 时更容易判断：real header、real sidebar、real data、real density。一个单独的 throwaway route 是 vacuum：每个 variant 在 isolation 中看起来都不错。只要存在 plausible existing page 可容纳 variants，就默认 sub-shape A。只有 prototype 真的没有 nearby home 时，才使用 sub-shape B。

### Sub-shape A — adjustment to an existing page (preferred)

Route 已存在。Variants 在**同一路由**渲染，并由 `?variant=` URL search param gated。Existing data fetching、params 和 auth 都保留；只有 rendering swap。这是 default；除非有具体理由，否则选它。

如果 prototype 的东西尚未有 page，但它 would naturally live inside one（dashboard 的 new section、settings screen 的 new card、existing flow 的 new step），仍属于 sub-shape A。把 variants mount 到 host page 内。

### Sub-shape B — a new page (last resort)

只有当被 prototyping 的东西真的没有 existing page 可容纳时才使用：例如全新的 top-level surface，或无法 sensible embed 的 flow。

按照项目现有 routing convention 创建一个 **throwaway route**；不要发明新的 top-level structure。命名要明显是 prototype（例如 path 或 filename 中包含 `prototype`）。同样使用 `?variant=` pattern。

在 commit to sub-shape B 前 sanity-check：真的没有 existing page 可以 embed 吗？Empty route 会隐藏 populated one 才会暴露的 design problems。

两种 sub-shapes 都使用同一个 floating bottom bar。

## Process

### 1. State the question and pick N

Default 为 **3 variants**。超过 5 个就不再 radically different，而开始变成 noise；上限为 5。

在 prototype location 或 top-of-file comment 中用一行写下 plan：

> “Three variants of the settings page, switchable via `?variant=`, on the existing `/settings` route.”

无论用户是否在场 push back，这都有效。

### 2. Generate radically different variants

Draft 每个 variant。每个 variant 都要符合：

- Page 的 purpose 和它可访问的数据。
- 项目的 component library / styling system（TailwindCSS、shadcn、MUI、plain CSS 等）。
- 清晰的 exported component name，例如 `VariantA`、`VariantB`、`VariantC`。

Variants 必须**结构上不同**：不同 layout、不同 information hierarchy、不同 primary affordance，而不只是不同 colours。三个略微调整的 card grids 不是 UI prototype，只是 wallpaper。如果两个 drafts 太相似，重做其中一个，并明确要求 “do not use a card grid”。

### 3. Wire them together

在 route 上创建单个 switcher component：

```tsx
// pseudo-code — adapt to the project's framework
const variant = searchParams.get('variant') ?? 'A';
return (
  <>
    {variant === 'A' && <VariantA {...data} />}
    {variant === 'B' && <VariantB {...data} />}
    {variant === 'C' && <VariantC {...data} />}
    <PrototypeSwitcher variants={['A','B','C']} current={variant} />
  </>
);
```

对 sub-shape A（existing page）：将所有 existing data fetching 保留在 switcher 上方；只有 rendered subtree 随 variant 改变。

对 sub-shape B（new page）：`/prototype/<name>` 下的 throwaway route mount 同一个 switcher。

### 4. Build the floating switcher

一个小的 fixed-position bar，放在 screen bottom-centre，包含三部分：

- **Left arrow** — 循环到 previous variant（wraps around）。
- **Variant label** — 显示当前 variant key，如果 variant export name，也显示 name。例如 `B — Sidebar layout`。
- **Right arrow** — 循环向前（wraps around）。

Behaviour：

- 点击 arrow 更新 URL search param（使用 framework router：Next 用 `router.replace`，React Router 用 `navigate` 等），让 variant shareable 且 reload-stable。
- Keyboard：`←` 和 `→` arrow keys 也 cycle。当 `<input>`、`<textarea>` 或 `[contenteditable]` focused 时，不要 intercept arrow keys。
- 视觉上与 page 区分明显（例如 high-contrast pill、subtle shadow），让它显然不是被评估 design 的一部分。
- 在 production builds 中 hidden：用 `process.env.NODE_ENV !== 'production'` 或 equivalent gate，避免 stray prototype merge 把 bar ship 给 users。

把 switcher 放在单个 shared component 中，让两种 sub-shapes 都能 reuse。放在项目 shared UI 所在位置。

### 5. Hand it over

Surface URL（以及 `?variant=` keys）。用户会在有空时翻看。最有意思的 feedback 通常是 **“I want the header from B with the sidebar from C”**；那才是他们真正想要的 design。

### 6. Capture the answer and clean up

一旦某个 variant 胜出，写下哪个赢了以及 why（commit message、ADR、issue，或用户没回应时 prototype 旁边的 `NOTES.md`）。然后：

- **Sub-shape A** — 删除 losing variants 和 switcher；将 winner fold 进 existing page。
- **Sub-shape B** — 将 winning variant promote 到 real route，删除 throwaway route 和 switcher。

不要留下 variant components 或 switcher。它们很快腐烂，并 confuse 下一个 reader。

## Anti-patterns

- **Variants that differ only in colour or copy.** 这只是 tweak，不是 prototype。真正 variants 会在 structure 上 disagree。
- **Sharing too much code between variants.** 共享 `<Header>` 可以；共享 `<Layout>` 会 defeat the point。每个 variant 都应该自由 throw out layout。
- **Wiring variants to real mutations.** Read-only prototypes 没问题。如果 variant 需要 mutate，指向 stub；问题是 “what should this look like”，不是 “does the backend work”。
- **Promoting the prototype directly to production.** Variant code 是在 prototype constraints 下写的（没有 tests，minimal error handling）。Fold in 时要 properly rewrite。
