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

1. **`/grill-with-docs`** — 通过 interview 打磨 idea。只要你 **正在 working directory 中工作** 就从这里开始：它是 stateful 的，会把学到的东西保存在 `CONTEXT.md` 和 ADRs 中。（没有 working directory？使用 `/grill-me` — 见 Standalone。两者运行同一个 `/grilling` primitive；`grill-with-docs` 会留下 paper trail，因此只要 repo 能承载记录，它就是更好的选择。）
2. **Branch — 能否在 conversation 中解决每个问题？** 如果某个问题需要 runnable answer（state、business logic、必须看到的 UI），就绕行到 prototype，并用 **`/handoff`** 双向桥接（prototype 位于自己的 directory 中，这正是 `/handoff` 的用途 — 见 Phase boundaries）：
   - **`/handoff`** out，然后基于那个 file 开启 fresh session，
   - **`/prototype`** 用 throwaway code 回答问题，
   - **`/handoff`** back 你学到的东西，并在原 idea thread 中 reference 它。
3. **Branch — 这是 multi-session build 吗？**
   - **Yes** → **`/to-spec`**（把 thread 转成 spec），然后用 **`/to-tickets`** 将它拆成 tracer-bullet tickets，每个 ticket 都明确自己的 **blocking edges**。使用 local tracker 时，每个 ticket 是 `.scratch/<feature>/issues/` 下的一个文件，按 blocker-first 顺序手动处理；使用真实 tracker 时，edges 会变成原生 blocking links，因此 blockers 已完成的 ticket 都可以被领取。每个 ticket 都单独启动 **`/implement`**，并在 tickets 之间执行 **`/clear`**。每个 ticket 都是 self-contained，因此最后一个 ticket 的 context 可以直接丢弃。
   - **No** → 在同一个 context window 中直接运行 **`/implement`**。

   无论哪种方式，**`/implement`** 都会通过内部驱动 **`/tdd`** 构建每个 Issue，一次一个 red-green slice；随后运行 **`/code-review`**，也就是对 diff 进行 two-axis review（Standards + Spec），最后再 commit。当你只是想 test-first 构建一个具体 behaviour、且不需要完整 spec 时，直接使用 **`/tdd`**；当你想基于 fixed point review branch 或 PR 时，直接使用 **`/code-review`**。

### Context hygiene

让 steps 1–3 保持在 **一个不间断的 context window** 中；在 `/to-tickets` 之前不要 compact 或 clear，这样 grilling、spec 和 tickets 都能基于同一套 thinking。随后每个 `/implement` 都 fresh start，只从 ticket 出发。

限制是 **[smart zone](https://www.aihero.dev/ai-coding-dictionary/smart-zone)**：在其中 model 仍然 sharp reasoning 的 window（state-of-the-art models 大约 150k tokens）。如果 session 在 `/to-tickets` 前接近这个区间，不要在 degraded 状态硬撑；在最近的 phase boundary 执行 `/compact` 后继续（见 Phase boundaries）。

## On-ramps

一种 starting situation 会生成 work，然后汇入 main flow。

- **Bugs and requests piling up** → **`/triage`**。它会让 issues 走过 triage roles，并产出 agent-ready issues，之后由 **`/implement`** 接手。

  Triage 只用于 **不是你创建的** issues：bug reports、incoming feature requests、任何 raw arrival。`/to-tickets` 产出的 tickets 已经 agent-ready，所以 **不要 triage 它们**。

- **Something's broken** → **`/diagnosing-bugs`**。用于困难问题：第一眼看不出的 bug、intermittent flake、在两个 known-good states 之间出现的 regression。它会拒绝在拥有 **tight feedback loop** 前理论化：必须先有一条已因 *这个* bug 变红的 command，然后带 regression test 修复。当真正发现是没有好 seam 可以锁住 bug 时，它的 post-mortem 会交给 **`/improve-codebase-architecture`**。

- **一个巨大而模糊的 effort，例如 greenfield project 或超大 feature build，大到单个 session 装不下** → **`/wayfinder`**，这是这里认知负荷最高的 flow。当从当前位置到 destination 的路径还不可见时，它会在 issue tracker 上绘制一张由 **decision tickets** 组成的 **shared map**，一次解决一个 ticket；产出的是 **decisions，而不是 deliverables**，直到雾被推开、路线变清晰。`/grill-with-docs` 用来打磨一个 session 能容纳的 idea；wayfinder 用于容纳不了的 idea，而且更慢、更密集，所以只把它留给真正需要的情况，绝不要用于 well-scoped feature。

  Map 清晰后，**它会 hand off，而不是 build**：回到 main flow 的 **`/to-spec`**，把 map 中互相链接的 decisions 压缩成 buildable plan，然后照常进入 `/to-tickets` 和 `/implement`。让 map 直接进入 `/implement` 会跳过这次压缩并丢掉 linked detail；只有当 effort 最终确实很小时，才直接进入 `/implement`。

## Codebase health

不是 feature work，而是 upkeep。

- **`/improve-codebase-architecture`** — 有空时运行，保持 codebase 对 agents 友好。它会 surface **deepening opportunities**；选中其中一个 _generates an idea_，可带到 main flow 的 `/grill-with-docs`。它是寻找 candidates 的 survey；下方的 **`/codebase-design`** 是设计已选 candidate 的 bench。

## Vocabulary underneath

两个 model-invoked references 在其他 skills *下方*运行；它们各自是某套 vocabulary 的 single source of truth。当问题出在 **words** 而不是 process 时，可以直接触达它们；也可以让上方 skills 自动拉入它们。

- **`/domain-modeling`** — 打磨项目的 *domain* language：challenge fuzzy term、解决 overloaded word（例如 “account” 同时做三件事）、把 hard-to-reverse decision 记录成 ADR。它是 `/grill-with-docs` 用来保持 `CONTEXT.md` 是干净 glossary 的 active discipline。
- **`/codebase-design`** — deep-module vocabulary（module、interface、depth、seam、adapter、leverage、locality），用于设计 module 的 *shape*：大量 behaviour 位于小 interface 后、处在 clean seam 上。`/tdd` 和 `/improve-codebase-architecture` 都使用这套语言。

## Phase boundaries

一个 **phase** 是 session 内的一段 work，例如 grilling、implementation 或 QA。在两个 phase 的 **boundary** 上有五种选择；在整张 map 中，这也是最模糊的一项判断：

- **Continue** — 留在原地。没有额外成本，也不丢失内容。
- **`/clear`** — 清空 window，适用于当前内容与下一步完全无关。
- **`/handoff`** — 写出可移植的 Markdown file。用途很窄：切换到 **new harness**、**new directory**、**colleague**，或在 **mid-phase** fork 一个 side task。它换来的是 portability。
- **Subagent** — 把 tightly-scoped task 交给独立 window，再收回 report。
- **`/compact`** — 压缩当前 context，并用它为 fresh session 提供 seed。它是决策树最底部的 **default**，不是第一反应。

阅读 [PHASE-BOUNDARIES.md](PHASE-BOUNDARIES.md) 获取有序决策树：五个问题、每条 branch 的理由，以及为什么 primary-source cost 让 **Continue** 成为首先应排除的选项。只在 boundary 做这个决定；mid-phase 要么继续，要么把剩余工作拆给 subagents。

## Standalone

完全不在 main flow 上。

- **`/grill-me`** — 和 `/grill-with-docs` 一样的 relentless interview，但它是 **stateless**：不会保存本地内容，也不会创建 `CONTEXT.md`。当你 **不在 working directory 中工作** 时使用，例如打磨 plan、design、writing，或任何不属于 repo 的内容。如果有 working directory，就改用 `/grill-with-docs`：它运行相同 interview 并留下 paper trail，因此严格来说是更好的选择。
- **`/grilling`** — interview primitive 本身：rounds、frontier、facts 由 agent 负责、decisions 由你负责。`/grill-me` 与 `/grill-with-docs` 是两个具名入口，`/triage`、`/wayfinder` 和 `/improve-codebase-architecture` 也会在内部运行它。只有需要没有 wrapper 的 interview 时才直接使用。
- **`/resolving-merge-conflicts`** — 逐 hunk 处理正在进行的 merge 或 rebase conflict，依据双方 primary source 中的 **intent** 解决，而不是机械选行，随后完成操作。它绝不会运行 `--abort`。这是完全独立于各条 flow 的 standalone；已经处于 conflict 中时使用。
- **`/prototype`** — 一个小型 throwaway program，用来回答一个 design question：state model 是否合理，或 UI 应该长什么样。Throwaway 限定的是 code 的写法，并不承诺销毁它：answer 会 fold 进 real code，而 prototype 本身作为 **primary source** 保存在 main 之外的 `prototype/<name>` branch，并从 implementation issue 指向它。它是 main flow 第 2 步的 detour，但任何难以在纸面 settle 的 design question 都可以直接使用。
- **`/research`** — 将阅读工作委派给 **background agent**：它基于 **primary sources** 调查问题，然后在 repo 中留下带引用的 Markdown file。它阅读时你继续推进。产出的文件可以带入 main flow 的 `/grill-with-docs`；research feeds the thinking, it doesn't replace it。
- **`/to-questionnaire`** — 当 blocker 不在你的脑中或 codebase 中，而在 **另一个人**那里时，生成一份 questionnaire 供对方填写。它是 `/grill-me` 的反向形式：不 interview 你关于 subject，而是 interview 这次 **send**，即发给谁、需要拿回什么，并把问题瞄准 knowledge gap。返回内容可进入 `/grill-with-docs` 或 `/to-spec`。
- **`/wizard`** — 用于只有 **human** 能完成的步骤：provisioning infrastructure、设置 credentials 或 CI secrets、操作陌生的第三方 dashboard，或执行一次性 migration/cutover。它生成 interactive bash script，打开每个 URL、采集每个 value，并写入 `.env` 和 GitHub secrets，因此无需每次向 agent 重新解释流程。它是 model-invoked；agent 一遇到只有你能跨过的阻碍就应使用。如果 agent 自己能做，就应直接做；wizard 只服务于真正需要 human in the loop 的地方。
- **`/wait-what`** — 修正没有讲明白的上一条消息。在 conversation 中、甚至另一个 skill 内随时使用；agent 会补上缺失 context，以 plain English 和 `CONTEXT.md` vocabulary 重新解释。它是事后补救；`/grill-with-docs` 是事前预防，因为提前约定 shared language 才能阻止 jargon 出现。
- **`/teach`** — 使用当前 directory 作为 stateful workspace，跨多个 sessions 学习一个 concept。
- **`/writing-for-agents`** — 编写 agent 会消费的 documents 的 reference，包括 skills、`AGENTS.md` 与 pointed-at docs。

## Precondition

**`/setup-matt-pocock-skills`** — 在第一次 engineering flow 之前运行，用来配置 issue tracker、triage labels 和其他 skills 假定的 doc layout。Custom issue trackers 也可以。
