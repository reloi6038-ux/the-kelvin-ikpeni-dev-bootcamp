// Path 6: Git & GitHub
module.exports = {
  course: {
    title: "Git & GitHub",
    slug: "git-github",
    description:
      "Master version control, collaboration workflows, and publishing your work to the world.",
    level: "beginner",
    estimatedHours: 10,
    icon: "git",
    order: 6,
    isPublished: true,
  },
  modules: [
    {
      title: "Git Fundamentals",
      description: "Repositories, commits, and branching.",
      order: 1,
      lessons: [
        {
          title: "Your First Repository",
          slug: "first-repository",
          order: 1,
          estimatedMinutes: 25,
          content: `# Your First Repository

**Learning objectives:**
- Initialize a Git repository
- Make your first commit
- Understand the three states of a file

## What is Git?
**Git** is a distributed version control system. It tracks every change to your code, so you can:
- See what changed and when
- Revert to any past state
- Collaborate without overwriting each other
- Experiment safely on branches

## Setup (once per machine)
\`\`\`powershell
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
\`\`\`

## Initialize a Repo
\`\`\`powershell
cd my-project
git init
\`\`\`

This creates a hidden \`.git/\` folder — your entire project history lives there.

## The Three States
Every file in Git is in one of three states:

\`\`\`
Working Directory  →  Staging Area  →  Repository
    (edited)           (git add)        (git commit)
\`\`\`

1. **Working directory** — your current files
2. **Staging area** — files prepared for the next commit
3. **Repository** — files saved in Git history

## Your First Commit
\`\`\`powershell
git add .                  # stage all changes
git commit -m "Initial commit"
\`\`\`

## Checking Status
\`\`\`powershell
git status   # what's changed, what's staged
git log      # full history
git log --oneline  # compact history
\`\`\`

## The .gitignore File
Some files should never be committed:
- \`node_modules/\` — huge, reinstallable
- \`.env\` — contains secrets (database passwords, session keys)
- \`*.log\` — build artifacts

Add them to \`.gitignore\` **before** your first commit.

## Key Takeaways
- Git tracks history in \`.git/\`
- Three states: working, staged, committed
- Always add \`.env\` to \`.gitignore\``,
        },
        {
          title: "Branching and Merging",
          slug: "branching-merging",
          order: 2,
          estimatedMinutes: 30,
          content: `# Branching and Merging

**Learning objectives:**
- Create and switch branches
- Merge with and without conflicts
- Follow a professional workflow

## Why Branches?
Branches let you work on a feature without affecting the main code. If the experiment fails, delete the branch. If it succeeds, merge.

## Basic Workflow
\`\`\`powershell
# Create and switch to a new branch
git checkout -b feature/login

# Work, commit...
git add .
git commit -m "Add login form"

# Switch back to main
git checkout main

# Merge the feature branch
git merge feature/login
\`\`\`

## The Modern Command
\`git switch\` is the newer, clearer replacement:
\`\`\`powershell
git switch -c feature/login   # create + switch
git switch main               # switch to main
\`\`\`

## Merge Conflicts
If two branches edit the same line, Git pauses and marks the conflict:
\`\`\`javascript
<<<<<<< HEAD
const url = "http://localhost:3000";
=======
const url = "https://api.example.com";
>>>>>>> feature/login
\`\`\`

**To resolve:**
1. Open the file
2. Choose the correct version (delete the markers and one of the versions)
3. \`git add\` the resolved file
4. \`git commit\` to complete the merge

## Branch Strategy (Professional)
- \`main\` — always deployable
- \`feature/X\` — one feature per branch
- \`fix/Y\` — bug fixes
- \`release/Z\` — release preparation

Merge \`feature/*\` into \`main\` only when it's tested.

## Key Takeaways
- Branches are cheap and fast — create them freely
- \`git switch -c\` creates and switches in one step
- Resolve conflicts by editing the file, then \`git add\` and commit`,
        },
      ],
    },
    {
      title: "GitHub Collaboration",
      description: "Push, pull, and pull requests.",
      order: 2,
      lessons: [
        {
          title: "Pushing to GitHub",
          slug: "pushing-to-github",
          order: 1,
          estimatedMinutes: 25,
          content: `# Pushing to GitHub

**Learning objectives:**
- Push a local repo to GitHub
- Authenticate securely
- Never commit secrets

## Create a GitHub Repository
1. Go to **github.com/new**
2. Name: \`my-project\`
3. **Leave everything unchecked** (no README, no .gitignore)
4. Click **Create**

## Connect and Push
\`\`\`powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/my-project.git
git push -u origin main
\`\`\`

- \`-M main\` renames the branch to "main" (GitHub's default)
- \`-u\` sets the upstream — future \`git push\` commands are shorter

## Authentication
GitHub **no longer accepts passwords** for git operations. You need a **Personal Access Token**:
1. **github.com/settings/tokens**
2. **Generate new token (classic)**
3. Check \`repo\`
4. Copy the token
5. Use it as your password when prompted

Modern Windows git handles this automatically via **Credential Manager** — the first push opens a browser to authenticate.

## Never Commit Secrets
\`.env\` files contain:
- MongoDB connection strings (with password)
- Session secrets
- API keys

**If you commit \`.env\`:**
1. Immediately rotate every credential (change passwords)
2. The values are already public — deleting the file doesn't help
3. Add \`.env\` to \`.gitignore\` and re-commit

## Key Takeaways
- \`git push -u origin main\` sets up tracking
- Use Personal Access Tokens, not passwords
- \`.env\` in \`.gitignore\` — always`,
        },
        {
          title: "Pull Requests",
          slug: "pull-requests",
          order: 2,
          estimatedMinutes: 25,
          content: `# Pull Requests

**Learning objectives:**
- Open a pull request (PR)
- Review and merge PRs
- Understand PR-based collaboration

## What is a Pull Request?
A **PR** is a proposal to merge your branch into another branch. It's how teams review code, run tests, and discuss changes before they land on \`main\`.

## The PR Workflow
1. Create a feature branch and push it:
   \`\`\`powershell
   git switch -c feature/login
   # ... code ...
   git push origin feature/login
   \`\`\`

2. On GitHub, click **Compare & pull request**
3. Write a clear title and description:
   - **What** changed
   - **Why** it changed
   - How to **test** it
4. Assign reviewers
5. CI runs tests automatically
6. Once approved, click **Merge pull request**

## Writing Good PRs
- **Small PRs** — easier to review, less risk
- **One concern per PR** — don't mix a bug fix with a feature
- **Screenshots** for UI changes
- **Clear description** — future-you will thank present-you

## Code Review Etiquette
- Comment on **code**, not people
- Ask questions ("Why not X?") instead of accusing
- Approve when it's good enough — don't hold for perfection

## After Merge
\`\`\`powershell
git switch main
git pull origin main   # get the merge
git branch -d feature/login  # delete local branch
\`\`\`

## Key Takeaways
- PRs are the collaboration primitive on GitHub
- Small PRs merge faster and break less
- Review code, not the person`,
        },
      ],
    },
  ],
};