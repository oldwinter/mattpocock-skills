# Issue tracker: Local Markdown

此 repo 的 Issues 和 PRDs 作为 markdown files 存放在 `.scratch/` 中。

## Conventions

- 每个 feature 一个 directory：`.scratch/<feature-slug>/`
- PRD 是 `.scratch/<feature-slug>/PRD.md`
- Implementation issues 是 `.scratch/<feature-slug>/issues/<NN>-<slug>.md`，从 `01` 开始编号
- Triage state 记录为每个 issue file 顶部附近的 `Status:` line（role strings 见 `triage-labels.md`）
- Comments 和 conversation history append 到 file 底部的 `## Comments` heading 下

## When a skill says "publish to the issue tracker"

在 `.scratch/<feature-slug>/` 下创建新 file（按需创建 directory）。

## When a skill says "fetch the relevant Issue"

读取 referenced path 处的 file。用户通常会直接传入 path 或 issue number。

## Wayfinding operations

由 `/wayfinder` 使用。**map** 是一个 file，每个 **child** file 表示一个 Issue。

- **Map**：`.scratch/<effort>/map.md`，body 中保存 Notes / Decisions-so-far / Fog。
- **Child Issue**：`.scratch/<effort>/issues/NN-<slug>.md`，从 `01` 开始编号，body 中保存 question。`Type:` line 记录 Issue type（`research`/`prototype`/`grilling`/`task`）；`Status:` line 记录 `claimed`/`resolved`。
- **Blocking**：文件顶部附近的 `Blocked by: NN, NN` line。它列出的每个文件都 `resolved` 后，Issue 即 unblocked。
- **Frontier**：扫描 `.scratch/<effort>/issues/`，寻找 open、unblocked、unclaimed 的 files；number 最小者获胜。
- **Claim**：任何工作前，先将 `Status:` 设置为 `claimed` 并保存。
- **Resolve**：把 answer append 到 `## Answer` heading 下，把 `Status:` 设置为 `resolved`，然后向 `map.md` 中的 Decisions-so-far 追加 context pointer（gist + link）。
