import { Link } from "wouter";
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
        description="Page not found. The page you are looking for does not exist."
        noindex={true}
      />
      <Header />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="font-serif text-9xl font-bold text-primary mb-4" data-testid="text-error-code">
                {t("notFound.error")}
              </h1>
              <h2 className="font-serif text-4xl font-semibold mb-4" data-testid="text-error-title">
                {t("notFound.title")}
              </h2>
              <p className="text-xl text-muted-foreground mb-8" data-testid="text-error-message">
                {t("notFound.message")}
              </p>
            </div>

            <Card className="p-8 mb-8">
              <p className="text-lg font-medium mb-6" data-testid="text-suggestions-title">
                {t("notFound.suggestion")}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/">
                  <Button size="lg" data-testid="button-home">
                    <Home className="w-5 h-5 mr-2" />
                    {t("notFound.home")}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" data-testid="button-contact">
                    <Mail className="w-5 h-5 mr-2" />
                    {t("notFound.contact")}
                  </Button>
                </Link>
                <Link href="/solutions">
                  <Button variant="outline" size="lg" data-testid="button-solutions">
                    <Search className="w-5 h-5 mr-2" />
                    {t("notFound.solutions")}
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
