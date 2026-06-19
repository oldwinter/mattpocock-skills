---
name: writing-beats
description: 将 article 塑造成 beats 之旅，choose-your-own-adventure style。用户从 raw material 中选择 starting beat，你只写那个 beat，然后给出接下来 pivot 的 options，beat by beat，直到 article 达到 natural end。Use when the user has raw material and wants to assemble it as a narrative rather than an argument.
---

<what-to-do>

用户已经传入（或将传入）一个 raw material markdown file。

如果用户没有说明 article 保存到哪里，询问一次并记住 path。

然后运行 beat-by-beat journey：

1. 从 raw material 中写出 2–3 个 candidate **starting beats**。每个都是 article 的不同 entry point。写入 article file 前先展示给用户。用户选择一个。Preview 写完后它可能通向哪些 beats，就像让用户看到路径前方一点点。
2. 用户选定 starting beat 后，向 article file 写入**仅那个 beat**。一个 beat 可以是一句话，也可以是几段；以它自然的长度为准。停在那里。
3. 从 disk 重新读取 article file。然后提供 2–3 个 candidate **next beats**：从当前 article 状态出发，journey 可 pivot 的不同方向。
4. 循环 steps 2–4，直到 article 到达 natural end。

</what-to-do>

<supporting-info>

## What is a beat

Beat 是 journey 中的一个 move。它只做一件事：sets a scene、lands a point、asks a question、drops an aside、twists the angle。然后停下，把 reader 留在一个 next beat 可以 pivot 的位置。

Beat 的大小由它需要什么决定：

- 如果 move 就是一句话，那就是一句话（“And then nothing happened for three weeks.”）。
- 如果 move 需要 setup，就是 short paragraph。
- 如果 beat 是 self-contained vignette、argument 或 example，可以是 multiple paragraphs。

如果一个 “beat” 需要五段和三个 subheadings，它就不是 beat，而是两个 beats 粘在一起。Split it。

## Writing one beat

一旦 beat 被选中，只把 _that beat only_ 写入 article file。不要写 next beat。

从 raw pile 中 pull material 来 populate 这个 beat。你可以 paraphrase、split、recombine 或 quote。Pile 是 quarry。

## Ending the journey

当 journey 完成时 article 结束，而不是 pile 为空时结束。大多数 piles 会留下没用上的 fragments。没问题；这正是 raw material 多于所需的意义。

## Writing rhythm

- 一次 append 一个 beat。Never write ahead。
- 每次 write 前从 disk 重新读取 article file。绝对 preserve user edits。
- 如果用户 substantially edit 了 previous beat，让它改变后续内容。
- 如果用户说 “rewrite that beat” 或 “go back and try a different beat 3”，照做：edit in place，其他部分 leave alone。

</supporting-info>
