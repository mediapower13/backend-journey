# Git Exercises

Practice exercises to master Git fundamentals.

## Exercise 1: Basic Git Operations

### Objective
Practice basic Git commands for daily development workflow.

### Tasks
1. ✅ Initialize a Git repository
2. ✅ Create and modify files
3. ✅ Stage and commit changes
4. ✅ View commit history
5. ✅ Check repository status

### Commands to Practice
```bash
git init
git status
git add <file>
git commit -m "message"
git log
git log --oneline
```

## Exercise 2: Branch Management

### Objective
Learn to create, switch, and merge branches.

### Tasks
1. ✅ Create a new branch
2. ✅ Switch between branches
3. Make changes in different branches
4. Merge branches
5. Delete merged branches

### Commands to Practice
```bash
git branch <branch-name>
git checkout <branch-name>
git checkout -b <new-branch>
git merge <branch-name>
git branch -d <branch-name>
```

### Branch Strategy
```
main (production)
  └── develop (integration)
       ├── feature/user-auth
       ├── feature/api-endpoints
       └── bugfix/login-error
```

## Exercise 3: Merge Conflict Resolution

### Objective
Practice resolving merge conflicts.

### Setup
1. Create two branches from main
2. Modify the same file in both branches
3. Merge first branch to main
4. Merge second branch - conflict!

### Steps to Resolve
```bash
# Create conflict scenario
git checkout main
git checkout -b branch-a
# Edit file, commit
git checkout main
git checkout -b branch-b
# Edit same lines, commit

# Merge and resolve
git checkout main
git merge branch-a    # Success
git merge branch-b    # Conflict!

# Fix conflicts in editor
git add <resolved-file>
git commit -m "fix: resolve merge conflicts"
```

## Exercise 4: Undoing Changes

### Objective
Learn different ways to undo changes.

### Scenarios
1. Discard unstaged changes
2. Unstage staged files
3. Amend last commit
4. Revert a commit
5. Reset to previous commit

### Commands
```bash
# Discard changes
git checkout -- <file>
git restore <file>

# Unstage
git reset HEAD <file>
git restore --staged <file>

# Amend commit
git commit --amend

# Revert (safe for shared branches)
git revert <commit-hash>

# Reset (dangerous!)
git reset --soft <commit>   # Keep staged
git reset --mixed <commit>  # Keep unstaged
git reset --hard <commit>   # Discard all
```

## Exercise 5: Remote Repository

### Objective
Work with remote repositories (GitHub).

### Tasks
1. Create repository on GitHub
2. Add remote to local repository
3. Push local commits
4. Pull remote changes
5. Create and merge pull request

### Commands
```bash
git remote add origin <url>
git remote -v
git push origin <branch>
git push -u origin main
git pull origin main
git fetch origin
```

## Exercise 6: Interactive Rebase

### Objective
Clean up commit history before merginng.

### Tasks
1. Create multiple commits
2. Use interactive rebase to:
   - Reword commit messages
   - Squash commits
   - Reorder commits
   - Edit commits

### Commands
```bash
git rebase -i HEAD~3
# In editor:
# pick = use commit
# reword = change message
# edit = amend commit
# squash = combine with previous
# drop = remove commit
```

## Exercise 7: Git Stash

### Objective
Temporarily save work in progress.

### Scenarios
1. Save changes without committing
2. Switch branches with uncommitted work
3. Apply stashed changes later

### Commands
```bash
git stash
git stash save "message"
git stash list
git stash apply
git stash pop
git stash drop
git stash clear
```

## Exercise 8: Git History Investigation

### Objective
Use Git tools to investigate code history.

### Tasks
1. View commit history with different formats
2. Find when a bug was introduced
3. See who changed specific lines
4. Compare branches

### Commands
```bash
# View history
git log
git log --oneline --graph --all
git log --author="name"
git log --since="2 weeks ago"
git log -- <file>

# Find changes
git diff
git diff <branch1>..<branch2>
git show <commit>

# Blame
git blame <file>
git blame -L 10,20 <file>

# Search
git log -S "search term"
git grep "pattern"
```

## Challenge: Complete Git Workflow

### Scenario
You're working on a team project. Practice the complete workflow:

1. Clone repository
2. Create feature branch
3. Make changes and commit
4. Push to remote
5. Create pull request
6. Respond to review feedback
7. Merge pull request
8. Update local main branch
9. Delete feature branch

### Success Criteria
- Follow conventional commits
- Keep commits atomic
- Write clear PR description
- Resolve any merge conflicts
- Clean up after merge

## Tips for Success
1. Practice daily
2. Make mistakes in a safe environment
3. Read error messages carefully
4. Use `git status` frequently
5. Commit often, perfect later
6. Document your learnings
7. Help others learn Git

## Resources
- [Pro Git Book](https://git-scm.com/book/en/v2)
- [GitHub Guides](https://guides.github.com/)
- [Oh Shit, Git!?!](https://ohshitgit.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
