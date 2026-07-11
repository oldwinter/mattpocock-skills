# Writing docs pages

`engineering/` 和 `productivity/` 下的每个 skill，都有一页面向人的 docs：`docs/<bucket>/<skill-name>.md`。docs tree 镜像 `skills/` 下这两个 bucket。发布地址是 `https://aihero.dev/skills-<skill-name>`；URL 总是 `skills-<skill-name>`，与 bucket 无关，所以 docs 路径只是 repo 组织方式。页面不是 skill，也不是 `SKILL.md` 的拷贝。只有这两个 bucket 会被推广；其余 bucket（`misc/`、`personal/`、`in-progress/`、`deprecated/`）不发布 docs 页面。

多数 skills 是 **user-invoked**：agent 不会替你自动触发它们，所以记住它们何时存在、何时该用的是 *你*。这种记忆就是 **cognitive load**。docs 页面的职责是降低它：围绕一个 skill 为一个读者定向，让他们能把它装进脑中，知道何时触达它，并看清它在系统中的位置。所有页面共同构成一个分布式 router；每页都是一个节点。

只要 promoted skill 被添加、重命名或行为改变，就创建或重新同步它的 docs 页面。重命名也要移动文件（`docs/<bucket>/<old>.md` -> `docs/<bucket>/<new>.md`），因为发布 URL 跟随名称；skill 在 `engineering/` 和 `productivity/` 之间移动时，也要移动到匹配的 docs 文件夹。`misc/`、`personal/`、`in-progress/` 和 `deprecated/` 中的 skills 没有页面；移入 `engineering/` 或 `productivity/` 时才新增页面，移出时删除页面。

这些页面发布在 `aihero.dev` 上，所以 **每个链接都必须是绝对链接**。指向另一个 skill 的链接写 `https://aihero.dev/skills-<name>`；指向 repo 的链接写完整 `https://github.com/mattpocock/skills/...`。能在 repo 中工作的相对链接发布后会失效。

页面没有 H1；发布页会从 slug 取标题。

## Page structure

使用下面的模板。**固定框架**（Quickstart block、source link、`## What it does`、`## When to reach for it`、`## Where it fits`）每页都有。**可调整中段**，也就是 `## Prerequisites` 和自由内容 sections，只保留这个 skill 真正需要的内容。

<page-template>

Quickstart:

```bash
npx skills add mattpocock/skills --skill=<name>
```

```bash
npx skills update <name>
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/<bucket>/<name>)

## What it does

一到两段普通语言说明。先写这个 skill 的一句话职责，再写它的 **defining constraint**，也就是让它不同于默认做法的那个事实。用普通陈述句，不要写成 “The defining constraint:” 或 “The key thing:” 这样的标签；这种公式读起来像填充物。这一行是页面上最有价值的内容，不能省略。

## When to reach for it

如何、何时触达这个 skill，通常包含两个点：

- **Invocation mode.** 说明是你输入它，还是 agent 会自动触达它。user-invoked skill: “You invoke this by typing `/<name>` - the agent won't reach for it on its own.” model-invoked skill: “Type `/<name>`, or the agent reaches for it automatically when a task fits.”
- **Trigger boundary.** 索引入口：“reach for this when ...”。如果它容易和 sibling 混淆，补上另一半：“for <X> instead, use [<sibling>](https://aihero.dev/skills-<sibling>).”

## Prerequisites

可选。只有 skill 需要某些东西已经就位时才包含，否则整个 heading 删除。包括：它会写入的 **workspace**（例如 `grill-with-docs` 写 `CONTEXT.md` 和 ADRs；`teach` 会构建整个目录）、**prior setup**（`triage`/`to-spec`/`to-tickets` 需要 `setup-matt-pocock-skills` 配置 issue tracker）、或 **repo-specific tooling**。无状态、到处可跑的 skill 没有 prerequisites。

## <free-form middle>

一到三个短 section，用这个 skill 自己的 vocabulary 让它变清楚。heading 随 skill 而定：它运行的 loop、产出的 artifact、它制造的 fork、它消灭的 anti-pattern。没有固定 heading；这些 skills 差异太大。

唯一硬性要求：浮现这个 skill 的 leading word / defining idea，比如 `tight` feedback loop、`deep module`、throwaway-code-answers-a-question、red-green。它有双重收益：读者知道这个 skill 是什么，也学会以后用哪个词想到它。

## It's working if

可选。列出短小、可检查的信号，说明读者如何看出 skill 正在正常工作。只有 skill 有清晰信号时才加；信号模糊时不要加 heading。几条 bullets 即可。

## Where it fits

总是存在。用一两句话说明它在系统中的位置：

- **Role.** 说清角色：**chain step**（`grill-with-docs -> to-spec -> to-tickets -> implement -> code-review`）、**run-once setup**（`setup-matt-pocock-skills`）、**periodic maintenance**（`improve-codebase-architecture`，“every few days”）、或 **reach-for-it-anytime standalone**（`diagnosing-bugs`、`prototype`、`handoff`）。standalone 的 map 用一句诚实的话即可，远胜过省略。
- **Neighbours.** 一两个重要 sibling，各自带 because clause，并使用绝对链接。
- **The map.** 指向 [ask-matt](https://aihero.dev/skills-ask-matt)，它是整套系统的 router，这样本页保持为一个节点，不必重画全图。

</page-template>

## Conventions

- 解释 **why**，不是复述 process。页面用于定位和放置 skill，不要复制 `SKILL.md` 步骤或模板 dump；人类选择工具时不需要 runbook。
- 使用 skill 的 **leading words**（_seam_、_deep module_、_tracer bullet_），让页面和 skill 说同一种语言。
- 让页面自身保持 low-load。它是关于低认知负荷 skills 的文档；多余家具（无用 headings、重复链接）正是它要反对的东西。

## Done when

- 页面存在于 `docs/<bucket>/<name>.md`，且 rename 或 bucket move 后没有 stale page。
- Quickstart block 和 source link 指向正确 bucket 和 skill；update line 使用正确 skill 名。
- `## What it does` 用普通 prose 说明 defining constraint，而不是标签式 aside。
- `## When to reach for it` 说明 invocation mode 和 trigger boundary。
- `## Where it fits` 说明 role，并链接到 `ask-matt`。
- 如果有 workspace、prior setup 或 tooling prerequisite，就说明它；如果没有，则不出现该 section。
- 中段浮现 leading word。
- 每个链接都是绝对链接，且都能解析。
