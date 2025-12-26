"use client";

import Link from "next/link";
import { Home, Mail, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/TranslationContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title={t("notFound.title")}
                description="Page not found."
                noindex={true}
            />
            <Header />

            <section className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="font-serif text-9xl font-bold text-primary mb-4">{t("notFound.error")}</h1>
                        <h2 className="font-serif text-4xl font-semibold mb-4">{t("notFound.title")}</h2>
                        <p className="text-xl text-muted-foreground mb-8">{t("notFound.message")}</p>

                        <Card className="p-8 mb-8">
                            <p className="text-lg font-medium mb-6">{t("notFound.suggestion")}</p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Link href="/"><Button size="lg"><Home className="w-5 h-5 mr-2" />{t("notFound.home")}</Button></Link>
                                <Link href="/contact"><Button variant="outline" size="lg"><Mail className="w-5 h-5 mr-2" />{t("notFound.contact")}</Button></Link>
                                <Link href="/solutions"><Button variant="outline" size="lg"><Search className="w-5 h-5 mr-2" />{t("notFound.solutions")}</Button></Link>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
