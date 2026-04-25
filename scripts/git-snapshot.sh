#!/usr/bin/env bash
set -Eeuo pipefail

readonly DATE_BIN="/usr/bin/date"
readonly MKDIR_BIN="/usr/bin/mkdir"
readonly PRINTF_BIN="/usr/bin/printf"
readonly SED_BIN="/usr/bin/sed"
readonly SORT_BIN="/usr/bin/sort"
readonly COMM_BIN="/usr/bin/comm"
readonly MKTEMP_BIN="/usr/bin/mktemp"
readonly RM_BIN="/usr/bin/rm"
readonly DIRNAME_BIN="/usr/bin/dirname"
readonly GIT_BIN="/usr/bin/git"

fetch_enabled=0
output_path=""

usage() {
  "${PRINTF_BIN}" 'Usage: %s [--fetch] [--output PATH]\n' "$0"
}

sanitize_remote() {
  "${SED_BIN}" -E 's#(https?://)[^/@]+@#\1***@#g'
}

git_exists() {
  "${GIT_BIN}" rev-parse --verify --quiet "$1" >/dev/null
}

append_cmd() {
  local title="$1"
  shift

  {
    "${PRINTF_BIN}" '\n## %s\n\n```text\n' "${title}"
    "$@" 2>&1 || "${PRINTF_BIN}" '\n(command failed: exit %s)\n' "$?"
    "${PRINTF_BIN}" '```\n'
  } >> "${output_path}"
}

append_upstream_overlap() {
  local local_file=""
  local upstream_file=""

  {
    "${PRINTF_BIN}" '\n## Local tracked files also changed upstream\n\n```text\n'
    if git_exists upstream/main; then
      local_file="$("${MKTEMP_BIN}")"
      upstream_file="$("${MKTEMP_BIN}")"
      "${GIT_BIN}" diff --name-only HEAD | "${SORT_BIN}" > "${local_file}"
      "${GIT_BIN}" diff --name-only HEAD..upstream/main | "${SORT_BIN}" > "${upstream_file}"
      "${COMM_BIN}" -12 "${local_file}" "${upstream_file}"
      "${RM_BIN}" -f "${local_file}" "${upstream_file}"
    else
      "${PRINTF_BIN}" 'upstream/main is not available\n'
    fi
    "${PRINTF_BIN}" '```\n'
  } >> "${output_path}"
}

main() {
  local arg=""
  local timestamp=""
  local branch=""
  local head=""
  local upstream_head="unavailable"
  local ahead_behind="unavailable"

  while (($#)); do
    arg="$1"
    case "${arg}" in
      --fetch)
        fetch_enabled=1
        shift
        ;;
      --output)
        if (($# < 2)); then
          usage >&2
          exit 2
        fi
        output_path="$2"
        shift 2
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

  timestamp="$("${DATE_BIN}" +%Y%m%d-%H%M%S)"
  if [[ -z "${output_path}" ]]; then
    output_path="playbooks/change-snapshots/git-snapshot-${timestamp}.md"
  fi

  "${MKDIR_BIN}" -p "$("${DIRNAME_BIN}" "${output_path}")"

  branch="$("${GIT_BIN}" branch --show-current)"
  head="$("${GIT_BIN}" rev-parse --short HEAD)"
  if git_exists upstream/main; then
    upstream_head="$("${GIT_BIN}" rev-parse --short upstream/main)"
    ahead_behind="$("${GIT_BIN}" rev-list --left-right --count HEAD...upstream/main)"
  fi

  {
    "${PRINTF_BIN}" '# Git snapshot %s\n\n' "${timestamp}"
    "${PRINTF_BIN}" -- "- branch: \`%s\`\n" "${branch}"
    "${PRINTF_BIN}" -- "- HEAD: \`%s\`\n" "${head}"
    "${PRINTF_BIN}" -- "- upstream/main: \`%s\`\n" "${upstream_head}"
    "${PRINTF_BIN}" -- "- local ahead / behind upstream: \`%s\`\n" "${ahead_behind}"
  } > "${output_path}"

  append_cmd "Remotes" "${GIT_BIN}" remote -v
  "${SED_BIN}" -E -i 's#(https?://)[^/@]+@#\1***@#g' "${output_path}"
  append_cmd "Working tree" "${GIT_BIN}" status -sb
  append_cmd "Tracked diff stat" "${GIT_BIN}" diff --stat HEAD
  append_cmd "Tracked changed files" "${GIT_BIN}" diff --name-status HEAD
  append_cmd "Untracked files" "${GIT_BIN}" ls-files --others --exclude-standard
  append_cmd "Frontend diff stat" "${GIT_BIN}" diff --stat HEAD -- web
  append_upstream_overlap

  "${PRINTF_BIN}" 'wrote %s\n' "${output_path}"
}

main "$@"
