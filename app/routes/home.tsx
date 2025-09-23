import type { Route } from "./+types/home";
import HeroSection from "../components/HeroSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MixtapeJaxson - Welcome" },
    {
      name: "description",
      content:
        "Welcome to MixtapeJaxson's personal website. Explore my projects, connect with me, and learn about my journey in web development.",
    },
    {
      name: "keywords",
      content: "MixtapeJaxson, web developer, projects, portfolio",
    },
    { property: "og:title", content: "MixtapeJaxson - Welcome" },
    {
      property: "og:description",
      content: "Welcome to MixtapeJaxson's personal website",
    },
    { property: "og:type", content: "website" },
  ];
}

export default function Home() {
  return <HeroSection />;
}
