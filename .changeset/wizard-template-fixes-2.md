---
"mattpocock-skills": patch
---

`wizard` template 修复：`_existing` 会解码双引号包裹的 `.env` value，因此按 Enter 保留当前值不再把引号写回（#1220）；stages 在 `run_wizard` 内运行，所以运行中编辑 script 不会把它杀掉（#1142）；`tput clear` 失败时，`_clear` 回退到 ANSI（#1081）；`write_env` 也会设置 shell variable（#1041）；移除未使用的 `RED`（#1003）。
