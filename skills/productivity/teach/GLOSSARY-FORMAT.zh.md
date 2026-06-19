# GLOSSARY.md Format

`GLOSSARY.md` 是此 teaching workspace 的 canonical language。所有 explainers、exercises 和 learning records 都应遵守其 terminology。构建它本身就是 learning 的一部分：将 concept 压缩成 tight definition，是用户理解它的 evidence。

## Structure

```md
# {Topic} Glossary

{一两句话描述此 glossary 覆盖的 topic。}

## Terms

**Hypertrophy**:
Muscle growth driven by mechanical tension and metabolic stress over repeated training sessions.
_Avoid_: Bulking, getting big

**Progressive overload**:
Systematically increasing the demand on a muscle over time — via load, volume, or intensity.
_Avoid_: Pushing harder, levelling up

**RPE (Rate of Perceived Exertion)**:
A 1–10 self-rating of how hard a set felt, where 10 is failure and 8 means two reps left in the tank.
_Avoid_: Effort score, intensity rating
```

## Rules

- **只有当用户理解 term 后才 add。** Glossary 是 compressed knowledge 的 record，不是用户读来学习的 dictionary。如果用户刚接触某个 concept，等他们能正确使用后再 promote 到这里。
- **Be opinionated.** 当多个词表示同一 concept 时，选择最好的那个，并把其余作为 aliases to avoid 列出。这就是 language compression 的方式。
- **Keep definitions tight.** 一两句话。定义 term IS 什么，而不是它 does 什么或如何做。
- **在 definitions 中使用 glossary 自己的 terms。** 一旦 term 进入 glossary，就在各处偏好使用它，包括其他 definitions 内。这会让后续复杂 terms 更容易 grasp。
- **自然出现 clusters 时，用 subheadings 分组**（例如 `## Anatomy`、`## Programming`）。当 terms cohese 时，flat list 也可以。
- **明确 flag ambiguities。** 如果某个 term 在 wider field 中被 loose 使用，note resolution：“In this workspace, 'set' always means a working set — warm-ups are tracked separately.”
- **随着 understanding deepens revise。** 用户 week one 写的 definition 到 week six 可能是错的。Update in place；不要留下 stale entries。
