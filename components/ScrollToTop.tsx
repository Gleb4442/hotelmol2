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
  const isAbout = pathname === "/about";
  const isBlogList = pathname === "/blog";
  const isBlogArticle = pathname.startsWith("/blog/") && pathname.length > "/blog/".length;

  if (isContact || isAbout || isBlogList) {
    return null;
  }

  return (
    <>
      {isVisible && !isCookieBannerVisible && (
        <button
          onClick={scrollToTop}
          data-testid="button-scroll-to-top-desktop"
          className="hidden md:flex fixed right-2 bottom-4 z-[45] w-[44px] h-[44px] rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(7,82,160,0.4)] border border-white/30 backdrop-blur-md bg-[#0752A0] hover:bg-[#0752A0]/90 items-center justify-center p-0"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      )}
    </>
  );
}
