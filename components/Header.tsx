"use client";
import { useState } from "react";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
    <header className="fixed top-0 left-0 right-0 z-50 w-[calc(100%-2rem)] max-w-[1280px] mx-auto mt-2 md:mt-4 rounded-[20px] bg-white/95 backdrop-blur-md shadow-[0_8px_32px_rgba(7,82,160,0.12)] border border-white/20">
      <div className="flex h-[68px] md:h-[87px] items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center" data-testid="link-home">
            <img src="/assets/hotelmol-logo.png" alt="HotelMol" className="h-[180px] md:h-[195px] mt-2 md:mt-1" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
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

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden w-16 h-16"
                data-testid="button-mobile-menu"
              >
                <Menu className="h-10 w-10 stroke-[3]" />
              </Button>
            </DialogTrigger>
            <DialogContent
              overlayClassName="bg-white/10 backdrop-blur-md"
              className="w-[90%] max-w-[350px] rounded-2xl border-white/20 shadow-2xl backdrop-blur-xl bg-white/90 dark:bg-zinc-900/90 overflow-hidden"
            >
              <div className="text-center py-6 border-b border-white/20">
                <DialogTitle className="text-3xl font-bold text-[#0752A0]">МЕНЮ</DialogTitle>
              </div>
              <nav className="flex flex-col gap-4 items-stretch px-6 py-8">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <DialogClose asChild key={item.name}>
                      <Link
                        href={item.href}
                        className={`w-full py-3 px-4 rounded-xl text-center font-bold shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 ${isActive ? "bg-[#0752A0] text-white ring-2 ring-white/50" : "bg-[#0752A0] text-white"}`}
                        data-testid={`mobile-link-${item.name.toLowerCase().replace(' ', '-')}`}
                      >
                        {item.name}
                        {item.badge && (
                          <span className="inline-block px-2 py-0.5 text-[10px] font-semibold text-[#0752A0] bg-white rounded-full ml-1">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </DialogClose>
                  );
                })}
              </nav>
            </DialogContent>
          </Dialog>
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
            box-shadow: 0 0 0 0 rgba(173, 216, 230, 0.2);
            filter: brightness(1);
          }
          50% {
            box-shadow: 0 0 12px 4px rgba(173, 216, 230, 0.4);
            filter: brightness(1.1);
          }
        }

        .shimmer-button {
          animation: shimmer-glow 4s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
}
