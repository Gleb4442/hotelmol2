import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { SiTelegram, SiWordpress, SiInstagram, SiWhatsapp, SiWix } from "react-icons/si";
import { useTranslation } from "@/lib/TranslationContext";
import tildaLogo from "@assets/image_1760225370940.png";
import servioLogo from "@assets/image_1760225380507.png";
import mewsLogo from "@assets/mews-logo.png";
import protelLogo from "@assets/protel-logo.png";
import messengerLogo from "@assets/messenger-logo.png";
import cloudbedsLogo from "@assets/cloudbeds-logo.png";
import exelyLogo from "@assets/image_1764952906072.png";
import easymsLogo from "@assets/image_1764952914052.png";

const allIntegrations = [
  { name: "Telegram", icon: SiTelegram, color: "#0088cc", comingSoon: false, hideOnDesktop: false },
  { name: "Servio", icon: () => (
    <img src={servioLogo} alt="Servio" className="w-10 h-10 object-contain" />
  ), color: "#2563eb", comingSoon: false, hideOnDesktop: false },
  { name: "Tilda", icon: () => (
    <img src={tildaLogo} alt="Tilda" className="w-10 h-10 object-contain" />
  ), color: "#ff6347", comingSoon: false, hideOnDesktop: true },
  { name: "WordPress", icon: SiWordpress, color: "#21759b", comingSoon: false, hideOnDesktop: true },
  { name: "Wix", icon: SiWix, color: "#0c6ebd", comingSoon: false, hideOnDesktop: true },
  { name: "Messenger", icon: () => (
    <img src={messengerLogo} alt="Messenger" className="w-10 h-10 object-contain" />
  ), color: "#0084FF", comingSoon: false, hideOnDesktop: false },
  { name: "Protel", icon: () => (
    <img src={protelLogo} alt="Protel" className="w-10 h-10 object-contain" />
  ), color: "#E63946", comingSoon: false, hideOnDesktop: false },
  { name: "Exely", icon: () => (
    <img src={exelyLogo} alt="Exely" className="w-10 h-10 object-contain" />
  ), color: "#7C3AED", comingSoon: true, hideOnDesktop: false },
  { name: "EasyMS", icon: () => (
    <img src={easymsLogo} alt="EasyMS" className="w-10 h-10 object-contain" />
  ), color: "#2563eb", comingSoon: true, hideOnDesktop: false },
  { name: "Mews", icon: () => (
    <img src={mewsLogo} alt="Mews" className="w-10 h-10 object-contain" />
  ), color: "#FFFFFF", comingSoon: true, hideOnDesktop: true },
  { name: "Cloudbeds", icon: () => (
    <img src={cloudbedsLogo} alt="Cloudbeds" className="w-10 h-10 object-contain" />
  ), color: "#4F6FED", comingSoon: true, hideOnDesktop: true },
  { name: "WhatsApp", icon: SiWhatsapp, color: "#25d366", comingSoon: true, hideOnDesktop: false },
  { name: "Instagram", icon: SiInstagram, color: "#e4405f", comingSoon: true, hideOnDesktop: false },
];

const desktopIntegrations = allIntegrations.filter(i => !i.hideOnDesktop);
const row1Integrations = allIntegrations.slice(0, 7);
const row2Integrations = allIntegrations.slice(7);

function IntegrationItem({ integration, compact = false }: { integration: typeof allIntegrations[0]; compact?: boolean }) {
  const Icon = integration.icon;
  return (
    <div
      className={`flex flex-col items-center gap-2 md:gap-3 group ${compact ? 'min-w-[90px]' : 'min-w-[100px] md:min-w-[120px]'}`}
      role="listitem"
    >
      <div className="relative p-3 md:p-4 rounded-xl bg-background border border-border/50 group-hover:border-primary/30 transition-colors overflow-visible">
        <Icon 
          className="h-8 w-8 md:h-10 md:w-10 transition-colors" 
          style={{ color: integration.color }}
          aria-label={integration.name}
        />
        {integration.comingSoon && (
          <Badge 
            variant="secondary" 
            className="absolute -bottom-1 -right-1 text-[8px] md:text-[10px] px-1 md:px-1.5 py-0.5 bg-primary text-primary-foreground border-0 font-semibold shadow-sm"
            aria-label="Coming soon"
          >
            Soon
          </Badge>
        )}
      </div>
      <span className="text-xs md:text-sm text-muted-foreground font-medium">{integration.name}</span>
    </div>
  );
}

export default function IntegrationTicker() {
  const { t } = useTranslation();
  const mobileRow1Ref = useRef<HTMLDivElement>(null);
  const mobileRow2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = mobileRow1Ref.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 25);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scrollContainer = mobileRow2Ref.current;
    if (!scrollContainer) return;

    scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2;

    const scroll = () => {
      if (scrollContainer.scrollLeft <= 0) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2;
      } else {
        scrollContainer.scrollLeft -= 1;
      }
    };

    const interval = setInterval(scroll, 25);
    return () => clearInterval(interval);
  }, []);

  const allRow1 = [...row1Integrations, ...row1Integrations, ...row1Integrations];
  const allRow2 = [...row2Integrations, ...row2Integrations, ...row2Integrations];

  return (
    <section className="py-12 md:py-16 border-y bg-sidebar/30">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-sm font-semibold text-primary mb-8 md:mb-10 uppercase tracking-wider">
          {t("home.integrations.title")}
        </h3>
        
        {/* Desktop: static centered grid without animation */}
        <div 
          className="hidden md:flex flex-wrap justify-center gap-8"
          role="list"
          aria-label="Integration partners"
        >
          {desktopIntegrations.map((integration, index) => (
            <IntegrationItem key={`desktop-${integration.name}-${index}`} integration={integration} />
          ))}
        </div>

        {/* Mobile: two rows moving in opposite directions */}
        <div className="md:hidden space-y-4">
          <div 
            ref={mobileRow1Ref}
            className="flex gap-4 overflow-hidden"
            role="list"
            aria-label="Integration partners row 1"
          >
            {allRow1.map((integration, index) => (
              <IntegrationItem key={`row1-${integration.name}-${index}`} integration={integration} compact />
            ))}
          </div>
          <div 
            ref={mobileRow2Ref}
            className="flex gap-4 overflow-hidden"
            role="list"
            aria-label="Integration partners row 2"
          >
            {allRow2.map((integration, index) => (
              <IntegrationItem key={`row2-${integration.name}-${index}`} integration={integration} compact />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
