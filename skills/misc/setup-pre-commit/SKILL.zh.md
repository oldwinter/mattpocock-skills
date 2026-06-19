---
name: setup-pre-commit
description: 在当前 repo 设置 Husky pre-commit hooks，包含 lint-staged（Prettier）、type checking 和 tests。Use when user wants to add pre-commit hooks, set up Husky, configure lint-staged, or add commit-time formatting/typechecking/testing.
---

# Setup Pre-Commit Hooks

## What This Sets Up

- **Husky** pre-commit hook
- **lint-staged**：对所有 staged files 运行 Prettier
- **Prettier** config（如果 missing）
- Pre-commit hook 中的 **typecheck** 和 **test** scripts

## Steps

### 1. Detect package manager

检查 `package-lock.json`（npm）、`pnpm-lock.yaml`（pnpm）、`yarn.lock`（yarn）、`bun.lockb`（bun）。使用存在的那个。若不清楚，default to npm。

### 2. Install dependencies

作为 devDependencies install：

```text
husky lint-staged prettier
```

### 3. Initialize Husky

```bash
npx husky init
```

这会创建 `.husky/` dir，并向 package.json 添加 `prepare: "husky"`。

### 4. Create `.husky/pre-commit`

写入此 file（Husky v9+ 不需要 shebang）：

```text
npx lint-staged
npm run typecheck
npm run test
```

**Adapt**：将 `npm` 替换成 detected package manager。如果 repo 的 package.json 没有 `typecheck` 或 `test` script，就 omit 对应 lines，并告诉用户。

### 5. Create `.lintstagedrc`

```json
{
  "*": "prettier --ignore-unknown --write"
}
```

### 6. Create `.prettierrc` (if missing)

只有当 Prettier config 不存在时才创建。使用这些 defaults：

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": false,
  "trailingComma": "es5",
  "semi": true,
  "arrowParens": "always"
}
```

### 7. Verify

- [ ] `.husky/pre-commit` exists and is executable
- [ ] `.lintstagedrc` exists
- [ ] package.json 中的 `prepare` script 是 `"husky"`
- [ ] `prettier` config exists
- [ ] 运行 `npx lint-staged` verify it works

### 8. Commit

Stage 所有 changed/created files，并用 message commit：`Add pre-commit hooks (husky + lint-staged + prettier)`

这会通过新的 pre-commit hooks，是一个很好的 smoke test，确认 everything works。

## Notes

- Husky v9+ 不需要 hook files 中有 shebangs
- `prettier --ignore-unknown` 会跳过 Prettier 无法 parse 的 files（images 等）
- Pre-commit 先运行 lint-staged（fast、staged-only），再运行 full typecheck 和 tests
