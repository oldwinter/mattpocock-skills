# mattpocock-skills

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
