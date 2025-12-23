import { MessageSquare, Brain, Sparkles, TrendingUp, CheckCircle } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";
import { useEffect, useState } from "react";

export default function HowRoomieWorks() {
  const { t } = useTranslation();
  const [ballPosition, setBallPosition] = useState(0);

  const steps = [
    {
      icon: MessageSquare,
      title: t("home.howWorks.step1.title"),
      description: t("home.howWorks.step1.description"),
    },
    {
      icon: Brain,
      title: t("home.howWorks.step2.title"),
      description: t("home.howWorks.step2.description"),
    },
    {
      icon: Sparkles,
      title: t("home.howWorks.step3.title"),
      description: t("home.howWorks.step3.description"),
    },
    {
      icon: TrendingUp,
      title: t("home.howWorks.step4.title"),
      description: t("home.howWorks.step4.description"),
    },
    {
      icon: CheckCircle,
      title: t("home.howWorks.step5.title"),
      description: t("home.howWorks.step5.description"),
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setBallPosition((prev) => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 lg:py-40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            {t("home.howWorks.badge")}
          </div>
          <h2 className="font-serif text-[2.5625rem] sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            {t("home.howWorks.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("home.howWorks.subtitle")}
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="hidden lg:block absolute top-32 left-16 right-16 h-0.5">
            <div className="h-full bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
            <div 
              data-testid="animated-ball"
              data-position={ballPosition}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_rgba(7,82,160,0.8)] transition-all duration-1000 ease-in-out"
              style={{
                left: `${ballPosition * 25}%`,
                boxShadow: '0 0 20px rgba(7, 82, 160, 0.8), 0 0 40px rgba(7, 82, 160, 0.5), 0 0 60px rgba(7, 82, 160, 0.3)'
              }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = ballPosition === index;
              return (
                <div key={index} className="relative flex flex-col items-center text-center group">
                  <div className={`relative z-10 mb-6 lg:mb-12 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl group-hover:shadow-2xl transition-all duration-500 ${isActive ? 'scale-110 shadow-2xl' : 'group-hover:scale-110'}`}>
                    <Icon className="h-9 w-9" />
                    <div className={`absolute inset-0 rounded-2xl bg-primary/20 blur-xl transition-all duration-500 ${isActive ? 'bg-primary/40' : 'group-hover:bg-primary/30'}`} />
                  </div>
                  <div className="space-y-4 mt-2 lg:mt-8">
                    <div className={`text-sm font-bold transition-colors duration-500 ${isActive ? 'text-primary' : 'text-primary/60'}`}>{t("home.howWorks.step")} {index + 1}</div>
                    <h3 className="font-semibold text-lg lg:text-xl">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
