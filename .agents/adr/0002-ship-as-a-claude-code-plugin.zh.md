# 将 skill set 发布为原生 Claude Code plugin，暂缓原生 Codex plugin

这些 skills 一直可以通过 [skills.sh](https://skills.sh/mattpocock/skills)（`npx skills add mattpocock/skills`）安装。它会把可编辑的 skill files 复制进用户项目，并支持 Claude Code、Codex 和其他遵循 Agent Skills 标准的 harness。一个反复出现的需求是 **plug-and-play** distribution：订阅一套只读、始终保持最新、无需自己编辑的 bundle，而不是维护自有 fork。原生 plugin system 正好提供这种能力。

我们现在发布原生 **Claude Code plugin**，并暂时**推迟**原生 **Codex plugin**。两者的差异来自各自 plugin manifest 在本 repo bucket layout 下选择 skills 的方式。

## 约束：bucketed skills 与 single-path selection

Skills 位于 `skills/` 下的 bucket folders 中：`engineering/` 和 `productivity/` 是会发布的 **promoted** buckets；`misc/`、`personal/`、`in-progress/` 和 `deprecated/` 不会发布。Plugin 必须只暴露跨越两个 bucket folders 的 promoted set。

- **Claude Code**：`.claude-plugin/plugin.json` 的 `skills` 接受**明确 skill-directory paths 的 array**。我们逐项列出 promoted skills，毫无歧义地排除其他内容，并添加 `.claude-plugin/marketplace.json`，让 repo 本身成为 single-plugin marketplace。End-to-end 验证已经通过：`claude plugin validate . --strict` 成功，`marketplace add` -> `install` 也能 resolve 全部 promoted skills。

- **Codex**：`.codex-plugin/plugin.json` 的 `skills` 只接受**单个 path string**（array 会被拒绝并报告 `missing or invalid plugin.json`），随后递归发现该 path 下的 `SKILL.md`。单个 path 无法同时指定两个 bucket folders，也无法从中筛选 subset。已经测试并排除两种绕行方案：
  - 指向 `./skills/` 会把 `deprecated/`、`in-progress/`、`personal/` 和 `misc/` 一并发布，包括我们刻意不推广的 retired、draft 和 personal skills。
  - 建立一个只包含指向各 buckets 的 **symlink** 的 curated flat directory，在安装后无法存活：Codex 会把 plugin tree 复制进 cache 并**丢弃 symlinks**，最终 skills 内容为空。

要为 Codex 提供单一且只包含 promoted skills 的 path，可靠方案只有两种：（a）重构目录，让 `skills/` 只包含 promoted skills，把其余 buckets 移出；这会波及 `CLAUDE.md`、`scripts/link-skills.sh`、bucket READMEs，以及依赖 `in-progress/` 和 `personal/` 的 local development workflow。（b）把 promoted skills 的 duplicate copies 提交到 flat directory；这会带来同步负担和第二份 source of truth。两者都是 structural decision，不应夹带在 Claude plugin 发布中。这很可能也是此前迟迟没有发布 plugin 的原因：manifest formats 无法干净表达 bucketed repo 中的 curated subset。

## Decision

- 现在发布 **Claude Code plugin**（`.claude-plugin/plugin.json` + `.claude-plugin/marketplace.json`），只包含 promoted set，并把它作为 v1.2 的 headline deliverable。
- 保留 **skills.sh** 作为 universal installer；它已经支持 Codex 和其他 harness，因此 Codex 用户仍有完整安装路径。
- 暂缓原生 **Codex plugin**，直到我们在“把 `skills/` 重构为 promoted-only”与“提交 generated flat copy”之间作出选择。当 Codex 支持 `skills` array/include-list，或安装时保留 symlink 后，再重新评估。

## 由此产生的 invariants

- 每个 promoted skill 都必须出现在 `.claude-plugin/plugin.json` 的 `skills` array 中。这原本就是 `CLAUDE.md` 的规则，现在也直接约束 plugin content。
- `.claude-plugin/plugin.json` 的 `version` 跟随 `package.json` version；release 时两者同时 bump。Claude 使用 plugin `version` 判断 installed users 何时能看到 update。

## 更新：2026-08-05

上游 `mattpocock-skills` 已进入 Claude Code 官方 marketplace（配置名 `claude-plugins-official`，来源仓库 `anthropics/claude-plugins-official`）。上游因此把 `claude plugins install mattpocock-skills` 作为默认入口；`.claude-plugin/marketplace.json` 在上游仅保留为直接安装仓库、未发布提交或 fork 的 fallback。

官方 listing 指向 `https://github.com/mattpocock/skills.git`，不会分发本中文 fork。因此，这条上游安装路径**不适用于中文版**。中文 fork 继续把自己的 `.claude-plugin/marketplace.json` 作为正式 Claude Code 入口：

```bash
claude plugin marketplace add oldwinter/mattpocock-skills
claude plugin install mattpocock-skills@mattpocock
```

中文 fork 的固定安装措辞以 [`.agents/install-block.md`](../install-block.md) 为准；不能用上游官方 marketplace 命令替换，否则用户会得到英文 runtime。
