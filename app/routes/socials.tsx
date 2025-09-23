import type { Route } from "./+types/socials";
import { useState, useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MixtapeJaxson - Connect With Me" },
    {
      name: "description",
      content:
        "Connect with MixtapeJaxson on various social platforms. Find me on GitHub, Twitter, LinkedIn, Discord and more!",
    },
    { property: "og:title", content: "MixtapeJaxson - Social Links" },
  ];
}

interface SocialLink {
  id: number;
  name: string;
  username: string;
  url: string;
  icon: string;
  color: string;
  hoverColor: string;
  description: string;
  followers?: string;
}

const socialLinks: SocialLink[] = [
  {
    id: 1,
    name: "Instagram",
    username: "@jaxsonisdagoat",
    url: "https://instagram.com/@jaxsonisdagoat",
    icon: "📸",
    color: "from-pink-500 to-purple-600",
    hoverColor: "from-pink-400 to-purple-500",
    description: "Follow my daily adventures and behind the scenes content",
    followers: "1.2K+ followers",
  },
  {
    id: 2,
    name: "Snapchat",
    username: "@jdubz2027",
    url: "https://www.snapchat.com/add/jdubz2027?share_id=VVLpcSaJwu8&locale=en-US",
    icon: "👻",
    color: "from-yellow-400 to-yellow-600",
    hoverColor: "from-yellow-300 to-yellow-500",
    description: "Add me for fun snaps and daily updates",
    followers: "Connect now!",
  },
  {
    id: 3,
    name: "GitHub",
    username: "@mixtapejaxson",
    url: "https://github.com/mixtapejaxson",
    icon: "🐙",
    color: "from-gray-700 to-gray-900",
    hoverColor: "from-gray-600 to-gray-800",
    description: "Check out my code repositories and open source contributions",
    followers: "150+ followers",
  },
  {
    id: 4,
    name: "Twitter",
    username: "@mixtapejaxson",
    url: "https://twitter.com/@mixtapejaxson",
    icon: "🐦",
    color: "from-blue-500 to-blue-700",
    hoverColor: "from-blue-400 to-blue-600",
    description:
      "Follow me for tech thoughts, project updates, and random musings",
    followers: "500+ followers",
  },
];

export default function Socials() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = parseInt(
              entry.target.getAttribute("data-card-id") || "0",
            );
            setVisibleCards((prev) => [
              ...prev.filter((id) => id !== cardId),
              cardId,
            ]);
          }
        });
      },
      { threshold: 0.1 },
    );

    const cardElements = document.querySelectorAll(".social-card");
    cardElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      console.log(`Copied ${name} to clipboard!`);
    });
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-purple-500/20 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-pink-400/15 rounded-full animate-bounce" />
        <div
          className="absolute bottom-40 left-20 w-3 h-3 bg-blue-400/25 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 right-40 w-5 h-5 bg-purple-300/20 rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-60 left-1/2 w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
              Let's Connect!
            </span>
          </h1>
          <div className="text-6xl sm:text-8xl mb-6 animate-bounce">🤝</div>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Find me across the web! Whether you want to collaborate on projects,
            chat about tech, or just say hello, I'm always excited to connect
            with fellow creators and enthusiasts.
          </p>
        </div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {socialLinks.map((social, index) => (
            <div
              key={social.id}
              data-card-id={social.id}
              className={`social-card group relative transition-all duration-700 transform ${
                visibleCards.includes(social.id)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
              onMouseEnter={() => setHoveredCard(social.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <a
                href={social.url}
                target={social.name !== "Email" ? "_blank" : undefined}
                rel={
                  social.name !== "Email" ? "noopener noreferrer" : undefined
                }
                className="block"
              >
                <div
                  className={`relative h-48 rounded-2xl bg-gradient-to-br ${social.color} hover:bg-gradient-to-br hover:${social.hoverColor} transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group`}
                >
                  {/* Card Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Top Section */}
                    <div className="flex items-start justify-between">
                      <div className="text-4xl group-hover:animate-bounce transition-all duration-300">
                        {social.icon}
                      </div>
                      {social.followers && (
                        <div className="text-xs bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-white">
                          {social.followers}
                        </div>
                      )}
                    </div>

                    {/* Bottom Section */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        {social.name}
                      </h3>
                      <p className="text-sm text-white/80 mb-2">
                        {social.username}
                      </p>
                      <p
                        className={`text-xs text-white/70 transition-all duration-300 ${
                          hoveredCard === social.id
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        {social.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Shine Effect */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  </div>
                </div>
              </a>

              {/* Copy Button for Snapchat */}
              {social.name === "Snapchat" && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    copyToClipboard(social.username, social.name);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-black/50 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  title={`Copy ${social.name} username`}
                >
                  📋
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Featured Section */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 mb-16 border border-purple-500/20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              🌟 Featured Platforms
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              These are my most active platforms where you'll find the latest
              updates, projects, and interactions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-3">📸</div>
                <h3 className="font-semibold text-white mb-2">Instagram</h3>
                <p className="text-sm text-gray-300">
                  Daily adventures and content
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-3">👻</div>
                <h3 className="font-semibold text-white mb-2">Snapchat</h3>
                <p className="text-sm text-gray-300">Fun snaps and updates</p>
              </div>

              <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-3">🐙</div>
                <h3 className="font-semibold text-white mb-2">GitHub</h3>
                <p className="text-sm text-gray-300">
                  Most active for code and projects
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-3">🐦</div>
                <h3 className="font-semibold text-white mb-2">Twitter</h3>
                <p className="text-sm text-gray-300">
                  Daily thoughts and tech updates
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 max-w-2xl mx-auto">
            <div className="text-4xl mb-4 animate-pulse">✨</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start a Conversation?
            </h3>
            <p className="text-gray-300 mb-6">
              Whether it's about collaboration, feedback, or just a friendly
              chat, I'm always excited to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://instagram.com/@jaxsonisdagoat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <span>📸</span>
                <span>Follow on Instagram</span>
              </a>
              <a
                href="https://github.com/mixtapejaxson"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <span>🐙</span>
                <span>View GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
