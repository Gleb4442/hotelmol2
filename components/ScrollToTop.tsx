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

  // Only show on Blog Article pages (e.g. /blog/some-slug)
  const isBlogArticle = pathname.startsWith("/blog/") && pathname.length > "/blog/".length;

  if (!isBlogArticle) {
    return null;
  }

  // Hide button on Contact page (redundant check given the blog article check, but keeping for safety if logic changes)
  if (pathname === "/contact") {
    return null;
  }

  return (
    <>
      {isVisible && (
        <>
          {/* Mobile version - left bottom - Miniature and laconic */}
          <button
            onClick={scrollToTop}
            data-testid="button-scroll-to-top-mobile"
            className="md:hidden fixed right-[18px] bottom-10 z-[45] p-2.5 rounded-full transition-all duration-300 shadow-xl border border-white/10 backdrop-blur-md bg-[#0752A0]/80 hover:bg-[#0752A0]/90 active:scale-90"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 text-white" />
          </button>

          {/* Desktop version - left bottom - Miniature and elegant */}
          {!isCookieBannerVisible && (
            <button
              onClick={scrollToTop}
              data-testid="button-scroll-to-top-desktop"
              className="hidden md:flex fixed right-10 bottom-10 z-[45] p-2.5 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl border border-white/10 backdrop-blur-md bg-[#0752A0]/80 hover:bg-[#0752A0]/90"
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
