"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Globe, Menu } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";
import type { Language } from "@/lib/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface HeaderProps {
  onDemoClick?: () => void;
}

export default function Header({ onDemoClick }: HeaderProps = {}) {
  const pathname = usePathname();
  const { language, setLanguage, t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("mobile-menu-open");
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data: blogEnabledData } = useQuery<{ key: string; value: string | null }>({
    queryKey: ["/api/settings/blogEnabled"],
  });

  const blogEnabled = blogEnabledData?.value !== "false";

  const allNavigation: Array<{ name: string; href: string; badge?: string }> = [
    { name: t("nav.roomie"), href: "/roomie" },
    { name: t("nav.solutions"), href: "/solutions" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const navigation = allNavigation.filter(item =>
    item.href !== "/blog" || blogEnabled
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full max-w-[1280px] mx-auto pt-[env(safe-area-inset-top)] mt-2 md:mt-4 px-4 md:px-0">
      <div className="flex h-[68px] md:h-[87px] items-center justify-between md:px-6 md:rounded-[20px] md:bg-white/95 md:backdrop-blur-md md:shadow-[0_8px_32px_rgba(7,82,160,0.12)] md:border md:border-white/20">
        <div className="flex items-center gap-8 bg-white/95 backdrop-blur-md shadow-[0_8px_32px_rgba(7,82,160,0.12)] border border-white/20 rounded-full px-5 h-[56px] md:h-auto md:bg-transparent md:backdrop-blur-none md:shadow-none md:border-none md:rounded-none md:px-0 hide-on-menu-open">
          <Link href="/" className="flex items-center h-full" data-testid="link-home">
            <img src="/assets/hotelmol-logo.png" alt="HotelMol" className="h-[140px] md:h-[195px] mt-1.5 md:mt-1 object-contain" />
          </Link>

          <nav className="hidden md:flex items-center gap-[18px]">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-base font-medium transition-colors hover:text-primary flex items-center gap-2 ${item.href === "/roomie" ? "shimmer-button px-4 py-3 rounded-full" : ""} ${isActive ? "text-primary" : ""}`}
                  data-testid={`link-${item.name.toLowerCase().replace(' ', '-')}`}
                >
                  {item.name}
                  {item.badge && (
                    <span className="inline-block px-2 py-0.5 text-xs font-semibold text-white bg-gradient-to-r from-primary via-blue-600 to-primary bg-[length:200%_100%] animate-gradient rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:inline-flex" data-testid="button-language">
                <Globe className="h-8 w-8" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en" as Language)} data-testid="option-en">
                English (EN) {language === "en" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("ru" as Language)} data-testid="option-ru">
                Русский (RU) {language === "ru" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("ua" as Language)} data-testid="option-ua">
                Українська (UA) {language === "ua" && "✓"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("pl" as Language)} data-testid="option-pl">
                Polski (PL) {language === "pl" && "✓"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="default"
            asChild
            className="hidden sm:inline-flex"
            data-testid="button-pricing"
          >
            <a href="https://pricing.hotelmol.com/#yearly" target="_blank" rel="noopener noreferrer">
              {t("button.pricing")}
            </a>
          </Button>

          <Button
            size="default"
            asChild
            className="hidden md:inline-flex"
            data-testid="button-try-demo"
          >
            <a href="https://demo.hotelmol.com" target="_blank" rel="noopener noreferrer">
              {t("button.tryDemo")}
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden w-[56px] h-[56px] bg-white/95 backdrop-blur-md shadow-[0_8px_32px_rgba(7,82,160,0.12)] border border-white/20 rounded-full flex items-center justify-center active:scale-95 transition-transform hide-on-menu-open"
            onClick={() => setIsMobileMenuOpen(true)}
            data-testid="button-mobile-menu"
          >
            <Menu className="h-7 w-7 stroke-[2.5] text-[#0752A0]" />
          </Button>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <div className="fixed inset-0 z-[100] md:hidden">
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                />

                {/* Menu Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                  className="absolute top-[10px] bottom-[10px] left-[25px] right-[25px] bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col"
                >
                  <div className="relative flex items-center justify-center p-6 min-h-[100px] border-b border-white/20">
                    <h2 className="text-3xl font-black text-[#0752A0] uppercase tracking-[0.25em] font-serif text-center">
                      {t("menu.title")}
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="absolute right-4 top-4 rounded-full bg-black/5 hover:bg-black/10 transition-colors h-12 w-12"
                    >
                      <X className="h-7 w-7" />
                    </Button>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    <nav className="flex flex-col gap-3 items-stretch px-6 py-6">
                      {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`w-full py-4 px-6 rounded-xl text-center font-bold shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-2 ${isActive ? "bg-[#0752A0] text-white ring-2 ring-white/50" : "bg-[#0752A0] text-white"}`}
                          >
                            {item.name}
                            {item.badge && (
                              <span className="inline-block px-2 py-0.5 text-[10px] font-semibold text-[#0752A0] bg-white rounded-full ml-1">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </nav>

                    <div className="px-6 py-6 border-t border-white/20">
                      <p className="text-sm font-medium text-muted-foreground mb-4 text-center">
                        {language === "en" ? "Select Language" : language === "ru" ? "Выберите язык" : language === "ua" ? "Оберіть мову" : "Wybierz język"}
                      </p>
                      <div className="grid grid-cols-2 gap-3 pb-6">
                        {(["en", "ru", "ua", "pl"] as const).map((lang) => (
                          <Button
                            key={lang}
                            variant={language === lang ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              setLanguage(lang);
                              // Keep menu open for language feedback or close? User didn't specify. 
                              // Usually better to keep open for a moment.
                            }}
                            className="w-full rounded-xl h-11 font-medium"
                          >
                            {lang === "en" ? "English" : lang === "ru" ? "Русский" : lang === "ua" ? "Українська" : "Polski"}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        @keyframes shimmer-glow {
          0%, 100% {
            box-shadow: 0 0 8px 2px rgba(173, 216, 230, 0.1);
          }
          50% {
            box-shadow: 0 0 16px 6px rgba(173, 216, 230, 0.25);
          }
        }

        .shimmer-button {
          animation: shimmer-glow 4s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
}
