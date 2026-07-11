快速开始：

```bash
npx skills add oldwinter/mattpocock-skills --skill=implement
```

```bash
npx skills update implement
```

[源码](https://github.com/oldwinter/mattpocock-skills/tree/main/skills/engineering/implement)

## 功能

`implement` 根据 spec 或一组 tickets 实现工作，通过 test-driven development、typechecking 和完整 test suite 推进，最后交给 review 并 commit 到当前 branch。

它**不决定要 build 什么**。Spec 已确定、seams 已约定；`implement` 负责执行，而不是重新打开 planning。

## 何时使用

这是 user-invoked skill，需要输入 `/implement`。当工作已写成 spec 或拆成 tickets，并准备转成 code 时使用。如果还没有 spec，先用 [to-spec](https://aihero.dev/skills-to-spec)；需要拆分时用 [to-tickets](https://aihero.dev/skills-to-tickets)。只想针对一个明确 behaviour 做 test-first 实现时，可以直接用 [tdd](https://aihero.dev/skills-tdd)。

## Pre-agreed seams

`implement` 围绕预先约定的 **seam** 工作，也就是 feature 被测试的 stable interface。它不在实现中途随意发明 seams，而是使用 [to-spec](https://aihero.dev/skills-to-spec) 已确认的 seams，并通过 [tdd](https://aihero.dev/skills-tdd) 先写 tests。

它会频繁 typecheck、运行单个 test file，最后运行完整 suite；然后执行 [code-review](https://aihero.dev/skills-code-review) 并 commit。

## 所处流程

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

每个 fresh context 处理一张 frontier ticket。其上游是声明 blocking edges 的 [to-tickets](https://aihero.dev/skills-to-tickets)，内部驱动 [tdd](https://aihero.dev/skills-tdd)，结束前运行 [code-review](https://aihero.dev/skills-code-review)。
