---
name: review
description: Code review skill for a second AI agent. Use to review pull requests for security, accessibility, architecture, performance, and guideline compliance without nitpicking minor issues.
allowed-tools: Bash(git:*), Bash(gh:*), Bash(curl:*), Bash(grep:*)
license: MIT
metadata:
  author: cloud-agents-test
  version: "1.0"
---

Code review skill designed for a **second AI agent** to review pull
requests opened by the worker agent. It performs structured reviews
focused on substantive concerns and deliberately ignores minor issues.

**Inputs**
- `REPO` (required): the `owner/name` GitHub repository.
- `PR_NUMBER` (required): the pull request number to review.

**Prerequisites**
- `gh` CLI is installed and authenticated, OR `GITHUB_TOKEN` is set.
- The current working directory is a clone of `REPO`.

**Steps**

1. **Fetch the PR diff**.
   ```bash
   gh pr diff "$PR_NUMBER" --repo "$REPO"
   ```
   Or via the REST API:
   ```bash
   curl -sf "https://api.github.com/repos/$REPO/pulls/$PR_NUMBER"
   ```

2. **Read the changed files in full context**. For each file in the
   diff, read the surrounding code to understand the change in context.

3. **Review for security issues**:
   - Secrets, tokens, or credentials committed to the repo.
   - Injection vulnerabilities (XSS, command injection, etc.).
   - Insecure dependencies or overly broad permissions.
   - Missing input validation on user-facing endpoints.

4. **Review for accessibility issues**:
   - Missing `alt` text on images.
   - Missing `aria-label` or `aria-labelledby` on interactive elements.
   - Missing focus management on route changes or modals.
   - Color contrast below WCAG AA (4.5:1 for text).
   - Missing `<label>` associations on form fields.
   - Missing skip-to-content link.
   - Keyboard navigation gaps (e.g. click-only handlers without
     keyboard equivalents).

5. **Review for guideline violations**:
   - Commits to `main` (should always be on a `cloud/` branch).
   - Merge commits (history must stay linear).
   - Missing `Closes #<n>` in commit messages for issue-linked PRs.
   - Changes that don't follow existing code conventions (naming,
     formatting, patterns used in the codebase).
   - Changes to `.git/config`, `.git/hooks`, or SSH auth settings.

6. **Review for performance issues**:
   - Unnecessary re-renders (Vue: missing `key` on `v-for`, missing
     `computed` for derived state).
   - Large synchronous operations on the main thread.
   - Missing lazy loading for heavy routes or components.
   - Bundle size regressions (large new dependencies, duplicate
     imports).
   - N+1 API call patterns.

7. **Review for architectural issues**:
   - Business logic mixed into view components.
   - Circular dependencies between modules.
   - Tight coupling that breaks single-responsibility principle.
   - Missing error boundaries or error handling for async operations.
   - Hardcoded values that should be configurable.

8. **Do NOT raise minor issues**:
   - Stylistic preferences (tabs vs spaces, quote style) if a linter
     or formatter exists.
   - Import ordering.
   - Variable naming preferences that follow existing conventions.
   - Comment style or density.
   - Trivial whitespace differences.
   - Personal preferences not backed by a documented standard.

9. **Post the review**. Summarize findings as a structured comment on
   the PR:
   ```bash
   gh pr comment "$PR_NUMBER" --repo "$REPO" --body "<review body>"
   ```
   Or via the REST API:
   ```bash
   curl -sf -X POST -H "Authorization: token $GITHUB_TOKEN" \
     "https://api.github.com/repos/$REPO/issues/$PR_NUMBER/comments" \
     -d '{"body":"<review body>"}'
   ```

   Format the review as:
   ```
   ## Code Review

   ### Security
   - [issue or "No concerns"]

   ### Accessibility
   - [issue or "No concerns"]

   ### Architecture
   - [issue or "No concerns"]

   ### Performance
   - [issue or "No concerns"]

   ### Guidelines
   - [issue or "No concerns"]

   ### Summary
   [overall assessment: approve / request changes / needs discussion]
   ```

10. **Do NOT approve or merge** the PR. Only provide feedback. The
    human reviewer makes the final decision.

**Guardrails**
- Focus on substantive issues only — security, a11y, architecture,
  performance, and guideline compliance.
- Never nitpick minor issues — if a linter or formatter would catch
  it, it's not worth a review comment.
- Read files in context, not just the diff hunk.
- Be constructive: suggest a fix or approach, don't just flag problems.
- Respect the author's intent — if a design choice is deliberate and
  documented, don't push a different approach.
- Do not approve, merge, or close PRs. Only comment with findings.
