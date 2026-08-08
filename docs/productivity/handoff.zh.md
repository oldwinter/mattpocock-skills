## 功能

`handoff` 把当前 conversation 压缩成一份 handoff document，让 fresh agent 可以从中断处继续。

它不会重复其他 artifacts 已保存的内容。Spec、plan、ADR、issue、commit 或 diff 只通过 path/URL 引用，不复制正文。Document 只携带 live thread：正在做什么、为什么、下一步是什么；它保存在 OS temporary directory，而不是 workspace。

## 何时使用

这是 user-invoked skill，适用范围很窄：切换到 new harness、移动到 new directory/repo、交给 colleague，或在 mid-phase fork 一个 side task 时使用。它换来的是 portable Markdown file。仅仅因为 conversation 变长、仍在同一 harness 和 directory 继续时，优先在 phase boundary 使用 `/compact`。可传入 argument 描述下一 session 的 focus。

## Document 内容

- **Live thread**：当前进行中的工作与原因，排除其他 artifacts 已记录的 settled detail。
- **Suggested skills**：下一 agent 应调用的 skills。
- **References, not copies**：指向 specs、plans、ADRs、issues、commits 和 diffs 的链接或路径。
- **Redacted secrets**：写入前移除 API keys、passwords 和 PII。

## Common questions

**Handoff 还是 compact？**

除非有东西要“移动”，否则用 `/compact`。同一 task、同一 harness、同一 directory 继续时，phase-boundary tree 通常落在 compact。`/handoff` 的优势不是 summary 更好，而是得到一份能带到 `/compact` 到不了之处的 file。

**Compact、clear 与 handoff 的实际区别是什么？**

它们保存不同东西：`/compact` 压缩当前 context，在 fresh window 中保留 intent；`/clear` 清空 window，从零开始；`/handoff` 写 portable file，让 work 穿越环境。三者都会把 conversation 这个 [primary source](https://www.aihero.dev/ai-coding-dictionary/primary-source) 变成 summary 这个 [secondary source](https://www.aihero.dev/ai-coding-dictionary/secondary-source)；只有 continue 不会，因此应先排除 continue。

**Handoff file 在哪里？**

在 OS temp directory。路径长且各 OS 不同，Windows 上尤其容易找错。结束前要求 agent 明确返回 path 并保留。Temp 是刻意选择：handoff 是 transit document，不是长期维护 artifact。

**为什么跨 sessions 后文件消失了？**

一些环境会清理 temp，reboot 也会删除 `/private/tmp`。下一 session 若不会在短时间内启动，或会换 harness，应在文件生成后自行移到 durable location。Document 指向的其他 temp files 也必须一起处理。

**实际怎样交给下一个 agent？**

打开 fresh session，直接指向 path：“read this file, then continue”。不要把 summary 插进 shell command；内容里的 backticks 或 command substitutions 可能被 shell mangled，常见结果是静默 truncation，而不是明显 error。

**它和 `/branch`、`--fork-session` 或 built-in `/handoff` 一样吗？**

相似但不相同，本集合没有另一个 `/branch` skill。Fork 继承 exact context；本 skill 针对指定 next task 做 targeted compression，并写入 file。同 machine、harness、directory 能直接 fork 时，fork 更省事；destination 超出 fork reach 时，portable file 才占优。

**什么时候内容应该进入 `CLAUDE.md`？**

问它下个月是否仍然为真。`CLAUDE.md` 是每个 session 都加载的 standing project context；handoff 只服务一项进行中的 work，完成后即失效。反复重讲的 facts 属于 agent docs，half-finished task 属于 handoff。

**它只记录 what，没有记录 why。**

调用时传入 next session 的目标，让与该目标有关的 reasoning 被保留。还要检查未经验证却写成事实的 claims，例如 “X 尚未 build” 或 “Y 已完成”；下一 agent 会把 document 当 contract，不一定重新核验。交出前应 review，并把 assumptions 降级为 assumptions。

**为什么是 skill，而不是 slash command？**

两者都可实现。Skill 能和本集合其他内容通过同一安装与更新路径分发；是否允许 agent 自动触发由 frontmatter 控制，而不是由机制名称决定。

## 所处流程

`handoff` 位于两个 sessions 的 seam，不属于固定 build chain。它特别适合引用 [to-spec](https://aihero.dev/skills-to-spec) 产出的 settled spec，而不是把 spec 内容重新复制一遍；同一环境中的普通 phase transition 则由 `/compact` 负责。
