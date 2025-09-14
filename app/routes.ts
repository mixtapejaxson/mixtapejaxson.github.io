import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("projects", "routes/projects.tsx"),
  route("socials", "routes/socials.tsx"),
  route("about", "routes/about.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
