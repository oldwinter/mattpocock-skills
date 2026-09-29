---
"mattpocock-skills": patch
---

新增 `pr` skill（in-progress bucket，model-invoked）。它是 PR 正文结构参考，而不是 workflow。模板位于开头，后面用简短章节解释各部分。Summary 必须来自 primary source，也就是 issue 或 spec，不能从 diff 推断。正文先说明规模，并判断是 one-way door 还是 two-way door。"The shape of the change" 几乎逐字复现 `show-me`，出处记录在该 skill 的 `CREDITS.md` 中，但应用对象从 conversation 改为 diff。Evidence 使用 before/after 对；优先提供 visual，没有 visual 时提供从 failing 到 passing 的 test run。正文还要单独列出有意排除的内容。关联 #521、#938、#509 和 #915。
