"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, translations, TranslationKey } from "./translations";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ua");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("language");
      if (stored && (stored as Language) !== language) {
        setLanguageState(stored as Language);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  };

  const t = (key: TranslationKey): string => {
    const dict = translations[language] as any;
    const fallback = translations.en as any;
    return dict[key] || fallback[key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }
  return context;
}
