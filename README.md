# My Portfolio

My personal developer portfolio, built from the ground up as a full-stack Next.js application — not a template, not a theme.

## Live Site
[your-deployed-url-here]

## Tech Stack
- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui (Base UI, New York style) — fully semantic design tokens, no hardcoded colors
- **Database:** Prisma ORM v7 + Neon (serverless Postgres)
- **Media:** Cloudinary via `next-cloudinary` for image upload/transformation
- **Animation/3D:** Framer Motion, GSAP, Three.js via React Three Fiber, Lenis for smooth scroll

## Features
- [Add 2-4 bullets on actual page/feature content — projects showcase, contact form, blog, whatever the site actually does]
- Custom burgundy/warm-earth-tone design system enforced through shadcn CSS variables
- 3D interactive elements rendered with React Three Fiber

## Notable Engineering Challenges
- Migrated through Prisma v7's breaking changes
- Resolved a Zod v4 / `@hookform/resolvers` incompatibility
- Handled `lucide-react` v1.0's removal of brand icons
- Cleaned up a duplicate nested git repo (Windows-specific issue)

## Running Locally
\`\`\`bash
git clone https://github.com/chr1133/My-Portfolio.git
cd My-Portfolio
npm install
cp .env.example .env  # add DATABASE_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
npx prisma generate
npm run dev
\`\`\`

## License
[MIT or whatever you prefer]
