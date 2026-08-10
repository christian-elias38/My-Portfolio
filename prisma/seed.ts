import { prisma } from '../lib/prisma'

async function main() {
  // Clear existing data so reseeding doesn't duplicate
  await prisma.profile.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.education.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.project.deleteMany()

  await prisma.profile.create({
    data: {
      name: 'Christian Elias',
      headline: 'Software Engineering Student | Full-Stack Developer | AI Enthusiast',
      email: 'christianelias102@gmail.com',
      bio: `I'm Christian Elias, a Software Engineering student at Addis Ababa University with a passion for building modern, scalable, and user-friendly web applications.

I specialize in full-stack development using Next.js, React, TypeScript, Node.js, PostgreSQL, and Prisma. I enjoy creating clean UI/UX experiences with Tailwind CSS and shadcn/ui while building secure backend APIs and databases.

I'm continuously learning cloud technologies, AI-powered applications, and modern software architecture. My goal is to become a professional software engineer who builds impactful digital products that solve real-world problems.`,
      location: 'Addis Ababa, Ethiopia',
      github: 'https://github.com/chr1133',
      linkedin: 'https://https://www.linkedin.com/in/christiane-006073382/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BYcff6xoPRFmltok1ONQETQ%3D%3D', 
    },
  })

  await prisma.skill.createMany({
    data: [
      // Frontend
      { name: 'HTML5', category: 'Frontend', level: 4 },
      { name: 'CSS3', category: 'Frontend', level: 4 },
      { name: 'JavaScript', category: 'Frontend', level: 4 },
      { name: 'TypeScript', category: 'Frontend', level: 4 },
      { name: 'React', category: 'Frontend', level: 4 },
      { name: 'Next.js', category: 'Frontend', level: 4 },
      { name: 'Tailwind CSS', category: 'Frontend', level: 4 },
      { name: 'shadcn/ui', category: 'Frontend', level: 4 },
      // Backend
      { name: 'Node.js', category: 'Backend', level: 3 },
      { name: 'Express.js', category: 'Backend', level: 3 },
      { name: 'REST API', category: 'Backend', level: 3 },
      { name: 'Prisma ORM', category: 'Backend', level: 3 },
      // Database
      { name: 'PostgreSQL', category: 'Database', level: 3 },
      { name: 'Neon Database', category: 'Database', level: 3 },
      // Mobile
      { name: 'Flutter', category: 'Mobile', level: 4 },
      { name: 'Dart', category: 'Mobile', level: 4 },
      // Cloud
      { name: 'Vercel', category: 'Cloud', level: 3 },
      { name: 'Cloudinary', category: 'Cloud', level: 3 },
      // Tools
      { name: 'Git', category: 'Tools', level: 4 },
      { name: 'GitHub', category: 'Tools', level: 4 },
      { name: 'VS Code', category: 'Tools', level: 4 },
      { name: 'Postman', category: 'Tools', level: 3 },
      { name: 'Figma', category: 'Tools', level: 3 },
      { name: 'pnpm', category: 'Tools', level: 4 },
      { name: 'npm', category: 'Tools', level: 4 },
    ],
  })

await prisma.education.create({
  data: {
    institution: 'Addis Ababa University',
    college: 'Addis Ababa Institute of Technology (AAIT)',
    degree: 'BSc in Software Engineering',
    field: 'Software Engineering',
    startYear: 2023,
    endYear: null,
    description:
      "Currently pursuing a Bachelor's degree in Software Engineering with a curriculum spanning Data Structures and Algorithms, Database Systems, Software Engineering principles, Computer Networking, Operating Systems, Human-Computer Interaction, and Full-Stack Development. Coursework blends theoretical foundations with hands-on project work, including collaborative team-based software builds, technical documentation, and iterative development practices. Actively engaged in extracurricular technical projects alongside coursework, applying classroom concepts to real, deployed applications.",
  },
})

await prisma.experience.create({
  data: {
    company: 'Academic & Personal Projects',
    role: 'Full-Stack Developer',
    description:
      "Designed and developed multiple full-stack web and mobile applications independently and in university project teams, spanning Next.js/React frontends, Node.js/Express backends, and PostgreSQL/Prisma data layers. Built responsive, accessible user interfaces with Tailwind CSS and shadcn/ui, implemented REST APIs with proper validation and error handling, and integrated third-party services including Cloudinary for media storage and Better Auth for authentication. Deployed production applications on Vercel with environment-based configuration. Additionally contributed to a Flutter-based mobile application (admin panel and role-based access control features) and completed a cybersecurity assignment performing penetration testing and vulnerability analysis (XSS, SQL injection) on a test application, documenting findings with CVSS scoring and OWASP classification.",
    startDate: new Date('2024-01-01'),
    endDate: null,
  },
})

 await prisma.project.createMany({
  data: [
    {
      title: 'Portfolio Website',
      description:
        'A modern full-stack portfolio built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Prisma, Neon PostgreSQL, Cloudinary, and Vercel featuring dynamic content management, animations, and responsive design.',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind', 'Cloudinary'],
      githubUrl: 'https://github.com/chr1133/My-Portfolio',
      imageUrl: 'https://res.cloudinary.com/p3v67tvk/image/upload/v1783655989/Screenshot_2026-07-10_063521_r72kjz.png',
      featured: true,
    },
    {
      title: 'Student Registration Platform',
      description:
        'A full-stack Student Registration System built with React, Node.js, Express, and SQLite. Provides CRUD operations for managing student records with a clean, responsive interface.',
      technologies: ['React', 'Node.js', 'Express', 'SQLite'],
      githubUrl: 'https://github.com/chr1133/student-registration-platform',
      imageUrl: 'https://res.cloudinary.com/p3v67tvk/image/upload/v1783655960/photo_2026-07-10_06-47-42_sd7ac0.jpg',
      featured: true,
    },
    {
      title: 'Fitness Challenge App',
      description:
        'A Flutter application that allows users to create and track fitness challenges. Users can add workout challenges, monitor progress, update challenge status, and delete completed or unwanted challenges.',
      technologies: ['Flutter', 'Dart'],
      githubUrl: 'https://github.com/chr1133/Fitness-Challenge-App',
      featured: false,
    },
    {
      title: 'Calculator Project',
      description:
        'A clean, functional calculator application built with HTML, CSS, and JavaScript. Demonstrates DOM manipulation, event handling, and responsive UI design.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      githubUrl: 'https://github.com/chr1133/Calculator-Project',
      imageUrl: 'https://res.cloudinary.com/p3v67tvk/image/upload/v1783655960/photo_2026-07-10_06-38-42_el1h8f.jpg',
      featured: false,
    },
    {
      title: 'Car Maintenance Tracker',
      description:
        'A cross-platform mobile app for tracking vehicle maintenance schedules, service records, and reminders. Built with Flutter for a smooth, native-like experience.',
      technologies: ['Flutter', 'Dart'],
      githubUrl: 'https://github.com/chr1133/Car-MaIntenance-Tracker-',
      featured: false,
    },
    {
      title: 'Maze Project',
      description:
        'A Python-based maze generation and solving project demonstrating algorithmic problem solving, pathfinding logic, and interactive visualization techniques.',
      technologies: ['Python'],
      githubUrl: 'https://github.com/chr1133/maze_project',
      featured: false,
    },
    {
      title: 'C++ Academic Project',
      description:
        'University coursework project implementing core programming concepts in C++, including data structures, algorithms, and systems-level programming patterns.',
      technologies: ['C++'],
      githubUrl: 'https://github.com/chr1133/Christian-Elias-Ugr-8399-16',
      featured: false,
    },
    {
      title: 'MiniGit',
      description:
        'A lightweight Git-like version control system implemented in C++. Explores core version control concepts including commits, branching, and repository management.',
      technologies: ['C++'],
      githubUrl: 'https://github.com/chr1133/MiniGit1',
      featured: false,
    },
  ],
})
  // Certificates and Blog Posts intentionally left empty per your instructions —
  // add them via the admin dashboard once you actually have them.
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())