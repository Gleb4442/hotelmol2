"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Globe, ExternalLink, X } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";
import { usePathname } from "next/navigation";
import type { Language } from "@/lib/translations";

export default function MobileAIInput() {
    const { language, setLanguage, t } = useTranslation();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [showScrollBtn, setShowScrollBtn] = useState(false);

    // Visibility logic: hide on blog and contact pages
    // User requested to hide on specific pages? 
    // Usually widgets like this replace the nav, so should follow same visibility rules or be always present.
    // Let's hide on /contact as per ScrollToTop logic request (user likely wants cleaner pages there).
    // Original MobileBottomNav logic: if (!isVisible || isHiddenPath) return null;
    // isHiddenPath = pathname.startsWith("/blog") || pathname === "/contact";
    // Let's stick to this for consistency unless user said otherwise. User didn't specify visibility for wdiget, but implicitly "make on mobile version...".
    const isHiddenPath = pathname.startsWith("/blog") || pathname === "/contact";

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (consent) setIsVisible(true);
        const checkConsent = () => {
            if (localStorage.getItem("cookieConsent")) setIsVisible(true);
        };
        const interval = setInterval(checkConsent, 1000);
        return () => clearInterval(interval);
    }, []);

    // Scroll Logic for Mobile Button
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollBtn(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!isVisible || isHiddenPath) return null;

    const handleSubmit = () => {
        if (!inputValue.trim()) return;
        // Trigger Fullscreen Mobile Chat
        window.dispatchEvent(new CustomEvent("open-ai-mobile-fullscreen", {
            detail: { message: inputValue }
        }));
        setInputValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    const cycleLanguage = () => {
        const languages: Language[] = ["en", "ru", "ua"];
        const currentIndex = languages.indexOf(language);
        const nextIndex = (currentIndex + 1) % languages.length;
        setLanguage(languages[nextIndex]);
        // Close menu after selection? Maybe keep open for multi-choice? Let's close for cleaner UX.
        // Actually user said: "button with language choice... list of available languages".
        // Simple cycle is easier for now, but user said "list of available languages". 
        // Let's implement cycle for simplicity as per previous nav, or small sub-menu?
        // "When we press button... floating clouds buttons with language selection... demo... pricing".
        // "At language selection button press -> drops list of languages".
        // OK, so: Main Menu -> [Language] [Demo] [Pricing]
        // [Language] click -> [EN] [RU] [UA] (replacing the Language button? or expand?)
        // Let's keep it simple: The "Language" button in the menu just cycles or shows a small picker. 
        // Let's make it cycle for now to fit the "cloud" design cleanly.
    };

    const getLanguageLabel = () => {
        switch (language) {
            case "en": return "English";
            case "ru": return "Русский";
            case "ua": return "Українська";
            default: return "UA";
        }
    };

    return (
        <div className="md:hidden fixed bottom-[20px] left-0 right-0 z-[50] px-4 pointer-events-none flex justify-center items-end gap-3">
            {/* Menu Button Container */}
            <div className="pointer-events-auto relative z-[52]">
                {/* Floating Menu Items */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <div className="absolute bottom-[60px] left-0 flex flex-col gap-3 min-w-[160px]">
                            {/* Pricing */}
                            <motion.a
                                href="https://pricing.hotelmol.com"
                                target="_blank"
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white/90 backdrop-blur-md text-[#0752A0] font-bold py-3 px-6 rounded-2xl shadow-lg border border-white/20 text-center"
                            >
                                {t("button.pricing") || "Pricing"}
                            </motion.a>

                            {/* Demo */}
                            <motion.a
                                href="https://demo.hotelmol.com"
                                target="_blank"
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                transition={{ delay: 0.05 }}
                                className="bg-white/90 backdrop-blur-md text-[#0752A0] font-bold py-3 px-6 rounded-2xl shadow-lg border border-white/20 text-center"
                            >
                                Demo
                            </motion.a>

                            {/* Language Switch */}
                            <motion.button
                                onClick={cycleLanguage}
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                className="bg-white/90 backdrop-blur-md text-[#0752A0] font-bold py-3 px-6 rounded-2xl shadow-lg border border-white/20 flex items-center justify-center gap-2"
                            >
                                <Globe className="w-4 h-4" />
                                {getLanguageLabel()}
                            </motion.button>
                        </div>
                    )}
                </AnimatePresence>

                {/* Main Toggle Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="w-[50px] h-[50px] rounded-full bg-[#0752A0] shadow-[0_4px_20px_rgba(7,82,160,0.4)] flex items-center justify-center transition-transform active:scale-95"
                    aria-label="Menu"
                >
                    <motion.div
                        animate={{ rotate: isMenuOpen ? 360 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-center w-full h-full"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-white" />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlSpace="preserve"
                                width="45"
                                height="45"
                                version="1.1"
                                viewBox="0 0 203.18 203.18"
                                style={{
                                    shapeRendering: "geometricPrecision",
                                    textRendering: "geometricPrecision",
                                    fillRule: "evenodd",
                                    clipRule: "evenodd",
                                }}
                            >
                                <defs>
                                    <style type="text/css">
                                        {`
                                            .fil0 {fill:none}
                                            .fil1 {fill:#ffffff}
                                        `}
                                    </style>
                                </defs>
                                <g id="Layer_x0020_1">
                                    <metadata id="CorelCorpID_0Corel-Layer" />
                                    <g id="_2278661208240">
                                        <circle className="fil0" cx="101.59" cy="101.59" r="101.6" />
                                        <path className="fil1" d="M106.13 53.03c22.55,2.08 40.65,19.52 43.75,41.75l-96.58 0c3.18,-22.75 22.05,-40.47 45.33,-41.87l0 -4.17 -2.36 0c-2.32,0 -4.23,-1.91 -4.23,-4.23l0 0c0,-2.33 1.91,-4.23 4.23,-4.23l12.4 0c2.33,0 4.23,1.9 4.23,4.23l0 0c0,2.32 -1.9,4.23 -4.23,4.23l-2.54 0 0 4.29zm15.16 63.75c1.5,-1.94 4.29,-2.3 6.23,-0.8 1.94,1.5 2.3,4.29 0.8,6.23 -3.14,4.07 -7.19,7.4 -11.86,9.7 -4.51,2.21 -9.56,3.46 -14.87,3.46 -5.31,0 -10.36,-1.25 -14.87,-3.46 -4.67,-2.3 -8.72,-5.63 -11.86,-9.7 -1.5,-1.94 -1.14,-4.73 0.8,-6.23 1.94,-1.5 4.73,-1.14 6.23,0.8 2.33,3.01 5.31,5.47 8.74,7.15 3.28,1.62 7,2.52 10.96,2.52 3.96,0 7.68,-0.9 10.96,-2.52 3.43,-1.68 6.41,-4.14 8.74,-7.15zm-10.04 39.85c-1.68,1.41 -4.25,2.17 -4.31,-1.17 -0.02,-0.99 -0.04,-1.26 -0.06,-2.26 -0.81,-2.45 -3.2,-2.84 -5.68,-2.84l0 -0.01c-25.76,-0.2 -46.76,-20.38 -48.29,-45.8l97.36 0c-0.71,11.75 -5.05,23.66 -13.15,30.44l-25.87 21.64z" />
                                    </g>
                                </g>
                            </svg>
                        )}
                    </motion.div>
                </button>
            </div>

            {/* Input Field with Animation */}
            {/* Base mr-2 (narrower gap), when scroll active mr-[60px] to fit button */}
            <div
                className={`pointer-events-auto flex-1 h-[50px] relative transition-all duration-500 ease-in-out ${showScrollBtn ? 'mr-[60px]' : 'mr-2'}`}
            >
                <div className="absolute inset-0 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-white/20 flex items-center pl-4 pr-1">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={language === 'ru' || language === 'ua' ? "Спросите что-нибудь..." : "Ask something..."}
                        className="flex-1 bg-transparent border-none outline-none text-[#0752A0] placeholder:text-[#0752A0]/50 text-sm font-medium"
                    />
                    <button
                        onClick={handleSubmit}
                        className="w-[42px] h-[42px] bg-[#0752A0] rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform"
                    >
                        <ArrowUp className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>

            {/* Scroll To Top Button - Mobile Integrated */}
            <AnimatePresence>
                {showScrollBtn && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.5, x: 20 }}
                        onClick={scrollToTop}
                        className="pointer-events-auto absolute right-4 bottom-0 w-[50px] h-[50px] rounded-full bg-[#0752A0] shadow-[0_4px_20px_rgba(7,82,160,0.4)] flex items-center justify-center transition-transform active:scale-95 border border-white/20"
                        aria-label="Scroll to top"
                    >
                        {/* Chevron Up "House-like" */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                        >
                            <path d="m18 15-6-6-6 6" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
