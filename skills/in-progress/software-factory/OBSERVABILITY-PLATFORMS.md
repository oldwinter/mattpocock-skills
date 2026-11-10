# Observability platforms

> 调查于 2026-10，不保证仍然最新。用它建立方向，然后自行研究当前选项：产品、价格、限制和 betas 变化很快。

用于填充 observability platform slot，或决定有意选择 none 的方向说明。类型按 **人类需要在 run 内部看到什么** 划分：它的 log、它的 agent trace（每次 model call 和 tool call 作为一个 span），还是该 trace 与用户系统其余部分连接后的视图。Self-hosted 与 SaaS 横跨后三种类型。当 run 应根据平台所见采取行动时，把平台变成 ticket source：monitor 提交 ticket，run 读取它。

## How runners hook in

每种类型都通过五种 hooks 之一接收数据。填充 slot 时，把 hook 与产品一起指名。

- **Harness OTel**：agent harness 自己导出 OpenTelemetry。Claude Code 和 Claude Agent SDK 使用 `CLAUDE_CODE_ENABLE_TELEMETRY=1` 加 `OTEL_*` variables，prompts 和 tool output 需 opt-in；Codex CLI 使用 `config.toml` 中的 `[otel]` block。（[Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/observability)、[Claude Code](https://code.claude.com/docs/en/monitoring-usage)、[Codex config](https://developers.openai.com/codex/config-advanced)）
- **Platform push**：model platform 替你发送 traces，例如 Claude Managed Agents 发送到 Claude Console 中设置的 OTLP destination。（[Claude docs](https://platform.claude.com/docs/en/manage-claude/opentelemetry/api)）
- **SDK wrapper**：runner code 中的一次调用，例如 LangSmith 的 `configure_claude_agent_sdk()`。
- **Hook plugin**：Claude Code hook 在每次 Stop 时读取 session transcript 并发送，例如 Langfuse 的 Claude Code plugin。
- **Gateway**：runner 的 model base URL 指向 logging proxy。Runner 无需任何 code，但它只能看到 model calls：harness 内部的 tool calls 不可见。

OpenTelemetry 是共同的 wire：harness OTel 和 platform push 都能落到任何 OTLP backend。GenAI semantic conventions（`invoke_agent`、`chat`、`execute_tool` spans）仍在稳定中，因此 span names 可能漂移。（[OTel GenAI agent spans](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-agent-spans)）

## Type 1: None（runner 或 orchestrator 产品已显示足够信息）

**它是什么**：人类在 runner 或 orchestrator 已经显示 run 的地方阅读每次 run：CI run page、sandbox dashboard、保存为 run artifact 的 agent transcript。无需构建 hook，与 runner 一样 self-hosted，并包含在其成本中。

**Factory 何时选择它**：每天 runs 很少、只有一个人观察，问题是 "did it fail, and what did it print?"。大多数 factories 从这里开始，当需要跨 runs 搜索、per-run token 或 cost rollup，或保留时间长于 runner 时，就会成长到下一类。

**起点**：[GitHub Actions run logs](https://docs.github.com/en/organizations/managing-organization-settings/configuring-the-retention-period-for-github-actions-artifacts-and-logs-in-your-organization)、[E2B sandbox logs and metrics](https://e2b.dev/docs)、[Daytona sandbox telemetry](https://www.daytona.io/docs/en/observability/otel-collection/)、[OpenAI Agents SDK traces](https://openai.github.io/openai-agents-python/tracing/)。Sandbox 产品常通过 OTLP 转发同样的数据，这是通向 Type 2 的路径。

**待验证**：每个 runner 产品的 retention days；某些 sandboxes 保留很少（截至 2026-10，Daytona 为 3 天）。

## Type 2: LLM and agent tracing platform

**它是什么**：围绕 agent trace 构建的 backend：每次 run 是一棵 model calls 和 tool calls 的树，带 token cost、prompts 和 sessions，通常还叠加 evals 和 datasets。

**Factory 何时选择它**：人类要跨许多 runs 问 "why did the agent do that?"；retro run 或人类比较 runs；token 支出需要 per-run rollup。Self-hosting 一个 open-source 版本可让 transcripts 留在内部。

**该类型的特征**：接受 harness OTel、SDK wrapper 或 hook plugin，通常也接受 platform push。按量计费，而 agent runs 的 span 很密集（每次 tool call 一个 span），因此按 run 而非按 request 做预算。

**起点**：[Langfuse](https://langfuse.com/pricing) 和 [Arize Phoenix](https://phoenix.arize.com)（open source，可 self-host）、[LangSmith](https://www.langchain.com/pricing-langsmith)、[Braintrust](https://www.braintrust.dev/pricing)。

**待验证**：free-tier limits、计费单位（trace、span、unit 或 GB；Braintrust 在 2026-03 改为 GB）、哪个 tier 解锁 self-hosting，以及当前 ownership。

## Type 3: General APM and logging backend

**它是什么**：用户现有的 observability stack（logs、metrics、每个 service 的 distributed traces），再加上 agent 或 LLM view。

**Factory 何时选择它**：团队已经为它付费；runs 需要与 app 自己的 traces 连接（Agent SDK 会传播 `TRACEPARENT`，因此 run 嵌套在调用者的 trace 中）；或 monitor ticket source 已从中读取。

**该类型的特征**：harness OTel 直接发到 vendor 的 OTLP endpoint。按 GB、event 或 host 计价，因此 factory 的量在现有账单上是舍入误差，在新账单上则可能是意外。

**起点**：[Datadog Agent Observability](https://www.datadoghq.com/product/llm-observability/)、[Grafana Cloud](https://grafana.com/pricing/)、[Honeycomb](https://www.honeycomb.io/pricing)、[SigNoz](https://signoz.io/pricing/)（open source）。

**待验证**：agent view 是 GA 还是 preview、哪些 harnesses 有 setup guide，以及 free-tier volumes。

## Type 4: LLM gateway with request logging

**它是什么**：位于 runner 和 model provider 之间的 proxy，记录每个 request 和 response，同时提供 routing、keys、budgets 和 caching。

**Factory 何时选择它**：用户想要 per-run spend caps，或为许多 runners 提供一个 key vault，而 logging 随之而来；或 harness 自身没有导出。它只能看到 model calls，因此要搭配 Type 2 或 3 来获取 tool calls。

**起点**：[LiteLLM Proxy](https://docs.litellm.ai/docs/proxy/logging)（open source，把 logs 转发到 Langfuse 或 OTel）、[Portkey](https://portkey.ai/pricing)。

**待验证**：SaaS 的 per-request pricing，以及产品是否仍在积极开发（截至 2026-10，Helicone 在被收购后进入 maintenance mode）。

## Researching further

用决定此 slot 的问题检查每个 candidate：

1. **Runner 或 orchestrator 已经显示足够信息了吗？** 把人类需要的内容（cross-run search、per-run cost、retention）与 run page 或 sandbox dashboard 提供的内容对照。是的话，就是有意选择 none。
2. **Agent harness 如何导出 traces？** 找出 harness 支持五种 hooks 中的哪些，以及产品接受哪些。确认 tool calls 以 spans 到达，以及 prompts 和 tool output 是否需要 opt-in。
3. **它能否 self-host？** Licence、哪个 tier 允许，以及运行在什么之上。当 transcripts 必须留在内部时，这是决定性的。
4. **成本形态是什么？** 计费单位、free tier，以及在每次 tool call 一个 span 的前提下估算 per-run 成本，再乘以每天的 runs。
5. **Retention 多长？** 每个 tier 保留多少天，对照 run 出错时人类会回看多久。

**答案在哪里**：vendor 的 pricing page（units、tiers、retention）；vendor 针对特定 harness 的 integration doc；harness 自己的 monitoring docs（导出什么、哪些 flags 是 beta）；OpenTelemetry GenAI semantic conventions；产品的 repo（licence 和 release activity）；vendor 的 changelog 或 blog（ownership 变化）。

**最快过时的内容**：free-tier limits 和价格；beta 和 preview flags（Claude Code trace export、Console platform push、vendor agent views）；ownership 和 maintenance status；billing units；retention days；GenAI span names。
