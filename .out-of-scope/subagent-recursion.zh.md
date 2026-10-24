# 防止 sub-agents 递归调用 skills 的 guard

Skills 不会增加 guard 来阻止 sub-agents 递归调用 skills 或生成嵌套 agents（例如 `/code-review` sub-agent 再次调用 `/code-review`，或 `/research` agent 再生成另一个 agent）。要求增加 leaf-agent instructions、depth limits 或 “do not invoke this skill” lines 的 requests 不在范围内。

## 为什么不在范围内

阻止无限 subagent loop 是 harness 的职责，不是 skills 的职责。Harness 决定 sub-agent 可以触达哪些 tools 和 skills，以及 nesting 能有多深，因此在那里设置的限制会一次覆盖所有 skills。把 guard 写进单个 skill 的 prose，只覆盖该 skill，每次运行都消耗 tokens，而且仍依赖 model 选择遵守。

如果 sub-agent 无限递归或 fan out，请向 harness 报告。

## 此前的 requests

- #530：“research skill: spawned background agent can recursively re-spawn another agent (uncontrolled nesting)”
- #573：“code-review sub-agents recursively invoke /code-review and fan out”（PR #1186 “code-review: make the Standards and Spec sub-agents leaf reviewers”，已关闭）
