---
"mattpocock-skills": minor
---

为 **`grilling`** 增加 confirmation gate：在你确认 shared understanding 已达成前，agent 不会执行 plan，把该 skill 既有的 “shared understanding” completion criterion 变成显式 stop-gate。`description` 也引入 pretrained **`grill`** leading word（“Grill the user relentlessly”）来加强 invocation，并让 docs page 与新的 gate 行为重新同步。
