"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, MessageSquare, Brain, Zap, Shield, BarChart3, Globe2, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoRequestModal from "@/components/DemoRequestModal";
import SalesAIAgentSection from "@/components/SalesAIAgentSection";
import { useTranslation } from "@/lib/TranslationContext";
import SEO, { productSchema } from "@/components/SEO";

export default function Roomie() {
    const { t } = useTranslation();
    const [demoModalOpen, setDemoModalOpen] = useState(false);

    const features = [
        { icon: <MessageSquare className="w-6 h-6 text-primary" />, title: t("roomie.features.conversations.title"), description: t("roomie.features.conversations.description") },
        { icon: <Brain className="w-6 h-6 text-primary" />, title: t("roomie.features.intelligence.title"), description: t("roomie.features.intelligence.description") },
        { icon: <Zap className="w-6 h-6 text-primary" />, title: t("roomie.features.response.title"), description: t("roomie.features.response.description") },
        { icon: <Shield className="w-6 h-6 text-primary" />, title: t("roomie.features.security.title"), description: t("roomie.features.security.description") },
        { icon: <BarChart3 className="w-6 h-6 text-primary" />, title: t("roomie.features.revenue.title"), description: t("roomie.features.revenue.description") },
        { icon: <Globe2 className="w-6 h-6 text-primary" />, title: t("roomie.features.omnichannel.title"), description: t("roomie.features.omnichannel.description") },
    ];

    const capabilities = [
        t("roomie.capabilities.1"), t("roomie.capabilities.2"), t("roomie.capabilities.3"), t("roomie.capabilities.4"),
        t("roomie.capabilities.5"), t("roomie.capabilities.6"), t("roomie.capabilities.7"), t("roomie.capabilities.8"),
    ];

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Roomie - AI Hotel Assistant - Hotelmol"
                description="Meet Roomie, the AI-powered assistant that automates hotel guest communication."
                structuredData={productSchema}
            />
            <Header />

            <section className="relative pt-36 pb-20 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16 mt-[25px]">
                        <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-2">{t("roomie.title")}</h1>
                        <p className="text-2xl text-foreground mb-6">{t("roomie.titleTagline")}</p>
                        <p className="text-xl text-muted-foreground leading-relaxed">{t("roomie.subtitle")}</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <div>
                            <h2 className="font-serif text-3xl font-semibold mb-6">{t("roomie.whyWorks.title")}</h2>
                            <p className="text-lg text-muted-foreground mb-8">{t("roomie.whyWorks.description")}</p>
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-medium mb-1">{t(`roomie.whyWorks.point${i}.title` as any)}</h3>
                                            <p className="text-sm text-muted-foreground">{t(`roomie.whyWorks.point${i}.description` as any)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button size="lg" className="mt-8" onClick={() => setDemoModalOpen(true)}>
                                {t("button.requestDemo")} <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                        <img src="/assets/Gemini_Generated_Image_borpdeborpdeborp-Photoroom_1764493985974.png" alt="Roomie AI" className="w-full h-auto rounded-xl" />
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {features.map((f, i) => (
                            <Card key={i} className="p-6 hover-elevate">
                                <div className="mb-4">{f.icon}</div>
                                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                                <p className="text-muted-foreground">{f.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <SalesAIAgentSection />
            <Footer />
            <DemoRequestModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
        </div>
    );
}
