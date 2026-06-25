---
name: writing-beats
description: Writing, exploit — assemble raw material into a journey of beats, grounding each term before a beat leans on it.
disable-model-invocation: true
---

<what-to-do>

用户已经传入（或将传入）一个 raw material markdown file。这是 **exploit**：exploring 已完成，pile 已固定；commit 到穿过它的一条 path，并 mine 这个 pile 来填充每个 beat。

如果用户没有说明 article 保存到哪里，询问一次并记住 path。

然后运行 beat-by-beat journey，choose-your-own-adventure style：

1. **Establish the prerequisites.** 在任何 beats 前，和用户 settle audience 进来时已经知道什么，也就是从一开始就 **grounded** 的 concepts。其他所有 concept 都必须先由某个 beat grounded，后续 beat 才能 lean on it。见 [Grounding](#grounding)。
2. 从 raw material 中写出 2–3 个 candidate **starting beats**。每个都是 article 的不同 entry point。每个只能 lean on grounded concepts；标注它会 ground 哪些 new concepts。写入 article file 前先展示给用户。用户选择一个。Preview 这个选择会 unlock 哪些 beats，就像让用户看到路径前方一点点。
3. 用户选定 starting beat 后，向 article file 写入**仅那个 beat**。一个 beat 可以是一句话，也可以是几段；以它自然的长度为准。停在那里。
4. 从 disk 重新读取 article file。然后提供 2–3 个 candidate **next beats**：从当前 article 状态出发，journey 可 pivot 的不同方向。每个都必须 reachable from current grounded set；标注它会 ground 什么。
5. 循环 steps 3–5，直到 article 到达 natural end。

</what-to-do>

<supporting-info>

## Grounding

每个 **concept** 都必须先被 **grounded**，beat 才能 lean on it：audience 要么进来时就知道它，要么在 earlier beat 中遇见过它。一个 reach for ungrounded concept 的 beat 会丢掉 reader，这是 journey 唯一不能做的 move。Unit 是 concept，不是 word：即使没有 jargon，beat 也可能 lean on reader 缺少的 idea。Concept 有 name 时，即 **term**，grounding 它意味着把 idea 和 term 一起落地。

Concept 有两种 grounding 方式：

- **Prerequisite** — first beat 前已经 grounded。Audience 自带。Start 时固定。
- **Introduced** — beat 建立它，从那以后它对所有 later beats 都是 grounded。

因此每个 beat 做两件事：它 **requires** already grounded concepts，并且 **grounds** new ones。维护一个 running list，记录目前 grounded 了什么，并在每个 beat landed 后更新。

这塑造了 choose-your-own-adventure。Candidate beat 只有在它 required 的所有东西都已 grounded 时才 reachable；选择一个 ground concept X 的 beat，会 unlock 所有等待 X 的 beats。提供 next beats 时，它们都必须 reachable from current grounded set，并说明各自会 ground 什么，让用户看见它打开哪些 paths。

最大的 lever 是哪些东西设为 prerequisite，哪些东西在 piece 内 ground。Up front 要求太多，会把没有这些知识的 readers 挡在外面；在 piece 内 ground 太多，early beats 会淹没在 definitions 中。Establish prerequisites 时和用户 settle；当一个 tempting beat 需要尚未 grounded 的 concept 时重新审视。Fix 要么是在它前面加一个 grounding beat，要么把该 concept 提升为 prerequisite。

## What is a beat

Beat 是 journey 中的一个 move。它只做一件事：sets a scene、lands a point、asks a question、drops an aside、twists the angle。然后停下，把 reader 留在一个 next beat 可以 pivot 的位置。

Beat 的大小由它需要什么决定：

- 如果 move 就是一句话，那就是一句话（“And then nothing happened for three weeks.”）。
- 如果 move 需要 setup，就是 short paragraph。
- 如果 beat 是 self-contained vignette、argument 或 example，可以是 multiple paragraphs。

如果一个 “beat” 需要五段和三个 subheadings，它就不是 beat，而是两个 beats 粘在一起。Split it。

## Pulling from the pile

从 raw pile 中 pull material 来 populate 每个 beat。你可以 paraphrase、split、recombine 或 quote。Pile 是 quarry。

## Ending the journey

当 journey 完成时 article 结束，而不是 pile 为空时结束。大多数 piles 会留下没用上的 fragments。没问题；这正是 raw material 多于所需的意义。

## Writing rhythm

- 一次 append 一个 beat。Never write ahead。
- 每次 write 前从 disk 重新读取 article file。绝对 preserve user edits。
- 如果用户 substantially edit 了 previous beat，让它改变后续内容。
- 如果用户说 “rewrite that beat” 或 “go back and try a different beat 3”，照做：edit in place，其他部分 leave alone。

</supporting-info>
