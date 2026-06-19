<p>
  <a href="https://www.aihero.dev/s/skills-newsletter">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/total-typescript/image/upload/v1777382277/skills-repo-dark_2x.png">
      <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/total-typescript/image/upload/v1777382277/skill-repo-light_2x.png">
      <img alt="Skills" src="https://res.cloudinary.com/total-typescript/image/upload/v1777382277/skill-repo-light_2x.png" width="369">
    </picture>
  </a>
</p>

# Skills For Real Engineers

[![skills.sh](https://skills.sh/b/mattpocock/skills)](https://skills.sh/mattpocock/skills)

这些是我每天用于 real engineering 的 agent skills，不是 vibe coding。

开发 real applications 很难。GSD、BMAD、Spec-Kit 这类 approaches 试图通过 owning the process 来帮忙。但这样做也会拿走你的 control，并让 process 中的 bugs 更难 resolve。

这些 skills 被设计得 small、easy to adapt、composable。它们适用于任何 model。它们基于数十年的 engineering experience。Hack around with them. Make them your own. Enjoy.

如果你想跟上这些 skills 的变化，以及我创建的新 skills，可以加入我的 newsletter，和约 60,000 名 devs 一起：

[Sign Up To The Newsletter](https://www.aihero.dev/s/skills-newsletter)

## Quickstart (30-second setup)

1. 运行 skills.sh installer：

```bash
npx skills@latest add mattpocock/skills
```

2. 选择你想要的 skills，以及想安装到哪些 coding agents。**确保选择 `/setup-matt-pocock-skills`**。

3. 在你的 agent 中运行 `/setup-matt-pocock-skills`。它会：
   - 询问你想使用哪个 issue tracker（GitHub、Linear 或 local files）
   - 询问你在 triage tickets 时会应用哪些 labels（`/triage` 会使用 labels）
   - 询问你想把我们创建的 docs 保存在哪里

4. Bam - you're ready to go.

## Why These Skills Exist

我创建这些 skills，是为了修复我在 Claude Code、Codex 和其他 coding agents 中常见的 failure modes。

### #1: The Agent Didn't Do What I Want

> "No-one knows exactly what they want"
>
> David Thomas & Andrew Hunt, [The Pragmatic Programmer](https://www.amazon.co.uk/Pragmatic-Programmer-Anniversary-Journey-Mastery/dp/B0833F1T3V)

**The Problem**。Software development 中最常见的 failure mode 是 misalignment。你以为 dev 知道你想要什么。然后你看到他们 build 出来的东西，才意识到它完全没理解你。

AI age 也一样。你和 agent 之间存在 communication gap。Fix 是一次 **grilling session**：让 agent 围绕你正在 build 的东西向你提出 detailed questions。

**The Fix** 是使用：

- [`/grill-me`](./skills/productivity/grill-me/SKILL.zh.md) - 用于 non-code uses
- [`/grill-with-docs`](./skills/engineering/grill-with-docs/SKILL.zh.md) - 与 [`/grill-me`](./skills/productivity/grill-me/SKILL.zh.md) 类似，但增加更多 goodies（见下文）

这些是我最受欢迎的 skills。它们帮助你在开始前与 agent align，并深入思考你正在做的 change。每次想做 change 时都使用它们。

### #2: The Agent Is Way Too Verbose

> With a ubiquitous language, conversations among developers and expressions of the code are all derived from the same domain model.
>
> Eric Evans, [Domain-Driven-Design](https://www.amazon.co.uk/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215)

**The Problem**：项目开始时，devs 和软件服务对象（domain experts）通常说着不同语言。

我和 agents 相处时也感到同样的 tension。Agents 通常被丢进一个 project，然后被要求边做边 figure out jargon。所以它们用 20 个 words 表达 1 个 word 能说清的东西。

**The Fix** 是 shared language。它是一个 document，帮助 agents decode 项目中使用的 jargon。

<details>
<summary>
Example
</summary>

这里有一个来自我的 `course-video-manager` repo 的 [`CONTEXT.md`](https://github.com/mattpocock/course-video-manager/blob/076a5a7a182db0fe1e62971dd7a68bcadf010f1c/CONTEXT.md) 示例。哪个更容易读？

- **BEFORE**: "There's a problem when a lesson inside a section of a course is made 'real' (i.e. given a spot in the file system)"
- **AFTER**: "There's a problem with the materialization cascade"

这种 concision 会在一个又一个 session 中回本。

</details>

这内置在 [`/grill-with-docs`](./skills/engineering/grill-with-docs/SKILL.zh.md) 中。它是 grilling session，但会帮你与 AI 构建 shared language，并用 ADRs 记录 hard-to-explain decisions。

很难解释这有多强大。它可能是这个 repo 中最酷的 technique。Try it, and see.

> [!TIP]
> Shared language 除了 reducing verbosity，还有许多 benefits：
>
> - **Variables, functions and files are named consistently**，使用 shared language
> - 因此，**codebase 更容易被 agent navigate**
> - Agent 也会 **spend fewer tokens on thinking**，因为它拥有更 concise 的 language

### #3: The Code Doesn't Work

> "Always take small, deliberate steps. The rate of feedback is your speed limit. Never take on a task that’s too big."
>
> David Thomas & Andrew Hunt, [The Pragmatic Programmer](https://www.amazon.co.uk/Pragmatic-Programmer-Anniversary-Journey-Mastery/dp/B0833F1T3V)

**The Problem**：假设你和 agent 已经 aligned，知道要 build 什么。那如果 agent _仍然_ 产出 crap 呢？

这时要看 feedback loops。如果没有关于生成 code 实际如何运行的 feedback，agent 就是在 blind flying。

**The Fix**：你需要常规那一组 feedback loops：static types、browser access 和 automated tests。

对 automated tests 来说，red-green-refactor loop 至关重要。也就是 agent 先写 failing test，再 fix test。这能给 agent 一致的 feedback level，产出更好的 code。

我做了一个可 slot into any project 的 **[`/tdd`](./skills/engineering/tdd/SKILL.zh.md) skill**。它鼓励 red-green-refactor，并给 agent 大量关于 good/bad tests 的 guidance。

对 debugging，我也做了 **[`/diagnosing-bugs`](./skills/engineering/diagnosing-bugs/SKILL.zh.md)** skill，用 simple loop 包装 best debugging practices。

### #4: We Built A Ball Of Mud

> "Invest in the design of the system _every day_."
>
> Kent Beck, [Extreme Programming Explained](https://www.amazon.co.uk/Extreme-Programming-Explained-Embrace-Change/dp/0321278658)

> "The best modules are deep. They allow a lot of functionality to be accessed through a simple interface."
>
> John Ousterhout, [A Philosophy Of Software Design](https://www.amazon.co.uk/Philosophy-Software-Design-2nd/dp/173210221X)

**The Problem**：大多数用 agents build 的 apps 都 complex 且 hard to change。因为 agents 能 radically speed up coding，它们也会加速 software entropy。Codebases 以前所未有的速度变复杂。

**The Fix** 是一种 AI-powered development 的 radical new approach：关心 code 的 design。

这内置在这些 skills 的每一层：

- [`/to-prd`](./skills/engineering/to-prd/SKILL.zh.md) 会在创建 PRD 前 quiz 你将 touching 哪些 modules

最关键的是，[`/improve-codebase-architecture`](./skills/engineering/improve-codebase-architecture/SKILL.zh.md) 会帮助你 rescue 已经变成 ball of mud 的 codebase。我建议每隔几天就在你的 codebase 上运行一次。

### Summary

Software engineering fundamentals 比以往更重要。这些 skills 是我将这些 fundamentals 凝练成 repeatable practices 的 best effort，帮助你 ship 职业生涯中最好的 apps。Enjoy.

## Reference

这些 skills 只按一个轴划分：谁能 invoke 它们。**User-invoked** skills 只有在你输入它们的名字时才能触达（例如 `/grill-me`），职责是 orchestration。**Model-invoked** skills 可以由你 invoke，也可以在 task 匹配时由 agent 自动触达；它们承载 reusable discipline。User-invoked skill 可以 invoke model-invoked skills，但永远不能 invoke 另一个 user-invoked skill。

### Engineering

我日常用于 code work 的 skills。

**User-invoked**

- **[ask-matt](./skills/engineering/ask-matt/SKILL.zh.md)** — 询问哪个 skill 或 flow 适合你的情况；它是这个 repo 中 user-invoked skills 的 router。
- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.zh.md)** — Grilling session，也会构建项目的 domain model、打磨 terminology，并 inline 更新 `CONTEXT.md` 和 ADRs。
- **[triage](./skills/engineering/triage/SKILL.zh.md)** — 让 issues 通过 triage roles 的 state machine 流转。
- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.zh.md)** — 扫描 codebase 的 deepening opportunities，生成 visual HTML report，然后围绕你选中的机会进行 grilling。
- **[setup-matt-pocock-skills](./skills/engineering/setup-matt-pocock-skills/SKILL.zh.md)** — 为 engineering skills 配置当前 repo（issue tracker、triage labels、domain doc layout）。每个 repo 使用其他 engineering skills 前运行一次。
- **[to-issues](./skills/engineering/to-issues/SKILL.zh.md)** — 使用 vertical slices 将任何 plan、spec 或 PRD 拆成可独立领取的 issues。
- **[to-prd](./skills/engineering/to-prd/SKILL.zh.md)** — 将当前 conversation 转成 PRD，并发布到 issue tracker。不 interview，只 synthesize 已讨论内容。
- **[prototype](./skills/engineering/prototype/SKILL.zh.md)** — 构建 throwaway prototype 来厘清 design：可以是针对 state/business-logic questions 的 runnable terminal app，也可以是在同一路由中切换的多个 radically different UI variations。

**Model-invoked**

- **[diagnosing-bugs](./skills/engineering/diagnosing-bugs/SKILL.zh.md)** — 面向 hard bugs 和 performance regressions 的 disciplined diagnosis loop：reproduce → minimise → hypothesise → instrument → fix → regression-test。
- **[tdd](./skills/engineering/tdd/SKILL.zh.md)** — 使用 red-green-refactor loop 的 Test-driven development。一次一个 vertical slice 构建 feature 或修复 bug。
- **[domain-modeling](./skills/engineering/domain-modeling/SKILL.zh.md)** — 主动构建和打磨项目的 domain model：对照 glossary challenge terms，用 edge-case scenarios stress-test，并 inline 更新 `CONTEXT.md` 和 ADRs。
- **[codebase-design](./skills/engineering/codebase-design/SKILL.zh.md)** — 设计 deep modules 的 shared discipline 和 vocabulary：用 small interface 包住大量 behaviour，放在 clean seam 上，并通过 interface test。

### Productivity

通用 workflow tools，不限于代码工作。

**User-invoked**

- **[grill-me](./skills/productivity/grill-me/SKILL.zh.md)** — 围绕 plan 或 design 进行持续 interview，直到 decision tree 的每个 branch 都被 resolved。
- **[handoff](./skills/productivity/handoff/SKILL.zh.md)** — 将当前 conversation 压缩成 handoff document，方便另一个 agent 继续工作。
- **[teach](./skills/productivity/teach/SKILL.zh.md)** — 使用当前 directory 作为 stateful teaching workspace，跨多个 sessions 教用户一个新 skill 或 concept。
- **[writing-great-skills](./skills/productivity/writing-great-skills/SKILL.zh.md)** — 写好和编辑 skills 的 reference：让 skill predictable 的 vocabulary 和 principles。

**Model-invoked**

- **[grilling](./skills/productivity/grilling/SKILL.zh.md)** — 围绕 plan 或 design 持续 interview 用户，直到 decision tree 的每个 branch 都被 resolved。它是 `grill-me` 和 `grill-with-docs` 背后的 reusable loop。

### Misc

我保留着但很少使用的 tools。

- **[git-guardrails-claude-code](./skills/misc/git-guardrails-claude-code/SKILL.zh.md)** — 设置 Claude Code hooks，在执行前阻止 dangerous git commands（push、reset --hard、clean 等）。
- **[migrate-to-shoehorn](./skills/misc/migrate-to-shoehorn/SKILL.zh.md)** — 将 test files 从 `as` type assertions 迁移到 @total-typescript/shoehorn。
- **[scaffold-exercises](./skills/misc/scaffold-exercises/SKILL.zh.md)** — 创建包含 sections、problems、solutions 和 explainers 的 exercise directory structures。
- **[setup-pre-commit](./skills/misc/setup-pre-commit/SKILL.zh.md)** — 设置 Husky pre-commit hooks，包含 lint-staged、Prettier、type checking 和 tests。
