快速开始：

```bash
npx skills add oldwinter/mattpocock-skills --skill=prototype
```

```bash
npx skills update prototype
```

[源码](https://github.com/oldwinter/mattpocock-skills/tree/main/skills/engineering/prototype)

## 功能

`prototype` 用 throwaway code 回答一个 design question。Question 决定形状：

- Logic/state question：构建可交互 terminal app，手动推动 state transitions。
- UI question：在单一路由上构建多个结构差异明显的 variants，通过 `?variant=` 和 floating switcher 比较。

两个 branches 都保持 state in memory、提供 one-command run，并在每一步 surface 完整 state。

## 何时使用

当纸面推理不足以回答 “state model 是否合理” 或 “这个 UI 应该长什么样” 时使用。它是 model-invoked skill，也可以由用户直接调用。

## 把 prototype 作为 primary source 保存

完成后的 prototype 留下两样东西：

- **Answer**：verdict 与它解决的 question，记录到 issue、ADR 或 commit。
- **Prototype**：answer 的 runnable evidence，是 primary source。

Prototype 不属于 main branch：它没有 tests，也没有 production error handling。但这不意味着应销毁它。先把 validated decision fold 到真实 code，再把完整 prototype commit 到永不 merge 的 throwaway branch，并在 implementation issue 中留下 pointer。Main 保持干净，原始探索仍可重新运行。

## 所处流程

`prototype` 可以随时独立调用，也常作为 main flow 的 detour。验证后的 state model 或 UI direction 可以交给 [to-spec](https://aihero.dev/skills-to-spec) 固化，architecture decision 可以通过 [domain-modeling](https://aihero.dev/skills-domain-modeling) 记录。
