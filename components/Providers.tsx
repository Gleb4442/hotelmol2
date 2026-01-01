"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TranslationProvider } from "@/lib/TranslationContext";
import { CookieBannerProvider } from "@/lib/CookieBannerContext";
import { Toaster } from "@/components/ui/toaster";
import CookieBanner from "@/components/CookieBanner";
import MobileBottomNav from "@/components/MobileBottomNav";
import ScrollToTop from "@/components/ScrollToTop";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CookieBannerProvider>
            <QueryClientProvider client={queryClient}>
                <TranslationProvider>
                    <TooltipProvider>
                        {children}
                        <Toaster />
                        <CookieBanner />
                        <MobileBottomNav />
                        <ScrollToTop />
                    </TooltipProvider>
                </TranslationProvider>
            </QueryClientProvider>
        </CookieBannerProvider>
    );
}
