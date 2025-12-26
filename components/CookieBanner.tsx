"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "@/lib/TranslationContext";
import { useCookieBanner } from "@/lib/CookieBannerContext";
import { apiRequest } from "@/lib/queryClient";

export default function CookieBanner() {
  const { t, language } = useTranslation();
  const { isCookieBannerVisible, setCookieBannerVisible } = useCookieBanner();
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setCookieBannerVisible(true);
    }
  }, [setCookieBannerVisible]);

  const handleAcceptAll = async () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    
    await saveConsent(allAccepted);
  };

  const handleSavePreferences = async () => {
    await saveConsent(preferences);
  };

  const saveConsent = async (categories: typeof preferences) => {
    try {
      // Save to localStorage
      localStorage.setItem("cookieConsent", JSON.stringify(categories));
      
      // Send to backend
      const response = await fetch("/api/cookie-consents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          categories,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to save consent");
      }
      
      setCookieBannerVisible(false);
    } catch (error) {
      console.error("Failed to save cookie consent:", error);
      // Still hide the banner even if backend fails
      setCookieBannerVisible(false);
    }
  };

  if (!isCookieBannerVisible) return null;

  return (
    <div className="fixed bottom-4 right-[33px] z-50 max-w-[calc(100vw-2rem)] md:max-w-md">
      <Card className="p-3 md:p-4 shadow-lg">
        <div className="mb-2 md:mb-3">
          <h3 className="font-semibold text-sm md:text-lg">{t("cookie.banner.title")}</h3>
        </div>

        <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
          {t("cookie.banner.description")}
        </p>

        {showCustomize && (
          <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
            <div className="flex items-start gap-2">
              <Checkbox
                id="essential"
                checked={true}
                disabled
                data-testid="checkbox-essential"
              />
              <div className="flex-1">
                <label htmlFor="essential" className="text-xs md:text-sm font-medium">
                  {t("cookie.banner.essential")}
                </label>
                <p className="text-[10px] md:text-xs text-muted-foreground">
                  {t("cookie.banner.essentialDesc")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, analytics: checked as boolean })
                }
                data-testid="checkbox-analytics"
              />
              <div className="flex-1">
                <label htmlFor="analytics" className="text-xs md:text-sm font-medium">
                  {t("cookie.banner.analytics")}
                </label>
                <p className="text-[10px] md:text-xs text-muted-foreground">
                  {t("cookie.banner.analyticsDesc")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="marketing"
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, marketing: checked as boolean })
                }
                data-testid="checkbox-marketing"
              />
              <div className="flex-1">
                <label htmlFor="marketing" className="text-xs md:text-sm font-medium">
                  {t("cookie.banner.marketing")}
                </label>
                <p className="text-[10px] md:text-xs text-muted-foreground">
                  {t("cookie.banner.marketingDesc")}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-1.5 md:gap-2">
          {showCustomize ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCustomize(false)}
                data-testid="button-back"
                className="text-xs md:text-sm px-2 md:px-3"
              >
                ← Back
              </Button>
              <Button
                size="sm"
                onClick={handleSavePreferences}
                className="flex-1 text-xs md:text-sm px-2 md:px-3"
                data-testid="button-save-preferences"
              >
                {t("cookie.banner.save")}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCustomize(true)}
                data-testid="button-customize"
                className="text-xs md:text-sm px-2 md:px-3"
              >
                {t("cookie.banner.customize")}
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="flex-1 text-xs md:text-sm px-2 md:px-3"
                data-testid="button-accept-all"
              >
                {t("cookie.banner.acceptAll")}
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
