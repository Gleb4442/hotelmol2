import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, MessageSquare, Brain, Zap, Shield, BarChart3, Clock, Globe2, ArrowRight } from "lucide-react";
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
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: t("roomie.features.conversations.title"),
      description: t("roomie.features.conversations.description")
    },
    {
      icon: <Brain className="w-6 h-6 text-primary" />,
      title: t("roomie.features.intelligence.title"),
      description: t("roomie.features.intelligence.description")
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: t("roomie.features.response.title"),
      description: t("roomie.features.response.description")
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: t("roomie.features.security.title"),
      description: t("roomie.features.security.description")
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
      title: t("roomie.features.revenue.title"),
      description: t("roomie.features.revenue.description")
    },
    {
      icon: <Globe2 className="w-6 h-6 text-primary" />,
      title: t("roomie.features.omnichannel.title"),
      description: t("roomie.features.omnichannel.description")
    },
  ];

  const capabilities = [
    t("roomie.capabilities.1"),
    t("roomie.capabilities.2"),
    t("roomie.capabilities.3"),
    t("roomie.capabilities.4"),
    t("roomie.capabilities.5"),
    t("roomie.capabilities.6"),
    t("roomie.capabilities.7"),
    t("roomie.capabilities.8"),
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Roomie - AI Hotel Assistant"
        description="Meet Roomie, the AI-powered assistant that automates hotel guest communication, handles requests instantly, and speaks 100+ languages naturally."
        structuredData={productSchema}
      />
      <Header />
      
      <section className="relative pt-36 pb-20 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16 mt-[25px]">
            <h1 className="font-rounded text-5xl lg:text-6xl font-bold tracking-tight mb-2 text-black dark:text-white">
              {t("roomie.title")}
            </h1>
            <p className="text-2xl text-foreground mb-6">
              {t("roomie.titleTagline")}
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("roomie.subtitle")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="font-serif text-3xl font-semibold mb-6">{t("roomie.whyWorks.title")}</h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t("roomie.whyWorks.description")}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">{t("roomie.whyWorks.point1.title")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t("roomie.whyWorks.point1.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">{t("roomie.whyWorks.point2.title")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t("roomie.whyWorks.point2.description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">{t("roomie.whyWorks.point3.title")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t("roomie.whyWorks.point3.description")}
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="mt-8"
                onClick={() => setDemoModalOpen(true)}
                data-testid="button-request-demo-product"
              >
                {t("button.requestDemo")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <img 
              src={new URL("@assets/Gemini_Generated_Image_borpdeborpdeborp-Photoroom_1764493985974.png", import.meta.url).href}
              alt="Roomie AI Assistant" 
              className="w-full h-auto rounded-xl"
              data-testid="img-roomie-assistant"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-semibold mb-4">{t("roomie.features.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("roomie.features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover-elevate">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="neon-border-wrapper relative">
              <Card className="p-12 bg-gradient-to-br from-background to-muted/50 relative z-10">
                <h2 className="font-serif text-4xl font-semibold mb-8">{t("roomie.capabilities.title")}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {capabilities.map((capability, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-base text-foreground">{capability}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <style>{`
              .neon-border-wrapper {
                padding: 0;
              }

              .neon-border-wrapper::after {
                content: '';
                position: absolute;
                inset: 0;
                border-radius: 0.5625rem;
                background: radial-gradient(circle at center, hsl(207, 83%, 52%) 0%, hsl(207, 83%, 32%) 100%);
                animation: neonPulse 2s ease-in-out infinite;
                opacity: 0.3;
                filter: blur(12px);
                z-index: 0;
              }

              @keyframes neonPulse {
                0% {
                  opacity: 0.15;
                  transform: scale(0.98);
                }
                50% {
                  opacity: 0.5;
                  transform: scale(1.02);
                }
                100% {
                  opacity: 0.15;
                  transform: scale(0.98);
                }
              }
            `}</style>
          </div>
        </div>
      </section>

      <SalesAIAgentSection />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl font-semibold mb-6">{t("roomie.cta.title")}</h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("roomie.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => setDemoModalOpen(true)}
                data-testid="button-request-demo-bottom"
              >
                {t("button.requestDemo")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                asChild
                data-testid="button-see-pricing"
              >
                <a href="https://pricing.hotelmol.com/#yearly" target="_blank" rel="noopener noreferrer">
                  {t("roomie.cta.seePricing")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <DemoRequestModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </div>
  );
}
