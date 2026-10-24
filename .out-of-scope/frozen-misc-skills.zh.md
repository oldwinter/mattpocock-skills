# `misc/` skills 的改动

`skills/misc/` 下的 skills（`git-guardrails-claude-code`、`migrate-to-shoehorn`、`scaffold-exercises`、`setup-pre-commit`，以及之后进入该目录的任何内容）已冻结。针对它们的 bug report、feature request 和 PR 都会关闭。

## 为什么不在范围内

`misc/` 用于放置我保留但很少使用的 skills。它们不 promoted：不随 Claude Code plugin 发布，没有 docs page，我也不是每天运行，因此无法判断一个 fix 是否正确，也无法及时发现某项改动破坏了其他内容。按 promoted skills 的同一标准维护它们，成本与维护一个 promoted skill 相同，但使用量只占一小部分。

它们仍以未维护状态留在 repo 中，因为对一些人来说仍可按现状使用。如果其中一个对你不适用，用 skills.sh 安装后修改自己的副本：这些 files 由你编辑。

如果某个 `misc/` skill 之后重新晋升到 `engineering/` 或 `productivity/`，从那一刻起重新进入范围。

## 此前的 requests

- #14：“Potential typo in setup-pre-commit/SKILL.md”
- #301：“`block-dangerous-git.sh` is bypassed by any git global option (e.g. `git -C <dir> push`)”
- #465：“git-guardrails-claude-code documentation is missing benefits over built in Claude code deny rules”
- #898：“git-guardrails-claude-code: hook fails open without jq and misses common git spellings”
