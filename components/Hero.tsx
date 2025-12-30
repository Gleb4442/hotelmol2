"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";
import DemoRequestModal from "./DemoRequestModal";

export default function Hero() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <section className="relative min-h-[600px] sm:min-h-[800px] lg:min-h-[calc(85vh+100px)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />

        <div className="relative z-10 container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="font-serif text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter sm:tracking-tight text-white mb-6 leading-tight pl-[3px] sm:pl-0" style={{ marginLeft: "-8px" }}>
              <span className="inline-block ml-[-7px] sm:ml-[-10px]">
                {t("home.hero.title")}
              </span>
              <br />
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {t("home.hero.titleAccent")}
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/95 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              {t("home.hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="text-base px-8 h-14 bg-white text-primary hover:bg-white/90 shadow-xl"
                onClick={() => setDemoModalOpen(true)}
                data-testid="button-request-demo"
              >
                {t("button.requestDemo")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-base px-8 h-14 backdrop-blur-md bg-white/5 border border-white/20 text-white hover:bg-white/10"
                asChild
                data-testid="button-watch-demo"
              >
                <a href="https://demo.hotelmol.com/" target="_blank" rel="noopener noreferrer">
                  <Play className="mr-2 h-5 w-5" />
                  {t("home.hero.watchDemo")}
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <DemoRequestModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </>
  );
}
