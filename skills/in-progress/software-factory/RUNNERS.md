# Runners

> 调查于 2026-10，不保证仍然最新。用它建立方向，然后自行研究当前选项：产品、价格、限制和 betas 变化很快。

runner 是 **disposable** 的：每次 run 都从一台 fresh machine 开始，不留下任何东西。五种类型填充这个 slot。它们的主要区别在于谁拥有 agent loop、谁拥有 machine：

| Type | Agent loop | Machine | Also fills |
| --- | --- | --- | --- |
| CI runner | 你的，位于 CI job 内 | CI vendor 的，或你的 | orchestrator、observability platform |
| MicroVM API | 你的，位于 orchestrator 或 runner 上 | provider 的 | 无 |
| Bundled agent platform | vendor 的 | vendor 的 | 部分 orchestrator、observability platform |
| Bring-your-own worker | vendor 的 | 你的 | 部分 orchestrator、observability platform |
| Own VPS or containers | 你的 | 你的 | 无 |

Runner 选择按 run 进行：review runs 用便宜的 CI runner，implementer runs 用 microVM，是正常的设计。

## CI runners

每个 CI job 一台 fresh VM 或 pod，由 git host 自己的 workflow engine 启动；agent CLI 是 job 中的一个 step。Orchestrator 通过 workflow trigger（issue、PR、schedule、manual dispatch）启动 run，concurrency group 防止两个 runs 同时处理同一张 ticket。Hosted runners 天然 disposable；self-hosted runners 通过 ephemeral mode 达到这一点：每个 job 一个 pod，结束后删除。成本按分钟计算。

**选择它的时机**：git host 是 GitHub 或 GitLab，且每个 trigger 都是 git host event 或 clock：workflow file 就是 orchestrator，run page 就是 observability platform，因此一个产品填充三个 slots。

起点：
- [GitHub Actions](https://docs.github.com/en/actions/reference/limits)：all-GitHub factory 的默认选择；[pricing](https://docs.github.com/en/billing/reference/actions-runner-pricing)。
- [Claude Code GitHub Action](https://code.claude.com/docs/en/github-actions)：把 Claude Code 作为 workflow step。
- [GitLab hosted runners](https://docs.gitlab.com/ci/runners/hosted_runners/linux/)：每个 job 一台 ephemeral VM。
- [Actions Runner Controller](https://docs.github.com/en/actions/concepts/runners/actions-runner-controller)：self-hosted，在用户的 Kubernetes 上每个 job 一个 ephemeral pod。

## MicroVM APIs

一次 SDK call 在约一秒内创建隔离的 microVM（vendors 称之为 "sandbox"）；orchestrator 向其中 exec commands，或在其中启动 agent CLI。成本按 vCPU 和 RAM 的秒数计算。Orchestrator 为每次 run 创建一个，结束时 kill，并设置 timeout 作为 backstop。Providers 也出售 persistence（pause/resume、snapshots、drives）；factory 把它当 cache 使用，而 runs 之间的 memory 仍保存在 ticket tracker、git host 和 orchestrator 中。

**选择它的时机**：factory 有自己的 orchestrator（server、queue），希望许多短命、并行的 runs，且不想管理 machines。比较 max run length、concurrency cap，以及等待 model 的时间是否计费：截至 2026-10，Vercel 只对 active CPU 计费，因此那里的 model-wait 时间几乎免费。

起点：[E2B](https://e2b.dev/pricing)、[Daytona](https://www.daytona.io/pricing)、[Modal Sandboxes](https://modal.com/docs/guide/sandboxes)、[Vercel Sandbox](https://vercel.com/docs/vercel-sandbox/pricing)。

## Bundled agent platforms

包含 runner 的 hosted coding agent：vendor 为每次 run 提供 fresh VM 或 container，在其中运行自己的 agent loop，并 push branch 或 PR。只有 branch 会存活。Runs 从 git host 或 ticket tracker 中的 @-mention 或 assignment、chat message、schedule 或 HTTP call 启动，因此平台填充了 orchestrator 的大部分；它的 transcript view 填充 observability platform。成本包含在 seat 或 subscription 中，或按 run 收费。

**选择它的时机**：用户希望活动部件最少，并且满意该 vendor 的 agent。确认它的 triggers 覆盖用户的 ticket tracker。

起点：
- [Claude Code cloud](https://code.claude.com/docs/en/claude-code-on-the-web)，配合 [scheduled tasks](https://code.claude.com/docs/en/routines) 实现 cron、API 和 GitHub event triggers。
- [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview)：API-first；针对 environment 创建 run 并流式接收 events。
- [Codex cloud](https://developers.openai.com/codex/cloud)：每个 task 一个 container。
- [Copilot coding agent](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent)：把 issue 分配给 Copilot；其 runner 是 GitHub Actions runner。

## Bring-your-own worker

Bundled platform 保留其 agent loop 和 runs queue，但 tool calls 在用户托管的 worker 上执行。Worker 向外轮询 vendor，claim 一个 run，执行它，然后退出：与 self-hosted CI runner 形态相同。Disposability 是用户的责任：在 Kubernetes 或 microVM API 下运行 worker，让每次 run 都得到 fresh disk。成本是 vendor 的 seat 或 usage 加上用户的 machines。

**选择它的时机**：用户想要 bundled agent，但 runs 必须访问 private network、把数据留在用户 machines 上，或使用 custom hardware。

起点：[Claude Code self-hosted environments](https://code.claude.com/docs/en/self-hosted-environments)、[Cursor self-hosted pool](https://cursor.com/docs/cloud-agent/self-hosted-pool)、[Copilot coding agent on ARC](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-environment)。

## Own VPS or containers

用户租用或运行的 machine，每次 run 使用 fresh container（或 machine）：machine 可能存活数月，container 只存活一次 run。Max run length 由 orchestrator 设定的 deadline 决定。Disposability 来自 `docker run --rm`、带 `ttlSecondsAfterFinished: 0` 的 Kubernetes Job，或结束时销毁 machine；每个 cache 都位于下一次 run 视为可选的 path 上。成本是固定月费，或运行期间的按秒计费。

**选择它的时机**：runs 长、稳定或繁重，每小时成本占主导，或 server 已经承载 orchestrator。

起点：[Fly Machines](https://docs.fly.io/machines/overview)（[pricing](https://docs.fly.io/about/pricing)）、[Hetzner Cloud](https://www.hetzner.com/cloud/) 加 Docker、[Kubernetes Jobs](https://kubernetes.io/docs/concepts/workloads/controllers/job/)。

## Researching further

### The questions that decide the slot

带着 factory 的 runs，用这些问题检查每个 candidate：

1. **Orchestrator 如何启动一个 run？** workflow trigger、SDK call、@-mention、HTTP call，还是 worker 从 vendor queue 中 claim。它是否适配 design 已指名的 orchestrator？
2. **Max run length 和 concurrency cap 是多少？** 找出默认 timeout 和上限、按 plan tier 的差异，以及达到上限时会发生什么。把它们与 design 中最长的 run 和最繁忙的 burst 对照。
3. **成本形态是什么？** 按分钟、按 vCPU 和 RAM 秒数、仅 active CPU、按 run、按 seat，还是固定月费。等待 model 的时间是否计费？model tokens 包含在价格内还是另计？
4. **Disposability 如何实现？** 默认 fresh、ephemeral flag，还是 orchestrator 自行 teardown。有哪些 persistence 功能，design 能否只把它们用于 caches？
5. **Run 能访问什么？** private network access、outbound firewall 或 allowlist、secrets 如何到达 runner，以及还有谁能读取它们。
6. **它还填充哪些其他 slots？** 把它读取的 triggers 计为 orchestrator 覆盖，把 run page 或 transcript 计为 observability platform 覆盖。

### Where the answers live

- Vendor 的 **limits or quotas page** 和 **pricing page**，优先于 landing page。
- 创建调用的 **SDK or API reference**：timeout、lifecycle 和 network parameters。
- **security or networking docs**：firewalls、allowlists 和 secret handling。
- **changelog or release notes**：beta、preview 和 GA 状态，以及 plan gating（Team、Enterprise）。
- CI runners 则看 git host 的 **billing docs**。

### What goes stale fastest

- **价格和 free allowances。** 截至 2026-10，GitHub 曾宣布对 self-hosted runners 收取 per-minute fee，随后推迟。
- **Beta、preview 和 early-access 状态**，以及哪些 plans 解锁功能。截至 2026-10，Claude Managed Agents 和 Claude Code self-hosted environments 都处于 beta。
- **默认 timeouts 和 max run length**，按 tier 区分。
- Bundled platforms 上的 **trigger integrations**：哪些 ticket trackers 和 chat tools 可以启动 run。
- **Startup times**，属于 vendor 声明；如果重要，就自行测量。

上面的类型特征（谁拥有 loop、谁拥有 machine、填充哪些 slots）变化缓慢；优先相信它们，而不是这里的任何数字。
