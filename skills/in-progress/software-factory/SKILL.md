---
name: software-factory
description: 设计 software factory 的共享语言：它运行哪些 tasks，以及接入哪些 services。
disable-model-invocation: true
---

**software factory** 是一个由 agents 组成的系统，把 tickets、PRs 和 schedules 变成 merged code，并部署到用户选择的 remote infrastructure 上。这个 skill 是设计 software factory 的语言。讨论或 whiteboard 一个 factory 时，使用这些术语，并且只使用这些术语；当用户想用 _Avoid_ 下列出的词时，指出 canonical term。

## Tasks and runs

**Task**：
factory 执行的一类工作，定义一次、运行多次：review、explore、implement、ratchet。一个 task 可以处理一张 ticket、一个 PR，或整个 codebase。
_Avoid_：job、workflow、action

**Trigger**：
启动一次 run 的事件：ticket tracker 或 git host 中的变化、orchestrator 中的 clock，或另一次 run。

**Run**：
一个 task 在一个 runner 上的一次执行，从 trigger 到结束，视为 black box。一次 run 可以直接通过 orchestrator 中的逻辑触发后续 runs，也可以通过修改 ticket tracker 或 git host 来触发。Run 从不等待人类：它结束，之后人类对 ticket tracker 或 git host 的修改会触发新的 run。
_Avoid_：session

**Runner**：
run 执行时使用的一次性机器。即使机器本身长期存在，run 结束后它上面什么都不保留：一次 run 对更早 runs 的唯一记忆是 ticket tracker、git host 和 orchestrator。
_Avoid_：server、host、box、compute、sandbox

## Services

**Ticket tracker**：
tickets 存放的地方，也是 factory 的人类界面：人类通过提交 tickets 安排工作，在 comments 中与 agents 对话，他们对 tickets 的修改会触发 runs。
_Avoid_：issue tracker、ticket manager、project board

**Ticket source**：
factory 之外、在 ticket tracker 中创建 tickets 的任何东西：feedback button、monitor、error tracker、inbox。
_Avoid_：data source、trigger source、intake

**Git host**：
branches、PRs 和 reviews 存放的地方。
_Avoid_：code host、forge、repo

**Orchestrator**：
接收 triggers、在 runners 上启动 runs，并记录哪些 runs 处于 queued、in flight 或 finished 的组件。
_Avoid_：dispatcher、scheduler、control plane

**Observability platform**：
runners 发送 logs、traces 和 status 的地方，让人类能看到每次 run 内部发生了什么。可选：填充 runner 或 orchestrator slot 的产品通常自己就能显示足够信息。除非有东西把它写入 ticket tracker 或 git host，否则 run 永远不会据此做决定。
_Avoid_：observability、logs、monitoring、dashboard

## Designing a factory

一个 design 有两半：**services**，每个 slot 由一个产品填充；以及 **tasks**，它们的 runs 让工作流经这些 services。

从用户的问题出发，而不是从 factory 出发：untriaged tickets、等待 automated review 的 PRs、需要迁移到的更严格 automated check、没人读的 bugs。当用户说出一个问题，或不知道要构建什么时，阅读 [EXAMPLE-TASKS.md](EXAMPLE-TASKS.md)，找到解决常见问题的 tasks。

### Start slow

每个 trigger 都是 accelerator。没有刹车的 accelerator 会变成 slop cannon。有三种刹车：

- **Automated checks**：每次 run 都必须通过的 deterministic gates（types、lint、tests）。
- **Automated review**：一次独立的 run，cold read diff，对照 codebase 的 standards 和 ticket（如果有）。
- **Human review**：人类在 merge 前阅读 PR；它抓到的问题会变成新的 automated checks 和更敏锐的 automated review。

一次只加一个 automated trigger，初期要 throttle（十个 bug report 处理一个，clock 每天一次），并且每个 PR 都要 human review。随着刹车赢得信任，再逐步放开 throttle，并把每个 run loop 限制在几次尝试内，超过就交给人类。

### Fill every slot

每个 service 都是一个 slot。一个产品可以填多个 slots，一台 server 可以承载多个 services。三种 designs 并排比较：

| Service                | All on GitHub                   | Linear tickets                 | Own tracker              |
| ---------------------- | ------------------------------- | ------------------------------ | ------------------------ |
| Ticket tracker         | GitHub Issues                   | Linear                         | own app                  |
| Ticket source          | feedback button                 | feedback button、monitor       | feedback button、monitor |
| Git host               | GitHub                          | GitHub                         | GitHub                   |
| Orchestrator           | GitHub Actions                  | own server + database          | own app                  |
| Runner                 | Actions runner                  | Actions、E2B、Daytona 或 VPS   | own app，或 sandboxes    |
| Observability platform | 无：Actions run pages 已足够    | 一个 LLM tracing platform      | own app                  |

当用户为某个 slot 选择产品时，先读该 slot 的 survey 建立方向，再自行研究当前选项；每个 survey 按类型分组，并列出决定该 slot 的问题：

- [TICKET-TRACKERS.md](TICKET-TRACKERS.md)
- [GIT-HOSTS.md](GIT-HOSTS.md)
- [RUNNERS.md](RUNNERS.md)
- [OBSERVABILITY-PLATFORMS.md](OBSERVABILITY-PLATFORMS.md)

买 services，构建 tasks：tasks 承载用户的设计，services 是通用的。优先选择 off-the-shelf ticket tracker：它稳健，人们已经熟悉，外部用户也容易接入。

### Question every task

对每个 task 回答：

1. 什么触发它？
2. 它做什么，读写哪些 services？
3. 它接下来触发什么？
4. 人类在哪里重新介入？
5. 什么阻止两次 runs 做同样的工作？

对每个 ticket source 回答：什么阻止它重复提交同一张 ticket？

当每个 slot 都指名了一个产品（observability platform 可以是有意选择的 none），并且每个 task 和 ticket source 都回答了每个问题时，design 就完成了。
