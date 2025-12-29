import { nexProjectData } from "@/components/types";
import { FaCheckCircle, FaTasks, FaRocket, FaMusic } from "react-icons/fa";



export const Projects_data: nexProjectData[] = [
  {
    id: "proj_001",
    title: "NexStream SDK",
    access: "public",
    description: "An open-source streaming library optimized for low-latency video transfer using WebRTC.",
    action: {
      label: "View Source",
      icon: "Code",
    },
    contributions: [
      { userID: "u_002" },
      { userID: "u_015" },
      { userID: "u_022" }
    ],
    verified: true,
    socials: [
      { id: 1, type: "github", url: "https://github.com/nexstream" }
    ]
  },
  {
    id: "proj_002",
    title: "Admin Dashboard Core",
    access: "admin only",
    description: "Internal analytics and user management dashboard for system administrators.",
    action: {
      label: "Manage Access",
      icon: "Shield",
    },
    contributions: [
      { userID: "u_001" },
      { userID: "u_003" },
      { userID: "u_005" },
      { userID: "u_008" }
    ],
    verified: true,
    socials: []
  },
  {
    id: "proj_003",
    title: "Project Alpha (Stealth)",
    access: "private",
    description: "Experimental AI model integration for predictive text generation. Strictly confidential.",
    action: {
      label: "Request Access",
      icon: "Lock",
    },
    contributions: [
      { userID: "u_004" },
      { userID: "u_026" },
      { userID: "u_012" }
    ],
    verified: false,
    socials: []
  },
  {
    id: "proj_004",
    title: "PixelCraft Editor",
    access: "public",
    description: "A browser-based image manipulation tool tailored for quick social media exports.",
    action: {
      label: "Launch App",
      icon: "ExternalLink",
    },
    contributions: [
      { userID: "u_010" },
      { userID: "u_011" },
      { userID: "u_013" },
      { userID: "u_020" },
      { userID: "u_025" }
    ],
    verified: true,
    socials: [
      { id: 1, type: "github", url: "https://github.com/pixelcraft" },
      { id: 2, type: "linkedin", url: "https://linkedin.com/company/pixelcraft" }
    ]
  },
  {
    id: "proj_005",
    title: "NetGuard CLI",
    access: "public",
    description: "Command line utility for monitoring local network traffic and managing DHCP leases.",
    action: {
      label: "Download",
      icon: "Terminal",
    },
    contributions: [
      { userID: "u_007" },
      { userID: "u_009" },
      { userID: "u_018" },
      { userID: "u_019" }
    ],
    verified: true,
    socials: [
      { id: 1, type: "github", url: "https://github.com/netguard" }
    ]
  },
  {
    id: "proj_006",
    title: "Finance API Gateway",
    access: "private",
    description: "Middleware service handling payment processing and ledger synchronization.",
    action: {
      label: "Configure",
      icon: "Database",
    },
    contributions: [
      { userID: "u_001" },
      { userID: "u_002" },
      { userID: "u_026" },
      { userID: "u_014" },
      { userID: "u_023" },
      { userID: "u_006" }
    ],
    verified: true,
    socials: []
  },
  {
    id: "proj_007",
    title: "OpenVote System",
    access: "public",
    description: "Transparent, blockchain-backed voting mechanism for community governance.",
    action: {
      label: "Cast Vote",
      icon: "Share2",
    },
    contributions: [
      { userID: "u_016" },
      { userID: "u_017" },
      { userID: "u_021" }
    ],
    verified: false,
    socials: [
      { id: 1, type: "github", url: "https://github.com/openvote" },
      { id: 2, type: "linkedin", url: "https://linkedin.com/in/openvote-dao" }
    ]
  },
  {
    id: "proj_008",
    title: "Legacy User Migration",
    access: "admin only",
    description: "Temporary scripts and tools to migrate users from SQL v1 to v2.",
    action: {
      label: "Edit Scripts",
      icon: "Edit3",
    },
    contributions: [
      { userID: "u_005" },
      { userID: "u_024" },
      { userID: "u_003" }
    ],
    verified: false,
    socials: []
  },
  {
    id: "proj_009",
    title: "NextUI Component Kit",
    access: "public",
    description: "A collection of accessible, reusable UI components built for Next.js 15.",
    action: {
      label: "View Docs",
      icon: "LayoutTemplate",
    },
    contributions: [
      { userID: "u_008" },
      { userID: "u_012" },
      { userID: "u_015" },
      { userID: "u_022" },
      { userID: "u_025" }
    ],
    verified: true,
    socials: [
      { id: 1, type: "github", url: "https://github.com/nextui-kit" }
    ]
  },
  {
    id: "proj_010",
    title: "Employee Portal Mobile",
    access: "private",
    description: "React Native application for internal employee scheduling and leave requests.",
    action: {
      label: "Deploy",
      icon: "Globe",
    },
    contributions: [
      { userID: "u_004" },
      { userID: "u_010" },
      { userID: "u_019" },
      { userID: "u_020" }
    ],
    verified: true,
    socials: [
      { id: 1, type: "linkedin", url: "https://linkedin.com/company/internal-ops" }
    ]
  }
];