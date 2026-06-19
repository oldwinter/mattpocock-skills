---
name: ask-matt
description: 询问哪个 skill 或 flow 适合你的情况。它是这个 repo 中 user-invoked skills 的 router。
disable-model-invocation: true
---

# Ask Matt

你不需要记住每个 skill，所以 ask。

**Flow** 是一条穿过 skills 的路径。多数路径沿着一个 **main flow** 运行，另有两个 **on-ramps** 汇入它。其余都是 standalone。

## The main flow: idea → ship

大多数 work 会走这条 route。你有一个 idea，并希望它被 built。

1. **`/grill-with-docs`** — 通过 interview 打磨 idea。当你 **有 codebase** 时从这里开始：它是 stateful 的，会把学到的东西保存在 `CONTEXT.md` 和 ADRs 中。（没有 codebase？使用 `/grill-me` — 见 Standalone。）
2. **Branch — 能否在 conversation 中解决每个问题？** 如果某个问题需要 runnable answer（state、business logic、必须看到的 UI），就绕行到 prototype，并用 **`/handoff`** 双向桥接（见 Crossing sessions）：
   - **`/handoff`** out，然后基于那个 file 开启 fresh session，
   - **`/prototype`** 用 throwaway code 回答问题，
   - **`/handoff`** back 你学到的东西，并在原 idea thread 中 reference 它。
3. **Branch — 这是 multi-session build 吗？**
   - **Yes** → **`/to-prd`**（把 thread 转成 PRD）→ **`/to-issues`**（把 PRD 拆成 independently-grabbable issues）。因为 issues 彼此 independent，**每个 issue 之间都清理 context**：每个 issue 开启 fresh session，并把 PRD 和要处理的 single issue 传给 **`/implement`**。
   - **No** → 在同一个 context window 中直接运行 **`/implement`**。

### Context hygiene

让 steps 1–3 保持在 **一个不间断的 context window** 中；在 `/to-issues` 之前不要 compact 或 clear，这样 grilling、PRD 和 issues 都能基于同一套 thinking。随后每个 `/implement` 都 fresh start，只从 issue 出发。

限制是 **[smart zone](https://www.aihero.dev/ai-coding-dictionary/smart-zone)**：在其中 model 仍然 sharp reasoning 的 window（state-of-the-art models 大约 120k tokens）。如果 session 在 `/to-issues` 前接近这个区间，不要在 degraded 状态硬撑；用 `/handoff` 并在 fresh thread 中继续。

## On-ramps

一种 starting situation 会生成 work，然后汇入 main flow。

- **Bugs and requests piling up** → **`/triage`**。它会让 issues 走过 triage roles，并产出 agent-ready issues，之后由 **`/implement`** 接手。

  Triage 只用于 **不是你创建的** issues：bug reports、incoming feature requests、任何 raw arrival。`/to-issues` 产出的 issues 已经 agent-ready，所以 **不要 triage 它们**。

## Codebase health

不是 feature work，而是 upkeep。

- **`/improve-codebase-architecture`** — 有空时运行，保持 codebase 对 agents 友好。它会 surface deepening opportunities；选中其中一个 _generates an idea_，可带到 main flow 的 `/grill-with-docs`。

## Crossing sessions

- **`/handoff`** — 当 thread 太满，或你需要 branch off（例如进入 `/prototype` session）时，把 conversation compact 成 markdown file。你不会原地继续；你 **打开新 session 并 reference 该 file** 来携带 context。它是在 context windows 之间双向移动的 bridge。当你想要 **fresh session** 但需要 **保留当前 conversation** 时使用。
- **`/compact`**（built-in）— 留在 **同一个 conversation** 中，让 earlier turns 被 summarized。只在 **phases 之间的 intentional breaks** 使用，且你不介意丢失 verbatim history。不要在 mid-phase compact；agent 可能 lose its way。`/handoff` 是 fork；`/compact` 是 continue。

## Standalone

完全不在 main flow 上。

- **`/grill-me`** — 和 `/grill-with-docs` 一样的 relentless interview，但用于 **没有 codebase** 的场景。Stateless：不会保存本地内容，不会创建 `CONTEXT.md`。用它打磨任何不属于 repo 的 plan 或 design。
- **`/teach`** — 使用当前 directory 作为 stateful workspace，跨多个 sessions 学习一个 concept。
- **`/writing-great-skills`** — 写好和编辑 skills 的 reference。

## Precondition

**`/setup-matt-pocock-skills`** — 在第一次 engineering flow 之前运行，用来配置 issue tracker、triage labels 和其他 skills 假定的 doc layout。Custom issue trackers 也可以。
