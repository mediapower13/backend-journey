# Git Commands Reference Guide

## Essential Git Commands

### Repository Setup
```bash
# Initialize a new repository
git init

# Clone an existing repository
git clone <repository-url>

# Configure user information
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Basic Workflow
```bash
# Check repository status
git status

# Stage files
git add <file>              # Stage specific file
git add .                   # Stage all changes
git add -p                  # Stage changes interactively

# Commit changes
git commit -m "message"     # Commit with inline message
git commit                  # Open editor for commit message
git commit --amend          # Modify last commit
```

### Conventional Commits Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only changes
- `style:` - Code style changes (formatting, semicolons, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `ci:` - CI/CD changes
- `build:` - Build system changes

**Examples:**
```bash
git commit -m "feat: add user authentication endpoint"
git commit -m "fix: resolve null pointer exception in login"
git commit -m "docs: update API documentation"
git commit -m "refactor: simplify database connection logic"
```

### Branch Management
```bash
# List branches
git branch                  # Local branches
git branch -r               # Remote branches
git branch -a               # All branches

# Create branch
git branch <branch-name>
git checkout -b <branch-name>   # Create and switch

# Switch branches
git checkout <branch-name>
git switch <branch-name>    # Modern alternative

# Merge branches
git merge <branch-name>
git merge --no-ff <branch-name>  # No fast-forward

# Delete branches
git branch -d <branch-name>      # Safe delete
git branch -D <branch-name>      # Force delete
```

### Remote Operations
```bash
# Add remote
git remote add origin <url>
git remote -v               # List remotes

# Fetch and pull
git fetch origin            # Download changes
git pull origin <branch>    # Fetch and merge

# Push changes
git push origin <branch>
git push -u origin <branch> # Set upstream tracking
git push --force            # Force push (use with caution!)
```

### History and Inspection
```bash
# View commit history
git log
git log --oneline
git log --graph --all --decorate
git log --author="name"
git log --since="2 weeks ago"

# Show changes
git diff                    # Unstaged changes
git diff --staged           # Staged changes
git diff <branch1>..<branch2>  # Between branches

# Show commit details
git show <commit-hash>

# Who changed what
git blame <file>
git blame -L 10,20 <file>   # Specific lines
```

### Undoing Changes
```bash
# Discard working directory changes
git checkout -- <file>
git restore <file>          # Modern alternative

# Unstage files
git reset HEAD <file>
git restore --staged <file> # Modern alternative

# Undo commits
git revert <commit>         # Create new commit undoing changes
git reset --soft <commit>   # Keep changes staged
git reset --mixed <commit>  # Keep changes unstaged (default)
git reset --hard <commit>   # Discard all changes (dangerous!)
```

### Stashing
```bash
# Save temporary changes
git stash
git stash save "message"
git stash -u                # Include untracked files

# List stashes
git stash list

# Apply stashes
git stash apply             # Apply latest stash
git stash apply stash@{0}   # Apply specific stash
git stash pop               # Apply and remove stash

# Delete stashes
git stash drop stash@{0}
git stash clear             # Remove all stashes
```

### Merge Conflict Resolution
```bash
# When merge conflicts occur:
# 1. Open conflicted files
# 2. Look for conflict markers:
#    <<<<<<< HEAD
#    Your changes
#    =======
#    Their changes
#    >>>>>>> branch-name
# 3. Edit to resolve conflicts
# 4. Remove conflict markers
# 5. Stage resolved files
git add <resolved-file>
# 6. Complete the merge
git commit
```

### Advanced Operations
```bash
# Cherry-pick commits
git cherry-pick <commit-hash>

# Rebase
git rebase <branch>
git rebase -i <commit>      # Interactive rebase

# Tag releases
git tag v1.0.0
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0

# Clean untracked files
git clean -n                # Dry run
git clean -f                # Remove untracked files
git clean -fd               # Remove untracked files and directories
```

## Best Practices

1. **Commit often, commit early**
2. **Write clear, descriptive commit messages**
3. **Use branches for features and bug fixes**
4. **Pull before you push**
5. **Review changes before committing**
6. **Never rewrite published history**
7. **Use .gitignore properly**
8. **Keep commits atomic (one logical change per commit)**

## Useful Aliases
Add to your `.gitconfig`:
```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --all --decorate"
```
