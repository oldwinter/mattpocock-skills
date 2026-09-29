#!/usr/bin/env bash
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
LINK_SCRIPT="$REPO/scripts/link-skills.sh"
TEST_ROOT="$(mktemp -d)"
trap 'rm -rf "$TEST_ROOT"' EXIT

test_collision() {
  local home="$TEST_ROOT/collision-home"
  local output status
  mkdir -p "$home/.claude/skills/ask-matt"
  printf '%s\n' 'keep me' > "$home/.claude/skills/ask-matt/sentinel.txt"

  set +e
  output="$(HOME="$home" bash "$LINK_SCRIPT" 2>&1)"
  status=$?
  set -e

  [ "$status" -ne 0 ] || { echo "expected an existing-directory collision to fail" >&2; return 1; }
  [ -f "$home/.claude/skills/ask-matt/sentinel.txt" ] || { echo "existing skill directory was modified" >&2; return 1; }
  [[ "$output" == *"existing non-symlink target"* ]] || { echo "collision error did not explain the unsafe target" >&2; return 1; }
}

test_portability() {
  local home="$TEST_ROOT/portable-home"
  local target="$TEST_ROOT/portable-target"
  local bin="$TEST_ROOT/portable-bin"
  mkdir -p "$home/.claude" "$target" "$bin"
  ln -s "$target" "$home/.claude/skills"
  printf '%s\n' '#!/usr/bin/env bash' 'if [ "${1:-}" = "-f" ]; then echo "readlink: illegal option -- f" >&2; exit 64; fi' 'exec /usr/bin/readlink "$@"' > "$bin/readlink"
  chmod +x "$bin/readlink"

  PATH="$bin:$PATH" HOME="$home" bash "$LINK_SCRIPT" >/dev/null
  [ -L "$target/ask-matt" ] || { echo "expected links through a portable symlink destination" >&2; return 1; }
}

test_empty_home() {
  local bin="$TEST_ROOT/empty-home-bin"
  local output status
  mkdir -p "$bin"
  printf '%s\n' '#!/usr/bin/env bash' 'echo "unexpected mkdir: $*" >&2' 'exit 97' > "$bin/mkdir"
  chmod +x "$bin/mkdir"

  set +e
  output="$(PATH="$bin:$PATH" HOME= bash "$LINK_SCRIPT" 2>&1)"
  status=$?
  set -e

  [ "$status" -ne 0 ] || { echo "expected empty HOME to fail" >&2; return 1; }
  [[ "$output" == *"HOME must be set"* ]] || { echo "empty HOME error was not explicit" >&2; return 1; }
  [[ "$output" != *"unexpected mkdir"* ]] || { echo "empty HOME reached filesystem mutation" >&2; return 1; }
}

test_normal() {
  local home="$TEST_ROOT/normal-home"
  HOME="$home" bash "$LINK_SCRIPT" >/dev/null
  for dest in .claude/skills .agents/skills; do
    [ -L "$home/$dest/ask-matt" ] || { echo "expected ask-matt symlink in $dest" >&2; return 1; }
  done
}

case "${1:-all}" in
  collision) test_collision ;;
  portability) test_portability ;;
  empty-home) test_empty_home ;;
  normal) test_normal ;;
  all) test_collision; test_portability; test_empty_home; test_normal ;;
  *) echo "unknown test: $1" >&2; exit 2 ;;
esac

echo "link-skills ${1:-all}: ok"
