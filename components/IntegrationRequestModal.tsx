"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/TranslationContext";
import { apiRequest } from "@/lib/queryClient";

interface IntegrationRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function IntegrationRequestModal({ open, onOpenChange }: IntegrationRequestModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    property: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.phone.trim()) {
      toast({
        title: (t as any)("error.validationError"),
        description: t("about.integration.phoneRequired"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/leads/integration", formData);

      toast({
        title: t("about.integration.successTitle"),
        description: t("about.integration.successMessage"),
      });

      setFormData({
        name: "",
        phone: "",
        property: "",
      });

      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: t("error.submissionFailed"),
        description: error.message || t("error.tryAgainLater"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{t("about.integration.title")}</DialogTitle>
          <DialogDescription>
            {t("about.integration.subtitle")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="integration-name">{t("about.integration.name")}</Label>
              <Input
                id="integration-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t("about.integration.namePlaceholder")}
                data-testid="input-integration-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="integration-phone">{t("about.integration.phone")} *</Label>
              <Input
                id="integration-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                placeholder={t("about.integration.phonePlaceholder")}
                data-testid="input-integration-phone"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="integration-property">{t("about.integration.property")}</Label>
              <Input
                id="integration-property"
                value={formData.property}
                onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                placeholder={t("about.integration.propertyPlaceholder")}
                data-testid="input-integration-property"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            data-testid="button-submit-integration"
          >
            {isSubmitting ? t("about.integration.submitting") : t("about.integration.submit")}
            {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
