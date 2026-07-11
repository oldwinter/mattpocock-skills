快速开始：

```bash
npx skills add oldwinter/mattpocock-skills --skill=prototype
```

```bash
npx skills update prototype
```

[源码](https://github.com/oldwinter/mattpocock-skills/tree/main/skills/engineering/prototype)

## 功能

`prototype` 构建一个小型、可丢弃的程序，只回答一个 design question：state model 是否合理，或 UI 应该长什么样。

代码从第一天起就是 **throwaway**，并明确标记。它不包含 tests、超出可运行范围的 error handling、abstractions，也默认不做 persistence。目标是快速学习后把它从 main 和 production 移除；经单独批准的 side-branch 副本可以作为 primary-source evidence 保留。一旦开始 harden，它就不再是 prototype。

## 何时使用

输入 `/prototype`，或在任务符合条件时由 agent 自动触发。

当纸面推理不足以回答 “state model 是否合理” 或 “这个 UI 应该长什么样” 时使用。如果已有实现正在出错，需要找出原因，请改用 [diagnosing-bugs](https://aihero.dev/skills-diagnosing-bugs)；prototype 探索要 build 什么，而不是已完成的东西为何出错。

## 两种 branch

Question 决定形状：

- **“Does this logic / state model feel right?”**：构建可交互 terminal app，让 state machine 经过难以在纸面推理的 cases，并在每次 action 后输出完整 state。
- **“What should this look like?”**：在单一路由上构建多个结构差异明显的 UI variants，通过 floating bar 切换，以真实 render 做比较。

两个 branches 都保持 state in memory、提供 one-command run，并在每一步 surface 完整 state。选错 branch 会浪费整个 prototype，因此必须先明确 question。

## 把 prototype 作为 primary source 保存

完成后的 prototype 留下两样东西：

- **Answer**：verdict 与它解决的 question，记录到 issue、ADR 或 commit。
- **Prototype**：answer 的 runnable evidence，是 primary source。

Prototype 不属于 main branch：它没有 tests，也没有 production error handling。但这不意味着应销毁它。先把 validated decision fold 到真实 code；只有在用户分别明确批准创建 branch、commit、push 和修改 issue 后，才把完整 prototype 保存到永不 merge 的 throwaway branch，并在 implementation issue 中留下 pointer。Main 保持干净，原始探索仍可重新运行。

## 所处流程

`prototype` 可以随时独立调用，也常作为 main flow 的 detour。验证后的 state model 或 UI direction 可以交给 [to-spec](https://aihero.dev/skills-to-spec) 固化，architecture decision 可以通过 [domain-modeling](https://aihero.dev/skills-domain-modeling) 记录。不确定该用哪个 skill 或 flow 时，让 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
