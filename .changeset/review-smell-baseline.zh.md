---
"mattpocock-skills": patch
---

为 in-progress 的 **`code-review`** skill 在 Standards 轴增加始终启用的 Fowler smell baseline。一组 curated、约 12 个高信号 “Bad Smells in Code”（Mysterious Name、Duplicated Code、Feature Envy、Data Clumps、Primitive Obsession、Repeated Switches、Shotgun Surgery、Divergent Change、Speculative Generality、Message Chains、Middle Man、Refused Bequest）被 inline 到 `SKILL.md`，作为 repo documents 旁边的固定 baseline，而不是第三个新轴。两条 binding rules 保证它安全：文档化 repo standard 会覆盖 baseline；每个 smell 都作为 judgement call 报告，而不是硬性违规。
