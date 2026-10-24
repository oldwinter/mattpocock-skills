# 为避开 harness 内建命令而重命名 skills

Skill 名称不会仅因某个 harness 自带同名 command 或 skill 而改变（`/prototype`、`/research`、`/code-review` 等）。为避免 collision 而重命名 skill 或增加 alias 的 requests 不在范围内。

## 为什么不在范围内

Harnesses 会不断新增内建项，而且每个 harness 自己决定名称。每当其中一个占用了我们已使用的名称就重命名，会在 Claude Code、Copilot、Devin 等工具之间追逐移动目标，并且每次都会破坏用户的 muscle memory 和 skills 之间的 cross-reference。

Harness 如何解析两个同名对象，属于 harness 的行为，不是 skill 的行为。无论哪种情况，skill 文本本身都是正确的。

解决方式是 namespaced invocation。Claude Code plugin 会在 plugin name 下暴露每个 skill，因此始终可以显式触达：

```text
/mattpocock-skills:research
/mattpocock-skills:code-review
```

如果通过 skills.sh 安装，files 属于你：可以重命名 folder 和副本中的 `name:` field。

如果 harness 完全不允许触达 namespaced 或重命名后的 skill，请向该 harness 报告。

## 此前的 requests

- #423：“/code-review shadows Claude Code own review skill”
- #483：“/code-review name clash with Claude Code built-in”
- #857：“Rename the research skill to avoid conflict with Copilot's built-in /research command”
- #1019：“Shorthand `/prototype` conflicts with hidden new Claude Code built-in skill `/prototype`”
- #1037：“Skill name overlap with devin cli inbuilt commands”
