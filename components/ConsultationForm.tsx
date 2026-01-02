"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/TranslationContext";
import { apiRequest } from "@/lib/queryClient";

export default function ConsultationForm() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        hotelSize: "",
        dataProcessing: false,
        marketing: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
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
            await apiRequest("POST", "/api/leads/consultation", formData);

            setIsSuccess(true);
            toast({
                title: t("consultation.successTitle"),
                description: t("consultation.successMessage"),
            });

            // Reset form
            setFormData({
                name: "",
                phone: "",
                hotelSize: "",
                dataProcessing: false,
                marketing: false,
            });

            setTimeout(() => setIsSuccess(false), 5000);
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
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-primary/5 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-2xl mx-auto">
                    <AnimatePresence mode="wait">
                        {!isExpanded ? (
                            <motion.div
                                key="trigger"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="text-center"
                            >
                                <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-8 tracking-tight">
                                    {t("consultation.title")}
                                </h2>
                                <Button
                                    size="lg"
                                    onClick={() => setIsExpanded(true)}
                                    className="group h-16 px-10 text-lg font-bold rounded-2xl bg-[#0752A0] hover:bg-[#0752A0]/90 text-white shadow-[0_10px_30px_rgba(7,82,160,0.3)] hover:shadow-[0_15px_40px_rgba(7,82,160,0.4)] transition-all duration-300 active:scale-95"
                                >
                                    {t("consultation.getConsultation")}
                                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                            >
                                <Card className="p-8 lg:p-12 shadow-2xl border-primary/10 overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mb-16 blur-3xl opacity-50" />

                                    <div className="text-center mb-10 relative z-10">
                                        <h2 className="font-serif text-3xl lg:text-5xl font-bold mb-4 tracking-tight">
                                            {t("consultation.title")}
                                        </h2>
                                        <div className="h-1.5 w-20 bg-primary/20 mx-auto mb-4 rounded-full" />
                                        <p className="text-xl text-muted-foreground font-medium">
                                            {t("consultation.subtitle")}
                                        </p>
                                    </div>

                                    {isSuccess ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-12"
                                        >
                                            <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center">
                                                <CheckCircle className="w-10 h-10 text-primary" />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-3">{t("consultation.successTitle")}</h3>
                                            <p className="text-lg text-muted-foreground">{t("consultation.successMessage")}</p>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                            <div className="space-y-3">
                                                <Label htmlFor="name" className="text-base font-semibold">
                                                    {t("consultation.name")} *
                                                </Label>
                                                <Input
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="h-14 text-base bg-muted/30 focus:bg-background transition-colors border-muted-foreground/20"
                                                    placeholder={t("consultation.namePlaceholder")}
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-3">
                                                <Label htmlFor="phone" className="text-base font-semibold">
                                                    {t("consultation.phone")} *
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="h-14 text-base bg-muted/30 focus:bg-background transition-colors border-muted-foreground/20"
                                                    placeholder={t("consultation.phonePlaceholder")}
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-3">
                                                <Label htmlFor="hotelSize" className="text-base font-semibold">
                                                    {t("consultation.hotelSize")} *
                                                </Label>
                                                <Select
                                                    value={formData.hotelSize}
                                                    onValueChange={(value) => setFormData({ ...formData, hotelSize: value })}
                                                >
                                                    <SelectTrigger className="h-14 text-base bg-muted/30 focus:bg-background transition-colors border-muted-foreground/20">
                                                        <SelectValue placeholder={t("consultation.hotelSizePlaceholder")} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="upTo30">{t("roi.size.upTo30")}</SelectItem>
                                                        <SelectItem value="upTo100">{t("roi.size.upTo100")}</SelectItem>
                                                        <SelectItem value="upTo300">{t("roi.size.upTo300")}</SelectItem>
                                                        <SelectItem value="over300">{t("roi.size.over300")}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-5 pt-2">
                                                <div className="flex items-start space-x-3">
                                                    <Checkbox
                                                        id="dataProcessing"
                                                        checked={formData.dataProcessing}
                                                        onCheckedChange={(checked) =>
                                                            setFormData({ ...formData, dataProcessing: checked as boolean })
                                                        }
                                                        className="mt-1 w-5 h-5"
                                                    />
                                                    <Label htmlFor="dataProcessing" className="text-sm font-medium leading-relaxed cursor-pointer text-muted-foreground">
                                                        {t("consultation.dataProcessing")} *
                                                    </Label>
                                                </div>
                                                <div className="flex items-start space-x-3">
                                                    <Checkbox
                                                        id="marketing"
                                                        checked={formData.marketing}
                                                        onCheckedChange={(checked) =>
                                                            setFormData({ ...formData, marketing: checked as boolean })
                                                        }
                                                        className="mt-1 w-5 h-5"
                                                    />
                                                    <Label htmlFor="marketing" className="text-sm font-medium leading-relaxed cursor-pointer text-muted-foreground">
                                                        {t("consultation.marketing")}
                                                    </Label>
                                                </div>
                                            </div>

                                            <Button
                                                type="submit"
                                                size="lg"
                                                className="w-full h-16 text-lg font-bold bg-[#0752A0] hover:bg-[#0752A0]/90 shadow-xl"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? t("consultation.submitting") : t("consultation.submit")}
                                                {!isSubmitting && <ArrowRight className="ml-3 h-6 w-6" />}
                                            </Button>
                                        </form>
                                    )}
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
