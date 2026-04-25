# Upstream sync runbook

Use this when bringing the local branch up to `upstream/main`.

## 0. Snapshot current state

```bash
./scripts/upstream-status.sh
./scripts/git-snapshot.sh --fetch
```

STOP: review the snapshot under `playbooks/change-snapshots/`.

## 1. Protect the current branch

```bash
git branch "backup/$(git branch --show-current)-before-upstream-$(date +%Y%m%d-%H%M%S)"
```

## 2. Commit intended local work

Do not use `git add .`. Stage by scope:

```bash
git add path/to/file path/to/other-file
git commit -m "WIP: describe local scope"
```

Recommended scopes for the current branch:

- Backend pricing/ratio changes.
- Frontend UI/theme changes.
- Playbook/workspace tracking changes.

## 3. Rebase onto upstream

```bash
git fetch upstream main --prune
git rebase upstream/main
```

If conflicts occur, prefer upstream for unrelated product changes and reapply
only the local UI/theme or pricing behavior that is still intended.

## 4. Validate

Backend:

```bash
go test ./...
```

Frontend:

```bash
cd web
bun install
bun run i18n:lint
bun run build
```

## 5. Record the result

```bash
./scripts/git-snapshot.sh
git status -sb
```

Commit any final conflict-resolution or playbook updates separately.

