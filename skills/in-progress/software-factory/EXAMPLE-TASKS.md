# Example tasks

按所解决的问题分组的 tasks。每个 task 都写明启动其 runs 的 trigger、一次 run 做什么，以及它接下来触发什么。大多数 factories 从其中一种开始，再通过串联下一种逐步成长。

## Untriaged tickets 越积越多

**Explore task**
- Trigger：创建了一张 ticket，或人类给它加了 label。
- 做什么：对照 codebase 检查 ticket，并把它分到某个类别（easy call、needs a human、not a bug）。
- 触发：为 easy calls 启动一次 implementer run。其他情况以 ticket 被标记为等待人类结束。

## Ready tickets 等着有人来构建

**Implementer task**
- Trigger：人类或一次 explore run 把 ticket 标记为 ready。
- 做什么：构建 ticket，直到 automated checks 通过，并打开 draft PR。
- 触发：一次 automated review run。

## PRs 等待 review

**Automated review task**
- Trigger：PR 打开且尚无 automated review，或人类给它加了 label。
- 做什么：对照 codebase 的 standards 和它来源的 ticket 审查 diff。
- 触发：失败时启动一次 rework run。通过时结束，PR 等待 human review，再由人类 merge。

## 失败的 automated reviews 无人修复

**Rework task**
- Trigger：一次 automated review run 判定 PR 失败。
- 做什么：只修复 automated review 指出的内容，然后 push。
- 触发：一次 automated review run。失败达到设定次数后，以 PR 被标记为等待人类结束。

## Specs 太大，一次 run 装不下

**Decompose task**
- Trigger：一张 spec ticket 被加了 label。
- 做什么：把 spec 拆成 tickets，每张记录它依赖哪些 tickets。
- 触发：一次 implementer run。

这里的 implementer run 选择下一张依赖都已关闭的 ticket，并再次触发自己，直到没有 ticket 剩余。

## 迁移到更严格的 automated check

启用了一条新的 lint rule（或更严格的 type setting），但只有部分 files 通过。该 rule 对通过的 files 强制执行，未通过的进入 exception list。

**Ratchet task**
- Trigger：每天的 clock。
- 做什么：从 exception list 取下一个 file，修复它直到更严格的 check 通过，并打开 PR。
- 触发：一次 automated review run。exception list 清空后，ratchet run 没有可处理的内容，迁移完成。

每天一个小 PR 让 human review 保持低成本，而 check 只会越来越严格。

## 用户报告的 bugs 没人读

app 中的 feedback button 是一个 ticket source：它把每份报告作为 ticket 提交，并预先带上 explore label。剩下的由 explore run 完成。

## Production 问题发现得太晚

monitor（slow queries、error rates）是一个 ticket source。它为每个问题提交一张 ticket；再次看到同一问题时，改为在已打开的 ticket 上 comment。修复 merge 后，如果问题仍然存在，就重新打开 ticket。

## Factory 自己的 runs 失败

**Fix task**
- Trigger：orchestrator 报告一次 failed run。
- 做什么：把失败日志作为 ticket 提交；失败可修复时，尝试以 PR 形式修复。
- 触发：一次 automated review run。fix run 自身工作失败不会触发任何东西，所以修复不会链式叠加。由于 fix 会修改 factory 本身，它始终需要 human review。

## Codebase 逐渐漂移

**Architecture task**
- Trigger：每晚的 clock。
- 做什么：扫描近期 changes，寻找 refactoring candidates，并合并成一张 ticket 提交。
- 触发：无。人类挑选一个 candidate 并加 label，启动通常的链路。

## 同样的错误反复出现

**Retro task**
- Trigger：PR merge，throttle 为每十个 merged PR 处理一个。
- 做什么：读取该 PR、它的 ticket、automated reviews 和 run logs，并以 PR 形式提出对 factory 自身 instructions 的修改。
- 触发：一次 automated review run。
