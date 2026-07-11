---
name: migrate-to-shoehorn
description: 将 test files 从 `as` type assertions 迁移到 @total-typescript/shoehorn。Use when user mentions shoehorn, wants to replace `as` in tests, or needs partial test data.
---

# Migrate to Shoehorn

## Why shoehorn?

`shoehorn` 让你在 tests 中传入 partial data，同时让 TypeScript 保持满意。它用 type-safe alternatives 替换 `as` assertions。

**Test code only.** 永远不要在 production code 中使用 shoehorn。

Tests 中 `as` 的问题：

- 被训练成不使用它
- 必须手动指定 target type
- 对 intentionally wrong data 需要 double-as（`as unknown as Type`）

## Install

```bash
npm i @total-typescript/shoehorn
```

## Migration patterns

### Large objects with few needed properties

Before：

```ts
type Request = {
  body: { id: string };
  headers: Record<string, string>;
  cookies: Record<string, string>;
  // ...20 more properties
};

it("gets user by id", () => {
  // Only care about body.id but must fake entire Request
  getUser({
    body: { id: "123" },
    headers: {},
    cookies: {},
    // ...fake all 20 properties
  });
});
```

After：

```ts
import { fromPartial } from "@total-typescript/shoehorn";

it("gets user by id", () => {
  getUser(
    fromPartial({
      body: { id: "123" },
    }),
  );
});
```

### `as Type` → `fromPartial()`

Before：

```ts
getUser({ body: { id: "123" } } as Request);
```

After：

```ts
import { fromPartial } from "@total-typescript/shoehorn";

getUser(fromPartial({ body: { id: "123" } }));
```

### `as unknown as Type` → `fromAny()`

Before：

```ts
getUser({ body: { id: 123 } } as unknown as Request); // wrong type on purpose
```

After：

```ts
import { fromAny } from "@total-typescript/shoehorn";

getUser(fromAny({ body: { id: 123 } }));
```

## When to use each

| Function        | Use case                                           |
| --------------- | -------------------------------------------------- |
| `fromPartial()` | Pass partial data that still type-checks           |
| `fromAny()`     | Pass intentionally wrong data (keeps autocomplete) |
| `fromExact()`   | Force full object (swap with fromPartial later)    |

## Workflow

1. **Gather requirements** - 询问用户：
   - 哪些 test files 有造成问题的 `as` assertions？
   - 它们是否在处理 large objects，而只有部分 properties 重要？
   - 是否需要为 error testing 传入 intentionally wrong data？

2. **Install and migrate**：
   - [ ] Install: `npm i @total-typescript/shoehorn`
   - [ ] Find test files with `as` assertions: `grep -r " as [A-Z]" --include="*.test.ts" --include="*.spec.ts"`
   - [ ] Replace `as Type` with `fromPartial()`
   - [ ] Replace `as unknown as Type` with `fromAny()`
   - [ ] Add imports from `@total-typescript/shoehorn`
   - [ ] Run type check to verify
