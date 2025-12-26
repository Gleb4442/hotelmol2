"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import SEO, { organizationSchema } from "@/components/SEO";
import { useTranslation } from "@/lib/TranslationContext";
import IntegrationRequestModal from "@/components/IntegrationRequestModal";
import Image from "next/image";

export default function About() {
    const { t } = useTranslation();
    const [integrationModalOpen, setIntegrationModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title={t("about.seo.title")}
                description={t("about.seo.description")}
                structuredData={organizationSchema}
            />
            <Header />

            <section className="relative bg-white py-40 md:py-48 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                            {t("about.hero.title")}{" "}
                            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #0752A0, #0752A0)" }}>
                                {t("about.hero.titleAccent")}
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                            {t("about.hero.subtitle")}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-9 justify-center items-center">
                            <Button
                                size="lg"
                                className="text-white px-8 text-lg"
                                style={{ backgroundColor: "#0752A0" }}
                                onClick={() => setIntegrationModalOpen(true)}
                            >
                                {t("about.hero.button.integration")}
                            </Button>
                            <Link href="/roomie">
                                <button className="text-slate-600 hover:text-slate-900 transition-colors text-lg font-medium">
                                    {t("about.hero.button.meetRoomie")}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 md:pb-12" style={{ backgroundColor: "#f8fafc" }}>
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <span className="text-lg font-semibold uppercase tracking-widest mb-4 block" style={{ color: "#0752A0" }}>
                            {t("about.dna.label")}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                            {t("about.dna.title")}
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-6">
                            {t("about.dna.description1")}
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            {t("about.dna.description2")}
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-24" style={{ backgroundColor: "#20629B" }}>
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <div className="flex justify-center lg:justify-start">
                            <div className="w-full max-w-[320px]">
                                <img
                                    src="/assets/IMG_7965_optimized.jpg"
                                    alt="Roomie - AI Assistant"
                                    className="w-full h-auto rounded-2xl"
                                    style={{
                                        boxShadow: "0 0 40px rgba(115, 189, 255, 0.6), 0 0 80px rgba(7, 82, 160, 0.4), inset 0 0 30px rgba(115, 189, 255, 0.2)"
                                    }}
                                />
                            </div>
                        </div>

                        <div className="text-center lg:text-left px-2">
                            <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                                <Bot className="w-8 h-8 text-white" />
                                <h3 className="text-3xl font-bold text-white">Roomie</h3>
                            </div>
                            <p className="text-base md:text-lg mb-6" style={{ color: "rgba(255, 255, 255, 0.8)" }}>{t("about.mascot.subtitle")}</p>
                            <blockquote className="text-base md:text-lg lg:text-[21.6px] text-slate-300 leading-relaxed italic border-l-4 border-white pl-4 md:pl-6 break-words">
                                "{t("about.mascot.quote")}"
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <IntegrationRequestModal open={integrationModalOpen} onOpenChange={setIntegrationModalOpen} />
        </div>
    );
}
