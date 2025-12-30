"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/TranslationContext";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DemoRequestModal from "./DemoRequestModal";

export default function StickyMobileCTA() {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const [demoModalOpen, setDemoModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 600px (approx height of Hero on mobile)
            if (window.scrollY > 600) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t z-40 md:hidden"
                    >
                        <Button
                            size="lg"
                            className="w-full shadow-lg"
                            onClick={() => setDemoModalOpen(true)}
                        >
                            {t("button.requestDemo")}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <DemoRequestModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
        </>
    );
}
