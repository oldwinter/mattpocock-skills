Quickstart:

```bash
npx skills add mattpocock/skills --skill=implement
```

```bash
npx skills update implement
```

[Source](https://github.com/mattpocock/skills/tree/main/skills/engineering/implement)

## What it does

`implement` 会构建 PRD 或一组 issues 描述的 work：通过 test-driven development、typechecking 和完整 test suite 推进，然后交给 review，并 commit 到当前 branch。

它 **不决定 build 什么**。Spec 已经 settled，seams 已经 agreed；`implement` 执行计划，而不是重新打开它。它是 hands，不是 head；thinking 已经在上游完成。

## When to reach for it

你通过输入 `/implement` 调用它，agent 不会自行触达它。

当 work 已经写成 PRD 或拆成 issues，并且你准备把它变成 code 时使用它。如果 spec 还不存在，先写 spec：使用 [to-prd](https://aihero.dev/skills-to-prd)，或用 [to-issues](https://aihero.dev/skills-to-issues) 把 PRD 拆成 tickets。如果你只是想不依赖完整 spec 进行 test-first build，直接使用 [tdd](https://aihero.dev/skills-tdd)。

## Pre-agreed seams

`implement` 运行的核心是 **seam**，也就是 feature 被测试的稳定 interface，必须在任何 code 写下前选定。它不会在 build 中途发明 seams；它使用已经选好的 seams（通常在 [to-prd](https://aihero.dev/skills-to-prd) 中选定），并通过 [tdd](https://aihero.dev/skills-tdd) 对它们写 tests。围绕 pre-agreed seams 工作能保持 implementation 诚实：tests 对准 durable target，底下的 code 可以移动而 tests 不用移动。

围绕这个核心，它保持 loop tight：频繁 typecheck，过程中运行单个 test files，最后运行完整 suite，然后用 review pass 和当前 branch 上的 commit 收尾。

## Where it fits

`implement` 是 main chain 末端附近的 build step，紧接 review 之前：

```txt
grill-with-docs -> to-prd -> to-issues -> implement -> code-review
```

在 work 已经 specced 和 sequenced 后使用它，而不是之前。它的关键邻居是 [to-issues](https://aihero.dev/skills-to-issues)，后者产出它要逐个处理的 independently-grabbable tickets；以及 [tdd](https://aihero.dev/skills-tdd)，它会内部驱动 TDD，在每个 seam 上先写 tests，再运行自己的 [code-review](https://aihero.dev/skills-code-review) pass 并 commit。无法确定该用哪个 skill 或 flow 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
