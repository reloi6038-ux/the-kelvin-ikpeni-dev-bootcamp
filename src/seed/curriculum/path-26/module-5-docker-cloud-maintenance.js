module.exports = {
  title: "Module 5: Docker, Cloud & Maintenance",
  description: "Containerization and long-term operations.",
  order: 5,
  lessons: [
    {
      title: "Docker Fundamentals for Node.js",
      slug: "docker-fundamentals",
      order: 1,
      estimatedMinutes: 40,
      content: `# Docker Fundamentals for Node.js

**Learning objectives:**
- Understand what Docker is
- Write a Dockerfile
- Build and run an image

## What is Docker?
Docker packages your app and its environment (Node, OS libraries) into a **container**. If it works on your machine, it will work on the server.

## The Dockerfile
Create a file named \`Dockerfile\`:

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

## Build the Image
\`\`\`bash
docker build -t my-app .
\`\`\`

## Run the Container
\`\`\`bash
docker run -p 3000:3000 -e MONGODB_URI=your-uri my-app
\`\`\`

## The .dockerignore File
Just like \`.gitignore\`, prevent Docker from copying node_modules:

\`\`\`
node_modules
.env
\`\`\`

## Key Takeaways
- Docker guarantees consistency across environments.
- Use Alpine images for smaller size.
- Never copy \`node_modules\` into the image.`
    },
    {
      title: "Introduction to Cloud Hosting",
      slug: "cloud-hosting",
      order: 2,
      estimatedMinutes: 25,
      content: `# Introduction to Cloud Hosting

**Learning objectives:**
- Compare hosting providers
- Understand PaaS vs IaaS

## PaaS (Platform as a Service)
You push code, they handle the servers.
- **Examples**: Render, Heroku, Vercel.
- **Pros**: Zero server management.
- **Cons**: Less control, can get expensive.

## IaaS (Infrastructure as a Service)
You rent a virtual machine and manage everything.
- **Examples**: AWS EC2, DigitalOcean Droplets.
- **Pros**: Full control, cheaper at scale.
- **Cons**: You must install Node, configure Nginx, manage firewalls.

## When to Use Which?
- **MVP / Startup**: PaaS (Render).
- **Enterprise / Custom**: IaaS (AWS).
- **Serverless**: AWS Lambda (for event-driven tasks).

## Key Takeaways
- PaaS is fastest for deploying.
- IaaS gives you full control.
- Start with PaaS and migrate as you grow.`
    },
    {
      title: "Backend Maintenance and Version Updates",
      slug: "backend-maintenance",
      order: 3,
      estimatedMinutes: 25,
      content: `# Backend Maintenance and Version Updates

**Learning objectives:**
- Keep dependencies secure
- Plan migrations
- Monitor for deprecations

## 1. Regular Audits
Run \`npm audit\` weekly. Fix critical vulnerabilities immediately.

## 2. Update Dependencies
Run \`npm outdated\` to see what needs updating. Update one major version at a time, and test thoroughly.

## 3. Node.js LTS
Node.js releases a new LTS (Long Term Support) version every year. Old versions eventually stop receiving security patches.

**Best Practice**: Upgrade your Node version at least once every 12 months.

## 4. Database Backups
MongoDB Atlas handles backups automatically on paid tiers. On the free tier, set up manual backups using \`mongodump\` or use Atlas Data API.

## Key Takeaways
- Maintenance is ongoing.
- Test every dependency update.
- Keep Node.js on an LTS version.`
    }
  ]
};