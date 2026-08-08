## What it does

`to-questionnaire` 把用户无法独自回答的 decision 转成 Markdown questionnaire，交给掌握缺失知识的人异步填写，或在 meeting 中共同完成。

它 grill 的是这次 **send**，不是 subject：recipient 是谁、掌握什么，以及用户必须从对方拿回哪些 decisions/facts。Questionnaire 中的问题只针对这两者之间的 knowledge gap。

## When to reach for it

输入 `/to-questionnaire`；agent 不会自行调用。适用于 blocker 位于另一个人的知识中，而不是当前 conversation、codebase 或可查询的 docs 中。

| 情况 | 使用什么 |
| --- | --- |
| 需要 stakeholder/domain expert 提供未知 facts 或 decisions | `to-questionnaire` |
| 需要 stress-test 你自己已经掌握的 idea | [grill-me](https://aihero.dev/skills-grill-me) |
| Facts 可以从 repo 或文档查到 | 直接 research，不要把查找工作推给 recipient |

## The send

第一轮确定 recipient 的 role、expertise 与和用户的关系；第二轮列出必须从对方获得的 concrete decisions/facts。随后写入当前 directory 的 `to-questionnaire-<slug>.md`。

Document 按重要性排序，包含 purpose、sender/recipient、background、answer guidance、按 theme 分组的问题，以及最后的 catch-all。每个问题只表达一个 idea，并留 answer stub；只有可能被误解或得到敷衍回答时才解释“为什么重要”。

## It's working if

- 用户在需求阶段点名的每一项都有对应 question。
- Recipient 无需了解原 conversation 也能给出 useful answer。
- Questions 面向 recipient 的 knowledge gap，而不是继续 interview 用户。
- 输出是可直接发送和填写的 Markdown file。

## Common questions

**它会读取此前 grilling session，并自动提取 questions 吗？**

没有独立 ingest phase。它先询问 send，再起草。之所以能承接 grilling，是因为你应在 **同一 conversation** 运行，让 [session](https://www.aihero.dev/ai-coding-dictionary/session) 已存在于 [context](https://www.aihero.dev/ai-coding-dictionary/context)。Fresh session 不知道此前内容，只能靠你重新提供。

**缺失 answers 分散在不同 people 手里，能按 recipient 拆分吗？**

不能。第一步只接受一个 recipient，整份 document 的 tone 与 context 都为该人设计。三个 recipients 应运行三次；单份 questionnaire 按 discipline 自动路由 questions 仍未 shipped。

**Questions 会按前面 answers 做条件跳转吗？**

不会。输出是 static document：按 theme 分组、重要性排序、所有问题都 active。Dependent-question design 曾探索但未发布，因为真实答案出现前，model 很难可靠预先规划多层 branches。

**Recipient 也不知道答案怎么办？**

Document 会明确允许 “I don't know” 与 partial answers。标记 uncertainty 比猜测更有价值，因为 vague answer 与 confidently wrong answer 回到你的 context 后很难区分。

**它会发送到 Slack、Issue tracker 或 email 吗？**

不会。它只在当前 directory 写 Markdown file 并返回 path。Delivery 由你完成：贴进 [ticket](https://www.aihero.dev/ai-coding-dictionary/ticket)、Slack thread、email，或在 shared screen 上共同填写。

**这不就是 batch mode 的 `/grill-me` 吗？**

不是。`grill-me` 本身已按 rounds 提问；区别不在 delivery cadence，而在答案位于谁的脑中。自己能回答就使用 `grill-me`，需要从别人那里获得就用本 skill。

**不用 skill，直接让 agent 写 questionnaire 不行吗？**

可以。Skill 的价值只有两点：interview 不会漂移到 subject 本身，以及 document 会保持 non-technical recipient 可直接填写的形状。团队已有成熟 house format 时，可以不使用它。

## Where it fits

`to-questionnaire` 是 user-invoked standalone。返回的 answers 通常进入 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 或 [to-spec](https://aihero.dev/skills-to-spec)；不确定入口时由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
