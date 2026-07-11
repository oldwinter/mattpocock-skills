快速开始：

```bash
npx skills add oldwinter/mattpocock-skills --skill=handoff
```

```bash
npx skills update handoff
```

[源码](https://github.com/oldwinter/mattpocock-skills/tree/main/skills/productivity/handoff)

## 功能

`handoff` 把当前 conversation 压缩成一份 handoff document，让 fresh agent 可以从中断处继续。

它不会重复其他 artifacts 已保存的内容。Spec、plan、ADR、issue、commit 或 diff 只通过 path/URL 引用，不复制正文。Document 只携带 live thread：正在做什么、为什么、下一步是什么；它保存在 OS temporary directory，而不是 workspace。

## 何时使用

这是 user-invoked skill。当 conversation 变长、context 接近风险区，或需要从主 thread 分支到 prototype/research session 后再返回时使用。可传入 argument 描述下一 session 的 focus。

## Document 内容

- **Live thread**：当前进行中的工作与原因，排除其他 artifacts 已记录的 settled detail。
- **Suggested skills**：下一 agent 应调用的 skills。
- **References, not copies**：指向 specs、plans、ADRs、issues、commits 和 diffs 的链接或路径。
- **Redacted secrets**：写入前移除 API keys、passwords 和 PII。

## 所处流程

`handoff` 位于两个 sessions 的 seam，不属于固定 build chain。它特别适合引用 [to-spec](https://aihero.dev/skills-to-spec) 产出的 settled spec，而不是把 spec 内容重新复制一遍。
