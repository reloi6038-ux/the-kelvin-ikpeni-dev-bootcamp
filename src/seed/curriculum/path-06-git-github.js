// Path 6: Git & GitHub
module.exports = {
  course: {
    title: "Git & GitHub",
    slug: "git-github",
    description:
      "Version control, collaboration, and publishing code to the world.",
    level: "beginner",
    estimatedHours: 8,
    icon: "git",
    order: 6,
    isPublished: true,
  },
  modules: [
    {
      title: "Git Basics",
      description: "Repositories, commits, and branches.",
      order: 1,
      lessons: [
        {
          title: "Your First Repository",
          slug: "first-repository",
          order: 1,
          estimatedMinutes: 20,
          content: `# Your First Repository

A **repository** (repo) tracks changes to your project over time.

## Initialize
\`\`\`bash
git init
\`\`\`

## Configure Identity (once per machine)
\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
\`\`\`

## Stage and Commit
\`\`\`bash
git add .
git commit -m "Initial commit"
\`\`\`

- **add** — moves changes to staging.
- **commit** — saves staged changes permanently.

## Why Commit History Matters
Every commit is a checkpoint. You can return to any point.`,
        },
        {
          title: "Branching and Merging",
          slug: "branching-merging",
          order: 2,
          estimatedMinutes: 25,
          content: `# Branching and Merging

Branches let you work on features without breaking the main code.

## Creating a Branch
\`\`\`bash
git checkout -b feature/login
\`\`\`

## Switching Branches
\`\`\`bash
git checkout main
\`\`\`

## Merging
\`\`\`bash
git checkout main
git merge feature/login
\`\`\`

## Resolving Conflicts
If two branches change the same line, Git will pause and ask you to resolve manually. Open the conflicting file, look for \`<<<<<<<\` markers, choose the correct version, save, and commit.`,
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
          estimatedMinutes: 20,
          content: `# Pushing to GitHub

GitHub hosts your repository online.

## Create a Repository
1. Go to **github.com/new**
2. Fill in the name, leave empty
3. Click **Create**

## Connect and Push
\`\`\`bash
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
\`\`\`

## Authentication
GitHub requires a **Personal Access Token**:
1. **github.com/settings/tokens**
2. Generate new token (classic)
3. Check \`repo\`
4. Copy and paste when prompted

## Never Commit .env
Add \`.env\` to \`.gitignore\` **before** your first commit.`,
        },
        {
          title: "Pull Requests",
          slug: "pull-requests",
          order: 2,
          estimatedMinutes: 20,
          content: `# Pull Requests

A Pull Request (PR) is a proposal to merge your branch into the main branch.

## Workflow
1. Push your branch:
   \`\`\`bash
   git push origin feature/login
   \`\`\`
2. On GitHub, click **Compare & pull request**.
3. Write a title and description.
4. Assign reviewers (if applicable).
5. Merge when approved.

## Why Pull Requests?
- Review before merging.
- Run automated tests.
- Keep history clean.`,
        },
      ],
    },
  ],
};