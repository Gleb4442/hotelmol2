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
            <h1 className="font-serif text-5xl lg:text-6xl font-semibold tracking-tight mb-6" data-testid="text-page-title">
              {t("cookies.title")}
            </h1>
            <p className="text-lg text-muted-foreground mb-12" data-testid="text-last-updated">
              {t("cookies.lastUpdated")}
            </p>

            <Card className="p-8 mb-8">
              <p className="text-lg leading-relaxed" data-testid="text-intro">
                {t("cookies.intro")}
              </p>
            </Card>

            <div className="space-y-8">
              <Card className="p-8">
                <h2 className="font-serif text-2xl font-semibold mb-4" data-testid="text-section-1-title">{t("cookies.section1")}</h2>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-section-1-content">{t("cookies.section1.text")}</p>
              </Card>

              <Card className="p-8">
                <h2 className="font-serif text-2xl font-semibold mb-4" data-testid="text-section-2-title">{t("cookies.section2")}</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-section-2-essential">{t("cookies.section2.essential")}</p>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-section-2-functional">{t("cookies.section2.functional")}</p>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-section-2-analytics">{t("cookies.section2.analytics")}</p>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-section-2-marketing">{t("cookies.section2.marketing")}</p>
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="font-serif text-2xl font-semibold mb-4" data-testid="text-section-3-title">{t("cookies.section3")}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4" data-testid="text-section-3-intro">{t("cookies.section3.text")}</p>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  <li data-testid="text-section-3-item-1">{t("cookies.section3.item1")}</li>
                  <li data-testid="text-section-3-item-2">{t("cookies.section3.item2")}</li>
                  <li data-testid="text-section-3-item-3">{t("cookies.section3.item3")}</li>
                  <li data-testid="text-section-3-item-4">{t("cookies.section3.item4")}</li>
                </ul>
              </Card>

              <Card className="p-8">
                <h2 className="font-serif text-2xl font-semibold mb-4" data-testid="text-section-4-title">{t("cookies.section4")}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4" data-testid="text-section-4-intro">{t("cookies.section4.text")}</p>
                <div className="space-y-2 text-muted-foreground">
                  <p data-testid="text-section-4-chrome">{t("cookies.section4.chrome")}</p>
                  <p data-testid="text-section-4-firefox">{t("cookies.section4.firefox")}</p>
                  <p data-testid="text-section-4-safari">{t("cookies.section4.safari")}</p>
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="font-serif text-2xl font-semibold mb-4" data-testid="text-section-5-title">{t("cookies.section5")}</h2>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-section-5-content">{t("cookies.section5.text")}</p>
              </Card>

              <Card className="p-8">
                <h2 className="font-serif text-2xl font-semibold mb-4" data-testid="text-section-6-title">{t("cookies.section6")}</h2>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-section-6-content">{t("cookies.section6.text")}</p>
              </Card>

              <Card className="p-8">
                <p className="text-muted-foreground leading-relaxed" data-testid="text-contact">
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
