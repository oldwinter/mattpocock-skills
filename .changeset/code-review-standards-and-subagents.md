---
"mattpocock-skills": patch
---

`code-review` 现在会搜索 repo 中的 standards files，并把 `CODING_STANDARDS.md` / `CONTRIBUTING.md` 交给 Standards sub-agent（#1065）；它会在前台运行两个 sub-agents 并使用它们返回的 reports（#1073）；issue tracker 改为通过已提供的 tracker doc 解析，不再依赖 hard-coded path（#937）。
