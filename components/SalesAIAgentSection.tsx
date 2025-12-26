"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/lib/TranslationContext";
import { ShoppingCart, Zap, TrendingUp } from "lucide-react";

export default function SalesAIAgentSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-background"
      data-testid="section-sales-ai-agent"
    >
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 variants={itemVariants} className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("home.salesAgent.title")}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("home.salesAgent.description")}
          </motion.p>
        </div>

        {/* Main Layout */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Agent Info Cards */}
          <motion.div variants={itemVariants} className="space-y-4">
            {/* Feature 1 */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover-elevate">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{t("home.salesAgent.feature1.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("home.salesAgent.feature1.description")}</p>
                </div>
              </div>
            </Card>

            {/* Feature 2 */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover-elevate">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{t("home.salesAgent.feature2.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("home.salesAgent.feature2.description")}</p>
                </div>
              </div>
            </Card>

            {/* Feature 3 */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover-elevate">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{t("home.salesAgent.feature3.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("home.salesAgent.feature3.description")}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right: Agent Visualization with Floating Info Clouds */}
          <motion.div variants={itemVariants} className="relative h-[400px] lg:h-[500px] flex items-center justify-center">
            {/* Central Agent Card */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Card className="w-40 h-40 rounded-3xl bg-gradient-to-br from-primary to-primary/80 shadow-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <ShoppingCart className="h-16 w-16 mx-auto mb-2 text-primary-foreground" />
                  <p className="font-semibold text-sm">{t("home.salesAgent.agent")}</p>
                </div>
              </Card>
            </div>

            {/* Floating Info Clouds */}
            {/* Cloud 1 - Top Left */}
            <motion.div
              className="absolute top-0 left-0 max-w-xs"
              variants={floatingVariants}
              animate={
                !prefersReducedMotion && isInView
                  ? {
                      y: [0, -10, 0],
                      x: [0, -8, 0],
                    }
                  : {}
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Card className="p-4 bg-white dark:bg-slate-900 shadow-lg border border-primary/20">
                <p className="text-xs font-semibold text-primary mb-1">{t("home.salesAgent.cloud1.label")}</p>
                <p className="text-sm text-foreground">{t("home.salesAgent.cloud1.text")}</p>
              </Card>
            </motion.div>

            {/* Cloud 2 - Top Right */}
            <motion.div
              className="absolute top-8 right-0 max-w-xs"
              variants={floatingVariants}
              animate={
                !prefersReducedMotion && isInView
                  ? {
                      y: [0, 12, 0],
                      x: [0, 10, 0],
                    }
                  : {}
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <Card className="p-4 bg-white dark:bg-slate-900 shadow-lg border border-primary/20">
                <p className="text-xs font-semibold text-primary mb-1">{t("home.salesAgent.cloud2.label")}</p>
                <p className="text-sm text-foreground">{t("home.salesAgent.cloud2.text")}</p>
              </Card>
            </motion.div>

            {/* Cloud 3 - Bottom Left */}
            <motion.div
              className="absolute bottom-0 left-4 max-w-xs"
              variants={floatingVariants}
              animate={
                !prefersReducedMotion && isInView
                  ? {
                      y: [0, 15, 0],
                      x: [0, -12, 0],
                    }
                  : {}
              }
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <Card className="p-4 bg-white dark:bg-slate-900 shadow-lg border border-primary/20">
                <p className="text-xs font-semibold text-primary mb-1">{t("home.salesAgent.cloud3.label")}</p>
                <p className="text-sm text-foreground">{t("home.salesAgent.cloud3.text")}</p>
              </Card>
            </motion.div>

            {/* Cloud 4 - Bottom Right */}
            <motion.div
              className="absolute bottom-8 right-4 max-w-xs"
              variants={floatingVariants}
              animate={
                !prefersReducedMotion && isInView
                  ? {
                      y: [0, -12, 0],
                      x: [0, 8, 0],
                    }
                  : {}
              }
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            >
              <Card className="p-4 bg-white dark:bg-slate-900 shadow-lg border border-primary/20">
                <p className="text-xs font-semibold text-primary mb-1">{t("home.salesAgent.cloud4.label")}</p>
                <p className="text-sm text-foreground">{t("home.salesAgent.cloud4.text")}</p>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Info */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            {t("home.salesAgent.subtitle")}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
