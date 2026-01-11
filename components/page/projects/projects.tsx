"use client";

import { Projects_data } from "@/public/json/project";
import { motion } from "framer-motion";
import Image from "next/image";
import { BsGithub, BsLinkedin, BsCodeSlash } from "react-icons/bs";
import { MdVerified, MdLock, MdShare, MdEdit } from "react-icons/md";
import { HiGlobe, HiTerminal, HiExternalLink } from "react-icons/hi";
import { BiShieldQuarter } from "react-icons/bi";
import { FiLayout, FiDatabase } from "react-icons/fi";
import { GetProfilePicList } from "@/lib/actions/lists";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Icon mapping from string names to React components
const iconMap: Record<string, React.ComponentType> = {
  Code: BsCodeSlash,
  Shield: BiShieldQuarter,
  Lock: MdLock,
  Terminal: HiTerminal,
  Edit3: MdEdit,
  Share2: MdShare,
  ExternalLink: HiExternalLink,
  Database: FiDatabase,
  LayoutTemplate: FiLayout,
  Globe: HiGlobe,
  Github: BsGithub,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Time between each card appearing
    },
  },
};

// This controls individual cards
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50, // Start 50px below final position
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    } as const,
  },
};

export default function Projects() {
  const [users, setUsers] = useState<{ id: string; profilePic: string }[]>([]);
  const pathname = usePathname();
  useEffect(() => {
    async function fetchUsers() {
      try {
        const fetchedUsers = (await GetProfilePicList()) as {
          id: string;
          profilePic: string;
        }[];
        console.log("Fetched users in Projects page:", fetchedUsers);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="projectsPage" key={pathname}>
      <div className="projects-header">
        <motion.h1
          className="projects-header-title"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Projects
        </motion.h1>
      </div>

      {/* 2. Turn the wrapper into a motion.div */}
      <motion.div
        className="project-cards"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.01 }} // Animates only once when 10% visible
      >
        {Projects_data.map((project) => {
          const Icon = iconMap[project.action.icon] || BsCodeSlash;
          return (
            /* 3. Turn the card item into a motion.div */
            <motion.div
              className="project"
              key={project.id}
              variants={cardVariants}
              whileHover={{
                y: -5,
                transition: {
                  type: "spring" as const,
                  stiffness: 300,
                  damping: 20,
                },
              }}
            >
              <div className="project-card overlay0"></div>
              <div className="project-card overlay1"></div>
              <div className="project-card overlay2">
                <div className="content">
                  <div className="info">
                    <h2 className="title">{project.title}</h2>
                    <p className="access">{project.access}</p>
                    <p className="description">{project.description}</p>
                    <button className="btn">
                      <span>
                        <Icon />
                      </span>
                      <p>{project.action.label}</p>
                    </button>
                  </div>
                  <div className="line">
                    <p>Contributions</p>
                  </div>
                  <div className="footer">
                    <div className="social-media">
                      {project.verified == true && (
                        <div className="icon" key={project.id + "verified"}>
                          <MdVerified />
                        </div>
                      )}
                      {project.socials.map((social) => (
                        <div key={social.id + "key"}>
                          {social.type == "github" && (
                            <a
                              className="icon"
                              href={social.url ? social.url : "#"}
                              key={social.id}
                              target="_blank"
                            >
                              <BsGithub />
                            </a>
                          )}
                          {social.type == "linkedin" && (
                            <a
                              className="icon"
                              href={social.url ? social.url : "#"}
                              key={social.id}
                              target="_blank"
                            >
                              <BsLinkedin />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="Contributions">
                      {project.contributions.map((contribution, idx) => {
                        const user = users?.find(
                          (u) => u.id === contribution.userID
                        );
                        const profilePicture = user?.profilePic;

                        if (!profilePicture) return null;

                        return (
                          <Image
                            key={contribution.userID}
                            src={profilePicture}
                            alt={contribution.userID}
                            className="img"
                            style={{ "--idx": idx } as React.CSSProperties}
                            width={32}
                            height={32}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
