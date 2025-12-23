import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";

export default function PresentationSection() {
  const { t } = useTranslation();

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="px-8 py-4 rounded-2xl blue-shimmer-block">
            <h2 className="font-sans text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              {t("presentation.title")}
            </h2>
          </div>
          
          <Button 
            size="lg"
            asChild
            className="shadow-lg shadow-primary/30"
            data-testid="button-download-presentation"
          >
            <a 
              href="/roomie-presentation.pdf" 
              download="Roomie-Presentation.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 h-5 w-5" />
              {t("presentation.download")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
