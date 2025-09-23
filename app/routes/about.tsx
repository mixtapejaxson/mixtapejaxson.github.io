import type { Route } from "./+types/about";
import { useState, useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MixtapeJaxson - About Me" },
    {
      name: "description",
      content:
        "Learn about MixtapeJaxson, a 16-year-old high school developer passionate about open source software, self-directed learning, and creating amazing digital experiences with FOSS tools.",
    },
    { property: "og:title", content: "MixtapeJaxson - About Me" },
  ];
}

interface Skill {
  name: string;
  level: number;
  icon: string;
  category: "frontend" | "backend" | "tools" | "design";
}

const skills: Skill[] = [
  { name: "React", level: 95, icon: "⚛️", category: "frontend" },
  { name: "TypeScript", level: 90, icon: "📘", category: "frontend" },
  { name: "JavaScript", level: 95, icon: "💛", category: "frontend" },
  { name: "Tailwind CSS", level: 90, icon: "🎨", category: "frontend" },
  { name: "Next.js", level: 85, icon: "▲", category: "frontend" },
  { name: "Node.js", level: 85, icon: "🟢", category: "backend" },
  { name: "Express", level: 80, icon: "🚄", category: "backend" },
  { name: "MongoDB", level: 75, icon: "🍃", category: "backend" },
  { name: "PostgreSQL", level: 70, icon: "🐘", category: "backend" },
  { name: "Git", level: 90, icon: "🔧", category: "tools" },
  { name: "Docker", level: 75, icon: "🐳", category: "tools" },
  { name: "AWS", level: 70, icon: "☁️", category: "tools" },
  { name: "Figma", level: 80, icon: "🎯", category: "design" },
  { name: "UI/UX Design", level: 75, icon: "🎨", category: "design" },
];

const experiences = [
  {
    title: "Open Source Contributor",
    company: "Various Projects",
    period: "2023 - Present",
    description:
      "Contributing to open source projects on GitHub, learning from the community and giving back. Working on personal projects using primarily FOSS tools and libraries.",
    achievements: [
      "Contributed to 10+ open source projects",
      "Built projects using fully open source stack",
      "Active in developer communities and forums",
    ],
  },
  {
    title: "Self-Taught Developer",
    company: "Personal Projects",
    period: "2022 - Present",
    description:
      "Started my coding journey in high school, learning through online resources, documentation, and hands-on practice. Built various web applications and tools using open source technologies.",
    achievements: [
      "Built 15+ personal projects",
      "Mastered React, Node.js, and Linux",
      "Created full-stack applications from scratch",
    ],
  },
  {
    title: "High School Student",
    company: "Local High School",
    period: "2021 - Present",
    description:
      "Balancing academic studies with my passion for programming. Taking computer science courses while building real-world projects in my spare time.",
    achievements: [
      "Maintaining excellent grades while coding",
      "Leading school's programming club",
      "Teaching peers about open source software",
    ],
  },
];

export default function About() {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  const [skillFilter, setSkillFilter] = useState<string>("all");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("data-section") || "";
            setVisibleSections((prev) => [
              ...prev.filter((id) => id !== sectionId),
              sectionId,
            ]);
          }
        });
      },
      { threshold: 0.1 },
    );

    const sections = document.querySelectorAll(".observe-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const filteredSkills =
    skillFilter === "all"
      ? skills
      : skills.filter((skill) => skill.category === skillFilter);

  const skillCategories = [
    { id: "all", name: "All Skills", icon: "🚀" },
    { id: "frontend", name: "Frontend", icon: "🎨" },
    { id: "backend", name: "Backend", icon: "⚙️" },
    { id: "tools", name: "Tools", icon: "🔧" },
    { id: "design", name: "Design", icon: "✨" },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-3 h-3 bg-purple-500/20 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-20 w-4 h-4 bg-pink-400/15 rounded-full animate-bounce" />
        <div
          className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-blue-400/25 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 right-1/3 w-5 h-5 bg-purple-300/20 rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
              About Me
            </span>
          </h1>
          <div className="text-6xl sm:text-8xl mb-6 animate-wave">👨‍💻</div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            16-year-old high school student, passionate open source developer,
            and self-directed learner. Here's my story and what drives me to
            create amazing digital experiences with FOSS tools.
          </p>
        </div>

        {/* My Story Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
              📖 My Story
            </span>
          </h2>
          <div
            data-section="story"
            className={`observe-section transition-all duration-1000 ${
              visibleSections.includes("story")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                    <span>🚀</span>
                    <span>My Journey</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Hi there! I'm MixtapeJaxson, a 16-year-old high school
                    student and passionate full-stack developer who fell in love
                    with coding at a young age. What started as curiosity about
                    how websites work has evolved into a deep passion for
                    creating digital experiences that make a difference.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    I'm a huge advocate for open source software and use a
                    mostly open source stack in all my projects. From Linux as
                    my daily driver to tools like React, Node.js, and
                    PostgreSQL, I believe in the power of collaborative
                    development and giving back to the community that has taught
                    me so much.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    When I'm not coding or studying, you'll find me exploring
                    new music (hence the "Mixtape" in my name!), gaming on my
                    Linux setup, or contributing to open source projects. I love
                    the intersection of technology and creativity, and I'm
                    always looking for ways to combine both in my work.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl mb-2">🎯</div>
                    <div className="text-2xl font-bold text-white">&gt;50</div>
                    <div className="text-sm text-gray-300">
                      Projects Completed
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl mb-2">⏰</div>
                    <div className="text-2xl font-bold text-white">3+</div>
                    <div className="text-sm text-gray-300">Years Learning</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                    <span>💡</span>
                    <span>What Drives Me</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">🎨</div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">
                          Open Source Passion
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Contributing to FOSS projects and using open source
                          tools
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">🌱</div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">
                          Self-Directed Learning
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Learning through docs, communities, and hands-on
                          practice
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">🤝</div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">
                          Community Driven
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Believing in collaborative development and knowledge
                          sharing
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">✨</div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">
                          Creative Problem Solving
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Finding elegant solutions using open source tools
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <span>🎵</span>
                    <span>Fun Facts</span>
                  </h3>
                  <div className="space-y-2 text-gray-300">
                    <p>🐧 Linux user and advocate</p>
                    <p>🎧 I code best with lo-fi hip-hop playing</p>
                    <p>🎮 Gaming on my Linux setup</p>
                    <p>📚 Currently learning Rust and contributing to FOSS</p>
                    <p>🌮 High schooler who still loves Taco Tuesday</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
              🛠️ Skills
            </span>
          </h2>
          <div
            data-section="skills"
            className={`observe-section transition-all duration-1000 ${
              visibleSections.includes("skills")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Skill Categories Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {skillCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSkillFilter(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    skillFilter === category.id
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">{skill.icon}</span>
                    <h3 className="font-semibold text-white">{skill.name}</h3>
                  </div>

                  {/* Skill Level Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Proficiency</span>
                      <span className="text-purple-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: visibleSections.includes("skills")
                            ? `${skill.level}%`
                            : "0%",
                          transitionDelay: `${index * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
              💼 Experience
            </span>
          </h2>
          <div
            data-section="experience"
            className={`observe-section transition-all duration-1000 ${
              visibleSections.includes("experience")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 ${
                    index % 2 === 0 ? "ml-0 lg:ml-8" : "mr-0 lg:mr-8"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-4 top-8 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">
                          {exp.title}
                        </h3>
                        <span className="text-purple-400 font-medium text-sm">
                          {exp.period}
                        </span>
                      </div>
                      <h4 className="text-purple-300 font-semibold mb-3">
                        {exp.company}
                      </h4>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-white mb-3">
                        Key Achievements:
                      </h5>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li
                            key={achIndex}
                            className="flex items-start space-x-2 text-sm text-gray-300"
                          >
                            <span className="text-green-400 mt-1">✓</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 max-w-2xl mx-auto">
            <div className="text-4xl mb-4 animate-bounce">🤝</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Let's Work Together!
            </h3>
            <p className="text-gray-300 mb-6">
              I'm always excited to collaborate on open source projects and
              learn from the developer community. Whether you have a cool
              project idea or just want to connect, I'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/projects"
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <span>🚀</span>
                <span>View My Projects</span>
              </a>
              <a
                href="/socials"
                className="inline-flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <span>📱</span>
                <span>Connect With Me</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
