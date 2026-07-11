---
name: prototype
description: 构建 throwaway prototype 来回答 design question。当用户想 sanity-check state model 或 logic 是否合理，或探索 UI 应该长什么样时使用。
---

# Prototype

Prototype 是**用来回答问题的 throwaway code**。问题决定形状。

## Pick a branch

识别正在回答的问题：从用户 prompt、surrounding code，或在用户在线时询问：

- **“Does this logic / state model feel right?”** → [LOGIC.md](LOGIC.md)。构建一个 tiny interactive terminal app，让 state machine 经过那些纸上难以推理的 cases。
- **“What should this look like?”** → [UI.md](UI.md)。在 single route 上生成几个 radically different UI variations，通过 URL search param 和 floating bottom bar 切换。

两个 branches 会产出非常不同的 artifacts；选错会浪费整个 prototype。如果问题真的 ambiguous 且用户 unreachable，默认选择更匹配 surrounding code 的 branch（backend module → logic；page/component → UI），并在 prototype 顶部说明 assumption。

## Rules that apply to both

1. **从 day one 就是 throwaway，并明确标记。** 将 prototype code 放在接近实际会使用它的位置（靠近被 prototyping 的 module 或 page），这样 context 清楚；但命名要让 casual reader 看出它是 prototype，不是 production。Throwaway UI routes 要遵守项目现有 routing convention，不要发明新的 top-level structure。
2. **One command to run.** 使用项目 existing task runner 支持的方式：`pnpm <name>`、`python <path>`、`bun <path>` 等。用户必须不费脑就能启动它。
3. **No persistence by default.** State 保存在 memory。Persistence 是 prototype 要 checking 的东西，而不是 prototype 应依赖的东西。如果问题明确涉及 database，就使用 scratch DB 或带清晰 “PROTOTYPE — wipe me” 名称的 local file。
4. **Skip the polish.** 没有 tests，没有超出 runnable 所需的 error handling，没有 abstractions。重点是快速 learn。
5. **Surface the state.** 每次 action 后（logic）或每次 variant switch 时（UI），print 或 render 完整相关 state，让用户看到发生了什么变化。
6. **Capture it when done.** 把 validated decision fold 进 real code，然后把 prototype 本身作为 **primary source** 保存：提交到 main 之外的 throwaway branch，并在 implementation issue 中留下指向该 branch 的 context pointer。还要在 issue 或 commit 中记录 answer，也就是 verdict 以及它解决的 question。Main branch 只保留 validated decision。
