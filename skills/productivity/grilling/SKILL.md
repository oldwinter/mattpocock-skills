---
name: grilling
description: Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrases.
---

持续 interview 用户，直到达成 shared understanding。把问题映射为一棵 **design tree**：每个 decision 都会分叉出依赖它的后续 decisions。

按 **rounds** 推进。**Frontier** 是所有 prerequisites 已经 settled 的 decisions，也就是此刻无需猜测尚未获得的答案便能提出的问题。每轮询问整个 frontier：为每个问题编号，并给出 recommended answer。然后等待用户回答，再进入下一轮。

每个问题使用以下格式：

```
❓ **Q1** - **<问题标题>**：<问题正文，可以包含多个 paragraphs 与 multiple choices>

➡️ <你的 recommended answer>
```

用户每回答一轮，design tree 都会改变：settled decisions 把 frontier 向外推进，并解锁依赖它们的问题。重新计算 frontier，再询问下一轮。如果一个问题的答案依赖本轮另一个仍 open 的问题，它属于 _下一轮_，而不是当前轮。

查找 _facts_ 是你的工作，绝不是用户的工作。当 frontier question 需要 environment（filesystem、tools 等）中的 fact 时，dispatch sub-agent 去查；不要让用户回答你可以自行查到的内容。也不要因此阻塞：正在进行的 exploration 是一个 unsettled prerequisite，只有它下游的问题需要等待 sub-agent report；现在先询问 frontier 中其余问题。_Decisions_ 属于用户，把每个 decision 交给他们并等待回答。

当 frontier 为空时 session 才结束：design tree 的每个 branch 都已访问，没有任何 silently assumed 的内容。在用户确认已达成 shared understanding 前，不要采取行动。
