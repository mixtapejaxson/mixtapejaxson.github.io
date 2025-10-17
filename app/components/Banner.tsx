import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface BannerProps {
  bannerText?: string;
  bannerBgColor?: string;
  bannerTextColor?: string;
  bannerTextPosition?: string;
}

export default function Banner({
  bannerText,
  bannerBgColor = "bg-blue-500",
  bannerTextColor = "text-white",
  bannerTextPosition = "text-center",
}: BannerProps) {

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
          className={`${bannerBgColor} ${bannerTextColor} ${bannerTextPosition} py-2 px-4 w-full fixed top-0 left-0 right-0 z-50`}
        >
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <span>{bannerText}</span>
            <button
              onClick={closeBanner}
              className="ml-4 text-sm hover:text-gray-200 transition-colors"
              aria-label="Close banner"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
