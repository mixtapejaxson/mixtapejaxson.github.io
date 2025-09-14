import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Show footer when user scrolls to bottom 100px from the end
      const isAtBottom = scrollTop + windowHeight >= docHeight - 100;
      setIsVisible(isAtBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/mixtapejaxson", icon: "🐙" },
    { name: "Twitter", url: "https://twitter.com/@mixtapejaxson", icon: "🐦" },
    {
      name: "Instagram",
      url: "https://instagram.com/@jaxsonisdagoat",
      icon: "📸",
    },
    {
      name: "Snapchat",
      url: "https://www.snapchat.com/add/jdubz2027?share_id=VVLpcSaJwu8&locale=en-US",
      icon: "👻",
    },
  ];

  return (
    <footer
      className={`relative bg-gradient-to-r from-gray-900 via-purple-900/20 to-gray-900 border-t border-purple-500/20 transition-all duration-700 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100 visible"
          : "translate-y-full opacity-0 invisible"
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-purple-500/30 rounded-full animate-pulse" />
        <div
          className="absolute top-4 right-10 w-2 h-2 bg-pink-400/40 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-6 left-1/4 w-3 h-3 bg-blue-400/30 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-2 right-1/3 w-2 h-2 bg-purple-300/40 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              MixtapeJaxson
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Creating digital experiences with passion and creativity. Welcome
              to my corner of the internet! 🚀
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <Link
                to="/projects"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm hover:translate-x-1 transform"
              >
                → My Projects
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm hover:translate-x-1 transform"
              >
                → About Me
              </Link>
              <Link
                to="/socials"
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm hover:translate-x-1 transform"
              >
                → Connect
              </Link>
            </div>
          </div>

          {/* Social links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              Connect With Me
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                  title={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-purple-500/20 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">
            <p>
              &copy; 2025 MixtapeJaxson. All rights reserved. |{" "}
              <a
                href="https://github.com/mixtapejaxson"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                MIT License
              </a>
            </p>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>and React</span>
            <span className="text-blue-400">⚛️</span>
          </div>
        </div>

        {/* Animated wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent">
          <div className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-pulse" />
        </div>
      </div>
    </footer>
  );
}
