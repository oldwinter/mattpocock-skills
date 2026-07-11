快速开始：

```bash
npx skills add oldwinter/mattpocock-skills --skill=to-spec
```

```bash
npx skills update to-spec
```

[源码](https://github.com/oldwinter/mattpocock-skills/tree/main/skills/engineering/to-spec)

## 功能

`to-spec` 会把当前 conversation 与 agent 对 codebase 的理解整理成 spec（你也可能把这种文档称为 PRD），然后发布到 issue tracker。

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

## 所处流程

```txt
grill-with-docs → to-spec → to-tickets → implement → code-review
```

它位于 plan/domain language 已明确之后、拆分 implementation tickets 之前。相邻 skills 是负责打磨上下文的 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)，以及把 spec 转成 tickets 的 [to-tickets](https://aihero.dev/skills-to-tickets)。不确定使用哪个 flow 时，让 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
