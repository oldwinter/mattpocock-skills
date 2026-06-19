---
name: prototype
description: 在 commit 前构建 throwaway prototype 来厘清 design。分成两个 branches：用于 state/business-logic questions 的 runnable terminal app，或同一路由上可切换的几个 radically different UI variations。Use when the user wants to prototype, sanity-check a data model or state machine, mock up a UI, explore design options, or says "prototype this", "let me play with it", "try a few designs".
---

# Prototype

Prototype 是**用来回答问题的 throwaway code**。问题决定形状。

## Pick a branch

识别正在回答的问题：从用户 prompt、surrounding code，或在用户在线时询问：

- **“Does this logic / state model feel right?”** → [LOGIC.zh.md](LOGIC.zh.md)。构建一个 tiny interactive terminal app，让 state machine 经过那些纸上难以推理的 cases。
- **“What should this look like?”** → [UI.zh.md](UI.zh.md)。在 single route 上生成几个 radically different UI variations，通过 URL search param 和 floating bottom bar 切换。

两个 branches 会产出非常不同的 artifacts；选错会浪费整个 prototype。如果问题真的 ambiguous 且用户 unreachable，默认选择更匹配 surrounding code 的 branch（backend module → logic；page/component → UI），并在 prototype 顶部说明 assumption。

## Rules that apply to both

1. **从 day one 就是 throwaway，并明确标记。** 将 prototype code 放在接近实际会使用它的位置（靠近被 prototyping 的 module 或 page），这样 context 清楚；但命名要让 casual reader 看出它是 prototype，不是 production。Throwaway UI routes 要遵守项目现有 routing convention，不要发明新的 top-level structure。
2. **One command to run.** 使用项目 existing task runner 支持的方式：`pnpm <name>`、`python <path>`、`bun <path>` 等。用户必须不费脑就能启动它。
3. **No persistence by default.** State 保存在 memory。Persistence 是 prototype 要 checking 的东西，而不是 prototype 应依赖的东西。如果问题明确涉及 database，就使用 scratch DB 或带清晰 “PROTOTYPE — wipe me” 名称的 local file。
4. **Skip the polish.** 没有 tests，没有超出 runnable 所需的 error handling，没有 abstractions。重点是快速 learn，然后 delete。
5. **Surface the state.** 每次 action 后（logic）或每次 variant switch 时（UI），print 或 render 完整相关 state，让用户看到发生了什么变化。
6. **Delete or absorb when done.** Prototype 回答问题后，删除它，或把 validated decision fold 进 real code；不要让它在 repo 里腐烂。

## When done

Prototype 中唯一值得保留的是 _answer_。将它和它回答的问题一起捕获到 durable place（commit message、ADR、issue，或 prototype 旁边的 `NOTES.md`）。如果用户在线，这个 capture 可以是一段 quick conversation；如果不在线，留下 placeholder，让他们（或下一轮的你）在删除 prototype 前填入 verdict。
