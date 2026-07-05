Quickstart:

```bash
npx skills add mattpocock/skills --skill=handoff
```

```bash
npx skills update handoff
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/productivity/handoff)

## What it does

`handoff` 会把当前 conversation compact 成一份 **handoff document**，让 fresh agent 能读它并从你停下的地方继续。

它 **不会**重述已经存在于别处的内容。任何已捕获在 PRD、plan、ADR、Issue、commit 或 diff 中的内容，都只用 path 或 URL 引用，不复制。Document 只携带 live thread：你正在做什么、为什么做、下一步是什么。它保存到 OS temp directory，而不是 workspace，因此不会变成另一个需要维护的 artifact。

## When to reach for it

你通过输入 `/handoff` 调用它，agent 不会自行触达它。传入下一 session 的目的说明，document 会据此定制。

当 conversation 足够长、context 有风险时使用它：接近 context limit、一天结束要收尾，或有意把 work 交给另一个 agent，并且你想保留 thread，而不是拖着整段 transcript 走。

## What the document carries

- **The live thread**：当前 in flight 的事情和原因，使用 conversation 自己的 terms，去掉已经写在别处的细节。
- **Suggested skills**：下一 agent 应触达哪些 skills 的 pointer。
- **References, not copies**：指向 PRDs、plans、ADRs、Issues 和 diffs 的 links 与 paths，它们持有 settled detail。
- **Redacted secrets**：API keys、passwords 和 PII 会在写入前移除。

要记住的概念是 **compaction**：handoff 是 conversation 被压缩到可恢复核心，fresh agent 继承的是 momentum，而不是 noise。

## Where it fits

`handoff` 是 reach-for-it-anytime standalone，位于两个 sessions 的 seam 上，而不是 build chain 内部。它自然搭配那些会产出 artifacts 的 skills，因为 handoff 会指向它们的输出：[to-prd](https://aihero.dev/skills-to-prd) 是典型例子，finished PRD 正是 handoff 应引用而不是重复的 settled detail。无法确定当下该用哪个 skill 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
