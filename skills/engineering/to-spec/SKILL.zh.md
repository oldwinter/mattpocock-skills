---
name: to-spec
description: 将当前对话整理成规格说明并发布到项目的 issue tracker；不再访谈，只综合已经讨论过的内容。
disable-model-invocation: true
---

本技能利用当前对话上下文和对代码库的理解生成一份规格说明（你也可能把这种文档称为 PRD）。不要再访谈用户，只综合已经掌握的信息。

issue tracker 和 triage label 词汇表应已提供；若没有，请运行 `/setup-matt-pocock-skills`。

## 流程

1. 如果尚未探索代码库，先了解其当前状态。规格说明应始终使用项目领域词汇表中的术语，并遵守所涉及区域的 ADR。

2. 勾勒准备在哪些测试接缝（seam）上验证该功能。优先复用现有接缝，而不是新增接缝；选择尽可能高层的接缝。确实需要新接缝时，也应把它放在尽可能高的位置。代码库中的接缝越少越好，理想数量是一个。

向用户确认这些接缝是否符合其预期。

3. 使用下方模板编写规格说明，然后发布到项目的 issue tracker。应用 `ready-for-agent` triage label，无需额外 triage。

<spec-template>

## Problem Statement

从用户视角描述其面临的问题。

## Solution

从用户视角描述问题的解决方案。

## User Stories

一份详尽的编号用户故事列表。每条用户故事采用以下格式：

1. 作为 <actor>，我希望 <feature>，以便 <benefit>

<user-story-example>
1. 作为手机银行客户，我希望查看各账户余额，以便更明智地决定如何支出
</user-story-example>

用户故事列表必须非常全面，覆盖该功能的各个方面。

## Implementation Decisions

列出已经作出的实现决策，可包括：

- 将要构建或修改的模块
- 将要修改的模块接口
- 开发者提供的技术澄清
- 架构决策
- Schema 变更
- API contracts
- 具体交互

不要包含具体文件路径或代码片段，它们可能很快过时。

例外：如果 prototype 产出的代码片段比文字更准确地表达了某项决策（例如 state machine、reducer、schema 或 type shape），可将其内联到相关决策中，并简短注明它来自 prototype。只保留承载决策的信息，不要放入完整可运行的 demo。

## Testing Decisions

列出已经作出的测试决策，包括：

- 好测试的标准（只测试外部行为，不测试实现细节）
- 将要测试的模块
- 测试的既有范例（即代码库中类似类型的测试）

## Out of Scope

描述本规格说明范围之外的事项。

## Further Notes

与该功能有关的其他说明。

</spec-template>
