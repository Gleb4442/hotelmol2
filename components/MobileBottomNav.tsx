"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Menu, Globe, ExternalLink, X, ChevronUp } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Language } from "@/lib/translations";

export default function MobileBottomNav() {
    const { language, setLanguage, t } = useTranslation();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Visibility logic: hide on blog pages
    const isHiddenPath = pathname.startsWith("/blog");

    useEffect(() => {
        // Show after cookie consent or initial load
        const consent = localStorage.getItem("cookieConsent");
        if (consent) setIsVisible(true);

        const checkConsent = () => {
            if (localStorage.getItem("cookieConsent")) setIsVisible(true);
        };
        const interval = setInterval(checkConsent, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!isVisible || isHiddenPath) return null;

    const cycleLanguage = () => {
        const languages: Language[] = ["en", "ru", "ua"];
        const currentIndex = languages.indexOf(language);
        const nextIndex = (currentIndex + 1) % languages.length;
        setLanguage(languages[nextIndex]);
    };

    const getLanguageLabel = () => {
        switch (language) {
            case "en": return "EN";
            case "ru": return "RU";
            case "ua": return "UA";
            default: return "UA";
        }
    };

    const openAIChat = () => {
        // Dispatch custom event to open the widget
        window.dispatchEvent(new CustomEvent("open-ai-chat"));
    };

    return (
        <div className="md:hidden fixed bottom-2 left-2 right-2 z-50 pointer-events-none">
            {/* UI Polish: Removed border and dividers for a cleaner look. Shadow provides separation. bg opacity increased. */}
            <div className="relative w-full h-14 bg-white/90 dark:bg-black/95 backdrop-blur-2xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-between px-2 pointer-events-auto">

                {/* AI Assistant Button */}
                <button
                    onClick={openAIChat}
                    className="flex-1 flex flex-col items-center justify-center gap-0.5 h-full text-[#0752A0] active:scale-95 transition-transform"
                >
                    <MessageCircle className="w-6 h-6" />
                    <span className="text-[10px] font-medium uppercase tracking-tighter">AI</span>
                </button>

                {/* Vertical Divider Removed */}

                {/* Menu Button (Demo/Pricing) */}
                <div className="relative flex-1 h-full">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`w-full h-full flex flex-col items-center justify-center gap-0.5 transition-colors ${isMenuOpen ? 'text-[#0752A0]' : 'text-foreground/70'}`}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        <span className="text-[10px] font-medium uppercase tracking-tighter">Menu</span>
                    </button>

                    {/* Dropup Menu */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 bg-white/95 dark:bg-black/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-black/5 overflow-hidden p-2 z-[60]"
                            >
                                <a
                                    href="https://demo.hotelmol.com"
                                    target="_blank"
                                    onClick={() => setIsMenuOpen(false)}
                                    // UI Refinement: Text only, centered, no extra icons
                                    className="flex items-center justify-center w-full py-4 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors text-sm font-semibold"
                                >
                                    {t("button.tryDemo") || "Demo"}
                                </a>
                                <div className="h-px bg-black/5 dark:bg-white/5 mx-2" />
                                <a
                                    href="https://pricing.hotelmol.com/#yearly"
                                    target="_blank"
                                    onClick={() => setIsMenuOpen(false)}
                                    // UI Refinement: Text only, centered, no extra icons
                                    className="flex items-center justify-center w-full py-4 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors text-sm font-semibold"
                                >
                                    {t("button.pricing") || "Pricing"}
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Vertical Divider Removed */}

                {/* Language Switcher Button */}
                <button
                    onClick={cycleLanguage}
                    className="flex-1 flex flex-col items-center justify-center gap-0.5 h-full text-foreground/70 active:scale-95 transition-transform"
                >
                    <Globe className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">{getLanguageLabel()}</span>
                </button>
            </div>

            {/* Backdrop for Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMenuOpen(false)}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] md:hidden"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
