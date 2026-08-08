## What it does

`wizard` 生成 interactive bash script，引导 human 完成只有他们能执行的手动步骤：provisioning infrastructure、设置 credentials/CI secrets、操作陌生的第三方 dashboard，或进行一次性 migration/cutover。

它不会替人类完成这些动作，也不应包装 agent 自己能执行的步骤。输出 script 会逐 stage 打开 URL、说明点击路径、采集 values、写入 `.env` 或 GitHub secrets，并在 irreversible action 前确认。

## When to reach for it

输入 `/wizard`，或当 agent 遇到真正需要 human in the loop 的 setup/migration 时自动触达。

| 情况 | 是否使用 |
| --- | --- |
| 必须由 human 登录 dashboard、复制 secret 或批准 cutover | 使用 `wizard` |
| Agent 可以通过 CLI/API 自己完成 | 不使用，agent 直接执行 |
| 只是解释一段已有流程 | 写普通 docs，不生成 interactive script |

## The stages

先探索 repo，找出 `.env*`、README、compose/framework config 与 `.github/workflows/*` 中所有 `secrets.*` / `vars.*` references。然后列出有序 stages，并为每个 captured value 明确来源、落点和是否 secret。

Script 从 `template.sh` 复制，marker 上方 library 保持 byte-identical。每个 stage 只承载一个 focused task；先打开 URL，再要求 value；secret 使用 `ask_secret`，持久值用 `write_env`，只有 CI 真需要的 values 才用 `set_secret`。`TOTAL_STAGES` 必须等于实际 stage 数。

## It's working if

- 每个 stage 都有陌生人可照做的 exact URL/path instructions。
- 每个 value 都能从 source trace 到 `.env`、GitHub secret/variable，或明确不持久化。
- `bash -n` 通过，可用时 `shellcheck` 也通过。
- Script 不由 agent 端到端执行，而是交给 human 运行。

## Common questions

**API keys 会进入 model context 吗？**

不会。Agent 只写 script，不运行它；你在本地运行，script 用 hidden terminal input 读取 key，并直接写入 `.env` 或 `gh secret`。但若你在 scoping 时把 key 粘进 chat，它当然会像其他文字一样进入 [context](https://www.aihero.dev/ai-coding-dictionary/context)。

**输错 value 后可以返回上一步吗？**

运行中没有 back button，需要 Ctrl-C 后重跑。重跑有意保持便宜：已写进 `.env` 的 value 会作为 default，可一路 Enter 到错误 stage 再重新输入。另一个 open bug 是 `ask` 使用 `read -r`，arrow keys 会插入 escape sequence 而不是移动 cursor；Backspace 可用。

**它知道哪些 setup 已经完成吗？**

部分知道。它会先读取 `.env`、compose/framework config 和 CI 中的 `secrets.*` refs，因此不会像 README 一样完全从零开始；但不会登录 third-party service 检查远端状态。Key 已在 `.env` 时可直接保留，账号已创建却未保存 key 时仍会引导你访问 dashboard。

**它位于 workflow 哪一步，grilling 和 spec 之后吗？**

没有固定位置。它是 standalone，只要出现 human-only manual procedure 就触发，可以在 build 前、中途或 ship 后。Scoping 本身也能发现之前没意识到的 credentials 与 prerequisites。

**Claude Code 之外能用吗？**

生成物一定能用，因为只是 plain bash script，与生成它的 [harness](https://www.aihero.dev/ai-coding-dictionary/harness) 无关。Skill 是 model-invoked，在 Claude Code 可输入 `/wizard`，Codex 可输入 `$wizard`，也可直接描述卡住的 setup。

**它以前不是 user-invoked 吗？**

以前是，现在改为 model-invoked。Agent 遇到 human-only step 时可以主动触达，但 `/wizard` 仍照常工作；model invocation 只增加 reach，不移除 explicit invocation。

**它以前在 `in-progress/`，现在在哪里？**

从 v1.2 起位于 `engineering/`，已从 Beta 晋级并随 plugin 发布，不再需要单独安装；graduation 本身没有改变核心行为。

## Where it fits

`wizard` 是 model-invoked standalone，专门跨越 human-only boundary。它不属于 main build chain；[ask-matt](https://aihero.dev/skills-ask-matt) 会在你不确定流程时路由到它。
