module.exports = {
  course: {
    title: "Git & GitHub",
    slug: "git-github",
    description: "Version control, collaboration, and publishing code to the world.",
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
          estimatedMinutes: 15,
          content: `# Your First Repository

A **repository** (repo) tracks changes to your project over time.

## Initialize
\`\`\`
git init
\`\`\`

## Configure identity (once per machine)
\`\`\`
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
\`\`\`

## Stage and commit
\`\`\`
git add .
git commit -m "Initial commit"
\`\`\`

- **add** — moves changes from working directory to staging
- **commit** — saves staged changes as a permanent snapshot

## Why commit history matters
Every commit is a checkpoint. You can return to any point in time. Never write history you'd be embarrassed to show — it's permanent (mostly).`,
        },
        {
          title: "Pushing to GitHub",
          slug: "pushing-to-github",
          order: 2,
          estimatedMinutes: 20,
          content: `# Pushing to GitHub

GitHub hosts your repository online.

## Create a repository
1. Go to **github.com/new**
2. Fill in name and description
3. Leave it empty (no README, no license)
4. Click **Create**

## Connect your local repo
\`\`\`
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
\`\`\`

## Authentication
GitHub requires a **Personal Access Token** (not your password):
1. **github.com/settings/tokens** → **Generate new token (classic)**
2. Check \`repo\` → Generate → Copy
3. Paste when prompted for password

## Never commit .env
Add \`.env\` to \`.gitignore\` **before** your first commit. Committing secrets exposes your database to attackers within minutes.`,
        },
      ],
    },
  ],
};