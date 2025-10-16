import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { getCookie, setCookie } from "../utils/cookie";

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [visited, setVisited] = useState<boolean | null>(null);
  const welcomeBackShown = useRef(false);

  // Determine phrases based on visit
  const basePhrases = [
    "Welcome to my website!",
    "I create amazing projects!",
    "Let's build something together!",
    "Explore my digital world!",
  ];

  // If visited, always show "Welcome Back!" as the first phrase, then cycle through the rest
  const phrases =
    visited === true
      ? ["Welcome Back!", ...basePhrases.filter((p) => p !== "Welcome Back!")]
      : basePhrases;

  // On mount, check/set visited cookie
  useEffect(() => {
    const cookie = getCookie("visited");
    if (cookie === "true") {
      setVisited(true);
    } else {
      setVisited(false);
      setCookie("visited", "true", { days: 365 });
    }
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (visited === null) return; // Wait for cookie check

    // Always show "Welcome Back!" as the first phrase if visited
    let phraseIdx = currentPhraseIndex;
    if (visited && !welcomeBackShown.current) {
      phraseIdx = 0;
      welcomeBackShown.current = typedText === "Welcome Back!" && !isDeleting;
    }

    const currentPhrase = phrases[phraseIdx];
    const typingSpeed = isDeleting ? 50 : 150;

    const timeout = setTimeout(() => {
      if (!isDeleting && typedText === currentPhrase) {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === "") {
        // Move to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => {
          // If visited, after "Welcome Back!" go to next phrase
          if (visited && prev === 0) return 1;
          return (prev + 1) % phrases.length;
        });
      } else {
        // Type or delete character
        setTypedText(
          isDeleting
            ? currentPhrase.substring(0, typedText.length - 1)
            : currentPhrase.substring(0, typedText.length + 1),
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentPhraseIndex, phrases, visited]);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const heroButtons = [
    { text: "My Projects", to: "/projects", icon: "🚀", delay: "0ms" },
    { text: "Connect With Me", to: "/socials", icon: "🤝", delay: "200ms" },
    { text: "Learn About Me", to: "/about", icon: "🎯", delay: "400ms" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-purple-500/30 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-pink-400/20 rounded-full animate-float-delayed" />
        <div
          className="absolute bottom-40 left-20 w-3 h-3 bg-blue-400/40 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute bottom-20 right-40 w-5 h-5 bg-purple-300/25 rounded-full animate-float-delayed" />
        <div
          className="absolute top-60 left-1/2 w-2 h-2 bg-yellow-400/30 rounded-full animate-float"
          style={{ animationDelay: "1.5s" }}
        />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full filter blur-xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full filter blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Main Hero Content */}
      <div
        className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Animated Title */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
              {typedText}
            </span>
            <span className="text-purple-400 animate-pulse">|</span>
          </h1>

          {/* Animated Wave Emoji */}
          <div className="text-6xl sm:text-8xl mb-6 inline-block animate-wave">
            👋
          </div>
        </div>

        {/* Subtitle */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            This is the personal website of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
              MixtapeJaxson
            </span>
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Start exploring this website by clicking the buttons below and
            discover what I'm all about! ✨
          </p>
        </div>

        {/* Hero Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-4xl mx-auto">
          {heroButtons.map((button, index) => (
            <Link
              key={button.to}
              to={button.to}
              className={`group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full text-white font-semibold transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-purple-500/50 w-full sm:w-auto min-w-[200px] opacity-0 animate-slide-up`}
              style={{
                animationDelay: button.delay,
                animationFillMode: "forwards",
              }}
            >
              <span className="flex items-center justify-center space-x-2">
                <span className="text-xl group-hover:animate-bounce">
                  {button.icon}
                </span>
                <span>{button.text}</span>
              </span>

              {/* Button glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </div>
            </Link>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          className={`mt-16 transition-all duration-1000 delay-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center space-y-2 text-gray-400">
            <span className="text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
