import { ProjectData } from "@/components/types";
import { FaCheckCircle, FaTasks, FaRocket, FaMusic } from "react-icons/fa";


export const Projects_data: ProjectData[] = [
  {
    id: "p1",
    title: "Decentralized Book Exchange",
    access: "public",
    description: "A platform for users to list and exchange books with others in their area, including search and messaging features.",
    action: { label: "Browse Books", icon: FaRocket },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/12.jpg" },
      { id: "c2", image: "/img/profile_pic/37.jpg" },
      { id: "c3", image: "/img/profile_pic/88.jpg" }
    ],
    socials: [
      { id: 1, type: "verified" },
      { id: 2, type: "github", url: "https://github.com/example" }
    ]
  },
  {
    id: "p2",
    title: "Alpha Task Manager",
    access: "private",
    description: "An internal productivity tool for tracking sprints, assigning tickets, and monitoring developer velocity.",
    action: { label: "View Tasks", icon: FaTasks },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/4.jpg" },
      { id: "c2", image: "/img/profile_pic/91.jpg" }
    ],
    socials: [
      { id: 1, type: "verified" }
    ]
  },
  {
    id: "p3",
    title: "Sonic Wave Streamer",
    access: "public",
    description: "High-fidelity lossless audio streaming service focused on indie artists and underground genres.",
    action: { label: "Listen Now", icon: FaMusic },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/15.jpg" },
      { id: "c2", image: "/img/profile_pic/22.jpg" },
      { id: "c3", image: "/img/profile_pic/67.jpg" },
      { id: "c4", image: "/img/profile_pic/8.jpg" }
    ],
    socials: [
      { id: 1, type: "verified" },
      { id: 2, type: "linkedin", url: "https://linkedin.com/company/sonic" }
    ]
  },
  {
    id: "p4",
    title: "DevOps Dashboard v2",
    access: "admin only",
    description: "Centralized control panel for server health monitoring, CI/CD pipeline status, and error logging.",
    action: { label: "System Status", icon: FaCheckCircle },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/95.jpg" },
      { id: "c2", image: "/img/profile_pic/44.jpg" },
      { id: "c3", image: "/img/profile_pic/31.jpg" }
    ],
    socials: [
      { id: 1, type: "github", url: "https://github.com/internal/devops" }
    ]
  },
  {
    id: "p5",
    title: "Crypto Portfolio Tracker",
    access: "public",
    description: "Real-time tracking of cryptocurrency assets across multiple wallets with profit/loss analysis.",
    action: { label: "Launch App", icon: FaRocket },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/50.jpg" }
    ],
    socials: [
      { id: 1, type: "verified" },
      { id: 2, type: "github", url: "https://github.com/crypto-tracker" },
      { id: 3, type: "linkedin", url: "https://linkedin.com/in/dev" }
    ]
  },
  {
    id: "p6",
    title: "Green Earth Initiative",
    access: "public",
    description: "A non-profit landing page coordinating volunteer tree planting events and donation tracking.",
    action: { label: "Join Event", icon: FaCheckCircle },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/1.jpg" },
      { id: "c2", image: "/img/profile_pic/96.jpg" },
      { id: "c3", image: "/img/profile_pic/18.jpg" },
      { id: "c4", image: "/img/profile_pic/72.jpg" },
      { id: "c5", image: "/img/profile_pic/33.jpg" }
    ],
    socials: [
      { id: 1, type: "verified" }
    ]
  },
  {
    id: "p7",
    title: "Retro Game Archive",
    access: "public",
    description: "Database and emulation wrapper for abandonware games from the late 90s.",
    action: { label: "Play Now", icon: FaRocket },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/29.jpg" },
      { id: "c2", image: "/img/profile_pic/84.jpg" }
    ],
    socials: [
      { id: 1, type: "github", url: "https://github.com/retro-arch" }
    ]
  },
  {
    id: "p8",
    title: "NextGen CRM",
    access: "admin only",
    description: "Customer relationship management system tailored for high-volume B2B sales teams.",
    action: { label: "Manage Leads", icon: FaTasks },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/61.jpg" },
      { id: "c2", image: "/img/profile_pic/13.jpg" },
      { id: "c3", image: "/img/profile_pic/42.jpg" }
    ],
    socials: [
      { id: 1, type: "verified" },
      { id: 2, type: "linkedin", url: "https://linkedin.com/company/nextgen" }
    ]
  },
  {
    id: "p9",
    title: "Fitness Pal Pro",
    access: "private",
    description: "Personalized workout routine generator and nutrition tracker for premium subscribers.",
    action: { label: "Track Progress", icon: FaCheckCircle },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/7.jpg" },
      { id: "c2", image: "/img/profile_pic/89.jpg" },
      { id: "c3", image: "/img/profile_pic/25.jpg" },
      { id: "c4", image: "/img/profile_pic/56.jpg" }
    ],
    socials: [
      { id: 1, type: "verified" }
    ]
  },
  {
    id: "p10",
    title: "CodeSnippet Library",
    access: "public",
    description: "Open source repository of reusable React hooks and utility functions.",
    action: { label: "View Code", icon: FaTasks },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/10.jpg" },
      { id: "c2", image: "/img/profile_pic/11.jpg" }
    ],
    socials: [
      { id: 1, type: "github", url: "https://github.com/snippets" },
      { id: 2, type: "verified" }
    ]
  },
  {
    id: "p11",
    title: "Quantum Analytics",
    access: "admin only",
    description: "Data visualization dashboard for interpreting complex datasets from quantum simulation engines.",
    action: { label: "Analyze Data", icon: FaRocket },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/77.jpg" },
      { id: "c2", image: "/img/profile_pic/66.jpg" },
      { id: "c3", image: "/img/profile_pic/3.jpg" },
      { id: "c4", image: "/img/profile_pic/93.jpg" },
      { id: "c5", image: "/img/profile_pic/48.jpg" }
    ],
    socials: [
      { id: 1, type: "linkedin", url: "https://linkedin.com/company/quantum" }
    ]
  },
  {
    id: "p12",
    title: "Artisan Marketplace",
    access: "public",
    description: "E-commerce solution for local artists to sell handmade crafts and digital art.",
    action: { label: "Shop Now", icon: FaCheckCircle },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/39.jpg" },
      { id: "c2", image: "/img/profile_pic/41.jpg" }
    ],
    socials: [
      { id: 1, type: "verified" },
      { id: 2, type: "github", url: "https://github.com/artisan-market" }
    ]
  },
  {
    id: "p13",
    title: "Secure Vault",
    access: "private",
    description: "Encrypted password manager and document storage for enterprise clients.",
    action: { label: "Unlock", icon: FaTasks },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/81.jpg" }
    ],
    socials: [
      { id: 1, type: "verified" }
    ]
  },
  {
    id: "p14",
    title: "Event Horizon Planner",
    access: "public",
    description: "Collaborative event planning tool with timeline views and guest list management.",
    action: { label: "Plan Event", icon: FaRocket },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/19.jpg" },
      { id: "c2", image: "/img/profile_pic/28.jpg" },
      { id: "c3", image: "/img/profile_pic/73.jpg" }
    ],
    socials: [
      { id: 1, type: "github", url: "https://github.com/planner" },
      { id: 2, type: "linkedin", url: "https://linkedin.com/in/planner" }
    ]
  },
  {
    id: "p15",
    title: "Lofi Beats Radio",
    access: "public",
    description: "24/7 background music player for studying and relaxation with visualizer.",
    action: { label: "Play Music", icon: FaMusic },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/5.jpg" },
      { id: "c2", image: "/img/profile_pic/6.jpg" }
    ],
    socials: [
      { id: 1, type: "verified" }
    ]
  },
  {
    id: "p16",
    title: "Freelance Connect",
    access: "public",
    description: "Job board connecting specialized developers with short-term contract work.",
    action: { label: "Find Work", icon: FaCheckCircle },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/34.jpg" },
      { id: "c2", image: "/img/profile_pic/59.jpg" },
      { id: "c3", image: "/img/profile_pic/90.jpg" },
      { id: "c4", image: "/img/profile_pic/14.jpg" }
    ],
    socials: [
      { id: 1, type: "linkedin", url: "https://linkedin.com/company/freelance" },
      { id: 2, type: "verified" }
    ]
  },
  {
    id: "p17",
    title: "Smart Home Hub",
    access: "private",
    description: "IoT dashboard for controlling lights, thermostat, and security cameras via local network.",
    action: { label: "Control", icon: FaTasks },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/63.jpg" },
      { id: "c2", image: "/img/profile_pic/21.jpg" }
    ],
    socials: [
      { id: 1, type: "github", url: "https://github.com/iot-hub" }
    ]
  },
  {
    id: "p18",
    title: "EduLearn Platform",
    access: "admin only",
    description: "LMS system for university grading, assignment submission, and lecture hosting.",
    action: { label: "View Grades", icon: FaCheckCircle },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/70.jpg" },
      { id: "c2", image: "/img/profile_pic/71.jpg" },
      { id: "c3", image: "/img/profile_pic/79.jpg" }
    ],
    socials: [
      { id: 1, type: "verified" }
    ]
  },
  {
    id: "p19",
    title: "Charity Flow",
    access: "public",
    description: "Transparent donation tracking using blockchain technology to ensure funds reach recipients.",
    action: { label: "Donate", icon: FaRocket },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/85.jpg" },
      { id: "c2", image: "/img/profile_pic/26.jpg" }
    ],
    socials: [
      { id: 1, type: "verified" },
      { id: 2, type: "linkedin", url: "https://linkedin.com/company/charity" }
    ]
  },
  {
    id: "p20",
    title: "Urban Garden Guide",
    access: "public",
    description: "Community wiki for growing vegetables in small city apartments and balconies.",
    action: { label: "Start Growing", icon: FaCheckCircle },
    contributionsLabel: [
      { id: "c1", image: "/img/profile_pic/49.jpg" },
      { id: "c2", image: "/img/profile_pic/51.jpg" },
      { id: "c3", image: "/img/profile_pic/30.jpg" },
      { id: "c4", image: "/img/profile_pic/16.jpg" },
      { id: "c5", image: "/img/profile_pic/94.jpg" }
    ],
    socials: [
      { id: 1, type: "verified" },
      { id: 2, type: "github", url: "https://github.com/garden-wiki" }
    ]
  }
];