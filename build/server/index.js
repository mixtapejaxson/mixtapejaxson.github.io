import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useLocation, Link, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import "@vercel/analytics/react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const navLinks = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Socials", path: "/socials" },
  { name: "About", path: "/about" }
];
function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-purple-500/20" : "bg-gray-900/80 backdrop-blur-sm"}`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/",
              className: "text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors duration-300 transform hover:scale-105",
              children: "MixtapeJaxson"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx("div", { className: "ml-10 flex items-baseline space-x-8", children: navLinks.map((link) => /* @__PURE__ */ jsxs(
            Link,
            {
              to: link.path,
              className: `relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-purple-400 ${location.pathname === link.path ? "text-purple-400" : "text-gray-300 hover:text-white"}`,
              children: [
                link.name,
                location.pathname === link.path && /* @__PURE__ */ jsx("span", { className: "absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transform scale-x-100 transition-transform duration-300" }),
                /* @__PURE__ */ jsx("span", { className: "absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transform scale-x-0 hover:scale-x-100 transition-transform duration-300" })
              ]
            },
            link.path
          )) }) }),
          /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: toggleMenu,
              className: "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300",
              "aria-expanded": "false",
              children: [
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open main menu" }),
                /* @__PURE__ */ jsxs("div", { className: "w-6 h-6 flex flex-col justify-center items-center", children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: `bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"}`
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: `bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? "opacity-0" : "opacity-100"}`
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: `bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"}`
                    }
                  )
                ] })
              ]
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-64 opacity-100 visible" : "max-h-0 opacity-0 invisible"}`,
            children: /* @__PURE__ */ jsx("div", { className: "px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-md border-t border-purple-500/20", children: navLinks.map((link, index) => /* @__PURE__ */ jsx(
              Link,
              {
                to: link.path,
                className: `block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 transform hover:scale-105 ${location.pathname === link.path ? "text-purple-400 bg-purple-500/10" : "text-gray-300 hover:text-white hover:bg-gray-700/50"}`,
                style: {
                  animationDelay: `${index * 50}ms`,
                  animation: isMenuOpen ? "slideInFromRight 0.3s ease-out forwards" : "none"
                },
                children: link.name
              },
              link.path
            )) })
          }
        )
      ]
    }
  );
}
function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const isAtBottom = scrollTop + windowHeight >= docHeight - 100;
      setIsVisible(isAtBottom);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const socialLinks2 = [
    { name: "GitHub", url: "https://github.com/mixtapejaxson", icon: "🐙" },
    { name: "Twitter", url: "https://twitter.com/@mixtapejaxson", icon: "🐦" },
    {
      name: "Instagram",
      url: "https://instagram.com/@jaxsonisdagoat",
      icon: "📸"
    },
    {
      name: "Snapchat",
      url: "https://www.snapchat.com/add/jdubz2027?share_id=VVLpcSaJwu8&locale=en-US",
      icon: "👻"
    }
  ];
  return /* @__PURE__ */ jsxs(
    "footer",
    {
      className: `relative bg-gradient-to-r from-gray-900 via-purple-900/20 to-gray-900 border-t border-purple-500/20 transition-all duration-700 ease-out ${isVisible ? "translate-y-0 opacity-100 visible" : "translate-y-full opacity-0 invisible"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -top-2 -left-2 w-4 h-4 bg-purple-500/30 rounded-full animate-pulse" }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute top-4 right-10 w-2 h-2 bg-pink-400/40 rounded-full animate-bounce",
              style: { animationDelay: "1s" }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute bottom-6 left-1/4 w-3 h-3 bg-blue-400/30 rounded-full animate-pulse",
              style: { animationDelay: "2s" }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute bottom-2 right-1/3 w-2 h-2 bg-purple-300/40 rounded-full animate-bounce",
              style: { animationDelay: "0.5s" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400", children: "MixtapeJaxson" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm leading-relaxed", children: "Creating digital experiences with passion and creativity. Welcome to my corner of the internet! 🚀" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-white", children: "Quick Links" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-2", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/projects",
                    className: "text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm hover:translate-x-1 transform",
                    children: "→ My Projects"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/about",
                    className: "text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm hover:translate-x-1 transform",
                    children: "→ About Me"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/socials",
                    className: "text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm hover:translate-x-1 transform",
                    children: "→ Connect"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold text-white", children: "Connect With Me" }),
              /* @__PURE__ */ jsx("div", { className: "flex space-x-4", children: socialLinks2.map((social) => /* @__PURE__ */ jsx(
                "a",
                {
                  href: social.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12",
                  title: social.name,
                  children: /* @__PURE__ */ jsx("span", { className: "text-lg", children: social.icon })
                },
                social.name
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-8 border-t border-purple-500/20 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0", children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400", children: /* @__PURE__ */ jsxs("p", { children: [
              "© 2025 MixtapeJaxson. All rights reserved. |",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://github.com/mixtapejaxson",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-purple-400 hover:text-purple-300 transition-colors duration-300",
                  children: "MIT License"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-sm text-gray-400", children: [
              /* @__PURE__ */ jsx("span", { children: "Made with" }),
              /* @__PURE__ */ jsx("span", { className: "text-red-500 animate-pulse", children: "❤️" }),
              /* @__PURE__ */ jsx("span", { children: "and React" }),
              /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: "⚛️" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-pulse" }) })
        ] })
      ]
    }
  );
}
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  if (!isVisible) return null;
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: scrollToTop,
      className: `fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`,
      title: "Scroll to top",
      "aria-label": "Scroll to top",
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-6 h-6 animate-bounce",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M5 10l7-7m0 0l7 7m-7-7v18"
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-white/20 scale-0 opacity-0 animate-ping" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" })
      ]
    }
  );
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "min-h-screen bg-gray-900 text-white",
      children: [/* @__PURE__ */ jsx(Navigation, {}), /* @__PURE__ */ jsx("main", {
        className: "pt-16",
        children
      }), /* @__PURE__ */ jsx(Footer, {}), /* @__PURE__ */ jsx(ScrollToTop, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gray-900 text-white flex items-center justify-center",
    children: /* @__PURE__ */ jsxs("div", {
      className: "text-center p-8",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-6xl font-bold text-purple-400 mb-4",
        children: message
      }), /* @__PURE__ */ jsx("p", {
        className: "text-xl text-gray-300 mb-8",
        children: details
      }), /* @__PURE__ */ jsxs("a", {
        href: "/",
        className: "inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105",
        children: [/* @__PURE__ */ jsx("span", {
          children: "🏠"
        }), /* @__PURE__ */ jsx("span", {
          children: "Go Home"
        })]
      }), stack]
    })
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const phrases = [
    "Welcome to my website!",
    "I create amazing projects!",
    "Let's build something together!",
    "Explore my digital world!"
  ];
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 50 : 150;
    const timeout = setTimeout(() => {
      if (!isDeleting && typedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 2e3);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        setTypedText(
          isDeleting ? currentPhrase.substring(0, typedText.length - 1) : currentPhrase.substring(0, typedText.length + 1)
        );
      }
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentPhraseIndex, phrases]);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);
  const heroButtons = [
    { text: "My Projects", to: "/projects", icon: "🚀", delay: "0ms" },
    { text: "Connect With Me", to: "/socials", icon: "🤝", delay: "200ms" },
    { text: "Learn About Me", to: "/about", icon: "🎯", delay: "400ms" }
  ];
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-20 left-10 w-4 h-4 bg-purple-500/30 rounded-full animate-float" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-40 right-20 w-6 h-6 bg-pink-400/20 rounded-full animate-float-delayed" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute bottom-40 left-20 w-3 h-3 bg-blue-400/40 rounded-full animate-float",
          style: { animationDelay: "2s" }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 right-40 w-5 h-5 bg-purple-300/25 rounded-full animate-float-delayed" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute top-60 left-1/2 w-2 h-2 bg-yellow-400/30 rounded-full animate-float",
          style: { animationDelay: "1.5s" }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full filter blur-xl animate-pulse" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full filter blur-xl animate-pulse",
          style: { animationDelay: "1s" }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 opacity-5",
          style: {
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px"
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `relative z-10 text-center px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-6xl lg:text-7xl font-bold mb-4", children: [
              /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient", children: typedText }),
              /* @__PURE__ */ jsx("span", { className: "text-purple-400 animate-pulse", children: "|" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-6xl sm:text-8xl mb-6 inline-block animate-wave", children: "👋" })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`,
              children: [
                /* @__PURE__ */ jsxs("p", { className: "text-xl sm:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed", children: [
                  "This is the personal website of",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold", children: "MixtapeJaxson" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-400 mb-12 max-w-2xl mx-auto", children: "Start exploring this website by clicking the buttons below and discover what I'm all about! ✨" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-4xl mx-auto", children: heroButtons.map((button, index) => /* @__PURE__ */ jsxs(
            Link,
            {
              to: button.to,
              className: `group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full text-white font-semibold transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-purple-500/50 w-full sm:w-auto min-w-[200px] opacity-0 animate-slide-up`,
              style: {
                animationDelay: button.delay,
                animationFillMode: "forwards"
              },
              children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center space-x-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xl group-hover:animate-bounce", children: button.icon }),
                  /* @__PURE__ */ jsx("span", { children: button.text })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" }) })
              ]
            },
            button.to
          )) }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `mt-16 transition-all duration-1000 delay-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`,
              children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-2 text-gray-400", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Scroll to explore" }),
                /* @__PURE__ */ jsx("div", { className: "w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-1 h-3 bg-purple-400 rounded-full mt-2 animate-bounce" }) })
              ] })
            }
          )
        ]
      }
    )
  ] });
}
function meta$4({}) {
  return [{
    title: "MixtapeJaxson - Welcome"
  }, {
    name: "description",
    content: "Welcome to MixtapeJaxson's personal website. Explore my projects, connect with me, and learn about my journey in web development."
  }, {
    name: "keywords",
    content: "MixtapeJaxson, web developer, projects, portfolio"
  }, {
    property: "og:title",
    content: "MixtapeJaxson - Welcome"
  }, {
    property: "og:description",
    content: "Welcome to MixtapeJaxson's personal website"
  }, {
    property: "og:type",
    content: "website"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(HeroSection, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function meta$3({}) {
  return [{
    title: "MixtapeJaxson - Projects"
  }, {
    name: "description",
    content: "Explore my latest projects and creations. From web development to creative experiments."
  }, {
    property: "og:title",
    content: "MixtapeJaxson - Projects"
  }];
}
const projects = [{
  id: 1,
  title: "MixClick",
  description: "A simple but addictive cookie clicker inspired game.",
  technologies: ["JavaScript", "HTML5", "CSS3", "Web APIs"],
  demo: "https://mixclick.mixtapejaxson.com",
  image: "🖱️",
  featured: true
}, {
  id: 2,
  title: "ChatTweak",
  description: "A web extension to add additional features to some chat websites.",
  technologies: ["JavaScript", "Chrome Extensions API", "Web Extensions"],
  github: "https://github.com/mixtapejaxson/ChatTweak",
  image: "💬",
  featured: true
}, {
  id: 3,
  title: "Apple Music Playlist",
  description: "My main Apple Music playlist. (Most up to date playlist).",
  technologies: ["Apple Music", "Curated Content"],
  demo: "https://music.apple.com/us/playlist/life-as-we-knew-it/pl.u-yZyVWP1Td0ayd82",
  image: "🍎",
  featured: false
}, {
  id: 4,
  title: "Spotify Playlist",
  description: "My main Spotify playlist (not updated as frequently as the Apple Music playlist).",
  technologies: ["Spotify", "Curated Content"],
  demo: "https://open.spotify.com/playlist/2AGFziihxUkXWauWi0YbLH?si=0f21901f9a36497a",
  image: "🎵",
  featured: false
}];
const projects$1 = UNSAFE_withComponentProps(function Projects() {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry2) => {
        if (entry2.isIntersecting) {
          const projectId = parseInt(entry2.target.getAttribute("data-project-id") || "0");
          setVisibleProjects((prev) => [...prev.filter((id) => id !== projectId), projectId]);
        }
      });
    }, {
      threshold: 0.1
    });
    const projectElements = document.querySelectorAll(".project-card");
    projectElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const filteredProjects = filter === "featured" ? projects.filter((p) => p.featured) : projects;
  const getTechColor = (tech) => {
    const colors = {
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
      Express: "bg-gray-600/20 text-gray-300"
    };
    return colors[tech] || "bg-purple-500/20 text-purple-300";
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen py-20 px-4 sm:px-6 lg:px-8",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "max-w-7xl mx-auto",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center mb-16",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl sm:text-5xl lg:text-6xl font-bold mb-6",
          children: /* @__PURE__ */ jsx("span", {
            className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400",
            children: "My Projects"
          })
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl text-gray-300 mb-8 max-w-3xl mx-auto",
          children: "Here's a collection of projects I've worked on, showcasing my skills in web development, UI/UX design, and creative problem-solving."
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex justify-center space-x-4 mb-12",
          children: [/* @__PURE__ */ jsx("button", {
            onClick: () => setFilter("all"),
            className: `px-6 py-3 rounded-full font-semibold transition-all duration-300 ${filter === "all" ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`,
            children: "All Projects"
          }), /* @__PURE__ */ jsx("button", {
            onClick: () => setFilter("featured"),
            className: `px-6 py-3 rounded-full font-semibold transition-all duration-300 ${filter === "featured" ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`,
            children: "Featured"
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
        children: filteredProjects.map((project, index) => /* @__PURE__ */ jsxs("div", {
          "data-project-id": project.id,
          className: `project-card group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${visibleProjects.includes(project.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
          style: {
            transitionDelay: `${index * 100}ms`
          },
          children: [project.featured && /* @__PURE__ */ jsx("div", {
            className: "absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-xs font-bold",
            children: "⭐ Featured"
          }), /* @__PURE__ */ jsxs("div", {
            className: "relative h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center",
            children: [/* @__PURE__ */ jsx("div", {
              className: "text-6xl group-hover:scale-110 transition-transform duration-300",
              children: project.image
            }), /* @__PURE__ */ jsx("div", {
              className: "absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "p-6",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300",
              children: project.title
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-300 text-sm mb-4 leading-relaxed",
              children: project.description
            }), /* @__PURE__ */ jsx("div", {
              className: "flex flex-wrap gap-2 mb-6",
              children: project.technologies.map((tech) => /* @__PURE__ */ jsx("span", {
                className: `px-3 py-1 rounded-full text-xs font-medium ${getTechColor(tech)}`,
                children: tech
              }, tech))
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex space-x-3",
              children: [project.github && /* @__PURE__ */ jsx("a", {
                href: project.github,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 text-center hover:shadow-lg",
                children: "View Project"
              }), project.demo && /* @__PURE__ */ jsx("a", {
                href: project.demo,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 text-center hover:shadow-lg",
                children: project.title.includes("Playlist") ? "Take a Listen" : project.title === "MixClick" ? "Play Game" : "View Project"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          })]
        }, project.id))
      }), /* @__PURE__ */ jsx("div", {
        className: "text-center mt-16",
        children: /* @__PURE__ */ jsxs("div", {
          className: "bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 max-w-2xl mx-auto",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-2xl font-bold text-white mb-4",
            children: "Interested in collaborating?"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-300 mb-6",
            children: "I'm always open to discussing new projects and opportunities. Let's create something amazing together!"
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col sm:flex-row gap-4 justify-center",
            children: [/* @__PURE__ */ jsxs("a", {
              href: "/socials",
              className: "inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg",
              children: [/* @__PURE__ */ jsx("span", {
                children: "Get In Touch"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-xl",
                children: "🚀"
              })]
            }), /* @__PURE__ */ jsxs("a", {
              href: "https://github.com/mixtapejaxson",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105",
              children: [/* @__PURE__ */ jsx("span", {
                children: "View All Code"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-xl",
                children: "🐙"
              })]
            })]
          })]
        })
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "fixed inset-0 pointer-events-none overflow-hidden",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute top-1/4 left-10 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute top-1/2 right-20 w-3 h-3 bg-pink-400/20 rounded-full animate-bounce"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute bottom-1/4 left-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute bottom-1/3 right-1/3 w-2 h-2 bg-purple-300/25 rounded-full animate-bounce"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute top-60 right-10 w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse",
        style: {
          animationDelay: "1.5s"
        }
      })]
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: projects$1,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function meta$2({}) {
  return [{
    title: "MixtapeJaxson - Connect With Me"
  }, {
    name: "description",
    content: "Connect with MixtapeJaxson on various social platforms. Find me on GitHub, Twitter, LinkedIn, Discord and more!"
  }, {
    property: "og:title",
    content: "MixtapeJaxson - Social Links"
  }];
}
const socialLinks = [{
  id: 1,
  name: "Instagram",
  username: "@jaxsonisdagoat",
  url: "https://instagram.com/@jaxsonisdagoat",
  icon: "📸",
  color: "from-pink-500 to-purple-600",
  hoverColor: "from-pink-400 to-purple-500",
  description: "Follow my daily adventures and behind the scenes content",
  followers: "1.2K+ followers"
}, {
  id: 2,
  name: "Snapchat",
  username: "@jdubz2027",
  url: "https://www.snapchat.com/add/jdubz2027?share_id=VVLpcSaJwu8&locale=en-US",
  icon: "👻",
  color: "from-yellow-400 to-yellow-600",
  hoverColor: "from-yellow-300 to-yellow-500",
  description: "Add me for fun snaps and daily updates",
  followers: "Connect now!"
}, {
  id: 3,
  name: "GitHub",
  username: "@mixtapejaxson",
  url: "https://github.com/mixtapejaxson",
  icon: "🐙",
  color: "from-gray-700 to-gray-900",
  hoverColor: "from-gray-600 to-gray-800",
  description: "Check out my code repositories and open source contributions",
  followers: "150+ followers"
}, {
  id: 4,
  name: "Twitter",
  username: "@mixtapejaxson",
  url: "https://twitter.com/@mixtapejaxson",
  icon: "🐦",
  color: "from-blue-500 to-blue-700",
  hoverColor: "from-blue-400 to-blue-600",
  description: "Follow me for tech thoughts, project updates, and random musings",
  followers: "500+ followers"
}];
const socials = UNSAFE_withComponentProps(function Socials() {
  const [visibleCards, setVisibleCards] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry2) => {
        if (entry2.isIntersecting) {
          const cardId = parseInt(entry2.target.getAttribute("data-card-id") || "0");
          setVisibleCards((prev) => [...prev.filter((id) => id !== cardId), cardId]);
        }
      });
    }, {
      threshold: 0.1
    });
    const cardElements = document.querySelectorAll(".social-card");
    cardElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const copyToClipboard = (text, name) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log(`Copied ${name} to clipboard!`);
    });
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen py-20 px-4 sm:px-6 lg:px-8",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "fixed inset-0 pointer-events-none overflow-hidden",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute top-20 left-10 w-4 h-4 bg-purple-500/20 rounded-full animate-pulse"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute top-40 right-20 w-6 h-6 bg-pink-400/15 rounded-full animate-bounce"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute bottom-40 left-20 w-3 h-3 bg-blue-400/25 rounded-full animate-pulse",
        style: {
          animationDelay: "1s"
        }
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute bottom-20 right-40 w-5 h-5 bg-purple-300/20 rounded-full animate-bounce",
        style: {
          animationDelay: "2s"
        }
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute top-60 left-1/2 w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse",
        style: {
          animationDelay: "0.5s"
        }
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "max-w-6xl mx-auto",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center mb-16",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl sm:text-5xl lg:text-6xl font-bold mb-6",
          children: /* @__PURE__ */ jsx("span", {
            className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400",
            children: "Let's Connect!"
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "text-6xl sm:text-8xl mb-6 animate-bounce",
          children: "🤝"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl text-gray-300 mb-8 max-w-3xl mx-auto",
          children: "Find me across the web! Whether you want to collaborate on projects, chat about tech, or just say hello, I'm always excited to connect with fellow creators and enthusiasts."
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16",
        children: socialLinks.map((social, index) => /* @__PURE__ */ jsxs("div", {
          "data-card-id": social.id,
          className: `social-card group relative transition-all duration-700 transform ${visibleCards.includes(social.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
          style: {
            transitionDelay: `${index * 100}ms`
          },
          onMouseEnter: () => setHoveredCard(social.id),
          onMouseLeave: () => setHoveredCard(null),
          children: [/* @__PURE__ */ jsx("a", {
            href: social.url,
            target: social.name !== "Email" ? "_blank" : void 0,
            rel: social.name !== "Email" ? "noopener noreferrer" : void 0,
            className: "block",
            children: /* @__PURE__ */ jsxs("div", {
              className: `relative h-48 rounded-2xl bg-gradient-to-br ${social.color} hover:bg-gradient-to-br hover:${social.hoverColor} transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group`,
              children: [/* @__PURE__ */ jsxs("div", {
                className: "absolute inset-0 p-6 flex flex-col justify-between",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex items-start justify-between",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "text-4xl group-hover:animate-bounce transition-all duration-300",
                    children: social.icon
                  }), social.followers && /* @__PURE__ */ jsx("div", {
                    className: "text-xs bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-white",
                    children: social.followers
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "text-lg font-bold text-white mb-1",
                    children: social.name
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-sm text-white/80 mb-2",
                    children: social.username
                  }), /* @__PURE__ */ jsx("p", {
                    className: `text-xs text-white/70 transition-all duration-300 ${hoveredCard === social.id ? "opacity-100" : "opacity-0"}`,
                    children: social.description
                  })]
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              }), /* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 rounded-2xl overflow-hidden",
                children: /* @__PURE__ */ jsx("div", {
                  className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                })
              })]
            })
          }), social.name === "Snapchat" && /* @__PURE__ */ jsx("button", {
            onClick: (e) => {
              e.preventDefault();
              copyToClipboard(social.username, social.name);
            },
            className: "absolute top-2 right-2 w-8 h-8 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-black/50 transition-all duration-300 opacity-0 group-hover:opacity-100",
            title: `Copy ${social.name} username`,
            children: "📋"
          })]
        }, social.id))
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 mb-16 border border-purple-500/20",
        children: /* @__PURE__ */ jsxs("div", {
          className: "text-center",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl font-bold text-white mb-4",
            children: "🌟 Featured Platforms"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-300 mb-8 max-w-2xl mx-auto",
            children: "These are my most active platforms where you'll find the latest updates, projects, and interactions."
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-xl p-6 hover:scale-105 transition-transform duration-300",
              children: [/* @__PURE__ */ jsx("div", {
                className: "text-3xl mb-3",
                children: "📸"
              }), /* @__PURE__ */ jsx("h3", {
                className: "font-semibold text-white mb-2",
                children: "Instagram"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-sm text-gray-300",
                children: "Daily adventures and content"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-xl p-6 hover:scale-105 transition-transform duration-300",
              children: [/* @__PURE__ */ jsx("div", {
                className: "text-3xl mb-3",
                children: "👻"
              }), /* @__PURE__ */ jsx("h3", {
                className: "font-semibold text-white mb-2",
                children: "Snapchat"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-sm text-gray-300",
                children: "Fun snaps and updates"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-xl p-6 hover:scale-105 transition-transform duration-300",
              children: [/* @__PURE__ */ jsx("div", {
                className: "text-3xl mb-3",
                children: "🐙"
              }), /* @__PURE__ */ jsx("h3", {
                className: "font-semibold text-white mb-2",
                children: "GitHub"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-sm text-gray-300",
                children: "Most active for code and projects"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl p-6 hover:scale-105 transition-transform duration-300",
              children: [/* @__PURE__ */ jsx("div", {
                className: "text-3xl mb-3",
                children: "🐦"
              }), /* @__PURE__ */ jsx("h3", {
                className: "font-semibold text-white mb-2",
                children: "Twitter"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-sm text-gray-300",
                children: "Daily thoughts and tech updates"
              })]
            })]
          })]
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "text-center",
        children: /* @__PURE__ */ jsxs("div", {
          className: "bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 max-w-2xl mx-auto",
          children: [/* @__PURE__ */ jsx("div", {
            className: "text-4xl mb-4 animate-pulse",
            children: "✨"
          }), /* @__PURE__ */ jsx("h3", {
            className: "text-2xl font-bold text-white mb-4",
            children: "Ready to Start a Conversation?"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-300 mb-6",
            children: "Whether it's about collaboration, feedback, or just a friendly chat, I'm always excited to hear from you!"
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col sm:flex-row gap-4 justify-center",
            children: [/* @__PURE__ */ jsxs("a", {
              href: "https://instagram.com/@jaxsonisdagoat",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105",
              children: [/* @__PURE__ */ jsx("span", {
                children: "📸"
              }), /* @__PURE__ */ jsx("span", {
                children: "Follow on Instagram"
              })]
            }), /* @__PURE__ */ jsxs("a", {
              href: "https://github.com/mixtapejaxson",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105",
              children: [/* @__PURE__ */ jsx("span", {
                children: "🐙"
              }), /* @__PURE__ */ jsx("span", {
                children: "View GitHub"
              })]
            })]
          })]
        })
      })]
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: socials,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({}) {
  return [{
    title: "MixtapeJaxson - About Me"
  }, {
    name: "description",
    content: "Learn about MixtapeJaxson, a 16-year-old high school developer passionate about open source software, self-directed learning, and creating amazing digital experiences with FOSS tools."
  }, {
    property: "og:title",
    content: "MixtapeJaxson - About Me"
  }];
}
const skills = [{
  name: "React",
  level: 95,
  icon: "⚛️",
  category: "frontend"
}, {
  name: "TypeScript",
  level: 90,
  icon: "📘",
  category: "frontend"
}, {
  name: "JavaScript",
  level: 95,
  icon: "💛",
  category: "frontend"
}, {
  name: "Tailwind CSS",
  level: 90,
  icon: "🎨",
  category: "frontend"
}, {
  name: "Next.js",
  level: 85,
  icon: "▲",
  category: "frontend"
}, {
  name: "Node.js",
  level: 85,
  icon: "🟢",
  category: "backend"
}, {
  name: "Express",
  level: 80,
  icon: "🚄",
  category: "backend"
}, {
  name: "MongoDB",
  level: 75,
  icon: "🍃",
  category: "backend"
}, {
  name: "PostgreSQL",
  level: 70,
  icon: "🐘",
  category: "backend"
}, {
  name: "Git",
  level: 90,
  icon: "🔧",
  category: "tools"
}, {
  name: "Docker",
  level: 75,
  icon: "🐳",
  category: "tools"
}, {
  name: "AWS",
  level: 70,
  icon: "☁️",
  category: "tools"
}, {
  name: "Figma",
  level: 80,
  icon: "🎯",
  category: "design"
}, {
  name: "UI/UX Design",
  level: 75,
  icon: "🎨",
  category: "design"
}];
const experiences = [{
  title: "Open Source Contributor",
  company: "Various Projects",
  period: "2023 - Present",
  description: "Contributing to open source projects on GitHub, learning from the community and giving back. Working on personal projects using primarily FOSS tools and libraries.",
  achievements: ["Contributed to 10+ open source projects", "Built projects using fully open source stack", "Active in developer communities and forums"]
}, {
  title: "Self-Taught Developer",
  company: "Personal Projects",
  period: "2022 - Present",
  description: "Started my coding journey in high school, learning through online resources, documentation, and hands-on practice. Built various web applications and tools using open source technologies.",
  achievements: ["Built 15+ personal projects", "Mastered React, Node.js, and Linux", "Created full-stack applications from scratch"]
}, {
  title: "High School Student",
  company: "Local High School",
  period: "2021 - Present",
  description: "Balancing academic studies with my passion for programming. Taking computer science courses while building real-world projects in my spare time.",
  achievements: ["Maintaining excellent grades while coding", "Leading school's programming club", "Teaching peers about open source software"]
}];
const about = UNSAFE_withComponentProps(function About() {
  const [visibleSections, setVisibleSections] = useState([]);
  const [skillFilter, setSkillFilter] = useState("all");
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry2) => {
        if (entry2.isIntersecting) {
          const sectionId = entry2.target.getAttribute("data-section") || "";
          setVisibleSections((prev) => [...prev.filter((id) => id !== sectionId), sectionId]);
        }
      });
    }, {
      threshold: 0.1
    });
    const sections = document.querySelectorAll(".observe-section");
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  const filteredSkills = skillFilter === "all" ? skills : skills.filter((skill) => skill.category === skillFilter);
  const skillCategories = [{
    id: "all",
    name: "All Skills",
    icon: "🚀"
  }, {
    id: "frontend",
    name: "Frontend",
    icon: "🎨"
  }, {
    id: "backend",
    name: "Backend",
    icon: "⚙️"
  }, {
    id: "tools",
    name: "Tools",
    icon: "🔧"
  }, {
    id: "design",
    name: "Design",
    icon: "✨"
  }];
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen py-20 px-4 sm:px-6 lg:px-8",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "fixed inset-0 pointer-events-none overflow-hidden",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute top-20 left-10 w-3 h-3 bg-purple-500/20 rounded-full animate-pulse"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute top-1/3 right-20 w-4 h-4 bg-pink-400/15 rounded-full animate-bounce"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute bottom-1/3 left-1/4 w-2 h-2 bg-blue-400/25 rounded-full animate-pulse",
        style: {
          animationDelay: "1s"
        }
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute bottom-20 right-1/3 w-5 h-5 bg-purple-300/20 rounded-full animate-bounce",
        style: {
          animationDelay: "2s"
        }
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: "max-w-6xl mx-auto",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center mb-16",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl sm:text-5xl lg:text-6xl font-bold mb-6",
          children: /* @__PURE__ */ jsx("span", {
            className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400",
            children: "About Me"
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "text-6xl sm:text-8xl mb-6 animate-wave",
          children: "👨‍💻"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl text-gray-300 max-w-3xl mx-auto",
          children: "16-year-old high school student, passionate open source developer, and self-directed learner. Here's my story and what drives me to create amazing digital experiences with FOSS tools."
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "mb-16",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl font-bold text-center mb-12",
          children: /* @__PURE__ */ jsx("span", {
            className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400",
            children: "📖 My Story"
          })
        }), /* @__PURE__ */ jsx("div", {
          "data-section": "story",
          className: `observe-section transition-all duration-1000 ${visibleSections.includes("story") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
          children: /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "space-y-6",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20",
                children: [/* @__PURE__ */ jsxs("h3", {
                  className: "text-2xl font-bold text-white mb-4 flex items-center space-x-2",
                  children: [/* @__PURE__ */ jsx("span", {
                    children: "🚀"
                  }), /* @__PURE__ */ jsx("span", {
                    children: "My Journey"
                  })]
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-gray-300 leading-relaxed mb-4",
                  children: "Hi there! I'm MixtapeJaxson, a 16-year-old high school student and passionate full-stack developer who fell in love with coding at a young age. What started as curiosity about how websites work has evolved into a deep passion for creating digital experiences that make a difference."
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-gray-300 leading-relaxed mb-4",
                  children: "I'm a huge advocate for open source software and use a mostly open source stack in all my projects. From Linux as my daily driver to tools like React, Node.js, and PostgreSQL, I believe in the power of collaborative development and giving back to the community that has taught me so much."
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-gray-300 leading-relaxed",
                  children: `When I'm not coding or studying, you'll find me exploring new music (hence the "Mixtape" in my name!), gaming on my Linux setup, or contributing to open source projects. I love the intersection of technology and creativity, and I'm always looking for ways to combine both in my work.`
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "grid grid-cols-2 gap-4",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "text-3xl mb-2",
                    children: "🎯"
                  }), /* @__PURE__ */ jsx("div", {
                    className: "text-2xl font-bold text-white",
                    children: ">50"
                  }), /* @__PURE__ */ jsx("div", {
                    className: "text-sm text-gray-300",
                    children: "Projects Completed"
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "text-3xl mb-2",
                    children: "⏰"
                  }), /* @__PURE__ */ jsx("div", {
                    className: "text-2xl font-bold text-white",
                    children: "3+"
                  }), /* @__PURE__ */ jsx("div", {
                    className: "text-sm text-gray-300",
                    children: "Years Learning"
                  })]
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-6",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20",
                children: [/* @__PURE__ */ jsxs("h3", {
                  className: "text-2xl font-bold text-white mb-4 flex items-center space-x-2",
                  children: [/* @__PURE__ */ jsx("span", {
                    children: "💡"
                  }), /* @__PURE__ */ jsx("span", {
                    children: "What Drives Me"
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-4",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex items-start space-x-3",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "text-2xl",
                      children: "🎨"
                    }), /* @__PURE__ */ jsxs("div", {
                      children: [/* @__PURE__ */ jsx("h4", {
                        className: "font-semibold text-white mb-1",
                        children: "Open Source Passion"
                      }), /* @__PURE__ */ jsx("p", {
                        className: "text-gray-300 text-sm",
                        children: "Contributing to FOSS projects and using open source tools"
                      })]
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex items-start space-x-3",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "text-2xl",
                      children: "🌱"
                    }), /* @__PURE__ */ jsxs("div", {
                      children: [/* @__PURE__ */ jsx("h4", {
                        className: "font-semibold text-white mb-1",
                        children: "Self-Directed Learning"
                      }), /* @__PURE__ */ jsx("p", {
                        className: "text-gray-300 text-sm",
                        children: "Learning through docs, communities, and hands-on practice"
                      })]
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex items-start space-x-3",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "text-2xl",
                      children: "🤝"
                    }), /* @__PURE__ */ jsxs("div", {
                      children: [/* @__PURE__ */ jsx("h4", {
                        className: "font-semibold text-white mb-1",
                        children: "Community Driven"
                      }), /* @__PURE__ */ jsx("p", {
                        className: "text-gray-300 text-sm",
                        children: "Believing in collaborative development and knowledge sharing"
                      })]
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex items-start space-x-3",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "text-2xl",
                      children: "✨"
                    }), /* @__PURE__ */ jsxs("div", {
                      children: [/* @__PURE__ */ jsx("h4", {
                        className: "font-semibold text-white mb-1",
                        children: "Creative Problem Solving"
                      }), /* @__PURE__ */ jsx("p", {
                        className: "text-gray-300 text-sm",
                        children: "Finding elegant solutions using open source tools"
                      })]
                    })]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20",
                children: [/* @__PURE__ */ jsxs("h3", {
                  className: "text-xl font-bold text-white mb-4 flex items-center space-x-2",
                  children: [/* @__PURE__ */ jsx("span", {
                    children: "🎵"
                  }), /* @__PURE__ */ jsx("span", {
                    children: "Fun Facts"
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2 text-gray-300",
                  children: [/* @__PURE__ */ jsx("p", {
                    children: "🐧 Linux user and advocate"
                  }), /* @__PURE__ */ jsx("p", {
                    children: "🎧 I code best with lo-fi hip-hop playing"
                  }), /* @__PURE__ */ jsx("p", {
                    children: "🎮 Gaming on my Linux setup"
                  }), /* @__PURE__ */ jsx("p", {
                    children: "📚 Currently learning Rust and contributing to FOSS"
                  }), /* @__PURE__ */ jsx("p", {
                    children: "🌮 High schooler who still loves Taco Tuesday"
                  })]
                })]
              })]
            })]
          })
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "mb-16",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl font-bold text-center mb-12",
          children: /* @__PURE__ */ jsx("span", {
            className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400",
            children: "🛠️ Skills"
          })
        }), /* @__PURE__ */ jsxs("div", {
          "data-section": "skills",
          className: `observe-section transition-all duration-1000 ${visibleSections.includes("skills") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
          children: [/* @__PURE__ */ jsx("div", {
            className: "flex flex-wrap justify-center gap-3 mb-8",
            children: skillCategories.map((category) => /* @__PURE__ */ jsxs("button", {
              onClick: () => setSkillFilter(category.id),
              className: `px-4 py-2 rounded-full font-medium transition-all duration-300 ${skillFilter === category.id ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`,
              children: [/* @__PURE__ */ jsx("span", {
                className: "mr-2",
                children: category.icon
              }), category.name]
            }, category.id))
          }), /* @__PURE__ */ jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
            children: filteredSkills.map((skill, index) => /* @__PURE__ */ jsxs("div", {
              className: "bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105",
              style: {
                animationDelay: `${index * 50}ms`
              },
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-center space-x-3 mb-4",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "text-2xl",
                  children: skill.icon
                }), /* @__PURE__ */ jsx("h3", {
                  className: "font-semibold text-white",
                  children: skill.name
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex justify-between text-sm",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-gray-300",
                    children: "Proficiency"
                  }), /* @__PURE__ */ jsxs("span", {
                    className: "text-purple-400",
                    children: [skill.level, "%"]
                  })]
                }), /* @__PURE__ */ jsx("div", {
                  className: "w-full bg-gray-700 rounded-full h-2",
                  children: /* @__PURE__ */ jsx("div", {
                    className: "bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000 ease-out",
                    style: {
                      width: visibleSections.includes("skills") ? `${skill.level}%` : "0%",
                      transitionDelay: `${index * 100}ms`
                    }
                  })
                })]
              })]
            }, skill.name))
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "mb-16",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl font-bold text-center mb-12",
          children: /* @__PURE__ */ jsx("span", {
            className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400",
            children: "💼 Experience"
          })
        }), /* @__PURE__ */ jsx("div", {
          "data-section": "experience",
          className: `observe-section transition-all duration-1000 ${visibleSections.includes("experience") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
          children: /* @__PURE__ */ jsx("div", {
            className: "space-y-8",
            children: experiences.map((exp, index) => /* @__PURE__ */ jsxs("div", {
              className: `relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 ${index % 2 === 0 ? "ml-0 lg:ml-8" : "mr-0 lg:mr-8"}`,
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute -left-4 top-8 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center",
                children: /* @__PURE__ */ jsx("div", {
                  className: "w-3 h-3 bg-white rounded-full"
                })
              }), /* @__PURE__ */ jsxs("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "lg:col-span-2",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4",
                    children: [/* @__PURE__ */ jsx("h3", {
                      className: "text-xl font-bold text-white",
                      children: exp.title
                    }), /* @__PURE__ */ jsx("span", {
                      className: "text-purple-400 font-medium text-sm",
                      children: exp.period
                    })]
                  }), /* @__PURE__ */ jsx("h4", {
                    className: "text-purple-300 font-semibold mb-3",
                    children: exp.company
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-300 mb-4 leading-relaxed",
                    children: exp.description
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h5", {
                    className: "font-semibold text-white mb-3",
                    children: "Key Achievements:"
                  }), /* @__PURE__ */ jsx("ul", {
                    className: "space-y-2",
                    children: exp.achievements.map((achievement, achIndex) => /* @__PURE__ */ jsxs("li", {
                      className: "flex items-start space-x-2 text-sm text-gray-300",
                      children: [/* @__PURE__ */ jsx("span", {
                        className: "text-green-400 mt-1",
                        children: "✓"
                      }), /* @__PURE__ */ jsx("span", {
                        children: achievement
                      })]
                    }, achIndex))
                  })]
                })]
              })]
            }, index))
          })
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "text-center mt-16",
        children: /* @__PURE__ */ jsxs("div", {
          className: "bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 max-w-2xl mx-auto",
          children: [/* @__PURE__ */ jsx("div", {
            className: "text-4xl mb-4 animate-bounce",
            children: "🤝"
          }), /* @__PURE__ */ jsx("h3", {
            className: "text-2xl font-bold text-white mb-4",
            children: "Let's Work Together!"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-300 mb-6",
            children: "I'm always excited to collaborate on open source projects and learn from the developer community. Whether you have a cool project idea or just want to connect, I'd love to hear from you!"
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col sm:flex-row gap-4 justify-center",
            children: [/* @__PURE__ */ jsxs("a", {
              href: "/projects",
              className: "inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105",
              children: [/* @__PURE__ */ jsx("span", {
                children: "🚀"
              }), /* @__PURE__ */ jsx("span", {
                children: "View My Projects"
              })]
            }), /* @__PURE__ */ jsxs("a", {
              href: "/socials",
              className: "inline-flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105",
              children: [/* @__PURE__ */ jsx("span", {
                children: "📱"
              }), /* @__PURE__ */ jsx("span", {
                children: "Connect With Me"
              })]
            })]
          })]
        })
      })]
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "404 - Page Not Found | MixtapeJaxson"
  }, {
    name: "description",
    content: "Oops! The page you're looking for doesn't exist. Let's get you back on track."
  }, {
    name: "robots",
    content: "noindex, nofollow"
  }];
}
const $ = UNSAFE_withComponentProps(function NotFound() {
  const [isVisible, setIsVisible] = useState(false);
  const [glitchText, setGlitchText] = useState("404");
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const glitchChars = ["4", "0", "4", "?", "#", "@", "!", "%"];
    let glitchInterval;
    const startGlitch = () => {
      glitchInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          const randomText = Array.from({
            length: 3
          }, () => glitchChars[Math.floor(Math.random() * glitchChars.length)]).join("");
          setGlitchText(randomText);
          setTimeout(() => setGlitchText("404"), 100);
        }
      }, 2e3);
    };
    const timer = setTimeout(startGlitch, 1e3);
    return () => {
      clearTimeout(timer);
      clearInterval(glitchInterval);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen flex items-center justify-center overflow-hidden relative",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "absolute inset-0",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute top-20 left-20 text-4xl opacity-10 animate-float",
        children: "💀"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute top-40 right-32 text-3xl opacity-10 animate-float-delayed",
        children: "⚠️"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute bottom-40 left-32 text-5xl opacity-10 animate-float",
        children: "🚫"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute bottom-20 right-20 text-3xl opacity-10 animate-float-delayed",
        children: "❌"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute top-60 left-1/2 text-2xl opacity-10 animate-float",
        children: "🔍"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-20 animate-pulse"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20 animate-pulse",
        style: {
          animationDelay: "1s"
        }
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute inset-0 opacity-5",
        style: {
          backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.3) 1px, transparent 1px)
            `,
          backgroundSize: "30px 30px"
        }
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: `relative z-10 text-center px-4 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`,
      children: [/* @__PURE__ */ jsxs("div", {
        className: "mb-8",
        children: [/* @__PURE__ */ jsxs("h1", {
          className: "text-8xl sm:text-9xl lg:text-[12rem] font-bold mb-4 relative",
          children: [/* @__PURE__ */ jsx("span", {
            className: "text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 font-mono tracking-wider",
            children: glitchText
          }), /* @__PURE__ */ jsx("span", {
            className: "absolute inset-0 text-red-500 opacity-70 animate-pulse",
            style: {
              textShadow: "2px 0 #ff0000, -2px 0 #00ff00, 0 2px #0000ff"
            },
            children: "404"
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "text-6xl sm:text-8xl mb-6 animate-bounce",
          children: "🤖💥"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: `transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`,
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl sm:text-4xl font-bold text-white mb-4",
          children: "Oops! Page Not Found"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed",
          children: ["Looks like this page decided to take a vacation! 🏝️", /* @__PURE__ */ jsx("br", {}), "Don't worry, let's get you back to familiar territory."]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: `flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`,
        children: [/* @__PURE__ */ jsxs(Link, {
          to: "/",
          className: "group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full text-white font-semibold transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-purple-500/50 w-full sm:w-auto min-w-[200px]",
          children: [/* @__PURE__ */ jsxs("span", {
            className: "flex items-center justify-center space-x-2",
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-xl group-hover:animate-bounce",
              children: "🏠"
            }), /* @__PURE__ */ jsx("span", {
              children: "Take Me Home"
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
          }), /* @__PURE__ */ jsx("div", {
            className: "absolute inset-0 rounded-full overflow-hidden",
            children: /* @__PURE__ */ jsx("div", {
              className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
            })
          })]
        }), /* @__PURE__ */ jsxs(Link, {
          to: "/projects",
          className: "group relative px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-full text-white font-semibold transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-lg w-full sm:w-auto min-w-[200px]",
          children: [/* @__PURE__ */ jsxs("span", {
            className: "flex items-center justify-center space-x-2",
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-xl group-hover:animate-bounce",
              children: "🚀"
            }), /* @__PURE__ */ jsx("span", {
              children: "View Projects"
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "absolute inset-0 rounded-full overflow-hidden",
            children: /* @__PURE__ */ jsx("div", {
              className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
            })
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: `mt-16 transition-all duration-1000 delay-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`,
        children: /* @__PURE__ */ jsxs("div", {
          className: "bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20 max-w-md mx-auto",
          children: [/* @__PURE__ */ jsxs("h3", {
            className: "text-lg font-bold text-white mb-3 flex items-center justify-center space-x-2",
            children: [/* @__PURE__ */ jsx("span", {
              children: "💡"
            }), /* @__PURE__ */ jsx("span", {
              children: "Fun Fact"
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-300 text-sm",
            children: "The first documented case of a 404 error was at CERN in 1992. The page they were looking for? Tim Berners-Lee's info about the World Wide Web project!"
          })]
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: `mt-8 transition-all duration-1000 delay-1200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`,
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-gray-400 text-sm",
          children: "Or explore these popular pages:"
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex justify-center space-x-4 mt-3",
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/about",
            className: "text-purple-400 hover:text-purple-300 transition-colors duration-300 text-sm",
            children: "About Me"
          }), /* @__PURE__ */ jsx("span", {
            className: "text-gray-600",
            children: "•"
          }), /* @__PURE__ */ jsx(Link, {
            to: "/socials",
            className: "text-purple-400 hover:text-purple-300 transition-colors duration-300 text-sm",
            children: "Connect"
          })]
        })]
      })]
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-9t7juqhG.js", "imports": ["/assets/chunk-B7RQU5TL-FvSqzr6z.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-rFMA0g-J.js", "imports": ["/assets/chunk-B7RQU5TL-FvSqzr6z.js"], "css": ["/assets/root-DfUA3JNO.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-BQtMN0y0.js", "imports": ["/assets/chunk-B7RQU5TL-FvSqzr6z.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/projects": { "id": "routes/projects", "parentId": "root", "path": "projects", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/projects-DtXT2C1S.js", "imports": ["/assets/chunk-B7RQU5TL-FvSqzr6z.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/socials": { "id": "routes/socials", "parentId": "root", "path": "socials", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/socials-CY5l5G7q.js", "imports": ["/assets/chunk-B7RQU5TL-FvSqzr6z.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-BeKjW6O_.js", "imports": ["/assets/chunk-B7RQU5TL-FvSqzr6z.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/$": { "id": "routes/$", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_-CvcUBA8k.js", "imports": ["/assets/chunk-B7RQU5TL-FvSqzr6z.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-fb6054be.js", "version": "fb6054be", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/projects": {
    id: "routes/projects",
    parentId: "root",
    path: "projects",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/socials": {
    id: "routes/socials",
    parentId: "root",
    path: "socials",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/$": {
    id: "routes/$",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
