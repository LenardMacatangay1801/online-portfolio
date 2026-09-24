export const resume = {
  name: 'Lenard Macatangay',
  roles: ['Frontend Developer', 'Full-Stack Developer', 'Website Developer'],
  location: 'Batangas City, CALABARZON (Region 4A), Philippines',
  email: 'lenardmacatangay1801@gmail.com',
  phone: null as string | null,
  linkedin: null as string | null,
  github: null as string | null,
  portfolio: null as string | null,
  photo: '/profile.png',
  summary:
    '4th-year BS Information Technology student at the University of Batangas and aspiring Frontend / Full-Stack Website Developer based in Batangas City, Philippines. Builds web applications using HTML, CSS, JavaScript, and React on the front end, with Node.js, PHP, Python, and Java for application logic, plus databases and platforms including PostgreSQL, MongoDB, Supabase, and Firebase. Eager to contribute clean, maintainable code, learn quickly on real products, and help teams ship responsive, reliable websites and web apps.',
  skills: {
    frontend: ['HTML5', 'CSS3', 'Responsive Design', 'JavaScript', 'React'],
    backend: ['Node.js', 'PHP', 'Python', 'Java'],
    databases: ['PostgreSQL', 'MongoDB', 'Supabase', 'Firebase'],
    environments: ['XAMPP', 'WAMP'],
    soft: [
      'Problem-solving',
      'Attention to detail',
      'Communication',
      'Collaboration',
      'Self-directed learning',
      'Time management',
    ],
  },
  projects: [
    {
      id: '01',
      title: 'Project Alpha',
      status: 'In progress' as const,
      category: 'Frontend',
      progress: 55,
      blurb:
        'Frontend-focused web experience. Stack, live link, and outcomes to be added soon.',
      highlights: [
        'Responsive UI layout',
        'Component-based structure',
        'Demo details coming soon',
      ],
      stack: ['HTML', 'CSS', 'JavaScript', 'React'],
      link: null as string | null,
      github: null as string | null,
    },
    {
      id: '02',
      title: 'Project Beta',
      status: 'In progress' as const,
      category: 'Full-Stack',
      progress: 35,
      blurb:
        'Full-stack prototype connecting UI to data services. Details to be added soon.',
      highlights: [
        'UI connected to backend services',
        'Auth & data flow planned',
        'Demo details coming soon',
      ],
      stack: ['React', 'Node.js', 'Supabase'],
      link: null as string | null,
      github: null as string | null,
    },
    {
      id: '03',
      title: 'Project Gamma',
      status: 'Pending' as const,
      category: 'Website',
      progress: 10,
      blurb:
        'Website / web app scoped for portfolio presentation. Specs to be added soon.',
      highlights: [
        'Project scope drafted',
        'Local environment ready',
        'Specs to be added soon',
      ],
      stack: ['HTML', 'CSS', 'PHP', 'XAMPP'],
      link: null as string | null,
      github: null as string | null,
    },
  ],
  education: {
    degree: 'BS Information Technology',
    yearLevel: '4th Year',
    school: 'University of Batangas',
    location: 'Batangas City, CALABARZON, Philippines',
    expectedGraduation: '2027',
    focus: [
      'Web development',
      'Programming',
      'Databases',
      'Full-stack application fundamentals',
    ],
    capstone: null as string | null,
  },
  experience: {
    openTo: 'Internships and junior frontend / full-stack roles',
    items: [] as Array<{
      title: string
      company: string
      period: string
      bullets: string[]
    }>,
  },
  certifications: [] as string[],
  languages: null as string[] | null,
} as const

export type Resume = typeof resume
