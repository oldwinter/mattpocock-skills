---
"mattpocock-skills": patch
---

retro：编写 coding-standards finding 前，先判断它属于 mechanical 违规还是 judgement call。Mechanical 违规包括固定语法模式、禁用 API、import shape 和文件位置规则。此类违规改用 deterministic check，例如 linter rule、pre-commit hook 或 CI job。`CODING_STANDARDS.md` 只保留真正需要 judgement call 的内容。Automated checks 还会把完全没有 guardrail 的 repo 作为独立 finding，包括既没有 pre-commit hook，也没有运行 lint、typecheck 或 test 的 CI job。
