---
name: research
description: 根据高可信的一手来源调查一个问题，并把 findings 作为 Markdown 文件记录在 repo 中。用于用户希望研究某个主题、收集文档或 API facts，或把阅读工作交给 background agent 的场景。
---

启动一个 **background agent** 做 research，这样你可以在它阅读时继续推进其他工作。

它的任务：

1. 根据**一手来源**调查问题，例如官方文档、源代码、规范、first-party APIs；不要依赖二手总结。每个 claim 都要追溯到拥有该事实的 source。
2. 将 findings 写入一个 Markdown 文件，并为每个 claim 引用其来源。
3. 保存到 repo 已有的 notes 位置；遵循现有惯例。如果没有惯例，就放到合理位置并说明路径。
