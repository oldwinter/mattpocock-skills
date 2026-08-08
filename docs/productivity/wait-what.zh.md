## What it does

`wait-what` 修正上一条没有讲明白的消息。它补上缺失 context，使用 ASD-STE100 Simplified Technical English，并采用 `CONTEXT.md` 中已经约定的 ubiquitous language 重新解释。

它只重讲刚才的内容，不开启新的教学流程，也不把原答案继续扩展成更长的 exposition。

## When to reach for it

当 conversation 中某条消息没有落地时输入 `/wait-what`；agent 不会自行触发。它可以在任何其他 skill 的中途使用。

| 情况 | 使用什么 |
| --- | --- |
| 只是不理解上一条消息 | `wait-what` |
| 想系统学习一个 concept，并跨 sessions 保存进度 | [teach](https://aihero.dev/skills-teach) |
| 想在 work 开始前建立 shared language | [grill-with-docs](https://aihero.dev/skills-grill-with-docs) |

## It's working if

- 新解释先补最少必要 context，再用 plain language 重讲。
- Project terms 与 `CONTEXT.md` 一致。
- 解释比原消息更容易跟上，而不是仅换一组同样抽象的 words。

## Where it fits

`wait-what` 是随时可插入 conversation 的 corrective standalone。[grill-with-docs](https://aihero.dev/skills-grill-with-docs) 是事前建立 shared language 的方法，`wait-what` 则负责事后修复没有讲清楚的单条消息。
