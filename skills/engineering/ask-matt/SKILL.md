---
name: ask-matt
description: 询问哪个 skill 或 flow 适合你的情况。它是这个 repo 中 skills 的 router。
disable-model-invocation: true
---

# Ask Matt

你不需要记住每个 skill，所以 ask。

**Flow** 是一条穿过 skills 的路径。多数路径沿着一个 **main flow** 运行，另有两个 **on-ramps** 汇入它。其余要么是 standalone，要么是在下方运行的 vocabulary layer。

## The main flow: idea → ship

大多数 work 会走这条 route。你有一个 idea，并希望它被 built。

1. **`/grill-with-docs`** — 通过 interview 打磨 idea。当你 **有 codebase** 时从这里开始：它是 stateful 的，会把学到的东西保存在 `CONTEXT.md` 和 ADRs 中。（没有 codebase？使用 `/grill-me` — 见 Standalone。两者运行同一个 `/grilling` primitive；`grill-with-docs` 是会留下 paper trail 的那个。）
2. **Branch — 能否在 conversation 中解决每个问题？** 如果某个问题需要 runnable answer（state、business logic、必须看到的 UI），就绕行到 prototype，并用 **`/handoff`** 双向桥接（见 Crossing sessions）：
   - **`/handoff`** out，然后基于那个 file 开启 fresh session，
   - **`/prototype`** 用 throwaway code 回答问题，
   - **`/handoff`** back 你学到的东西，并在原 idea thread 中 reference 它。
3. **Branch — 这是 multi-session build 吗？**
   - **Yes** → **`/to-spec`**（把 thread 转成 spec），然后用 **`/to-tickets`** 将它拆成 tracer-bullet tickets，每个 ticket 都明确自己的 **blocking edges**。使用 local tracker 时，每个 ticket 是 `.scratch/<feature>/issues/` 下的一个文件，按 blocker-first 顺序手动处理；使用真实 tracker 时，edges 会变成原生 blocking links，因此 blockers 已完成的 ticket 都可以被领取。每个 ticket 都单独启动 **`/implement`**，并且 **在 tickets 之间清理 context**。
   - **No** → 在同一个 context window 中直接运行 **`/implement`**。

   无论哪种方式，**`/implement`** 都会通过内部驱动 **`/tdd`** 构建每个 Issue，一次一个 red-green slice；随后运行 **`/code-review`**，也就是对 diff 进行 two-axis review（Standards + Spec），最后再 commit。当你只是想 test-first 构建一个具体 behaviour、且不需要完整 spec 时，直接使用 **`/tdd`**；当你想基于 fixed point review branch 或 PR 时，直接使用 **`/code-review`**。

### Context hygiene

让 steps 1–3 保持在 **一个不间断的 context window** 中；在 `/to-tickets` 之前不要 compact 或 clear，这样 grilling、spec 和 tickets 都能基于同一套 thinking。随后每个 `/implement` 都 fresh start，只从 ticket 出发。

限制是 **[smart zone](https://www.aihero.dev/ai-coding-dictionary/smart-zone)**：在其中 model 仍然 sharp reasoning 的 window（state-of-the-art models 大约 120k tokens）。如果 session 在 `/to-tickets` 前接近这个区间，不要在 degraded 状态硬撑；用 `/handoff` 并在 fresh thread 中继续。

## On-ramps

一种 starting situation 会生成 work，然后汇入 main flow。

- **Bugs and requests piling up** → **`/triage`**。它会让 issues 走过 triage roles，并产出 agent-ready issues，之后由 **`/implement`** 接手。

  Triage 只用于 **不是你创建的** issues：bug reports、incoming feature requests、任何 raw arrival。`/to-tickets` 产出的 tickets 已经 agent-ready，所以 **不要 triage 它们**。

- **Something's broken** → **`/diagnosing-bugs`**。用于困难问题：第一眼看不出的 bug、intermittent flake、在两个 known-good states 之间出现的 regression。它会拒绝在拥有 **tight feedback loop** 前理论化：必须先有一条已因 *这个* bug 变红的 command，然后带 regression test 修复。当真正发现是没有好 seam 可以锁住 bug 时，它的 post-mortem 会交给 **`/improve-codebase-architecture`**。

- **一个巨大而模糊的 effort，例如 greenfield project 或超大 feature build，大到单个 session 装不下** → **`/wayfinder`**。当从当前位置到 destination 的路径还不可见时，它会在 issue tracker 上绘制一张由 investigation tickets 组成的 **shared map**，一次解决一个 ticket；产出的是 **decisions，而不是 deliverables**，直到雾被推开、路线变清晰。之后回到 main flow 的 **`/to-spec`**；如果 effort 最终足够小，也可以直接进入 **`/implement`**。`/grill-with-docs` 用来打磨一个 session 能容纳的 idea，wayfinder 用于容纳不了的 idea。

## Codebase health

不是 feature work，而是 upkeep。

- **`/improve-codebase-architecture`** — 有空时运行，保持 codebase 对 agents 友好。它会 surface **deepening opportunities**；选中其中一个 _generates an idea_，可带到 main flow 的 `/grill-with-docs`。它是寻找 candidates 的 survey；下方的 **`/codebase-design`** 是设计已选 candidate 的 bench。

## Vocabulary underneath

两个 model-invoked references 在其他 skills *下方*运行；它们各自是某套 vocabulary 的 single source of truth。当问题出在 **words** 而不是 process 时，可以直接触达它们；也可以让上方 skills 自动拉入它们。

- **`/domain-modeling`** — 打磨项目的 *domain* language：challenge fuzzy term、解决 overloaded word（例如 “account” 同时做三件事）、把 hard-to-reverse decision 记录成 ADR。它是 `/grill-with-docs` 用来保持 `CONTEXT.md` 是干净 glossary 的 active discipline。
- **`/codebase-design`** — deep-module vocabulary（module、interface、depth、seam、adapter、leverage、locality），用于设计 module 的 *shape*：大量 behaviour 位于小 interface 后、处在 clean seam 上。`/tdd` 和 `/improve-codebase-architecture` 都使用这套语言。

## Crossing sessions

- **`/handoff`** — 当 thread 太满，或你需要 branch off（例如进入 `/prototype` session）时，把 conversation compact 成 markdown file。你不会原地继续；你 **打开新 session 并 reference 该 file** 来携带 context。它是在 context windows 之间双向移动的 bridge。当你想要 **fresh session** 但需要 **保留当前 conversation** 时使用。
- **`/compact`**（built-in）— 留在 **同一个 conversation** 中，让 earlier turns 被 summarized。只在 **phases 之间的 intentional breaks** 使用，且你不介意丢失 verbatim history。不要在 mid-phase compact；agent 可能 lose its way。`/handoff` 是 fork；`/compact` 是 continue。

## Standalone

完全不在 main flow 上。

- **`/grill-me`** — 和 `/grill-with-docs` 一样的 relentless interview，但用于 **没有 codebase** 的场景。Stateless：不会保存本地内容，不会创建 `CONTEXT.md`。用它打磨任何不属于 repo 的 plan 或 design。
- **`/prototype`** — 一个小型 throwaway program，用来回答一个 design question：state model 是否合理，或 UI 应该长什么样。从第一天起就是 throwaway；把 validated decision 吸收到真实 code，再把 prototype 作为 primary source 提交到 main 之外的 throwaway branch。它是 main flow 第 2 步的 detour，但任何难以在纸面 settle 的 design question 都可以直接触达它。
- **`/research`** — 将阅读工作委派给 **background agent**：它基于 **primary sources** 调查问题，然后在 repo 中留下带引用的 Markdown file。它阅读时你继续推进。产出的文件可以带入 main flow 的 `/grill-with-docs`；research feeds the thinking, it doesn't replace it。
- **`/teach`** — 使用当前 directory 作为 stateful workspace，跨多个 sessions 学习一个 concept。
- **`/writing-great-skills`** — 写好和编辑 skills 的 reference。

## Precondition

**`/setup-matt-pocock-skills`** — 在第一次 engineering flow 之前运行，用来配置 issue tracker、triage labels 和其他 skills 假定的 doc layout。Custom issue trackers 也可以。
