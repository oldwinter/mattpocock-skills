---
"mattpocock-skills": patch
---

`handoff` 现在明确写出 OS temp directory 的位置（`$TMPDIR`，否则 `/tmp`；Windows 使用 `%TEMP%`），避免 agents 猜测（#272）。
