import type { Route } from "./+types/projects";
import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
<Analytics/>
export function meta({}: Route.MetaArgs) {
  return [
    { title: "MixtapeJaxson - Projects" },
    {
      name: "description",
      content:
        "Explore my latest projects and creations. From web development to creative experiments.",
    },
    { property: "og:title", content: "MixtapeJaxson - Projects" },
  ];
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "MixClick",
    description: "A simple but addictive cookie clicker inspired game.",
    technologies: ["JavaScript", "HTML5", "CSS3", "Web APIs"],
    demo: "https://mixclick.mixtapejaxson.com",
    image: "🖱️",
    featured: true,
  },
  {
    id: 2,
    title: "ChatTweak",
    description:
      "A web extension to add additional features to some chat websites.",
    technologies: ["JavaScript", "Chrome Extensions API", "Web Extensions"],
    github: "https://github.com/mixtapejaxson/ChatTweak",
    image: "💬",
    featured: true,
  },
  {
    id: 3,
    title: "Apple Music Playlist",
    description: "My main Apple Music playlist. (Most up to date playlist).",
    technologies: ["Apple Music", "Curated Content"],
    demo: "https://music.apple.com/us/playlist/life-as-we-knew-it/pl.u-yZyVWP1Td0ayd82",
    image: "🍎",
    featured: false,
  },
  {
    id: 4,
    title: "Spotify Playlist",
    description:
      "My main Spotify playlist (not updated as frequently as the Apple Music playlist).",
    technologies: ["Spotify", "Curated Content"],
    demo: "https://open.spotify.com/playlist/2AGFziihxUkXWauWi0YbLH?si=0f21901f9a36497a",
    image: "🎵",
    featured: false,
  },
];

export default function Projects() {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = parseInt(
              entry.target.getAttribute("data-project-id") || "0",
            );
            setVisibleProjects((prev) => [
              ...prev.filter((id) => id !== projectId),
              projectId,
            ]);
          }
        });
      },
      { threshold: 0.1 },
    );

    const projectElements = document.querySelectorAll(".project-card");
    projectElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const filteredProjects =
    filter === "featured" ? projects.filter((p) => p.featured) : projects;

  const getTechColor = (tech: string) => {
    const colors: Record<string, string> = {
      React: "bg-blue-500/20 text-blue-300",
      TypeScript: "bg-blue-600/20 text-blue-400",
      JavaScript: "bg-yellow-500/20 text-yellow-300",
      "Node.js": "bg-green-500/20 text-green-300",
      "Next.js": "bg-gray-500/20 text-gray-300",
      "Vue.js": "bg-green-600/20 text-green-400",
      "Tailwind CSS": "bg-cyan-500/20 text-cyan-300",
      CSS3: "bg-blue-400/20 text-blue-300",
      MongoDB: "bg-green-700/20 text-green-400",
      PostgreSQL: "bg-blue-700/20 text-blue-400",
      Express: "bg-gray-600/20 text-gray-300",
    };
    return colors[tech] || "bg-purple-500/20 text-purple-300";
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
              My Projects
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Here's a collection of projects I've worked on, showcasing my skills
            in web development, UI/UX design, and creative problem-solving.
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center space-x-4 mb-12">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                filter === "all"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter("featured")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                filter === "featured"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Featured
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              data-project-id={project.id}
              className={`project-card group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                visibleProjects.includes(project.id)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                  ⭐ Featured
                </div>
              )}

              {/* Project Image/Icon */}
              <div className="relative h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {project.image}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getTechColor(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex space-x-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 text-center hover:shadow-lg"
                    >
                      View Project
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 text-center hover:shadow-lg"
                    >
                      {project.title.includes("Playlist")
                        ? "Take a Listen"
                        : project.title === "MixClick"
                          ? "Play Game"
                          : "View Project"}
                    </a>
                  )}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Interested in collaborating?
            </h3>
            <p className="text-gray-300 mb-6">
              I'm always open to discussing new projects and opportunities.
              Let's create something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/socials"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <span>Get In Touch</span>
                <span className="text-xl">🚀</span>
              </a>
              <a
                href="https://github.com/mixtapejaxson"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <span>View All Code</span>
                <span className="text-xl">🐙</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-20 w-3 h-3 bg-pink-400/20 rounded-full animate-bounce" />
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-purple-300/25 rounded-full animate-bounce" />
        <div
          className="absolute top-60 right-10 w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>
    </div>
  );
}
