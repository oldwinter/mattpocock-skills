# Writing docs pages

`engineering/` 和 `productivity/` 下的每个 skill，都有一页面向人的 docs：`docs/<bucket>/<skill-name>.md`。docs tree 镜像 `skills/` 下这两个 bucket。发布地址是 `https://aihero.dev/skills-<skill-name>`；URL 总是 `skills-<skill-name>`，与 bucket 无关，所以 docs 路径只是 repo 组织方式。页面不是 skill，也不是 `SKILL.md` 的拷贝。只有这两个 bucket 会被推广；其余 bucket（`misc/`、`in-progress/`、`deprecated/`）不发布 docs 页面。

多数 skills 是 **user-invoked**：agent 不会替你自动触发它们，所以记住它们何时存在、何时该用的是 *你*。这种记忆就是 **cognitive load**。docs 页面的职责是降低它：围绕一个 skill 为一个读者定向，让他们能把它装进脑中，知道何时触达它，并看清它在系统中的位置。所有页面共同构成一个分布式 router；每页都是一个节点。

只要 promoted skill 被添加、重命名或行为改变，就创建或重新同步它的 docs 页面。重命名也要移动文件（`docs/<bucket>/<old>.md` -> `docs/<bucket>/<new>.md`），因为发布 URL 跟随名称；skill 在 `engineering/` 和 `productivity/` 之间移动时，也要移动到匹配的 docs 文件夹。`misc/`、`in-progress/` 和 `deprecated/` 中的 skills 没有页面；移入 `engineering/` 或 `productivity/` 时才新增页面，移出时删除页面。

这些页面发布在 `aihero.dev` 上，所以 **每个链接都必须是绝对链接**。指向另一个 skill 的链接写 `https://aihero.dev/skills-<name>`；指向 repo 的链接写完整 `https://github.com/mattpocock/skills/...`。能在 repo 中工作的相对链接发布后会失效。

页面没有 H1；发布页会从 slug 取标题。

## Page structure

按下面的顺序使用模板。**固定框架**（`## What it does`、`## When to reach for it`、`## Where it fits`）每页都有；`## Prerequisites` 和自由内容 sections 只保留这个 skill 真正需要的内容。

四个 sections 让页面真正值得阅读：`What it does`、`When to reach for it`、`Common questions`、`It's working if`。前两个帮助读者定位；后两个让页面开始回答读者的真实处境，而不只是概述 skill。后两个 section 各有下面定义的门槛；若页面两个都达不到，应视为未完成，而不是“简短完成”。

**页面不包含安装命令。** ai-hero 页面模板会在正文上方自动渲染安装组件，包括复制按钮、单 skill 命令、整套命令和更新命令。正文再写一遍会重复展示并产生漂移。安装措辞属于站点，不属于 docs 页面；需要修改时应改 ai-hero，canonical wording 见 [install block](./install-block.md)。

<page-template>

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

## Common questions

写读者真正会问的问题。每个问题使用粗体，答案放在下面，不使用子 heading。

真实出现过的问题优先于编造的问题，因此写之前先查：

- **Wiki。** 如果本机存在 `~/repos/matt/personal-wiki`，先读 `wiki/index.md` 注册表，再读 `wiki/audience/` 下与该 skill 有关的页面。Wiki 是二手来源；应引用原始 X、Discord、GitHub 或邮件线程中提问者的问题，而不是 wiki 摘要。本机没有这个目录时跳过。
- **本仓库 Issues。** 运行 `gh issue list --repo mattpocock/skills --search "<skill-name>" --state all`。同一个问题出现两次，页面就必须回答。
- **`CHANGELOG.md`。** 任何 rename、move 或行为变更都会产生“它去哪了”的问题。

资料较少时，可以补充一个读者显然会问的问题，但数量必须忠于证据。讨论充分的 skill 可以有六个，冷门 skill 可能只有一两个或完全没有。不要为了和其他页面对齐而填充无人提出的问题。

按出现频率排序，最尖锐的问题放在最前，并在事实不漂亮时直说：例如 grilling 特别久通常表示 scope 太大；让 model 自己写 skill 往往会产出冗长内容。没有值得回答的问题时，整个 heading 可以省略。

## It's working if

列出几条读者可直接观察的信号，说明 skill 是否在发挥作用。每一条都必须无需打开 `SKILL.md` 就能检查，可以来自读者自己的工作，也可以来自眼前 trace。“文档越改越短”合格；“template library 保持 byte-identical”只是内部合规检查，不合格。信号足够清晰时加入，仍然模糊时省略 heading。

## Where it fits

总是存在。用一两句话说明它在系统中的位置：

- **Role.** 说清角色：**chain step**（`grill-with-docs -> to-spec -> to-tickets -> implement -> code-review`）、**run-once setup**（`setup-matt-pocock-skills`）、**periodic maintenance**（`improve-codebase-architecture`，“every few days”）、或 **reach-for-it-anytime standalone**（`diagnosing-bugs`、`prototype`、`handoff`）。standalone 的 map 用一句诚实的话即可，远胜过省略。
- **Neighbours.** 一两个重要 sibling，各自带 because clause，并使用绝对链接。
- **The map.** 指向 [ask-matt](https://aihero.dev/skills-ask-matt)，它是整套系统的 router，这样本页保持为一个节点，不必重画全图。

</page-template>

## Conventions

- 解释 **why**，不是复述 process。页面用于定位和放置 skill，不要复制 `SKILL.md` 步骤或模板 dump；人类选择工具时不需要 runbook。
- **不要提作者。** 页面是技术文档，不是观点归属记录。`Matt says`、`Matt's own answer`、`his position is` 和作者引语都应删除。保留问题调研所得的事实，但把它写成关于 skill 的普通陈述。匿名引用真实用户问题仍然可以。
- 使用 skill 的 **leading words**（_seam_、_deep module_、_tracer bullet_），让页面和 skill 说同一种语言。
- **优先使用 [AI Coding Dictionary](https://www.aihero.dev/ai-coding-dictionary) 已定义的术语，并链接页面中第一次出现的位置。** 例如 _context window_、_subagent_、_harness_、_primary source_、_agent mode_。链接格式是 `https://www.aihero.dev/ai-coding-dictionary/<slug>`，slug 为小写并把非字母数字转换成连字符。只链接字典语义，不要链接碰巧同名的 domain model、background context 或 auth token，也不要在 heading、code span、现有链接或本仓库 skill 名中加链接。完整术语表优先读取本机 `~/repos/ai/ai-coding-dictionary/dictionary/`，不存在时查 [mattpocock/dictionary-of-ai-coding](https://github.com/mattpocock/dictionary-of-ai-coding)。
- **分支必须使用 table 或 list，不能塞在 paragraph 中。** 当页面提供多种 artifact、触发条件或 phase-boundary 选择时，读者是在扫描匹配项。短表格或列表可以让他们直接定位；段落会迫使他们读完全部内容。
- 让页面自身保持 low-load。它是关于低认知负荷 skills 的文档；多余家具（无用 headings、重复链接）正是它要反对的东西。

## Done when

- 页面存在于 `docs/<bucket>/<name>.md`，且 rename 或 bucket move 后没有 stale page。
- 页面不带 source link，也不自行写安装命令。
- `## What it does` 用普通 prose 说明 defining constraint，而不是标签式 aside。
- 页面不点名或引用作者，所有 claim 都独立成立。
- `## When to reach for it` 说明 invocation mode 和 trigger boundary。
- `## Where it fits` 说明 role，并链接到 `ask-matt`。
- 如果有 workspace、prior setup 或 tooling prerequisite，就说明它；如果没有，则不出现该 section。
- 中段浮现 leading word。
- 页面使用 AI Coding Dictionary 的标准术语，并且每个术语只在第一次出现时链接。
- 每个多分支选择都使用 table 或 list。
- 已检查 wiki、Issues 和 changelog；`## Common questions` 的数量由真实证据决定。
- 每条 `## It's working if` 都能在不打开 `SKILL.md` 的情况下检查。
- Sections 按模板顺序出现。
- 每个链接都是绝对链接，且都能解析。
