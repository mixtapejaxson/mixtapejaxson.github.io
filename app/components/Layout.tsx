import type { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const bannerText = process.env.BANNER_TEXT;
  const bannerBgColor = process.env.BANNER_BG_COLOR || "bg-blue-500";
  const bannerTextColor = process.env.BANNER_TEXT_COLOR || "text-white";
  const bannerTextPosition = process.env.BANNER_TEXT_POSITION || "text-center";

  return (
    <>
      {bannerText && (
        <div
          className={`${bannerBgColor} ${bannerTextColor} ${bannerTextPosition} py-2`}
        >
          {bannerText}
        </div>
      )}
      <Navigation />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
}
