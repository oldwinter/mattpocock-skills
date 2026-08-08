# 中文 fork 的 canonical install block

一种安装路径，一套固定措辞。`README.md`、`.changeset/*` 和其他需要安装说明的位置都以这里为准。先修改本文件，再向外同步。

上游 `mattpocock/skills` 已进入 Claude Code 官方 marketplace，但该 listing 固定指向上游仓库，不会分发本中文 fork。中文用户必须先添加 `oldwinter/mattpocock-skills` 自带的 marketplace，再从中安装 plugin。这个直接仓库 marketplace 是 fork 的正式 Claude Code 安装入口。

## Claude Code：plugin

<canonical-block name="claude-code">

```bash
claude plugin marketplace add oldwinter/mattpocock-skills
claude plugin install mattpocock-skills@mattpocock
```

或在 session 内执行：

```text
/plugin marketplace add oldwinter/mattpocock-skills
/plugin install mattpocock-skills@mattpocock
```

这是中文 fork 自带的 marketplace；不要改成上游官方 marketplace 的无前缀安装命令，否则会安装英文上游版本。

</canonical-block>

## Codex 与其他 agent：skills.sh

Plugin 只适用于 Claude Code。其他环境通过 [skills.sh](https://skills.sh/oldwinter/mattpocock-skills) 把可编辑的中文 skill 文件复制进项目。`README.md` 使用整套安装形式：

<canonical-block name="skills-sh-whole-set">

```bash
npx skills@latest add oldwinter/mattpocock-skills
```

选择要安装的 skills 和目标 coding agents。**安装器允许按需选择；务必包含 `setup-matt-pocock-skills`。**

</canonical-block>

单独介绍某个 skill 时使用以下形式。注意：**`docs/` 页面不消费这段安装说明**。ai-hero 会在正文上方渲染安装组件，页面再写命令会造成重复。详见 [writing-docs.md](./writing-docs.md)。

<canonical-block name="skills-sh-one-skill">

```bash
npx skills@latest add oldwinter/mattpocock-skills --skill=<name>
```

```bash
npx skills@latest update <name>
```

</canonical-block>

`skills@latest` 是固定写法。旧 `docs/` 页面中的命令块应直接删除，不做逐页修正，因为站点会自行渲染安装命令。

## 两条路径互斥

Plugin 是托管的只读 bundle；skills.sh 写入用户自己维护和编辑的文件。同时安装会让每个 skill 出现两份，所以始终要求用户二选一。

## 不适用于中文 fork 的上游命令

不要向中文 fork 用户提供 `claude plugins install mattpocock-skills` 或 `npx skills@latest add mattpocock/skills`。前者解析到 Claude Code 官方 marketplace 中的英文上游 listing，后者直接复制英文上游 runtime；两者都绕过本 fork 的中文 `SKILL.md`。
