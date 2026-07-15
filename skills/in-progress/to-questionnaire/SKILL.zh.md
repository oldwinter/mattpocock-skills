---
name: to-questionnaire
description: 把用户无法独自回答的 decision 整理成 questionnaire，交给其他人填写。
disable-model-invocation: true
---

把用户无法独自回答的事情转换成一份 **questionnaire**：一份交给某个人异步填写，或在 meeting 中共同填写的 Markdown document。Recipient 掌握用户缺少的知识；questionnaire 负责把这些知识提取出来。

**Grill 的是发送方式，不是 subject 本身。** 只围绕用户总能回答的 _send_ 来 interview：交给谁，以及需要对方提供什么。Document 中的问题则针对 recipient 已知内容与用户所需内容之间的 **gap**。

1. **它要交给谁？** 在一次 exchange 中询问 recipient 的 role、expertise，以及与用户的关系。这会确定 questionnaire 的 tone 和必须携带多少 context。当你明确 recipient 是谁，以及对方掌握哪些用户不知道的内容时，本步完成。

2. **你需要对方提供什么？** 在一次 exchange 中询问用户无法独自 resolve、必须从此人处获得的具体 decisions 或 facts。当你得到一份 concrete list，明确用户最终必须能够完成什么或决定什么时，本步完成。

3. **编写 questionnaire。** 按下方 Document structure，针对步骤 1-2 得出的 gap 起草问题。把文件写到当前目录的 `to-questionnaire-<slug>.md`（slug 来自 topic），并报告 path。当文件存在，且用户在步骤 2 中点名的每一项都有对应问题时，本步完成。

## Document structure（文档结构）

把 document 定位为 **discovery questionnaire**：用户缺少 context，recipient 掌握它。按重要性从高到低排列问题；异步沟通可能只有一次机会。问题超过少量几项后，按 theme 分组到 `##` headings 下。使用以下 template 编写。

<questionnaire-template>

# <Questionnaire 标题>

**目的：** 这份 questionnaire 为什么存在，以及哪个 decision 依赖它。

**来自：** <用户> — **交给：** <recipient> — **答案将如何使用：** <会流向哪里>

## 背景

用一个 paragraph 帮助不了解用户思路的 recipient 建立方向。信息应足以让对方给出好答案，但不要写满一页。

## 如何回答

说明 deadline 和大致所需精力。Partial answers 和“我不知道”也有价值；对不确定的内容做标记，不要直接跳过。

## <Theme heading（主题标题）>

每个 theme 使用一个 `##` section，内部问题按重要性从高到低排列。每个问题只表达一个 idea，绝不 compound；问题正下方放 answer stub。只有当问题可能被误解或容易得到敷衍回答时，才补一行 _为什么这很重要_。

<question-example>
### 系统上线时预计要承受多大负载？

_为什么这很重要：它决定我们现在就为 burst traffic provisioning，还是推迟处理。_

>
</question-example>

## 还有其他内容吗？

用一个 catch-all 问题收尾：是否还有我们没有问到、但应该知道的内容？

</questionnaire-template>
