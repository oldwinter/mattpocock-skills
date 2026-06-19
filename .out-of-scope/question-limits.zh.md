# Hard limits on the number of questions during grilling

`/grill-me` skill（以及其他 skills 内的 grilling sessions）不会 enforce maximum number of questions。添加 configurable cap 或 hard ceiling 的请求 out of scope。

## Why this is out of scope

Grilling 故意是 open-ended。重点是持续挖掘，直到 decision tree 的每个 branch 都被 resolved：有些 plans 需要三个问题，有些需要五十个。Fixed cap 要么会在 hard problems 上 cut off useful exploration，要么在 easy ones 上显得 arbitrary。

如果 session 感觉太长，正确的 escape hatches 已经存在：

- 用户可以随时 stop session，并 accept plan 的 current state。
- 用户可以告诉 model wrap up、summarise、move on；natural-language steering 是 intended control surface，而不是 numeric limit。

添加 hard cap 还会混淆两个不同 failure modes：model 因为 plan genuinely under-specified 而问很多问题（working as intended），以及 model 问 redundant 或 low-value questions（prompt-quality issue，不是 quantity issue）。后者的 fix 属于 skill prompt，而不是 counter。

## Prior requests

- #44 — “Codex just asked me 200 questions”
