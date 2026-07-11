---
name: git-guardrails-claude-code
description: 设置 Claude Code hooks，在执行前阻止 dangerous git commands（push、reset --hard、clean、branch -D 等）。Use when user wants to prevent destructive git operations, add git safety hooks, or block git push/reset in Claude Code.
---

# Setup Git Guardrails

设置一个 PreToolUse hook，在 Claude 执行 dangerous git commands 前 intercept 并 block 它们。

## What Gets Blocked

- `git push`（包括 `--force` 在内的所有 variants）
- `git reset --hard`
- `git clean -f` / `git clean -fd`
- `git branch -D`
- `git checkout .` / `git restore .`

被 blocked 时，Claude 会看到一条 message，说明它没有 authority 访问这些 commands。

## Steps

### 1. Ask scope

询问用户：安装到**仅此 project**（`.claude/settings.json`）还是**所有 projects**（`~/.claude/settings.json`）？

### 2. Copy the hook script

Bundled script 位于：[scripts/block-dangerous-git.sh](scripts/block-dangerous-git.sh)

根据 scope 将其 copy 到 target location：

- **Project**: `.claude/hooks/block-dangerous-git.sh`
- **Global**: `~/.claude/hooks/block-dangerous-git.sh`

用 `chmod +x` 使其 executable。

### 3. Add hook to settings

添加到对应 settings file：

**Project**（`.claude/settings.json`）：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-dangerous-git.sh"
          }
        ]
      }
    ]
  }
}
```

**Global**（`~/.claude/settings.json`）：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/block-dangerous-git.sh"
          }
        ]
      }
    ]
  }
}
```

如果 settings file 已存在，将 hook merge 到 existing `hooks.PreToolUse` array；不要 overwrite 其他 settings。

### 4. Ask about customization

询问用户是否想从 blocked list 添加或移除 patterns。相应 edit copied script。

### 5. Verify

运行 quick test：

```bash
echo '{"tool_input":{"command":"git push origin main"}}' | <path-to-script>
```

应该以 code 2 exit，并向 stderr 打印 BLOCKED message。
