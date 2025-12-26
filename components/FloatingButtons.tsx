"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/TranslationContext";
import type { Language } from "@/lib/translations";

export default function FloatingButtons() {
  const { language, setLanguage } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show floating buttons only after cookie consent is given
    const consent = localStorage.getItem("cookieConsent");
    if (consent) {
      setIsVisible(true);
    }

    // Listen for cookie consent changes
    const checkConsent = () => {
      const consent = localStorage.getItem("cookieConsent");
      if (consent) {
        setIsVisible(true);
      }
    };

    // Check periodically for cookie consent
    const interval = setInterval(checkConsent, 1000);
    return () => clearInterval(interval);
  }, []);

  const cycleLanguage = () => {
    const languages: Language[] = ["en", "ru", "ua"];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  const getLanguageLabel = () => {
    switch (language) {
      case "en":
        return "EN";
      case "ru":
        return "RU";
      case "ua":
        return "UA";
      default:
        return "UA";
    }
  };

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-4 right-4 z-40 flex flex-col gap-3">
      <Button
        size="sm"
        variant="default"
        asChild
        className="rounded-full shadow-lg min-h-10 px-4 font-medium"
        data-testid="floating-button-pricing"
      >
        <a href="https://pricing.hotelmol.com/#yearly" target="_blank" rel="noopener noreferrer">
          Price
        </a>
      </Button>

      <Button
        size="sm"
        variant="default"
        asChild
        className="rounded-full shadow-lg min-h-10 px-4 font-medium"
        data-testid="floating-button-demo"
      >
        <a href="https://demo.hotelmol.com" target="_blank" rel="noopener noreferrer">
          Demo
        </a>
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={cycleLanguage}
        className="rounded-full shadow-lg min-h-10 min-w-10 px-3 font-bold bg-background/95 backdrop-blur"
        data-testid="floating-button-language"
      >
        {getLanguageLabel()}
      </Button>
    </div>
  );
}
