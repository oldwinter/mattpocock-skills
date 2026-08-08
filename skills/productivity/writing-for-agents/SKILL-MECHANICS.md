# Skill mechanics

这是 [`writing-for-agents`](SKILL.md) 中只属于 skill 的 branch：当 document 是 skill 时，frontmatter、invocation choice 和 router skills 会发生什么变化。其他写作规则都位于 `SKILL.md` 的 universal reference 中。

## Invocation

有两种选择，它们交换两类 load：

- **Model-invoked** skill 保留 `description`，因此 agent 可以自主触发它，其他 skills 也可以调用它。你仍然可以输入它的名称：model invocation 始终 _包含_ user reach；description 只会增加 agent discovery，不会移除 human 入口。Description 是 skill 的 top-level context pointer，必须始终处于 loaded 状态，以永久 context load 换取 discoverability。内容完全是 reference 的 model-invoked skill 也可以作为 shared reference 的唯一归属：另一个 skill 能调用它，因此多个 skills 需要的 reference 只存在一处。Mechanics：省略 `disable-model-invocation`，并编写携带各个 trigger branches、面向 model 的 description；完整遵守 `SKILL.md` 中的 pointer-writing rules。
- **User-invoked** skill 从 agent 的 reach 中移除 description：只有 human 输入名称才能调用，其他 skills 也无法调用。它没有 context load，却会消耗 cognitive load，因为你必须记得它存在。Mechanics：设置 `disable-model-invocation: true`；`description` 改为 human-facing 的 one-line summary，并移除 trigger lists。

只有当 agent 必须自行使用该 skill，或另一个 skill 必须调用它时，才选择 model invocation。如果它只会由手动输入触发，就设为 user-invoked，不要支付 context load。

两个 user-invoked skills 共同需要的 shared reference 不能归属于任何一个：两者都没有 model-facing description，彼此无法调用。把 reference 放进 skill system 外的 plain file，让任意 skill 都能指向它。

## Splitting by invocation

这是按 invocation 拆分 document 的方式；按 sequence 拆分的规则位于 `SKILL.md`。当内容拥有一个应当独立触发的 distinct leading word，也就是你实际会在 prompts 中使用的 trigger word，或其他 skill 必须调用它时，才拆出 model-invoked skill。新的 always-loaded description 会消耗 context load，因此 independent reach 必须值得这笔成本。

## Router skills

当 user-invoked skills 多到无法全部记住时，堆积的 cognitive load 应由 **router skill** 解决：用一个 user-invoked skill 列出其他 skills 以及各自适用时机，让 human 只需记住一个入口。Router 只能提示，不能替你触发：user-invoked skills 没有 model-facing description，除 human 外没有任何调用者能 reach 它们。
