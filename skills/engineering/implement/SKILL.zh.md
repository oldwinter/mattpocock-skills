---
name: implement
description: "基于 PRD 或一组 issues 实现一项工作。"
disable-model-invocation: true
---

实现用户在 PRD 或 issues 中描述的工作。

尽可能使用 `/tdd`，并在预先约定的 seams 上做。

定期运行 typechecking，定期运行单个 test files，最后运行完整 test suite。

完成后，使用 `/review` review 这项工作。

将你的 work commit 到当前 branch。
