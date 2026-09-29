#!/usr/bin/env bash
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
LINK_SCRIPT="$REPO/scripts/link-skills.sh"
TEST_ROOT="$(mktemp -d)"
trap 'rm -rf "$TEST_ROOT"' EXIT

collision_home="$TEST_ROOT/collision-home"
mkdir -p "$collision_home/.claude/skills/ask-matt"
printf '%s\n' 'keep me' > "$collision_home/.claude/skills/ask-matt/sentinel.txt"

set +e
collision_output="$(HOME="$collision_home" bash "$LINK_SCRIPT" 2>&1)"
collision_status=$?
set -e

if [ "$collision_status" -eq 0 ]; then
  echo "expected an existing-directory collision to fail" >&2
  exit 1
fi
if [ ! -f "$collision_home/.claude/skills/ask-matt/sentinel.txt" ]; then
  echo "existing skill directory was modified" >&2
  exit 1
fi
if [[ "$collision_output" != *"existing non-symlink target"* ]]; then
  echo "collision error did not explain the unsafe target" >&2
  exit 1
fi

empty_home="$TEST_ROOT/empty-home"
HOME="$empty_home" bash "$LINK_SCRIPT" >/dev/null
for dest in .claude/skills .agents/skills; do
  if [ ! -L "$empty_home/$dest/ask-matt" ]; then
    echo "expected ask-matt symlink in $dest" >&2
    exit 1
  fi
done

echo "link-skills collision handling: ok"
