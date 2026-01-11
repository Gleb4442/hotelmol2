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
      const shouldBeVisible = window.scrollY > 300;

      // Dispatch event for other components (like AskAIWidget) to react
      window.dispatchEvent(new CustomEvent("desktop-scroll-visible", {
        detail: { visible: shouldBeVisible }
      }));

      if (shouldBeVisible) {
        // Delay showing button slightly to allow Ask AI widget to shift out of the way first
        setTimeout(() => setIsVisible(true), 150);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isContact = pathname === "/contact";
  const isBlogList = pathname === "/blog";

  if (isContact || isBlogList) {
    return null;
  }

  return (
    <>
      {isVisible && !isCookieBannerVisible && (
        <button
          onClick={scrollToTop}
          data-testid="button-scroll-to-top-desktop"
          className="fixed right-4 bottom-6 z-40 p-0 w-[44px] h-[44px] rounded-full bg-[#0752A0] text-white shadow-lg hover:bg-[#0752A0]/90 hover:scale-110 active:scale-95 transition-all duration-300 hidden md:flex items-center justify-center border-white/30 backdrop-blur-md"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      )}
    </>
  );
}
