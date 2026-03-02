# GitHub Workflow Guide

## Setting Up Your Repository

### 1. Create Repository on GitHub
1. Go to GitHub.com
2. Click "New" or "+" → "New repository"
3. Name: `backend-journey`
4. Description: Learning backend development and Git fundamentals
5. Choose public or private
6. Don't initialize with README (we already have one)
7. Click "Create repository"

### 2. Connect Local Repository to GitHub
```bash
# Add remote (if not already added)
git remote add origin https://github.com/YOUR-USERNAME/backend-journey.git

# Verify remote
git remote -v

# Push to GitHub
git push -u origin main
```

## Pull Request Workflow

### Feature Branch Workflow
```bash
# 1. Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/new-feature

# 2. Make changes and commit
git add .
git commit -m "feat: add new feature"

# 3. Push feature branch
git push origin feature/new-feature

# 4. Create Pull Request on GitHub
# - Go to your repository
# - Click "Compare & pull request"
# - Add title and description
# - Request reviewers
# - Click "Create pull request"

# 5. After approval, merge PR on GitHub
# 6. Delete feature branch
git checkout main
git pull origin main
git branch -d feature/new-feature
```

## Collaboration Practice

### Forking an Open Source Repository
```bash
# 1. Fork repository on GitHub (click "Fork" button)

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/forked-repo.git
cd forked-repo

# 3. Add upstream remote
git remote add upstream https://github.com/ORIGINAL-OWNER/forked-repo.git

# 4. Keep your fork synchronized
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### Contributing to Open Source
```bash
# 1. Create feature branch
git checkout -b feature/improvement

# 2. Make your changes
# - Fix a bug
# - Add a feature
# - Improve documentation
# - Add tests

# 3. Commit following project's conventions
git add .
git commit -m "feat: add helpful feature"

# 4. Push to your fork
git push origin feature/improvement

# 5. Create Pull Request
# - Go to original repository
# - Click "New pull request"
# - Click "compare across forks"
# - Select your fork and branch
# - Write comprehensive PR description:
#   - What changes were made
#   - Why changes were needed
#   - How to test the changes
#   - Related issues (if any)
```

### Pull Request Best Practices
✅ **DO:**
- Write clear, descriptive PR titles
- Provide detailed description
- Link related issues
- Keep PRs focused and small
- Add tests if applicable
- Update documentation
- Respond to review feedback promptly

❌ **DON'T:**
- Mix unrelated changes
- Submit huge PRs
- Ignore project guidelines
- Force push after reviews started
- Leave unfinished code

## Code Review Process

### As a Contributor
1. Respond to feedback professionally
2. Make requested changes
3. Push updates to the same branch
4. Mark conversations as resolved
5. Request re-review when ready

### As a Reviewer
1. Review code thoughtfully
2. Be constructive and respectful
3. Ask questions for clarification
4. Suggest improvements
5. Approve when satisfied

## GitHub Features to Explore

### Issues
- Track bugs and feature requests
- Use labels for organization
- Assign to team members
- Link to pull requests

### Projects
- Kanban boards for task management
- Automate workflows
- Track progress

### Actions
- CI/CD pipelines
- Automated testing
- Deploy on merge

### Wiki
- Project documentation
- Guides and tutorials
- Architecture decisions

## Daily Workflow Example
```bash
# Morning: Update local repository
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/daily-work

# Work on feature
# ... make changes ...
git add .
git commit -m "feat: implement feature X"

# Push and create PR
git push origin feature/daily-work
# Create PR on GitHub

# Evening: Clean up merged branches
git checkout main
git pull origin main
git branch -d feature/daily-work
git remote prune origin
```

## Merge Conflict Resolution

When you encounter merge conflicts:
```bash
# 1. Pull latest changes
git pull origin main

# 2. Fix conflicts in your editor
# Look for markers:
# <<<<<<< HEAD
# =======
# >>>>>>> 

# 3. Stage resolved files
git add <resolved-files>

# 4. Complete merge
git commit -m "fix: resolve merge conflicts"

# 5. Push
git push origin your-branch
```

## Tips for Success
1. Pull before starting new work
2. Commit frequently with clear messages
3. Push regularly to backup work
4. Keep branches short-lived
5. Review your own code before requesting review
6. Be responsive to feedback
7. Delete merged branches
8. Keep commit history clean
