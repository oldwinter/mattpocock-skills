---
"mattpocock-skills": patch
---

强化 Wayfinder 的 blocking rule，优先使用 tracker 的 native dependency relationship，并更新 GitHub 和 GitLab issue-tracker templates。

Native blocking 不是 cosmetic，而是 essential：它会在 tracker 自身 UI 中可视化 frontier，让人无需打开 map 就能一眼看到哪些 Issue 可接。`wayfinder` 的 `SKILL.md` 现在说明这项 preference 和 rationale；GitHub template 写明 native issue-dependencies recipe（`gh api .../dependencies/blocked_by`，以及基于 `issue_dependencies_summary.blocked_by` 的 frontier query）；GitLab template 命名 native `/blocked_by` blocking link（Premium/Ultimate）及 body-convention fallback。两者都为缺少 native blocking 的 tracker 保留 body fallback。
