"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/TranslationContext";
import { apiRequest } from "@/lib/queryClient";

export default function ROIEstimate() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    propertySize: "",
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
      await apiRequest("POST", "/api/leads/roi", formData);

      toast({
        title: t("roi.successTitle"),
        description: t("roi.successMessage"),
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        propertySize: "",
        dataProcessing: false,
        marketing: false,
      });
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
    <section className="py-11 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md mb-6">
              <Calculator className="h-10 w-10 text-white" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
              {t("roi.title")}
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t("roi.subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 lg:p-12 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-white text-base font-medium">{t("roi.name")}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/95 border-0 h-12 text-base"
                  placeholder={t("roi.namePlaceholder")}
                  data-testid="input-name"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-white text-base font-medium">{t("roi.phone")}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white/95 border-0 h-12 text-base"
                  placeholder={t("roi.phonePlaceholder")}
                  data-testid="input-phone"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="propertySize" className="text-white text-base font-medium">{t("roi.propertySize")}</Label>
                <Select
                  value={formData.propertySize}
                  onValueChange={(value) => setFormData({ ...formData, propertySize: value })}
                >
                  <SelectTrigger 
                    className="bg-white/95 border-0 h-12 text-base" 
                    data-testid="select-property-size"
                  >
                    <SelectValue placeholder={t("roi.propertySizePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upTo30">{t("roi.size.upTo30")}</SelectItem>
                    <SelectItem value="upTo100">{t("roi.size.upTo100")}</SelectItem>
                    <SelectItem value="upTo300">{t("roi.size.upTo300")}</SelectItem>
                    <SelectItem value="over300">{t("roi.size.over300")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4 mb-8 p-6 bg-white/5 rounded-xl">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="dataProcessing"
                  checked={formData.dataProcessing}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, dataProcessing: checked as boolean })
                  }
                  className="mt-1 border-white/40 data-[state=checked]:bg-white data-[state=checked]:text-primary"
                  data-testid="checkbox-data-processing"
                />
                <Label htmlFor="dataProcessing" className="text-sm text-white/95 leading-relaxed cursor-pointer">
                  {t("roi.dataProcessing")}
                </Label>
              </div>
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="marketing"
                  checked={formData.marketing}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, marketing: checked as boolean })
                  }
                  className="mt-1 border-white/40 data-[state=checked]:bg-white data-[state=checked]:text-primary"
                  data-testid="checkbox-marketing"
                />
                <Label htmlFor="marketing" className="text-sm text-white/95 leading-relaxed cursor-pointer">
                  {t("roi.marketing")}
                </Label>
              </div>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-14 bg-white text-primary hover:bg-white/90 text-base font-semibold shadow-xl"
              disabled={isSubmitting}
              data-testid="button-get-estimate"
            >
              {isSubmitting ? t("roi.submitting") : t("roi.submit")}
              {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
