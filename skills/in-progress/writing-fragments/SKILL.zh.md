---
name: writing-fragments
description: Grilling session，用来从用户那里挖掘 fragments：异质的 writing nuggets（claims、vignettes、sharp sentences、half-thoughts），并 append 到单个 document，作为 future article 的 raw material。Use when the user wants to develop ideas before imposing structure, or mentions "fragments", "ideate", or "raw material" for writing.
---

<what-to-do>

运行一个会产出 fragments 的 grilling session。围绕用户想写的任何内容 relentless interview。不要 impose phases、outlines 或 structure；这明确 out of scope。

当 fragments 从 conversation 任意一边浮现，将它们 append 到单个 markdown file。用户会在 session 期间 edit 此 file；每次写入前都要重新读取，preserve 他们的 edits。

如果用户没有传 path，询问一次 document 保存位置，然后在本 session 剩余时间记住它。

从用户说的第一句话开始 capture fragments，包括 initial prompt。

第一次 write 时，顶部只放一个带 working title 的 H1（之后可改），除此之外不要放 metadata、TOC、date。

</what-to-do>

<supporting-info>

## What is a fragment

Fragment 是任何可能 survive 到 final article 的 text。它必须 _readable by the author_：作者能看懂它的意思；但不必 define terms，也不必让 cold reader 理解。标准是 “is this a piece of good writing?”，不是 “is this a self-contained argument?”

Fragments 故意 heterogeneous。可以成为 fragment 的例子：

- 一句 sharp sentence，你想在某处使用，但还不知道放哪里。
- 一个带 one-line justification 的 claim。
- 一个 vignette：发生过的事、code snippet、scenario、analogy。
- 一个 half-thought：“something about how X feels like Y, work this out later.”
- 一个 quote、一段 dialogue、一句 overheard line。
- 一组凭感觉 hang together 的 related observations。
- 一个 complaint、confession、punchline。

Novelist's diary 是 model：多年 unstructured noticings 之后被 mined 成 raw material。Fragments 是 noticings。

## File format

```markdown
# Working title

A first fragment lives here.

It can be multiple paragraphs. It can include lists, code, quotes — whatever
shape the fragment naturally takes.

---

A second fragment.

---

> A quoted line that the user wants to keep around.

A reaction to it.

---

- A cluster of related observations
- That hang together by feel
- And want to be near each other
```

Fragments 用 horizontal rule（`\n---\n`）分隔。Body 内没有 headings。没有 tags。除了被添加顺序外没有 order。

## Writing rhythm

Silently append。不要为每个 fragment ask permission。顺带提一句你加了什么（“adding that”），但不要用 save dialogs 打断 conversation。

每次 write 前：从 disk 重新读取 file。用户可能在 turns 之间 edit、reorder 或 delete fragments；preserve their changes。永远不要 overwrite file；只 append（或在用户要求时，edit specific fragment in place）。

用户随时可以说 “cut the last one”、“rewrite that one sharper”、“merge those two”。把这些视为 first-class instructions。

</supporting-info>
