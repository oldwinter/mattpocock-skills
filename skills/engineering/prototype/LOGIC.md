# Logic Prototype

一个 tiny interactive terminal app，让用户手动 drive state model。当问题关于 **business logic、state transitions 或 data shape** 时使用：这些东西纸上看起来合理，但只有推过 real cases 才会感觉哪里不对。

## When this is the right shape

- “I'm not sure if this state machine handles the edge case where X then Y.”
- “Does this data model actually let me represent the case where...”
- “I want to feel out what the API should look like before writing it.”
- 任何用户想要**按按钮并观察 state change** 的场景。

如果问题是 “what should this look like”，那就是 wrong branch。使用 [UI.zh.md](UI.zh.md)。

## Process

### 1. State the question

写 code 前，写下你正在 prototyping 什么 state model，以及要回答什么 question。用一段话，放在 prototype 的 README 或 file 顶部 comment。回答 wrong question 的 logic prototype 是纯浪费；把 question explicit，方便之后检查，无论用户现在正在看，还是 AFK 后回来。

### 2. Pick the language

使用 host project 已经使用的 language。如果项目没有 obvious runtime（例如 docs repo），就询问。

匹配项目 existing tooling conventions；不要为了 prototype 添加新的 package manager 或 runtime。

### 3. Isolate the logic in a portable module

将实际 logic，也就是回答 question 的那部分，放在一个 small、pure interface 后面，使其之后能被 lift out 并 drop into real codebase。围绕它的 TUI 是 throwaway；logic module 不应是。

正确 shape 取决于问题：

- **A pure reducer** — `(state, action) => state`。适合 actions 是 discrete events 且 state 是 single value 的情况。
- **A state machine** — explicit states and transitions。适合 “which actions are even legal right now” 本身就是问题的一部分。
- **A small set of pure functions** over a plain data type。适合没有 implicit current state、只有 transformations 的情况。
- **A class or module with a clear method surface**，当 logic 确实 owns ongoing internal state 时。

选择最适合正在被问的问题的 shape，*不是*最容易 wire 到 TUI 的 shape。保持 pure：无 I/O、无 terminal code、无用于 control flow 的 `console.log`。TUI imports it and calls into it；不要反向流动。

这会让 prototype 在自身生命周期之后仍然有用：当 question 被回答后，validated reducer / machine / function set 可以独立 lift 到 real module。

### 4. Build the smallest TUI that exposes the state

把它做成 **lightweight TUI**：每个 tick clear screen（`console.clear()` / `print("\033[2J\033[H")` / equivalent），然后 re-render 整个 frame。用户应该总是看到一个 stable view，而不是不断增长的 scrollback。

每个 frame 有两部分，按此顺序：

1. **Current state**，pretty-printed 且 diff-friendly（每行一个 field，或 formatted JSON）。用 **bold** 标 field names 或 section headers，用 **dim** 标较不重要的 context（timestamps、IDs、derived values）。Native ANSI escape codes 可以：`\x1b[1m` bold，`\x1b[2m` dim，`\x1b[0m` reset。除非项目已有 styling library，否则无需引入。
2. **Keyboard shortcuts**，列在底部：`[a] add user  [d] delete user  [t] tick clock  [q] quit`。Bold key、dim description，或反过来；以清晰为准。

Behaviour：

1. **Initialise state** — 单个 in-memory object/struct。启动时 render first frame。
2. 一次 **Read one keystroke（或 one line）**，dispatch 给会 mutate state 的 handler。
3. 每次 action 后 **Re-render** full frame；不要 append，replace。
4. Loop until quit。

整个 frame 应 fit on one screen。

### 5. Make it runnable in one command

给项目 existing task runner 添加 script（`package.json` scripts、`Makefile`、`justfile`、`pyproject.toml`）。用户应该运行 `pnpm run <prototype-name>` 或 equivalent，而不是记住 path。

如果 host project 没有 task runner，就把 command 放在 prototype README 顶部。

### 6. Hand it over

给用户 run command。他们会自己 drive；有意思的时刻通常是他们说 “wait, that shouldn't be possible” 或 “huh, I assumed X would be different”。这些是 _idea_ 里的 bugs，也正是 prototype 的意义。如果他们想加 new actions，就添加。Prototypes evolve。

### 7. Capture the answer and the prototype

Prototype 回答 question 后，先记录 answer，再按 [SKILL](SKILL.md) 中的方式保存 prototype。Logic branch 的映射是：validated reducer / machine / function set 被 lift 到 real module，成为吸收进 production 的 decision；TUI shell 则随完整 prototype 一起进入保存 primary source 的 throwaway branch。

## Anti-patterns

- **Don't add tests.** 需要 tests 的 prototype 就不再是 prototype。
- **Don't wire it to the real database.** 除非问题 specifically about persistence，否则使用 in-memory store。
- **Don't generalise.** 不要 “what if we wanted to support X later”。Prototype 回答一个问题。
- **Don't blur the logic and the TUI together.** 如果 reducer / state machine 引用了 `console.log`、prompts 或 terminal escape codes，它就不再 portable。保持 TUI 是 pure module 外的一层 thin shell。
- **Don't ship the TUI shell into production.** Shell 针对 terminal 手动驱动而 optimized。它后面的 logic module 才是值得保留的部分。
