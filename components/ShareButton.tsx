"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const { t } = useTranslation();
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setIsSupported(true);
    }
  }, []);

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      aria-label={t("blog.share") || "Share"}
    >
      <Share2 className="mr-2 h-4 w-4" />
      {t("blog.share") || "Share"}
    </Button>
  );
}
