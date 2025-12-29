import { NexeraUser } from "@/components/types";

export const nexeraUsers: NexeraUser[] = [
  {
    id: "U1",
    name: "Hasitha Sandakelum",
    email: "hasitha@nexera.dev",
    profilePicture: "/img/profile_pic/0.jpg",
    headline: "Full-Stack Developer",
    bio: "Building scalable web apps with modern stacks.",
    location: "Matara, Sri Lanka",
    joinedAt: "2024-01-10",
    academic: {
      institution: "University of Ruhuna",
      degree: "BSc",
      fieldOfStudy: "Computer Science",
      studyingYear: 3,
      graduationYear: 2026,
    },
    badges: [
      { id: 1, name: "B1" },
      { id: 3, name: "B3" },
    ],
    data: {
      notes: {
        favorites: [{ id: "N1" }],
        uploads: [{ id: "N5" }],
      },
      projects: {
        favorites: [{ id: "P1" }],
        contributions: [{ id: "P3" }],
      },
      applications: {
        favorites: [{ id: "A1" }],
        uploads: [{ id: "A3" }],
      },
    },
  },
  {
    id: "U2",
    name: "Nimal Perera",
    email: "nimal@nexera.dev",
    profilePicture: "/img/profile_pic/1.jpg",
    headline: "Backend Engineer",
    bio: "APIs, databases, and performance tuning.",
    location: "Colombo, Sri Lanka",
    joinedAt: "2024-01-22",
    academic: {
      institution: "University of Colombo",
      degree: "BSc",
      fieldOfStudy: "Information Systems",
      studyingYear: 4,
      graduationYear: 2025,
    },
    badges: [
      { id: 2, name: "B2" },
      { id: 6, name: "B6" },
    ],
    data: {
      notes: {
        favorites: [{ id: "N2" }],
        uploads: [],
      },
      projects: {
        favorites: [{ id: "P2" }],
        contributions: [{ id: "P4" }],
      },
      applications: {
        favorites: [],
        uploads: [{ id: "A2" }],
      },
    },
  },
  {
    id: "U3",
    name: "Sithmi Jayasinghe",
    email: "sithmi@nexera.dev",
    profilePicture: "/img/profile_pic/2.jpg",
    headline: "UI / UX Designer",
    bio: "Designing clean and accessible interfaces.",
    location: "Galle, Sri Lanka",
    joinedAt: "2024-02-05",
    academic: {
      institution: "SLIIT",
      degree: "BSc",
      fieldOfStudy: "Interactive Media",
      studyingYear: 2,
      graduationYear: 2027,
    },
    badges: [
      { id: 4, name: "B4" },
      { id: 7, name: "B7" },
    ],
    data: {
      notes: {
        favorites: [{ id: "N3" }],
        uploads: [{ id: "N6" }],
      },
      projects: {
        favorites: [{ id: "P5" }],
        contributions: [{ id: "P6" }],
      },
      applications: {
        favorites: [{ id: "A4" }],
        uploads: [],
      },
    },
  },
  {
    id: "U4",
    name: "Kavindu Fernando",
    email: "kavindu@nexera.dev",
    profilePicture: "/img/profile_pic/3.jpg",
    headline: "Mobile App Developer",
    bio: "Android & cross-platform mobile apps.",
    location: "Kandy, Sri Lanka",
    joinedAt: "2024-02-18",
    academic: {
      institution: "University of Peradeniya",
      degree: "BSc",
      fieldOfStudy: "Software Engineering",
      studyingYear: 3,
      graduationYear: 2026,
    },
    badges: [
      { id: 5, name: "B5" },
      { id: 8, name: "B8" },
    ],
    data: {
      notes: {
        favorites: [],
        uploads: [{ id: "N7" }],
      },
      projects: {
        favorites: [{ id: "P7" }],
        contributions: [{ id: "P8" }],
      },
      applications: {
        favorites: [],
        uploads: [{ id: "A5" }],
      },
    },
  },
  {
    id: "U5",
    name: "Tharindu Silva",
    email: "tharindu@nexera.dev",
    profilePicture: "/img/profile_pic/4.jpg",
    headline: "DevOps Engineer",
    bio: "CI/CD, cloud automation, infrastructure.",
    location: "Negombo, Sri Lanka",
    joinedAt: "2024-03-01",
    academic: {
      institution: "NSBM",
      degree: "BSc",
      fieldOfStudy: "Computer Engineering",
      studyingYear: 4,
      graduationYear: 2025,
    },
    badges: [
      { id: 6, name: "B6" },
      { id: 9, name: "B9" },
    ],
    data: {
      notes: {
        favorites: [{ id: "N8" }],
        uploads: [],
      },
      projects: {
        favorites: [],
        contributions: [{ id: "P9" }],
      },
      applications: {
        favorites: [{ id: "A6" }],
        uploads: [],
      },
    },
  },
  {
    id: "U6",
    name: "Dilani Wijesekara",
    email: "dilani@nexera.dev",
    profilePicture: "/img/profile_pic/5.jpg",
    headline: "Data Science Student",
    bio: "Learning ML and analytics.",
    location: "Kurunegala, Sri Lanka",
    joinedAt: "2024-03-15",
    academic: {
      institution: "University of Kelaniya",
      degree: "BSc",
      fieldOfStudy: "Data Science",
      studyingYear: 2,
      graduationYear: 2027,
    },
    badges: [
      { id: 7, name: "B7" },
      { id: 10, name: "B10" },
    ],
    data: {
      notes: {
        favorites: [{ id: "N9" }],
        uploads: [{ id: "N10" }],
      },
      projects: {
        favorites: [{ id: "P10" }],
        contributions: [],
      },
      applications: {
        favorites: [],
        uploads: [{ id: "A7" }],
      },
    },
  },
  {
    id: "U7",
    name: "Chamod Akalanka",
    email: "chamod@nexera.dev",
    profilePicture: "/img/profile_pic/6.jpg",
    headline: "Game Developer",
    bio: "2D & 3D interactive games.",
    location: "Anuradhapura, Sri Lanka",
    joinedAt: "2024-04-01",
    academic: {
      institution: "SLTC",
      degree: "BSc",
      fieldOfStudy: "Game Development",
      studyingYear: 3,
      graduationYear: 2026,
    },
    badges: [
      { id: 1, name: "B1" },
      { id: 8, name: "B8" },
    ],
    data: {
      notes: { favorites: [], uploads: [] },
      projects: {
        favorites: [{ id: "P11" }],
        contributions: [{ id: "P12" }],
      },
      applications: {
        favorites: [],
        uploads: [{ id: "A8" }],
      },
    },
  },
  {
    id: "U8",
    name: "Ishara Madushan",
    email: "ishara@nexera.dev",
    profilePicture: "/img/profile_pic/7.jpg",
    headline: "Cyber Security Learner",
    bio: "Ethical hacking & security basics.",
    location: "Badulla, Sri Lanka",
    joinedAt: "2024-04-20",
    academic: {
      institution: "ESOFT",
      degree: "BSc",
      fieldOfStudy: "Cyber Security",
      studyingYear: 1,
      graduationYear: 2028,
    },
    badges: [
      { id: 2, name: "B2" },
      { id: 9, name: "B9" },
    ],
    data: {
      notes: { favorites: [{ id: "N11" }], uploads: [] },
      projects: { favorites: [], contributions: [] },
      applications: { favorites: [{ id: "A9" }], uploads: [] },
    },
  },
  {
    id: "U9",
    name: "Rashmi Senanayake",
    email: "rashmi@nexera.dev",
    profilePicture: "/img/profile_pic/8.jpg",
    headline: "Frontend Engineer",
    bio: "React, animations, modern UI.",
    location: "Panadura, Sri Lanka",
    joinedAt: "2024-05-05",
    academic: {
      institution: "IIT",
      degree: "BEng",
      fieldOfStudy: "Software Engineering",
      studyingYear: 2,
      graduationYear: 2027,
    },
    badges: [
      { id: 3, name: "B3" },
      { id: 10, name: "B10" },
    ],
    data: {
      notes: { favorites: [{ id: "N12" }], uploads: [] },
      projects: { favorites: [{ id: "P13" }], contributions: [] },
      applications: { favorites: [], uploads: [] },
    },
  },
  {
    id: "U10",
    name: "Sanjeewa Karunaratne",
    email: "sanjeewa@nexera.dev",
    profilePicture: "/img/profile_pic/9.jpg",
    headline: "Open Source Contributor",
    bio: "Community-driven development.",
    location: "Ratnapura, Sri Lanka",
    joinedAt: "2024-05-20",
    academic: {
      institution: "OUSL",
      degree: "BSc",
      fieldOfStudy: "Information Technology",
      studyingYear: 4,
      graduationYear: 2025,
    },
    badges: [
      { id: 4, name: "B4" },
      { id: 6, name: "B6" },
    ],
    data: {
      notes: { favorites: [], uploads: [] },
      projects: { favorites: [{ id: "P14" }], contributions: [{ id: "P15" }] },
      applications: { favorites: [], uploads: [{ id: "A10" }] },
    },
  },
];
