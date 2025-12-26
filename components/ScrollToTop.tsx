"use client";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCookieBanner } from "@/lib/CookieBannerContext";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const { isCookieBannerVisible } = useCookieBanner();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Hide button on Contact page
  if (pathname === "/contact") {
    return null;
  }

  return (
    <>
      {isVisible && (
        <>
          {/* Mobile version - left bottom */}
          <button
            onClick={scrollToTop}
            data-testid="button-scroll-to-top-mobile"
            className="md:hidden fixed left-4 bottom-8 z-40 p-2 rounded-full transition-all duration-300"
            style={{ backgroundColor: "#0752A0" }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </button>

          {/* Desktop version - right bottom, hidden while cookie banner is visible */}
          {!isCookieBannerVisible && (
            <button
              onClick={scrollToTop}
              data-testid="button-scroll-to-top-desktop"
              className="hidden md:flex fixed right-6 bottom-8 z-40 p-2 rounded-full transition-all duration-300"
              style={{ backgroundColor: "#0752A0" }}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 text-white" />
            </button>
          )}
        </>
      )}
    </>
  );
}
