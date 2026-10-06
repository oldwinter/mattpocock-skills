# mattpocock-skills

## 1.3.1

### Patch Changes

- `ask-matt` 不再声称 `diagnosing-bugs` 会在 post-mortem 阶段 hand off 到 `improve-codebase-architecture`。Bug 修复后改为运行 `/retro`，分析什么改进本可防止问题；只有 finding 指向缺少合适 seam 时，才使用 `/improve-codebase-architecture`。

## 1.3.0

### Minor Changes

- 将 **`implement-spec`** 晋升到 **Engineering**，加入 Claude Code plugin、docs 和 `ask-matt` router。它把 tickets 读取为 task graph，在 ready frontier 上并行运行独立 worktree 中的 implementer subagents，并把结果落到一个 integration branch，最后运行 `code-review`。只有 tracker 通过 PR 关闭工作或用户明确要求时才创建 draft PR。
- 将 model-invoked 的 **`pr`** 晋升到 **Engineering**。它用最小 visual 组织 PR Summary，提供 before/after Evidence，并判断 one-way 或 two-way door 及 blast radius。
- 将 user-invoked 的 **`retro`** 晋升到 **Engineering**，作为 main flow 中 `code-review` 之后的最后一步。它回顾 coding session，并针对 agent environment 提出 navigation pointers、automated checks、coding standards、steering files、tool economy 和 information access 等改进。
- 移除 **`resolving-merge-conflicts`** skill，不提供替代项。Agent 会直接处理 merge/rebase conflicts；已发布 docs 页面保留并标记 archived。
- 将 domain docs 约定从 `CONTEXT.md` / `CONTEXT-MAP.md` 改名为 `GLOSSARY.md` / `GLOSSARY-MAP.md`。已有 repo 需要用 `git mv` 迁移，skills 此后只读取新名称。

### Patch Changes

- `domain-modeling` 的 trigger 扩展为讨论 codebase terminology、直接编辑 `GLOSSARY.md` 或 ADR。
- 修复多个 skill frontmatter 中未加引号的 colon-space，避免 `skills.sh` 在 discovery 时跳过它们。
- `grilling` 的连续 questions 之间使用 horizontal rule。
- 移除 repo prose 中的 em dash，并规定后续不得重新引入。
- Cross-skill invocation 统一使用明确的 Skill tool call；user-invoked skill 的前置条件改为要求 human 运行，而不是由其他 skill 调用。
- `wait-what` 在 multi-context repo 中会沿 `GLOSSARY-MAP.md` 找到正确的 `GLOSSARY.md`。

## 1.2.3 中文同步摘要（上游 `84fdeff`）

- 新增 `wait-what`，用于在上一条消息没有讲明白时补齐 context 并用 plain language 重讲。
- 将 `to-questionnaire` 晋升到 Productivity，将 `wizard` 晋升到 Engineering，并把两者加入 plugin、router、README 与 docs。
- 将 `writing-great-skills` 重命名并扩展为 model-invoked 的 `writing-for-agents`，覆盖 skills、`AGENTS.md` / `CLAUDE.md` 与 pointer docs。
- `prototype` 的 logic 分支改为单个可分享 HTML；原型作为 primary source 保存在 throwaway branch，而不是完成后删除。
- `grilling` 改为按轮次处理 decision tree frontier，并用 background sub-agents 处理环境可回答的问题。
- `diagnosing-bugs` 现在要求对命令、输出和采集 artifacts 做 secret redaction；subagent instructions 也改为跨 harness 的中性表达。
- Claude Code plugin 升级到 `1.2.3`；`wizard` 以 stage 数显示进度，不再给不可靠的时间估算。
- 清理已退役的 deprecated、personal 与旧 draft skills；in-progress bucket 明确为公开 Beta。
- 修正 `grill-me` 的说明：目标是让用户能够对想法作出承诺，而不是声称想法本身“持有 decisions”。

## 较早的未发布变更（同步上游 `391a270`）

- 将 `to-prd` 重命名为 `to-spec`，并把 spec 作为当前 conversation 的综合产物。
- 用 `to-tickets` 取代 `to-issues`：每张 ticket 都是 tracer-bullet vertical slice，并明确 blocking edges；local tracker 改为每张 ticket 一个文件。
- 将 `wayfinder` 晋升为可安装的 user-invoked engineering skill，用 shared investigation map 规划单个 session 装不下的 effort。
- 简化 `setup-matt-pocock-skills`：优先给 recommended answer，未安装 `triage` 时跳过 labels，非 monorepo 默认 single-context。
- Prototype 完成后把 validated decision 吸收到 main，并把完整 prototype 作为 primary source 保存在 throwaway branch。
- 新增 draft `setup-ts-deep-modules`，用于 TypeScript package 的 deep-module 结构设置。

## 1.0.1

### Patch Changes

- [`d20ee26`](https://github.com/mattpocock/skills/commit/d20ee2684e2a9442698ac3c1e0f2c5b68c4cf296) Thanks [@mattpocock](https://github.com/mattpocock)! - 让 **`teach`** skill reuse-first。Lessons 现在从 `./assets/` 中的 reusable **components** 构建，包括 stylesheets、quiz widgets、simulators、diagram helpers。Reuse 是 default：agent 在 authoring lesson 前读取 `./assets/`，从已有 components 构建，并把新的 reusable 内容抽取成 component，而不是 inline。

## 1.0.0

### Major Changes

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) Thanks [@mattpocock](https://github.com/mattpocock)! - 添加 **`ask-matt`** skill：一个 user-invoked router，用来指向适合当前情况的 skill 或 flow。

  **Breaking:** `ask-matt` 会 route 到这个 repo 中其他 user-invoked skills，因此它预期这些 skills 已安装。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) Thanks [@mattpocock](https://github.com/mattpocock)! - 添加 shared design skills，并把现有 skills 接到它们上。

  - 新增 **`codebase-design`** skill：deep-module vocabulary（module、interface、depth、seam、adapter）以及将大量 behaviour 放在 small interface 后面的 principles。此前位于 `improve-codebase-architecture/LANGUAGE.md` 的 language 现在放在这里，并 generalized for reuse across skills。
  - 新增 **`domain-modeling`** skill：主动构建和打磨项目的 domain model，对照 glossary stress-test terms，并保持 `CONTEXT.md` 和 ADRs 最新。
  - `improve-codebase-architecture` 现在从 `/codebase-design` 获取 architecture vocabulary，并从 `/domain-modeling` 获取 domain model。
  - `tdd` 现在依赖 `/codebase-design` 做 interface-design guidance；它内联的 `deep-modules.md` / `interface-design.md` notes 已移除，改用 shared skill。
  - `grill-with-docs` 现在通过 `/domain-modeling` inline 构建 domain model。

  **Breaking:** 这些 skills 现在依赖新的 `codebase-design` / `domain-modeling` skills，因此你也必须安装它们。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) Thanks [@mattpocock](https://github.com/mattpocock)! - 移除 **`caveman`** 和 **`zoom-out`** skills。

  - `caveman` 是我测试中的另一个 skill 的 duplicate，从未打算 public。
  - `zoom-out` 在实践中未被使用，因此从 repo 中移除。

  **Breaking:** 两个 skills 都已移除。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) Thanks [@mattpocock](https://github.com/mattpocock)! - 将 **`diagnose`** skill 重命名为 **`diagnosing-bugs`**。

  **Breaking:** 现在应 invoke `/diagnosing-bugs`，旧的 `/diagnose` 名称不再存在。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) Thanks [@mattpocock](https://github.com/mattpocock)! - 用 **`writing-great-skills`** 替代 **`write-a-skill`**。

  - 移除 `write-a-skill`。
  - 添加 `writing-great-skills`（以及它的 `GLOSSARY.md`）：用于写好和编辑 skills 的 reference，包含让 skill predictable 的 vocabulary 和 principles，并把 no-ops 追查到 sentence level。
  - 将 `grilling` 暴露为 model-invoked skill：它是 `grill-me` 和 `grill-with-docs` 背后的 reusable interview loop。

  **Breaking:** `write-a-skill` 已移除；请使用 `writing-great-skills`。

### Minor Changes

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) Thanks [@mattpocock](https://github.com/mattpocock)! - 添加 **`resolving-merge-conflicts`** skill：解决正在进行的 git merge 或 rebase conflict 的 loop。Standalone，不依赖其他 skills。

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) Thanks [@mattpocock](https://github.com/mattpocock)! - 将 skill taxonomy 从 **Commands / Skills** 重命名为 **User-invoked / Model-invoked**，并新增 `docs/invocation.md` 定义二者差异：user-invoked skills 只有在你输入它们时才可触达，用于 orchestration；model-invoked skills 也能在 task 匹配时自动触达。User-invoked skill 可以 invoke model-invoked skills，但永远不能 invoke 另一个 user-invoked skill。

### Patch Changes

- [`47bde84`](https://github.com/mattpocock/skills/commit/47bde84da032afb2e5058f997f3bbca47d321dbd) Thanks [@mattpocock](https://github.com/mattpocock)! - Tighten **`review`** skill：fail-fast ref check、single-sourced rules 和 no-op cuts。
