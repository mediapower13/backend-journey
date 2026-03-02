# Merge Conflict Resolution Practice

## What are Merge Conflicts?
Merge conflicts occur when Git cannot automatically merge changes from different branches because they modify the same lines in a file.

## Practice Scenario

This directory contains files to practice resolving merge conflicts.

### Scenario 1: Simple Conflict
Two developers edit the same configuration file.

### Scenario 2: Feature Collision
Two features modify the same function.

### Scenario 3: Documentation Conflict
Multiple updates to README or documentation.

## How to Practice

### Step 1: Create Conflict Scenario
```bash
# Create branch A
git checkout -b feature/update-config-a
# Edit config.txt
git add config.txt
git commit -m "feat: update config for feature A"

# Go back to main
git checkout main

# Create branch B
git checkout -b feature/update-config-b
# Edit same lines in config.txt
git add config.txt
git commit -m "feat: update config for feature B"

# Merge A first (succeeds)
git checkout main
git merge feature/update-config-a

# Try to merge B (conflict!)
git merge feature/update-config-b
```

### Step 2: Identify Conflicts
```bash
# Git will show:
# CONFLICT (content): Merge conflict in config.txt
# Automatic merge failed; fix conflicts and then commit the result.

# Check status
git status
```

### Step 3: Resolve Conflicts
Open the conflicted file and look for markers:
```
<<<<<<< HEAD
Your current changes (from feature A)
=======
Incoming changes (from feature B)
>>>>>>> feature/update-config-b
```

### Step 4: Edit to Choose Solution
Options:
1. Keep HEAD version
2. Keep incoming version
3. Combine both changes
4. Write entirely new solution

### Step 5: Mark as Resolved
```bash
# After editing
git add config.txt
git commit -m "fix: resolve merge conflicts between features A and B"
```

## Conflict Resolution Strategies

### 1. Accept Current Changes
Keep the version from the current branch (HEAD).

### 2. Accept Incoming Changes
Keep the version from the branch being merged.

### 3. Merge Both Changes
Combine elements from both versions.

### 4. Manual Resolution
Understand both changes and write the best solution.

## Best Practices

✅ **DO:**
- Read both versions carefully
- Understand the intent of each change
- Test after resolving
- Communicate with team members
- Remove all conflict markers
- Commit with clear message

❌ **DON'T:**
- Blindly accept one side
- Leave conflict markers in code
- Forget to test after resolving
- Rush the resolution
- Commit unfinished resolution

## Using VS Code for Conflicts

VS Code provides helpful UI:
- "Accept Current Change"
- "Accept Incoming Change"
- "Accept Both Changes"
- "Compare Changes"

## Prevention Tips

1. Pull frequently
2. Keep branches short-lived
3. Communicate with team
4. Use smaller, focused commits
5. Merge main into feature branch regularly

## Practice Files

Try resolving conflicts in these scenarios:
- [config.txt](./conflicts/config.txt) - Configuration conflict
- [feature.js](./conflicts/feature.js) - Code logic conflict
- [docs.md](./conflicts/docs.md) - Documentation conflict
