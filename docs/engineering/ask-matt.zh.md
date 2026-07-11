快速开始：

```bash
npx skills add oldwinter/mattpocock-skills --skill=ask-matt
```

```bash
npx skills update ask-matt
```

[源码](https://github.com/oldwinter/mattpocock-skills/tree/main/skills/engineering/ask-matt)

## 功能

`ask-matt` 是本 repo 的 skill router。你描述当前处境，它会告诉你适合哪个 skill 或 flow，以及执行顺序。

它**本身不做实现工作**：不会 grilling、写 spec 或修 bug，只负责定向。它尤其帮助你记住那些只能由用户显式调用的 skills，也会指向 `/tdd`、`/diagnosing-bugs`、`/prototype`、`/code-review`、`/domain-modeling` 和 `/codebase-design` 等 model-invoked skills。

## 何时使用

当你不确定该用哪个 skill、从哪里开始或下一步做什么时，输入 `/ask-matt`。它会把你放到正确 flow 的正确位置，而不是只丢给你一个孤立工具。

## Flow，而不只是 skill

多数工作走 main flow：

```txt
idea → grill-with-docs → to-spec → to-tickets → implement → code-review
```

Incoming bugs/requests 通过 `triage` 汇入；巨大而模糊、单个 session 装不下的 effort 先通过 `wayfinder` 绘制 investigation map；codebase health 工作则由 `improve-codebase-architecture` 发现机会。`handoff` 用于跨 context window，`prototype`、`research`、`teach` 等可以独立调用。

## 工作正常的表现

- 先识别你的 starting situation，再给出完整 flow。
- 明确哪些步骤必须 user-invoked，哪些可以由 model 自动触达。
- 不会假装执行其他 skill 的职责，而是把你交给真正负责的 skill。
