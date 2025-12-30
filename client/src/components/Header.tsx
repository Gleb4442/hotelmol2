import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";
import type { Language } from "@/lib/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoImage from "@assets/hotelmol-logo.png";

interface HeaderProps {
  onDemoClick?: () => void;
}

export default function Header({ onDemoClick }: HeaderProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
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
    <header className="fixed top-0 left-0 right-0 z-50" style={{ 
      width: "calc(100% - 2rem)", 
      maxWidth: "1280px", 
      margin: "1rem auto",
      left: "50%",
      transform: "translateX(-50%)",
      borderRadius: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      boxShadow: "0 8px 32px rgba(7, 82, 160, 0.12)"
    }}>
      <div className="flex h-[90px] md:h-[100px] items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center" data-testid="link-home">
            <img src={logoImage} alt="HotelMol" className="h-[195px]" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => {
              const isActive = location === item.href;
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
            className="md:hidden w-16 h-16"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-10 w-10 stroke-[3]" /> : <Menu className="h-10 w-10 stroke-[3]" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t md:hidden rounded-b-2xl">
          <nav className="flex flex-col gap-4 p-4">
            {navigation.map((item) => {
              const isActive = location === item.href;
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-2 ${isActive ? "text-primary" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-link-${item.name.toLowerCase().replace(' ', '-')}`}
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
      )}
      
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
