---
"mattpocock-skills": patch
---

`chief-of-staff` 现在把记忆保存在 LLM wiki 中（一个 `index.md` 加每个 topic 一个 page，通过 ingest、query 和 lint 维护），并按历史记录写入：每条 claim 都有日期，每条关于 code 的 claim 都引用它当时为真的 commit。
