# Issue tracker integrations are limited to mainstream tools

`setup-matt-pocock-skills` 只为 **mainstream** issue trackers 提供 first-class support。为 niche、新兴或 single-vendor experimental trackers 添加支持的请求 out of scope。

## Why this is out of scope

每个 issue-tracker backend 都会把一种 CLI shape hard-code 到 skills 中（commands、flags、output parsing）。每个新 backend 都是 permanent maintenance surface：它必须随着该 tool 的 CLI evolve 持续可用，也必须持续针对 `/to-spec`、`/to-tickets`、`/triage` 和相关 skills 被测试。只有当相当比例的用户真的使用某个 tracker 时，这个成本才值得支付。

“Mainstream” 是 judgment call，不是 numeric bar：

- GitHub、GitLab 和 Backlog.md 是我们会认为 mainstream 的工具类型：broadly known、widely used、早已过 experimental phase。
- 一个全新的 agent-focused tool，即使 design 很有趣、拥有几百个 GitHub stars，也不是 mainstream。

Stars、age 和 download counts 在做判断时是 useful signals，但它们都不是 rule。Rule 是：typical engineer 会 recognize 这个 tool，并 plausible 地为他们 team 选择它吗？

Non-mainstream trackers 的 escape hatches 已经存在：

- `local markdown`，用于 lightweight in-repo tracking。
- `other/custom`，用于想自己 wire something up 的用户。

两者都不要求 core skills 知道 specific tool。

## Prior requests

- #99 — “Add dex as an issue tracker backend”（请求时 dex 大约 3 个月大，约 300 stars）
