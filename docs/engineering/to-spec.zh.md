## 功能

`to-spec` 会把当前 conversation 与 agent 对 codebase 的理解整理成 spec，然后发布到 issue tracker。

它**不会**再次 interview。调用它时，对齐工作应该已经完成；`to-spec` 只综合现有共识，不会重新开始一轮问题。

## 何时使用

这是 user-invoked skill，需要输入 `/to-spec`；agent 不会自行触发。

当 change 已经讨论清楚、domain language 已稳定，并且希望在写 code 前把共识固化下来时使用。如果尚未对齐，先用 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)。完成 spec 后，用 [to-tickets](https://aihero.dev/skills-to-tickets) 拆分 tickets。

## 前置条件

`to-spec` 会发布到 issue tracker，因此必须先用 [setup-matt-pocock-skills](https://aihero.dev/skills-setup-matt-pocock-skills) 配置当前 repo 的 tracker 和 triage labels。它会自行应用 `ready-for-agent` label，不需要额外 triage。

## Spec 内容

- **Problem statement**：用项目自身 vocabulary 说明缺少或损坏了什么，以及为什么值得解决。
- **Solution**：在实现细节之前描述 high-level solution shape。
- **User stories**：详尽的编号行为列表，每项都能独立验证。
- **Implementation decisions**：记录 conversation 中已经确定的 choices，避免后续重复争论。
- **Testing decisions**：确定 feature 的 test seams 和完成标准。
- **Out-of-scope items**：明确本 change 不处理什么，控制边界。
- **Further notes**：其他需要传递但不适合前述 sections 的信息。

## Deep modules

写 spec 前，`to-spec` 会先勾勒 feature 的 test **seams**，并寻找 **deep module** opportunities，也就是用 small、stable interface 隐藏大量 functionality。它优先复用 existing seams、选择尽可能高层的 seam，并尽量让整个 change 只需要一个。

这对 agentic development 很重要：稳定 interface 给 tests 一个 durable target，让底层 code 可以变化而无需不断移动 tests。

## 工作正常的表现

- 直接开始整理 spec，而不是重新询问一轮问题。
- 写作前与你确认 test seams，并尽量减少 seam 数量。
- 使用项目自己的 domain vocabulary，而不是 generic boilerplate。

## Common questions

**`/to-prd` 去哪了？**

它在 v1.1 重命名为本 skill，旧 `to-prd` slug 已删除，需要按新名称重新安装。现在统一使用 *spec* 与 *tickets*：spec 保存 destination 与锁定它的 decisions，tickets 是到达那里的一组 execution steps。方向 pivot 时可删除未完成 tickets，但保留 spec。

**为什么 spec 会带 `ready-for-agent` label？我不想让 agent 直接实现整份 spec。**

这里的 label 表示“无需继续 triage，agent 可以读取”，不是 work order。但轮询 `ready-for-agent` 的 [AFK](https://www.aihero.dev/ai-coding-dictionary/afk) runner 看不到区别，可能把 parent spec 当作单次 build。当前可在 runner prompt 中排除 parent spec，或在 `/to-tickets` 完成后移除 label。

**为什么不从 grilling 直接进入 `/to-tickets`？**

单 session change 往往应该跳过 spec，直接 grilling -> `/implement`。Spec 只在 multi-session work 中赚回成本：tickets 是一张 context window 大小、完成后关闭的 disposable slices，spec 则保留背后的 reasoning。没有这个需求时，多一次 synthesis 只增加 [model](https://www.aihero.dev/ai-coding-dictionary/model) drift 风险。

**刚完成 wayfinder map，应把什么交给它？**

传 main map Issue：`/to-spec #<map_issue>`，不要逐个传 decision tickets。[wayfinder](https://aihero.dev/skills-wayfinder) 产出分散的 decisions，本 skill 将其折叠成一个 buildable document；直接把 map 交给 `/implement` 会跳过这一步。

**Spec 是给我 review，还是只给 agent？**

主要给 agent，因此内容 dense、reference-heavy。最值得 human 检查的是 seams 与 out-of-scope：错误 decision 在这里最便宜，implementation 后才发现最昂贵。若整份 spec 让你惊讶，通常说明前面的 grilling 不够深入。

**Tickets 开始后要保持 spec frozen，还是继续更新？**

没有自动同步机制，所以它实际上是当时 knowledge 的 snapshot，implementation 一产生新信息就会变 stale。Work ship 后可把它视为 throwaway；真正长期保存的 knowledge 应进入 `CONTEXT.md` 与 ADRs。

**我的工作是 refactor 或 module boundary，不是 feature，模板适合吗？**

较不适合。Template 偏 user stories，而 architecture work 更关心 interfaces 与 invariants。此时重点使用 implementation-decisions 与 testing-decisions sections；durable architecture calls 通过 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 写 ADR，不要强迫 spec 承载全部内容。

**它会搜索 related work，或链接自己遵守的 ADRs 吗？**

不会。它会读取并尊重相关 ADR，但不会自动引用，也不会先查 tracker 是否已有 overlapping Issues。活跃区域应由你先搜索 tracker。

**`/to-tickets` 读取 spec 时不断 truncation。**

Very large spec 可能超过 tracker Issue 能干净返回的大小，又没有 local copy fallback。不要在 `/to-spec` 与 `/to-tickets` 之间 [clear](https://www.aihero.dev/ai-coding-dictionary/clearing) 或 [compact](https://www.aihero.dev/ai-coding-dictionary/compaction)；在同一 context window 连续运行，就无需重新 fetch。

## 所处流程

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

它位于 plan/domain language 已明确之后、拆分 implementation tickets 之前。相邻 skills 是负责打磨上下文的 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，以及把 spec 转成 tickets 的 [to-tickets](https://aihero.dev/skills-to-tickets)。不确定使用哪个 flow 时，让 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
