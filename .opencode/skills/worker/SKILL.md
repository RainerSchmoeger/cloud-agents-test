---
name: worker
description: Autonomous issue-triage worker loop. Use when the user wants the agent to continuously process GitHub issues - fetching issues/PRs, closing solved issues, rebasing PRs, creating fix branches, and waiting between cycles until the time budget expires.
allowed-tools: Bash(git:*), Bash(gh:*), Bash(curl:*), Bash(sleep:*), Bash(grep:*), Bash(paste:*)
license: MIT
metadata:
  author: cloud-agents-test
  version: "1.0"
---

Autonomous issue-triage worker loop. The agent runs a continuous cycle
that keeps the repository's open issues at zero by opening fix branches
for each one, while housekeeping already-merged PRs.

**Inputs**
- `REPO` (required): the `owner/name` GitHub repository to operate on.
- `TIME_BUDGET_MINUTES` (optional, default `30`): how long the loop runs
  before stopping automatically.
- `IDLE_POLL_SECONDS` (optional, default `60`): how long to wait between
  cycles when no open issues remain.

**Prerequisites**
- `git` is configured with push access to `REPO` (deploy key or SSH agent).
- `gh` CLI is installed and authenticated, OR `GITHUB_TOKEN` is set so
  `curl` calls against the GitHub REST API succeed.
- The current working directory is a clone of `REPO` on the `main` branch.

**Steps**

1. **Start the loop**. Record the start time. Compute
   `deadline = now + TIME_BUDGET_MINUTES`.

2. **Fetch all open issues and PRs**.

   Using `gh`:
   ```bash
   gh issue list --repo "$REPO" --state open --json number,title,body
   gh pr list   --repo "$REPO" --state open --json number,title,headRefName
   ```
   Or via the REST API:
   ```bash
   curl -sf "https://api.github.com/repos/$REPO/issues?state=open&per_page=100"
   ```

3. **Close solved issues**. For each open issue that is referenced by a
   **merged** PR (check `gh pr view <n> --json mergedAt` or the REST
   API `pulls` endpoint), close the issue:
   ```bash
   gh issue close "$REPO" "<issue_number>" --comment "Closed by merged PR #<pr>"
   ```

4. **Rebase existing open PRs on `main`**. For each open PR:
   ```bash
   git fetch origin main
   git checkout "<pr_head_branch>"
   git rebase origin/main
   git push --force-with-lease
   ```
   Skip and report if conflicts cannot be resolved automatically.

5. **Reply to and address GitHub review comments**. For each open PR,
   fetch both review comments (inline, on specific lines) and issue
   comments (general conversation):

   Using `gh`:
   ```bash
   gh api repos/$REPO/pulls/<pr_number>/comments
   gh api repos/$REPO/issues/<pr_number>/comments
   ```
   Or via the REST API:
   ```bash
   curl -sf "https://api.github.com/repos/$REPO/pulls/<pr_number>/comments"
   curl -sf "https://api.github.com/repos/$REPO/issues/<pr_number>/comments"
   ```

   For each unresolved comment that requests a change or raises a
   concern:
   - Read and understand the feedback.
   - Make the requested code change on the PR's branch (checkout the
     `headRefName`, commit, push). Re-trigger CI by pushing.
   - Reply to the comment to acknowledge the fix:
     ```bash
     gh pr comment "<pr_number>" --repo "$REPO" --body "Addressed in <commit-sha>: <summary>"
     ```
     Or via the REST API:
     ```bash
     curl -sf -X POST -H "Authorization: token $GITHUB_TOKEN" \
       "https://api.github.com/repos/$REPO/issues/<pr_number>/comments" \
       -d '{"body":"Addressed in <sha>: <summary>"}'
     ```
   - If a comment is a question rather than a change request, reply
     with an answer instead of editing code.
   - If a comment is unclear, reply asking for clarification rather
     than guessing.
    - Skip bot-generated comments (e.g. deploy previews).

6. **Review dependabot PRs**. For each open PR authored by `dependabot`
   (or `github-actions[bot]` for action updates):
   - Fetch the diff to understand the dependency change:
     ```bash
     gh pr diff <pr_number> --repo "$REPO"
     ```
   - Review for **breaking changes / migrations**: check the dependency's
     changelog or release notes for major version bumps. If the package
     has a migration guide (e.g. Vite 7→8, Vue 3 minor), verify the
     codebase is compatible.
   - **Make the PR green**: if CI is failing, checkout the PR branch,
     fix any test or build failures, commit, and push:
     ```bash
     git fetch origin pull/<pr_number>/head:dep-pr-<pr_number>
     git checkout dep-pr-<pr_number>
     # fix issues...
     git push origin dep-pr-<pr_number>
     ```
   - If the dependency bump requires code changes (e.g. deprecated API
     removed), apply them on the branch.
   - Reply on the PR with a summary of the review:
     ```bash
     gh pr comment <pr_number> --repo "$REPO" \
       --body "Reviewed: <summary of changes/migrations checked>"
     ```
   - Do NOT merge the PR; leave approval to the human reviewer.

7. **Fix the most important open issue**. Pick the highest-priority
   remaining open issue (lowest number, or one explicitly labelled
   `priority`/`bug`). Create a branch:
   ```bash
   git checkout -b "cloud/issue-<number>-<description>" origin/main
   ```
   Implement the fix, commit with a message ending in:
   ```
   Closes #<number>
   ```
   Push the branch. Open a PR if `gh` auth is available:
   ```bash
   gh pr create --repo "$REPO" --base main --head "cloud/issue-<number>-<description>" \
     --title "<imperative summary>" --body "<description>"
   ```
   If `gh`/API auth is unavailable, push the branch and report the
   PR-creation URL for the human to click.

8. **Check for remaining issues**. If open issues still exist, go to
   step 2 immediately (process the next one). If no open issues remain,
   proceed to step 9.

9. **Idle wait**. When no issues are present, wait for
   `IDLE_POLL_SECONDS`:
   ```bash
   sleep "$IDLE_POLL_SECONDS"
   ```

10. **Check deadline**. If `now >= deadline` (i.e. waited for
   `TIME_BUDGET_MINUTES` total), **stop**. Otherwise go to step 2 and
   continue the loop.

**Guardrails**
- Never commit directly to `main`; always use a `cloud/` branch.
- Never merge, approve, or close a PR yourself - leave that to the human
  reviewer. Only close *issues* whose referenced PR has been merged.
- Use `git push --force-with-lease` (never `--force`) when rebasing.
- Keep commits small and focused; one issue per branch.
- Commit messages in the imperative mood, ending with `Closes #<n>`.
- If an issue is unclear or ambiguous, skip it and move to the next one
  rather than guessing.
- Respect the time budget: once `TIME_BUDGET_MINUTES` has elapsed since
  the loop started, stop regardless of remaining work.
