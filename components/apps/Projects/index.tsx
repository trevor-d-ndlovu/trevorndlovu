import { memo } from "react";
import StyledProjects from "components/apps/Projects/StyledProjects";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";

type ProjectLink = {
  label: string;
  url: string;
};

type Project = {
  description: string;
  links: ProjectLink[];
  tags: string[];
  title: string;
};

const projects: Project[] = [
  {
    description:
      "My personal dotfiles for Arch Linux with Hyprland, featuring the Tokyo Night theme. Includes configurations for Waybar, Rofi, Kitty, Neovim, and more.",
    links: [
      { label: "GitHub", url: "https://github.com/trevor-d-ndlovu/arch-hyprdots" },
    ],
    tags: ["Hyprland", "Wayland", "Arch Linux", "Tokyo Night"],
    title: "Arch Hyprdots",
  },
  {
    description:
      "Automated ISO builder that generates an Arch Linux live ISO pre-configured with Hyprdots. Built with archiso and GitHub Actions, with automatic uploads to Cloudflare R2.",
    links: [
      { label: "GitHub", url: "https://github.com/trevor-d-ndlovu/hyprdots-iso" },
    ],
    tags: ["Archiso", "CI/CD", "Docker", "R2"],
    title: "Hyprdots ISO",
  },
  {
    description:
      "This very website! A web-based desktop environment forked from daedalOS, rebranded and themed with Tokyo Night. Hosted on Cloudflare Pages with auto-deploy from GitHub.",
    links: [
      { label: "GitHub", url: "https://github.com/trevor-d-ndlovu/trevorndlovu" },
    ],
    tags: ["Next.js", "React", "TypeScript", "Cloudflare"],
    title: "HyprDesk",
  },
];

const Projects: FC<ComponentProcessProps> = () => (
  <StyledProjects>
    <h1>Projects</h1>
    <p className="subtitle">Things I&apos;ve built and maintained</p>
    {projects.length === 0 ? (
      <p className="empty-state">No projects to show yet.</p>
    ) : (
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.title} className="project-card">
            <div className="card-header">
              <h2>{project.title}</h2>
              {project.tags.length > 0 && (
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <p className="card-description">{project.description}</p>
            {project.links.length > 0 && (
              <div className="card-links">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </StyledProjects>
);

export default memo(Projects);
