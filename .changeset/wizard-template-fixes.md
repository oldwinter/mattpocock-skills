---
"mattpocock-skills": patch
---

`wizard` template 修复：`ask` 使用 Readline，因此 arrow keys 可以移动 cursor（#741）；`write_env` 用单引号包裹 values，使 spaces、`#`、`$` 和 quotes 能在 `source` 与 dotenv 中保留（#770）；没有 browser opener 时，`open_url` 会打印自行打开链接的 warning（#774）；`write_env` 可透过 symlink 写入 `.env`，并保留已有 file 的 mode（#811）；`ask` 和 `ask_secret` 在 EOF 时失败，不再循环（#852）。
