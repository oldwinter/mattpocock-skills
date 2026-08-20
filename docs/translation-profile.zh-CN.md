# Matt Pocock Skills 中文本地化档案

同步上游后，先读本档案，再翻译新内容。

## 项目定位

- 上游项目：`https://github.com/mattpocock/skills`
- 中文 fork：`https://github.com/oldwinter/mattpocock-skills`
- 安装入口：`npx skills@latest add oldwinter/mattpocock-skills`
- Runtime：`skills` CLI 会扫描 `skills/**/SKILL.md`；`.claude-plugin/plugin.json` 只标识 promoted skills，不能用它限制 CLI 的本地发现范围
- 当前同步上游 commit：`0ab1b63a410a03d3627979a109c8695de27af954`

## 本地化目标

本 fork 的每个可发现 skill runtime 都必须直接读取中文 `SKILL.md`，不能只提供不会被 agent 自动加载的 `SKILL.zh.md` sidecar。Sidecar 可以保留，便于与上游同步和人工阅读，但它必须与对应中文主入口保持一致。

## 语气

- 面向开发者使用自然、简洁的中文，避免逐词直译。
- 常见工程词可以保留英文，例如 skill、agent、runtime、issue tracker、spec、ticket、seam、workflow。
- 操作步骤先给动作，再解释原因。

## 术语表

| 英文 | 中文处理 | 备注 |
|---|---|---|
| skill | skill | 保留英文小写 |
| agent | agent | 角色与 runtime 语境保留英文 |
| issue tracker | issue tracker | GitHub、GitLab、local markdown 等统一入口 |
| spec | spec / 规格说明 | 与上游 `to-spec` 对齐 |
| ticket | ticket | 与 `to-tickets`、blocking edges 保持一致 |
| seam | seam / 测试接缝 | 首次出现可补中文解释 |
| upstream | 上游 | 指 `mattpocock/skills` |
| fork | fork | GitHub fork 语境保留英文 |

## 不翻译清单

- Frontmatter key、skill slug、命令、路径、URL、label string、JSON key。
- Markdown template tag、代码块、shell command、tracker protocol 和精确文件命名约定。
- 测试 fixture、snapshot、golden string，以及会影响 agent 执行语义的标识符。
- `agents/openai.yaml` 的 key、`display_name`、policy 和布尔值；其中面向 picker 的 `short_description` 应翻译为中文。

## Runtime 规则

- `skills` CLI 能发现的每个 `skills/**/SKILL.md` 都必须中文化，包括 deprecated、misc、personal 与 in-progress buckets；它们仍可能出现在 CLI 选择列表中。
- `.claude-plugin/plugin.json` 中的 promoted skills 还必须出现在 top-level README、bucket README 与 docs tree 中。
- 对应 `SKILL.zh.md` 存在时，应与 `SKILL.md` 保持一致；不能让 sidecar 比 runtime 更新。
- 新增或改名 skill 时，同步更新 `README.md`、bucket `README.md`、`ask-matt` router 和相应 docs page。
- 上游删除或改名文件时，删除失效的中文 sidecar，避免留下不可达文档。

## 同步后检查

- `git diff --check`
- 精确冲突标记扫描：`rg -n '^(<<<<<<< .+|=======|>>>>>>> .+)$' .`
- 所有 `skills/**/SKILL.md` 都包含中文；当前同步版本共 35 个 discoverable runtime entries。
- 每个 promoted `SKILL.md` 与对应 `SKILL.zh.md` 一致。
- 每个 `skills/**/agents/openai.yaml` 都保留完整 schema，且 `short_description` 已中文化。
- README 中文安装命令指向 `oldwinter/mattpocock-skills`，而不是上游 repo。
- 运行仓库提供的测试或一致性检查，并手动验证安装器会读取主 `SKILL.md`。
