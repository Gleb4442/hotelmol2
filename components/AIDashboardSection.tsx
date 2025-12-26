"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/TranslationContext";
import { Calendar, Star, DollarSign, TrendingUp } from "lucide-react";

export default function AIDashboardSection() {
  const { t } = useTranslation();

  return (
    <section
      className="py-20 lg:py-28 bg-background"
      data-testid="section-ai-dashboard"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("home.aiDashboard.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("home.aiDashboard.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <BookingsWidget />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <UpsellsWidget />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 lg:col-span-1"
          >
            <ReviewsWidget />
          </motion.div>
        </div>

        <motion.p 
          className="text-center text-sm text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {t("home.aiDashboard.subtitle")}
        </motion.p>
      </div>
    </section>
  );
}

function useCountAnimation(targetValue: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const hasStarted = useRef(false);

  const startAnimation = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    animationRef.current = animate(0, targetValue, {
      duration: duration / 1000,
      ease: "easeOut",
      onUpdate: (latest) => setCount(Math.round(latest)),
    });
  }, [targetValue, duration]);

  useEffect(() => {
    return () => {
      animationRef.current?.stop();
    };
  }, []);

  return { count, startAnimation };
}

function BookingsWidget() {
  const { t } = useTranslation();
  const widgetRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(widgetRef, { once: true, amount: 0.3 });
  const { count: displayCount, startAnimation } = useCountAnimation(86, 2000);
  
  const monthlyData = [
    { month: "Jan", height: 52 },
    { month: "Feb", height: 60 },
    { month: "Mar", height: 71 },
    { month: "Apr", height: 67 },
    { month: "May", height: 84 },
    { month: "Jun", height: 100 },
  ];

  useEffect(() => {
    if (isInView) {
      startAnimation();
    }
  }, [isInView, startAnimation]);

  return (
    <Card ref={widgetRef} className="h-full flex flex-col p-6 bg-card border" data-testid="widget-bookings">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <Calendar className="h-5 w-5 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{t("home.aiDashboard.bookings.title")}</h3>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="text-center mb-6">
          <span className="text-5xl font-bold text-primary" data-testid="bookings-count">
            {displayCount}
          </span>
          <p className="text-sm text-muted-foreground mt-1">{t("home.aiDashboard.bookings.thisMonth")}</p>
        </div>
        
        <div className="flex items-end justify-between gap-2 h-28 mt-auto">
          {monthlyData.map((data, index) => (
            <div key={data.month} className="flex flex-col items-center flex-1">
              <div className="w-full flex flex-col justify-end h-20">
                <motion.div
                  className="w-full bg-primary rounded-t-sm"
                  initial={{ height: 0 }}
                  animate={isInView ? { height: `${data.height}%` } : { height: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2 + index * 0.08, 
                    ease: [0.25, 0.1, 0.25, 1] 
                  }}
                  data-testid={`bar-${data.month.toLowerCase()}`}
                />
              </div>
              <span className="text-xs text-muted-foreground mt-2">{data.month}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function UpsellsWidget() {
  const { t } = useTranslation();
  const widgetRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(widgetRef, { once: true, amount: 0.3 });

  const upsells = [
    { key: "item1", valueKey: "value1" },
    { key: "item2", valueKey: "value2" },
    { key: "item3", valueKey: "value3" },
  ];

  return (
    <Card ref={widgetRef} className="h-full flex flex-col p-6 bg-card border" data-testid="widget-upsells">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <DollarSign className="h-5 w-5 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{t("home.aiDashboard.upsells.title")}</h3>
      </div>
      
      <div className="space-y-3 flex-1">
        {upsells.map((upsell, index) => (
          <motion.div
            key={upsell.key}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            data-testid={`upsell-${upsell.key}`}
          >
            <div className="flex-1">
              <p className="text-foreground font-medium text-sm">
                {t(`home.aiDashboard.upsells.${upsell.key}` as any)}
              </p>
              <Badge 
                variant="secondary" 
                className="text-xs mt-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              >
                {t("home.aiDashboard.upsells.status")}
              </Badge>
            </div>
            <span className="text-xl font-bold text-primary" data-testid={`upsell-${upsell.valueKey}`}>
              {t(`home.aiDashboard.upsells.${upsell.valueKey}` as any)}
            </span>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm text-muted-foreground">{t("home.aiDashboard.upsells.total")}</span>
          </div>
          <span className="text-xl font-bold text-primary" data-testid="upsells-total">$282</span>
        </div>
      </div>
    </Card>
  );
}

function ReviewsWidget() {
  const { t } = useTranslation();
  const widgetRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(widgetRef, { once: true, amount: 0.3 });
  const percentage = 92;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  
  const [displayCount, setDisplayCount] = useState(0);
  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (isInView && !hasStarted.current) {
      hasStarted.current = true;
      
      animationRef.current = animate(0, percentage, {
        duration: 2.5,
        ease: [0.25, 0.1, 0.25, 1],
        onUpdate: (latest) => {
          setDisplayCount(Math.round(latest));
          const offset = circumference - (latest / 100) * circumference;
          setStrokeDashoffset(offset);
        },
      });
    }

    return () => {
      animationRef.current?.stop();
    };
  }, [isInView, circumference]);

  return (
    <Card ref={widgetRef} className="h-full flex flex-col p-6 bg-card border" data-testid="widget-reviews">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <Star className="h-5 w-5 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{t("home.aiDashboard.reviews.title")}</h3>
      </div>
      
      <div className="flex items-center justify-center flex-1 py-4">
        <div className="relative w-40 h-40">
          <svg 
            className="transform -rotate-90" 
            width="160" 
            height="160"
            viewBox="0 0 160 160"
            data-testid="reviews-progress-ring"
          >
            <defs>
              <linearGradient id="reviewsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(210, 100%, 60%)" />
              </linearGradient>
            </defs>
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="hsl(var(--muted))"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="url(#reviewsGradient)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-foreground" data-testid="reviews-percentage">
              {displayCount}%
            </span>
            <span className="text-sm text-muted-foreground">{t("home.aiDashboard.reviews.positive")}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">{t("home.aiDashboard.reviews.positive")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-muted" />
          <span className="text-xs text-muted-foreground">{t("home.aiDashboard.reviews.other")}</span>
        </div>
      </div>
    </Card>
  );
}
