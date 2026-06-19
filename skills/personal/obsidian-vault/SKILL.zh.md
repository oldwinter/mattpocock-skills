---
name: obsidian-vault
description: 使用 wikilinks 和 index notes，在 Obsidian vault 中 search、create 和 manage notes。Use when user wants to find, create, or organize notes in Obsidian.
---

# Obsidian Vault

## Vault location

`/mnt/d/Obsidian Vault/AI Research/`

Root level 基本 flat。

## Naming conventions

- **Index notes**：聚合相关 topics（例如 `Ralph Wiggum Index.md`、`Skills Index.md`、`RAG Index.md`）
- 所有 note names 使用 **Title case**
- 不用 folders 组织；改用 links 和 index notes

## Linking

- 使用 Obsidian `[[wikilinks]]` syntax：`[[Note Title]]`
- Notes 在底部 link 到 dependencies/related notes
- Index notes 只是 `[[wikilinks]]` 列表

## Workflows

### Search for notes

```bash
# Search by filename
find "/mnt/d/Obsidian Vault/AI Research/" -name "*.md" | grep -i "keyword"

# Search by content
grep -rl "keyword" "/mnt/d/Obsidian Vault/AI Research/" --include="*.md"
```

或者直接在 vault path 上使用 Grep/Glob tools。

### Create a new note

1. Filename 使用 **Title Case**
2. 按 vault rules 将内容写成 unit of learning
3. 在底部添加指向 related notes 的 `[[wikilinks]]`
4. 如果属于 numbered sequence，使用 hierarchical numbering scheme

### Find related notes

在 vault 中搜索 `[[Note Title]]` 来找 backlinks：

```bash
grep -rl "\\[\\[Note Title\\]\\]" "/mnt/d/Obsidian Vault/AI Research/"
```

### Find index notes

```bash
find "/mnt/d/Obsidian Vault/AI Research/" -name "*Index*"
```
