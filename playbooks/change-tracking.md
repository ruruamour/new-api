# Change tracking workflow

This workspace mirrors the lightweight tracking style used by `nuoapi-ops`:
Git commits are the source of truth, `playbooks/` records decisions and
procedures, and generated local artifacts stay out of normal status output.

## Layout

```text
playbooks/
  change-tracking.md        This workflow
  upstream-sync-runbook.md  Rebase/update checklist
  change-snapshots/         Optional Markdown snapshots from scripts/git-snapshot.sh
  deploy-logs/              Logs that are safe and useful to keep
configs/                    Non-secret config mirrors and examples only
scripts/
  upstream-status.sh        Fetch and summarize upstream drift
  git-snapshot.sh           Write a status/diff snapshot for review
new-api-dev.code-workspace  VS Code multi-folder workspace
```

## What should be tracked

- Source changes that you intend to keep.
- Playbook updates that explain an operational or upgrade decision.
- Small, reviewable snapshots under `playbooks/change-snapshots/`.
- Non-secret config examples under `configs/`.

## What should not be tracked

- `.env`, `.credentials`, reset password files, secrets, databases.
- Root-level screenshots, logs, channel/model backup JSON, and generated prune
  results.
- Large temporary build artifacts.

The `.gitignore` is tuned so these noisy generated files do not hide the
actual source changes that matter when rebasing onto upstream.

## Daily commands

```bash
./scripts/upstream-status.sh
./scripts/git-snapshot.sh --fetch
git status -sb
```

Before a rebase, commit only the intended work in focused commits. Avoid
`git add .` in this repository because the working tree often contains local
runtime artifacts.

