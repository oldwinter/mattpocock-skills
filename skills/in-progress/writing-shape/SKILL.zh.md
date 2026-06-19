---
name: writing-shape
description: 将 raw material markdown file 通过 conversational session 塑造成 article：drafting candidate openings，逐段 growth piece，并在每一步争论 format（lists、tables、callouts、quotes）。Use when the user has a pile of notes, fragments, or a rough draft and wants help turning it into something publishable.
---

<what-to-do>

用户已经传入（或将传入）一个 raw material markdown file。把它视为 input pile：可以是 tidy fragments list、unstructured prose wall 或 transcript。Format 不重要。先 end-to-end 读取它，再做其他事。

然后运行 shaping session，产出一个 separate article document。不要 edit raw material file；对这个 skill 来说它是 read-only。

如果用户没有说明 article 保存到哪里，询问一次并记住 path。用户会在 session 期间 edit article file；每次写入前都要重新读取，preserve 他们的 edits。

</what-to-do>

<supporting-info>

## The loop

1. **Read the pile.** 完整读取 input file。形成对其中内容的 sense。
2. **Draft 2–3 candidate openings.** 每个 opening 都应暗示 article 的不同 thesis 或 angle。展示全部。Force 用户选择一个，或 compose hybrid。Chosen opening 定义 article 剩余部分必须完成什么。
3. **Grow paragraph by paragraph.** Opening lands 后，问 “given this opening, what does the reader need to hear next?” 从 pile 中 pull material 回答。争论 next beat 应该是 paragraph、list、table、callout、quote、code block。每个 format choice 都应 deliberate and defensible。
4. **Append to the article file as you go.** 不要 batch。每个 agreed paragraph 或 block 立刻写入，让用户看到 article taking shape。
5. **Loop step 3 until the article is done.** 用户决定何时 done。

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

选择如何 render 一个 beat 时，要和用户 out loud weigh 这些 tradeoffs，而不是 silently：

- **Prose vs. list.** Prose 承载 argument；lists 承载 parallel items。如果 items 不是真正 parallel，prose 更好。如果是，list 更容易 scan。
- **Inline vs. callout.** Tips、warnings 和 asides 放进 callouts（`> [!TIP]`、`> [!NOTE]`），但只有在 inline 会真正 derail main argument 时才这样。否则保持 inline。
- **Table vs. repeated structure.** 如果同一 shape 用相同 fields 重复 3+ 次，使用 table。否则使用带 bold leads 的 prose。
- **Quote vs. paraphrase.** 当 original wording 是重点时 quote。只有 idea 重要时 paraphrase。
- **Code block vs. inline code.** Multi-line、runnable 或 illustrative → block。Single token 或 identifier → inline。

## Writing rhythm

每个 block agreed 后 append 到 article file。每次 write 前从 disk 重新读取 file；用户可能在 turns 之间 edit。Never overwrite blindly。如果用户想 rewrite 某个 paragraph，edit that specific paragraph in place；leave the rest alone。

## Out of scope

- Mining for new fragments that aren't in the pile（pile 是 input；如果 incomplete，name the gap，并让用户补或 cut section）。
- Editing the raw material file。
- Publishing、formatting for a specific platform，或添加用户没要求的 frontmatter。

</supporting-info>
