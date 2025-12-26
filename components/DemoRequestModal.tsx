"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/TranslationContext";
import { apiRequest } from "@/lib/queryClient";

interface DemoRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DemoRequestModal({ open, onOpenChange }: DemoRequestModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    property: "",
    dataProcessing: false,
    marketing: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.dataProcessing) {
      toast({
        title: t("error.agreementRequired"),
        description: t("error.agreeToDataProcessing"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/leads/demo", formData);

      toast({
        title: t("demo.successTitle"),
        description: t("demo.successMessage"),
      });

      setFormData({
        name: "",
        email: "",
        property: "",
        dataProcessing: false,
        marketing: false,
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
          <DialogTitle className="text-2xl font-serif">{t("demo.title")}</DialogTitle>
          <DialogDescription>
            {t("demo.subtitle")}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="demo-name">{t("demo.name")} *</Label>
              <Input
                id="demo-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder={t("demo.namePlaceholder")}
                data-testid="input-demo-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo-email">{t("demo.email")} *</Label>
              <Input
                id="demo-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder={t("demo.emailPlaceholder")}
                data-testid="input-demo-email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo-property">{t("demo.property")}</Label>
              <Input
                id="demo-property"
                value={formData.property}
                onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                placeholder={t("demo.propertyPlaceholder")}
                data-testid="input-demo-property"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="demo-processing"
                checked={formData.dataProcessing}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, dataProcessing: checked as boolean })
                }
                data-testid="checkbox-demo-processing"
              />
              <Label htmlFor="demo-processing" className="text-sm leading-relaxed cursor-pointer">
                {t("demo.dataProcessing")} *
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox
                id="demo-marketing"
                checked={formData.marketing}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, marketing: checked as boolean })
                }
                data-testid="checkbox-demo-marketing"
              />
              <Label htmlFor="demo-marketing" className="text-sm leading-relaxed cursor-pointer">
                {t("demo.marketing")}
              </Label>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
            data-testid="button-submit-demo"
          >
            {isSubmitting ? t("demo.submitting") : t("demo.submit")}
            {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
