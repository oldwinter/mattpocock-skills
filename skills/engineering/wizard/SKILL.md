---
name: wizard
description: 生成 interactive bash wizard，引导 human 完成只有他们能执行的步骤。用于 provisioning infrastructure、设置 credentials 或 CI secrets、操作陌生的第三方 dashboard，或执行一次性 migration/cutover；agent 自己能完成的步骤不要调用它。
---

# Wizard

**Wizard** 是一个 bash 脚本，用来逐步引导人类完成手动流程：这些流程手做很烦，每次都重新解释给 AI 也很烦。它会打开每个 URL，明确说明要点击和复制什么，采集 values，把它们写到应该去的地方（`.env`、GitHub secrets），每个阶段都确认，并展示还剩多少个 stages。它可能用于配置第三方服务、执行一次性 migration，或把 project 从一种 state 移到另一种 state。

令人愉悦的 UX 已经由 [template.sh](template.sh) 解决：逐 stage progress、confirmation gates、跨平台 URL opening（包括 WSL）、隐藏 secret 输入、幂等 `.env` upserts、`gh secret`/`gh variable` 写入，以及收尾 summary。**你的工作只是 scope procedure，并 author stages。** `STAGES` marker 上方的 library 在每个 wizard 中都完全相同；这种一致性就是重点，永远不要手动编辑它。

Wizard 默认是 ephemeral：为一次运行而建，保存到 scratch 或 `scripts/` path，完成后删除。只有当用户想要一个可重复的 setup path，并且它应该留在 repo 中时，才 commit 它。

## Process

### 1. Scope the procedure

弄清楚人类必须执行的每个手动步骤，以及过程中会采集的每个 value。先读 repo，不要冷启动提问：

- 对 setup：读取 `.env`、`.env.example`、`.env.*`、`README`、`docker-compose*`、framework config，以及 `.github/workflows/*`（每个 `secrets.*` / `vars.*` 引用都是 wizard 必须产出的 value）。
- 对 migration 或 transition：弄清 current state、target state，以及两者之间的 irreversible actions。

然后向用户展示有序 stages 列表，以及每个 stage 产出的 values，并确认；他们可能会添加、删除或重新排序。

**Done when:** 每个 stage 都已按顺序命名；对每个 captured value，你都知道 (a) 人类从哪里获取它，(b) 它会写到哪里（`.env`、GitHub secret、两者，或不写入；有些 stage 只是纯 actions），以及 (c) 它是否是 secret（hidden entry）还是 public。

### 2. Map each stage's journey

为每个 stage 写出人类要走的精确路径：打开哪个 URL、在那里做什么、value 显示在哪里、填入哪个 variable。例如：“Dashboard → Developers → API keys → Reveal test key → copy”。如果你并不真正知道当前 UI 或确切命令，就明确说不知道，并询问用户或查文档；永远不要编造可能不存在的步骤。

**Done when:** 每个 stage 都能追溯到陌生人也能照做的具体 instructions。

### 3. Author the wizard

把 `template.sh` 复制到目标 path。用 dependency order 下的一个 `stage` 替换 example stage。使用 library helpers：`stage`、`say`/`step`、`open_url`、`ask`/`ask_secret`、`write_env`、`set_secret`/`set_var`、`pause`/`confirm`，并把 `TOTAL_STAGES` 设为实际写出的 stage 数量。

保持 template 设定的质量线：先打开 URL 再要求 value；任何 secret 都用 `ask_secret`；每个持久化 value 都用 `write_env`；只有 CI 真正需要的 values 才用 `set_secret`；任何 irreversible action 前都要 `confirm`。每个 `stage` 都会清屏，只显示当前步骤，所以一个 stage 要保持一个 focused task，避免人类需要的内容滚出屏幕。不要碰 marker 上方的 library。

### 4. Verify and hand off

- 运行 `bash -n <script>`；如果可用，再运行 `shellcheck`。
- 运行 `chmod +x <script>`。
- 不要自己端到端运行它；它会打开浏览器并阻塞等待人类输入。改为静态 trace：第 1 步中的每个 value 都已被采集，并落到第 1 步指定的位置；每个 `set_secret` name 都精确匹配 CI 中的 `secrets.*` reference。
- 告诉用户如何运行它。如果这是可重复的 setup path，就 commit 它，并从 README link 到它，这样下一个人会运行脚本，而不是询问 AI。
