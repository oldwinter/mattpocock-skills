---
"mattpocock-skills": minor
---

将 **`decision-mapping`** skill 重命名为 **`wayfinder`**，调用方式为 `/wayfinder`。

“Decision map” 太 jargon，也不准确；四种 Issue types 中只有一种（Grilling）真的是 decision。新 framing 是在 foggy problem 中绘制路线，一次解决一个 investigation Issue，直到通往目标的道路清晰。这形成一个 coherent leading-word frame（fog of war / frontier / the map），不再把 invented term 混在上面。

同时做 pruning pass：统一 `node` -> `Issue`，把 “the frontier” 绑定到 unblocked Issues，移除重复的 “one question at a time”（由 `/grilling` 拥有），并裁掉 intro no-ops。
