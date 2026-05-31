# /push

Review staged/unstaged changes, recommend a branch name and commit message, then push — only after the user approves both. Optionally merge to main at the end.

## Steps

1. Run `git status` and `git diff HEAD` to understand what changed.
2. Ask: **"Do you want to create a new branch for these changes, or push to the current branch (`<current-branch-name>`)?"**
   - If new branch → proceed to step 3.
   - If current branch → skip to step 4 (commit message only).
3. **Recommend a branch name** based on the work. Use the convention:
   - `feat/` — new feature or capability
   - `fix/` — bug fix
   - `chore/` — tooling, config, deps, cleanup
   - `refactor/` — restructuring with no behavior change
4. **Recommend a commit message** following Conventional Commits:
   - Format: `type(scope): short description`
   - Example: `feat(bills): add CRUD routes to Express server`
   - Keep the subject under 72 characters
5. Present your recommendations clearly and ask: **"Approve this branch name and commit message, or change either one?"**
6. **Wait for the user's confirmation** before running any git or gh command.
7. Once approved, execute in order:
   ```
   git checkout -b <branch>   # skip if staying on current branch
   git add -A
   git commit -m "<message>"
   git push -u origin <branch>
   ```
8. Report the pushed branch URL from the `git push` output.
9. Ask: **"Do you want to merge this into main?"**
   - If yes: run `git checkout main && git pull origin main && git merge <branch> && git push origin main`, then report success.
   - If no: stop here.

## Rules

- Never push or merge without explicit user approval at each step.
- Never force-push (`--force`) unless the user explicitly asks.
- If the user is already on a non-main branch they want to keep, skip the `checkout -b` and just commit + push to the current branch.
- If there is nothing to commit (`git status` shows clean), tell the user and stop.
- Merge to main only uses fast-forward-safe merge — no rebasing unless asked.
