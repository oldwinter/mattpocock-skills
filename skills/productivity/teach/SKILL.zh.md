---
name: teach
description: 在此 workspace 内教用户一个新 skill 或 concept。
disable-model-invocation: true
argument-hint: "你想学习什么？"
---

用户要求你教他们某个东西。这是 stateful request：他们打算用多个 sessions 学习这个 topic。

## Teaching Workspace

将 current directory 视为 teaching workspace。他们的 learning state 捕获在此 directory 的几个 files 中：

- `MISSION.md`：捕获用户对 topic 感兴趣的 _reason_。所有 teaching 都应以它为 grounding。使用 [MISSION-FORMAT.zh.md](./MISSION-FORMAT.md) 中的格式。
- `./reference/*.html`：reference materials directory。这些是 lessons 压缩出来的 learnings：cheat sheets、reference algorithms、syntax、yoga poses、glossaries。它们是 raw units of learning。它们应是 beautiful documents，print out well，并为 quick reference 而设计。
- `RESOURCES.md`：可探索的 resources list，用来将 teaching grounding 到 contextual knowledge，或获取 knowledge 和 wisdom。使用 [RESOURCES-FORMAT.zh.md](./RESOURCES-FORMAT.md) 中的格式。
- `./learning-records/*.md`：learning records directory，捕获用户已经学到的内容。它们大致等同于 software development 中的 architectural decision records：记录 non-obvious lessons 和 key insights，这些内容可能之后需要 revise，或 drive future sessions。它们应被用来计算 zone of proximal development。标题为 `0001-<dash-case-name>.md`，number 每次递增。使用 [LEARNING-RECORD-FORMAT.zh.md](./LEARNING-RECORD-FORMAT.md) 中的格式。
- `./lessons/*.html`：lessons directory。**Lesson** 是一个 single、self-contained HTML output，教授一个 tied to mission 的 tightly-scoped thing。这是此 workspace 的 primary unit of teaching。
- `./assets/*`：跨 lessons 共享的 reusable **components**。见 [Assets](#assets)。
- `NOTES.md`：scratchpad，用来 jot down user preferences 或 working notes。

## Philosophy

要进行 deep level learning，用户需要三样东西：

- **Knowledge**，来自 high-quality、high-trust resources
- **Skills**，通过你根据 knowledge 设计的 highly-relevant interactive lessons 获得
- **Wisdom**，来自与其他 learners 和 practitioners 的互动

在 `RESOURCES.md` 尚未 well-populated 前，你的重点应是寻找能帮助用户 acquire knowledge 的 high-quality resources。永远不要 trust your parametric knowledge。

有些 topics 可能 skills 多于 knowledge。Theoretical physics 可能更 knowledge-based；yoga 可能更 skills-based。

### Fluency vs Storage Strength

你应该小心区分两类 learning：

- **Fluency strength**：in-the-moment retrieval of knowledge
- **Storage strength**：long-term retention of knowledge

Fluency 会给用户一种 mastery 的 illusion，但 storage strength 才是真正目标。尝试用 desirable difficulty 设计能建立 long-term retention 的 lessons：

- 使用 retrieval practice（从 memory recall）
- Spacing（分散 practice）
- Interleaving（在 practice 中混合不同但相关的 topics，仅用于 skills practice）

## Lessons

Lesson 是你产出的主要内容，也就是 knowledge 和 skills 到达用户的 unit。每个 lesson 都是一个 self-contained HTML file，保存到 `./lessons/`，标题为 `0001-<dash-case-name>.html`，number 每次递增。

Lesson 应该 **beautiful**：clean、readable typography and layout，因为用户之后会回来 review。Think Tufte。

Lesson 应该 short，且很快 completable。Learners' working memory 很小，我们需要 stay within it。但每个 lesson 都应给用户一个 single tangible win，让他们能继续 build on。它应直接 tied to mission，并位于用户的 zone of proximal development 内。

如果可以，通过运行 CLI command 为用户打开 lesson file。

每个 lesson 都应通过 HTML anchors 链接到其他 lessons 和 reference documents。

每个 lesson 都应推荐一个 primary source 供用户阅读或观看。这应是你在该 topic 上找到的 highest-quality、highest-trust resource。

每个 lesson 都应提醒用户向 agent ask followup questions。Agent 是他们的 teacher，可以协助任何 unclear 的内容。

## Assets

Lessons 从 `./assets/` 中的 reusable **components** 构建：stylesheets、quiz widgets、simulators、diagram helpers，任何第二个 lesson 可复用的东西。

Reuse 是 default，不是 exception。Authoring lesson 之前，读取 `./assets/`，并用已有 components 构建。当 lesson 需要新的 reusable 东西时，将它写成 `./assets/` 中的 component 并 link it；永远不要 inline code that a future lesson would duplicate。

Shared stylesheet 是每个 workspace 赢得的第一个 component：每个 lesson 都 link 它，让 lessons 看起来像一致的 course，而不是一堆 one-offs。随着 workspace 增长，component library 也应增长。

## The Mission

每个 lesson 都应该 tie into mission，也就是用户想学习该 topic 的原因。

如果用户不清楚 mission，或 `MISSION.md` 尚未 populated，你的第一项工作应该是 question 用户为什么想学这个。

未能理解 mission 意味着 knowledge acquisition 不会 grounding in real-world goals。Lessons 会显得过于 abstract。你也无法判断用户下一步应该做什么。

Missions 可能随着用户 skills 和 knowledge 发展而变化。这是正常的；确保更新 `MISSION.md`，并添加 learning record 来捕获这个 change。改变 mission 前先与用户 confirm。

## Zone Of Proximal Development

每个 lesson 中，用户都应始终感觉自己正被 “just enough” 地 challenge。

用户可能指定自己想学的 exact thing。如果没有，通过以下方式找出他们的 zone of proximal development：

- 读取他们的 `learning-records`
- 基于 mission 找出合适的 teaching target
- 教最 relevant 且 fits their zone of proximal development 的内容

## Knowledge

Lessons 应围绕用户将要学习的一项 skill 设计。Lesson 中的 knowledge 应只包含 acquire that skill 所必需的内容。你先教 knowledge，再通过 interactive feedback loop 让用户 practice skills。

Knowledge 应先从 trusted resources gather。使用 `RESOURCES.md` 追踪它们。Lessons 应布满 citations：链接到 external resources，为每个 claim 提供依据。这会提升 lesson 的 trustworthiness。

对 acquiring knowledge 来说，difficulty 是 enemy。它会吃掉理解所需的 working memory。

## Skills

如果 knowledge 是 acquisition，skills 就是 durability 和 flexibility。Make the knowledge stick。

对 skill acquisition 来说，difficulty 是 tool。Effortful retrieval 会建立 storage strength。Skills 应通过 interactive lessons 教授。你可使用几种 tools：

- Interactive lessons，包含 quizzes 和 light in-browser tasks
- Lessons，引导用户完成 real-world steps list（例如 yoga poses）

这些都应基于 **feedback loop**，让用户收到 performance feedback。这个 feedback loop 应尽可能 tight，立即给出 feedback，理想情况下自动给出。

对 quizzes，每个 answer 都应有完全相同的 word count（如果可以，characters 也相同）。不要通过 formatting 给用户任何 answer clues。

## Acquiring Wisdom

Wisdom 来自真实 real-world interaction：在 learning environment 之外测试 skills。

当用户的问题似乎需要 wisdom，你的 default posture 应是尝试回答，但最终 delegate 给一个 **community**。

Community 是一个用户可以在 real world 中测试 skills 的地方（online 或 offline）。可能是 forum、subreddit、real-world class（budget permitting）或 local interest group。

你应尝试寻找 high-reputation communities 供用户加入。如果用户表达不想加入 community 的偏好，respect it。

## Reference Documents

创建 lessons 时，你也应创建 reference documents。Lessons 可以 reference 这些 documents；它们有助于追踪跨 lessons 有用的 raw units of knowledge。

Lessons 之后很少会被 revisited；reference documents 会。它们应是 lesson 的 compressed essence，采用为 quick reference 而设计的 format。

有些 learning topics 很适合 reference：

- Programming 的 syntax 和 code snippets
- Processes 的 algorithms 和 flowcharts
- Yoga 的 poses 和 sequences
- Fitness 的 exercises 和 routines
- 任何拥有自身 nomenclature 的 topic 的 glossaries

Glossaries 尤其是 essential reference。一旦创建，就应在每个 lesson 中 adhere to it。

## `NOTES.md`

用户有时会表达他们希望如何被教学的 preferences，或你应 keep in mind 的东西。这里就是记录这些 preferences 的地方，方便你在 designing lessons 或 working with the user 时 refer back。
