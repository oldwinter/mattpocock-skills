---
"mattpocock-skills": minor
---

将 **`wayfinder`** 改为 collaborative：把 map 从本地 Markdown 文件移到 repo 的 Issue tracker 上。

map 现在是一个单独的 `wayfinder:map` Issue，其 children 是相关 Issues：一个全团队都能观看和评论的共享 URL。Blocking、claiming（`wayfinder:claimed`）和 frontier query 都使用 tracker 原生 semantics，因此 session 以低分辨率加载 map（Notes、每个 closed Issue 的一个 context pointer、Fog prose），并按需 zoom 到 individual Issues，而不是每次加载整个 map。

Wayfinder 保持 tracker-agnostic：每个 tracker 的 mechanics 都通过 `docs/agents/issue-tracker.md` 中的 pointer 表达，因此 `setup-matt-pocock-skills` 现在为 GitHub、GitLab 和 local-markdown 播种 “Wayfinding operations” section。缺少该 doc 时，Wayfinder 默认使用 local-markdown。
