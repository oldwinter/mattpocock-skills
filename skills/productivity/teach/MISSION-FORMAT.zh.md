# MISSION.md Format

`MISSION.md` 位于 workspace root。它捕获用户学习此 topic 的 _reason_。每个 teaching decision：下一步教什么、surface 哪些 resources、设计哪些 exercises，都应 trace back 到此 document。

## Template

```md
# Mission: {Topic}

## Why
{1-3 sentences. 用户追求的 concrete real-world goal。当他们拥有这个 skill 后，生活或工作会发生什么变化？Avoid abstract framings like "to understand X" — push for the underlying outcome.}

## Success looks like
- {A specific, observable thing the user will be able to do}
- {Another specific thing}
- {…}

## Constraints
- {Time, budget, prior commitments, learning preferences, anything that bounds the approach}

## Out of scope
- {Adjacent topics the user explicitly does not want to chase right now — protects the zone of proximal development}
```

## Rules

- **One mission per workspace.** 如果用户想学两个 unrelated things，那就是两个 workspaces。
- **Concrete over abstract.** “Run a half marathon by October” 胜过 “get fitter”。“Ship a Rust CLI to my team” 胜过 “learn Rust”。
- **Push back on vagueness.** 如果用户无法 articulate why，在写任何内容前 interview 他们。Bad mission 比 no mission 更糟。
- **Revise when reality shifts.** Missions 会改变。当用户 goal 移动时，更新此 file，不要让 stale mission steer future sessions。
- **Keep it short.** 如果 `MISSION.md` 超过一屏，它就不再是 compass，而开始变成 plan。
