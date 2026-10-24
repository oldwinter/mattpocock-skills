---
"mattpocock-skills": patch
---

`setup-matt-pocock-skills` 现在会在 GitHub/GitLab 上创建缺失的 triage labels（#616），修复 GitLab template 的 `glab` commands（#635），使用 `--json` 读取 GitHub issues，以确保 labels 和 body 正常返回（#733），并在 `triage-labels.md` 中明确写出 “Label in our tracker” 列（#801）。重新运行 `/setup-matt-pocock-skills` 可刷新 `docs/agents/`。
