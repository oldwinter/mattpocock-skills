---
name: writing-shape
description: Writing, exploit — shape raw material into an article, paragraph by paragraph.
disable-model-invocation: true
---

<what-to-do>

用户已经传入（或将传入）一个 raw material markdown file。把它视为 input pile：可以是 tidy fragments list、unstructured prose wall 或 transcript。Format 不重要。先 end-to-end 读取它，再做其他事。

然后运行 shaping session，产出一个 separate article document。这是 **exploit**：exploring 已完成，pile 已固定；commit 到一个 structure，并 mine 这个 pile 来填充它。不要 edit raw material file；对这个 skill 来说它是 read-only。

如果用户没有说明 article 保存到哪里，询问一次并记住 path。

</what-to-do>

<supporting-info>

## The loop

1. **Read the pile.** 完整读取 input file。形成对其中内容的 sense。
2. **Establish the prerequisites.** 和用户 settle reader 进来时知道什么，也就是从一开始就 **grounded** 的 concepts。其他所有 concept 都必须先由某个 block grounded，later block 才能 lean on it。见 [Grounding](#grounding)。
3. **Draft 2–3 candidate openings.** 每个 opening 都应暗示 article 的不同 thesis 或 angle。展示全部。Force 用户选择一个，或 compose hybrid。Chosen opening 定义 article 剩余部分必须完成什么。
4. **Grow paragraph by paragraph.** Opening lands 后，问 “given this opening, what does the reader need to hear next?” 从 pile 中 pull material 回答。Next block 只能 lean on grounded concepts，并在 landed 时 ground new ones。争论 next block 的 form：paragraph、list、table、callout、quote、code block。每个 format choice 都应 deliberate and defensible。
5. **Append to the article file as you go.** 不要 batch。每个 agreed paragraph 或 block 立刻写入，让用户看到 article taking shape。
6. **Loop step 4 until the article is done.** 用户决定何时 done。

## Grounding

每个 **concept** 都必须先被 **grounded**，block 才能 lean on it：reader 要么进来时就知道它，要么在 earlier block 中遇见过它。一个 reach for ungrounded concept 的 block 会丢掉 reader。Unit 是 concept，不是 word；即使没有 jargon，block 也可能 lean on reader 缺少的 idea。Concept 有 name 时，即 **term**，grounding 它意味着把 idea 和 term 一起落地。

Concept 有两种 grounding 方式：

- **Prerequisite** — opening 前已经 grounded。Reader 自带。Start 时固定。
- **Introduced** — block 建立它，从那以后它对 article 剩余部分都是 grounded。

维护一个 running list，记录目前 grounded 了什么。当你问 “what does the reader need to hear next?” 时，如果 next move 需要 ungrounded concept，这个 missing foundation 本身就是答案：先在这里或 earlier block ground 它，否则不能做这个 move。这是 [Pulling from the pile](#pulling-from-the-pile) 的 gap-naming 上升一层：那里是 pile 缺 material；这里是 article 缺 foundation。

Lever 是哪些东西设为 prerequisite，哪些东西在 article 内 ground。Up front 要求太多，会把 readers 挡在外面；在 article 内 ground 太多，opening 会淹没在 definitions 中。Establish prerequisites 时和用户 settle。

## Conversational feel

这是 inverted grilling session。在 ideation 中，问题是 “what are you actually noticing?” 这里的问题是 “what is this article actually arguing, and in what order does the reader need to hear it?” Push back。不要让 weak transitions 溜过去。如果一个 paragraph 没有 earn its place，cut it。

持续使用这些 specific moves：

- “What does this paragraph do for the reader that the previous one didn't?”
- “If I cut this, what breaks?”
- “Is this prose, or should it be a list? Why prose?”
- “This sentence is doing two jobs — split it or pick one.”
- “The opening promised X. We've drifted to Y. Either re-thread it or change the opening.”

## Pulling from the pile

把 raw material 当成 quarry，而不是 script。Pull 一个 fragment，rework 它以适配 surrounding paragraph，然后 place it。一个 fragment 可以被 split 到多个 paragraphs、与另一个 merged，或 paraphrased。Pile 的 job 是被 mined；article 的 job 是读起来像一个 voice。

如果 pile 缺少 article 需要的东西，明确 name the gap：“We need an example here and the pile doesn't have one — give me one now or we cut this section.”

## Format arguments to actually have

选择如何 render 一个 block 时，要和用户 out loud weigh 这些 tradeoffs，而不是 silently：

- **Prose vs. list.** Prose 承载 argument；lists 承载 parallel items。如果 items 不是真正 parallel，prose 更好。如果是，list 更容易 scan。
- **Inline vs. callout.** Tips、warnings 和 asides 放进 callouts（`> [!TIP]`、`> [!NOTE]`），但只有在 inline 会真正 derail main argument 时才这样。否则保持 inline。
- **Table vs. repeated structure.** 如果同一 shape 用相同 fields 重复 3+ 次，使用 table。否则使用带 bold leads 的 prose。
- **Quote vs. paraphrase.** 当 original wording 是重点时 quote。只有 idea 重要时 paraphrase。
- **Code block vs. inline code.** Multi-line、runnable 或 illustrative → block。Single token 或 identifier → inline。

## Writing rhythm

每个 block agreed 后 append 到 article file。每次 write 前从 disk 重新读取 file；用户可能在 turns 之间 edit。Never overwrite blindly。如果用户想 rewrite 某个 paragraph，edit that specific paragraph in place；leave the rest alone。

## Out of scope

- Mining for new fragments that aren't in the pile（按 "Pulling from the pile" 中的方式处理 gaps）。
- Editing the raw material file。
- Publishing、formatting for a specific platform，或添加用户没要求的 frontmatter。

</supporting-info>
