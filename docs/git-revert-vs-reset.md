# Git Revert vs Git Reset

## Understanding the Difference

### TL;DR
- **`git revert`**: Safe for shared branches - creates new commit that undoes changes
- **`git reset`**: Rewrites history - use only for local, unpushed commits

---

## Git Revert

### What It Does
Creates a **new commit** that undoes the changes from a previous commit.

### When to Use
- ✅ Undo changes on shared/public branches
- ✅ Maintain complete project history
- ✅ Safe for collaborative work
- ✅ After pushing to remote

### How It Works
```bash
# Revert the last commit
git revert HEAD

# Revert a specific commit
git revert <commit-hash>

# Revert without auto-commit
git revert -n <commit-hash>

# Revert multiple commits
git revert <oldest-commit>..<newest-commit>
```

### Example
```bash
# Commit history before:
* abc123 (HEAD) feat: add new feature
* def456 fix: bug fix
* ghi789 docs: update README

# Revert the new feature:
git revert abc123

# Commit history after:
* xyz999 (HEAD) Revert "feat: add new feature"
* abc123 feat: add new feature
* def456 fix: bug fix
* ghi789 docs: update README
```

### Pros & Cons
✅ **Pros:**
- Preserves history
- Safe for collaboration
- Can undo any commit
- Traceable changes

❌ **Cons:**
- Creates additional commits
- More cluttered history
- Can't clean up mistakes

---

## Git Reset

### What It Does
Moves the branch pointer backwards, **rewriting history**.

### When to Use
- ✅ Clean up local, unpushed commits
- ✅ Undo local mistakes
- ✅ Squash commits before pushing
- ⚠️ NEVER on shared/pushed branches

### Three Modes

#### 1. `--soft`: Keep Changes Staged
```bash
git reset --soft <commit>
```
- Moves HEAD to specified commit
- Keeps all changes staged
- Ready to re-commit

**Use case:** Redo commit message or combine commits

#### 2. `--mixed` (Default): Keep Changes Unstaged
```bash
git reset <commit>
# or
git reset --mixed <commit>
```
- Moves HEAD to specified commit
- Keeps changes in working directory
- Unstages everything

**Use case:** Re-stage files differently

#### 3. `--hard`: Discard Everything
```bash
git reset --hard <commit>
```
- Moves HEAD to specified commit
- **DELETES all changes**
- No way to recover (unless using reflog)

**Use case:** Completely abandon changes

### Examples

#### Undo Last Commit (Keep Changes)
```bash
git reset HEAD~1
# or
git reset --soft HEAD~1  # Keep staged
```

#### Undo Last 3 Commits
```bash
git reset HEAD~3
```

#### Return to Specific Commit
```bash
git reset --hard abc123
```

#### Discard All Local Changes
```bash
git reset --hard HEAD
```

### Pros & Cons
✅ **Pros:**
- Clean history
- Remove mistakes completely
- Squash commits easily

❌ **Cons:**
- Rewrites history
- Dangerous for shared branches
- Can lose work permanently
- Confuses collaborators

---

## Comparison Table

| Feature | `git revert` | `git reset` |
|---------|-------------|-------------|
| History | Preserves | Rewrites |
| New commit | Yes | No |
| Safe for shared branches | ✅ Yes | ❌ No |
| Removes from history | ❌ No | ✅ Yes |
| Collaborative | ✅ Safe | ⚠️ Dangerous |
| Undo options | Specific commits | Last N commits |
| Complexity | Simple | Three modes |

---

## Decision Guide

### Use `git revert` when:
- ✅ Working on main/shared branch
- ✅ Changes already pushed
- ✅ Need to maintain history
- ✅ Working with a team

### Use `git reset` when:
- ✅ Changes are local only
- ✅ Haven't pushed yet
- ✅ Want clean history
- ✅ Working alone

---

## Common Scenarios

### Scenario 1: Accidentally Committed to Wrong Branch
```bash
# You committed to main instead of feature branch
git reset --soft HEAD~1    # Undo commit, keep changes
git checkout -b feature/new-feature
git commit -m "feat: add feature"
```

### Scenario 2: Need to Undo Pushed Commit
```bash
# Changes already pushed
git revert <commit-hash>
git push origin main
```

### Scenario 3: Want to Squash Multiple Commits
```bash
# Before pushing
git reset --soft HEAD~3    # Go back 3 commits
git commit -m "feat: complete feature implementation"
```

### Scenario 4: Completely Abandon Local Work
```bash
# Discard everything
git reset --hard origin/main
```

---

## Recovery from Mistakes

### If You Reset by Accident
Use `git reflog` to find lost commits:
```bash
# View reflog
git reflog

# Find your commit
# Output shows:
# abc123 HEAD@{0}: reset: moving to HEAD~1
# def456 HEAD@{1}: commit: my important work

# Recover
git reset --hard def456
```

### If You Can't Find Changes
```bash
# Check reflog
git reflog

# Check lost commits
git fsck --lost-found

# Recover specific file
git checkout <commit> -- <file>
```

---

## Best Practices

### DO:
✅ Use `revert` for public branches
✅ Use `reset` for local cleanup
✅ Double-check before `reset --hard`
✅ Pull before pushing after revert
✅ Communicate with team

### DON'T:
❌ Reset pushed commits
❌ Force push after reset (unless you understand consequences)
❌ Use `--hard` without backing up
❌ Reset on shared branches
❌ Forget about `git reflog`

---

## Real-World Workflow

### Before Pushing (Use Reset)
```bash
git log --oneline
git reset HEAD~2
# Clean up and reorganize
git add .
git commit -m "feat: well-organized commit"
git push origin feature-branch
```

### After Pushing (Use Revert)
```bash
git log --oneline
git revert <bad-commit>
git push origin main
```

---

## Summary

### Git Revert
- **Creates new commit**
- Safe & transparent
- Use for public/shared branches
- Preserves history

### Git Reset
- **Rewrites history**
- Clean but dangerous
- Use for local changes only
- Three modes: soft, mixed, hard

**Golden Rule:** When in doubt, use `revert` for safety!
