---
name: implement
description: "基于 spec 或一组 tickets 实现一项工作。"
disable-model-invocation: true
---

实现用户在 spec 或 tickets 中描述的工作。

尽可能使用 `/tdd`，并在预先约定的 seams 上做。

定期运行 typechecking 和单个 test files，并在最后只运行一次完整 test suite。

完成后，使用 `/code-review` review 这项工作。

将你的 work commit 到当前 branch。
