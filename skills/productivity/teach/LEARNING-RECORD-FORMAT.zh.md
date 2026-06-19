# Learning Record Format

Learning records 存放在 `./learning-records/`，使用 sequential numbering：`0001-slug.md`、`0002-slug.md` 等。Lazily create directory：只在写第一条 record 时创建。

它们是 teaching 中等价于 ADRs 的东西：捕获 non-obvious lessons、key insights 和 stated prior knowledge，用来 steer future sessions。它们用于计算 zone of proximal development。

## Template

```md
# {Short title of what was learned or established}

{1-3 sentences: 学到了什么（或 established 了什么 prior knowledge），以及它为什么影响 future sessions。}
```

这就是全部格式。一个 learning record 可以只有一段。价值在于记录 _that_ this is now known，以及 _why_ 它改变下一步要教什么，而不是填满 sections。

## Optional sections

只有在真正增加 value 时才包含。大多数 records 不需要。

- **Status** frontmatter（`active | superseded by LR-NNNN`）— 当 earlier understanding 被证明 wrong 并被替换时有用
- **Evidence** — 用户如何 demonstrate understanding（答对一个问题、完成一个 exercise、引用 prior experience）。当 claim 可能被 revisited 时有用。
- **Implications** — 这为 future sessions unlock 或 rule out 什么。Non-obvious 时值得记录。

## Numbering

扫描 `./learning-records/`，找到最高 existing number 并加一。

## When to write a learning record

当以下任一为 true 时写一条：

1. **用户 demonstrate 了对 non-trivial 内容的 genuine understanding** — 不只是 exposure，而是有 evidence 表明他们能正确使用 concept。这为下一步教学设置 new floor。
2. **用户 disclosed prior knowledge** — “I already know X.” 记录下来，避免 future sessions 重教。也记录他们 claimed 的 _depth_。
3. **A misconception was corrected** — 用户之前相信某个错误东西，现在理解了 why。这些 high-value：它们预测 related topics 中未来的 stumbling blocks。
4. **Mission shifted in response to learning** — 用户发现自己关心的东西与原以为不同。Cross-link 到 [[MISSION.md]] 并更新它。

### What does _not_ qualify

- 只是 covered 的 material。Coverage 不是 learning。等 evidence。
- 已经在 [[GLOSSARY.md]] 中作为 term definition tersely captured 的东西。不要 duplicate。
- Session-by-session activity logs。Learning records 不是 journal；它们是 decision-grade insights。

## Supersession

当 later record contradict earlier one（用户 understanding deepened 或 corrected），将 old record 标记为 `Status: superseded by LR-NNNN`，而不是删除。Understanding 如何 evolve 的 history 本身也是 useful signal。
