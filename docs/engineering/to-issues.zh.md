Quickstart:

```bash
npx skills add mattpocock/skills --skill=to-issues
```

```bash
npx skills update to-issues
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-issues)

## What it does

`to-issues` 会把 plan、spec 或 PRD 拆成一组可独立领取的 Issues，并按 dependency order 发布到项目的 Issue tracker。

每个 Issue 都是 **tracer bullet**：一个穿过所有 integration layers（schema、API、UI、tests）的薄 *vertical* slice，而不是某一层的 horizontal slice。完成的 slice 自身可 demo 或可 verify，因此产出的 Issues 才能安全交给独立 agents。

## When to reach for it

你通过输入 `/to-issues` 调用它，agent 不会自行触达它。

当你已经有 agreed plan 或 written spec，并希望拆成 agent 可领取的 Issues 时使用它。可以指向 conversation，也可以传入 existing issue reference，它会先 fetch body 和 comments。如果 change 尚未写成 spec，先产出 spec，使用 [to-prd](https://aihero.dev/skills-to-prd)。

## Prerequisites

`to-issues` 会发布到 Issue tracker，因此必须先由 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 配置此 repo 的 tracker 和 triage label vocabulary。发布时它会自行应用 ready-for-agent triage label。

## Vertical slices, not horizontal ones

整个 skill 围绕一个区别。**Horizontal** slice 只交付 change 的一层，例如全部 schema 或全部 API；只有每层都完成后才有东西可用。**Vertical** slice，也就是 tracer bullet，则一次交付穿过 *每一层* 的窄路径，所以完成瞬间即可 demo。

切 slice 前，`to-issues` 会寻找 prefactoring，也就是 “make the change easy, then make the easy change”，并把这类 work 排到前面。随后它会围绕 breakdown 向你提问（granularity、dependencies、哪些该 merge 或 split），确认后才写入，并先发布 blockers，使每个 Issue 的 “Blocked by” 字段能引用真实 Issue。

## Where it fits

`to-issues` 是 main build chain 的一步：

```txt
grill-with-docs -> to-prd -> to-issues -> implement -> code-review
```

它位于 [to-prd](https://aihero.dev/skills-to-prd) 与 [implement](https://aihero.dev/skills-implement) 之间。前者交给它一个带 user stories 的 settled spec，供它切 slice；后者构建每个 independently-grabbable Issue，并内部驱动 [tdd](https://aihero.dev/skills-tdd) test-first 写 tests，再进行 [code-review](https://aihero.dev/skills-code-review) pass。无法确定该用哪个 skill 或 flow 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
