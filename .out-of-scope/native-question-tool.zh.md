# 通过 harness 原生 question tool 进行 grilling

Grilling sessions（`/grilling`、`/grill-me`、`/grill-with-docs`，以及其他 skills 内的 grilling）以普通 chat text 提问。要求把它们改为 harness 内建 question UI（Claude Code 的 `AskUserQuestion`、宿主 “question tool”、结构化或批量问卷模式）的 requests 不在范围内。

## 为什么不在范围内

这些 skills 是与 harness 无关的 text。它们运行在 Claude Code、Codex、Copilot、Cursor，以及 skills.sh 能安装到的其他环境中，而每个 harness 的 question tool 各不相同，有些根本没有。在 skill 中指定某个 harness 的 tool，意味着每个 grilling skill 都要带 harness-specific branch，或者 skill 只能在一个地方正确运行。

Question UI 也会改变 grilling 本身。结构化 picker 会把 model 推向带预设答案的 multiple-choice questions，这与 grilling 的目的相反：grilling 要问开放式问题，由用户用自己的话回答，每次处理 decision tree 的一个 branch。我试过 `AskUserQuestion` UI，不希望把这些 skills 改成那样。

如果你偏好所在 harness 的 question tool，可以在自己的 `CLAUDE.md` / `AGENTS.md` 中写明（“when grilling, ask via AskUserQuestion”）。这是一行 per-user preference，不需要共享 skill 知道它。

## 此前的 requests

- #19：“grill-me: not always using the question tool”
- #643：“Proposal: Use AskQuestion for structured input during grilling sessions”
- #840：“Use host's question tool for grilling sessions”
- #1107：“Grilling doesn't use Agent's native QA tool OOTB”
- #1152：“Proposal: experimental HTML questionnaire mode for batch grilling”
