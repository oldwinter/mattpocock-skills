#!/usr/bin/env bash
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
FIXTURE="$REPO/.list-skills-fixture-$$"
trap 'rm -rf "$FIXTURE"' EXIT
mkdir -p "$FIXTURE"
printf '%s\n' '# fixture' > "$FIXTURE/SKILL.md"

output="$(bash "$REPO/scripts/list-skills.sh")"
if [[ "$output" == *".list-skills-fixture"* ]]; then
  echo "list-skills included a SKILL.md outside skills/" >&2
  exit 1
fi
if [[ "$output" != *"skills/engineering/ask-matt/SKILL.md"* ]]; then
  echo "list-skills omitted a real catalog entry" >&2
  exit 1
fi

echo "list-skills catalog scope: ok"
