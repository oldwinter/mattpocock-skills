# Logic Prototype

用一个完全 self-contained 的 HTML file，也就是可分享的 **demo**，让任何人都能通过点击 buttons 来 drive state model。当问题涉及 **business logic、state transitions 或 data shape** 时使用：这类设计在纸上看似合理，只有推过 real cases 才会暴露不对劲的地方。

因为它只有一个 file、无需安装，所以可以直接交给 non-developer，例如 designer、PM 或 domain expert，让他们亲自体验 model。页面必须使用他们的 domain language，而不是 code vocabulary。

## When this is the right shape

- “I'm not sure if this state machine handles the edge case where X then Y.”
- “Does this data model actually let me represent the case where...”
- “I want to feel out what the API should look like before writing it.”
- 任何人想要**按按钮并观察 state change** 的场景。

如果问题是 “what should this look like”，那就是 wrong branch。使用 [UI.md](UI.md)。

## Process

### 1. State the question

写 code 前，先写下正在 prototyping 的 state model 和要回答的 question。用一个 paragraph 放在 demo 顶部，作为 visible intro，而不只是 comment。回答 wrong question 的 logic prototype 是纯浪费；把 question explicit，之后无论用户正在旁边还是 AFK 回来，都能检查它。

### 2. Isolate the logic in a portable module

把真正回答 question 的 logic 放进单个 `<script>` block，写成 small、pure module，之后可以 lift out 并放入 real codebase。外围 page 是 throwaway；这个 module 不是。

正确 shape 取决于问题：

- **A pure reducer** — `(state, action) => state`。适合 actions 是 discrete events、state 是 single value 的情况。
- **A state machine** — explicit states and transitions。适合 “哪些 actions 当前合法” 本身就是问题一部分的情况。
- **A small set of pure functions** over a plain data type。适合没有 implicit current state、只有 transformations 的情况。
- **A class or module with a clear method surface**，适合 logic 确实 owns ongoing internal state 的情况。

选择最适合 question 的 shape，而不是最容易 wire 到 page 的 shape。保持 pure：不要接触 DOM 或 `document`，button handlers 也不能伸入 internals。Page 调用 module，不能反向依赖。这样 question 得到回答后，validated reducer、machine 或 function set 才能直接 lift 到 real module。

### 3. Build the shareable HTML file

只用一个 file，plain HTML/CSS/JS；不要 framework、bundler 或 server，所有内容 inline，确保双击即可打开，也能通过 email 分享。任何人都应该只需打开它就能运行。

面向 non-developer 编写。所有 labels 使用 **domain language**，而不是 code：buttons 和 state 应该读起来像业务，而不是 reducer。用 plain words 解释正在发生什么。

从上到下建立清晰 hierarchy：

1. **Title 与 one-line explanation** — 说明 demo 可以探索什么，也就是步骤 1 的 question。
2. **Current state** — 以 readable panel 展示所有 relevant state，用 labeled fields 而不是 raw JSON dump；每次 click 后 re-render，让 change 可见。必要时明确指出刚刚改变了什么。
3. **Free-play buttons** — 每个 action 一个 button，始终可用，让任何人都能按任意顺序探索 model。每次 click dispatch action 并 re-render state。
4. **Guided walkthroughs** — 每个 scenario 一个 tab。每个 tab 包含简短的 plain-language description，说明它建立的情境和需要关注的内容；下方按顺序给出这个 scenario 要点击的 **buttons**。每一步都是实际 button：点击后执行 action 并前进到下一步。开始 walkthrough 时 reset 到 known initial state，确保 scenario 每次都以相同方式运行。

选择能展示 awkward cases 的 scenarios：happy path、棘手 edge case，以及一次本应 illegal 的尝试。这些正是纸上最难推理的部分。

视觉要精致但克制：清晰 typography、充足 spacing、一个 accent colour。不要 animations 或 gimmicks，避免它们与 state 和 buttons 争夺注意力。

### 4. Hand it over

把 file 发给用户，或直接替他们打开。他们可以依次点击 walkthroughs，也可以自由探索；最有价值的反馈通常是 “wait, that shouldn't be possible” 或 “huh, I assumed X would be different”。这些是 _idea_ 中的 bugs，正是 prototype 要发现的内容。如果需要新 action 或 scenario，就继续添加。Prototypes evolve。

### 5. Capture the answer and the prototype

Prototype 回答 question 后，先记录 answer，再按 [SKILL](SKILL.md) 的说明保存 prototype。Logic branch 的映射是：validated reducer、machine 或 function set 被 lift 到 real module，成为吸收进 production 的 decision；HTML shell 则随完整 prototype 进入保存 primary source 的 throwaway branch。由于它是一个 self-contained file，之后仍能轻松重新运行。

## Anti-patterns

- **Don't add tests.** 需要 tests 的 prototype 就不再是 prototype。
- **Don't wire it to the real database.** 除非 question 明确涉及 persistence，否则使用 in-memory state。
- **Don't generalise.** 不要考虑 “what if we wanted to support X later”。Prototype 只回答一个 question。
- **Don't blur the logic and the page together.** 如果 pure module 引用了 DOM、`document` 或 button handlers，它就无法 lift。保持 page 是 pure module 外的一层 thin shell。
- **Don't reach for a framework, bundler, or server.** Recipient 应该双击一个 file；React app 或 dev server 会破坏 shareable 这一约束。
- **Don't ship the HTML shell into production.** Page 是为手动点击探索而 optimized；后面的 logic module 才是值得保留的部分。
