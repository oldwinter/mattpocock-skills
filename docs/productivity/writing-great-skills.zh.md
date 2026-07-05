Quickstart:

```bash
npx skills add mattpocock/skills --skill=writing-great-skills
```

```bash
npx skills update writing-great-skills
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/productivity/writing-great-skills)

## What it does

`writing-great-skills` 是你写作和编辑 skills 时使用的 reference：一套让 skill 可预测的共享 vocabulary 与 principles。

Skill 的职责是从 stochastic system 中驯服出 determinism，所以目标不是每次得到相同 *output*，而是相同 *process*。**Predictability** 是根本美德，每个 design choice 都按它来判断，而不是看这个 skill 读起来多聪明、多完整或多详尽。

## When to reach for it

你通过输入 `/writing-great-skills` 调用它，agent 不会自行触达它。

当你 author 新 skill 或编辑 existing skill，并希望它每次行为一致时使用它：决定 invocation mode、写 description、选择哪些内容放进 `SKILL.md`、哪些放进 linked file，或诊断 skill 为什么 misfires。

## Cognitive load

整个 reference 围绕的概念是 **cognitive load**，以及它的对应物 **context load**。每个 skill 都会消耗其中之一：

- **Model-invoked** skill 每 turn 都把 description 放进 window，所以消耗 **context load**，但能自行触发。
- **User-invoked** skill 移除 description，context load 为零，但现在必须由 *你* 记住它存在，这就是 **cognitive load**。

这些 skills 多数是 user-invoked，因此 cognitive load 是整个系统要管理的压力：当 user-invoked skills 多到你装不下时，解法是一个 **router skill**，命名其他 skills 并说明何时触达它们。一旦你用这两种 load 思考，多数 authoring decisions，例如 split or don't、inline or disclose、model- or user-invoked，都会变成同一个 trade 在不同位置的表现。

## The other levers

Reference 的其余部分是一组花好这些 loads 的工具：

- **Leading words**：model 在 pretraining 中已拥有的紧凑概念（_tight_、_red_、_tracer bullet_），agent 在运行 skill 时用它思考。它用最少 tokens 同时锚定 execution 和 invocation；寻找能被一个词替换掉的重复解释。
- **Information hierarchy**：从 in-skill step，到 in-skill reference，再到 **context pointer** 后的 external reference。**Progressive disclosure** 是沿这条 ladder 向下移动，让顶层保持可读。
- **Pruning**：single source of truth、relevance、no-op test，逐句应用，对抗 **sediment** 和 **sprawl**。
- **Failure modes**：**premature completion**、**duplication**、**sediment**、**sprawl**、**no-op**，用于诊断行为不好的 skill。

## Where it fits

这是 reach-for-it-anytime standalone reference，是你构建其余 skills 时咨询的 meta-skill，而不是 chain 中一步。它的自然邻居是你维护的任何 router，因为 router 直接治疗 user-invoked skills 累积出的 cognitive load；当你不确定某个任务适合哪个 skill 或 flow 时，[ask-matt](https://aihero.dev/skills-ask-matt) 会在整套系统上为你路由。
