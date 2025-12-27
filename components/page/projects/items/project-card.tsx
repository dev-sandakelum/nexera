import { ProjectData } from "@/components/types";
import React from "react";
import Image from "next/image";
import { BsGithub, BsLinkedin, BsPlus } from "react-icons/bs";
import { MdVerified } from "react-icons/md";

export default function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <div className="project" key={project.id}>
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
                <project.action.icon />
              </span>
              <p>{project.action.label}</p>
            </button>
          </div>
          <div className="line">
            <p>Contributions</p>
          </div>
          <div className="footer">
            <div className="social-media">
              {project.socials.map((social) => (
                <>
                  {social.type == "verified" && (
                    <div className="icon" key={social.id}>
                      <MdVerified />
                    </div>
                  )}
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
                </>
              ))}
            </div>
            <div className="Contributions">
              {project.contributionsLabel.map((contribution, idx) => (
                <Image
                  key={contribution.id}
                  src={contribution.image}
                  alt={contribution.id}
                  className="img"
                  style={{ "--idx": idx } as React.CSSProperties}
                  width={32}
                  height={32}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
