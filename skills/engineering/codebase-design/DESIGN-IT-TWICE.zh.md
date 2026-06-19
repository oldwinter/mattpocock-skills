# Interface Design

当用户想为某个 chosen deepening candidate 探索 alternative interfaces 时，使用这个 parallel sub-agent pattern。基于 “Design It Twice”（Ousterhout）：你的第一个想法不太可能是最好的。

使用 `/codebase-design` 中的 vocabulary：**module**、**interface**、**seam**、**adapter**、**leverage**。

## Process

### 1. Frame the problem space

Spawn sub-agents 前，先为 chosen candidate 写一段 user-facing explanation，说明 problem space：

- 任何 new interface 需要满足的 constraints
- 它会依赖哪些 dependencies，以及它们属于哪个 category（见 [DEEPENING.zh.md](DEEPENING.zh.md)）
- 一个 rough illustrative code sketch，用来 ground constraints；不是 proposal，只是让 constraints concrete

把这展示给用户，然后立即进入 Step 2。用户可以在 sub-agents parallel 工作时阅读和思考。

### 2. Spawn sub-agents

使用 Agent tool parallel spawn 3+ sub-agents。每个 sub-agent 必须为 deepened module 产出一个 **radically different** interface。

用独立 technical brief prompt 每个 sub-agent（file paths、coupling details、[DEEPENING.zh.md](DEEPENING.zh.md) 中的 dependency category、seam 后面放什么）。Brief 与 Step 1 中的 user-facing problem-space explanation 相互 independent。给每个 agent 一个不同 design constraint：

- Agent 1: “Minimize the interface — aim for 1–3 entry points max. Maximise leverage per entry point.”
- Agent 2: “Maximise flexibility — support many use cases and extension.”
- Agent 3: “Optimise for the most common caller — make the default case trivial.”
- Agent 4（if applicable）: “Design around ports & adapters for cross-seam dependencies.”

Brief 中同时包含 `/codebase-design` vocabulary 和 CONTEXT.md vocabulary，让每个 sub-agent 用 architecture language 和项目 domain language consistently 命名。

每个 sub-agent 输出：

1. Interface（types、methods、params，以及 invariants、ordering、error modes）
2. Usage example，展示 callers 如何使用
3. Implementation 在 seam 后面隐藏了什么
4. Dependency strategy 和 adapters（见 [DEEPENING.zh.md](DEEPENING.zh.md)）
5. Trade-offs：哪里 leverage high，哪里 thin

### 3. Present and compare

Sequentially 展示 designs，让用户能吸收每个 design，然后用 prose 比较它们。按 **depth**（interface 上的 leverage）、**locality**（change 集中在哪里）和 **seam placement** 进行 contrast。

比较后给出你自己的 recommendation：你认为哪个 design 最强，以及 why。如果不同 designs 的 elements 可以很好结合，提出 hybrid。Be opinionated；用户要的是 strong read，不是 menu。
