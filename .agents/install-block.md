# 中文 fork 的 canonical install block

一套安装说明，一套固定措辞。`README.md`、`.changeset/*` 和 `docs/` 中的安装说明都必须以此为准。先修改本文件，再同步到其他位置。

## 优先提供真正加载中文 runtime 的安装方式

上游 `mattpocock/skills` 的 Claude Code 官方 marketplace listing 固定指向上游仓库，不会分发本中文 fork。Codex、Copilot 等托管入口如果直接读取上游 `.claude-plugin/plugin.json`，也会安装英文 `SKILL.md`。因此，中文 fork 只把已验证会加载本 fork runtime 的路径列为 ready；不要因为上游某条命令支持自动更新，就把它照搬给中文用户。

本 fork 的 Claude Code plugin 由仓库自带的 `.claude-plugin/marketplace.json` 提供。它只在 `.claude-plugin/plugin.json` 的 `version` 变化时重装；Release workflow 通过 `npm run version` 把 `package.json` 的版本同步到 manifest。

| Agent          | 中文安装入口                         | 是否自动更新？                                           |
| -------------- | ------------------------------------ | -------------------------------------------------------- |
| Claude Code    | 本 fork 的 `@mattpocock` marketplace | 否。发布新 version 后更新或重装 plugin                   |
| Codex          | skills.sh                            | 否。运行 `npx skills@latest update`，并重新 `add` 新 skills |
| Copilot CLI    | skills.sh                            | 否。运行 `npx skills@latest update`，并重新 `add` 新 skills |
| VS Code        | skills.sh                            | 否。运行 `npx skills@latest update`，并重新 `add` 新 skills |
| Gemini CLI     | skills.sh                            | 否。运行 `npx skills@latest update`，并重新 `add` 新 skills |
| 其他所有 agent | skills.sh                            | 否。运行 `npx skills@latest update`，并重新 `add` 新 skills |

## Claude Code：plugin

<canonical-block name="claude-code">

先添加中文 fork marketplace，再安装其中的 plugin：

```text
/plugin marketplace add oldwinter/mattpocock-skills
/plugin install mattpocock-skills@mattpocock
```

也可以在 shell 中执行：

```bash
claude plugin marketplace add oldwinter/mattpocock-skills
claude plugin install mattpocock-skills@mattpocock
```

这是中文 fork 自带的 marketplace；不要改成上游官方 marketplace 的无前缀安装命令，否则会安装英文上游版本。

</canonical-block>

## 其他 agent 或可编辑文件：skills.sh

Plugin 只适用于 Claude Code。其他环境通过 [skills.sh](https://skills.sh/oldwinter/mattpocock-skills) 把可编辑的中文 skill 文件复制进项目。`README.md` 使用整套安装形式：

<canonical-block name="skills-sh-whole-set">

```bash
npx skills@latest add oldwinter/mattpocock-skills
```

选择要安装的 skills 和目标 coding agents。**安装器允许按需选择；务必包含 `setup-matt-pocock-skills`。** 更新时运行 `npx skills@latest update`，并重新运行 `add` 获取新增的 skills。

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

不要向中文 fork 用户提供 `claude plugin install mattpocock-skills@claude-plugins-official`、`codex plugin marketplace add mattpocock/skills`、`copilot plugin marketplace add mattpocock/skills`、`gemini skills install https://github.com/mattpocock/skills.git` 或 `npx skills@latest add mattpocock/skills`。这些命令都指向英文上游 runtime，会绕过本 fork 的中文 `SKILL.md`。
