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
      github: 'https://github.com/christian-elias38',
      linkedin: 'https://www.linkedin.com/in/christiane-006073382/',
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
      "Designed and developed multiple full-stack web and mobile applications independently and in university project teams — spanning frontend interfaces, backend APIs, and database-driven data layers, alongside a mobile app and a cybersecurity assignment.",
    technologies: [
      'Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma',
      'Tailwind CSS', 'shadcn/ui', 'Cloudinary', 'Vercel', 'Flutter',
    ],
    achievements: [
      'Built responsive, accessible user interfaces with Tailwind CSS and shadcn/ui across several independent and team projects.',
      'Implemented REST APIs with request validation and structured error handling, backed by PostgreSQL and Prisma.',
      'Integrated third-party services including Cloudinary for media storage and authentication for user accounts.',
      'Deployed production applications on Vercel with environment-based configuration.',
      'Contributed to a Flutter-based mobile application, building admin panel and role-based access control features.',
      'Completed a cybersecurity assignment performing penetration testing and vulnerability analysis (XSS, SQL injection) on a test application, documenting findings with CVSS scoring and OWASP classification.',
    ],
    startDate: new Date('2024-01-01'),
    endDate: null,
  },
})

 await prisma.project.createMany({
  data: [
    {
      title: 'Student Registration Platform',
      description:
        'A full-stack Student Registration System built with React, Node.js, Express, and SQLite. Provides CRUD operations for managing student records with a clean, responsive interface.',
      technologies: ['React', 'Node.js', 'Express', 'SQLite'],
      category: 'Full-Stack',
      year: 2026,
      githubUrl: 'https://github.com/christian-elias38/student-registration-platform',
      imageUrl: 'https://res.cloudinary.com/p3v67tvk/image/upload/v1783655960/photo_2026-07-10_06-47-42_sd7ac0.jpg',
      featured: true,
    },
    {
      title: 'Fitness Challenge App',
      description:
        'A Flutter application that allows users to create and track fitness challenges. Users can add workout challenges, monitor progress, update challenge status, and delete completed or unwanted challenges.',
      technologies: ['Flutter', 'Dart'],
      category: 'Mobile',
      year: 2026,
      githubUrl: 'https://github.com/christian-elias38/Fitness-Challenge-App',
      featured: true,
    },
    {
      title: 'Calculator Project',
      description:
        'A clean, functional calculator application built with HTML, CSS, and JavaScript. Demonstrates DOM manipulation, event handling, and responsive UI design.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      category: 'Frontend',
      year: 2026,
      githubUrl: 'https://github.com/christian-elias38/Calculator-Project',
      imageUrl: 'https://res.cloudinary.com/p3v67tvk/image/upload/v1783655960/photo_2026-07-10_06-38-42_el1h8f.jpg',
      featured: false,
    },
    {
      title: 'Car Maintenance Tracker',
      description:
        'A cross-platform mobile app for tracking vehicle maintenance schedules, service records, and reminders. Built with Flutter for a smooth, native-like experience.',
      technologies: ['Flutter', 'Dart'],
      category: 'Mobile',
      year: 2026,
      githubUrl: 'https://github.com/christian-elias38/Car-MaIntenance-Tracker-',
      featured: false,
    },
    {
      title: 'Maze Project',
      description:
        'A Python-based maze generation and solving project demonstrating algorithmic problem solving, pathfinding logic, and interactive visualization techniques.',
      technologies: ['Python'],
      category: 'Algorithms',
      year: 2026,
      githubUrl: 'https://github.com/christian-elias38/maze_project',
      featured: false,
    },
    {
      title: 'C++ Academic Project',
      description:
        'University coursework project implementing core programming concepts in C++, including data structures, algorithms, and systems-level programming patterns.',
      technologies: ['C++'],
      category: 'Systems',
      year: 2026,
      githubUrl: 'https://github.com/christian-elias38/Christian-Elias-',
      featured: false,
    },
    {
      title: 'MiniGit',
      description:
        'A lightweight Git-like version control system implemented in C++. Explores core version control concepts including commits, branching, and repository management.',
      technologies: ['C++'],
      category: 'Systems',
      year: 2025,
      githubUrl: 'https://github.com/christian-elias38/MiniGit1',
      featured: false,
    },
    {
      title: 'Building Widgets',
      description:
        'A C++ project exploring reusable UI widget/component construction. (Placeholder description — update via the admin dashboard with project specifics.)',
      technologies: ['C++'],
      category: 'Systems',
      year: 2026,
      githubUrl: 'https://github.com/christian-elias38/Building-Widgets',
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