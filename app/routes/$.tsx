import type { Route } from "./+types/$";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
<Analytics/>
export function meta({}: Route.MetaArgs) {
  return [
    { title: "404 - Page Not Found | MixtapeJaxson" },
    {
      name: "description",
      content:
        "Oops! The page you're looking for doesn't exist. Let's get you back on track.",
    },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);
  const [glitchText, setGlitchText] = useState("404");

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const glitchChars = ["4", "0", "4", "?", "#", "@", "!", "%"];
    let glitchInterval: NodeJS.Timeout;

    const startGlitch = () => {
      glitchInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          const randomText = Array.from(
            { length: 3 },
            () => glitchChars[Math.floor(Math.random() * glitchChars.length)],
          ).join("");
          setGlitchText(randomText);

          setTimeout(() => setGlitchText("404"), 100);
        }
      }, 2000);
    };

    const timer = setTimeout(startGlitch, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating error symbols */}
        <div className="absolute top-20 left-20 text-4xl opacity-10 animate-float">
          💀
        </div>
        <div className="absolute top-40 right-32 text-3xl opacity-10 animate-float-delayed">
          ⚠️
        </div>
        <div className="absolute bottom-40 left-32 text-5xl opacity-10 animate-float">
          🚫
        </div>
        <div className="absolute bottom-20 right-20 text-3xl opacity-10 animate-float-delayed">
          ❌
        </div>
        <div className="absolute top-60 left-1/2 text-2xl opacity-10 animate-float">
          🔍
        </div>

        {/* Glitch lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-20 animate-pulse" />
        <div
          className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 text-center px-4 transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* 404 Number with Glitch Effect */}
        <div className="mb-8">
          <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-bold mb-4 relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 font-mono tracking-wider">
              {glitchText}
            </span>

            {/* Glitch overlay effects */}
            <span
              className="absolute inset-0 text-red-500 opacity-70 animate-pulse"
              style={{
                textShadow: "2px 0 #ff0000, -2px 0 #00ff00, 0 2px #0000ff",
              }}
            >
              404
            </span>
          </h1>

          {/* Broken robot emoji */}
          <div className="text-6xl sm:text-8xl mb-6 animate-bounce">🤖💥</div>
        </div>

        {/* Error Message */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            Looks like this page decided to take a vacation! 🏝️
            <br />
            Don't worry, let's get you back to familiar territory.
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <Link
            to="/"
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full text-white font-semibold transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-purple-500/50 w-full sm:w-auto min-w-[200px]"
          >
            <span className="flex items-center justify-center space-x-2">
              <span className="text-xl group-hover:animate-bounce">🏠</span>
              <span>Take Me Home</span>
            </span>

            {/* Button glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

            {/* Shine effect */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </div>
          </Link>

          <Link
            to="/projects"
            className="group relative px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-full text-white font-semibold transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-lg w-full sm:w-auto min-w-[200px]"
          >
            <span className="flex items-center justify-center space-x-2">
              <span className="text-xl group-hover:animate-bounce">🚀</span>
              <span>View Projects</span>
            </span>

            {/* Shine effect */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </div>
          </Link>
        </div>

        {/* Fun Facts */}
        <div
          className={`mt-16 transition-all duration-1000 delay-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center justify-center space-x-2">
              <span>💡</span>
              <span>Fun Fact</span>
            </h3>
            <p className="text-gray-300 text-sm">
              The first documented case of a 404 error was at CERN in 1992. The
              page they were looking for? Tim Berners-Lee's info about the World
              Wide Web project!
            </p>
          </div>
        </div>

        {/* Navigation suggestion */}
        <div
          className={`mt-8 transition-all duration-1000 delay-1200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="text-gray-400 text-sm">
            Or explore these popular pages:
          </p>
          <div className="flex justify-center space-x-4 mt-3">
            <Link
              to="/about"
              className="text-purple-400 hover:text-purple-300 transition-colors duration-300 text-sm"
            >
              About Me
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              to="/socials"
              className="text-purple-400 hover:text-purple-300 transition-colors duration-300 text-sm"
            >
              Connect
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
