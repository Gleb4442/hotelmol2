import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    }, 4000); // 4 seconds cycle: ~2s movement + ~2s pause
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
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-primary z-20"
              animate={{
                left: `${ballPosition * 25}%`,
              }}
              transition={{
                duration: 2,
                ease: [0.4, 0, 0.2, 1] // Smooth customized cubic-bezier for a more "organic" feel
              }}
              style={{
                boxShadow: '0 0 20px rgba(7, 82, 160, 0.8), 0 0 40px rgba(7, 82, 160, 0.5), 0 0 60px rgba(7, 82, 160, 0.3)'
              }}
            >
              <div className="absolute inset-0 rounded-full animate-ping bg-primary/40" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = ballPosition === index;
              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    opacity: isActive ? 1 : 0.7
                  }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className={`relative z-10 mb-6 lg:mb-12 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl transition-all duration-700 ${isActive ? 'shadow-[0_20px_50px_rgba(7,82,160,0.4)] ring-4 ring-primary/20' : 'group-hover:shadow-2xl'}`}>
                    <Icon className={`h-9 w-9 transition-all duration-700 ${isActive ? 'scale-110' : ''}`} />
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1.2 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="space-y-4 mt-2 lg:mt-8 px-4">
                    <motion.div
                      animate={{ color: isActive ? "#0752A0" : "rgba(7, 82, 160, 0.6)" }}
                      className="text-sm font-bold"
                    >
                      {t("home.howWorks.step")} {index + 1}
                    </motion.div>
                    <h3 className="font-semibold text-lg lg:text-xl">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed transition-opacity duration-500">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
