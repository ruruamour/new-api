#!/usr/bin/env bash
set -Eeuo pipefail

readonly PRINTF_BIN="/usr/bin/printf"
readonly SED_BIN="/usr/bin/sed"
readonly SORT_BIN="/usr/bin/sort"
readonly COMM_BIN="/usr/bin/comm"
readonly MKTEMP_BIN="/usr/bin/mktemp"
readonly RM_BIN="/usr/bin/rm"
readonly GIT_BIN="/usr/bin/git"

fetch_enabled=1

usage() {
  "${PRINTF_BIN}" 'Usage: %s [--no-fetch]\n' "$0"
}

sanitize_remote() {
  "${SED_BIN}" -E 's#(https?://)[^/@]+@#\1***@#g'
}

git_exists() {
  "${GIT_BIN}" rev-parse --verify --quiet "$1" >/dev/null
}

print_overlap() {
  local local_file=""
  local upstream_file=""

  local_file="$("${MKTEMP_BIN}")"
  upstream_file="$("${MKTEMP_BIN}")"

  "${GIT_BIN}" diff --name-only HEAD | "${SORT_BIN}" > "${local_file}"
  "${GIT_BIN}" diff --name-only HEAD..upstream/main | "${SORT_BIN}" > "${upstream_file}"
  "${COMM_BIN}" -12 "${local_file}" "${upstream_file}"
  "${RM_BIN}" -f "${local_file}" "${upstream_file}"
}

main() {
  local arg=""
  local branch=""
  local head=""
  local upstream_head=""
  local ahead_behind=""

  for arg in "$@"; do
    case "${arg}" in
      --no-fetch)
        fetch_enabled=0
        ;;
      -h|--help)
        usage
        exit 0
        ;;
      *)
        usage >&2
        exit 2
        ;;
    esac
  done

  if (( fetch_enabled )); then
    "${GIT_BIN}" fetch upstream main --prune
  fi

  branch="$("${GIT_BIN}" branch --show-current)"
  head="$("${GIT_BIN}" rev-parse --short HEAD)"

  "${PRINTF_BIN}" 'branch: %s\n' "${branch}"
  "${PRINTF_BIN}" 'HEAD:   %s\n' "${head}"
  "${PRINTF_BIN}" '\nremotes:\n'
  "${GIT_BIN}" remote -v | sanitize_remote

  if git_exists upstream/main; then
    upstream_head="$("${GIT_BIN}" rev-parse --short upstream/main)"
    ahead_behind="$("${GIT_BIN}" rev-list --left-right --count HEAD...upstream/main)"
    "${PRINTF_BIN}" '\nupstream/main: %s\n' "${upstream_head}"
    "${PRINTF_BIN}" 'local ahead / behind upstream: %s\n' "${ahead_behind}"
    "${PRINTF_BIN}" '\nrecent upstream commits not in HEAD:\n'
    "${GIT_BIN}" log --oneline --decorate --max-count=12 HEAD..upstream/main || true
    "${PRINTF_BIN}" '\nlocal modified tracked files also changed upstream:\n'
    print_overlap
  else
    "${PRINTF_BIN}" '\nupstream/main is not available. Add/fetch upstream first.\n'
  fi

  "${PRINTF_BIN}" '\nworking tree:\n'
  "${GIT_BIN}" status -sb
}

main "$@"
