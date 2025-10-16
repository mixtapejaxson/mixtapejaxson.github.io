import type { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  import { useState, useEffect } from "react";
  import Cookies from "js-cookie";

  const bannerText = process.env.BANNER_TEXT;
  const bannerBgColor = process.env.BANNER_BG_COLOR || "bg-blue-500";
  const bannerTextColor = process.env.BANNER_TEXT_COLOR || "text-white";
  const bannerTextPosition = process.env.BANNER_TEXT_POSITION || "text-center";

  const bannerKey = `${bannerText}-${bannerBgColor}-${bannerTextColor}-${bannerTextPosition}`;
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  useEffect(() => {
    const storedBannerKey = Cookies.get("bannerKey");
    if (storedBannerKey === bannerKey) {
      setIsBannerVisible(false);
    } else {
      setIsBannerVisible(true);
    }
  }, [bannerKey]);

  const closeBanner = () => {
    setIsBannerVisible(false);
    Cookies.set("bannerKey", bannerKey, { expires: 7 });
  };

  return (
    <>
      {bannerText && isBannerVisible && (
        <div
          className={`${bannerBgColor} ${bannerTextColor} ${bannerTextPosition} py-2 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto`}
        >
          <div className="flex justify-between items-center">
            <span>{bannerText}</span>
            <button
              onClick={closeBanner}
              className="ml-4 text-sm text-gray-300 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <Navigation />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
}
