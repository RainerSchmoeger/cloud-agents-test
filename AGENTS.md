# AGENTS.md

## Git Workflow Rules

These rules are mandatory. Follow them strictly for every change.

### 1. Never commit to master

- Never commit directly to `master` (or `main`).
- Never force push to `master`, or change its history in any way.
- `master` is a protected branch; treat it as read-only.

### 2. Enforce linear history

- Always rebase your feature branch on the latest `master` before pushing and before opening a PR.
- Run `git fetch origin && git rebase origin/master` frequently to stay up to date.
- Resolve rebase conflicts locally, then continue.
- Never create merge commits (`--no-ff`). Keep history linear.

### 3. Create a PR, never merge PRs yourself

- Open a pull request for every change, no matter how small.
- Never merge, approve, or close a PR yourself. Leave that to the human reviewer.
- Ensure the PR description clearly summarizes the changes and the rationale.

### 4. Always work on a branch

- Never work on `master` directly.
- Create a feature branch before making any changes.
- Commit and push your changes to that branch.
- Keep branches short-lived and focused on a single concern.

### 5. Branch name convention

- All branches must be prefixed with `cloud/`.
- Use kebab-case for the rest of the name.
- Examples: `cloud/add-login`, `cloud/fix-cart-totals`, `cloud/update-readme`.

### 6. Split work into meaningful commits

- Break work into small, focused, logically grouped commits.
- Each commit should represent one coherent change.
- Write clear, concise commit messages in the imperative mood (e.g. `add login form validation`).
- Do not mix unrelated changes in a single commit.
