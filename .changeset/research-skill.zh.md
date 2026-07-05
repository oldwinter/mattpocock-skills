---
"mattpocock-skills": minor
---

新增 **`research`** skill：一个小型 model-invoked skill，会启动 **background agent**，基于 **primary sources**（官方文档、source code、specs、first-party APIs）调查问题，然后在 repo 惯用 notes 位置留下单个带引用的 Markdown 文件。它是可委派的阅读工作：你继续推进，它负责阅读，最后给你一份可用于 grilling、planning 或 design 的文档。它已列入 top-level 和 Engineering READMEs（Model-invoked）、加入 `.claude-plugin/plugin.json`、拥有 `docs/engineering/research.md` docs page，并作为 Standalone 被接入 `ask-matt`。
