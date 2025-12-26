"use client";

import { Card } from "@/components/ui/card";
import { useTranslation } from "@/lib/TranslationContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function CookiePolicy() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title={t("cookies.title")}
                description="Learn about how hotelmol uses cookies and tracking technologies to improve your experience on our platform."
            />
            <Header />

            <section className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="font-serif text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
                            {t("cookies.title")}
                        </h1>
                        <p className="text-lg text-muted-foreground mb-12">
                            {t("cookies.lastUpdated")}
                        </p>

                        <Card className="p-8 mb-8">
                            <p className="text-lg leading-relaxed">
                                {t("cookies.intro")}
                            </p>
                        </Card>

                        <div className="space-y-8">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <Card key={i} className="p-8">
                                    <h2 className="font-serif text-2xl font-semibold mb-4">{t(`cookies.section${i}` as any)}</h2>
                                    <p className="text-muted-foreground leading-relaxed">{t(`cookies.section${i}.text` as any)}</p>
                                </Card>
                            ))}

                            <Card className="p-8">
                                <p className="text-muted-foreground leading-relaxed">
                                    {t("cookies.contact")}
                                </p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
