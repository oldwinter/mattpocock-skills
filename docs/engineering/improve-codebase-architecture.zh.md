Quickstart:

```bash
npx skills add oldwinter/mattpocock-skills --skill=improve-codebase-architecture
```

```bash
npx skills update improve-codebase-architecture
```

[Source](https://github.com/oldwinter/mattpocock-skills/tree/main/skills/engineering/improve-codebase-architecture)

## What it does

`improve-codebase-architecture` 会扫描 codebase 中的 **deepening opportunities**，也就是 shallow module（接口几乎和它隐藏的东西一样复杂）可以变成 deep module 的位置；它将候选项呈现为自包含 visual HTML report，然后围绕你选中的项进行 grilling。

它 **不是**给你一张平铺的 refactors 列表。每个 candidate 必须通过 **deletion test**：移除这个 module 会把 complexity *concentrate* 到更小接口后，还是只是把 complexity 移到别处？只有 “concentrates” cases 才配有 card。这个过滤器防止 report 变成 generic cleanup advice。

## When to reach for it

你通过输入 `/improve-codebase-architecture` 调用它，agent 不会自行触达它。

把它当作 periodic health check：每隔几天运行一次，或当你感觉为了理解一个 concept 需要在许多小 modules 之间来回跳转时使用。它读取现有 architecture，并提出 deepen 的位置。如果你已经知道要 redesign 哪个 module，只需要 vocabulary 来思考，使用 [codebase-design](https://aihero.dev/skills-codebase-design)；本 skill 是寻找 candidates 的 survey，而那个 skill 是 design bench。

## Deepening opportunities

整个 skill 围绕一个想法：**depth**。Deep module 将大量功能隐藏在小而稳定的 interface 后；shallow module 会通过几乎和底下代码一样宽的 interface 泄露 implementation。Report 会寻找 shallowness：为了 testability 抽出的 pure functions，但真正 bugs 藏在调用方式中（没有 **locality**）；跨 **seams** 泄露的 modules；必须打开五个文件才能理解的 concepts。然后它提出能修复这些问题的 deepening。

它使用共享 design vocabulary（**module**、**interface**、**depth**、**seam**、**adapter**、**leverage**、**locality**）和你项目 `CONTEXT.md` 中的 domain language，所以 candidate 会读作 “deepen the Order intake module”，而不是 “refactor the FooBarHandler”。

## The report, then the grill

输出是写入 OS temp directory 的浏览器可打开 HTML file，不会落入 repo。每个 candidate 是一张 card，包含涉及文件、friction、plain-English solution、以 locality 和 leverage 表达的 benefit、before/after diagram，以及 `Strong` / `Worth exploring` / `Speculative` badge。最后会给出它优先处理的那一个。

随后它停下，询问你要探索哪个。选中一个后，它会围绕该 design 运行 [grilling](https://aihero.dev/skills-grilling) loop：constraints、seam 后面放什么、哪些 tests 能保留，并在 decisions crystallise 时 inline 更新 domain model。

## Where it fits

`improve-codebase-architecture` 是 **periodic maintenance**：每隔几天运行，而不是 chain 中一步。它的邻居是 [codebase-design](https://aihero.dev/skills-codebase-design)，也就是所有 candidates 使用的 depth-and-seam vocabulary 的所有者；[grilling](https://aihero.dev/skills-grilling)，用于在你选定 candidate 后走 design tree；以及 [domain-modeling](https://aihero.dev/skills-domain-modeling)，用于在 redesign settle 时保持 `CONTEXT.md` 和 ADRs 当前。无法确定该用哪个 skill 或 flow 时，由 [ask-matt](https://aihero.dev/skills-ask-matt) 路由。
