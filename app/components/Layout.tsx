import type { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Analytics } from "@vercel/analytics/react";
<Analytics/>
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
}
