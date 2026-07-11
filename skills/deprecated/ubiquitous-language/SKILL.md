---
name: ubiquitous-language
description: 从当前 conversation 提取 DDD-style ubiquitous language glossary，flag ambiguities，并提出 canonical terms。Saves to UBIQUITOUS_LANGUAGE.md. Use when user wants to define domain terms, build a glossary, harden terminology, create a ubiquitous language, or mentions "domain model" or "DDD".
disable-model-invocation: true
---

# Ubiquitous Language

从当前 conversation 中 extract 并 formalize domain terminology，生成 consistent glossary，保存到 local file。

## Process

1. **Scan the conversation**，寻找 domain-relevant nouns、verbs 和 concepts
2. **Identify problems**：
   - 同一个 word 用于不同 concepts（ambiguity）
   - 不同 words 用于同一 concept（synonyms）
   - Vague 或 overloaded terms
3. **Propose a canonical glossary**，做 opinionated term choices
4. **Write to `UBIQUITOUS_LANGUAGE.md`**，位于 working directory，使用下面 format
5. 在 conversation 中 inline **Output a summary**

## Output Format

写一个 `UBIQUITOUS_LANGUAGE.md` file，使用此 structure：

```md
# Ubiquitous Language

## Order lifecycle

| Term        | Definition                                              | Aliases to avoid      |
| ----------- | ------------------------------------------------------- | --------------------- |
| **Order**   | A customer's request to purchase one or more items      | Purchase, transaction |
| **Invoice** | A request for payment sent to a customer after delivery | Bill, payment request |

## People

| Term         | Definition                                  | Aliases to avoid       |
| ------------ | ------------------------------------------- | ---------------------- |
| **Customer** | A person or organization that places orders | Client, buyer, account |
| **User**     | An authentication identity in the system    | Login, account         |

## Relationships

- An **Invoice** belongs to exactly one **Customer**
- An **Order** produces one or more **Invoices**

## Example dialogue

> **Dev:** "When a **Customer** places an **Order**, do we create the **Invoice** immediately?"
> **Domain expert:** "No — an **Invoice** is only generated once a **Fulfillment** is confirmed. A single **Order** can produce multiple **Invoices** if items ship in separate **Shipments**."
> **Dev:** "So if a **Shipment** is cancelled before dispatch, no **Invoice** exists for it?"
> **Domain expert:** "Exactly. The **Invoice** lifecycle is tied to the **Fulfillment**, not the **Order**."

## Flagged ambiguities

- "account" was used to mean both **Customer** and **User** — these are distinct concepts: a **Customer** places orders, while a **User** is an authentication identity that may or may not represent a **Customer**.
```

## Rules

- **Be opinionated.** 当多个 words 表示同一 concept，选择最好的那个，并把其余列为 aliases to avoid。
- **Flag conflicts explicitly.** 如果某个 term 在 conversation 中 ambiguous 使用，在 “Flagged ambiguities” section 中 call it out，并给出 clear recommendation。
- **Only include terms relevant for domain experts.** 除非 modules 或 classes 的 names 在 domain language 中有意义，否则 skip。
- **Keep definitions tight.** 最多一句。定义它 IS 什么，而不是它 does 什么。
- **Show relationships.** 使用 bold term names，并在 obvious 时 express cardinality。
- **Only include domain terms.** Skip generic programming concepts（array、function、endpoint），除非它们有 domain-specific meaning。
- **自然出现 clusters 时，将 terms 分入多个 tables**（例如按 subdomain、lifecycle 或 actor）。每个 group 有自己的 heading 和 table。如果所有 terms 都属于一个 cohesive domain，一个 table 就可以；不要强行 group。
- **Write an example dialogue.** 写一个 dev 与 domain expert 之间的 short conversation（3-5 exchanges），展示 terms 如何自然 interact。Dialogue 应 clarify related concepts 之间的 boundaries，并展示 precise term usage。

<example>

## Example dialogue

> **Dev:** "How do I test the **sync service** without Docker?"

> **Domain expert:** "Provide the **filesystem layer** instead of the **Docker layer**. It implements the same **Sandbox service** interface but uses a local directory as the **sandbox**."

> **Dev:** "So **sync-in** still creates a **bundle** and unpacks it?"

> **Domain expert:** "Exactly. The **sync service** doesn't know which layer it's talking to. It calls `exec` and `copyIn` — the **filesystem layer** just runs those as local shell commands."

</example>

## Re-running

在同一个 conversation 中再次 invoked 时：

1. 读取 existing `UBIQUITOUS_LANGUAGE.md`
2. Incorporate subsequent discussion 中的 any new terms
3. 如果 understanding evolved，update definitions
4. Re-flag any new ambiguities
5. Rewrite example dialogue，以 incorporate new terms
