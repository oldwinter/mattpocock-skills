---
name: setup-ts-deep-modules
description: 为 TypeScript repo 接入 dependency-cruiser，使每个 package 都成为 deep module：实现隐藏在子目录中，只能通过 entry-point files 访问。由用户显式调用。
disable-model-invocation: true
---

# Setup TS Deep Modules

把本 repo 中的每个 package 变成 **deep module**：用 small interface 隐藏大量 behaviour。Package 的 public surface 是它的 **entry points**，也就是 package root 的 files；所有 subfolders 中的内容都隐藏。此 skill 会安装 [dependency-cruiser](https://github.com/sverweij/dependency-cruiser)，加入只允许通过 entry points 进入 package 的 rules，并验证这些 rules 确实能阻止违规 import。

关于 deep module、interface、seam、depth 的 vocabulary，请运行 `/codebase-design`，并在整个过程中使用它的 language。

## 强制执行的结构

```text
src/packages/
  <name>/
    index.ts        ← entry point（public），外部从这里 import
    client.ts       ← 另一个 entry point；一个 package 可以暴露多个
    lib/            ← implementation：对外隐藏，内部 files 可自由互相 import
    tests/          ← co-located tests + fixtures（属于 subfolder，因此 private）
```

Public surface 是 package 的 **root files**，而不是某一个指定的 `index.ts`。约定上 implementation 放在 `lib/`，tests 放在 `tests/`，让每个 package 保持相同的 two-folder shape。但 rule 本身更通用：任何 subfolder 中的任何内容都是 private，因此新增 folder 时无需修改 config。

四条 rules，全部为 `error`：

1. **Entry-point boundary**：package 外部的 code（app code 或其他 package）只能 import 该 package 的 entry points，也就是 root files；不能 import 任何 subfolder。
2. **Intra-package freedom**：package 自己的 files 可以自由互相 import。
3. **Tests through the entry points**：`<pkg>/tests/` 下的 files 可以 import 任意 package 的 entry points，以及本 package 的 `tests/` fixtures；但不能 import 任何 package 的 subfolder internals，包括自身 internals。允许跨 packages 的 integration tests，不允许 deep imports。
4. **No cycles**：禁止 dependency cycles。

**Entry points，不是单一 barrel。** Public surface 是每个 root file，因此 package 可以暴露多个 small entry points（`index.ts`、`client.ts`、`server.ts`），无需把所有内容都 funnel 到巨大的 `index.ts`。不鼓励 re-export 整棵 subtree 的 barrel files；entry points 应保持 small，implementation 隐藏在 subfolders 中。

Layering，也就是哪些 packages 可以依赖哪些 packages，是另一项 concern；config 中只保留 commented stub，由具体 repo 填写。

## Steps

### 1. Detect the environment

- **Package manager**：`pnpm-lock.yaml` → pnpm，`yarn.lock` → yarn，`bun.lockb` → bun，否则使用 npm。下方所有 commands 都使用检测到的 manager（`pnpm` / `yarn` / `npm run` / `bunx`）。
- **Packages root**：存在 `src/` 时使用 `src/packages`，否则使用 `packages`。如果 repo 已有另一套明显 convention，向用户确认。
- **Existing config**：检查 `.dependency-cruiser.*` file。如果已存在，不要 overwrite；把四条 rules 和 options merge 进去，并告诉用户新增了什么。

**Done when：** package manager、packages root 与 existing-config status 都已明确。

### 2. Install dependency-cruiser

使用检测到的 package manager，把 `dependency-cruiser` 安装为 devDependency。

**Done when：** `dependency-cruiser` 已出现在 `devDependencies`。

### 3. Write the config

把 [`dependency-cruiser.config.cjs`](./dependency-cruiser.config.cjs) 复制到 repo root，命名为 `.dependency-cruiser.cjs`。把 `PACKAGES_ROOT` 设为 step 1 检测到的 root。Rules 基于 path depth 且与 extension 无关，无需适配其他内容。

**Done when：** `.dependency-cruiser.cjs` 存在、`PACKAGES_ROOT` 正确，并包含四条 forbidden rules。

### 4. Wire it into the checks

- 添加 `lint:boundaries` script：`depcruise <packages-root>`，或 `depcruise src`。
- 把它接入 repo 现有的 umbrella check command，也就是同时运行 typecheck 的 `check` / `ci` / `validate` 等 script。不要修改 `tsconfig`，也不要添加 path aliases。
- 如果没有 umbrella script，就添加 `lint:boundaries`，并告诉用户需要把它加入 CI。

**Done when：** `lint:boundaries` 存在，并与 typecheck 由同一个 command 运行。

### 5. Scaffold the example package

创建并 commit `<packages-root>/example/` 作为 copy-me template：

- `index.ts`：entry point。Export 一个委托给 internal file 的 function，让 package 明显是 deep，而不是 pass-through。
- `lib/impl.ts`：位于 **subfolder** 的 internal file，由 `index.ts` import，外部不可访问。
- `tests/example.test.ts`：只 import `../index`（entry point），并针对 public function 断言。

告诉用户这是可以复制或删除的 starter template。

**Done when：** example package 已存在，通过 root entry point 暴露 behaviour，并把 `impl` 隐藏在 subfolder 中。

### 6. Prove the rules bite

这是整个 skill 的 completion criterion；无法在违规时失败的 config 没有价值。

1. 运行 `lint:boundaries`，clean example 必须 **pass**。
2. 临时在 `tests/example.test.ts` 中加入 deep import，例如 `import { thing } from "../lib/impl"`。再次运行 `lint:boundaries`，必须以 `tests-through-entrypoints` **fail**。
3. Revert deep import，再运行一次，必须重新 **pass**。

**Done when：** 已观察到 pass → deep import fail → pass。如果 step 2 没有 fail，rules 没有正确 wiring；修复后才能结束。

### 7. Document the convention

在 packages folder 内写 `<packages-root>/README.md`，与受约束 packages 放在一起。内容包括：`src/packages/<name>/` layout、root entry points、`lib/` implementation、`tests/` tests、只能通过 package root entry points import，以及如何运行 `lint:boundaries`。必须明确**不鼓励 barrel files**，应暴露多个 small entry points，而不是通过单一 index re-export 整棵 subtree。保持简洁：copy-me snippet 加四条 rules，每条一段。

然后从 repo 的 agent-instructions file 添加一个 **context pointer**：优先 `CLAUDE.md`，否则 `AGENTS.md`；两者都没有时创建 `AGENTS.md`。一行即可，例如：`Packages are deep modules; read src/packages/README.md before adding or importing one.` 这样 agent 才会在触发 boundary rule 前发现约定。

**Done when：** `<packages-root>/README.md` 存在并反对 barrels，且 repo 的 `CLAUDE.md` / `AGENTS.md` 链接到它。

## Notes

- Config 中的 `$1` back-references（dependency-cruiser group matching）允许 package 访问自身 internals，同时阻止 outsiders；不要把它们 flatten 成 per-package rules。
- Public/private 由 **depth** 决定：package root files 是 entry points，任何 subfolder 内容都是 private。约定 subfolders 是 `lib/` 和 `tests/`，但 rule 不 hardcode 它们；新增 folder 不需要改 config。新增 entry point 只需新增 root file，不需要 barrel。
- Packages 是 **flat** 的：root 下只有一层 immediate children。Package internals 可以任意深度 nesting，但 package 不能包含另一个 package。
- 使用 `.cjs` 而不是 `.js`，保证 config 的 `module.exports` 在 `"type": "module"` repo 中仍可运行。
