# Git History Tools: log, diff, blame

## Overview
Git provides powerful tools to explore repository history, track changes, and understand code evolution.

---

## Git Log - View Commit History

### Basic Usage
```bash
# Show all commits
git log

# One commit per line
git log --oneline

# Graphical representation
git log --graph

# All branches
git log --all

# Combined (best overview)
git log --all --graph --oneline --decorate
```

### Common Options

#### Limit Number of Commits
```bash
# Last 5 commits
git log -5

# Last 10 commits
git log -n 10
```

#### Filter by Author
```bash
git log --author="John Doe"
git log --author="john@example.com"
```

#### Filter by Date
```bash
# Since specific date
git log --since="2024-01-01"
git log --after="2024-01-01"

# Until specific date
git log --until="2024-12-31"
git log --before="2024-12-31"

# Relative dates
git log --since="2 weeks ago"
git log --since="3 days ago"
git log --since="1 month ago"
```

#### Filter by File
```bash
# Commits affecting specific file
git log -- filename.txt

# Commits affecting files in directory
git log -- src/

# Show patches
git log -p -- filename.txt
```

#### Filter by Message
```bash
# Search commit messages
git log --grep="bug fix"
git log --grep="feature"

# Case insensitive
git log --grep="fix" -i
```

#### Search Code Changes
```bash
# Find commits that added or removed string
git log -S "functionName"

# Find commits that changed specific regex
git log -G "class.*Name"
```

### Pretty Formatting

#### Custom Format
```bash
# Custom output
git log --pretty=format:"%h - %an, %ar : %s"
# Output: abc123 - John Doe, 2 days ago : feat: add feature

# Useful format placeholders:
# %H  - commit hash
# %h  - abbreviated hash
# %an - author name
# %ae - author email
# %ad - author date
# %ar - author date, relative
# %cn - committer name
# %ce - committer email
# %cd - committer date
# %cr - committer date, relative
# %s  - subject/message
```

#### Preset Formats
```bash
# Short format
git log --pretty=short

# Full format
git log --pretty=full

# Detailed format
git log --pretty=fuller

# One line
git log --oneline
```

### Advanced Filtering

#### Branch Comparisons
```bash
# Commits in branch1 but not in branch2
git log branch1 ^branch2

# Alternative syntax
git log branch1..branch2

# Show difference
git log main..feature
```

#### Merge Commits
```bash
# Show merge commits
git log --merges

# Hide merge commits
git log --no-merges
```

### Useful Aliases
Add to `.gitconfig`:
```bash
[alias]
    lg = log --oneline --graph --all --decorate
    lol = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
    ls = log --pretty=format:"%C(yellow)%h%Cred%d\\ %Creset%s%Cblue\\ [%cn]" --decorate
```

---

## Git Diff - View Changes

### Basic Usage
```bash
# Unstaged changes
git diff

# Staged changes
git diff --staged
git diff --cached

# All changes (staged + unstaged)
git diff HEAD
```

### Compare Commits
```bash
# Between two commits
git diff commit1 commit2

# Between current and specific commit
git diff abc123

# Between current and 3 commits ago
git diff HEAD~3
```

### Compare Branches
```bash
# Difference between branches
git diff branch1 branch2

# Current branch vs main
git diff main

# Show only filenames
git diff --name-only main feature
```

### Compare Specific Files
```bash
# Specific file changes
git diff filename.txt

# File changes in specific commit
git diff commit1 commit2 -- filename.txt

# File between branches
git diff branch1 branch2 -- src/app.js
```

### Useful Options

#### Show Statistics
```bash
# Show statistics
git diff --stat

# Short summary
git diff --shortstat

# Number of changes per file
git diff --numstat
```

#### Word-Level Diff
```bash
# Show word differences (not line)
git diff --word-diff

# Color words
git diff --word-diff=color
```

#### Ignore Whitespace
```bash
# Ignore whitespace changes
git diff -w
git diff --ignore-all-space

# Ignore whitespace at line ends
git diff --ignore-space-at-eol
```

### Advanced Usage

#### Show Function Names
```bash
# Show which function changed
git diff -p

# Show extended header
git diff --full-index
```

#### Diff Tools
```bash
# Use external diff tool
git difftool

# Configure tool (e.g., meld, kdiff3, vimdiff)
git config --global diff.tool meld
git difftool main feature
```

---

## Git Blame - Find Who Changed What

### Basic Usage
```bash
# Show who changed each line
git blame filename.txt

# Shorter output
git blame -s filename.txt

# Show email instead of name
git blame -e filename.txt
```

### Limit Range
```bash
# Specific line range
git blame -L 10,20 filename.txt

# From line 50 to end
git blame -L 50, filename.txt

# Single line
git blame -L 42,42 filename.txt
```

### Ignore Formatting Commits
```bash
# Ignore whitespace changes
git blame -w filename.txt

# Detect moved lines
git blame -M filename.txt

# Detect copied lines
git blame -C filename.txt

# Detect across all commits
git blame -C -C -C filename.txt
```

### Additional Information
```bash
# Show original path if renamed
git blame -C filename.txt

# Show commit message
git blame -c filename.txt

# Show date
git blame --date=short filename.txt
```

### With Interactive Search
```bash
# Blame and search
git blame filename.txt | grep "pattern"

# Who changed lines containing "function"
git blame filename.txt | grep "function"
```

### VS Code Integration
In VS Code:
- GitLens extension shows inline blame
- Hover over lines to see blame information
- Click to see commit details

---

## Practical Workflows

### Investigate a Bug
```bash
# 1. Find when file was last changed
git log -p -- buggy-file.js

# 2. See who made recent changes
git blame buggy-file.js

# 3. View specific commit
git show abc123

# 4. Compare with previous version
git diff HEAD~1 buggy-file.js
```

### Track Feature Development
```bash
# 1. Find all commits for feature
git log --grep="feature-name"

# 2. See code changes
git log -p --grep="feature-name"

# 3. View branch differences
git diff main..feature-branch

# 4. See merge history
git log --merges --oneline
```

### Code Review Preparation
```bash
# 1. Check what changed
git diff main..feature-branch

# 2. Review commit history
git log main..feature-branch --oneline

# 3. See detailed changes
git log -p main..feature-branch

# 4. Check file list
git diff --name-only main..feature-branch
```

### Find When Bug Was Introduced
```bash
# Binary search through history
git bisect start
git bisect bad                 # Current version is bad
git bisect good v1.0          # Known good version
# Git checks out middle commit
# Test it, then:
git bisect good  # or git bisect bad
# Repeat until found
git bisect reset
```

---

## Combining Tools

### Example 1: Detailed Investigation
```bash
# Find commits affecting file
git log --oneline -- app.js

# See changes in specific commit
git show abc123

# Check who wrote problematic code
git blame -L 50,60 app.js

# Compare with previous version
git diff abc123^ abc123 -- app.js
```

### Example 2: Release Comparison
```bash
# Commits between releases
git log v1.0..v2.0 --oneline

# Detailed changes
git log v1.0..v2.0 --stat

# Specific file changes
git diff v1.0 v2.0 -- CHANGELOG.md
```

### Example 3: Contribution Summary
```bash
# Commits by author
git log --author="Jane" --oneline

# Statistics
git log --author="Jane" --stat

# Changed files
git log --author="Jane" --name-only --pretty=format:
```

---

## Best Practices

### DO:
✅ Use `--oneline` for quick overview
✅ Use `--graph` to visualize branches
✅ Filter by date for specific periods
✅ Use `-p` to see actual changes
✅ Combine options for detailed analysis
✅ Create aliases for common commands

### DON'T:
❌ Overwhelm yourself with too much output
❌ Forget to specify file for focused search
❌ Ignore `grep` for filtering
❌ Miss out on `--stat` for overview

---

## Quick Reference

### Most Useful Commands
```bash
# Pretty commit history
git log --oneline --graph --all

# Changes in last 10 commits
git log -10 -p

# Who changed this file
git blame filename.txt

# What changed between branches
git diff main..feature

# Find commit that added/removed code
git log -S "searchterm"

# Show specific commit
git show abc123

# Files changed in commit
git show --name-only abc123

# Compare two commits
git diff abc123 def456
```

---

## Visualization Tools

### Command Line
- `git log --graph` - Built-in visualization
- `tig` - Text-mode interface for Git
- `lazygit` - Terminal UI

### GUI Tools
- GitKraken
- SourceTree
- GitHub Desktop
- GitLens (VS Code)

---

## Summary

| Tool | Purpose | Use When |
|------|---------|----------|
| `git log` | View commit history | Understanding project timeline |
| `git diff` | Compare changes | Reviewing modifications |
| `git blame` | Find who changed what | Investigating specific lines |
| `git show` | View commit details | Examining single commit |
| `git bisect` | Find bug introduction | Binary search for issues |

**Remember:** These tools are your detective kit for code archaeology!
