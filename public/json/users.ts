import { NexeraUser } from "@/components/types";

export const nexeraUsersR: NexeraUser[] = [
  {
    id: "u_001",
    name: "Alex Rivera",
    email: "a@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/12.jpg",
    headline: "System Architect | Full Stack Engineer",
    bio: "Building the digital infrastructure of tomorrow. Lover of clean code and strong coffee.",
    location: "San Francisco, CA",
    joinedAt: "2023-01-15T08:00:00Z",
    status: "active",
    academic: {
      institution: "Stanford University",
      degree: "M.Sc.",
      fieldOfStudy: "Computer Science",
      studyingYear: 2,
      graduationYear: 2024,
    },
    badges: [
      { id: "nex_001" }, // nexRoot
      { id: "nex_006" }, // nexDev
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_01" }, // Intro to Programming
          { id: "sub_04" }, // Web Technologies
          { id: "sub_06" }, // Operating Systems
          { id: "sub_07" }, // Cloud Computing
          { id: "sub_08" }, // DSA
          { id: "sub_10" }, // Software Engineering
          { id: "sub_16" }, // Systems Analysis
          { id: "sub_19" }, // DevOps
        ],
        uploads: [{ id: "sub_04" }, { id: "sub_07" }],
      },
      projects: {
        favorites: [{ id: "p_500" }],
        contributions: [{ id: "p_500" }],
      },
      applications: { favorites: [], uploads: [] },
    },
  },
  {
    id: "u_002",
    name: "Beatriz Silva",
    email: "b@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/45.jpg",
    headline: "Network Security Specialist",
    bio: "Keeping the Nexus safe from threats. Cybersecurity enthusiast.",
    location: "Lisbon, Portugal",
    joinedAt: "2023-02-10T14:30:00Z",
    status: "active",
    academic: {
      institution: "University of Lisbon",
      degree: "B.Sc.",
      fieldOfStudy: "Information Systems",
      studyingYear: 4,
      graduationYear: 2023,
    },
    badges: [
      { id: "nex_002" }, // nexAdmin
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_02" }, // Data Comm & Networking
          { id: "sub_05" }, // Cybersecurity Essentials
          { id: "sub_06" }, // Operating Systems
          { id: "sub_17" }, // Digital Forensics
          { id: "sub_18" }, // Blockchain
          { id: "sub_23" }, // IT Law and Ethics
        ],
        uploads: [{ id: "sub_05" }, { id: "sub_02" }],
      },
      projects: { favorites: [], contributions: [] },
      applications: { favorites: [], uploads: [{ id: "a_99" }] },
    },
  },
  {
    id: "u_003",
    name: "Charlie Chen",
    email: "c@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/88.jpg",
    headline: "AI Researcher | Data Scientist",
    bio: "Exploring the boundaries of machine learning and neural networks.",
    location: "Toronto, Canada",
    joinedAt: "2023-03-05T09:15:00Z",
    status: "active",
    academic: {
      institution: "University of Toronto",
      degree: "PhD",
      fieldOfStudy: "Artificial Intelligence",
      studyingYear: 1,
      graduationYear: 2026,
    },
    badges: [
      { id: "nex_003" }, // nexPrime
      { id: "nex_010" }, // nexLink
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_09" }, // Artificial Intelligence
          { id: "sub_14" }, // Data Science
          { id: "sub_08" }, // DSA
          { id: "sub_25" }, // Parallel Computing
          { id: "sub_01" }, // Programming
          { id: "sub_03" }, // DBMS
        ],
        uploads: [{ id: "sub_09" }, { id: "sub_14" }],
      },
      projects: {
        favorites: [{ id: "p_501" }],
        contributions: [{ id: "p_501" }],
      },
      applications: { favorites: [], uploads: [] },
    },
  },
  {
    id: "u_004",
    name: "Diana Prince",
    email: "d@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/3.jpg",
    headline: "UI/UX Designer",
    bio: "Crafting beautiful and intuitive user experiences. Pixel perfectionist.",
    location: "London, UK",
    joinedAt: "2023-03-22T11:00:00Z",
    status: "active",
    academic: {
      institution: "Royal College of Art",
      degree: "M.A.",
      fieldOfStudy: "Design Products",
      studyingYear: 2,
      graduationYear: 2024,
    },
    badges: [
      { id: "nex_004" }, // nexNova
      { id: "nex_008" }, // nexVision
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_13" }, // Human-Computer Interaction
          { id: "sub_04" }, // Web Technologies
          { id: "sub_11" }, // Mobile App Dev
          { id: "sub_15" }, // Graphics & Multimedia
          { id: "sub_16" }, // Systems Analysis
        ],
        uploads: [{ id: "sub_13" }],
      },
      projects: { favorites: [{ id: "p_502" }], contributions: [] },
      applications: { favorites: [{ id: "a_100" }], uploads: [] },
    },
  },
  {
    id: "u_005",
    name: "Ethan Hunt",
    email: "e@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/22.jpg",
    headline: "DevOps Engineer",
    bio: "Automating everything. Infrastructure as Code advocate.",
    location: "Berlin, Germany",
    joinedAt: "2023-04-18T16:45:00Z",
    status: "active",
    academic: {
      institution: "Technical University of Munich",
      degree: "B.Sc.",
      fieldOfStudy: "Informatics",
      studyingYear: 3,
      graduationYear: 2025,
    },
    badges: [
      { id: "nex_005" }, // nexCore
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_19" }, // DevOps
          { id: "sub_07" }, // Cloud Computing
          { id: "sub_06" }, // Operating Systems
          { id: "sub_02" }, // Networking
          { id: "sub_05" }, // Cybersecurity
          { id: "sub_25" }, // Parallel Computing
          { id: "sub_01" }, // Programming
        ],
        uploads: [{ id: "sub_07" }, { id: "sub_19" }],
      },
      projects: { favorites: [], contributions: [{ id: "p_503" }] },
      applications: { favorites: [], uploads: [{ id: "a_101" }] },
    },
  },
  {
    id: "u_006",
    name: "Fiona Gallagher",
    email: "f@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/67.jpg",
    headline: "Frontend Developer | React Specialist",
    bio: "Turning coffee into components. Passionate about accessibility.",
    location: "Chicago, IL",
    joinedAt: "2023-05-01T10:20:00Z",
    status: "active",
    academic: {
      institution: "University of Illinois",
      degree: "B.Sc.",
      fieldOfStudy: "Computer Science",
      studyingYear: 4,
      graduationYear: 2023,
    },
    badges: [
      { id: "nex_006" }, // nexDev
      { id: "nex_007" }, // nexPulse
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_04" }, // Web Technologies
          { id: "sub_13" }, // HCI
          { id: "sub_15" }, // Graphics
          { id: "sub_01" }, // Programming
          { id: "sub_11" }, // Mobile App Dev
        ],
        uploads: [{ id: "sub_04" }],
      },
      projects: {
        favorites: [{ id: "p_504" }],
        contributions: [{ id: "p_504" }],
      },
      applications: { favorites: [], uploads: [] },
    },
  },
  {
    id: "u_007",
    name: "George Martin",
    email: "g@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/9.jpg",
    headline: "Technical Writer & Blogger",
    bio: "Documenting the journey. Simplifier of complex concepts.",
    location: "Santa Fe, NM",
    joinedAt: "2023-05-15T13:00:00Z",
    status: "active",
    academic: {
      institution: "St. John's College",
      degree: "B.A.",
      fieldOfStudy: "Liberal Arts",
      studyingYear: 2,
      graduationYear: 2026,
    },
    badges: [
      { id: "nex_008" }, // nexVision
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_01" }, // Intro to Programming
          { id: "sub_23" }, // IT Ethics
          { id: "sub_13" }, // HCI
          { id: "sub_24" }, // MIS
          { id: "sub_04" }, // Web Technologies
        ],
        uploads: [{ id: "sub_01" }, { id: "sub_23" }],
      },
      projects: { favorites: [], contributions: [] },
      applications: { favorites: [], uploads: [] },
    },
  },
  {
    id: "u_008",
    name: "Hannah Lee",
    email: "h@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/33.jpg",
    headline: "Mobile Developer (iOS/Android)",
    bio: "Building apps that people love to use. Swift & Kotlin expert.",
    location: "Seoul, South Korea",
    joinedAt: "2023-06-02T08:30:00Z",
    status: "active",
    academic: {
      institution: "KAIST",
      degree: "M.Sc.",
      fieldOfStudy: "Mobile Computing",
      studyingYear: 1,
      graduationYear: 2025,
    },
    badges: [
      { id: "nex_004" }, // nexNova
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_11" }, // Mobile App Dev
          { id: "sub_04" }, // Web Technologies
          { id: "sub_01" }, // Programming
          { id: "sub_10" }, // Software Engineering
          { id: "sub_13" }, // HCI
          { id: "sub_03" }, // DBMS
        ],
        uploads: [{ id: "sub_11" }],
      },
      projects: {
        favorites: [{ id: "p_505" }],
        contributions: [{ id: "p_505" }],
      },
      applications: {
        favorites: [{ id: "a_102" }],
        uploads: [{ id: "a_103" }],
      },
    },
  },
  {
    id: "u_009",
    name: "Ian Wright",
    email: "i@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/51.jpg",
    headline: "Cybersecurity Analyst",
    bio: "White hat hacker. Protecting data privacy one exploit at a time.",
    location: "Sydney, Australia",
    joinedAt: "2023-06-20T15:10:00Z",
    status: "active",
    academic: {
      institution: "UNSW Sydney",
      degree: "B.Sc.",
      fieldOfStudy: "Cyber Security",
      studyingYear: 3,
      graduationYear: 2024,
    },
    badges: [
      { id: "nex_009" }, // nexGuard
      { id: "nex_005" }, // nexCore
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_05" }, // Cybersecurity
          { id: "sub_17" }, // Digital Forensics
          { id: "sub_02" }, // Networking
          { id: "sub_06" }, // OS
          { id: "sub_18" }, // Blockchain
          { id: "sub_23" }, // IT Ethics
          { id: "sub_07" }, // Cloud
        ],
        uploads: [{ id: "sub_17" }, { id: "sub_05" }],
      },
      projects: { favorites: [], contributions: [] },
      applications: { favorites: [], uploads: [] },
    },
  },
  {
    id: "u_010",
    name: "Jessica Jones",
    email: "j@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/16.jpg",
    headline: "Project Manager",
    bio: "Agile enthusiast. Keeping teams aligned and projects on track.",
    location: "New York, NY",
    joinedAt: "2023-07-04T12:00:00Z",
    status: "active",
    academic: {
      institution: "NYU",
      degree: "MBA",
      fieldOfStudy: "Business Administration",
      studyingYear: 2,
      graduationYear: 2024,
    },
    badges: [
      { id: "nex_005" }, // nexCore
      { id: "nex_010" }, // nexLink
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_10" }, // Software Engineering
          { id: "sub_24" }, // MIS
          { id: "sub_16" }, // Systems Analysis
          { id: "sub_21" }, // ERP
          { id: "sub_23" }, // IT Ethics
          { id: "sub_04" }, // Web Tech
        ],
        uploads: [{ id: "sub_10" }],
      },
      projects: { favorites: [{ id: "p_506" }], contributions: [] },
      applications: { favorites: [], uploads: [{ id: "a_104" }] },
    },
  },
  {
    id: "u_011",
    name: "Kevin Durant",
    email: "k@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/90.jpg",
    headline: "Cloud Architect",
    bio: "Designing scalable cloud solutions. AWS & Azure certified.",
    location: "Seattle, WA",
    joinedAt: "2023-07-15T09:45:00Z",
    status: "active",
    academic: {
      institution: "University of Washington",
      degree: "B.Sc.",
      fieldOfStudy: "Cloud Computing",
      studyingYear: 4,
      graduationYear: 2024,
    },
    badges: [
      { id: "nex_006" }, // nexDev
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_07" }, // Cloud Computing
          { id: "sub_19" }, // DevOps
          { id: "sub_25" }, // Parallel & Distributed
          { id: "sub_06" }, // OS
          { id: "sub_02" }, // Networking
          { id: "sub_05" }, // Cybersecurity
          { id: "sub_03" }, // DBMS
        ],
        uploads: [{ id: "sub_07" }],
      },
      projects: { favorites: [], contributions: [{ id: "p_507" }] },
      applications: { favorites: [], uploads: [] },
    },
  },
  {
    id: "u_012",
    name: "Laura Croft",
    email: "l@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/27.jpg",
    headline: "Game Developer",
    bio: "Creating immersive worlds. Unity & Unreal Engine pro.",
    location: "Derby, UK",
    joinedAt: "2023-08-01T14:20:00Z",
    status: "active",
    academic: {
      institution: "University of Derby",
      degree: "B.A.",
      fieldOfStudy: "Game Design",
      studyingYear: 3,
      graduationYear: 2025,
    },
    badges: [
      { id: "nex_008" }, // nexVision
      { id: "nex_007" }, // nexPulse
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_22" }, // Game Development
          { id: "sub_15" }, // Graphics & Multimedia
          { id: "sub_09" }, // AI
          { id: "sub_01" }, // Programming
          { id: "sub_08" }, // DSA
          { id: "sub_13" }, // HCI
        ],
        uploads: [{ id: "sub_22" }, { id: "sub_15" }],
      },
      projects: {
        favorites: [{ id: "p_508" }],
        contributions: [{ id: "p_508" }],
      },
      applications: { favorites: [], uploads: [] },
    },
  },
  {
    id: "u_013",
    name: "Michael Chang",
    email: "m@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/55.jpg",
    headline: "Data Analyst",
    bio: "Turning data into actionable insights. SQL & Python wizard.",
    location: "Singapore",
    joinedAt: "2023-08-10T10:00:00Z",
    status: "active",
    academic: {
      institution: "NUS",
      degree: "B.Sc.",
      fieldOfStudy: "Data Analytics",
      studyingYear: 2,
      graduationYear: 2026,
    },
    badges: [
      { id: "nex_005" }, // nexCore
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_14" }, // Data Science
          { id: "sub_03" }, // DBMS
          { id: "sub_16" }, // Systems Analysis
          { id: "sub_24" }, // MIS
          { id: "sub_01" }, // Programming
          { id: "sub_21" }, // ERP
        ],
        uploads: [{ id: "sub_14" }],
      },
      projects: { favorites: [{ id: "p_509" }], contributions: [] },
      applications: { favorites: [], uploads: [{ id: "a_105" }] },
    },
  },
  {
    id: "u_014",
    name: "Nina Simone",
    email: "n@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/8.jpg",
    headline: "Music Tech Engineer",
    bio: "Blending audio and code. Developing next-gen VSTs.",
    location: "Paris, France",
    joinedAt: "2023-08-25T16:30:00Z",
    status: "active",
    academic: {
      institution: "IRCAM",
      degree: "M.Sc.",
      fieldOfStudy: "Sound Engineering",
      studyingYear: 1,
      graduationYear: 2025,
    },
    badges: [
      { id: "nex_004" }, // nexNova
      { id: "nex_008" }, // nexVision
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_01" }, // Programming
          { id: "sub_12" }, // IoT (Hardware/Synth)
          { id: "sub_15" }, // Multimedia
          { id: "sub_08" }, // DSA
        ],
        uploads: [{ id: "sub_15" }],
      },
      projects: { favorites: [], contributions: [{ id: "p_510" }] },
      applications: { favorites: [{ id: "a_106" }], uploads: [] },
    },
  },
  {
    id: "u_015",
    name: "Oscar Wilde",
    email: "o@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/72.jpg",
    headline: "Backend Developer",
    bio: "Structuring data and logic. Node.js & Go enthusiast.",
    location: "Dublin, Ireland",
    joinedAt: "2023-09-05T09:00:00Z",
    status: "active",
    academic: {
      institution: "Trinity College Dublin",
      degree: "B.Sc.",
      fieldOfStudy: "Computer Science",
      studyingYear: 4,
      graduationYear: 2024,
    },
    badges: [
      { id: "nex_006" }, // nexDev
      { id: "nex_009" }, // nexGuard
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_03" }, // DBMS
          { id: "sub_04" }, // Web Tech
          { id: "sub_07" }, // Cloud
          { id: "sub_08" }, // DSA
          { id: "sub_06" }, // OS
          { id: "sub_19" }, // DevOps
          { id: "sub_25" }, // Distributed Comp
          { id: "sub_02" }, // Networking
        ],
        uploads: [{ id: "sub_03" }, { id: "sub_08" }],
      },
      projects: {
        favorites: [{ id: "p_511" }],
        contributions: [{ id: "p_511" }],
      },
      applications: { favorites: [], uploads: [] },
    },
  },
  {
    id: "u_016",
    name: "Priya Patel",
    email: "p@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/39.jpg",
    headline: "Blockchain Developer",
    bio: "Decentralizing the web. Smart contract auditor.",
    location: "Mumbai, India",
    joinedAt: "2023-09-20T13:45:00Z",
    status: "active",
    academic: {
      institution: "IIT Bombay",
      degree: "B.Tech",
      fieldOfStudy: "Computer Science",
      studyingYear: 3,
      graduationYear: 2025,
    },
    badges: [
      { id: "nex_003" }, // nexPrime
      { id: "nex_005" }, // nexCore
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_18" }, // Blockchain
          { id: "sub_05" }, // Cybersecurity
          { id: "sub_01" }, // Programming
          { id: "sub_02" }, // Networking
          { id: "sub_23" }, // IT Law (Smart Contracts)
          { id: "sub_08" }, // DSA
        ],
        uploads: [{ id: "sub_18" }],
      },
      projects: {
        favorites: [{ id: "p_512" }],
        contributions: [{ id: "p_512" }],
      },
      applications: { favorites: [], uploads: [{ id: "a_107" }] },
    },
  },
  {
    id: "u_017",
    name: "Quinn Fabray",
    email: "q@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/1.jpg",
    headline: "Quality Assurance Engineer",
    bio: "Breaking things so you don't have to. Automated testing expert.",
    location: "Austin, TX",
    joinedAt: "2023-10-01T11:15:00Z",
    status: "active",
    academic: {
      institution: "University of Texas",
      degree: "B.Sc.",
      fieldOfStudy: "Software Engineering",
      studyingYear: 2,
      graduationYear: 2026,
    },
    badges: [
      { id: "nex_009" }, // nexGuard
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_10" }, // Software Engineering
          { id: "sub_01" }, // Programming
          { id: "sub_04" }, // Web Tech
          { id: "sub_03" }, // DBMS
          { id: "sub_16" }, // Systems Analysis
        ],
        uploads: [{ id: "sub_10" }],
      },
      projects: { favorites: [], contributions: [] },
      applications: { favorites: [{ id: "a_108" }], uploads: [] },
    },
  },
  {
    id: "u_018",
    name: "Rafael Nadal",
    email: "r@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/95.jpg",
    headline: "Sports Analytics Researcher",
    bio: "Applying ML to athletic performance. Data-driven coaching.",
    location: "Madrid, Spain",
    joinedAt: "2023-10-15T15:30:00Z",
    status: "active",
    academic: {
      institution: "Technical University of Madrid",
      degree: "M.Sc.",
      fieldOfStudy: "Sports Science",
      studyingYear: 1,
      graduationYear: 2025,
    },
    badges: [
      { id: "nex_010" }, // nexLink
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_14" }, // Data Science
          { id: "sub_09" }, // AI
          { id: "sub_03" }, // DBMS
          { id: "sub_01" }, // Programming
          { id: "sub_24" }, // MIS
        ],
        uploads: [{ id: "sub_14" }],
      },
      projects: { favorites: [{ id: "p_513" }], contributions: [] },
      applications: { favorites: [], uploads: [] },
    },
  },
  {
    id: "u_019",
    name: "Sarah Connor",
    email: "s@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/61.jpg",
    headline: "Embedded Systems Engineer",
    bio: "Programming the physical world. IoT and robotics.",
    location: "Los Angeles, CA",
    joinedAt: "2023-11-02T08:50:00Z",
    status: "active",
    academic: {
      institution: "Caltech",
      degree: "PhD",
      fieldOfStudy: "Robotics",
      studyingYear: 2,
      graduationYear: 2027,
    },
    badges: [
      { id: "nex_006" }, // nexDev
      { id: "nex_005" }, // nexCore
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_12" }, // IoT
          { id: "sub_20" }, // Computer Architecture
          { id: "sub_06" }, // OS
          { id: "sub_01" }, // Programming
          { id: "sub_02" }, // Networking
          { id: "sub_09" }, // AI
        ],
        uploads: [{ id: "sub_12" }, { id: "sub_20" }],
      },
      projects: {
        favorites: [{ id: "p_514" }],
        contributions: [{ id: "p_514" }],
      },
      applications: { favorites: [], uploads: [{ id: "a_109" }] },
    },
  },
  {
    id: "u_020",
    name: "Tyler Durden",
    email: "t@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/82.jpg",
    headline: "Ethical Hacker",
    bio: "Security consultant. Finding holes in the system before the bad guys do.",
    location: "Wilmington, DE",
    joinedAt: "2023-11-20T22:00:00Z",
    status: "active",
    academic: {
      institution: "University of Delaware",
      degree: "B.Sc.",
      fieldOfStudy: "Computer Security",
      studyingYear: 3,
      graduationYear: 2025,
    },
    badges: [
      { id: "nex_002" }, // nexAdmin
      { id: "nex_009" }, // nexGuard
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_05" }, // Cybersecurity
          { id: "sub_02" }, // Networking
          { id: "sub_06" }, // OS
          { id: "sub_17" }, // Forensics
          { id: "sub_23" }, // IT Ethics
          { id: "sub_01" }, // Programming
          { id: "sub_18" }, // Blockchain
          { id: "sub_04" }, // Web Tech
        ],
        uploads: [{ id: "sub_05" }, { id: "sub_17" }],
      },
      projects: { favorites: [], contributions: [] },
      applications: { favorites: [{ id: "a_110" }], uploads: [] },
    },
  },
  {
    id: "u_021",
    name: "Ursula Vance",
    email: "u@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/14.jpg",
    headline: "UX Researcher",
    bio: "Understanding user behavior to drive design decisions. Empathy is key.",
    location: "Vancouver, Canada",
    joinedAt: "2023-12-01T09:10:00Z",
    status: "active",
    academic: {
      institution: "UBC",
      degree: "M.Sc.",
      fieldOfStudy: "Human-Computer Interaction",
      studyingYear: 2,
      graduationYear: 2024,
    },
    badges: [
      { id: "nex_008" }, // nexVision
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_13" }, // HCI
          { id: "sub_04" }, // Web Tech
          { id: "sub_16" }, // Systems Analysis
          { id: "sub_11" }, // Mobile Dev
          { id: "sub_15" }, // Graphics
        ],
        uploads: [{ id: "sub_13" }],
      },
      projects: { favorites: [{ id: "p_515" }], contributions: [] },
      applications: { favorites: [], uploads: [{ id: "a_111" }] },
    },
  },
  {
    id: "u_022",
    name: "Victor Stone",
    email: "v@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/77.jpg",
    headline: "System Administrator",
    bio: "Keeping the servers humming. Linux enthusiast and shell scripter.",
    location: "Detroit, MI",
    joinedAt: "2023-12-05T14:45:00Z",
    status: "active",
    academic: {
      institution: "Wayne State University",
      degree: "B.Sc.",
      fieldOfStudy: "Information Technology",
      studyingYear: 4,
      graduationYear: 2024,
    },
    badges: [
      { id: "nex_005" }, // nexCore
      { id: "nex_009" }, // nexGuard
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_06" }, // OS
          { id: "sub_02" }, // Networking
          { id: "sub_19" }, // DevOps
          { id: "sub_07" }, // Cloud
          { id: "sub_20" }, // Comp Architecture
          { id: "sub_05" }, // Cybersecurity
          { id: "sub_01" }, // Programming
        ],
        uploads: [{ id: "sub_06" }, { id: "sub_02" }],
      },
      projects: { favorites: [], contributions: [{ id: "p_516" }] },
      applications: { favorites: [{ id: "a_112" }], uploads: [] },
    },
  },
  {
    id: "u_023",
    name: "Wanda Maximoff",
    email: "w@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/29.jpg",
    headline: "Full Stack Developer",
    bio: "Weaving magic with code. Specializing in MERN stack.",
    location: "Westview, NJ",
    joinedAt: "2023-12-10T11:00:00Z",
    status: "active",
    academic: {
      institution: "Rutgers University",
      degree: "B.Sc.",
      fieldOfStudy: "Computer Science",
      studyingYear: 3,
      graduationYear: 2025,
    },
    badges: [
      { id: "nex_004" }, // nexNova
      { id: "nex_006" }, // nexDev
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_04" }, // Web Tech
          { id: "sub_03" }, // DBMS
          { id: "sub_07" }, // Cloud
          { id: "sub_01" }, // Programming
          { id: "sub_08" }, // DSA
          { id: "sub_10" }, // Soft Eng
          { id: "sub_19" }, // DevOps
          { id: "sub_02" }, // Networking
        ],
        uploads: [{ id: "sub_04" }, { id: "sub_03" }],
      },
      projects: {
        favorites: [{ id: "p_517" }],
        contributions: [{ id: "p_517" }],
      },
      applications: { favorites: [], uploads: [{ id: "a_113" }] },
    },
  },
  {
    id: "u_024",
    name: "Xavier Foster",
    email: "x@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/60.jpg",
    headline: "Machine Learning Engineer",
    bio: "Training models to solve complex problems. Python & TensorFlow.",
    location: "Zurich, Switzerland",
    joinedAt: "2023-12-15T16:20:00Z",
    status: "active",
    academic: {
      institution: "ETH Zurich",
      degree: "PhD",
      fieldOfStudy: "Machine Learning",
      studyingYear: 1,
      graduationYear: 2027,
    },
    badges: [
      { id: "nex_003" }, // nexPrime
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_09" }, // AI
          { id: "sub_14" }, // Data Science
          { id: "sub_25" }, // Parallel Comp
          { id: "sub_08" }, // DSA
          { id: "sub_01" }, // Programming
          { id: "sub_03" }, // DBMS
          { id: "sub_07" }, // Cloud
        ],
        uploads: [{ id: "sub_09" }],
      },
      projects: { favorites: [{ id: "p_518" }], contributions: [] },
      applications: { favorites: [{ id: "a_114" }], uploads: [] },
    },
  },
  {
    id: "u_025",
    name: "Yara Shahidi",
    email: "y@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/5.jpg",
    headline: "Community Manager",
    bio: "Building bridges between developers. fostering inclusive tech spaces.",
    location: "Boston, MA",
    joinedAt: "2023-12-20T10:30:00Z",
    status: "active",
    academic: {
      institution: "Harvard University",
      degree: "B.A.",
      fieldOfStudy: "Sociology & Tech",
      studyingYear: 2,
      graduationYear: 2026,
    },
    badges: [
      { id: "nex_010" }, // nexLink
      { id: "nex_007" }, // nexPulse
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_23" }, // IT Ethics
          { id: "sub_13" }, // HCI
          { id: "sub_04" }, // Web Tech
          { id: "sub_01" }, // Programming
          { id: "sub_24" }, // MIS
        ],
        uploads: [{ id: "sub_23" }],
      },
      projects: { favorites: [], contributions: [] },
      applications: { favorites: [{ id: "a_115" }], uploads: [] },
    },
  },
  {
    id: "u_026",
    name: "Zack Morris",
    email: "z@nex.com",
    password: "nex1234",
    profilePicture: "/img/profile_pic/91.jpg",
    headline: "Product Owner",
    bio: "Defining the roadmap. Balancing user needs with business goals.",
    location: "San Diego, CA",
    joinedAt: "2023-12-28T13:00:00Z",
    status: "active",
    academic: {
      institution: "UCSD",
      degree: "MBA",
      fieldOfStudy: "Business Administration",
      studyingYear: 2,
      graduationYear: 2024,
    },
    badges: [
      { id: "nex_005" }, // nexCore
    ],
    data: {
      notes: {
        favorites: [
          { id: "sub_24" }, // MIS
          { id: "sub_16" }, // Systems Analysis
          { id: "sub_10" }, // Software Engineering
          { id: "sub_21" }, // ERP
          { id: "sub_04" }, // Web Tech
          { id: "sub_13" }, // HCI
          { id: "sub_23" }, // IT Ethics
        ],
        uploads: [{ id: "sub_24" }],
      },
      projects: { favorites: [{ id: "p_519" }], contributions: [] },
      applications: { favorites: [], uploads: [{ id: "a_116" }] },
    },
  },
];
